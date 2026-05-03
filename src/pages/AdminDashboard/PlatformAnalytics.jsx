import React from 'react';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart } from '@mui/x-charts/BarChart';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';

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
                    <h2 className='text-xl font-bold text-gray-800 font-adaptive'>Platform Analytics</h2>
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
                            <div className='bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-4'>
                                <p className='text-gray-500 text-[11px] font-bold uppercase font-adaptive'>Users</p>
                                <p className='text-2xl font-bold text-gray-800 font-adaptive'>{totals.totalUsers}</p>
                            </div>
                            <div className='bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-4'>
                                <p className='text-gray-500 text-[11px] font-bold uppercase font-adaptive'>Vendors</p>
                                <p className='text-2xl font-bold text-gray-800 font-adaptive'>{totals.totalVendors}</p>
                            </div>
                            <div className='bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-4'>
                                <p className='text-gray-500 text-[11px] font-bold uppercase font-adaptive'>Tickets</p>
                                <p className='text-2xl font-bold text-gray-800 font-adaptive'>{totals.totalTickets}</p>
                            </div>
                            <div className='bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-4'>
                                <p className='text-gray-500 text-[11px] font-bold uppercase font-adaptive'>Bookings</p>
                                <p className='text-2xl font-bold text-gray-800 font-adaptive'>{totals.totalBookings}</p>
                            </div>
                            <div className='bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-4 col-span-2 md:col-span-1'>
                                <p className='text-gray-500 text-[11px] font-bold uppercase font-adaptive'>Earnings</p>
                                <p className='text-2xl font-bold text-emerald-600 font-adaptive'>৳{Number(totals.totalEarnings || 0).toLocaleString()}</p>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div className='bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-3'>
                                <h3 className='font-bold text-gray-700 text-sm mb-2 font-adaptive'>Platform Totals</h3>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: metricsLabels }]}
                                    series={[{ data: metricsValues, label: 'Count' }]}
                                    height={280}
                                />
                            </div>

                            <div className='bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-3'>
                                <h3 className='font-bold text-gray-700 text-sm mb-2 font-adaptive'>Platform Earnings (Daily, 30%)</h3>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: earningsX }]}
                                    series={[{ data: earningsY, label: 'Earnings (৳)' }]}
                                    height={280}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PlatformAnalytics;