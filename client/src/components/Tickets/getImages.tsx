import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { getImageNames } from "../../slices/tickets";
import axios from "axios";

const GetImages = (props: any) => {
  const ticket_id = props.ticketId;
  const [ticketNames, setTicketNames] = useState([]);
  const dispatch = useAppDispatch();

  //handle all get/post side effects in the useEffect
  useEffect(() => {
    if (!ticket_id) {
      return;
    }
    //async thunk from the slice dispatches the request to get the dat from the api
    dispatch(getImageNames(ticket_id)).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
        const responseTicketNames = response.payload.rows;
        setTicketNames(responseTicketNames);
        // console.log(ticketNames);
      } else {
        alert(response.payload["message"]);
      }
    });
    //write an async function inside the useEffect to give time for the above dispatch to complete, update the state, and then
    //pass that updated state to the S3 file. Envoke the function at the very end of the useEffect.
    async function getAllImages() {
      if (ticketNames.length > 0) {
        await axios
          .post("http://localhost:8000/api/get_s3_images.php", ticketNames)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    getAllImages();
  }, [props]);

  //   console.log(ticketNames);

  return <></>;
};

export default GetImages;
