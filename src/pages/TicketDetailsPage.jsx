import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Countdown from '../components/Countdown';
import BookingQuantityModal from '../components/BookingQuantityModal';
import Loading from '../components/Loading';

const TicketDetailsPage = () => {
    const { ticketId } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    // Fetch ticket details
    const { data: ticket, isLoading, isError, error } = useQuery({
        queryKey: ['ticket', ticketId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/${ticketId}`);
            return res.data;
        },
        enabled: !!ticketId
    });

    // Format the date and time
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        return {
            date: date.toLocaleDateString('en-US', dateOptions),
            time: date.toLocaleTimeString('en-US', timeOptions)
        };
    };

    // Check if departure time has passed
    const isDeparturePassed = () => {
        if (!ticket) return false;
        return new Date(ticket.departureDateTime) <= new Date();
    };

    // Check if quantity is 0
    const isOutOfStock = () => {
        if (!ticket) return false;
        return ticket.quantity === 0;
    };

    const canBook = !isDeparturePassed() && !isOutOfStock();

    const handleBookingSubmit = (quantity) => {
        console.log('Booking ticket:', {
            ticketId: ticket._id,
            quantity,
            price: ticket.price,
            totalPrice: ticket.price * quantity
        });
        // TODO: Handle booking submission
    };

    if (isLoading) {
        return (
            <div className='flex justify-center items-center p-8'>
                <Loading />
            </div>
        );
    }

    if (isError) {
        return (
            <div className='p-6'>
                <div className='text-center text-red-500'>
                    <p className='text-lg font-semibold'>Error loading ticket details</p>
                    <p className='text-sm mt-2'>{error?.message}</p>
                    <button onClick={() => navigate(-1)} className='mt-4 btn btn-primary'>
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className='p-6'>
                <div className='text-center text-gray-500'>
                    <p>Ticket not found</p>
                    <button onClick={() => navigate(-1)} className='mt-4 btn btn-primary'>
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const { date, time } = formatDateTime(ticket.departureDateTime);

    return (
        <div className='p-4 max-w-2xl mx-auto'>
            <div className='bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-6 py-4'>
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className='mb-3 btn btn-ghost btn-xs text-sm font-adaptive'
                >
                    ← Back
                </button>

                {/* Main Content */}
                <div className='space-y-3'>
                    {/* Ticket Name Heading */}
                    <h1 className='font-bold text-xl text-center text-gray-800 font-adaptive'>
                        {ticket.ticketTitle}
                    </h1>

                    {/* Departure and Destination */}
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                            <p className='text-[10px] uppercase font-bold text-gray-500 mb-0.5 font-adaptive opacity-70'>Departure</p>
                            <p className='text-sm font-bold text-gray-800 font-adaptive'>{ticket.from}</p>
                        </div>
                        <div className='p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                            <p className='text-[10px] uppercase font-bold text-gray-500 mb-0.5 font-adaptive opacity-70'>Destination</p>
                            <p className='text-sm font-bold text-gray-800 font-adaptive'>{ticket.to}</p>
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                            <p className='text-[10px] uppercase font-bold text-gray-500 mb-0.5 font-adaptive opacity-70'>Date</p>
                            <p className='text-sm font-semibold text-gray-800 font-adaptive'>{date}</p>
                        </div>
                        <div className='p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                            <p className='text-[10px] uppercase font-bold text-gray-500 mb-0.5 font-adaptive opacity-70'>Time</p>
                            <p className='text-sm font-semibold text-gray-800 font-adaptive'>{time}</p>
                        </div>
                    </div>

                    {/* Company and Bus Brand */}
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                            <p className='text-[10px] uppercase font-bold text-gray-500 mb-0.5 font-adaptive opacity-70'>Company</p>
                            <p className='text-sm font-semibold text-gray-800 font-adaptive'>{ticket.busCompany}</p>
                        </div>
                        <div className='p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                            <p className='text-[10px] uppercase font-bold text-gray-500 mb-0.5 font-adaptive opacity-70'>Bus Brand</p>
                            <p className='text-sm font-semibold text-gray-800 font-adaptive'>{ticket.busBrand}</p>
                        </div>
                    </div>

                    {/* Transport Type */}
                    <div className='p-2 rounded-lg border border-gray-200 dark:border-gray-700'>
                        <p className='text-[10px] uppercase font-bold text-gray-500 mb-0.5 font-adaptive opacity-70'>Transport Type</p>
                        <p className='text-sm font-semibold text-gray-800 font-adaptive'>{ticket.transportType}</p>
                    </div>

                    {/* Features */}
                    {ticket.perks && ticket.perks.length > 0 && (
                        <div>
                            <p className='text-[10px] uppercase font-bold text-gray-500 mb-1.5 font-adaptive opacity-70'>Features</p>
                            <div className='flex flex-wrap gap-1.5'>
                                {ticket.perks.map((perk, index) => (
                                    <span
                                        key={index}
                                        className='px-2 py-0.5 rounded text-[11px] border border-gray-200 dark:border-gray-700 font-medium font-adaptive'
                                    >
                                        {perk}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Available Seats and Price */}
                    <div className='grid grid-cols-2 gap-2'>
                        <div className={`p-2 rounded-lg border-2 ${isOutOfStock() ? 'border-red-500/50 bg-red-50/30' : 'border-gray-200 dark:border-gray-700'}`}>
                            <p className='text-[10px] uppercase font-bold text-gray-500 mb-0.5 font-adaptive opacity-70'>Available Seats</p>
                            <p className={`text-lg font-bold ${isOutOfStock() ? 'text-red-600' : 'text-gray-800 font-adaptive'}`}>
                                {ticket.quantity}
                            </p>
                        </div>
                        <div className='p-2 rounded-lg border-2 border-gray-200 dark:border-gray-700'>
                            <p className='text-[10px] uppercase font-bold text-gray-500 mb-0.5 font-adaptive opacity-70'>Price</p>
                            <p className='text-lg font-bold text-gray-800 font-adaptive'>৳{ticket.price}</p>
                        </div>
                    </div>

                    {/* Status Messages */}
                    {isDeparturePassed() && (
                        <div className='p-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800'>
                            <p className='text-red-600 dark:text-red-400 font-semibold text-sm'>Booking unavailable - Departure time has passed</p>
                        </div>
                    )}

                    {isOutOfStock() && (
                        <div className='p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-800'>
                            <p className='text-orange-600 dark:text-orange-400 font-semibold text-sm'>Out of stock - No tickets available</p>
                        </div>
                    )}

                    {/* Countdown */}
                    {!isDeparturePassed() && (
                        <div className='pt-2'>
                            <Countdown departureDateTime={ticket.departureDateTime} />
                        </div>
                    )}

                    {/* Book Now Button */}
                    <div className='flex justify-center pt-2'>
                        <button
                            onClick={() => document.getElementById('booking_quantity_modal').showModal()}
                            disabled={!canBook}
                            className={`btn btn-sm px-10 ${canBook ? 'btn-1' : 'btn-disabled'}`}
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Booking Quantity Modal */}
            <BookingQuantityModal
                modalId="booking_quantity_modal"
                ticket={ticket}
                onSubmit={handleBookingSubmit}
            />
        </div>
    );
};

export default TicketDetailsPage;
