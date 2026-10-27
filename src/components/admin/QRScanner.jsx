import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { 
  Camera, CameraOff, CheckCircle, AlertTriangle, 
  XCircle, Scan, Keyboard, Volume2, UserCheck
} from 'lucide-react';
import { Button } from '../ui/button';
import { checkInTicket, sanitizeTicketCode } from '../../services/ticketService';

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [scanHistory, setScanHistory] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  // Sintesis audio beep menggunakan Web Audio API murni
  const playBeep = (type = 'success') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.35);
      } else if (type === 'duplicate') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.setValueAtTime(330, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.22, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.4);
      } else {
        // Warning / Error tone
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.setValueAtTime(140, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn('Audio not allowed:', e);
    }
  };

  // Ambil daftar kamera saat komponen dimuat
  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length > 0) {
          setCameras(devices);
          // Prefer back camera jika di smartphone
          const backCam = devices.find(d => d.label.toLowerCase().includes('back') || d.label.toLowerCase().includes('environment'));
          setSelectedCamera(backCam ? backCam.id : devices[0].id);
        }
      })
      .catch((err) => {
        console.warn('Gagal mendeteksi kamera:', err);
      });

    return () => {
      stopCamera();
    };
  }, []);

  const handleValidateCode = async (rawCode) => {
    if (!rawCode || isProcessing) return;

    const codeToVerify = sanitizeTicketCode(rawCode);
    if (!codeToVerify) {
      setScanResult({
        success: false,
        status: 'INVALID_FORMAT',
        message: 'Format QR Code tidak dikenali sebagai tiket Wonderkind!'
      });
      playBeep('error');
      return;
    }

    setIsProcessing(true);
    const res = await checkInTicket(codeToVerify, 'Panitia Pintu Masuk');
    setIsProcessing(false);

    setScanResult(res);

    if (res.success) {
      playBeep('success');
      setScanHistory(prev => [
        {
          code: codeToVerify,
          name: res.ticket?.buyer_name || 'Tamu',
          type: res.ticket?.ticket_type || 'Tiket',
          time: new Date().toLocaleTimeString('id-ID'),
          status: 'SUCCESS'
        },
        ...prev.slice(0, 19)
      ]);
    } else {
      if (res.status === 'ALREADY_CHECKED_IN') {
        playBeep('duplicate');
      } else {
        playBeep('error');
      }
      setScanHistory(prev => [
        {
          code: codeToVerify,
          name: res.ticket?.buyer_name || 'Tidak Dikenal',
          type: res.ticket?.ticket_type || '-',
          time: new Date().toLocaleTimeString('id-ID'),
          status: res.status
        },
        ...prev.slice(0, 19)
      ]);
    }
  };

  const startCamera = async () => {
    if (!selectedCamera) return;

    setScanResult(null);
    const html5QrCode = new Html5Qrcode('reader-viewport');
    html5QrCodeRef.current = html5QrCode;

    try {
      await html5QrCode.start(
        selectedCamera,
        {
          fps: 15,
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
            const boxSize = Math.max(180, Math.floor(minEdge * 0.72));
            return { width: boxSize, height: boxSize };
          },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          // Callback saat QR berhasil dibaca
          handleValidateCode(decodedText);
          // Beri jeda 2 detik sebelum scan berikutnya agar tidak multi-trigger
          html5QrCode.pause();
          setTimeout(() => {
            try {
              html5QrCode.resume();
            } catch (e) {
              console.warn(e);
            }
          }, 2000);
        },
        (errorMessage) => {
          // Error biasa saat scanning (frame tidak berisi QR)
        }
      );
      setIsScanning(true);
    } catch (err) {
      console.error('Gagal menyalakan kamera scanner:', err);
      alert('Gagal mengakses kamera. Pastikan izin kamera telah diberikan di browser Anda.');
    }
  };

  const stopCamera = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
      } catch (err) {
        console.warn('Stop error:', err);
      }
    }
    setIsScanning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <span className="text-xs bg-wk-gold/20 text-wk-darkRed font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Check-In Scanner
          </span>
          <h2 className="text-2xl font-bold text-wk-darkRed mt-2">Scan QR Kehadiran Peserta</h2>
          <p className="text-xs text-gray-500">Gunakan kamera perangkat atau input barcode scanner untuk mencatat kehadiran tiket</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              soundEnabled ? 'bg-wk-lightOrange/20 border-wk-orange text-wk-darkRed' : 'bg-gray-100 text-gray-400'
            }`}
            title="Toggle Audio Feedback"
          >
            <Volume2 className="w-4 h-4" /> {soundEnabled ? 'Suara Aktif' : 'Mute'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Kolom Kiri: Scanner Kamera & Input Manual */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card Kamera */}
          <div className="bg-white rounded-3xl p-6 border shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2">
                <Scan className="w-4 h-4 text-wk-red" /> Kamera Pemindai QR
              </h3>

              {cameras.length > 1 && !isScanning && (
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="text-xs border rounded-lg px-2.5 py-1.5 bg-gray-50 text-gray-700"
                >
                  {cameras.map(cam => (
                    <option key={cam.id} value={cam.id}>{cam.label || `Kamera ${cam.id.slice(0, 5)}`}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Viewport Kamera */}
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-square max-w-sm mx-auto flex items-center justify-center border-4 border-wk-gold/40">
              <div id="reader-viewport" ref={scannerRef} className="w-full h-full" />
              
              {!isScanning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/90 text-white p-6 text-center">
                  <Camera className="w-16 h-16 text-wk-gold mb-3 opacity-80" />
                  <p className="font-bold text-sm">Kamera Belum Aktif</p>
                  <p className="text-xs text-gray-400 mt-1 mb-4">Tekan tombol di bawah untuk menyalakan kamera pemindai</p>
                  <Button
                    onClick={startCamera}
                    className="bg-wk-red hover:bg-wk-darkRed text-white font-bold text-xs py-5 px-6 rounded-xl shadow-lg"
                  >
                    Nyalakan Kamera
                  </Button>
                </div>
              )}
            </div>

            {isScanning && (
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50 text-xs py-5 px-6 rounded-xl"
                >
                  <CameraOff className="w-4 h-4 mr-2" /> Matikan Kamera
                </Button>
              </div>
            )}
          </div>

          {/* Card Input Manual */}
          <div className="bg-white rounded-3xl p-6 border shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2 mb-2">
              <Keyboard className="w-4 h-4 text-wk-orange" /> Input Kode Tiket Manual
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Gunakan jika kamera tidak menyala atau jika Anda menggunakan handheld barcode gun.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleValidateCode(manualCode);
                setManualCode('');
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Contoh: TKT-2026-AB12CD"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-sm font-mono font-bold tracking-wider uppercase focus:ring-2 focus:ring-wk-red focus:outline-none"
              />
              <Button
                type="submit"
                disabled={!manualCode.trim() || isProcessing}
                className="bg-wk-darkRed hover:bg-wk-red text-white font-bold text-xs px-6 rounded-xl"
              >
                {isProcessing ? 'Memeriksa...' : 'Validasi Tiket'}
              </Button>
            </form>
          </div>
        </div>

        {/* Kolom Kanan: Hasil Scan Terkini & History */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Hasil Scan Real-Time */}
          <div className="bg-white rounded-3xl p-6 border shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 mb-4">Hasil Verifikasi Terakhir</h3>

            {!scanResult ? (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <Scan className="w-10 h-10 text-gray-300 mx-auto mb-2 animate-pulse" />
                <p className="text-sm font-semibold text-gray-600">Menunggu Pemindaian</p>
                <p className="text-xs text-gray-400 mt-1">Arahkan kamera ke QR Code E-Ticket peserta.</p>
              </div>
            ) : scanResult.status === 'SUCCESS' ? (
              <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <span className="text-xs uppercase font-extrabold text-green-700 tracking-wider">CHECK-IN BERHASIL</span>
                <h4 className="text-xl font-bold text-green-900 mt-1">{scanResult.ticket?.buyer_name}</h4>
                <p className="text-xs text-green-800 font-semibold">{scanResult.ticket?.ticket_type}</p>
                <div className="font-mono text-xs text-green-700 mt-2 bg-white/70 py-1.5 px-3 rounded-lg inline-block">
                  {scanResult.ticket?.ticket_code}
                </div>
                <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-green-200">
                  Waktu: {new Date().toLocaleTimeString('id-ID')} WIB
                </p>
              </div>
            ) : scanResult.status === 'ALREADY_CHECKED_IN' ? (
              <div className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <AlertTriangle className="w-10 h-10" />
                </div>
                <span className="text-xs uppercase font-extrabold text-amber-800 tracking-wider">PERINGATAN: TIKET SUDAH DIGUNAKAN</span>
                <h4 className="text-lg font-bold text-amber-900 mt-1">{scanResult.ticket?.buyer_name}</h4>
                <p className="text-xs text-amber-800 mt-2">{scanResult.message}</p>
                <div className="font-mono text-xs text-amber-700 mt-2 bg-white/70 py-1 px-3 rounded-lg inline-block">
                  {scanResult.ticket?.ticket_code}
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <XCircle className="w-10 h-10" />
                </div>
                <span className="text-xs uppercase font-extrabold text-red-800 tracking-wider">TIKET TIDAK VALID</span>
                <p className="text-xs text-red-700 mt-2 font-medium">{scanResult.message}</p>
              </div>
            )}
          </div>

          {/* Riwayat Scan Sesi Ini */}
          <div className="bg-white rounded-3xl p-6 border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-wk-darkRed" /> Riwayat Scan ({scanHistory.length})
              </h3>
              {scanHistory.length > 0 && (
                <button
                  onClick={() => setScanHistory([])}
                  className="text-[11px] text-gray-400 hover:text-red-600 transition-colors"
                >
                  Bersihkan
                </button>
              )}
            </div>

            {scanHistory.length === 0 ? (
              <p className="text-xs text-gray-400 italic text-center py-4">Belum ada riwayat scan pada sesi ini.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {scanHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                      item.status === 'SUCCESS'
                        ? 'bg-green-50/70 border-green-200'
                        : item.status === 'ALREADY_CHECKED_IN'
                        ? 'bg-amber-50/70 border-amber-200'
                        : 'bg-red-50/70 border-red-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-gray-900">{item.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{item.code} • {item.type}</div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'SUCCESS' ? 'bg-green-200 text-green-900' : 'bg-amber-200 text-amber-900'
                      }`}>
                        {item.status === 'SUCCESS' ? 'Valid' : item.status === 'ALREADY_CHECKED_IN' ? 'Duplikat' : 'Gagal'}
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default QRScanner;
