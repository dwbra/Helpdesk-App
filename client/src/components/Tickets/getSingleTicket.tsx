import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchTicket } from "../../slices/tickets";
import GetMessages from "./getMessages";
import GetImages from "./getImages";

const SingleTicket = () => {
  const dispatch = useAppDispatch();
  const [ticketData, setTicketData] = useState([]);
  //use react router dom to take the ticket_id out of the params sent from the button click on parent component
  const { ticket_id } = useParams();
  const [ticketComplete, setTicketComplete] = useState(false);

  useEffect(() => {
    if (!ticket_id) {
      return;
    }

    dispatch(fetchTicket(ticket_id)).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
        setTicketData(response.payload["rows"]);
      } else {
        alert(response.payload["message"]);
      }
    });
  }, [ticket_id, dispatch]);

  const markTicketAsComplete = () => {
    console.log("complete this function");
  };

  return (
    <>
      <div className="singleticket">
        {ticketData.map((ticket) => (
          <div className="singleticket__ticket" key={ticket["id"]}>
            <div className="singleticket__data">
              <h1>
                Ticket ID:{" "}
                <span className="singleticket__data--span">{ticket["id"]}</span>
              </h1>
              <h1>
                Title:{" "}
                <span className="singleticket__data--span">
                  {ticket["title"]}
                </span>
              </h1>

              <h2>
                Website:{" "}
                <span className="singleticket__data--span">
                  {ticket["url"]}
                </span>
              </h2>
              <h2>
                Discipline:{" "}
                <span className="singleticket__data--span">
                  {ticket["discipline"]}
                </span>
              </h2>
            </div>
            <div className="singleticket__buttons">
              <h2 className="test">
                Ticket Created:{" "}
                <span className="singleticket__data--span">
                  {ticket["created"]}
                </span>
              </h2>
              <h2>
                Ticket Status:{" "}
                <span className="singleticket__data--span singleticket__data--status">
                  {ticket["status"]}
                </span>
              </h2>
              {/* insert buttons that have onclick dispatches on them to update ticket status'  */}
              {ticketComplete ? (
                <button onClick={markTicketAsComplete}>Ticket Completed</button>
              ) : (
                <button onClick={markTicketAsComplete}>Mark as complete</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <h3>Your conversation so far</h3>
      {ticketData.map((ticket) => (
        <div className="singleticket__msg" key={ticket["id"]}>
          <p>you said:</p>
          <p>{ticket["msg"]}</p>
        </div>
      ))}
      {/* need to specify props on child with any type before declaring on parent */}
      <GetImages ticketId={ticket_id} />
      <GetMessages ticketId={ticket_id} />
    </>
  );
};

export default SingleTicket;
