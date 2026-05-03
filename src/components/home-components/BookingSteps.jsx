import React from 'react';
import styled from 'styled-components';

const BookingSteps = ({ steps }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center font-adaptive">Book Tickets in Just 4 Easy Steps</h2>
      <StyledWrapper>
        {steps?.map((step) => (
          <div key={step.id} className="step-card">
            <div className="card-content">
              <div className="step-number">{step.id}</div>
              <h3 className="card-title font-adaptive">{step.title}</h3>
              <p className="card-desc font-adaptive">{step.description}</p>
            </div>
          </div>
        ))}
      </StyledWrapper>
    </>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem;
  padding: 1.5rem;

  .step-card {
    width: 220px;
    min-height: 250px;
    border-radius: 20px;
    background: #e0e0e0;
    box-shadow: 10px 10px 20px #bebebe,
               -10px -10px 20px #ffffff;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  .step-card:hover {
    transform: translateY(-3px);
    box-shadow: 12px 12px 24px #bebebe,
               -12px -12px 24px #ffffff;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6293c8, #384c6c);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
    box-shadow: 4px 4px 8px #bebebe,
               -4px -4px 8px #ffffff;
  }

  .card-title {
    color: #262626;
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    line-height: 1.2;
    text-align: center;
  }

  .card-desc {
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1.4;
    color: #555;
    text-align: center;
  }
`;

export default BookingSteps;

