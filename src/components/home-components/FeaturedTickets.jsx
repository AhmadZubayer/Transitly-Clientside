import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import TicketCard from '../AllTickets/TicketCard';
import Loading from '../Loading';
import useAxios from '../../hooks/useAxios';

const FeaturedTickets = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const { data: tickets = [], isLoading, isError } = useQuery({
        queryKey: ['featuredTickets'],
        queryFn: async () => {
            const res = await axiosInstance.get('/tickets/advertised');
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
                    <h2 className='text-3xl font-bold text-gray-800 mb-6 font-adaptive'>Featured Tickets</h2>
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
        <div className='w-full px-6 py-12 overflow-hidden'>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-3xl font-bold text-gray-800 mb-10 font-adaptive text-center'>Featured Tickets</h2>
                
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="featured-swiper !pb-12"
                >
                    {tickets.map(ticket => (
                        <SwiperSlide key={ticket._id} style={{ width: '320px' }}>
                            <div className="h-full px-2">
                                <TicketCard ticket={ticket} onClick={() => handleTicketClick(ticket)} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className='flex justify-center mt-6'>
                    <button 
                        onClick={() => navigate('/all-tickets')}
                        className='btn btn-1 px-8'
                    >
                        View All Tickets
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedTickets;
