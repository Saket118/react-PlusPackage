<?php
include_once "../db.php"; // Your DB connection file

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_GET['userId'];

    if (!$userId) {
        echo json_encode(['success' => false, 'message' => 'User ID is required.']);
        exit();
    }

    $stmt = $con->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Only GET requests are allowed.']);
}