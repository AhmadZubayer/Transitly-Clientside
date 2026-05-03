import React from 'react';
import styled from 'styled-components';

const Card1 = ({ children, width = '190px', height = 'auto', className = '' }) => {
  return (
    <StyledWrapper width={width} height={height}>
      <div className={`card ${className}`}>
        {children}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: 20px;
    background: #e0e0e0;
    box-shadow: 10px 10px 20px #bebebe,
               -10px -10px 20px #ffffff;
    padding: 1.25rem;
    transition: transform 0.3s ease, background-color 0.3s ease;
  }

  [data-theme="dark"] & .card {
    background: rgba(31, 41, 55, 0.8) !important;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.4) !important;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: 15px 15px 25px #bebebe,
               -15px -15px 25px #ffffff;
  }
`;

export const CardWrapper = styled.div`
  padding: 1rem 0;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  .contact-content {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: flex-start;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1.5rem;
    }
  }

  .contact-info {
    flex: 1;
    
    h2 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: #262626;
      transition: color 0.3s ease;
    }

    [data-theme="dark"] & h2 {
      color: rgba(255, 255, 255, 0.92) !important;
    }

    p {
      font-size: 1rem;
      color: #555;
      transition: color 0.3s ease;
    }

    [data-theme="dark"] & p {
      color: rgba(203, 213, 225, 0.92) !important;
    }
  }

  .form {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .form input,
  .form textarea {
    width: 100%;
    resize: none;
    outline: 0;
    padding: 6px 12px;
    border: 1px solid rgb(219, 213, 213);
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;
    background: #f5f5f5;
  }

  [data-theme="dark"] & .form input,
  [data-theme="dark"] & .form textarea {
    background: rgba(17, 24, 39, 0.8) !important;
    border-color: rgba(148, 163, 184, 0.2) !important;
    color: rgba(255, 255, 255, 0.92) !important;
  }

  .form input:focus,
  .form textarea:focus {
    border-color: royalblue;
    background: white;
  }

  .form button {
    align-self: flex-end;
    padding: 8px 16px;
    outline: 0;
    border: 0;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    background-color: royalblue;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .form button:hover {
    background-color: #4169e1;
  }

  .error {
    color: red;
    font-size: 12px;
  }
`;

export default Card1;
