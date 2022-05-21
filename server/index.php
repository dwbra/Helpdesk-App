<?php
//only allow the function to run once to avoid multiple calls
//cors function will allow all requests from remote origins with all post types
if (!function_exists('cors')) {
    function cors()
    {
        // Allow from any origin
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
            header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400'); // cache for 1 day
        }

        // Access-Control headers are received during OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
                // may also be using PUT, PATCH, HEAD etc
                header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

            }

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
                header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");

                exit(0);

            }

        }
    }
}
cors();
// //name the type of cookie session created
// session_name('Portal_Session');
// //set the lifetime of the cookie
// $lifetime = 3600;
// session_set_cookie_params($lifetime);
// //start a new session and get access to the $_SESSION superglobal.
// session_start();
//load my dependencies
require 'vendor/autoload.php';
//call my env variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
//set the db connection credentials using dotenv to store them securely
$dbUsername = $_ENV['DBUSER'];
$dbPassword = $_ENV['DBPW'];
$dbName = $_ENV['DBNAME'];
$dbServerName = "digital-dan.com.au";
$dbPort = "3306";

//activate error reporting
$driver = new mysqli_driver();
//allow all errors minus index errors
$driver->report_mode = MYSQLI_REPORT_ALL&~MYSQLI_REPORT_INDEX;

global $conn;

// create new connection instance from mysqli
$conn = new mysqli($dbServerName, $dbUsername, $dbPassword, $dbName, $dbPort);
// mysqli_set_charset($conn, 'utf8');

// check connection and die safely if failed
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully";
