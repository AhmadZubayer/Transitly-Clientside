import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import BookingCard from '../../components/AllTickets/BookingCard';
import BookingConfirmationModal from '../../components/BookingConfirmationModal';
import Loading from '../../components/Loading';
import Card from '../../components/Card';

const UserBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { setOpen } = useOutletContext();
    const [selectedBooking, setSelectedBooking] = useState(null);

    const { data: bookings = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['userBookings', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/bookings/user/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    useEffect(() => {
        if (selectedBooking) {
            setTimeout(() => {
                const modal = document.getElementById('booking_confirmation_modal');
                if (modal) {
                    modal.showModal();
                }
            }, 0);
        }
    }, [selectedBooking]);

    const handleBookingClick = (booking) => {
        setSelectedBooking(booking);
    };

    return (
        <div className='p-4'>
            <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                    <HiMenuAlt2 className='lg:hidden cursor-pointer text-xl' onClick={() => setOpen(true)} />
                    <h2 className='text-xl font-bold text-gray-800 font-adaptive'>
                        My Bookings ({bookings.length})
                    </h2>
                </div>

                {isLoading && (
                    <div className='flex justify-center items-center p-8'>
                        <Loading />
                    </div>
                )}

                {isError && (
                    <div className='text-center p-4 text-red-500 font-adaptive'>
                        <p>Error loading bookings: {error?.message}</p>
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        {bookings.length > 0 ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                {bookings.map((booking) => (
                                    <div key={booking._id} className='h-full'>
                                        <BookingCard
                                            booking={booking}
                                            onClick={() => handleBookingClick(booking)}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Card className='text-center p-8'>
                                <p className='text-gray-600 dark:text-gray-400 text-lg font-adaptive'>No bookings found</p>
                                <p className='text-gray-400 dark:text-gray-500 text-sm mt-1 font-adaptive'>Start booking tickets to see them here</p>
                            </Card>
                        )}
                    </>
                )}
            </div>

            {selectedBooking && (
                <BookingConfirmationModal
                    modalId="booking_confirmation_modal"
                    booking={selectedBooking}
                />
            )}
        </div>
    );
};

export default UserBookings;
