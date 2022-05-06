import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchTicket } from "../../slices/tickets";

const SingleTicket = () => {
  const dispatch = useAppDispatch();
  const [ticketData, setTicketData] = useState([]);
  //use react router dom to take the ticket_id out of the params sent from the button click on parent component
  const { ticket_id } = useParams();

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

  console.log(ticketData);

  return <div>SingleTicket</div>;
};

export default SingleTicket;
