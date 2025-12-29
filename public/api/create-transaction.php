<?php
require_once "../midtrans-php-master/Midtrans.php";

// Load env
$serverKey = getenv('MIDTRANS_SERVER_KEY');

\Midtrans\Config::$serverKey = 'SB-Mid-server-ehwt85JLH_TnLqU-WjRB9Gwv';
\Midtrans\Config::$isProduction = false; // true jika production
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$orderId = isset($input['totalPrice']) ? (int) $input['totalPrice'] : null;
$customer = $input["customer"];

$params = [
    "transaction_details" => [
        "order_id" => $orderId,
        "gross_amount" => $input["amount"]
    ],
    "customer_details" => [
        "first_name" => $customer["name"],
        "phone" => $customer["whatsapp"]
    ],
    "item_details" => $customer["items"]
];

try {
    $snapToken = \Midtrans\Snap::getSnapToken($params);
    echo json_encode(['token' => $snapToken]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>