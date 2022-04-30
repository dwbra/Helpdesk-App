<?php
//include the db connection and auth class
require_once '../index.php';
require_once './form_class.php';

//declare globals and variables
global $conn;
//decode the raw data from the request body
$post = json_decode(file_get_contents("php://input", true));
// var_dump($post);
// echo $post->imageNames;

$userId = $post->userId;
$title = $post->title;
$discipline = $post->discipline;
$message = $post->message;
$website = $post->website;
$imageNames = $post->imageNames;

if ($conn->connect_error) {
    $conn_status = new stdClass();
    $conn_status->message = "Connection failed: " . $conn->connect_error;
    return json_encode($conn_status);
}

$formData = new Form();
$formData->userId = $userId;
$formData->title = $title;
$formData->discipline = $discipline;
$formData->message = $message;
$formData->url = $website;
$formData->imageNames = $imageNames;

$result = $formData->submitTicket();
echo $result;
