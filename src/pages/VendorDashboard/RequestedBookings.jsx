import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/Loading';
import Card from '../../components/Card';

const RequestedBookings = () => {
    const { setOpen } = useOutletContext();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {
        data: bookings = [],
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['vendorRequestedBookings', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/vendor/${user.email}`);
            return res.data;
        }
    });

    const { mutateAsync: updateStatus, isPending: isUpdating } = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/bookings/${id}/status`, { status });
            return res.data;
        },
        onSuccess: () => {
            refetch();
        }
    });

    const handleAction = async (id, status) => {
        const actionText = status === 'accepted' ? 'Accept' : 'Reject';
        const result = await Swal.fire({
            title: `Are you sure?`,
            text: `You are about to ${actionText.toLowerCase()} this booking request.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: status === 'accepted' ? '#3085d6' : '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: `Yes, ${actionText} it!`
        });

        if (result.isConfirmed) {
            try {
                await updateStatus({ id, status });
                Swal.fire({
                    icon: 'success',
                    title: `Booking ${actionText}ed`,
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (err) {
                console.error(`Failed to ${status} booking:`, err);
                Swal.fire({
                    icon: 'error',
                    title: 'Action Failed',
                    text: `Could not ${status} the booking.`
                });
            }
        }
    };

    return (
        <div className='p-4'>
            <div className='space-y-4'>
                <div className='flex flex-row items-center gap-3'>
                    <HiMenuAlt2 className='lg:hidden cursor-pointer' onClick={() => setOpen(true)} />
                    <div>
                        <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 font-adaptive'>
                            Requested Bookings ({bookings.length})
                        </h2>
                        <p className='text-xs text-gray-500 font-adaptive opacity-70'>Approve or reject incoming booking requests from customers.</p>
                    </div>
                </div>

                {isLoading && (
                    <div className='flex justify-center items-center p-8'>
                        <Loading />
                    </div>
                )}

                {isError && (
                    <div className='text-center p-4 text-red-500 font-adaptive'>
                        <p>Error loading requests: {error?.message}</p>
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        {bookings.length > 0 ? (
                            <Card className='overflow-hidden !p-0'>
                                <div className='overflow-x-auto'>
                                    <table className='table table-zebra table-sm w-full'>
                                        <thead>
                                            <tr className='bg-gray-100 dark:bg-gray-800/50'>
                                                <th className='text-gray-900 dark:text-gray-200 font-bold font-adaptive uppercase text-[11px]'>No.</th>
                                                <th className='text-gray-900 dark:text-gray-200 font-bold font-adaptive uppercase text-[11px]'>User Email</th>
                                                <th className='text-gray-900 dark:text-gray-200 font-bold font-adaptive uppercase text-[11px]'>Ticket</th>
                                                <th className='text-gray-900 dark:text-gray-200 font-bold font-adaptive uppercase text-[11px]'>Qty</th>
                                                <th className='text-gray-900 dark:text-gray-200 font-bold font-adaptive uppercase text-[11px]'>Total</th>
                                                <th className='text-gray-900 dark:text-gray-200 font-bold font-adaptive uppercase text-[11px]'>Status</th>
                                                <th className='text-gray-900 dark:text-gray-200 font-bold font-adaptive uppercase text-[11px] text-center'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking, index) => (
                                                <tr key={booking._id} className='hover:bg-gray-100/50 dark:hover:bg-gray-700/50'>
                                                    <th className='text-gray-600 dark:text-gray-400 font-adaptive'>{index + 1}</th>
                                                    <td className='text-gray-700 dark:text-gray-300 font-adaptive text-[12px]'>{booking.userEmail}</td>
                                                    <td className='font-semibold text-gray-800 dark:text-gray-100 font-adaptive text-[12px]'>
                                                        {booking.ticket?.ticketTitle}
                                                        <div className="text-[10px] opacity-60 font-normal">{booking.ticket?.from} → {booking.ticket?.to}</div>
                                                    </td>
                                                    <td className='text-gray-700 dark:text-gray-300 font-adaptive'>{booking.quantity}</td>
                                                    <td className='font-bold text-gray-800 dark:text-gray-100 font-adaptive'>৳{booking.totalPrice}</td>
                                                    <td className='font-adaptive'>
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                            booking.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                                                            booking.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                            'bg-green-100 text-green-700'
                                                        }`}>
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                    <td className='text-center'>
                                                        {booking.status === 'pending' ? (
                                                            <div className='flex justify-center gap-2'>
                                                                <button 
                                                                    onClick={() => handleAction(booking._id, 'accepted')}
                                                                    disabled={isUpdating}
                                                                    className='btn btn-xs btn-success text-white'
                                                                    title="Accept Request"
                                                                >
                                                                    <FaCheck />
                                                                </button>
                                                                <button 
                                                                    onClick={() => handleAction(booking._id, 'rejected')}
                                                                    disabled={isUpdating}
                                                                    className='btn btn-xs btn-error text-white'
                                                                    title="Reject Request"
                                                                >
                                                                    <FaTimes />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className='text-[10px] text-gray-400 italic'>No actions</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        ) : (
                            <Card className='text-center p-12'>
                                <p className='text-gray-600 dark:text-gray-400 text-lg font-adaptive'>No requested bookings found</p>
                            </Card>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default RequestedBookings;