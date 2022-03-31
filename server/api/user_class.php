<?php
require_once '../index.php';

class User {
	/* Class properties (variables) */
	
	/* The ID of the logged in account (or NULL if there is no logged in account) */
	private $id;
	
	/* The email of the logged in account (or NULL if there is no logged in account) */
	public $email;

    /* The email of the logged in account (or NULL if there is no logged in account) */
	public $name;

    /* The pw of the logged in account (or NULL if there is no logged in account) */
	public $password;

	/* TRUE if the user is authenticated, FALSE otherwise */
	private $authenticated;

    /* TRUE if the user is authenticated, FALSE otherwise */
	private $admin;


    // // Validate e-mail
    // if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    //   echo("$email is a valid email address");
    // } else {
    //   echo("$email is not a valid email address");
    // }

    /* Add a new account to the system and return its ID (the account_id column of the accounts table) */
    public function addUser() {
        /* Global $conn*/
        global $conn;
        
        /* Trim the strings to remove extra spaces */
        $name = trim($this->name);
        $name = htmlspecialchars($name, ENT_QUOTES);
        // $name = filter_var($name, FILTER_SANITIZE_STRING);
        $email = trim($this->email);
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        $password = trim($this->password);
        $password = htmlspecialchars($password, ENT_QUOTES);
        // $password = filter_var($password, FILTER_SANITIZE_STRING);
        $confirmedPW = trim($this->confirmed);
        $confirmedPW = htmlspecialchars($confirmedPW, ENT_QUOTES);
        // $confirmedPW = filter_var($confirmedPW, FILTER_SANITIZE_STRING);

        //validate pws are the same
        if ($password !== $confirmedPW) {
            $msg = 'Passwords do not match.';
            $error = new stdClass();
            $error->message = $msg;
            return json_encode($error);
        }

        // Validate password strength
        $uppercase = preg_match('@[A-Z]@', $password);
        $lowercase = preg_match('@[a-z]@', $password);
        $number    = preg_match('@[0-9]@', $password);
        $specialChars = preg_match('@[^\w]@', $password);

        if (!$uppercase || !$lowercase || !$number || !$specialChars || strlen($password) < 8) {
            $msg = 'Password should be at least 8 characters in length and should include at least one upper case letter, one number, and one special character.';
            $error = new stdClass();
            $error->message = $msg;
            return json_encode($error);
        }

        //encrypt pw before saving it to the db. 
        $hash = password_hash($password, PASSWORD_DEFAULT);

        //check that a db connection to the table has been established
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        //prepare the sql statement. Use use ? as placeholders
        $sql = "INSERT INTO portal_users (name, email, password) VALUES (?,?,?)";
        //prepare the sql query and create a statement result from the query 
        $statement = $conn->prepare($sql); 
        //bind the params to the statement. s is for string type. 
        //if we wanted to add multiple params, it would be ("ss", $email, $password)
        $statement->bind_param("sss", $name, $email, $hash);
        //actually execute the the query by sending the variables to the db
        $statement->execute();
        // var_dump($statement);
        
        //output error message if execution failed
        if (!$statement)  {
            die("Adding record failed: " . $conn->connect_error); 
        }

        //create object to contain user data
        $user_info = new stdClass();
        $user_info->id = $conn->insert_id;
        $user_info->email = $email;

        //close the database connection 
        $conn->close();
        //return the user data to use for setting localstorage for session data
        return json_encode($user_info);
    }


    /* Login with username and password */
    public function login() {
        /* Global $conn object */
        global $conn;
        
        $email = trim($this->email);
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        $password = trim($this->password);
        $password = htmlspecialchars($password, ENT_QUOTES);


        //prepare the sql statement. Use use ? as placeholders
        $sql = "SELECT * FROM portal_users WHERE email = ?";
        //prepare the sql query and create a statement result from the query 
        $statement = $conn->prepare($sql); 
        //bind the params to the statement. s is for string type. 
        //if we wanted to add multiple params, it would be ("ss", $email, $password)
        $statement->bind_param("s", $email);
        //actually execute the the query by sending the variables to the db
        $statement->execute();
        //get a sql result from the statement
        $result = $statement->get_result();
        //fetch a particular rows data
        $user = $result->fetch_assoc();

        // var_dump($user);

        if (is_array($user)) {
            if (password_verify($password, $user['password'])) {
                //Authentication succeeded.
                //create object to contain user data
                $user_info = new stdClass();
                $user_info->id = $user['id'];
                $user_info->email = $user['email'];
                $user_info->admin = $user['admin'];

                //close the database connection 
                $conn->close();
                //return the user data to use for setting localstorage for session data
                return json_encode($user_info);
            }
        }
        //If we are here, it means the authentication failed
        
        $msg = 'Your login was unsuccessful. Incorrect Password';
        $error = new stdClass();
        $error->message = $msg;
        return json_encode($error);
    }
}