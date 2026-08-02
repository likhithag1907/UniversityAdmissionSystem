<?php

header('Content-Type: application/json');

include 'connect.php';

$rawData = file_get_contents("php://input");
$jsonData = json_decode($rawData, true);

if ($jsonData) {
    $student_id = $jsonData['student_id'] ?? '';
    $full_name = $jsonData['full_name'] ?? '';
    $department = $jsonData['department'] ?? '';
    $course = $jsonData['course'] ?? '';
    $payment_status = $jsonData['payment_status'] ?? '';
} else {
    $student_id = $_POST['student_id'] ?? '';
    $full_name = $_POST['full_name'] ?? '';
    $department = $_POST['department'] ?? '';
    $course = $_POST['course'] ?? '';
    $payment_status = $_POST['payment_status'] ?? '';
}

if ($student_id == '' || $full_name == '' || $department == '' || $course == '' || $payment_status == '') {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required"
    ]);
    exit;
}

$query = "INSERT INTO students 
(student_id, full_name, department, course, payment_status)
VALUES ($1, $2, $3, $4, $5)";

$result = pg_query_params($conn, $query, [
    $student_id,
    $full_name,
    $department,
    $course,
    $payment_status
]);

if ($result) {
    echo json_encode([
        "success" => true,
        "message" => "Student added successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to add student"
    ]);
}

?>