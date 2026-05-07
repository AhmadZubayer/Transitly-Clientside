import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import generateTicketPDF from '../../utils/generateTicketPDF';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';

const UserBookingConfirmed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isProcessing, setIsProcessing] = useState(true);

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
          navigate('/dashboard/bookings');
          return;
        }

        const { ticketId, quantity, totalPrice, bookingId } = JSON.parse(paymentData);

        // Store payment in database
        const response = await axiosSecure.post('/store-payment', {
          userEmail: user.email,
          ticketId,
          quantity,
          totalPrice,
          stripeSessionId: sessionId,
          bookingId
        });

        console.log('Payment stored:', response.data);
        
        sessionStorage.removeItem('pendingPayment');

        // Show SweetAlert
        await Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            text: 'Your booking has been confirmed and your ticket is being downloaded.',
            timer: 3000,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: async () => {
                // Auto-download ticket PDF
                try {
                  const booking = response.data.booking;
                  const userDetails = {
                    name: user?.displayName || 'Guest',
                    email: user?.email,
                    phone: user?.phoneNumber || 'N/A'
                  };
                  await generateTicketPDF(booking, userDetails);
                } catch (pdfError) {
                  console.error('Error generating PDF:', pdfError);
                }
            }
        });

        // Redirect after SweetAlert
        navigate('/dashboard/bookings');
      } catch (error) {
        console.error('Error storing payment:', error);
        Swal.fire({
            icon: 'error',
            title: 'Payment Storage Failed',
            text: 'There was an issue confirming your payment in our system. Please contact support.',
            confirmButtonText: 'Go to Bookings'
        }).then(() => {
            navigate('/dashboard/bookings');
        });
      } finally {
        setIsProcessing(false);
      }
    };

    if (user?.email && sessionId) {
        storePayment();
    }
  }, [sessionId, user?.email, axiosSecure, navigate, user?.displayName, user?.phoneNumber]);

  return <Loading />;
};

export default UserBookingConfirmed;
