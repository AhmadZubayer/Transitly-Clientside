import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HomeBanner = () => {
    const slides = [
        {
            image: '/banner/1.jpg',
            title: 'Seamless Travel',
            subtitle: 'Book your tickets with ease and comfort.'
        },
        {
            image: '/banner/2.jpeg',
            title: 'Luxury Coaches',
            subtitle: 'Experience the best-in-class travel comfort.'
        },
        {
            image: '/banner/3.jpg',
            title: 'Reach Your Destination',
            subtitle: 'Reliable and on-time bus services across the country.'
        },
        {
            image: '/banner/4.png',
            title: 'Safe & Secure',
            subtitle: 'Your safety is our top priority during every journey.'
        },
        {
            image: '/banner/5.jpg',
            title: 'Exclusive Deals',
            subtitle: 'Save more on your travels with our special offers.'
        },
        {
            image: '/banner/6.jpg',
            title: 'Easy Booking',
            subtitle: 'A few clicks are all it takes to secure your seat.'
        },
        {
            image: '/banner/7.jpg',
            title: 'Professional Drivers',
            subtitle: 'Highly skilled and experienced drivers for your peace of mind.'
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl relative">
            <Swiper
                spaceBetween={0}
                effect={'fade'}
                navigation={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay, EffectFade, Navigation]}
                className="mySwiper w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            {/* Image with overlay */}
                            <img 
                                src={slide.image} 
                                alt={slide.title} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                                <h2 className="text-xl md:text-3xl lg:text-4xl font-[900] text-white mb-1 drop-shadow-lg uppercase tracking-tighter">
                                    {slide.title}
                                </h2>
                                <p className="text-[10px] md:text-sm lg:text-base text-white/90 max-w-md font-medium drop-shadow-md">
                                    {slide.subtitle}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeBanner;