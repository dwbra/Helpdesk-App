import React, { useEffect, useState } from 'react';
import { WebsiteMargin } from '../styled/styled';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Tickets = () => {
    const navigate = useNavigate();
    const user:any = JSON.parse(localStorage.getItem('profile')!);

    return (
        <WebsiteMargin>
        <div>
            <h1>Your tickets</h1>
        </div>
        </WebsiteMargin>
    )
};

export default Tickets;