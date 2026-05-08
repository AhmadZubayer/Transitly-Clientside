import React, { useEffect } from 'react';
import BookingSelector from '../components/home-components/BookingSelector';
import BookingSteps from '../components/home-components/BookingSteps';
import { useLoaderData, useLocation } from 'react-router-dom';
import ContactUs from '../components/home-components/ContactUs';
import LatestTickets from '../components/home-components/LatestTickets';
import FeaturedTickets from '../components/home-components/FeaturedTickets';
import HomeBanner from '../components/home-components/HomeBanner';


const Home = () => {
    const {  bookingSteps } = useLoaderData();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollToContact) {
            const contactSection = document.getElementById('contact-section');
            if (contactSection) {
                setTimeout(() => {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <div className="flex flex-col items-center gap-y-1 w-full pb-10">
            <div className="w-full relative z-0">
                <HomeBanner />
            </div>
            
            <div className="w-full -mt-10 md:-mt-16 lg:-mt-20 relative z-10">
                <BookingSelector />
            </div>

             <FeaturedTickets />
             <LatestTickets />
             <BookingSteps steps={bookingSteps} />
             <ContactUs />
        </div>
    );
};

export default Home;