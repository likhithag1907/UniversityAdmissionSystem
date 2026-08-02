<?php

header("Content-Type: application/json");

include 'connect.php';

$query = "SELECT * FROM students ORDER BY id ASC";

$result = pg_query($conn, $query);

$students = [];

while ($row = pg_fetch_assoc($result)) {
    $students[] = $row;
}

echo json_encode($students);

?>