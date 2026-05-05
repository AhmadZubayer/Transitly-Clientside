import React, { useState } from 'react';
import ModernBtn from './ModernBtn';
import generateTicketPDF from '../utils/generateTicketPDF';
import useAuth from '../hooks/useAuth';

const BookingConfirmationModal = ({ modalId, booking }) => {
    const { user } = useAuth();
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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

    const handleDownloadPDF = async () => {
        try {
            setIsGeneratingPDF(true);
            const userDetails = {
                name: user?.displayName || 'Guest',
                email: user?.email || booking.userEmail,
                phone: user?.phone || 'N/A'
            };
            await generateTicketPDF(booking, userDetails);
        } catch (error) {
            console.error('Failed to generate PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box max-w-2xl p-0 bg-base-100 border border-base-300 shadow-2xl">
                {/* Header with Title */}
                <div className="flex justify-between items-center p-4 border-b bg-base-200/50 backdrop-blur-md sticky top-0 z-10">
                    <h3 className="font-bold text-lg text-base-content font-adaptive">
                        Booking Details
                    </h3>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost font-adaptive">✕</button>
                    </form>
                </div>

                <div className="p-6 space-y-4">
                    {/* Ticket Name Heading */}
                    <h3 className="font-bold text-2xl text-center mb-2 text-base-content font-adaptive">
                        {booking.ticket.ticketTitle}
                    </h3>

                    {/* Departure and Destination */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-base-300 bg-base-100">
                            <p className="text-[10px] uppercase font-bold text-base-content/60 mb-1 font-adaptive tracking-wider">Departure</p>
                            <p className="text-lg font-bold text-base-content font-adaptive">{booking.ticket.from}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-base-300 bg-base-100">
                            <p className="text-[10px] uppercase font-bold text-base-content/60 mb-1 font-adaptive tracking-wider">Destination</p>
                            <p className="text-lg font-bold text-base-content font-adaptive">{booking.ticket.to}</p>
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
                            <p className="text-lg font-semibold text-base-content font-adaptive">{booking.ticket.busCompany}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-base-300 bg-base-100">
                            <p className="text-[10px] uppercase font-bold text-base-content/60 mb-1 font-adaptive tracking-wider">Bus Brand</p>
                            <p className="text-lg font-semibold text-base-content font-adaptive">{booking.ticket.busBrand}</p>
                        </div>
                    </div>

                    {/* Transport Type */}
                    <div className="p-4 rounded-xl border border-base-300 bg-base-100">
                        <p className="text-[10px] uppercase font-bold text-base-content/60 mb-1 font-adaptive tracking-wider">Transport Type</p>
                        <p className="text-lg font-semibold text-base-content font-adaptive">{booking.ticket.transportType}</p>
                    </div>

                    {/* Features */}
                    {booking.ticket.perks && booking.ticket.perks.length > 0 && (
                        <div>
                            <p className="text-[10px] uppercase font-bold text-base-content/60 mb-2 font-adaptive tracking-wider">Features</p>
                            <div className="flex flex-wrap gap-2">
                                {booking.ticket.perks.map((perk, index) => (
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

                    {/* Price and Ticket Quantity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border-2 border-base-300 bg-base-100">
                            <p className="text-[10px] uppercase font-bold text-base-content/60 mb-1 font-adaptive tracking-wider">Price per Ticket</p>
                            <p className="text-2xl font-bold text-base-content font-adaptive">৳{booking.ticket.price}</p>
                        </div>
                        <div className="p-4 rounded-xl border-2 border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/10">
                            <p className="text-[10px] uppercase font-bold text-blue-600/80 mb-1 font-adaptive tracking-wider">Ticket Quantity</p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-adaptive">{booking.quantity}</p>
                        </div>
                    </div>

                    {/* Total Amount */}
                    <div className="p-4 rounded-xl border-2 border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10 text-center">
                        <p className="text-[10px] uppercase font-bold text-emerald-600/80 mb-1 font-adaptive tracking-wider">Total Amount Paid</p>
                        <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-adaptive">৳{booking.totalPrice.toLocaleString()}</p>
                    </div>

                    {/* Payment Completed Date */}
                    <div className="p-4 rounded-xl border border-base-300 bg-base-200/30">
                        <p className="text-[10px] uppercase font-bold text-base-content/40 mb-2 font-adaptive tracking-wider">Payment Confirmation</p>
                        <div className="flex justify-between items-center">
                            <span className="text-base font-semibold text-base-content font-adaptive">{paymentDate}</span>
                            <span className="text-base font-semibold text-base-content font-adaptive">{paymentTime}</span>
                        </div>
                    </div>

                    {/* Booking Reference ID */}
                    <div className="p-4 rounded-xl border border-base-300 bg-base-100">
                        <p className="text-[10px] uppercase font-bold text-base-content/40 mb-1 font-adaptive tracking-wider">Booking Reference ID</p>
                        <p className="text-xs font-mono font-bold text-base-content/60 break-all font-adaptive">{booking._id}</p>
                    </div>

                    {/* Modal Actions */}
                    <div className="flex justify-between items-center gap-3 pt-2">
                        <form method="dialog" className="flex-1">
                            <button className="btn btn-ghost w-full font-adaptive">Close</button>
                        </form>
                        <ModernBtn
                            text={isGeneratingPDF ? 'Generating...' : 'Ticket PDF'}
                            onClick={handleDownloadPDF}
                            disabled={isGeneratingPDF}
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

export default BookingConfirmationModal;
