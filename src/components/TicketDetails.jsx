import React from 'react';
import dayjs from 'dayjs';
import ModernBtn from './ModernBtn';

const TicketDetails = ({ ticket, modalId }) => {
    if (!ticket) return null;

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

    const { date, time } = formatDateTime(ticket.departureDateTime);

    return (
        <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box max-w-2xl p-0 bg-base-100 border border-base-300 shadow-2xl">
                {/* Header with Title */}
                <div className="flex justify-between items-center p-4 border-b bg-base-200/50 backdrop-blur-md sticky top-0 z-10">
                    <h3 className="font-bold text-lg text-base-content font-adaptive">
                        Ticket Details
                    </h3>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost font-adaptive">✕</button>
                    </form>
                </div>

                <div className="p-6 space-y-4">
                    {/* Ticket Name Heading */}
                    <h3 className="font-bold text-2xl text-center mb-2 text-base-content font-adaptive">
                        {ticket.ticketTitle}
                    </h3>

                    {/* Departure and Destination */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-base-300 bg-base-100">
                            <p className="text-[10px] uppercase font-bold text-base-content/60 mb-1 font-adaptive tracking-wider">Departure</p>
                            <p className="text-lg font-bold text-base-content font-adaptive">{ticket.from}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-base-300 bg-base-100">
                            <p className="text-[10px] uppercase font-bold text-base-content/60 mb-1 font-adaptive tracking-wider">Destination</p>
                            <p className="text-lg font-bold text-base-content font-adaptive">{ticket.to}</p>
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-base-300 bg-base-100">
                            <p className="text-[10px] uppercase font-bold text-base-content/60 mb-1 font-adaptive tracking-wider">Date</p>
                            <p className="text-lg font-semibold text-base-content font-adaptive">{date}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-base-300 bg-base-100">
                            <p className="text-[10px] uppercase font-bold text-base-content/60 mb-1 font-adaptive tracking-wider">Time</p>
                            <p className="text-lg font-semibold text-base-content font-adaptive">{time}</p>
                        </div>
                    </div>

                    {/* Company and Bus Brand */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-base-300 bg-base-100">
                            <p className="text-[10px] uppercase font-bold text-base-content/60 mb-1 font-adaptive tracking-wider">Company</p>
                            <p className="text-lg font-semibold text-base-content font-adaptive">{ticket.busCompany}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-base-300 bg-base-100">
                            <p className="text-[10px] uppercase font-bold text-base-content/60 mb-1 font-adaptive tracking-wider">Bus Brand</p>
                            <p className="text-lg font-semibold text-base-content font-adaptive">{ticket.busBrand}</p>
                        </div>
                    </div>

                    {/* Transport Type */}
                    <div className="p-4 rounded-xl border border-base-300 bg-base-100">
                        <p className="text-[10px] uppercase font-bold text-base-content/60 mb-1 font-adaptive tracking-wider">Transport Type</p>
                        <p className="text-lg font-semibold text-base-content font-adaptive">{ticket.transportType}</p>
                    </div>

                    {/* Features */}
                    {ticket.perks && ticket.perks.length > 0 && (
                        <div>
                            <p className="text-[10px] uppercase font-bold text-base-content/60 mb-2 font-adaptive tracking-wider">Features</p>
                            <div className="flex flex-wrap gap-2">
                                {ticket.perks.map((perk, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-1.5 rounded-lg border border-base-300 bg-base-200/50 text-sm font-medium text-base-content font-adaptive"
                                    >
                                        {perk}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Available Seats and Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border-2 border-base-300 bg-base-100">
                            <p className="text-[10px] uppercase font-bold text-base-content/60 mb-1 font-adaptive tracking-wider">Available Seats</p>
                            <p className="text-2xl font-bold text-base-content font-adaptive">{ticket.quantity}</p>
                        </div>
                        <div className="p-4 rounded-xl border-2 border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/10">
                            <p className="text-[10px] uppercase font-bold text-blue-600/80 mb-1 font-adaptive tracking-wider">Price</p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-adaptive">৳{ticket.price}</p>
                        </div>
                    </div>

                    {/* Booking Status */}
                    {ticket.bookingStatus && (
                        <div className="p-4 rounded-xl border border-base-300 bg-base-200/30">
                            <p className="text-[10px] uppercase font-bold text-base-content/40 mb-1 font-adaptive tracking-wider">Status</p>
                            <span className="text-lg font-semibold text-base-content font-adaptive">
                                {ticket.bookingStatus}
                            </span>
                        </div>
                    )}

                    {/* Modal Actions */}
                    <div className="flex justify-between items-center gap-3 pt-2">
                        <form method="dialog" className="flex-1">
                            <button className="btn btn-ghost w-full font-adaptive">Close</button>
                        </form>
                        <ModernBtn 
                            text="Buy Now" 
                            onClick={() => console.log('Buy ticket:', ticket._id)} 
                            style={{ flex: 1.5 }}
                        />
                    </div>
                </div>
            </div>

            {/* Click outside to close */}
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default TicketDetails;
