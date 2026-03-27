import React from 'react';
import styled from 'styled-components';

const TicketCard = ({ ticket, onClick }) => {
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
            <div className="card" onClick={onClick}>
                <p className="card-title">{ticket.from} → {ticket.to}</p>
                <p className="ticket-name">{ticket.ticketTitle}</p>

                <div className="info-section">
                    <div className="info-row">
                        <span className="label">Transport:</span>
                        <span className="value">{ticket.transportType}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Company:</span>
                        <span className="value">{ticket.busCompany}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Brand:</span>
                        <span className="value">{ticket.busBrand}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Departure:</span>
                        <span className="value">{date} at {time}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Available:</span>
                        <span className="value">{ticket.quantity} seats</span>
                    </div>
                </div>

                <div className="perks-section">
                    {ticket.perks && ticket.perks.length > 0 && (
                        <div className="perks-list">
                            {ticket.perks.slice(0, 3).map((perk, index) => (
                                <span key={index} className="perk-badge">{perk}</span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="price-section">
                    <span className="price">৳{ticket.price}</span>
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

    .perks-section {
        margin-bottom: 0.7em;
    }

    .perks-list {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }

    .perk-badge {
        background: rgba(255, 255, 255, 0.5);
        padding: 3px 8px;
        border-radius: 10px;
        font-size: 0.7em;
        color: #452c2c;
        font-weight: 500;
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

    .card {
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

    .card:before {
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

    .card:hover:before {
        transform: scale(28);
    }

    .card:hover .ticket-name {
        transition: all 0.5s ease-out;
        color: rgba(255, 255, 255, 0.8);
    }

    .card:hover .card-title {
        transition: all 0.5s ease-out;
        color: #ffffff;
    }

    .card:hover .label,
    .card:hover .value {
        transition: all 0.5s ease-out;
        color: rgba(255, 255, 255, 0.9);
    }

    .card:hover .perk-badge {
        transition: all 0.5s ease-out;
        background: rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.95);
    }

    .card:hover .price {
        transition: all 0.5s ease-out;
        color: #ffffff;
    }
`;

export default TicketCard;