import React from 'react';
import TicketCardStyle from '../TicketCardStyle';

const TicketCard = ({ ticket, onClick }) => {
    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return { date: 'N/A', time: 'N/A' };
        
        let dateObj;
        try {
            // Robust parsing for common formats (ISO, space-separated, etc.)
            const cleanStr = dateTimeString.replace(' ', 'T');
            dateObj = new Date(cleanStr);
            
            // If native parsing fails, try manual extraction
            if (isNaN(dateObj.getTime())) {
                const parts = dateTimeString.match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?/);
                if (parts) {
                    const [_, y, m, d, hr = 0, min = 0] = parts;
                    dateObj = new Date(y, m - 1, d, hr, min);
                }
            }
        } catch (e) {
            console.error('Date parsing error:', e);
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

    return (
        <TicketCardStyle onClick={onClick} className="cursor-pointer">
            <div className="relative z-10 flex flex-col h-full">
                <p className="text-xl font-black text-gray-800 transition-colors mb-1">
                    {ticket.from} → {ticket.to}
                </p>
                <p className="text-sm font-semibold text-gray-600 transition-colors mb-4">
                    {ticket.ticketTitle}
                </p>

                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-medium">Transport:</span>
                        <span className="text-gray-800 font-bold">{ticket.transportType}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-medium">Company:</span>
                        <span className="text-gray-800 font-bold">{ticket.busCompany}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-medium">Departure:</span>
                        <span className="text-gray-800 font-bold">{date} at {time}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-medium">Available:</span>
                        <span className="text-gray-800 font-bold">{ticket.quantity} seats</span>
                    </div>
                </div>

                {ticket.perks && ticket.perks.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {ticket.perks.slice(0, 3).map((perk, index) => (
                            <span key={index} className="text-[10px] px-2 py-0.5 bg-gray-100/50 text-gray-600 rounded-full font-medium">
                                {perk}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-auto pt-4 flex justify-center border-t border-gray-100/50">
                    <span className="text-2xl font-black text-gray-800">
                        ৳{ticket.price}
                    </span>
                </div>
            </div>
        </TicketCardStyle>
    );
};

export default TicketCard;
