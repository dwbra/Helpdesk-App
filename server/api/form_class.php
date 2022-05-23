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
    public $comment;
    public $is_admin;

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
        $isAdmin = $this->is_admin;

        //check that a db connection to the table has been established
        if ($conn->connect_error) {
            $conn_status = new stdClass();
            $conn_status->message = "Connection failed: " . $conn->connect_error;
            return json_encode($conn_status);
        }

        //if the request comes from an admin, return all tickets else just return specific user tickets based on their ID.
        if ($isAdmin) {
            $sql = "SELECT * FROM ticket";
            $statement = $conn->prepare($sql);
            $statement->execute();
            $result = $statement->get_result();
        } else {
            $sql = "SELECT * FROM ticket WHERE ticket_user_id = (?)";
            $statement = $conn->prepare($sql);
            $statement->bind_param("i", $userId);
            $statement->execute();
            $result = $statement->get_result();
        }

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

    public function get_messages()
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

        $sql = "SELECT * FROM ticket_messages WHERE ticket_messages_id = (?) ORDER BY UNIX_TIMESTAMP(created) ASC";
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

    public function createTicketComment()
    {
        /* Global $conn*/
        global $conn;

        //Trim whitespace and use PHP inbuilt filters to sanitize inputs
        $ticket_id = trim($this->ticket_id);
        $userId = $this->userId;
        $comment = trim($this->comment);
        $comment = htmlspecialchars($comment, ENT_QUOTES);

        //check that a db connection to the table has been established
        if ($conn->connect_error) {
            $conn_status = new stdClass();
            $conn_status->message = "Connection failed: " . $conn->connect_error;
            return json_encode($conn_status);
        }

        //place the comment into the message db table
        //prepare the sql statement. Use use ? as placeholders
        $sql = "INSERT INTO ticket_messages (msg, ticket_messages_id, admin) VALUES (?,?,?)";
        //prepare the sql query and create a statement result from the query
        $statement = $conn->prepare($sql);
        //bind the params to the statement. s is for string type, i for int.
        $statement->bind_param("sii", $comment, $ticket_id, $userId);
        //actually execute the the query by sending the variables to the db
        $statement->execute();

        $comment_info = new stdClass();

        //return false to notify request that submission failed
        if (!$statement) {
            $comment_info->status = 401;
            $comment_info->message = "Adding a new comment to the database has failed. Please try again or contact the system admin.";
            return json_encode($comment_info);
        }

        //close the database connection
        $conn->close();

        //return a successful status
        $comment_info->status = 200;
        return json_encode($comment_info);
    }

    public function get_image_names()
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

        $sql = "SELECT images FROM ticket_images WHERE ticket_images_ticket_id = (?)";
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
        // $ticket_info->unserializedData = [];

        if ($result->num_rows > 0) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                //access the images property in the associated array and store the values in a new variable
                $images = $row['images'];
                //unserialize the value from the array so that it can be passed back as normal data to the frontend
                $unserialized = unserialize($images);
                array_push($ticket_info->rows, $unserialized);
            }
        } else {
            $ticket_info->rows = "0 results";
        }
        return json_encode($ticket_info);
    }

    public function update_ticket_status()
    {
        /* Global $conn*/
        global $conn;

        //Trim whitespace and use PHP inbuilt filters to sanitize inputs
        $ticket_id = $this->ticket_id;
        $updated_ticket_status = $this->ticket_status;

        //check that a db connection to the table has been established
        if ($conn->connect_error) {
            $conn_status = new stdClass();
            $conn_status->message = "Connection failed: " . $conn->connect_error;
            return json_encode($conn_status);
        }

        //place the comment into the message db table
        //prepare the sql statement. Use use ? as placeholders
        $sql = "UPDATE ticket SET status = (?) WHERE id = (?)";
        //prepare the sql query and create a statement result from the query
        $statement = $conn->prepare($sql);
        //bind the params to the statement. s is for string type, i for int.
        $statement->bind_param("si", $updated_ticket_status, $ticket_id);
        //actually execute the the query by sending the variables to the db
        $statement->execute();

        $ticket_status_info = new stdClass();

        //return false to notify request that submission failed
        if (!$statement) {
            $ticket_status_info->status = 401;
            $ticket_status_info->message = "Adding a new comment to the database has failed. Please try again or contact the system admin.";
            return json_encode($ticket_status_info);
        }

        //close the database connection
        $conn->close();

        //return a successful status
        $ticket_status_info->status = 200;
        return json_encode($ticket_status_info);
    }

}
