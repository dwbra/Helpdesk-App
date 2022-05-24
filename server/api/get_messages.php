<?php
//include the db connection and auth class
require_once '../index.php';
require_once './form_class.php';
//decode the raw data from the request body
$post = json_decode(file_get_contents("php://input", true));

$ticket_id = $post;

if ($conn->connect_error) {
    $conn_status = new stdClass();
    $conn_status->message = "Connection failed: " . $conn->connect_error;
    return json_encode($conn_status);
}

$messageData = new Form();
$messageData->ticket_id = $ticket_id;

$result = $messageData->get_messages();
echo $result;
