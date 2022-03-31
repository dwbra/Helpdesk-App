import React, { useEffect, useState } from 'react';
import { WebsiteMargin } from '../styled/styled';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TicketForm from '../components/ticketForm';

const CreateTicket = () => {
    const navigate = useNavigate();
    //set user to expect an array of strings, Use exclamation mark at end to tell TSC to ignore warning as you know its fine
    const user:any = JSON.parse(localStorage.getItem('profile')!);
    // console.log(user);

    return (
        <WebsiteMargin>
        <div>
            <h1>Submit a ticket</h1>
            <h3>Create a new ticket here.</h3>
            <p><strong>Note - To view existing tickets, please click on "View your tickets"</strong></p>
            <TicketForm/>
        </div>
        </WebsiteMargin>
    )
};

export default CreateTicket;