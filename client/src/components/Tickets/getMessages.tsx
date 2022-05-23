import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchMessages } from "../../slices/tickets";
import CreateTicketComment from "./createTicketComment";

const GetMessages = (props: any) => {
  const dispatch = useAppDispatch();
  //store dispatch response into state
  const [messages, setMessages] = useState([]);
  //take props from the parent and save ticket_id in new variable
  const ticket_id = props.ticketId;

  useEffect(() => {
    if (!ticket_id) {
      return;
    }

    dispatch(fetchMessages(ticket_id)).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
        setMessages(response.payload["rows"]);
      } else {
        alert(response.payload["message"]);
      }
    });
  }, [ticket_id, dispatch]);

  const messageCSS = (message: any) => {
    for (let i = 0; i < messages.length; i++) {
      if (message["admin"] === 0) {
        return "messages--notAdmin";
      } else {
        return "messages--isAdmin";
      }
    }
  };

  return (
    <>
      <div>
        {messages.map((message) => (
          //on ever map iteration, envoke messageCSS function and pass the current message object as the param.
          //then based on if this particular message is an admin or not, set the css to be different on the message
          <div className={messageCSS(message)} key={message["id"]}>
            {message["admin"] === 0 ? <p>you said:</p> : <p>admin said:</p>}
            <p>{message["msg"]}</p>
          </div>
        ))}
      </div>
      <CreateTicketComment ticketId={ticket_id} />
    </>
  );
};

export default GetMessages;
