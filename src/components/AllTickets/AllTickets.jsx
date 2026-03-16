import React from 'react';
import TicketCard from './TicketCard';
import TicketSort from '../TicketSort';
import Search from '../Search';
import useAxios from '../../hooks/useAxios';

const AllTickets = () => {
 
    return (

        <div>
            <div>
                <Search></Search>
            </div>
            <div>
                <TicketSort></TicketSort>
            </div>
            <div>
                <h2>
                    {/* Total {allTickets.length} Tickets are Available */}
                </h2>
                <div className='tickets-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
                    {/* {allTickets.map((ticket, idx) =>
                        <TicketCard key={idx} ticket={ticket}></TicketCard>)} */}
                </div>
            </div>

        </div>
    );
};

export default AllTickets;