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

$image_data = json_decode(file_get_contents("php://input", true));
$image_keys = $image_data[0];

//create an empty array to store the image URLS into
$response = [];

//create a pre-signed URL ensuring the images are accessed securly only by you
// https:docs.aws.amazon.com/sdk-for-php/v3/developer-guide/s3-presigned-url.html
try {
    $post_size = sizeof($image_keys);
    for ($i = 0; $i < $post_size; $i++) {
        $result = $client->getCommand('GetObject', [
            "Bucket" => $bucket,
            "Key" => $image_keys[$i],
        ]);
        $request = $client->createPresignedRequest($result, '+20 minutes');
        $presignedUrl = (string) $request->getUri();
        array_push($response, $presignedUrl);
    }
} catch (S3Exception $e) {
    // Catch an S3 specific exception.
    echo $e->getMessage();
}

echo json_encode($response);
