import React, { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import TicketCard from '../../components/AllTickets/TicketCard';

const AdvertiseTickets = () => {
    const axiosSecure = useAxiosSecure();
    const TICKETS_PER_PAGE = 100;

    const {
        data = { tickets: [], total: 0 },
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['adminVerifiedTicketsForAds'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/all?limit=100&skip=0`);
            return res.data;
        }
    });

    const allTickets = Array.isArray(data.tickets) ? data.tickets : [];
    const totalTickets = data.total || 0;

    const MAX_FEATURED_TICKETS = 6;

    const verifiedTickets = useMemo(() => {
        return allTickets.filter(t =>
            (t.adminVerified || 'No') === 'Yes' && (t.adminFeatured || 'No') === 'Yes'
        );
    }, [allTickets]);

    const featuredCount = useMemo(() => {
        return allTickets.filter(t => (t.adminFeatured || 'No') === 'Yes').length;
    }, [allTickets]);

    const { mutateAsync: featureTicket, isPending: isFeaturing } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/tickets/${id}/feature`, { adminFeatured: 'Yes' });
            return res.data;
        },
        onSuccess: () => refetch()
    });

    const { mutateAsync: unfeatureTicket, isPending: isUnfeaturing } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/tickets/${id}/feature`, { adminFeatured: 'No' });
            return res.data;
        },
        onSuccess: () => refetch()
    });

    const handleFeature = async (ticket) => {
        const isFeatured = (ticket.adminFeatured || 'No') === 'Yes';

        if (!isFeatured && featuredCount >= MAX_FEATURED_TICKETS) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'warning',
                title: `Cannot feature more than ${MAX_FEATURED_TICKETS} tickets`,
                text: 'Please unfeature a ticket first.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#fff3cd',
                color: '#856404'
            });
            return;
        }
        try {
            if (isFeatured) {
                await unfeatureTicket(ticket._id);
            } else {
                await featureTicket(ticket._id);
            }
        } catch (e) {
            console.error('Feature operation failed:', e);
            alert('Failed to update ticket');
        }
    };

    const handlePageChange = (event, value) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='p-4'>
            <div className='space-y-4'>
                <div>
                    <h2 className='text-xl font-bold text-gray-800 font-adaptive'>
                        Featured Tickets ({verifiedTickets.length}/{MAX_FEATURED_TICKETS})
                    </h2>
                    <p className='text-[12px] text-gray-500 font-adaptive opacity-70'>Verified tickets that are currently promoted on the homepage Swiper.</p>
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
                        {verifiedTickets.length > 0 ? (
                            <>
                                <div className='tickets-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                    {verifiedTickets.map((ticket) => {
                                        const isFeatured = (ticket.adminFeatured || 'No') === 'Yes';
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
                                                    title={isFeatured ? 'Unfeature this ticket' : 'Feature this ticket'}
                                                    aria-label={isFeatured ? 'Unfeature ticket' : 'Feature ticket'}
                                                >
                                                    {isFeatured ? (
                                                        <FaStar size={18} />
                                                    ) : (
                                                        <FaRegStar size={18} />
                                                    )}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className='text-center p-12 bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800'>
                                <p className='text-gray-400 font-adaptive'>
                                    No featured tickets yet.
                                </p>
                                <p className='text-[12px] text-gray-400 font-adaptive mt-1'>Approve and feature tickets from Manage Tickets page.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdvertiseTickets;
