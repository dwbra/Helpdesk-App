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

//declare globals and variables
global $conn;
//decode the raw data from the request body
$post = json_decode(file_get_contents("php://input",true));
// var_dump($post);

$email = $post->email;
$password = $post->password;

if (!$conn) {
    die("Connection failed: " . $conn->connect_error);
  }

$user = new User();
$user->email = $email;
$user->password = $password;

$result = $user->login();
echo $result;
