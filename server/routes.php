<?php

require_once("{$_SERVER['DOCUMENT_ROOT']}/router.php");

//show if login successful
get('/', 'index.php');

//access pages when php server running
get('http://localhost:8000/test', 'index.php');

// Login
post('/api', 'login.php');

// Create User
post('/api', 'create_user.php');

// create new ticket
post('/api', 'new_ticket_form.php');

// get S3 credentials
post('/api', 's3.php');

