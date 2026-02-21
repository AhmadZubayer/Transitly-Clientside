import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaGithub } from 'react-icons/fa';
import logo from '../assets/transitly.png';

const Footer = () => {
    return (
        <StyledFooter>
            <div className="footer-content">
                {/* Left Section */}
                <div className="footer-section">
                    <img src={logo} alt="Transitly Logo" className="footer-logo" />
                    <p className="tagline">Seamless Ticket Booking & Management - Your Bookings Redefined</p>
                    
                    <h3 className="section-title">CONTACT US</h3>
                    <div className="contact-info">
                        <p>Helpline: +880 123456789</p>
                        <p>Email: contact@transitly.com</p>
                    </div>
                    
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube />
                        </a>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="footer-section">
                    <h3 className="section-title">LINKS</h3>
                    <ul className="footer-links">
                        <li><a href="/bus">Bus</a></li>
                        <li><a href="/train">Train</a></li>
                        <li><a href="/plane">Plane</a></li>
                        <li><a href="/upcoming">Upcoming</a></li>
                    </ul>
                </div>

                {/* Right Section */}
                <div className="footer-section">
                    <h3 className="section-title">POLICIES</h3>
                    <ul className="footer-links">
                        <li><a href="/refund-policy">Refund Policy</a></li>
                        <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
                        <li><a href="/about-us">About Us</a></li>
                        <li><a href="/careers">Careers - Join Us</a></li>
                    </ul>
                </div>
            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom">
                <p className="copyright">© {new Date().getFullYear()} Transitly. All rights reserved.</p>
                <p className="developer-info">This is a Web Dev project, built by Ahmad Zubayer</p>
                <p className="source-code">
                    Visit source code on 
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                </p>
            </div>
        </StyledFooter>
    );
};

const StyledFooter = styled.footer`
    background-color: #E0E0E0;
    padding: 3rem 2rem 1.5rem;
    margin-top: 4rem;

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
        margin-bottom: 2rem;

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
    }

    .footer-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .footer-logo {
        width: 150px;
        height: auto;
        margin-bottom: 0.5rem;
    }

    .tagline {
        font-size: 0.9rem;
        color: #555;
        line-height: 1.5;
        margin-bottom: 1rem;
    }

    .section-title {
        font-size: 1rem;
        font-weight: 700;
        color: #262626;
        margin-bottom: 0.5rem;
        letter-spacing: 0.5px;
    }

    .contact-info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;

        p {
            font-size: 0.9rem;
            color: #555;
        }
    }

    .social-icons {
        display: flex;
        gap: 1rem;

        a {
            color: #4a4a4a;
            font-size: 1.5rem;
            transition: color 0.3s ease, transform 0.3s ease;

            &:hover {
                color: #262626;
                transform: translateY(-3px);
            }
        }
    }

    .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        li {
            a {
                color: #555;
                text-decoration: none;
                font-size: 0.95rem;
                transition: color 0.3s ease, padding-left 0.3s ease;
                display: inline-block;

                &:hover {
                    color: #262626;
                    padding-left: 5px;
                }
            }
        }
    }

    .footer-divider {
        max-width: 1200px;
        margin: 0 auto 1.5rem;
        border: none;
        border-top: 1px solid #bebebe;
    }

    .footer-bottom {
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        p {
            margin: 0;
            font-size: 0.9rem;
            color: #555;
        }

        .copyright {
            font-weight: 500;
            color: #262626;
        }

        .developer-info {
            font-size: 0.85rem;
        }

        .source-code {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 0.85rem;

            a {
                color: #4a4a4a;
                font-size: 1.25rem;
                display: inline-flex;
                align-items: center;
                transition: color 0.3s ease, transform 0.3s ease;

                &:hover {
                    color: #262626;
                    transform: scale(1.1);
                }
            }
        }
    }
`;

export default Footer;