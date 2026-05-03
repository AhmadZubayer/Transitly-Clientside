import React from 'react';
import styled from 'styled-components';

const VendorTicketCard = ({ ticket, onDelete, onEdit, disableActions }) => {
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
    const isVerified = (ticket.adminVerified || 'No') === 'Yes';

    return (
        <StyledWrapper>
            <div className="ticket-card">
                <div className="top-row">
                    <span className={`badge ${isVerified ? 'verified' : 'pending'}`}>
                        {isVerified ? 'Admin Verified' : 'Awaiting Verify'}
                    </span>
                </div>

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

                <div className="bottom-row">
                    <span className="price">৳{ticket.price}</span>
                    {!isVerified && (
                        <div className="actions">
                            <button
                                type="button"
                                className="action-btn"
                                onClick={onEdit}
                                disabled={disableActions}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="action-btn danger"
                                onClick={onDelete}
                                disabled={disableActions}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                <div className="go-corner">
                    <div className="go-arrow">→</div>
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    height: 100%;
    .card-title {
        color: #262626;
        font-size: 1.1em;
        line-height: normal;
        font-weight: 700;
        margin-bottom: 0.2em;
    }

    .ticket-name {
        font-size: 0.85em;
        font-weight: 600;
        line-height: 1.2em;
        color: #452c2c;
        margin-bottom: 0.5em;
    }

    .top-row {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 0.4em;
    }

    .badge {
        font-size: 0.65em;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 999px;
    }

    .badge.verified {
        background: rgba(16, 185, 129, 0.15);
        color: #047857;
        border: 1px solid rgba(16, 185, 129, 0.35);
    }

    .badge.pending {
        background: rgba(245, 158, 11, 0.15);
        color: #b45309;
        border: 1px solid rgba(245, 158, 11, 0.35);
    }

    .info-section {
        margin-bottom: 0.5em;
    }

    .info-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.3em;
        font-size: 0.8em;
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
        margin-bottom: 0.5em;
    }

    .perks-list {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }

    .perk-badge {
        background: rgba(255, 255, 255, 0.5);
        padding: 2px 6px;
        border-radius: 10px;
        font-size: 0.65em;
        color: #452c2c;
        font-weight: 500;
    }

    .bottom-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        padding-top: 0.5em;
        gap: 8px;
    }

    .price {
        font-size: 1.3em;
        font-weight: 800;
        color: #262626;
    }

    .actions {
        display: flex;
        gap: 6px;
    }

    .action-btn {
        border: 0;
        background: rgba(0, 0, 0, 0.08);
        padding: 6px 8px;
        border-radius: 6px;
        font-size: 0.75em;
        font-weight: 700;
        cursor: pointer;
    }

    .action-btn.danger {
        background: rgba(239, 68, 68, 0.14);
        color: #b91c1c;
    }

    .action-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .go-corner {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 1.8em;
        height: 1.8em;
        overflow: hidden;
        top: 0;
        right: 0;
        background: linear-gradient(135deg, #6293c8, #384c6c);
        border-radius: 0 4px 0 32px;
    }

    .go-arrow {
        margin-top: -3px;
        margin-right: -3px;
        color: white;
        font-family: courier, sans;
        font-size: 0.9em;
    }

    .ticket-card {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 260px;
        background-color: #f2f8f9;
        border-radius: 10px;
        padding: 1.25em 1em;
        text-decoration: none;
        z-index: 0;
        overflow: hidden;
        background: linear-gradient(to bottom, #c3e6ec, #a7d1d9);
        font-family: Arial, Helvetica, sans-serif;
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

    .ticket-card:hover .perk-badge {
        transition: all 0.5s ease-out;
        background: rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.95);
    }

    .ticket-card:hover .price {
        transition: all 0.5s ease-out;
        color: #ffffff;
    }

    .ticket-card:hover .badge {
        transition: all 0.5s ease-out;
        border-color: rgba(255, 255, 255, 0.35);
    }
`;

export default VendorTicketCard;
