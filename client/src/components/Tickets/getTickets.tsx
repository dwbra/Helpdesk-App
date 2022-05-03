import React, { useEffect, useState, CSSProperties } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { fetchTickets } from "../../slices/tickets";

const GetTickets = () => {
  const dispatch = useAppDispatch();
  const userId: any = JSON.parse(localStorage.getItem("profile")!).id;

  //create a new piece of state to store the API response data into.
  const [tickets, setTickets] = useState([]);

  //Store API call inside useEffect hook to only render once on component mount.
  useEffect(() => {
    dispatch(fetchTickets(userId)).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
        setTickets(response.payload["rows"]);
      } else {
        alert(response.payload["message"]);
      }
    });
  }, [userId]);

  return (
    <div className="ticket__layout">
      {tickets.map((ticket) => (
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
            <a href="">View ticket</a>
            <a href="">Mark as complete</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetTickets;
