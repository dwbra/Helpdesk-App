import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {ErrorSharp, Visibility, VisibilityOff} from "@material-ui/icons/";
import {Input, Button, InputAdornment, IconButton } from "@material-ui/core/";
import axios from 'axios';
import validator from 'validator';

import {useSelector, useDispatch} from 'react-redux';

const Auth = () => {
    //set the initial state for the auth form to be signin
    const [isSignup, setIsSignup] = useState(false);
    //define to be able to push uses after a successful response from server
    const navigate = useNavigate();
    //create a new set of data for the form and set the initial state as the empty fields above
    const [formData, setFormData] = useState({ 
        name: '',
        email: '', 
        password: '', 
        confirmedPassword: ''
    });
    //create new set of state to hold the falsy value for show password
    const [showPassword, setShowPassword] = useState(false);
    //onclick, use the setShowPassword function above to alter the state and make the showPassword value truthy
    const handleShowPassword = () => setShowPassword(!showPassword);
    
    //onclick function to handle if a user wants to sign in or sign up. 
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    //handle the data once auth form submitted
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        //if the form is a sign in, send the request to the login.php file
        if (isSignup === false) {
            await axios.post('http://localhost:8000/api/login.php', { 
                email: formData.email,
                password: formData.password,
            })
            .then(function (response) {
                console.log(response.data);
                const data = response.data;
                const error = response.data.message;
                // console.log(response.status);
                // console.log(response.statusText);
                // console.log(response.headers);
                // console.log(response.config);
                //display any errors shown from server.
                if (error) {
                    alert(error);
                //if no errors, save users credentials in the localstorage
                } else {
                    localStorage.setItem("profile", JSON.stringify(data));
                    // let profile = localStorage.getItem("profile");
                    // console.log(profile);
                    navigate('/ticket-log');
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        //if the form is a new registration then send request to the create_user.php file
        } else {
            if (formValidation() === true) {
                await axios.post('http://localhost:8000/api/create_user.php', { 
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmedPassword: formData.confirmedPassword,
                })
                .then(function (response) {
                    const data = response.data;
                    const error = response.data.message;
                    // console.log(response.data);
                    //show any errors that may come from creating new user such as PW strength etc.
                    if (error) {
                        alert(error)
                    } else {
                    //new user will be created and then set their user_info into localstorage
                        localStorage.setItem("profile", JSON.stringify(data));
                        alert("Your new user has been created.")
                        // let profile = localStorage.getItem("profile");
                        // console.log(profile);
                        navigate('/submit-ticket');
                        window.location.reload();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    };
    
    //when any input field in the formData state is updated it will take a copy of the initial state and save the new value in the corresponding name field.
    const handleChange = (event:any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        // console.log(event.target.value);
    };

    //frontend validation to prevent data from being sent to server that is incorrect
    const formValidation = () => {
        //using validator library to help check data 
        if (!validator.isEmail(formData.email)) {
            alert("Please enter a valid email address.")
            return false;
        } else if ((!validator.isLength(formData.name, 10))) {
            alert("Please enter your full name.")
            return false;
        } else if ((validator.isEmpty(formData.name)) || (validator.isEmpty(formData.email)) || (validator.isEmpty(formData.password)) || (validator.isEmpty(formData.confirmedPassword))  ) {
            alert("You cannot have an empty field.")
            return false;
        } else if ((!validator.isStrongPassword(formData.password)) || (!validator.isStrongPassword(formData.confirmedPassword)) ) {
            alert("Your password is not strong enough. Please add uppercase, lowercase, special characters and numbers.")
            return false;
        }
        else {
            return true;
        }
    }

    return (
        <div>
            <h3>{isSignup ? 'Sign Up' : 'Sign In'}</h3>
            <form onSubmit={handleSubmit} className="authform">
            { isSignup && (
            <>
              <Input required name="name" placeholder="Full Name" onChange={handleChange}/>
            </>
            )}
            <Input required name="email" onChange={handleChange} type="email" placeholder="johnsmith@email.com" />
            <Input required name="password" placeholder="Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} 
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            { isSignup && <Input required name="confirmedPassword" onChange={handleChange} type={showPassword ? 'text' : 'password'} placeholder="Confirm Password"/> }
            <Button type="submit" variant="contained" color="primary">
            { isSignup ? 'Sign Up' : 'Sign In' }
            </Button>
            <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
            </Button>
        </form>
        </div>
    )
}

export default Auth;