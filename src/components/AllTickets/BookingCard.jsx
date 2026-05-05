import React from 'react';
import TicketCardStyle from '../TicketCardStyle';

const BookingCard = ({ booking, onClick }) => {
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
    const { date: paymentDate } = formatDateTime(booking.paymentDate);

    return (
        <TicketCardStyle onClick={onClick} className="cursor-pointer">
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
                        <span className="px-2 py-0.5 bg-blue-100/50 text-blue-600 rounded-full font-bold">
                            {booking.quantity} ticket{booking.quantity > 1 ? 's' : ''}
                        </span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-medium">Paid On:</span>
                        <span className="text-gray-800 font-bold">{paymentDate}</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 flex justify-center border-t border-gray-100/50">
                    <span className="text-2xl font-black text-gray-800">
                        ৳{booking.totalPrice}
                    </span>
                </div>
            </div>
        </TicketCardStyle>
    );
};

export default BookingCard;
