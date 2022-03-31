<?php
require '../index.php';

//set the db connection credentials using dotenv to store them securely
$apiKey = $_ENV['s3Key'];
$apiSecret = $_ENV['s3Secret'];
$bucket = 'clientportal2021';

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;

$client = new \Aws\S3\S3Client([
    //change region to match the region of the bucket you're trying to access
    'version' => 'latest',
    'region'  => 'ap-southeast-2',
    'credentials' => [
        'key'    => $apiKey,
        'secret' => $apiSecret,
    ]
]);
$post = json_decode(file_get_contents("php://input",true));
// var_dump($post);

$post_size = sizeof($post);
$keyArray = [];
for ($i = 0; $i < $post_size; $i++) {
    $image = $post[$i]->data_url;
    $image_parts = explode(";base64,", $post[$i]->data_url);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];
    $extension = strtolower($image_type);
    $key = md5(uniqid()) . "." . $extension;
    array_push($keyArray, $key);
    $imageData = explode(";base64,", $image);
    $result = base64_decode(end($imageData));

    try {
        // print_r($client->upload($bucket, $key, $result));
        $client->upload($bucket, $key, $result);
    } catch (S3Exception $e) {
        // Catch an S3 specific exception.
        echo $e->getMessage();
    }
};

var_dump($keyArray);