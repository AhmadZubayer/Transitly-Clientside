import React from 'react';
import { Outlet } from 'react-router';
import Nav from './components/Nav';
import Footer from './components/Footer';

const App = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default App;