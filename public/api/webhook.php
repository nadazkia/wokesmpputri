<?php
require "config.php";
require "database.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$orderId = $data["order_id"];
$status = $data["transaction_status"];
$grossAmount = $data["gross_amount"];

if (in_array($status, ["settlement", "capture"])) {
    $conn->query("
    UPDATE orders SET status='paid'
    WHERE order_id='$orderId'
  ");

    require "send-whatsapp.php";
}
