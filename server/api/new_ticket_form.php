<?php
//include the db connection and auth class
require_once '../index.php'; 
require_once './form_class.php';

//declare globals and variables
global $conn;
//decode the raw data from the request body
$post = json_decode(file_get_contents("php://input",true));
var_dump($post);

$userId = $post->userId;
$title = $post->title;
$discipline = $post->discipline;
$message = $post->message;
$website = $post->website;
// var_dump($images);

if (!$conn) {
    die("Connection failed: " . $conn->connect_error);
  }

$formData = new Form();
$formData->userId = $userId;
$formData->title = $title;
$formData->discipline = $discipline;
$formData->message = $message;
$formData->url = $website;

// $result = $formData->submitTicket();
// echo $result;

if ($formData->submitTicket()) {
  echo http_response_code(200);
} else {
  echo http_response_code(500);
}