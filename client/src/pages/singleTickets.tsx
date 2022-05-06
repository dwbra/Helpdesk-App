import { WebsiteMargin } from "../styled/styled";
import { useNavigate } from "react-router-dom";
import SingleTicket from "../components/Tickets/getSingleTicket";

const Tickets = () => {
  const navigate = useNavigate();
  const user: any = JSON.parse(localStorage.getItem("profile")!);

  return (
    <WebsiteMargin>
      <div>
        <h1>Ticket Details</h1>
      </div>
      <SingleTicket />
    </WebsiteMargin>
  );
};

export default Tickets;
