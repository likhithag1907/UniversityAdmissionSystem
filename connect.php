<?php

$host = "localhost";
$port = "5432";
$dbname = "UniversityAdmissionsSystem";
$user = "postgres";
$password = "190706";

$conn = pg_connect(
    "host=$host 
    port=$port 
    dbname=$dbname 
    user=$user 
    password=$password"
);

if (!$conn) {
    die("Connection failed.");
}

?>