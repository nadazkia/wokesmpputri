<?php
require "config.php";
require "database.php";
require "midtrans/Midtrans.php";

\Midtrans\Config::$serverKey = MIDTRANS_SERVER_KEY;
\Midtrans\Config::$isProduction = MIDTRANS_IS_PRODUCTION;
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

$data = json_decode(file_get_contents("php://input"), true);

$orderId = $data["orderId"];
$amount = $data["amount"];
$customer = $data["customer"];

// VALIDASI TOTAL
$total = 0;
foreach ($customer["items"] as $item) {
    $total += $item["price"] * $item["quantity"];
}
if ($total != $amount) {
    http_response_code(400);
    exit("Total tidak valid");
}

// SIMPAN ORDER
$conn->query("
  INSERT INTO orders (order_id, customer_name, whatsapp, amount, status)
  VALUES ('$orderId', '{$customer["name"]}', '{$customer["whatsapp"]}', $amount, 'pending')
");

$params = [
    "transaction_details" => [
        "order_id" => $orderId,
        "gross_amount" => $amount
    ],
    "item_details" => $customer["items"],
    "customer_details" => [
        "first_name" => $customer["name"],
        "phone" => $customer["whatsapp"]
    ]
];

$snapToken = \Midtrans\Snap::getSnapToken($params);

echo json_encode(["token" => $snapToken]);
