import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TicketCard from './TicketCard';
import TicketSort from '../TicketSort';
import Search from '../Search';
import Loading from '../Loading';
import CustomPagination from '../Pagination';
import useAxios from '../../hooks/useAxios';

const AllTickets = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [searchParams] = useSearchParams();
    const TICKETS_PER_PAGE = 20;

    // Reset page to 1 when search parameters change
    useEffect(() => {
        setPage(1);
    }, [searchParams.toString()]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['tickets', page, searchParams.toString()],
        queryFn: async () => {
            const skip = (page - 1) * TICKETS_PER_PAGE;

            // Build query string with pagination and filters
            const params = new URLSearchParams(searchParams);
            params.set('limit', TICKETS_PER_PAGE);
            params.set('skip', skip);

            const res = await axiosInstance.get(`/tickets?${params.toString()}`);
            return res.data;
        }
    });

    const tickets = data?.tickets || [];
    const totalCount = data?.total || 0;
    const totalPages = Math.ceil(totalCount / TICKETS_PER_PAGE);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTicketClick = (ticket) => {
        navigate(`/ticket/${ticket._id}`);
    };

    return (
        <div className='p-6'>
            {/* Main Layout - Two Divs in Flex Row */}
            <div className='flex flex-col lg:flex-row gap-4'>
                {/* Left Div - Ticket Sort */}
                <div className='lg:w-1/5'>
                    <div className='sticky top-4'>
                        <TicketSort />
                    </div>
                </div>

                {/* Right Div - Four Child Divs in Flex Column */}
                <div className='lg:w-4/5 flex flex-col gap-4'>
                    {/* First Div - Total Count and Search Bar (Flex Row, Space Between) */}
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                        {/* Left: Total Available Ticket Label */}
                        <h2 className='text-xl font-bold text-gray-800'>
                            Total {totalCount} Tickets Available
                        </h2>

                        {/* Right: Search Bar */}
                        <Search />
                    </div>

                    {/* Second Div - Top Pagination */}
                    {totalPages > 1 && (
                        <div>
                            <CustomPagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                            />
                        </div>
                    )}

                    {/* Third Div - Ticket Container */}
                    <div>
                        {/* Loading State */}
                        {isLoading && (
                            <div className='flex justify-center items-center p-6'>
                                <Loading />
                            </div>
                        )}

                        {/* Error State */}
                        {isError && (
                            <div className='text-center p-6 text-red-500'>
                                Error loading tickets: {error?.message}
                            </div>
                        )}

                        {/* Tickets Grid */}
                        {!isLoading && !isError && (
                            <>
                                <div className='tickets-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                    {tickets.map((ticket, idx) => (
                                        <TicketCard
                                            key={ticket._id || idx}
                                            ticket={ticket}
                                            onClick={() => handleTicketClick(ticket)}
                                        />
                                    ))}
                                </div>

                                {/* No Tickets Message */}
                                {tickets.length === 0 && (
                                    <div className='text-center p-6 text-gray-500'>
                                        No tickets found.
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Fourth Div - Bottom Pagination */}
                    {totalPages > 1 && !isLoading && (
                        <div>
                            <CustomPagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllTickets;