<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('html_errors', 0);
header("Content-Type: text/plain");
$dsn = "mysql:host=mysql.omega;port=3306;dbname=web1_eloadas;charset=utf8";
$user = "web1_eloadas";
$pass = "web1_eloadas";

try {
    $db = new PDO($dsn, $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "DB error: " . $e->getMessage();
    exit;
}

?>
