<?php

header("Content-Type: application/json");

include 'connect.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];

$query = "DELETE FROM students WHERE id = $1";

$result = pg_query_params($conn, $query, [$id]);

if ($result) {
    echo json_encode([
        "success" => true
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Delete failed"
    ]);
}

?>