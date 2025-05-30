<?php
include_once "db.php";

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Main POST logic
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $data = json_decode(file_get_contents("php://input")); // stdClass object

    if (!$data) {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid JSON input']);
        exit();
    }

    $stmt = $con->prepare("
        INSERT INTO users 
        (email, password, name, qualification, address, city, state, zip, country, phone, user_type, title, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ");

    $hashedPassword = password_hash($data->reg_pass, PASSWORD_DEFAULT);

    $success = $stmt->execute([
        $data->reg_email,
        $hashedPassword,
        $data->reg_name,
        $data->reg_qual,
        $data->reg_addr,
        $data->reg_city,
        $data->reg_state,
        $data->reg_zip,
        $data->reg_country,
        $data->reg_phone,
        $data->reg_type,
        $data->reg_title ?? ''
    ]);

    if ($success) {
        echo json_encode(['message' => 'Registration successful!']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to register user.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'false', 'message' => 'Invalid request method']);
}
