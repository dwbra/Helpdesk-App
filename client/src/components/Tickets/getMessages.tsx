import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchMessages } from "../../slices/tickets";
import CreateTicketComment from "./createTicketComment";

const GetMessages = (props: any) => {
  const dispatch = useAppDispatch();
  //store dispatch response into state
  interface IMessage {
    admin: number;
    created?: Date;
    id?: number;
    msg: string;
    ticket_messages_id?: number;
  }
  const [messages, setMessages] = useState<IMessage[]>([]);
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
  }, [ticket_id]);

  //create react handler to pass to child component createTicketComment.tsx
  const handleCreateTicketMessage = (newlyCreatedTicketComment: string) => {
    //destructuring allows you to pull out all values from an object and assign to a new constant.
    //saves you writing multiple const = with . notation
    const { admin: isAdmin } = JSON.parse(localStorage.getItem("profile")!);
    //all useState hooks have access to the currentState at that exact moment
    setMessages((currentState: IMessage[]) => {
      return [
        ...currentState,
        { msg: newlyCreatedTicketComment, admin: isAdmin }
      ];
    });
  };

  const messageCSS = (admin: number) => {
    for (let i = 0; i < messages.length; i++) {
      if (admin === 0) {
        return "messages--notAdmin";
      } else {
        return "messages--isAdmin";
      }
    }
  };

  return (
    <>
      <div>
        {messages.length > 0 &&
          messages.map((message) => (
            //on every map iteration, envoke messageCSS function and pass the current message object as the param.
            //then based on if this particular message is an admin or not, set the css to be different on the message
            <div className={messageCSS(message.admin)} key={message["id"]}>
              {message["admin"] === 0 ? <p>you said:</p> : <p>admin said:</p>}
              <p>{message["msg"]}</p>
            </div>
          ))}
      </div>
      <CreateTicketComment
        ticketId={ticket_id}
        onCreateTicketComment={handleCreateTicketMessage}
      />
    </>
  );
};

export default GetMessages;
