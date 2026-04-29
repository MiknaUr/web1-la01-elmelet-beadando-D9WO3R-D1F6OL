<?php
include "db.php";
$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("UPDATE hely SET telepules=?, utca=? WHERE az=?");
$stmt->bind_param("ssi", $data['telepules'], $data['utca'], $data['az']);
$stmt->execute();

echo json_encode(["status" => "ok"]);
?>
