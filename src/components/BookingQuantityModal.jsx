import React, { useState } from 'react';
import ModernBtn from './ModernBtn';
import QuantityInput from './QuantityInput';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';


import Swal from 'sweetalert2';

const BookingQuantityModal = ({ modalId, ticket, onSubmit }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBooking = async() => {
        if (quantity <= 0 || isSubmitting) return;
        setIsSubmitting(true);

        try {
            const totalPrice = ticket.price * quantity;

            const bookingInfo = {
                ticketId: ticket._id,
                quantity: quantity,
                totalPrice: totalPrice,
                userEmail: user?.email,
                status: 'pending'
            };

            const res = await axiosSecure.post('/bookings', bookingInfo);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Requested',
                    text: 'Your booking request has been sent to the vendor for approval.',
                    timer: 3000,
                    showConfirmButton: false
                });
                
                // Close modal
                document.getElementById(modalId).close();
                if (onSubmit) onSubmit(quantity);
            }
        } catch (error) {
            console.error('Booking error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Request Failed',
                text: 'Could not process your booking request.'
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!ticket) return null;

    return (
        <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box w-full max-w-md p-0 bg-base-100 border border-base-300 shadow-2xl">
                {/* Header with Title and Cancel Button */}
                <div className="flex justify-between items-center p-4 border-b bg-base-200/50 backdrop-blur-md sticky top-0 z-10">
                    <h3 className="font-bold text-base text-base-content font-adaptive">
                        Select Quantity
                    </h3>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost font-adaptive">✕</button>
                    </form>
                </div>

                <div className="p-4 space-y-4">
                    {/* Ticket Info */}
                    <div className="p-3 rounded-xl bg-base-200 border border-base-300">
                        <p className="text-[11px] uppercase font-bold text-base-content/60 mb-1 font-adaptive">{ticket.ticketTitle}</p>
                        <p className="text-sm font-semibold text-base-content font-adaptive">৳{ticket.price} <span className='text-[10px] font-normal opacity-60'>/ ticket</span></p>
                    </div>

                    {/* Quantity Input */}
                    <div>
                        <label className="label py-1 px-0 flex justify-between items-center mb-1">
                            <span className="text-xs font-bold font-adaptive uppercase opacity-70 text-base-content">Number of Tickets</span>
                            <span className="text-[10px] text-base-content/60 font-adaptive">Available: {ticket.quantity}</span>
                        </label>
                        <div className="flex justify-center bg-base-100 rounded-xl p-3 border border-base-300 shadow-inner">
                            <QuantityInput
                                aria-label="Quantity Input"
                                min={1}
                                max={ticket.quantity}
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                            />
                        </div>
                    </div>

                    {/* Total Price */}
                    <div className="py-2 text-center">
                        <p className='text-[10px] uppercase font-bold text-base-content/40 mb-1 font-adaptive'>Total Price</p>
                        <p className="text-3xl font-black text-[#5044e4] font-adaptive">
                            ৳{(ticket.price * quantity).toLocaleString()}
                        </p>
                    </div>

                    {/* Confirm Button - Centered */}
                    <div className="flex justify-center pb-2">
                        <ModernBtn 
                            onClick={handleBooking}
                            disabled={quantity === 0 || isSubmitting}
                            text={isSubmitting ? "Requesting..." : "Request Booking"}
                            style={{ width: '100%' }}
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

export default BookingQuantityModal;
