import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import TicketPeek from '../components/register/TicketPeek';


const AuthLayout = () => {
    return ( 
         <div>
            <Nav></Nav>
            <div className='flex items-start gap-8 max-w-7xl mx-auto px-4 py-8'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <TicketPeek></TicketPeek>
                </div>
            </div>
            <Footer></Footer>
        </div>
         
    );
};

export default AuthLayout;