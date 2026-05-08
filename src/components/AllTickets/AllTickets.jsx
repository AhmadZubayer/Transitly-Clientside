import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TicketCard from './TicketCard';
import TicketSort from '../TicketSort';
import Search from '../Search';
import Loading from '../Loading';
import CustomPagination from '../Pagination';
import useAxios from '../../hooks/useAxios';
import Card from '../Card';

const AllTickets = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [searchParams] = useSearchParams();
    const TICKETS_PER_PAGE = 8; 

    useEffect(() => {
        setPage(1);
    }, [searchParams.toString()]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['tickets', page, searchParams.toString()],
        queryFn: async () => {
            const skip = (page - 1) * TICKETS_PER_PAGE;
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
            <dialog id="ticket_sort_modal" className="modal modal-bottom sm:modal-middle">
                <div 
                    className="modal-box max-w-md p-0 bg-base-100 border border-base-300 shadow-2xl" 
                    role="dialog" 
                    aria-modal="true" 
                    aria-labelledby="filter-title"
                    onClick={(e) => {
                        if (e.target.type === 'submit') {
                            setTimeout(() => document.getElementById('ticket_sort_modal').close(), 100);
                        }
                    }}
                >
                    <div className='px-4 py-3 border-b flex justify-between items-center bg-base-200/50 backdrop-blur-md sticky top-0 z-10'>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost font-adaptive text-base-content/70">✕</button>
                        </form>
                        
                        <h3 id="filter-title" className="font-bold text-base font-adaptive uppercase tracking-wide text-base-content">Filter & Sort</h3>
                        
                        <button 
                            type="submit" 
                            form="ticket_sort_form"
                            className="btn btn-sm btn-1 px-4"
                        >
                            Search
                        </button>
                    </div>

                    <div className='max-h-[70vh] overflow-y-auto p-2'>
                        <div>
                            <TicketSort />
                        </div>
                    </div>
                </div>
            </dialog>

            <div className='flex flex-col gap-4'>
                <Card className='p-4'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                        <div className='flex-1 flex justify-start'>
                            <button 
                                className="btn btn-1 flex items-center gap-2" 
                                onClick={() => document.getElementById('ticket_sort_modal').showModal()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Filters & Sorting
                            </button>
                        </div>

                        <div className='flex-1 flex justify-center'>
                            <h2 className='text-xl font-black text-gray-800 dark:text-gray-100 font-adaptive text-center'>
                                {totalCount} Tickets Available
                            </h2>
                        </div>

                        <div className='flex-1 flex justify-end w-full md:w-auto'>
                            <Search />
                        </div>
                    </div>
                </Card>

                {totalPages > 1 && (
                    <div className='flex justify-center'>
                        <CustomPagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                        />
                    </div>
                )}

                <div className='min-h-[400px]'>
                    {isLoading && (
                        <div className='flex justify-center items-center h-64'>
                            <Loading />
                        </div>
                    )}  
                    {isError && (
                        <div className='text-center p-6 text-red-500'>
                            Error loading tickets: {error?.message}
                        </div>
                    )}

            
                    {!isLoading && !isError && (
                        <>
                            <div className='tickets-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                {tickets.map((ticket, idx) => (
                                    <div key={ticket._id || idx} className='h-full'>
                                        <TicketCard
                                            ticket={ticket}
                                            onClick={() => handleTicketClick(ticket)}
                                        />
                                    </div>
                                ))}
                            </div>

                        
                            {tickets.length === 0 && (
                                <Card className='py-20 bg-transparent rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center'>
                                    <p className='text-gray-500 dark:text-gray-400 text-lg font-adaptive'>No tickets match your current filters.</p>
                                    <button 
                                        className='btn btn-ghost mt-2 text-blue-600 dark:text-blue-400'
                                        onClick={() => navigate('/all-tickets')}
                                    >
                                        Clear all filters
                                    </button>
                                </Card>
                            )}
                        </>
                    )}
                </div>

        
                {totalPages > 1 && !isLoading && (
                    <div className='flex justify-center pt-4'>
                        <CustomPagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTickets;
