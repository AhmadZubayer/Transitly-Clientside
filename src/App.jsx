import React from 'react';
import { Outlet } from 'react-router';
import Nav from './components/Nav';
import Footer from './components/Footer';

const App = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <Nav></Nav>
            <main className="min-height-[calc(100vh-200px)]">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default App;