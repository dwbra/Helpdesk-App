<?php
require '../index.php';

//set the db connection credentials using dotenv to store them securely
$apiKey = $_ENV['s3Key'];
$apiSecret = $_ENV['s3Secret'];
$bucket = 'clientportal2021';

$client = new \Aws\S3\S3Client([
    //change region to match the region of the bucket you're trying to access
    'version' => 'latest',
    'region' => 'ap-southeast-2',
    'credentials' => [
        'key' => $apiKey,
        'secret' => $apiSecret,
    ],
]);

$image_keys = json_decode(file_get_contents("php://input", true));
// var_dump($image_keys);

$response = [];

try {
    $post_size = sizeof($image_keys);
    for ($i = 0; $i < $post_size; $i++) {
        $result = $client->getObject($bucket, array($image_keys[$i]));
        array_push($response, $result);
    }
} catch (S3Exception $e) {
    // Catch an S3 specific exception.
    echo $e->getMessage();
}

return json_encode($response);
