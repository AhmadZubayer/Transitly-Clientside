import React, { useState } from 'react';
import ModernBtn from './ModernBtn';
import QuantityInput from './QuantityInput';

const BookingQuantityModal = ({ modalId, ticket, onSubmit }) => {
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = () => {
        if (quantity > 0) {
            const totalBill = ticket.price * quantity;
            console.log({
                ticketId: ticket._id,
                totalBill: totalBill,
                numberOfTickets: quantity
            });
            onSubmit(quantity);
            setQuantity(1); // Reset after submission
            document.getElementById(modalId).close();
        }
    };

    if (!ticket) return null;

    return (
        <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box max-w-sm p-4">
                {/* Header with Title and Cancel Button */}
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-base text-gray-800">
                        Select Ticket Quantity
                    </h3>
                    <form method="dialog">
                        <button className="btn btn-sm btn-ghost">✕</button>
                    </form>
                </div>

                {/* Ticket Info */}
                <div className="mb-3 p-2 rounded-lg bg-gray-50 border border-gray-300">
                    <p className="text-xs text-gray-600">{ticket.ticketTitle}</p>
                    <p className="text-sm font-semibold text-gray-800">৳{ticket.price} per ticket</p>
                </div>

                {/* Quantity Input */}
                <div className="mb-4">
                    <label className="label py-1 px-0">
                        <span className="label-text text-sm font-semibold">Number of Tickets</span>
                        <span className="label-text-alt text-xs text-gray-600">Max: {ticket.quantity}</span>
                    </label>
                    <div className="flex justify-center">
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
                <div className="mb-6 text-center">
                    <p className="text-2xl font-bold" style={{ color: '#422AD5' }}>
                        ৳{(ticket.price * quantity).toLocaleString()}
                    </p>
                </div>

                {/* Confirm Button - Centered */}
                <div className="flex justify-center">
                    <ModernBtn
                        text="Confirm"
                        onClick={handleSubmit}
                        disabled={quantity === 0}
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

export default BookingQuantityModal;
