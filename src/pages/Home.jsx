import React from 'react';
import BookingSelector from '../components/home-components/BookingSelector';
import BookingSteps from '../components/home-components/BookingSteps';
import { useLoaderData } from 'react-router-dom';
import ContactUs from '../components/home-components/ContactUs';


const Home = () => {
    const { districts, bookingSteps } = useLoaderData();

    return (
        <div className="flex flex-col items-center gap-y-3">
             <BookingSelector districts={districts}></BookingSelector>
             <BookingSteps steps={bookingSteps}></BookingSteps>
             <ContactUs></ContactUs>
        </div>
    );
};

export default Home;