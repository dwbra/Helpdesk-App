import React from "react";
import validator from "validator";

interface ticketFormDataType {
  title: string;
  discipline: string;
  message: string;
  website: string;
  ticketImages: {}[];
  imageNames: {};
}

//frontend validation to prevent data from being sent to server that is incorrect
//using validator library to help check data
const ticketFormValidation = (ticketData: ticketFormDataType) => {
  if (!validator.isURL(ticketData.website)) {
    alert("Please enter a valid website URL.");
    return false;
  } else if (
    validator.isEmpty(ticketData.website) ||
    validator.isEmpty(ticketData.title) ||
    validator.isEmpty(ticketData.message)
  ) {
    alert("You cannot have an empty field.");
    return false;
  } else {
    return true;
  }
};

export default ticketFormValidation;
