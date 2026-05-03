import React from 'react';
import styled from 'styled-components';

const BookingCard = ({ booking, onClick }) => {
    // Safety check
    if (!booking || !booking.ticket) {
        return (
            <StyledWrapper>
                <div className="ticket-card">
                    <p className="card-title">Booking Data Unavailable</p>
                </div>
            </StyledWrapper>
        );
    }
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        return {
            date: date.toLocaleDateString('en-US', dateOptions),
            time: date.toLocaleTimeString('en-US', timeOptions)
        };
    };

    const { date, time } = formatDateTime(booking.ticket.departureDateTime);
    const { date: paymentDate } = formatDateTime(booking.paymentDate);

    return (
        <StyledWrapper>
            <div className="ticket-card" onClick={onClick}>
                <p className="card-title">{booking.ticket.from} → {booking.ticket.to}</p>
                <p className="ticket-name">{booking.ticket.ticketTitle}</p>

                <div className="info-section">
                    <div className="info-row">
                        <span className="label">Transport:</span>
                        <span className="value">{booking.ticket.transportType}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Company:</span>
                        <span className="value">{booking.ticket.busCompany}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Departure:</span>
                        <span className="value">{date}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Quantity:</span>
                        <span className="value badge">{booking.quantity} ticket{booking.quantity > 1 ? 's' : ''}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Paid On:</span>
                        <span className="value">{paymentDate}</span>
                    </div>
                </div>

                <div className="price-section">
                    <span className="price">৳{booking.totalPrice}</span>
                </div>

                <div className="go-corner">
                    <div className="go-arrow">→</div>
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .card-title {
        color: #262626;
        font-size: 1.2em;
        line-height: normal;
        font-weight: 700;
        margin-bottom: 0.3em;
    }

    .ticket-name {
        font-size: 0.9em;
        font-weight: 600;
        line-height: 1.2em;
        color: #452c2c;
        margin-bottom: 0.7em;
    }

    .info-section {
        margin-bottom: 0.7em;
    }

    .info-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.4em;
        font-size: 0.85em;
    }

    .label {
        color: #666;
        font-weight: 500;
    }

    .value {
        color: #262626;
        font-weight: 600;
    }

    .value.badge {
        background: rgba(66, 173, 245, 0.2);
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.9em;
        color: #42adf5;
    }

    .price-section {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: auto;
        padding-top: 0.7em;
    }

    .price {
        font-size: 1.5em;
        font-weight: 800;
        color: #262626;
    }

    .go-corner {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 2em;
        height: 2em;
        overflow: hidden;
        top: 0;
        right: 0;
        background: linear-gradient(135deg, #6293c8, #384c6c);
        border-radius: 0 4px 0 32px;
    }

    .go-arrow {
        margin-top: -4px;
        margin-right: -4px;
        color: white;
        font-family: courier, sans;
    }

    .ticket-card {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        min-height: 320px;
        background-color: #f2f8f9;
        border-radius: 10px;
        padding: 1.5em 1em;
        text-decoration: none;
        z-index: 0;
        overflow: hidden;
        background: linear-gradient(to bottom, #c3e6ec, #a7d1d9);
        font-family: Arial, Helvetica, sans-serif;
        cursor: pointer;
    }

    .ticket-card:before {
        content: '';
        position: absolute;
        z-index: -1;
        top: -16px;
        right: -16px;
        background: linear-gradient(135deg, #364a60, #384c6c);
        height: 32px;
        width: 32px;
        border-radius: 32px;
        transform: scale(1);
        transform-origin: 50% 50%;
        transition: transform 0.35s ease-out;
    }

    .ticket-card:hover:before {
        transform: scale(28);
    }

    .ticket-card:hover .ticket-name {
        transition: all 0.5s ease-out;
        color: rgba(255, 255, 255, 0.8);
    }

    .ticket-card:hover .card-title {
        transition: all 0.5s ease-out;
        color: #ffffff;
    }

    .ticket-card:hover .label,
    .ticket-card:hover .value {
        transition: all 0.5s ease-out;
        color: rgba(255, 255, 255, 0.9);
    }

    .ticket-card:hover .value.badge {
        transition: all 0.5s ease-out;
        background: rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.95);
    }

    .ticket-card:hover .price {
        transition: all 0.5s ease-out;
        color: #ffffff;
    }
`;

export default BookingCard;
