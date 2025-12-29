require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const midtransClient = require("midtrans-client");
const crypto = require("crypto");

const app = express();
// ============== MIDDLEWARE ===================
app.use(cors());
app.use(bodyParser.json());

// ============== MIDTRANS CONFIG ===================
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

// ============== CREATE TRANSACTION ===================
app.post("/api/create-transaction", async (req, res) => {
  try {
    const { orderId, amount, customer } = req.body;

    if (!orderId || !amount || !customer) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }
    const calculatedAmount = customer.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    if (calculatedAmount !== amount) {
      return res.status(400).json({
        message: "Total harga tidak sesuai dengan item",
      });
    }

    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: {
        first_name: customer.name,
        phone: customer.whatsapp,
      },
      item_details: customer.items,
    });

    res.json({
      token: transaction.token,
    });
  } catch (error) {
    console.error("CREATE TRANSACTION ERROR:", error);
    res.status(500).json({ message: "Gagal membuat transaksi" });
  }
});

// ========== WHATSAPP =============
function sendWhatsAppAdmin(orderId, amount, customer) {
  const message = `
*[PEMBAYARAN LUNAS 🎉]*

Assalamu'alaikum, saya ingin Konfirmasi Merchandise Wonderkind Festival:\n
Order ID: ${orderId}
Nama: ${customer.name}
WhatsApp: ${customer.whatsapp}
Item: ${customer.items
    .map(
      (item) =>
        `- ${item.name} x${item.quantity} (Rp ${item.price.toLocaleString(
          "id-ID"
        )})`
    )
    .join("\n")}
Total: Rp ${amount.toLocaleString("id-ID")}

Terima Kasih, Semoga Berkah.
  `;

  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${process.env.ADMIN_WHATSAPP}?text=${encodedMessage}`;
  window.open(waUrl, "_blank");

  console.log("KIRIM WA ADMIN:", waUrl);
}

// ============== WEBHOOK ===================
app.post("/api/midtrans-webhook", (req, res) => {
  const notification = req.body;

  const {
    order_id,
    transaction_status,
    fraud_status,
    status_code,
    gross_amount,
    signature_key,
  } = notification;

  // ======================
  // VALIDASI SIGNATURE
  // ======================
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const hash = crypto
    .createHash("sha512")
    .update(order_id + status_code + gross_amount + serverKey)
    .digest("hex");

  if (hash !== signature_key) {
    console.error("SIGNATURE TIDAK VALID");
    return res.status(403).send("Invalid signature");
  }

  console.log("WEBHOOK DITERIMA:", {
    order_id,
    transaction_status,
    fraud_status,
  });

  // ======================
  // HANDLE STATUS
  // ======================
  if (
    transaction_status === "settlement" ||
    (transaction_status === "capture" && fraud_status === "accept")
  ) {
    console.log(`ORDER ${order_id} -> LUNAS`);

    sendWhatsAppAdmin(order_id, gross_amount, {
      name: "Customer",
      whatsapp: "Tersimpan di order",
    });
  }

  if (transaction_status === "pending") {
    console.log(`ORDER ${order_id} -> PENDING`);
  }

  if (["cancel", "deny", "expire"].includes(transaction_status)) {
    console.log(`ORDER ${order_id} -> GAGAL`);
  }

  // WAJIB 200 OK
  res.sendStatus(200);
});

// ============== ROOT CHECK ===================
app.get("/", (req, res) => {
  res.send("Backend Midtrans Wonderkind aktif");
});

// ============== RUN SERVER ===================
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
