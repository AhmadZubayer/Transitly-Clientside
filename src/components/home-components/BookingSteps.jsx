import React from 'react';
import styled from 'styled-components';

const BookingSteps = ({ steps }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center ">Book Tickets in Just 4 Easy Steps</h2>
      <StyledWrapper>
        {steps?.map((step) => (
          <div key={step.id} className="card">
            <div className="card-content">
              <div className="step-number">{step.id}</div>
              <h3 className="card-title">{step.title}</h3>
              <p className="card-desc">{step.description}</p>
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
  gap: 2rem;
  padding: 2rem;

  .card {
    width: 250px;
    min-height: 300px;
    border-radius: 30px;
    background: #e0e0e0;
    box-shadow: 15px 15px 30px #bebebe,
               -15px -15px 30px #ffffff;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 20px 20px 40px #bebebe,
               -20px -20px 40px #ffffff;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .step-number {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6293c8, #384c6c);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    box-shadow: 5px 5px 10px #bebebe,
               -5px -5px 10px #ffffff;
  }

  .card-title {
    color: #262626;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    line-height: 1.3;
    text-align: center;
  }

  .card-desc {
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.5;
    color: #555;
    text-align: center;
  }
`;

export default BookingSteps;

