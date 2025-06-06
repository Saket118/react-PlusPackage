<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include_once "db.php"; // Your DB connection here

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Only POST method allowed"]);
    exit;
}

// Get user ID from URL, e.g., UpdateUser.php?id=123 or from PATH_INFO
// For example, if using Rewrite rules or REST framework,
// otherwise pass id via GET param or POST field.
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["message" => "User ID is required"]);
    exit;
}

$id = intval($_GET['id']);

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid User ID"]);
    exit;
}

// Collect form data
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$user_type = $_POST['user_type'] ?? '';
$title = $_POST['title'] ?? '';
$name = $_POST['name'] ?? '';
$qualification = $_POST['qualification'] ?? '';
$address = $_POST['address'] ?? '';
$city = $_POST['city'] ?? '';
$state = $_POST['state'] ?? '';
$zip = $_POST['zip'] ?? '';
$country = $_POST['country'] ?? '';
$phone = $_POST['phone'] ?? '';

// Basic validation
if (empty($email) || empty($user_type) || empty($name)) {
    http_response_code(400);
    echo json_encode(["message" => "Email, user type, and name are required"]);
    exit;
}

// Check if email is valid
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid email format"]);
    exit;
}

// Prepare SQL update query parts
$setParts = [];
$params = [];
$paramTypes = "";

// Update email
$setParts[] = "email = ?";
$params[] = $email;
$paramTypes .= "s";

// Update user_type
$setParts[] = "user_type = ?";
$params[] = $user_type;
$paramTypes .= "s";

// Update title
$setParts[] = "title = ?";
$params[] = $title;
$paramTypes .= "s";

// Update name
$setParts[] = "name = ?";
$params[] = $name;
$paramTypes .= "s";

// Update qualification
$setParts[] = "qualification = ?";
$params[] = $qualification;
$paramTypes .= "s";

// Update address
$setParts[] = "address = ?";
$params[] = $address;
$paramTypes .= "s";

// city, state, zip, country, phone
$setParts[] = "city = ?";
$params[] = $city;
$paramTypes .= "s";

$setParts[] = "state = ?";
$params[] = $state;
$paramTypes .= "s";

$setParts[] = "zip = ?";
$params[] = $zip;
$paramTypes .= "s";

$setParts[] = "country = ?";
$params[] = $country;
$paramTypes .= "s";

$setParts[] = "phone = ?";
$params[] = $phone;
$paramTypes .= "s";

// Handle password: only update if not empty
if (!empty($password)) {
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $setParts[] = "password = ?";
    $params[] = $hashedPassword;
    $paramTypes .= "s";
}

// Handle image upload if file sent
$imageFileName = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . "/uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $tmpName = $_FILES['image']['tmp_name'];
    $originalName = basename($_FILES['image']['name']);
    $ext = pathinfo($originalName, PATHINFO_EXTENSION);
    $allowedExts = ['jpg', 'jpeg', 'png', 'gif'];

    if (!in_array(strtolower($ext), $allowedExts)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid image type. Allowed types: jpg, jpeg, png, gif"]);
        exit;
    }

    $newFileName = "user_{$id}_" . time() . "." . $ext;
    $destination = $uploadDir . $newFileName;

    if (move_uploaded_file($tmpName, $destination)) {
        $imageFileName = $newFileName;
        $setParts[] = "image = ?";
        $params[] = $imageFileName;
        $paramTypes .= "s";
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to move uploaded file"]);
        exit;
    }
}

// Construct SQL
$sql = "UPDATE users SET " . implode(", ", $setParts) . " WHERE id = ? LIMIT 1";
$params[] = $id;
$paramTypes .= "i";

$stmt = $con->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["message" => "Failed to prepare statement: " . $con->error]);
    exit;
}

// Bind params dynamically
$stmt->bind_param($paramTypes, ...$params);

if ($stmt->execute()) {
    echo json_encode(["message" => "User updated successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to update user: " . $stmt->error]);
}

$stmt->close();
$con->close();
