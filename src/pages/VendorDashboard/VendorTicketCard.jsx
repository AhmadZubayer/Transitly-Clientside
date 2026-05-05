import React from 'react';
import TicketCardStyle from '../../components/TicketCardStyle';

const VendorTicketCard = ({ ticket, onDelete, onEdit, disableActions }) => {
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

    const { date, time } = formatDateTime(ticket.departureDateTime);
    const isVerified = (ticket.adminVerified || 'No') === 'Yes';

    return (
        <TicketCardStyle>
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-end mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isVerified 
                            ? 'bg-emerald-100/50 text-emerald-600 border-emerald-200' 
                            : 'bg-amber-100/50 text-amber-600 border-amber-200'
                    }`}>
                        {isVerified ? 'Admin Verified' : 'Awaiting Verify'}
                    </span>
                </div>

                <p className="text-lg font-black text-gray-800 transition-colors mb-0.5">
                    {ticket.from} → {ticket.to}
                </p>
                <p className="text-xs font-semibold text-gray-600 transition-colors mb-4">
                    {ticket.ticketTitle}
                </p>

                <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-[11px]">
                        <span className="text-gray-500 font-medium">Transport:</span>
                        <span className="text-gray-800 font-bold">{ticket.transportType}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                        <span className="text-gray-500 font-medium">Departure:</span>
                        <span className="text-gray-800 font-bold">{date} at {time}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                        <span className="text-gray-500 font-medium">Available:</span>
                        <span className="text-gray-800 font-bold">{ticket.quantity} seats</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100/50">
                    <span className="text-xl font-black text-gray-800">
                        ৳{ticket.price}
                    </span>

                    {!isVerified && (
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="px-3 py-1 bg-gray-100/80 text-[10px] font-bold rounded-lg hover:bg-gray-200 transition-colors"
                                onClick={onEdit}
                                disabled={disableActions}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="px-3 py-1 bg-red-100/80 text-red-600 text-[10px] font-bold rounded-lg hover:bg-red-200 transition-colors"
                                onClick={onDelete}
                                disabled={disableActions}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </TicketCardStyle>
    );
};

export default VendorTicketCard;
