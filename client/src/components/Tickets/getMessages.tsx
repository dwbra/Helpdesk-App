import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchMessages } from "../../slices/tickets";
import CreateTicketComment from "./createTicketComment";

const GetMessages = (props: any) => {
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState([]);
  //set the id from the parent component
  const ticket_id = props.ticketId;
  const userAdmin: any = JSON.parse(localStorage.getItem("profile")!).admin;

  useEffect(() => {
    if (!ticket_id) {
      return;
    }

    dispatch(fetchMessages(ticket_id)).then((response: any) => {
      // console.log(response);
      if (response.meta.requestStatus === "fulfilled") {
        setMessages(response.payload["rows"]);
      } else {
        alert(response.payload["message"]);
      }
    });
  }, [ticket_id, dispatch]);

  //using localstorage data, we can determine if a user is an admin or not.
  //We then can create a custom css class depending on this to show each message with a different color background.
  const messageCSS = () => {
    if (userAdmin === 0) {
      return "messages--notAdmin";
    } else {
      return "messages--isAdmin";
    }
  };

  return (
    <>
      <div>
        {messages.map((message) => (
          <div className={messageCSS()} key={message["id"]}>
            <p>you said:</p>
            <p>{message["msg"]}</p>
          </div>
        ))}
      </div>
      <CreateTicketComment ticketId={ticket_id} />
    </>
  );
};

export default GetMessages;
