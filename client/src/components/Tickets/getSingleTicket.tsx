import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchTicket, updateTicketStatus } from "../../slices/tickets";
import GetMessages from "./getMessages";
import GetImages from "./getImages";

const SingleTicket = () => {
  const dispatch = useAppDispatch();
  const [ticketData, setTicketData] = useState([]);
  //use react router dom to take the ticket_id out of the params sent from the button click on parent component
  const { ticket_id } = useParams();
  const [ticketComplete, setTicketComplete] = useState(false);
  const userAdmin: number = JSON.parse(localStorage.getItem("profile")!).admin;

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

  const markTicketAsComplete = async () => {
    const ticketStatus = {
      ticket_id: ticketData[0]["id"],
      status: ticketData[0]["status"]
    };
    if (!ticketStatus) {
      console.log("no status set in state");
      return;
    }
    dispatch(updateTicketStatus(ticketStatus)).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
      } else {
        console.log(response.payload["message"]);
      }
    });
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
              {/* based on the status and the user type display different buttons */}
              {ticketData[0]["status"] !== "open" ? (
                <button>Ticket Resolved</button>
              ) : (
                <button onClick={markTicketAsComplete}>Mark as complete</button>
              )}
              {userAdmin ? (
                <button onClick={markTicketAsComplete}>Delete Ticket</button>
              ) : (
                console.log()
              )}
            </div>
          </div>
        ))}
      </div>
      <GetImages ticketId={ticket_id} />
      <h3>Your conversation so far</h3>
      {ticketData.map((ticket) => (
        <div className="singleticket__msg" key={ticket["id"]}>
          <p>you said:</p>
          <p>{ticket["msg"]}</p>
        </div>
      ))}
      {/* need to specify props on child with any type before declaring on parent */}
      <GetMessages ticketId={ticket_id} />
    </>
  );
};

export default SingleTicket;
