import { WebsiteMargin } from "../styled/styled";
import GetTickets from "../components/Tickets/getTickets";

const Tickets = () => {
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
