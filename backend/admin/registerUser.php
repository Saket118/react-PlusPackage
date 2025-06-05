<?php

include_once "../db.php";
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

$secretKey = "your_super_secret_key";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $requiredFields = [
        'reg_email', 'reg_pass', 'reg_cpass', 'reg_type', 'reg_name',
        'reg_title', 'reg_qual', 'reg_addr', 'reg_city',
        'reg_state', 'reg_zip', 'reg_country', 'reg_phone'
    ];

    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            echo json_encode([
                'success' => false,
                'message' => "Field '$field' is required."
            ]);
            exit();
        }
    }

    $email         = trim($_POST['reg_email']);
    $password      = trim($_POST['reg_pass']);
    $userType      = strtolower(trim($_POST['reg_type']));
    $name          = trim($_POST['reg_name']);
    $qualification = trim($_POST['reg_qual']);
    $address       = trim($_POST['reg_addr']);
    $city          = trim($_POST['reg_city']);
    $state         = trim($_POST['reg_state']);
    $zip           = trim($_POST['reg_zip']);
    $country       = trim($_POST['reg_country']);
    $phone         = trim($_POST['reg_phone']);
    $imagePath     = '';

    $allowedRoles = ['admin', 'author', 'publisher', 'reviewer'];
    if (!in_array($userType, $allowedRoles)) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid user type provided.'
        ]);
        exit();
    }

    $checkStmt = $con->prepare("SELECT id FROM users WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        echo json_encode([
            'success' => false,
            'message' => 'Email already exists. Please use a different email.'
        ]);
        exit();
    }
    $checkStmt->close();

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // First insert without image
    $stmt = $con->prepare("INSERT INTO users (email, password, user_type, name, qualification, address, city, state, zip, country, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssssss", $email, $hashedPassword, $userType, $name, $qualification, $address, $city, $state, $zip, $country, $phone);

    if (!$stmt->execute()) {
        echo json_encode([
            'success' => false,
            'message' => 'Database error (insert): ' . $stmt->error
        ]);
        exit();
    }

    $userId = $stmt->insert_id; // Get the inserted ID
    $stmt->close();

    // Handle image upload if provided
    if (isset($_FILES['reg_image']) && $_FILES['reg_image']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath   = $_FILES['reg_image']['tmp_name'];
        $fileName      = $_FILES['reg_image']['name'];
        $fileNameCmps  = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        $uploadFileDir = '../../frontend/public/images/adminRegister/';
        $newFileName   = $userId . '.jpg'; // Always save as ID.jpg
        $relativePath  = 'images/adminRegister/' . $newFileName;
        $destPath      = $uploadFileDir . $newFileName;

        if (!is_dir($uploadFileDir)) {
            mkdir($uploadFileDir, 0777, true);
        }

        if (move_uploaded_file($fileTmpPath, $destPath)) {
            $imagePath = $relativePath;

            // Update image path in DB
            $updateStmt = $con->prepare("UPDATE users SET image = ? WHERE id = ?");
            $updateStmt->bind_param("si", $imagePath, $userId);
            $updateStmt->execute();
            $updateStmt->close();
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Image upload failed.'
            ]);
            exit();
        }
    }

    echo json_encode([
        'success' => true,
        'message' => 'User registered successfully.',
        'user_id' => $userId,
        'image'   => $imagePath,
       
    ]);
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Only POST requests are allowed.'
    ]);
}
