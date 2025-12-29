<?php
require "config.php";

$conn = new mysqli(
    $env["DB_HOST"],
    $env["DB_USER"],
    $env["DB_PASS"],
    $env["DB_NAME"]
);

if ($conn->connect_error) {
    http_response_code(500);
    exit("Database gagal terhubung");
}
