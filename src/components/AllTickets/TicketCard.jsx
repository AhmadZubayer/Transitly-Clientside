import React from 'react';
import styled from 'styled-components';

const TicketCard = ({ ticket }) => {
    // Format the date and time
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        return {
            date: date.toLocaleDateString('en-US', dateOptions),
            time: date.toLocaleTimeString('en-US', timeOptions)
        };
    };

    const { date, time } = formatDateTime(ticket.departureDateTime);

    return (
        <StyledWrapper>
            <div className="card">
                <div className="card-content">
                    {/* Route */}
                    <div className="route">
                        <span className="location">{ticket.from}</span>
                        <span className="arrow">→</span>
                        <span className="location">{ticket.to}</span>
                    </div>

                    {/* Ticket Name */}
                    <h3 className="ticket-title">{ticket.ticketTitle}</h3>

                    {/* Date & Time */}
                    <div className="datetime">
                        <p className="date">{date}</p>
                        <p className="time">{time}</p>
                    </div>

                    {/* Price and Quantity */}
                    <div className="price-quantity">
                        <div className="price">
                            <span className="label">Price:</span>
                            <span className="value">৳{ticket.price}</span>
                        </div>
                        <div className="quantity">
                            <span className="label">Available:</span>
                            <span className="value">{ticket.quantity}</span>
                        </div>
                    </div>

                    {/* Perks */}
                    <div className="perks">
                        <p className="perks-label">Perks:</p>
                        <div className="perks-list">
                            {ticket.perks.map((perk, index) => (
                                <span key={index} className="perk-tag">{perk}</span>
                            ))}
                        </div>
                    </div>

                    {/* View Details Button */}
                    <button className="view-details-btn">View Details</button>
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .card {
        box-sizing: border-box;
        width: 320px;
        min-height: 400px;
        background: rgba(217, 217, 217, 0.58);
        border: 1px solid white;
        box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
        backdrop-filter: blur(6px);
        border-radius: 17px;
        cursor: pointer;
        transition: all 0.5s;
        user-select: none;
        padding: 20px;
    }

    .card:hover {
        border: 1px solid black;
        transform: scale(1.05);
    }

    .card:active {
        transform: scale(0.95) rotateZ(1.7deg);
    }

    .card-content {
        display: flex;
        flex-direction: column;
        gap: 15px;
        height: 100%;
    }

    .route {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 1.2rem;
        font-weight: bold;
        color: #333;
    }

    .location {
        color: #2c3e50;
    }

    .arrow {
        color: #e74c3c;
        font-size: 1.5rem;
    }

    .ticket-title {
        text-align: center;
        color: #2c3e50;
        font-size: 1.1rem;
        margin: 0;
        font-weight: 600;
    }

    .datetime {
        text-align: center;
        background: rgba(255, 255, 255, 0.5);
        padding: 10px;
        border-radius: 10px;
    }

    .date {
        margin: 0;
        font-weight: 600;
        color: #2c3e50;
        font-size: 0.95rem;
    }

    .time {
        margin: 5px 0 0 0;
        color: #555;
        font-size: 0.9rem;
    }

    .price-quantity {
        display: flex;
        justify-content: space-around;
        background: rgba(255, 255, 255, 0.5);
        padding: 12px;
        border-radius: 10px;
    }

    .price, .quantity {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .label {
        font-size: 0.85rem;
        color: #666;
        margin-bottom: 3px;
    }

    .value {
        font-size: 1.1rem;
        font-weight: bold;
        color: #2c3e50;
    }

    .perks {
        background: rgba(255, 255, 255, 0.5);
        padding: 12px;
        border-radius: 10px;
    }

    .perks-label {
        margin: 0 0 8px 0;
        font-weight: 600;
        color: #2c3e50;
        font-size: 0.9rem;
    }

    .perks-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    .perk-tag {
        background: rgba(52, 152, 219, 0.7);
        color: white;
        padding: 4px 10px;
        border-radius: 15px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .view-details-btn {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
        margin-top: auto;
    }

    .view-details-btn:hover {
        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .view-details-btn:active {
        transform: translateY(0px);
    }
`;

export default TicketCard;