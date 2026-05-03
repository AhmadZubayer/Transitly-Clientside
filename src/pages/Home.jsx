import React from 'react';
import BookingSelector from '../components/home-components/BookingSelector';
import BookingSteps from '../components/home-components/BookingSteps';
import { useLoaderData } from 'react-router-dom';
import ContactUs from '../components/home-components/ContactUs';
import LatestTickets from '../components/home-components/LatestTickets';
import FeaturedTickets from '../components/home-components/FeaturedTickets';


const Home = () => {
    const {  bookingSteps } = useLoaderData();

    return (
        <div className="flex flex-col items-center gap-y-1">
             <BookingSelector></BookingSelector>
             <FeaturedTickets></FeaturedTickets>
             <LatestTickets></LatestTickets>
             <BookingSteps steps={bookingSteps}></BookingSteps>
             <ContactUs></ContactUs>
        </div>
    );
};

export default Home;