<?php
require 'vendor/autoload.php';
include_once "db.php"; // Your DB connection file

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

$secretKey = "your_super_secret_key"; // Change this to a secure secret key

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
    $userType = strtolower(trim($data['userType']));

    $allowedRoles = ['admin', 'author', 'reviewer'];
    if (!in_array($userType, $allowedRoles)) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid user type provided.'
        ]);
        exit();
    }

    $stmt = $con->prepare("SELECT id,name, email, password, user_type FROM users WHERE email = ? AND user_type = ?");
    $stmt->bind_param("ss", $email, $userType);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            $issuedAt = time();
            $expire = $issuedAt + (60 * 60); // Token valid for 1 hour

            $payload = [
                "iat" => $issuedAt,
                "exp" => $expire,
                "data" => [
                    "email" => $user['email'],
                    "userType" => $user['user_type'],
                    "name" => $user['name']
                ]
            ];
         

            $jwt = JWT::encode($payload, $secretKey, 'HS256');

            echo json_encode([
                'success' => true,
                'message' => 'Login successful.',
                'token' => $jwt,
                'userType' => $user['user_type'],
                'name' => $user['name']  // 👈 Add this line
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
