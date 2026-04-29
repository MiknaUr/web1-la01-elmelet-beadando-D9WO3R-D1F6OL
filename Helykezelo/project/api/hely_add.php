<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

require_once "db.php";

$input = json_decode(file_get_contents("php://input"), true);

$telepules = $input["telepules"] ?? null;
$utca      = $input["utca"] ?? null;

if (!$telepules || !$utca) {
    http_response_code(400);
    echo json_encode(["error" => "Hiányzó adatok"]);
    exit;
}

$sql = "INSERT INTO hely (telepules, utca) VALUES (:telepules, :utca)";
$stmt = $db->prepare($sql);
$stmt->execute([
    ":telepules" => $telepules,
    ":utca"      => $utca
]);

echo json_encode(["success" => true, "insert_id" => $db->lastInsertId()]);

?>
