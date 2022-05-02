import { WebsiteMargin } from "../styled/styled";
import { useNavigate } from "react-router-dom";
import GetTickets from "../components/Tickets/getTickets";

const Tickets = () => {
  const navigate = useNavigate();
  const user: any = JSON.parse(localStorage.getItem("profile")!);

  return (
    <WebsiteMargin>
      <div>
        <h1>Your tickets</h1>
      </div>
      <GetTickets />
    </WebsiteMargin>
  );
};

export default Tickets;
