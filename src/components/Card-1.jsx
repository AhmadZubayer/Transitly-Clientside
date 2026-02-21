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

export default Card1;
