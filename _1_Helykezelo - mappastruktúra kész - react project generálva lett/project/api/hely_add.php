<?php
include "db.php";
$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("INSERT INTO hely (telepules, utca) VALUES (?, ?)");
$stmt->bind_param("ss", $data['telepules'], $data['utca']);
$stmt->execute();

echo json_encode(["status" => "ok"]);
?>
