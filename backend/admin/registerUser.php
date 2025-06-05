<?php

include_once "../db.php"; // DB connection file

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

$secretKey = "your_super_secret_key"; // Update to your secure key

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Check all required fields
    if (
        !isset($_POST['reg_email']) || 
        !isset($_POST['reg_pass']) || 
        !isset($_POST['reg_cpass']) || 
        !isset($_POST['reg_type']) || 
        !isset($_POST['reg_name']) || 
        !isset($_POST['reg_title']) || 
        !isset($_POST['reg_qual']) || 
        !isset($_POST['reg_addr']) || 
        !isset($_POST['reg_city']) || 
        !isset($_POST['reg_state']) || 
        !isset($_POST['reg_zip']) || 
        !isset($_POST['reg_country']) || 
        !isset($_POST['reg_phone'])
    ) {
        echo json_encode([
            'success' => false,
            'message' => 'All fields are required.'
        ]);
        exit();
    }

    // Get and clean input data
    $email         = trim($_POST['reg_email']);
    $password      = trim($_POST['reg_pass']);
    $userType      = strtolower(trim($_POST['reg_type']));
    $name          = trim($_POST['reg_name']);
    $qualification = trim($_POST['reg_qual'] ?? '');
    $address       = trim($_POST['reg_addr'] ?? '');
    $city          = trim($_POST['reg_city'] ?? '');
    $state         = trim($_POST['reg_state'] ?? '');
    $zip           = trim($_POST['reg_zip'] ?? '');
    $country       = trim($_POST['reg_country'] ?? '');
    $phone         = trim($_POST['reg_phone'] ?? '');

    // Validate user type
    $allowedRoles = ['admin', 'author', 'publisher', 'reviewer'];
    if (!in_array($userType, $allowedRoles)) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid user type provided.'
        ]);
        exit();
    }

    // Check for duplicate email
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

    // Handle image upload FIRST
    $imagePath = '';
    if (isset($_FILES['reg_image']) && $_FILES['reg_image']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath   = $_FILES['reg_image']['tmp_name'];
        $fileName      = $_FILES['reg_image']['name'];
        $fileNameCmps  = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        if (!in_array($fileExtension, $allowedExtensions)) {
            echo json_encode([
                'success' => false,
                'message' => 'Invalid file type. Only images are allowed.'
            ]);
            exit();
        }
     
        $newFileName = uniqid('user_', true) . '.' . $fileExtension;
        $uploadFileDir = '../../frontend/public/images/';
        $relativePath = 'images/' . $newFileName;

        if (!is_dir($uploadFileDir)) {
            mkdir($uploadFileDir, 0777, true);
        }

        $dest_path = $uploadFileDir . $newFileName;
        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            $imagePath = $relativePath; // This is what we store in DB
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Failed to upload image.'
            ]);
            exit();
        }
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Insert into database
    $stmt = $con->prepare("INSERT INTO users (email, password, user_type, name, qualification, address, city, state, zip, country, phone, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssssss", $email, $hashedPassword, $userType, $name, $qualification, $address, $city, $state, $zip, $country, $phone, $imagePath);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'User registered successfully.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error registering user: ' . $stmt->error
        ]);
    }

    $stmt->close();
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Only POST requests are allowed.'
    ]);
}
