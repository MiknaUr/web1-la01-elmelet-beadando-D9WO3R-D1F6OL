<?php
include "db.php";
$id = $_GET['id'];

$conn->query("DELETE FROM hely WHERE az=$id");

echo json_encode(["status" => "ok"]);
?>
