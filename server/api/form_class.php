<?php

class Form
{
    /* Class properties (variables) */

    public $userId;
    public $title;
    public $url;
    public $discipline;
    public $message;
    public $imageNames;
    public $ticket_status;
    public $ticket_id;

    public function submitTicket()
    {
        /* Global $conn*/
        global $conn;

        //Trim whitespace and use PHP inbuilt filters to sanitize inputs
        $userId = trim($this->userId);
        $title = trim($this->title);
        $title = htmlspecialchars($title, ENT_QUOTES);
        $url = trim($this->url);
        $url = filter_var($url, FILTER_SANITIZE_URL);
        $discipline = trim($this->discipline);
        $message = trim($this->message);
        $message = htmlspecialchars($message, ENT_QUOTES);
        //store array data using serialize function. To view data need to use unserialize function.
        $imageNames = serialize($this->imageNames);

        //check that a db connection to the table has been established
        if ($conn->connect_error) {
            $conn_status = new stdClass();
            $conn_status->message = "Connection failed: " . $conn->connect_error;
            return json_encode($conn_status);
        }

        //place the ticket info into the ticket DB table
        //prepare the sql statement. Use use ? as placeholders
        $sql = "INSERT INTO ticket (title, msg, ticket_user_id, url, discipline) VALUES (?,?,?,?,?)";
        //prepare the sql query and create a statement result from the query
        $statement = $conn->prepare($sql);
        //bind the params to the statement. s is for string type, i for int.
        $statement->bind_param("ssiss", $title, $message, $userId, $url, $discipline);
        //actually execute the the query by sending the variables to the db
        $statement->execute();
        //grab the id of the column by the last query
        $insert_id = $statement->insert_id;

        //place the image names into the tickets_images DB table
        //use the newly created ticket id and pass into the ticket_image table
        $sql1 = "INSERT INTO ticket_images (images, ticket_images_ticket_id) VALUES (?,?)";
        $statement1 = $conn->prepare($sql1);
        $statement1->bind_param("ss", $imageNames, $insert_id);
        $statement1->execute();

        $ticket_info = new stdClass();

        //return false to notify request that submission failed
        if (!$statement && !$statement1) {
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

    public function update_ticket()
    {

    }

    public function get_tickets()
    {
        /* Global $conn*/
        global $conn;

        $userId = $this->userId;

        //check that a db connection to the table has been established
        if ($conn->connect_error) {
            $conn_status = new stdClass();
            $conn_status->message = "Connection failed: " . $conn->connect_error;
            return json_encode($conn_status);
        }

        $sql = "SELECT * FROM ticket WHERE ticket_user_id = (?)";
        $statement = $conn->prepare($sql);
        $statement->bind_param("i", $userId);
        $statement->execute();
        $result = $statement->get_result();

        $ticket_info = new stdClass();
        //return false to notify request that submission failed
        if (!$statement) {
            $ticket_info->status = 401;
            $ticket_info->message = "Fetching ticket data has failed. Please try again or contact the system admin.";
            return json_encode($ticket_info);
        }

        //close the database connection
        $conn->close();

        //return a successful status
        $ticket_info->status = 200;
        $ticket_info->rows = [];

        if ($result->num_rows > 0) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                // print_r($row);
                array_push($ticket_info->rows, $row);
            }
        } else {
            $ticket_info->rows = "0 results";
        }
        return json_encode($ticket_info);
    }

    public function get_single_ticket()
    {
        /* Global $conn*/
        global $conn;

        $ticket_id = $this->ticket_id;

        //check that a db connection to the table has been established
        if ($conn->connect_error) {
            $conn_status = new stdClass();
            $conn_status->message = "Connection failed: " . $conn->connect_error;
            return json_encode($conn_status);
        }

        $sql = "SELECT * FROM ticket WHERE id = (?)";
        $statement = $conn->prepare($sql);
        $statement->bind_param("i", $ticket_id);
        $statement->execute();
        $result = $statement->get_result();

        $ticket_info = new stdClass();
        //return false to notify request that submission failed
        if (!$statement) {
            $ticket_info->status = 401;
            $ticket_info->message = "Fetching ticket data has failed. Please try again or contact the system admin.";
            return json_encode($ticket_info);
        }

        //close the database connection
        $conn->close();

        //return a successful status
        $ticket_info->status = 200;
        $ticket_info->rows = [];

        if ($result->num_rows > 0) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                // print_r($row);
                array_push($ticket_info->rows, $row);
            }
        } else {
            $ticket_info->rows = "0 results";
        }

        return json_encode($ticket_info);
    }

    public function change_ticket_status()
    {

    }

}
