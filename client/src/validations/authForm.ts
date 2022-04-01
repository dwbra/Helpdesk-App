import React from "react";
import validator from "validator";

interface formDataType {
  name: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

//frontend validation to prevent data from being sent to server that is incorrect
const authFormValidation = (formData: formDataType) => {
  //using validator library to help check data
  if (!validator.isEmail(formData.email)) {
    alert("Please enter a valid email address.");
    return false;
  } else if (!validator.isLength(formData.name, 10)) {
    alert("Please enter your full name.");
    return false;
  } else if (
    validator.isEmpty(formData.name) ||
    validator.isEmpty(formData.email) ||
    validator.isEmpty(formData.password) ||
    validator.isEmpty(formData.confirmedPassword)
  ) {
    alert("You cannot have an empty field.");
    return false;
  } else if (
    !validator.isStrongPassword(formData.password) ||
    !validator.isStrongPassword(formData.confirmedPassword)
  ) {
    alert(
      "Password should be at least 8 characters in length and should include at least one upper case letter, one number, and one special character."
    );
    return false;
  } else {
    return true;
  }
};

export default authFormValidation;
