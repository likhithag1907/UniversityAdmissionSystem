<?php

header("Content-Type: application/json");

include 'connect.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$student_id = $data['student_id'];
$full_name = $data['full_name'];
$department = $data['department'];
$course = $data['course'];
$payment_status = $data['payment_status'];

$query = "UPDATE students SET
student_id = $1,
full_name = $2,
department = $3,
course = $4,
payment_status = $5
WHERE id = $6";

$result = pg_query_params($conn, $query, [
    $student_id,
    $full_name,
    $department,
    $course,
    $payment_status,
    $id
]);

if ($result) {
    echo json_encode([
        "success" => true
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Update failed"
    ]);
}

?>