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
    <div>
      {tickets.map((ticket) => (
        <div>
          <h1>{ticket["id"]}</h1>
          <h1>{ticket["title"]}</h1>
          <h2>{ticket["created"]}</h2>
          <h2>{ticket["status"]}</h2>
          <h2>{ticket["url"]}</h2>
          <h2>{ticket["discipline"]}</h2>
        </div>
      ))}
    </div>
  );
};

export default GetTickets;
