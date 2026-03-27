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
            <div className="modal-box max-w-2xl">
                {/* Ticket Name Heading */}
                <h3 className="font-bold text-2xl text-center mb-6 text-gray-800">
                    {ticket.ticketTitle}
                </h3>

                {/* Departure and Destination */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-lg border border-gray-300">
                        <p className="text-sm text-gray-600 mb-1">Departure</p>
                        <p className="text-lg font-bold text-gray-800">{ticket.from}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-gray-300">
                        <p className="text-sm text-gray-600 mb-1">Destination</p>
                        <p className="text-lg font-bold text-gray-800">{ticket.to}</p>
                    </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-lg border border-gray-300">
                        <p className="text-sm text-gray-600 mb-1">Date</p>
                        <p className="text-lg font-semibold text-gray-800">{date}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-gray-300">
                        <p className="text-sm text-gray-600 mb-1">Time</p>
                        <p className="text-lg font-semibold text-gray-800">{time}</p>
                    </div>
                </div>

                {/* Company and Bus Brand */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-lg border border-gray-300">
                        <p className="text-sm text-gray-600 mb-1">Company</p>
                        <p className="text-lg font-semibold text-gray-800">{ticket.busCompany}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-gray-300">
                        <p className="text-sm text-gray-600 mb-1">Bus Brand</p>
                        <p className="text-lg font-semibold text-gray-800">{ticket.busBrand}</p>
                    </div>
                </div>

                {/* Transport Type */}
                <div className="p-4 rounded-lg border border-gray-300 mb-4">
                    <p className="text-sm text-gray-600 mb-1">Transport Type</p>
                    <p className="text-lg font-semibold text-gray-800">{ticket.transportType}</p>
                </div>

                {/* Features */}
                {ticket.perks && ticket.perks.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Features</p>
                        <div className="flex flex-wrap gap-2">
                            {ticket.perks.map((perk, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-lg border border-gray-300 font-medium"
                                >
                                    {perk}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Available Seats and Price */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-lg border-2 border-gray-300">
                        <p className="text-sm text-gray-600 mb-1">Available Seats</p>
                        <p className="text-2xl font-bold text-gray-800">{ticket.quantity}</p>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-gray-300">
                        <p className="text-sm text-gray-600 mb-1">Price</p>
                        <p className="text-2xl font-bold text-gray-800">৳{ticket.price}</p>
                    </div>
                </div>

                {/* Booking Status */}
                {ticket.bookingStatus && (
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-1">Status</p>
                        <span className="inline-block px-4 py-2 rounded-lg border border-gray-300 font-semibold">
                            {ticket.bookingStatus}
                        </span>
                    </div>
                )}

                {/* Modal Actions */}
                <div className="modal-action flex justify-between items-center">
                    <form method="dialog">
                        <button className="btn btn-ghost">Close</button>
                    </form>
                    <ModernBtn text="Buy Now" onClick={() => console.log('Buy ticket:', ticket._id)} />
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
