import { WebsiteMargin } from "../styled/styled";
import SingleTicket from "../components/Tickets/getSingleTicket";

const Tickets = () => {
  return (
    <WebsiteMargin>
      <div>
        <h1>Ticket details</h1>
      </div>
      <SingleTicket />
    </WebsiteMargin>
  );
};

export default Tickets;
