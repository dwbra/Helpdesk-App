<?php
//include the db connection and auth class
require_once '../index.php';
require_once './form_class.php';

//declare globals and variables
global $conn;
//decode the raw data from the request body
$post = json_decode(file_get_contents("php://input", true));
// var_dump($post);

$comment = $post->comment;
$ticket_id = $post->ticketID;
$userId = $post->userId;

if ($conn->connect_error) {
    $conn_status = new stdClass();
    $conn_status->message = "Connection failed: " . $conn->connect_error;
    return json_encode($conn_status);
}

$commentData = new Form();
$commentData->ticket_id = $ticket_id;
$commentData->comment = $comment;
$commentData->userId = $userId;

$result = $commentData->createTicketComment();
echo $result;
