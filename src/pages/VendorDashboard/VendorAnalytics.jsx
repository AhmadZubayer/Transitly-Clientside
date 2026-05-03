import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart } from '@mui/x-charts/LineChart';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/Loading';

const VendorAnalytics = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['vendorAnalytics', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/vendor-analytics/${user.email}?days=30`);
            return res.data;
        }
    });

    const totals = data?.totals || { totalRevenue: 0, ticketsSold: 0, ticketsAdded: 0 };

    const revenueSeries = useMemo(() => data?.series?.revenue ?? [], [data?.series?.revenue]);
    const soldSeries = useMemo(() => data?.series?.sold ?? [], [data?.series?.sold]);
    const addedSeries = useMemo(() => data?.series?.added ?? [], [data?.series?.added]);

    const revenueX = useMemo(() => revenueSeries.map(d => d.date), [revenueSeries]);
    const revenueY = useMemo(() => revenueSeries.map(d => d.value), [revenueSeries]);

    const soldX = useMemo(() => soldSeries.map(d => d.date), [soldSeries]);
    const soldY = useMemo(() => soldSeries.map(d => d.value), [soldSeries]);

    const addedX = useMemo(() => addedSeries.map(d => d.date), [addedSeries]);
    const addedY = useMemo(() => addedSeries.map(d => d.value), [addedSeries]);

    return (
        <div className='p-4'>
            <div className='space-y-4'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-xl font-bold text-gray-800 font-adaptive'>Vendor Analytics</h2>
                    <p className='text-[12px] text-gray-500 font-adaptive'>Last 30 days overview</p>
                </div>

                {isLoading && (
                    <div className='flex justify-center items-center p-8'>
                        <Loading />
                    </div>
                )}

                {isError && (
                    <div className='text-center p-4 text-red-500 font-adaptive'>
                        <p>Error loading analytics: {error?.message}</p>
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                            <div className='bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4'>
                                <p className='text-gray-500 text-[11px] font-bold uppercase font-adaptive'>Total Revenue</p>
                                <p className='text-2xl font-bold text-emerald-600 font-adaptive'>৳{Number(totals.totalRevenue || 0).toLocaleString()}</p>
                            </div>
                            <div className='bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4'>
                                <p className='text-gray-500 text-[11px] font-bold uppercase font-adaptive'>Tickets Sold</p>
                                <p className='text-2xl font-bold text-gray-800 font-adaptive'>{totals.ticketsSold || 0}</p>
                            </div>
                            <div className='bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4'>
                                <p className='text-gray-500 text-[11px] font-bold uppercase font-adaptive'>Tickets Added</p>
                                <p className='text-2xl font-bold text-gray-800 font-adaptive'>{totals.ticketsAdded || 0}</p>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                            <div className='bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-3'>
                                <h3 className='font-bold text-gray-700 text-sm mb-2 font-adaptive'>Revenue</h3>
                                <LineChart
                                    xAxis={[{ scaleType: 'point', data: revenueX }]}
                                    series={[{ data: revenueY, label: 'Revenue (৳)' }]}
                                    height={240}
                                />
                            </div>

                            <div className='bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-3'>
                                <h3 className='font-bold text-gray-700 text-sm mb-2 font-adaptive'>Tickets Sold</h3>
                                <LineChart
                                    xAxis={[{ scaleType: 'point', data: soldX }]}
                                    series={[{ data: soldY, label: 'Tickets Sold' }]}
                                    height={240}
                                />
                            </div>

                            <div className='bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-3'>
                                <h3 className='font-bold text-gray-700 text-sm mb-2 font-adaptive'>Tickets Added</h3>
                                <LineChart
                                    xAxis={[{ scaleType: 'point', data: addedX }]}
                                    series={[{ data: addedY, label: 'Tickets Added' }]}
                                    height={240}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VendorAnalytics;
