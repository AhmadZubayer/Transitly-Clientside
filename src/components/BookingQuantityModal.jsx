import React, { useState } from 'react';
import ModernBtn from './ModernBtn';
import QuantityInput from './QuantityInput';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';


const BookingQuantityModal = ({ modalId, ticket, onSubmit }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [quantity, setQuantity] = useState(1);



    const handlePayment = async() => {
        if (quantity <= 0) return;

        try {
            const totalPrice = ticket.price * quantity;

            const paymentInfo = {
                ticketId: ticket._id,
                ticketName: ticket.ticketName,
                price: ticket.price,
                quantity: quantity,
                totalPrice: totalPrice,
                senderEmail: user?.email
            };

            console.log('Payment Info:', paymentInfo);

            // Save payment data to sessionStorage for retrieval after payment
            sessionStorage.setItem('pendingPayment', JSON.stringify({
                ticketId: ticket._id,
                quantity: quantity,
                totalPrice: totalPrice
            }));

            const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

            console.log(res.data);

            window.location.href = res.data.url;
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
        }
    }

    if (!ticket) return null;

    return (
        <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box max-w-sm p-0 overflow-hidden bg-white dark:bg-gray-800">
                {/* Header with Title and Cancel Button */}
                <div className="flex justify-between items-center p-4 border-b bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-md">
                    <h3 className="font-bold text-base text-gray-800 font-adaptive">
                        Select Quantity
                    </h3>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost font-adaptive">✕</button>
                    </form>
                </div>

                <div className="p-4 space-y-4">
                    {/* Ticket Info */}
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
                        <p className="text-[11px] uppercase font-bold text-gray-500 mb-1 font-adaptive opacity-70">{ticket.ticketTitle}</p>
                        <p className="text-sm font-semibold text-gray-800 font-adaptive">৳{ticket.price} <span className='text-[10px] font-normal opacity-60'>/ ticket</span></p>
                    </div>

                    {/* Quantity Input */}
                    <div>
                        <label className="label py-1 px-0 flex justify-between items-center mb-1">
                            <span className="text-xs font-bold font-adaptive uppercase opacity-70">Number of Tickets</span>
                            <span className="text-[10px] text-gray-500 font-adaptive">Available: {ticket.quantity}</span>
                        </label>
                        <div className="flex justify-center bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-700 shadow-inner">
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
                        <p className='text-[10px] uppercase font-bold text-gray-400 mb-1 font-adaptive'>Total Price</p>
                        <p className="text-3xl font-black text-[#5044e4] font-adaptive">
                            ৳{(ticket.price * quantity).toLocaleString()}
                        </p>
                    </div>

                    {/* Confirm Button - Centered */}
                    <div className="flex justify-center pb-2">
                        <button 
                            onClick={handlePayment}
                            disabled={quantity === 0}
                            className="btn btn-1 w-full"
                        >
                            Proceed to Payment
                        </button>
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
