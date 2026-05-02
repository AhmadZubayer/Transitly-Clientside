import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import BookingCard from '../../components/AllTickets/BookingCard';
import BookingConfirmationModal from '../../components/BookingConfirmationModal';
import Loading from '../../components/Loading';

const UserBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Fetch user's payments
    const { data: bookings = [], isLoading, isError, error } = useQuery({
        queryKey: ['userBookings', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/payments/user/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const handleBookingClick = (booking) => {
        setSelectedBooking(booking);
        document.getElementById('booking_confirmation_modal').showModal();
    };

    return (
        <div className='p-6'>
            <div className='space-y-6'>

                {/* Content */}
                {isLoading && (
                    <div className='flex justify-center items-center p-12'>
                        <Loading />
                    </div>
                )}

                {isError && (
                    <div className='text-center p-6 text-red-500'>
                        <p>Error loading bookings: {error?.message}</p>
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        {bookings.length > 0 ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                {bookings.map((booking) => (
                                    <BookingCard
                                        key={booking._id}
                                        booking={booking}
                                        onClick={() => handleBookingClick(booking)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className='text-center p-12 bg-gray-50 rounded-lg'>
                                <p className='text-gray-600 text-lg'>No bookings found</p>
                                <p className='text-gray-500 text-sm mt-2'>Start booking tickets to see them here</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Booking Details Modal */}
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
