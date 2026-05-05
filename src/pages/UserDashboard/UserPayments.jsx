import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/Loading';
import Card from '../../components/Card';

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
        <div className='p-4'>
            <div className='space-y-4'>
                {/* Header */}
                <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                    <h2 className='text-xl font-bold text-gray-800 font-adaptive'>
                        Payment Transactions ({payments.length})
                    </h2>
                </div>

                {/* Table */}
                {isLoading && (
                    <div className='flex justify-center items-center p-8'>
                        <Loading />
                    </div>
                )}

                {isError && (
                    <div className='text-center p-4 text-red-500 font-adaptive'>
                        <p>Error loading payments: {error?.message}</p>
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        {payments.length > 0 ? (
                            <Card className='overflow-hidden !p-0'>
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra table-sm w-full">
                                        {/* head */}
                                        <thead>
                                            <tr className='bg-gray-100 dark:bg-gray-800/50'>
                                                <th className='text-gray-900 dark:text-gray-200 font-bold font-adaptive uppercase text-[11px]'>No.</th>
                                                <th className='text-gray-900 dark:text-gray-200 font-bold font-adaptive uppercase text-[11px]'>Transaction ID</th>
                                                <th className='text-gray-900 dark:text-gray-200 font-bold font-adaptive uppercase text-[11px]'>Ticket Title</th>
                                                <th className='text-gray-900 dark:text-gray-200 font-bold font-adaptive uppercase text-[11px]'>Amount</th>
                                                <th className='text-gray-900 dark:text-gray-200 font-bold font-adaptive uppercase text-[11px]'>Payment Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payments.map((payment, index) => (
                                                <tr key={payment._id} className='hover:bg-gray-100/50 dark:hover:bg-gray-700/50'>
                                                    <th className='text-gray-600 dark:text-gray-400 font-adaptive'>{index + 1}</th>
                                                    <td className='font-mono text-[12px] text-blue-600 dark:text-blue-400 font-adaptive'>{payment._id.toString().slice(0, 8)}...</td>
                                                    <td className='font-semibold text-gray-800 dark:text-gray-100 font-adaptive'>{payment.ticket?.ticketTitle || 'N/A'}</td>
                                                    <td className='font-bold text-green-600 dark:text-green-400 font-adaptive'>৳{payment.totalPrice.toLocaleString()}</td>
                                                    <td className='text-gray-600 dark:text-gray-400 font-adaptive text-[13px]'>{formatDate(payment.paymentDate)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        ) : (
                            <Card className='text-center p-8'>
                                <p className='text-gray-600 dark:text-gray-400 text-lg font-adaptive'>No payment transactions found</p>
                                <p className='text-gray-400 dark:text-gray-500 text-sm mt-1 font-adaptive'>Complete a booking to see transactions here</p>
                            </Card>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UserPayments;
