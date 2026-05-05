import React from 'react';
import styled from 'styled-components';

const TicketCardStyle = ({ children, className = '', ...props }) => {
  return (
    <StyledWrapper {...props}>
      <div className={`TicketCardStyle ${className}`}>
        <div className="card-content-wrapper">
            {children}
        </div>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .TicketCardStyle {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 320px; /* Reduced from 400px */
    background-color: #f2f8f9 !important;
    border-radius: 10px;
    padding: 1.5em 1.2em; /* Reduced from 2em */
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
    background: linear-gradient(to bottom, #c3e6ec, #a7d1d9) !important;
    font-family: Arial, Helvetica, sans-serif;
    transition: all 0.35s ease-out;
    border: none !important;
  }

  .card-content-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      z-index: 10;
  }

  /* ABSOLUTE DARK MODE ISOLATION */
  /* We use extreme specificity to override App.css !important rules */
  .TicketCardStyle, 
  .TicketCardStyle p, 
  .TicketCardStyle span, 
  .TicketCardStyle div:not(.go-corner):not(.go-arrow),
  .TicketCardStyle h1,
  .TicketCardStyle h2,
  .TicketCardStyle h3 {
    color: #1a1a1a !important;
    background-color: transparent !important;
    border-color: rgba(0,0,0,0.1) !important;
  }

  .TicketCardStyle:before {
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

  .TicketCardStyle:hover:before {
    transform: scale(28);
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
    z-index: 20;
  }

  .go-arrow {
    margin-top: -4px;
    margin-right: -4px;
    color: white !important;
    font-family: courier, sans;
  }

  /* Ensure text colors change on hover */
  .TicketCardStyle:hover,
  .TicketCardStyle:hover p,
  .TicketCardStyle:hover span,
  .TicketCardStyle:hover div:not(.go-corner):not(.go-arrow),
  .TicketCardStyle:hover h1,
  .TicketCardStyle:hover h2,
  .TicketCardStyle:hover h3 {
     color: #ffffff !important;
     transition: all 0.5s ease-out;
  }
`;

export default TicketCardStyle;
