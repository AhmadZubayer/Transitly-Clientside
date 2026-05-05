import React from 'react';
import styled from 'styled-components';

const Card = ({ children, className = '', ...props }) => {
  return (
    <StyledWrapper {...props}>
      <div className={`custom-card ${className}`}>
        {children}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .custom-card {
    padding: 1.5rem;
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    border: 1px solid #e5e7eb;
  }

  /* Dark mode - Midnight Blue */
  [data-theme='dark'] & .custom-card {
    background-color: #1e293b; /* slate-800 or similar midnight blue */
    border-color: #334155;
    color: #f8fafc;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  }
`;

export default Card;
