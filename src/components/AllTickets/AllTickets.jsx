import React from 'react';
import { useLoaderData } from 'react-router-dom';
import TicketCard from './TicketCard';

const AllTickets = () => {
    const data = useLoaderData();
    const allTickets = data.tickets;

    return (
        <div>
            <h2>
                Total {allTickets.length} Tickets are Available 
            </h2>
            <div className='tickets-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
                {allTickets.map((ticket, idx) => 
                <TicketCard key={idx} ticket={ticket}></TicketCard>)}
            </div>
            
        </div>
    );
};

export default AllTickets;