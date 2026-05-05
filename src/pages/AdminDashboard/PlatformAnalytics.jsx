import React from 'react';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart } from '@mui/x-charts/BarChart';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import Card from '../../components/Card';

const PlatformAnalytics = () => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['platformAnalytics'],
        queryFn: async () => {
            const res = await axiosSecure.get('/platform-analytics?days=30');
            return res.data;
        }
    });

    const totals = data?.totals || {
        totalUsers: 0,
        totalVendors: 0,
        totalTickets: 0,
        totalBookings: 0,
        totalEarnings: 0
    };

    const revenueSeries = useMemo(
        () => data?.series?.platformRevenueDaily ?? [],
        [data?.series?.platformRevenueDaily]
    );

    const metricsLabels = ['Users', 'Vendors', 'Tickets', 'Bookings'];
    const metricsValues = [
        totals.totalUsers || 0,
        totals.totalVendors || 0,
        totals.totalTickets || 0,
        totals.totalBookings || 0
    ];

    const earningsX = useMemo(() => revenueSeries.map((d) => d.date), [revenueSeries]);
    const earningsY = useMemo(() => revenueSeries.map((d) => d.value), [revenueSeries]);

    return (
        <div className='p-4'>
            <div className='space-y-4'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-xl font-black text-gray-800 dark:text-gray-100 font-adaptive'>Platform Analytics</h2>
                    <p className='text-[12px] text-gray-500 font-adaptive'>Last 30 days overview</p>
                </div>

                {isLoading && (
                    <div className='flex justify-center items-center p-8'>
                        <Loading />
                    </div>
                )}

                {isError && (
                    <div className='text-center p-4 text-red-500 font-adaptive'>
                        <p>Error loading platform analytics: {error?.message}</p>
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
                            <Card className='p-4'>
                                <p className='text-gray-500 dark:text-gray-400 text-[11px] font-bold uppercase font-adaptive'>Users</p>
                                <p className='text-2xl font-black text-gray-800 dark:text-gray-100 font-adaptive'>{totals.totalUsers}</p>
                            </Card>
                            <Card className='p-4'>
                                <p className='text-gray-500 dark:text-gray-400 text-[11px] font-bold uppercase font-adaptive'>Vendors</p>
                                <p className='text-2xl font-black text-gray-800 dark:text-gray-100 font-adaptive'>{totals.totalVendors}</p>
                            </Card>
                            <Card className='p-4'>
                                <p className='text-gray-500 dark:text-gray-400 text-[11px] font-bold uppercase font-adaptive'>Tickets</p>
                                <p className='text-2xl font-black text-gray-800 dark:text-gray-100 font-adaptive'>{totals.totalTickets}</p>
                            </Card>
                            <Card className='p-4'>
                                <p className='text-gray-500 dark:text-gray-400 text-[11px] font-bold uppercase font-adaptive'>Bookings</p>
                                <p className='text-2xl font-black text-gray-800 dark:text-gray-100 font-adaptive'>{totals.totalBookings}</p>
                            </Card>
                            <Card className='p-4 col-span-2 md:col-span-1'>
                                <p className='text-gray-500 dark:text-gray-400 text-[11px] font-bold uppercase font-adaptive'>Earnings</p>
                                <p className='text-2xl font-black text-emerald-600 dark:text-emerald-500 font-adaptive'>৳{Number(totals.totalEarnings || 0).toLocaleString()}</p>
                            </Card>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <Card title="Platform Totals" className='p-3'>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: metricsLabels }]}
                                    series={[{ data: metricsValues, label: 'Count' }]}
                                    height={280}
                                />
                            </Card>

                            <Card title="Platform Earnings (Daily, 30%)" className='p-3'>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: earningsX }]}
                                    series={[{ data: earningsY, label: 'Earnings (৳)' }]}
                                    height={280}
                                />
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PlatformAnalytics;
