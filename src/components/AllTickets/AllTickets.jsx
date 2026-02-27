import React from 'react';
import { useLoaderData } from 'react-router-dom';

const AllTickets = () => {
    const allTickets = useLoaderData();
    
    return (
        <div>
            All available tickets will appear here
            
        </div>
    );
};

export default AllTickets;