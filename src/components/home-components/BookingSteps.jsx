import React from 'react';
import styled from 'styled-components';
import Card from '../Card';

const BookingSteps = ({ steps }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center font-adaptive mb-6">Book Tickets in Just 4 Easy Steps</h2>
      <StyledWrapper>
        {steps?.map((step) => (
          <Card key={step.id} className="step-card">
            <div className="card-content">
              <div className="step-number">{step.id}</div>
              <h3 className="card-title font-adaptive">{step.title}</h3>
              <p className="card-desc font-adaptive">{step.description}</p>
            </div>
          </Card>
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
    width: 240px;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    padding: 2rem 1rem;
    background-color: #ffffff;
  }

  [data-theme='dark'] .step-card {
    background-color: #1e293b;
  }

  .step-card:hover {
    transform: translateY(-5px);
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .step-number {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6293c8, #384c6c);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .card-title {
    color: inherit;
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    line-height: 1.2;
    text-align: center;
  }

  .card-desc {
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.5;
    color: inherit;
    opacity: 0.8;
    text-align: center;
  }
`;

export default BookingSteps;
