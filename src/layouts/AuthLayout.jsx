import React from 'react';
import { Outlet } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';

const AuthGlobalStyle = createGlobalStyle`
    body {
        background-image: url('/auth-img2.jpg') !important;
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-attachment: fixed !important;
        background-color: #000 !important; /* Fallback */
    }
`;

const AuthLayout = () => {
    return ( 
        <>
            <AuthGlobalStyle />
            <StyledAuthWrapper>
                <div className="overlay"></div>
                <div className='content-container'>
                    <div className="form-wrapper">
                        <Outlet></Outlet>
                    </div>        
                </div>
            </StyledAuthWrapper>
        </>
    );
};

const StyledAuthWrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: calc(100vh - 180px);
    display: flex;
    align-items: center;
    justify-content: center;

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.1),
            rgba(0, 0, 0, 0.5)
        );
        z-index: -1;
    }

    .content-container {
        position: relative;
        z-index: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 5rem 1rem;
    }

    .form-wrapper {
        width: 100%;
        max-width: 450px;
        animation: fadeIn 0.8s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Dark mode adjustments */
    [data-theme="dark"] & .overlay {
        background: linear-gradient(
            to bottom,
            rgba(15, 23, 42, 0.6),
            rgba(15, 23, 42, 0.9)
        );
    }
`;

export default AuthLayout;