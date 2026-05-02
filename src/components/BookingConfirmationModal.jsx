import React from 'react';
import ModernBtn from './ModernBtn';

const BookingConfirmationModal = ({ modalId, booking }) => {
    if (!booking) return null;

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

    // Format payment date
    const formatPaymentDate = (dateString) => {
        const date = new Date(dateString);
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        return {
            date: date.toLocaleDateString('en-US', dateOptions),
            time: date.toLocaleTimeString('en-US', timeOptions)
        };
    };

    const { date, time } = formatDateTime(booking.ticket.departureDateTime);
    const { date: paymentDate, time: paymentTime } = formatPaymentDate(booking.paymentDate);

    const handleDownloadPDF = () => {
        // TODO: Implement PDF download functionality
        console.log('Download PDF for booking:', booking._id);
    };

    return (
        <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box max-w-2xl">
                {/* Ticket Name Heading */}
                <h3 className="font-bold text-2xl text-center mb-6 text-gray-800">
                    {booking.ticket.ticketTitle}
                </h3>

                {/* Departure and Destination */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-lg border border-gray-300">
                        <p className="text-sm text-gray-600 mb-1">Departure</p>
                        <p className="text-lg font-bold text-gray-800">{booking.ticket.from}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-gray-300">
                        <p className="text-sm text-gray-600 mb-1">Destination</p>
                        <p className="text-lg font-bold text-gray-800">{booking.ticket.to}</p>
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
                        <p className="text-lg font-semibold text-gray-800">{booking.ticket.busCompany}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-gray-300">
                        <p className="text-sm text-gray-600 mb-1">Bus Brand</p>
                        <p className="text-lg font-semibold text-gray-800">{booking.ticket.busBrand}</p>
                    </div>
                </div>

                {/* Transport Type */}
                <div className="p-4 rounded-lg border border-gray-300 mb-4">
                    <p className="text-sm text-gray-600 mb-1">Transport Type</p>
                    <p className="text-lg font-semibold text-gray-800">{booking.ticket.transportType}</p>
                </div>

                {/* Features */}
                {booking.ticket.perks && booking.ticket.perks.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Features</p>
                        <div className="flex flex-wrap gap-2">
                            {booking.ticket.perks.map((perk, index) => (
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

                {/* Price and Ticket Quantity */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-lg border-2 border-gray-300">
                        <p className="text-sm text-gray-600 mb-1">Price per Ticket</p>
                        <p className="text-2xl font-bold text-gray-800">৳{booking.ticket.price}</p>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-gray-300 bg-blue-50">
                        <p className="text-sm text-gray-600 mb-1">Ticket Quantity</p>
                        <p className="text-2xl font-bold text-blue-600">{booking.quantity}</p>
                    </div>
                </div>

                {/* Total Amount */}
                <div className="p-4 rounded-lg border-2 border-green-300 bg-green-50 mb-4">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-green-600">৳{booking.totalPrice}</p>
                </div>

                {/* Payment Completed Date */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-lg border border-gray-300 col-span-2 bg-green-50">
                        <p className="text-sm text-gray-600 mb-1">Payment Completed In</p>
                        <div className="flex justify-between">
                            <span className="text-lg font-semibold text-gray-800">{paymentDate}</span>
                            <span className="text-lg font-semibold text-gray-800">{paymentTime}</span>
                        </div>
                    </div>
                </div>

                {/* Booking Reference ID */}
                <div className="p-4 rounded-lg border border-gray-300 mb-6 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-1">Booking Reference ID</p>
                    <p className="text-sm font-mono font-bold text-gray-800 break-all">{booking._id}</p>
                </div>

                {/* Modal Actions */}
                <div className="modal-action flex justify-between items-center gap-3">
                    <form method="dialog">
                        <button className="btn btn-ghost">Close</button>
                    </form>
                    <ModernBtn
                        text="📥 Download Ticket PDF"
                        onClick={handleDownloadPDF}
                    />
                </div>
            </div>

            {/* Click outside to close */}
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default BookingConfirmationModal;
