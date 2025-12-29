<?php
$env = parse_ini_file(__DIR__ . "/.env");

define("MIDTRANS_SERVER_KEY", $env["MIDTRANS_SERVER_KEY"]);
define("MIDTRANS_IS_PRODUCTION", $env["MIDTRANS_IS_PRODUCTION"] === "true");

define("DB_HOST", $env["DB_HOST"]);
define("DB_NAME", $env["DB_NAME"]);
define("DB_USER", $env["DB_USER"]);
define("DB_PASS", $env["DB_PASS"]);

define("ADMIN_WHATSAPP", $env["ADMIN_WHATSAPP"]);
