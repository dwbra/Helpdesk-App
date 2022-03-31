import React from 'react';
import Auth from '../components/auth';
import { WebsiteMargin } from '../styled/styled';

const Dashboard = () => {

    return (
        <WebsiteMargin>
            <div>
            <h1>Welcome to our support system.</h1>
            <div>
                <Auth/>
            </div>
            </div>
        </WebsiteMargin>
    )
};

export default Dashboard;