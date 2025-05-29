<?php
// Enable CORS and set JSON response headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}

// Enable error reporting for debugging (disable in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Handle only POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON input
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    // Validate JSON structure
    if (!isset($data['email']) || !isset($data['password'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Email and password are required.'
        ]);
        exit();
    }

    // Sanitize inputs
    $email = trim($data['email']);
    $password = trim($data['password']);
  

    // Dummy credentials (replace this with database check)
    $validEmail = 'admin@example.com';
    $validPassword = 'password123';

    if ($email === $validEmail && $password === $validPassword) {
        echo json_encode([
            'success' => true,
            'message' => 'Login successful.',
            'token' => 'dummy-token-123' // Example: return a token
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email or password.'
        ]);
    }
} else {
    // Method not allowed
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Only POST requests are allowed.'
    ]);
}
?>
