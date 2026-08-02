<?php

$host = "localhost";
$port = "5432";
$dbname = "UniversityAdmissionsSystem";
$user = "postgres";
$password = "your_postgresql_password";

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
