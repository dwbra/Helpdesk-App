import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getImageNames } from "../../slices/tickets";
import axios from "axios";

const GetImages = (props: any) => {
  const ticket_id = props.ticketId;
  const [ticketNames, setTicketNames] = useState([]);
  const dispatch = useAppDispatch();
  const [ticketSigURL, setticketSigURL] = useState([]);

  //handle all get/post side effects in the useEffect
  useEffect(() => {
    if (!ticket_id) {
      return;
    }
    //async thunk from the slice dispatches the request to get the data from the api
    dispatch(getImageNames(ticket_id)).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
        const responseTicketNames = response.payload.rows;
        setTicketNames(responseTicketNames);
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
            const data = response.data;
            setticketSigURL(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    getAllImages();
  }, [props]);

  return (
    <>
      <div className="presigned-images">
        {ticketSigURL.length > 0 &&
          ticketSigURL.map((image) => (
            <img src={image} alt="ticket images" key={image} />
          ))}
      </div>
    </>
  );
};

export default GetImages;
