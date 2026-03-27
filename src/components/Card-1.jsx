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
    border-radius: 30px;
    background: #e0e0e0;
    box-shadow: 15px 15px 30px #bebebe,
               -15px -15px 30px #ffffff;
    padding: 2rem;
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 20px 20px 40px #bebebe,
               -20px -20px 40px #ffffff;
  }
`;

export const CardWrapper = styled.div`
  padding: 3rem;
  max-width: 1200px;
  margin: 0 auto;

  .contact-content {
    display: flex;
    flex-direction: row;
    gap: 3rem;
    align-items: flex-start;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 2rem;
    }
  }

  .contact-info {
    flex: 1;
    
    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #262626;
    }

    p {
      font-size: 1.125rem;
      color: #555;
    }
  }

  .form {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .form input,
  .form textarea {
    width: 100%;
    resize: none;
    outline: 0;
    padding: 8px 14px;
    border: 1px solid rgb(219, 213, 213);
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;
    background: #f5f5f5;
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
