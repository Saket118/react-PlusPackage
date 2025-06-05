<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Adjust for production
header('Access-Control-Allow-Methods: DELETE');

include_once "../db.php"; // Make sure this sets $con as the DB connection

if ($con->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Get the user ID from the request body
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "User ID is required"]);
    exit();
}

$userId = $data['id'];

// Prepare the SQL statement to delete the user
$stmt = $con->prepare("DELETE FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "User deleted successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "User not found."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Error deleting user: " . $stmt->error]);
}

$stmt->close();
$con->close();
?>
