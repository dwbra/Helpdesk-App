<?php

class Form
{
    /* Class properties (variables) */

    public $userId;
    public $title;
    public $url;
    public $discipline;
    public $message;
    public $images;

    public function submitTicket()
    {
        /* Global $conn*/
        global $conn;

        //Trim whitespace and use PHP inbuilt filters to sanitize inputs
        $userId = trim($this->userId);
        $title = trim($this->title);
        $title = filter_var($title, FILTER_SANITIZE_STRING);
        $url = trim($this->url);
        $url = filter_var($url, FILTER_SANITIZE_URL);
        $discipline = trim($this->discipline);
        $message = trim($this->message);
        $message = filter_var($message, FILTER_SANITIZE_STRING);

        //check that a db connection to the table has been established
        if ($conn->connect_error) {
            $conn_status = new stdClass();
            $conn_status->message = "Connection failed: " . $conn->connect_error;
            return json_encode($conn_status);
        }

        //prepare the sql statement. Use use ? as placeholders
        $sql = "INSERT INTO tickets (title, msg, user_id, url, discipline) VALUES (?,?,?,?,?)";
        //prepare the sql query and create a statement result from the query
        $statement = $conn->prepare($sql);
        //bind the params to the statement. s is for string type, i for int.
        $statement->bind_param("ssiss", $title, $message, $userId, $url, $discipline);
        //actually execute the the query by sending the variables to the db
        $statement->execute();
        // var_dump($statement);

        $ticket_info = new stdClass();

        //return false to notify request that submission failed
        if (!$statement) {
            $ticket_info->status = 401;
            $ticket_info->message = "Adding a new ticket to the database has failed. Please try again or contact the system admin.";
            return json_encode($ticket_info);
        }

        //close the database connection
        $conn->close();

        //return a successful status
        $ticket_info->status = 200;
        return json_encode($ticket_info);
    }

    public function updateTicket()
    {

    }

    public function getTicket()
    {

    }

    public function changeTicketStatus()
    {

    }

}
