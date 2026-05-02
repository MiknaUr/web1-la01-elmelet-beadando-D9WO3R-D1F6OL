<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('html_errors', 0);
header("Content-Type: text/plain");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once "db.php";

$sql = "SELECT az, telepules, utca FROM hely ORDER BY az";
$stmt = $db->query($sql);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

?>