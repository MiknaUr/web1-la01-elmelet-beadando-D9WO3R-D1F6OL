<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once "db.php";

$sql = "SELECT az, telepules, utca FROM hely ORDER BY az";
$stmt = $db->query($sql);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

?>