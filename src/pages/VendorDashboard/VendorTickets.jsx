import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import VendorTicketCard from './VendorTicketCard';
import Card from '../../components/Card';

const VendorTickets = () => {
    const { setOpen } = useOutletContext();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const {
        data: tickets = [],
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['vendorTickets', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/vendor/${user.email}`);
            return res.data;
        }
    });

    const { mutateAsync: deleteTicket, isPending: isDeleting } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/tickets/${id}`);
            return res.data;
        },
        onSuccess: () => refetch()
    });

    const handleDelete = async (ticket) => {
        const ok = window.confirm(`Delete ticket "${ticket.ticketTitle}"?`);
        if (!ok) return;
        try {
            await deleteTicket(ticket._id);
        } catch (e) {
            console.error('Delete failed:', e);
            alert('Failed to delete ticket');
        }
    };

    const handleEdit = (ticket) => {
        navigate(`/vendor-dashboard/add-ticket?edit=${ticket._id}`);
    };

    return (
        <div className='p-4'>
            <div className='space-y-4'>
                <div className='flex flex-row justify-start items-center gap-3'>
                    <HiMenuAlt2 className='lg:hidden cursor-pointer' onClick={() => setOpen(true)} />
                    <h2 className='text-xl font-bold text-gray-800 font-adaptive'>
                        My Tickets ({tickets.length})
                    </h2>
                </div>

                {isLoading && (
                    <div className='flex justify-center items-center p-8'>
                        <Loading />
                    </div>
                )}

                {isError && (
                    <div className='text-center p-4 text-red-500 font-adaptive'>
                        <p>Error loading tickets: {error?.message}</p>
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        {tickets.length > 0 ? (
                            <div className='tickets-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                {tickets.map((ticket) => (
                                    <div key={ticket._id} className='h-full'>
                                        <VendorTicketCard
                                            ticket={ticket}
                                            disableActions={isDeleting}
                                            onDelete={() => handleDelete(ticket)}
                                            onEdit={() => handleEdit(ticket)}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Card className='text-center p-8'>
                                <p className='text-gray-600 dark:text-gray-400 text-lg font-adaptive'>No tickets found</p>
                                <p className='text-gray-400 dark:text-gray-500 text-sm mt-1 font-adaptive'>Add a ticket to see it here</p>
                            </Card>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default VendorTickets;
