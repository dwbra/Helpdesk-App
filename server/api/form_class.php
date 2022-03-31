<?php 

Class Form {
	/* Class properties (variables) */

    public $userId;
    public $title;
    public $url;
    public $discipline;
    public $message;
    public $images;
    
    public function submitTicket() {
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
            die("Connection failed: " . $conn->connect_error);
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
        
        //return false to notify request that submission failed
        if (!$statement)  {
            echo ("Adding record failed: " . $conn->connect_error);
            return false;
        }

        //close the database connection 
        $conn->close();

        //return true to notify request that submission was successful
        return true;
    }


    public function updateTicket() {

    }

    public function getTicket() {

    }

    public function changeTicketStatus() {

    }

}