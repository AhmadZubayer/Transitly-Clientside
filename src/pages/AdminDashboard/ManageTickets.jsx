import React, { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { FaStar, FaRegStar, FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import TicketCard from '../../components/AllTickets/TicketCard';
import CustomPagination from '../../components/Pagination';
import Card from '../../components/Card';

const ManageTickets = () => {
    const { setOpen } = useOutletContext();
    const axiosSecure = useAxiosSecure();
    const [filter, setFilter] = useState('all'); 
    const [page, setPage] = useState(1);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const TICKETS_PER_PAGE = 20;

    const {
        data = { tickets: [], total: 0 },
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['adminManageTickets', page, filter],
        queryFn: async () => {
            const skip = (page - 1) * TICKETS_PER_PAGE;
            const res = await axiosSecure.get(`/tickets/all?filter=${filter}&limit=${TICKETS_PER_PAGE}&skip=${skip}`);
            return res.data;
        }
    });

    const tickets = data.tickets || [];
    const total = data.total || 0;
    const totalPages = Math.ceil(total / TICKETS_PER_PAGE);
    const MAX_FEATURED_TICKETS = 6;

    const featuredCount = useMemo(() => {
        return tickets.filter(t => (t.adminFeatured || 'No') === 'Yes').length;
    }, [tickets]);

    const { mutateAsync: verifyTicket, isPending: isVerifying } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/tickets/${id}/verify`);
            return res.data;
        },
        onSuccess: () => refetch()
    });

    const { mutateAsync: rejectTicket, isPending: isRejecting } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/tickets/${id}/reject`);
            return res.data;
        },
        onSuccess: () => refetch()
    });

    const { mutateAsync: deleteTicket, isPending: isDeleting } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/tickets/${id}`);
            return res.data;
        },
        onSuccess: () => refetch()
    });

    const handleReject = async (ticket) => {
        const id = getTicketId(ticket);
        try {
            await rejectTicket(id);
        } catch (e) {
            console.error('Reject failed:', e);
            alert('Failed to reject ticket');
        }
    };

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

    const getTicketId = (ticket) =>
        typeof ticket._id === 'string' ? ticket._id : ticket._id?.toString?.();

    const handleApprove = async (ticket) => {
        const id = getTicketId(ticket);
        try {
            await verifyTicket(id);
            Swal.fire({
                icon: 'success',
                title: 'Ticket Approved!',
                text: 'The ticket is now verified and visible on the platform.',
                timer: 2500,
                showConfirmButton: false,
                timerProgressBar: true
            });
        } catch (e) {
            console.error('Approve failed:', e);
            alert('Failed to approve ticket');
        }
    };

    const handleDelete = async (ticket) => {
        setDeleteConfirm(ticket);
        document.getElementById('delete_confirm_modal').showModal();
    };

    const confirmDelete = async () => {
        if (!deleteConfirm) return;
        const id = getTicketId(deleteConfirm);
        try {
            await deleteTicket(id);
            setDeleteConfirm(null);
            document.getElementById('delete_confirm_modal').close();
        } catch (e) {
            console.error('Delete failed:', e);
            alert('Failed to delete ticket');
        }
    };

    const handleFeature = async (ticket) => {
        const id = getTicketId(ticket);
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
                await unfeatureTicket(id);
            } else {
                await featureTicket(id);
            }
        } catch (e) {
            console.error('Feature operation failed:', e);
            alert('Failed to update ticket');
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const busy = isVerifying || isRejecting || isDeleting || isFeaturing || isUnfeaturing;

    return (
        <div className='p-4'>
            <div className='space-y-4'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                    <div className='flex flex-row items-center gap-3'>
                        <HiMenuAlt2 className='lg:hidden cursor-pointer' onClick={() => setOpen(true)} />
                        <div>
                            <h2 className='text-xl font-bold text-gray-800 font-adaptive'>
                                Manage Tickets ({total})
                            </h2>
                            <p className='text-[12px] text-gray-500 mt-0.5 font-adaptive'>Page {page} of {totalPages}</p>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='join'>
                            <button
                                type='button'
                                className={`btn btn-sm join-item ${filter === 'all' ? 'btn-active' : ''}`}
                                onClick={() => {
                                    setFilter('all');
                                    setPage(1);
                                }}
                            >
                                All Tickets
                            </button>
                            <button
                                type='button'
                                className={`btn btn-sm join-item ${filter === 'pending' ? 'btn-active' : ''}`}
                                onClick={() => {
                                    setFilter('pending');
                                    setPage(1);
                                }}
                            >
                                Pending Approvals
                            </button>
                        </div>
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
                        {totalPages > 1 && (
                            <div className='flex justify-center'>
                                <CustomPagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                />
                            </div>
                        )}

                        {tickets.length > 0 ? (
                            <div className='tickets-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                {tickets.map((ticket) => {
                                    const isVerified = (ticket.adminVerified || 'No') === 'Yes';
                                    const isRejected = (ticket.adminVerified || 'No') === 'Rejected';
                                    const isPending = !isVerified && !isRejected;

                                    return (
                                        <div key={getTicketId(ticket)} className='flex flex-col gap-2 h-full'>
                                            <div className='h-full'>
                                                <TicketCard ticket={ticket} onClick={() => {}} />
                                            </div>
                                            <div className='flex justify-center gap-3 items-center mt-auto p-3'>
                                                {isPending && (
                                                    <>
                                                        <button
                                                            type='button'
                                                            className='w-8 h-8 flex items-center justify-center rounded-full border border-emerald-500/50 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors disabled:opacity-30'
                                                            disabled={busy}
                                                            onClick={() => handleApprove(ticket)}
                                                            title='Approve this ticket'
                                                        >
                                                            <FaCheck size={12} />
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='w-8 h-8 flex items-center justify-center rounded-full border border-red-500/50 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-30'
                                                            disabled={busy}
                                                            onClick={() => handleReject(ticket)}
                                                            title='Reject this ticket'
                                                        >
                                                            <FaTimes size={12} />
                                                        </button>
                                                    </>
                                                )}
                                                {isRejected && (
                                                    <span className='text-[9px] font-bold uppercase tracking-wider text-red-500 px-3 py-1 border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 rounded-full'>
                                                        Rejected
                                                    </span>
                                                )}
                                                <button
                                                    type='button'
                                                    className={`w-8 h-8 flex items-center justify-center rounded-full border transition-colors disabled:opacity-30 ${
                                                        (ticket.adminFeatured || 'No') === 'Yes'
                                                            ? 'border-yellow-400 text-yellow-500 bg-yellow-50/50 dark:bg-yellow-500/10'
                                                            : 'border-gray-300 dark:border-gray-600 text-gray-400 hover:border-yellow-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/10'
                                                    }`}
                                                    disabled={busy || (featuredCount >= MAX_FEATURED_TICKETS && (ticket.adminFeatured || 'No') === 'No')}
                                                    onClick={() => handleFeature(ticket)}
                                                    title={featuredCount >= MAX_FEATURED_TICKETS && (ticket.adminFeatured || 'No') === 'No' ? `Maximum ${MAX_FEATURED_TICKETS} featured tickets reached` : `${(ticket.adminFeatured || 'No') === 'Yes' ? 'Unfeature' : 'Feature'} this ticket`}
                                                >
                                                    {(ticket.adminFeatured || 'No') === 'Yes' ? (
                                                        <FaStar size={12} />
                                                    ) : (
                                                        <FaRegStar size={12} />
                                                    )}
                                                </button>
                                                <button
                                                    type='button'
                                                    className='w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-30'
                                                    disabled={busy}
                                                    onClick={() => handleDelete(ticket)}
                                                    title='Delete this ticket'
                                                >
                                                    <MdDelete size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <Card className='text-center p-12'>
                                <p className='text-gray-600 dark:text-gray-400 text-lg'>
                                    {filter === 'pending'
                                        ? 'No tickets pending approval'
                                        : 'No tickets found'}
                                </p>
                            </Card>
                        )}

                        {totalPages > 1 && (
                            <div className='flex justify-center'>
                                <CustomPagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>

            <dialog id="delete_confirm_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are You Sure to Delete this Ticket?</h3>
                    <p className="py-4 text-gray-600">
                        This action cannot be undone. The ticket will be permanently deleted.
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                        <button
                            className="btn btn-error"
                            onClick={confirmDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ManageTickets;
