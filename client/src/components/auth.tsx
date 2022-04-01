import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorSharp, Visibility, VisibilityOff } from "@material-ui/icons/";
import { Input, Button, InputAdornment, IconButton } from "@material-ui/core/";
import authFormValidation from "../validations/authForm";

import { useSelector } from "react-redux";
import { createUser, loginUser, userSlice } from "../slices/user";
import { RootState, useAppDispatch, useAppSelector } from "../store";

const Auth = () => {
  const dispatch = useAppDispatch();
  //define to be able to push uses after a successful response from server
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.users);
  const error = useAppSelector((state) => state.user.error);
  const status = useAppSelector((state) => state.user.status);
  // const localStorageUser:any = JSON.parse(localStorage.getItem('profile')!);
  // console.log(user, status, error);

  //set the initial state for the auth form to be signin
  const [isSignup, setIsSignup] = useState(false);
  //create a new set of data for the form and set the initial state as the empty fields above
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: ""
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
    if (isSignup === false) {
      await dispatch(loginUser(formData)).then((response) => {
        //check the response from the dispatch reducer to ensure it passed server validation
        if (response.meta.requestStatus === "fulfilled") {
          localStorage.setItem("profile", JSON.stringify(response.payload));
          navigate("/tickets");
          window.location.reload();
        } else {
          //show the user the error message from the server
          alert(response.payload);
        }
      });
    } else {
      if (authFormValidation(formData) === true) {
        dispatch(createUser(formData)).then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            localStorage.setItem("profile", JSON.stringify(response.payload));
            navigate("/submit-ticket");
            window.location.reload();
          } else {
            alert(response.payload);
          }
        });
      }
    }
  };

  //when any input field in the formData state is updated it will take a copy of the initial state and save the new value in the corresponding name field.
  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    // console.log(event.target.value);
  };

  return (
    <div>
      <h3>{isSignup ? "Sign Up" : "Sign In"}</h3>
      <form onSubmit={handleSubmit} className="authform">
        {isSignup && (
          <>
            <Input
              required
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </>
        )}
        <Input
          required
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="johnsmith@email.com"
        />
        <Input
          required
          name="password"
          placeholder="Password"
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {isSignup && (
          <Input
            required
            name="confirmedPassword"
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
          />
        )}
        <Button type="submit" variant="contained" color="primary">
          {isSignup ? "Sign Up" : "Sign In"}
        </Button>
        <Button onClick={switchMode}>
          {isSignup
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default Auth;
