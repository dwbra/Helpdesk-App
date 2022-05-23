<?php

require_once "{$_SERVER['DOCUMENT_ROOT']}/router.php";

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

// get all user tickets
post('/api', 'get_all_user_tickets.php');

// get messages
post('/api', 'get_messages.php');

// get single ticket
post('api', 'get_single_ticket.php');

// new ticket comment
post('api', 'new_ticket_comment.php');

//update ticket status
post('api', 'update_ticket_status.php');
