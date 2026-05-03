import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Nav from '../components/Nav';


const AuthLayout = () => {
    return ( 
        <div className='flex items-center justify-center mx-auto px-4 py-12 min-h-[60vh]'>
            <div className="w-full max-w-md">
                <Outlet></Outlet>
            </div>        
        </div>
    );
};

export default AuthLayout;