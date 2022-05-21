<?php
//include the db connection and auth class
require_once '../index.php';
require_once './form_class.php';

//declare globals and variables
global $conn;
//decode the raw data from the request body
$post = json_decode(file_get_contents("php://input", true));
// var_dump($post);

$ticket_id = $post;

if ($conn->connect_error) {
    $conn_status = new stdClass();
    $conn_status->message = "Connection failed: " . $conn->connect_error;
    return json_encode($conn_status);
}

$ticketData = new Form();
$ticketData->ticket_id = $ticket_id;

$result = $ticketData->get_image_names();
echo $result;
