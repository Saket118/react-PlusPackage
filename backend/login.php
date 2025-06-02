<?php
include_once "db.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    if (
        !isset($data['email']) || 
        !isset($data['password']) || 
        !isset($data['userType'])
    ) {
        echo json_encode([
            'success' => false,
            'message' => 'Email, password, and user type are required.'
        ]);
        exit();
    }

    $email = trim($data['email']);
    $password = trim($data['password']);
    $userType = trim(strtolower($data['userType'])); // admin, author, reviewer

    // Validate allowed roles
    $allowedRoles = ['admin', 'author', 'reviewer'];
    if (!in_array($userType, $allowedRoles)) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid user type provided.'
        ]);
        exit();
    }

    // Assuming all users are stored in one `users` table with a `role` column
    $stmt = $con->prepare("SELECT id, email, password, user_type FROM users WHERE email = ? AND user_type = ?");
    $stmt->bind_param("ss", $email, $userType);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            echo json_encode([
                'success' => true,
                'message' => 'Login successful.',
                'token' => base64_encode($user['email'] . "|" . $user['user_type']),
                'userType' => $user['user_type']
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Invalid password.'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email or user type.'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Only POST requests are allowed.'
    ]);
}
