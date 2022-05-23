<?php
//include the db connection and auth class
require_once '../index.php';
require_once './form_class.php';

//declare globals and variables
global $conn;

//decode the raw data from the request body
$post = json_decode(file_get_contents("php://input", true));
// var_dump($post);
// echo $post->status;

$ticket_id = $post->ticket_id;
$ticket_status = $post->status;
$updated_ticket_status = "";

//make sure the ticket status request is open and then set it to what we want to update the db table to
if ($ticket_status === 'open') {
    $updated_ticket_status = 'resolved';
}

if ($conn->connect_error) {
    $conn_status = new stdClass();
    $conn_status->message = "Connection failed: " . $conn->connect_error;
    return json_encode($conn_status);
}

$ticketStatus = new Form();
$ticketStatus->ticket_id = $ticket_id;
$ticketStatus->ticket_status = $updated_ticket_status;

$result = $ticketStatus->update_ticket_status();
echo $result;
