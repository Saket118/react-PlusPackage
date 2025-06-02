<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Adjust for production
header('Access-Control-Allow-Methods: GET');

include_once "../db.php"; // Make sure this sets $con as the DB connection

if ($con->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Fixed SQL: Removed extra comma before FROM
$sql = "SELECT `email`, `name`, `qualification`, `address`, `city`, `state`, `country`, `phone`, `user_type`, `title`
        FROM `users`
        ORDER BY `user_type` ASC, `name` ASC";

$result = $con->query($sql); // Use $con consistently

$users = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode($users);
?>
