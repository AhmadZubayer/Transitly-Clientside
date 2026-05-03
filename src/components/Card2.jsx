import React from 'react';
import styled from 'styled-components';

const Card2 = () => {
  return (
    <StyledWrapper>
      <div className="card">
        Click me
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    box-sizing: border-box;
    width: 190px;
    height: 254px;
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 17px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-weight: bolder;
    color: #1e1e1e;
  }

  [data-theme="dark"] .card {
    background: rgba(17, 24, 39, 0.6);
    border: 1px solid rgba(148, 163, 184, 0.2);
    color: rgba(255, 255, 255, 0.9);
  }

  .card:hover {
    border: 1px solid #5044e4;
    transform: scale(1.05);
  }

  [data-theme="dark"] .card:hover {
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  .card:active {
    transform: scale(0.95) rotateZ(1.7deg);
  }`;

export default Card2;
