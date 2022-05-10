import React, { useEffect, useState, CSSProperties } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { fetchTickets } from "../../slices/tickets";

const GetTickets = () => {
  const dispatch = useAppDispatch();
  const userId: any = JSON.parse(localStorage.getItem("profile")!).id;

  //create a new piece of state to store the API response data into.
  const [tickets, setTickets] = useState([]);
  console.log(typeof tickets);
  //Store API call inside useEffect hook to only render once on component mount.
  useEffect(() => {
    if (!userId) {
      return;
    }
    dispatch(fetchTickets(userId)).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
        setTickets(response.payload["rows"]);
      } else {
        alert(response.payload["message"]);
      }
    });
  }, [userId, dispatch]);

  return (
    <div className="ticket__layout">
      {/* needed to include a data type check to enforce the conditional below */}
      {typeof tickets === "object" ? (
        tickets.map((ticket) => (
          <div className="ticket" key={ticket["id"]}>
            <div className="ticket__data">
              <h1>
                ID: <span className="ticket__span">{ticket["id"]}</span>
              </h1>
              <h1>
                Title: <span className="ticket__span">{ticket["title"]}</span>
              </h1>
              <h2>
                Ticket Created:{" "}
                <span className="ticket__span">{ticket["created"]}</span>
              </h2>
              <h2>
                Ticket Status:{" "}
                <span className="ticket__span ticket__status">
                  {ticket["status"]}
                </span>
              </h2>
              <h2>
                Website: <span className="ticket__span">{ticket["url"]}</span>
              </h2>
              <h2>
                Discipline:{" "}
                <span className="ticket__span">{ticket["discipline"]}</span>
              </h2>
            </div>
            <div className="ticket__buttons">
              {/* send the user to a unique page with the ticket_id param to be used to pull individual data from the server */}
              <a href={`/tickets/${ticket["id"]}`}>View ticket</a>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h1>No tickets are currently available to be displayed</h1>
        </div>
      )}
    </div>
  );
};

export default GetTickets;
