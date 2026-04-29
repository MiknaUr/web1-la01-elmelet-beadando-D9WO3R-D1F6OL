<?php
$dsn = "mysql:host=localhost;dbname=web1_eloadas;charset=utf8";
$user = "root";
$pass = "";

try {
    $db = new PDO($dsn, $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "DB error: " . $e->getMessage();
    exit;
}

?>
