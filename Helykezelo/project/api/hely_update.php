<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

require_once "db.php";

$input = json_decode(file_get_contents("php://input"), true);

$az        = $input["az"] ?? null;
$telepules = $input["telepules"] ?? null;
$utca      = $input["utca"] ?? null;

if (!$az || !$telepules || !$utca) {
    http_response_code(400);
    echo json_encode(["error" => "Hiányzó adatok"]);
    exit;
}

$sql = "UPDATE hely SET telepules = :telepules, utca = :utca WHERE az = :az";
$stmt = $db->prepare($sql);
$stmt->execute([
    ":telepules" => $telepules,
    ":utca"      => $utca,
    ":az"        => $az
]);

echo json_encode(["success" => true]);

?>
