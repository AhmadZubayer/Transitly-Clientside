import React, { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import TicketCard from '../../components/AllTickets/TicketCard';
import Card from '../../components/Card';

export default function AdvertiseTickets() {
    const { setOpen } = useOutletContext();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const {
        data: featuredTickets = [],
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['adminFeaturedTickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets/advertised');
            return res.data;
        }
    });

    const MAX_FEATURED_TICKETS = 6;

    const featuredCount = useMemo(() => {
        return featuredTickets.length;
    }, [featuredTickets]);

    const { mutateAsync: featureTicket, isPending: isFeaturing } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/tickets/${id}/feature`, { adminFeatured: 'Yes' });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminFeaturedTickets'] });
            queryClient.invalidateQueries({ queryKey: ['allFeaturedTickets'] });
            refetch();
        }
    });

    const { mutateAsync: unfeatureTicket, isPending: isUnfeaturing } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/tickets/${id}/feature`, { adminFeatured: 'No' });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminFeaturedTickets'] });
            queryClient.invalidateQueries({ queryKey: ['allFeaturedTickets'] });
            refetch();
        }
    });

    const handleFeature = async (ticket) => {
        const ticketId = ticket._id;
        // In this page, all tickets shown are currently featured
        const isFeatured = true; 

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will remove the ticket from the homepage featured section.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, unfeature it!'
        });

        if (!result.isConfirmed) return;

        try {
            await unfeatureTicket(ticketId);
        } catch (e) {
            console.error('Feature operation failed:', e);
            alert('Failed to update ticket');
        }
    };

    return (
        <div className='p-4'>
            <div className='space-y-4'>
                <div className='flex flex-row items-center gap-3'>
                    <HiMenuAlt2 className='lg:hidden cursor-pointer' onClick={() => setOpen(true)} />
                    <div>
                        <h2 className='text-xl font-black text-gray-800 dark:text-gray-100 font-adaptive'>
                            Featured Tickets ({featuredTickets.length}/{MAX_FEATURED_TICKETS})
                        </h2>
                        <p className='text-[12px] text-gray-500 font-adaptive opacity-70'>Verified tickets that are currently promoted on the homepage Swiper.</p>
                    </div>
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
                        {featuredTickets.length > 0 ? (
                            <>
                                <div className='tickets-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                    {featuredTickets.map((ticket) => {
                                        return (
                                            <div key={ticket._id} className='flex flex-col gap-2 h-full'>
                                                <div className='h-full'>
                                                    <TicketCard ticket={ticket} onClick={() => { }} />
                                                </div>
                                                <button
                                                    type='button'
                                                    className='btn btn-xs btn-ghost text-yellow-500 hover:text-yellow-600 self-end mt-auto'
                                                    disabled={isFeaturing || isUnfeaturing}
                                                    onClick={() => handleFeature(ticket)}
                                                    title='Unfeature this ticket'
                                                    aria-label='Unfeature ticket'
                                                >
                                                    <FaStar size={18} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <Card className='text-center p-12 border-2 border-dashed border-gray-200 dark:border-blue-500/20'>
                                <p className='text-gray-400 font-adaptive'>
                                    No featured tickets yet.
                                </p>
                                <p className='text-[12px] text-gray-400 font-adaptive mt-1'>Approve and feature tickets from Manage Tickets page.</p>
                            </Card>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
