<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../db.php"; // Adjust path as needed

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = isset($_GET['userId']) ? intval($_GET['userId']) : 0;

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

        // Prepend image path if image exists
        if (!empty($user['image'])) {
            $user['image'] = 'http://localhost/Reactjs/react-PlusPackage/backend/uploads/' . $user['image'];
        }

        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Only GET requests are allowed.']);
}
?>
