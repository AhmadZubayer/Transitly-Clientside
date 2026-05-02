import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/Loading';

const UserPayments = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Fetch user's payments
    const { data: payments = [], isLoading, isError, error } = useQuery({
        queryKey: ['userPayments', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/payments/user/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className='p-6'>
            <div className='space-y-6'>
                {/* Header */}
                <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                    <h2 className='text-2xl font-bold text-gray-800'>
                        Payment Transactions ({payments.length})
                    </h2>
                </div>

                {/* Table */}
                {isLoading && (
                    <div className='flex justify-center items-center p-12'>
                        <Loading />
                    </div>
                )}

                {isError && (
                    <div className='text-center p-6 text-red-500'>
                        <p>Error loading payments: {error?.message}</p>
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        {payments.length > 0 ? (
                            <div className="overflow-x-auto bg-white rounded-lg shadow">
                                <table className="table table-zebra w-full">
                                    {/* head */}
                                    <thead>
                                        <tr className='bg-gray-100'>
                                            <th className='text-gray-700'>No.</th>
                                            <th className='text-gray-700'>Transaction ID</th>
                                            <th className='text-gray-700'>Ticket Title</th>
                                            <th className='text-gray-700'>Amount</th>
                                            <th className='text-gray-700'>Payment Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map((payment, index) => (
                                            <tr key={payment._id} className='hover'>
                                                <th className='text-gray-600'>{index + 1}</th>
                                                <td className='font-mono text-sm text-blue-600'>{payment._id.toString().slice(0, 8)}...</td>
                                                <td className='font-semibold text-gray-800'>{payment.ticket?.ticketTitle || 'N/A'}</td>
                                                <td className='font-bold text-green-600'>৳{payment.totalPrice.toLocaleString()}</td>
                                                <td className='text-gray-600'>{formatDate(payment.paymentDate)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className='text-center p-12 bg-gray-50 rounded-lg'>
                                <p className='text-gray-600 text-lg'>No payment transactions found</p>
                                <p className='text-gray-500 text-sm mt-2'>Complete a booking to see transactions here</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UserPayments;
