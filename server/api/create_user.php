<?php
//name the type of cookie session created
session_name('Portal_Session');
//set the lifetime of the cookie
$lifetime = 3600;
session_set_cookie_params($lifetime);
//start a new session and get access to the $_SESSION superglobal.
session_start();
//include the db connection and auth class
require_once '../index.php';
require_once './user_class.php';

//decode the raw data from the request body
$post = json_decode(file_get_contents("php://input"), true);

//grab data from the post array
$name = $post['name'];
$email = $post['email'];
$password = $post['password'];
$confirmedPW = $post['confirmedPassword'];

//check that a db connection to the table has been established
if ($conn->connect_error) {
    $conn_status = new stdClass();
    $conn_status->message = "Connection failed: " . $conn->connect_error;
    return json_encode($conn_status);
}

//create a new instance of the User class and define properties
$new_user = new User();
$new_user->name = $name;
$new_user->email = $email;
$new_user->password = $password;
$new_user->confirmed = $confirmedPW;

//call the addUser method on the new instance and get the result
$result = $new_user->add_user();
//echo the result so that it is received by the AXIOS request as the response
echo $result;
