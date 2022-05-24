import { WebsiteMargin } from "../styled/styled";
import TicketForm from "../components/ticketForm";

const CreateTicket = () => {
  return (
    <WebsiteMargin>
      <div>
        <h1>Submit a ticket</h1>
        <h3>Create a new ticket here.</h3>
        <p>
          <strong>
            Note - To view existing tickets, please click on "View your tickets"
          </strong>
        </p>
        <TicketForm />
      </div>
    </WebsiteMargin>
  );
};

export default CreateTicket;
