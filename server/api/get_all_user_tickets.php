<?php
//include the db connection and auth class
require_once '../index.php';
require_once './form_class.php';

//declare globals and variables
global $conn;
//decode the raw data from the request body
$post = json_decode(file_get_contents("php://input", true));
// var_dump($post);

$userId = $post->id;
$isAdmin = $post->admin;
// echo $isAdmin;

if ($conn->connect_error) {
    $conn_status = new stdClass();
    $conn_status->message = "Connection failed: " . $conn->connect_error;
    return json_encode($conn_status);
}

$formData = new Form();
$formData->userId = $userId;
$formData->is_admin = $isAdmin;

$result = $formData->get_tickets();
echo $result;
