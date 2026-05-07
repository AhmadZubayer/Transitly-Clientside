import React, { useState } from 'react';
import TicketCardStyle from '../TicketCardStyle';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Countdown from '../Countdown';

const BookingCard = ({ booking, onClick }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isPaying, setIsPaying] = useState(false);

    if (!booking || !booking.ticket) {
        return (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
                <p className="text-gray-500 font-adaptive">Booking Data Unavailable</p>
            </div>
        );
    }

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return { date: 'N/A', time: 'N/A' };
        let dateObj;
        try {
            const cleanStr = dateTimeString.replace(' ', 'T');
            dateObj = new Date(cleanStr);
            if (isNaN(dateObj.getTime())) {
                const parts = dateTimeString.match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?/);
                if (parts) {
                    const [_, y, m, d, hr = 0, min = 0] = parts;
                    dateObj = new Date(y, m - 1, d, hr, min);
                }
            }
        } catch (e) {
            return { date: 'N/A', time: 'N/A' };
        }
        if (isNaN(dateObj?.getTime())) return { date: 'N/A', time: 'N/A' };
        const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        return {
            date: dateObj.toLocaleDateString('en-US', dateOptions),
            time: dateObj.toLocaleTimeString('en-US', timeOptions)
        };
    };

    const { date } = formatDateTime(booking.ticket.departureDateTime);
    const { date: paymentDate } = formatDateTime(booking.paymentDate || booking.createdAt);

    const handlePayNow = async (e) => {
        e.stopPropagation(); // Don't trigger card click
        if (isPaying) return;
        setIsPaying(true);

        try {
            const paymentInfo = {
                bookingId: booking._id,
                ticketId: booking.ticketId,
                ticketName: booking.ticket.ticketTitle,
                quantity: booking.quantity,
                totalPrice: booking.totalPrice,
                senderEmail: user?.email
            };

            // Save for retrieval after payment
            sessionStorage.setItem('pendingPayment', JSON.stringify({
                bookingId: booking._id,
                ticketId: booking.ticketId,
                quantity: booking.quantity,
                totalPrice: booking.totalPrice
            }));

            const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
            window.location.href = res.data.url;
        } catch (error) {
            console.error('Payment error:', error);
            alert('Failed to start payment process');
        } finally {
            setIsPaying(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'accepted': return 'bg-blue-100 text-blue-700';
            case 'rejected': return 'bg-red-100 text-red-700';
            case 'paid': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <TicketCardStyle onClick={onClick} className="cursor-pointer relative overflow-hidden">
            {/* Status Badge */}
            <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider z-20 ${getStatusColor(booking.status)}`}>
                {booking.status}
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <p className="text-xl font-black text-gray-800 transition-colors mb-1">
                    {booking.ticket.from} → {booking.ticket.to}
                </p>
                <p className="text-sm font-semibold text-gray-600 transition-colors mb-4">
                    {booking.ticket.ticketTitle}
                </p>

                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-medium">Transport:</span>
                        <span className="text-gray-800 font-bold">{booking.ticket.transportType}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-medium">Company:</span>
                        <span className="text-gray-800 font-bold">{booking.ticket.busCompany}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-medium">Departure:</span>
                        <span className="text-gray-800 font-bold">{date}</span>
                    </div>
                    <div className="flex justify-between text-xs items-center">
                        <span className="text-gray-500 font-medium">Quantity:</span>
                        <span className="px-2 py-0.5 bg-gray-100/50 text-gray-600 rounded-full font-bold">
                            {booking.quantity} ticket{booking.quantity > 1 ? 's' : ''}
                        </span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-medium">{booking.status === 'paid' ? 'Paid On:' : 'Requested:'}</span>
                        <span className="text-gray-800 font-bold">{paymentDate}</span>
                    </div>
                </div>

                {/* Countdown - Removed if rejected */}
                {booking.status !== 'rejected' && (
                    <div className='mb-4 scale-90 origin-left'>
                        <Countdown departureDateTime={booking.ticket.departureDateTime} />
                    </div>
                )}

                <div className="mt-auto pt-4 flex flex-col items-center gap-3 border-t border-gray-100/50">
                    <span className="text-2xl font-black text-gray-800">
                        ৳{booking.totalPrice}
                    </span>
                    
                    {booking.status === 'accepted' && (
                        <button 
                            onClick={handlePayNow}
                            disabled={isPaying}
                            className="btn btn-sm btn-1 w-full font-bold"
                        >
                            {isPaying ? 'Redirecting...' : 'Pay Now'}
                        </button>
                    )}
                </div>
            </div>
        </TicketCardStyle>
    );
};

export default BookingCard;
