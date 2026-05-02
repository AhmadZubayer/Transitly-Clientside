import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UserBookingConfirmed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [paymentStored, setPaymentStored] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const storePayment = async () => {
      try {
        if (!sessionId || !user?.email) {
          return;
        }

        // Get payment data from sessionStorage
        const paymentData = sessionStorage.getItem('pendingPayment');
        if (!paymentData) {
          console.error('No payment data found');
          return;
        }

        const { ticketId, quantity, totalPrice } = JSON.parse(paymentData);

        // Store payment in database
        const response = await axiosSecure.post('/store-payment', {
          userEmail: user.email,
          ticketId,
          quantity,
          totalPrice,
          stripeSessionId: sessionId
        });

        console.log('Payment stored:', response.data);
        setPaymentStored(true);
        setShowToast(true);
        sessionStorage.removeItem('pendingPayment');

        // Auto-redirect after 2 seconds
        const timer = setTimeout(() => {
          navigate('/dashboard/bookings');
        }, 2000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error storing payment:', error);
        setPaymentStored(false);
      }
    };

    storePayment();
  }, [sessionId, user?.email, axiosSecure, navigate]);

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      {showToast && (
        <Toast>
          <ToastContent>
            <CheckIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="28"
                height="28"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </CheckIcon>
            <div>
              <ToastTitle>Payment Successful! 🎉</ToastTitle>
              <ToastMessage>Your booking has been confirmed. Redirecting to bookings...</ToastMessage>
            </div>
          </ToastContent>
          <ProgressBar />
        </Toast>
      )}
    </div>
  );
};

const Toast = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #10b981;
  color: white;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
  z-index: 9999;

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    left: 20px;
    right: 20px;
    max-width: none;
  }
`;

const ToastContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const CheckIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
`;

const ToastTitle = styled.h3`
  margin: 0;
  font-weight: 600;
  font-size: 14px;
`;

const ToastMessage = styled.p`
  margin: 4px 0 0 0;
  font-size: 13px;
  opacity: 0.9;
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.4);
  animation: progress 2s linear forwards;
  border-radius: 0 0 8px 0;

  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;

export default UserBookingConfirmed;
