import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import TicketCard from '../AllTickets/TicketCard';
import Loading from '../Loading';
import useAxios from '../../hooks/useAxios';

const LatestTickets = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const { data: tickets = [], isLoading, isError } = useQuery({
        queryKey: ['latestTickets'],
        queryFn: async () => {
            const res = await axiosInstance.get('/tickets/latest?limit=8');
            return res.data;
        }
    });

    const handleTicketClick = (ticket) => {
        navigate(`/ticket/${ticket._id}`);
    };

    if (isLoading) {
        return (
            <div className='w-full px-6 py-8'>
                <div className='max-w-7xl mx-auto'>
                    <h2 className='text-3xl font-bold text-gray-800 mb-6'>Latest Tickets</h2>
                    <div className='flex justify-center items-center py-12'>
                        <Loading />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || tickets.length === 0) {
        return null;
    }

    return (
        <div className='w-full px-6 py-8'>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-3xl font-bold text-gray-800 mb-6'>Latest Tickets</h2>

                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 0, disableOnInteraction: false }}
                    speed={3000}
                    loop={true}
                    slidesPerView={3}
                    spaceBetween={20}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {tickets.map(ticket => (
                        <SwiperSlide key={ticket._id}>
                            <div className="h-full" onClick={() => handleTicketClick(ticket)}>
                                <TicketCard ticket={ticket} onClick={() => handleTicketClick(ticket)} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default LatestTickets;
