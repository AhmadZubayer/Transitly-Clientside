import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaPhone, FaEnvelope, FaGithub, FaStripe, FaMapMarkerAlt, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import logo from '../assets/transitly.png';

const Footer = () => {
    return (
        <StyledFooter>
            <div className="footer-content">
                <div className="footer-section">
                    <img src={logo} alt="Transitly Logo" className="footer-logo" />
                    
                    <p className="tagline font-adaptive">Seamless Ticket Booking & Management - Your Bookings Redefined</p>
                </div>
                <div className="footer-section">
                    <h3 className="section-title font-adaptive">Quick Links</h3>
                    <ul className="footer-links">
                        <li><a href="/" className="font-adaptive">Home</a></li>
                        <li><a href="/all-tickets" className="font-adaptive">All Tickets</a></li>
                        <li><a href="/contact" className="font-adaptive">Contact Us</a></li>
                        <li><a href="/about-us" className="font-adaptive">About</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="section-title font-adaptive">Contact Info</h3>
                    <div className="contact-info">
                        <p className="font-adaptive"><FaEnvelope className="inline-icon" /> contact@transitly.com</p>
                        <p className="font-adaptive"><FaMapMarkerAlt className="inline-icon" /> Road 01, Building 123, Banani Dhaka</p>
                        <p className="font-adaptive"><FaPhone className="inline-icon" /> +880 123456789</p>
                    </div>
                </div>

                <div className="footer-section">
                    <h3 className="section-title font-adaptive">Payment Methods</h3>
                    <div className="payment-methods">
                        <div className="payment-icon stripe">
                            <FaStripe />
                        </div>
                        <p className="font-adaptive">Secure payments powered by Stripe</p>
                    </div>
                    
                    <div className="social-section">
                        <h3 className="section-title font-adaptive small">Find us on</h3>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="font-adaptive">
                                <FaFacebook />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-adaptive">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="font-adaptive">
                                <FaLinkedin />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="font-adaptive">
                                <FaXTwitter />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom">
                <p className="copyright font-adaptive">© 2025 Transitly. All rights reserved.</p>
                <p className="developer-info font-adaptive">This is a Web Dev project, built by Ahmad Zubayer</p>
                <div className="source-code font-adaptive">
                    Visit source code on 
                    <a href="https://github.com/AhmadZubayer/Transitly-Clientside" target="_blank" rel="noopener noreferrer" className="font-adaptive">
                        <FaGithub />
                    </a>
                </div>
            </div>
        </StyledFooter>
    );
};

const StyledFooter = styled.footer`
    background-color: #ffffff;
    padding: 3rem 1.5rem 1.5rem;
    margin-top: 4rem;
    border-radius: 3rem 3rem 0 0;
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
    border-top: 1px solid #e5e7eb;

    [data-theme="dark"] & {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        box-shadow: 0 -10px 25px -5px rgba(0, 0, 0, 0.3);
        border-top: 1px solid rgba(148, 163, 184, 0.1);
    }

    .footer-content {
        max-width: 1440px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2.5rem;
        margin-bottom: 2rem;

        @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 640px) {
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
        font-size: 1rem;
        font-weight: 600;
        color: #111827;
        line-height: 1.4;

        [data-theme="dark"] & {
            color: #e2e8f0;
        }
    }

    .sub-tagline {
        font-size: 0.85rem;
        color: #6b7280;
        line-height: 1.6;

        [data-theme="dark"] & {
            color: #94a3b8;
        }
    }

    .section-title {
        font-size: 0.75rem;
        font-weight: 900;
        color: #111827;
        margin-bottom: 0.5rem;
        letter-spacing: 1.5px;
        text-transform: uppercase;

        &.small {
            font-size: 0.65rem;
            margin-top: 0.5rem;
            margin-bottom: 0.25rem;
        }

        [data-theme="dark"] & {
            color: #60a5fa;
        }
    }

    .contact-info {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        p {
            font-size: 0.9rem;
            color: #4b5563;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;

            [data-theme="dark"] & {
                color: #cbd5e1;
            }
        }
    }

    .inline-icon {
        font-size: 1.1rem;
        color: #2563eb;

        [data-theme="dark"] & {
            color: #60a5fa;
        }
    }

    .payment-methods {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        p {
            font-size: 0.85rem;
            color: #6b7280;

            [data-theme="dark"] & {
                color: #94a3b8;
            }
        }
    }

    .payment-icon {
        font-size: 2.5rem;
        color: #6772e5; /* Stripe Purple */
        display: flex;
        align-items: center;
        
        [data-theme="dark"] & {
            color: #60a5fa;
        }
    }

    .social-section {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }

    .social-icons {
        display: flex;
        gap: 1.25rem;

        a {
            color: #4b5563;
            font-size: 1.4rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

            &:hover {
                color: #2563eb;
                transform: translateY(-4px) scale(1.1);
            }

            [data-theme="dark"] & {
                color: #60a5fa;
                
                &:hover {
                    color: #93c5fd;
                }
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
                color: #4b5563;
                text-decoration: none;
                font-size: 0.95rem;
                font-weight: 500;
                transition: all 0.3s ease;
                display: inline-block;

                &:hover {
                    color: #2563eb;
                    padding-left: 8px;
                    transform: translateX(4px);
                }

                [data-theme="dark"] & {
                    color: #94a3b8;

                    &:hover {
                        color: #60a5fa;
                    }
                }
            }
        }
    }

    .footer-divider {
        max-width: 1440px;
        margin: 0 auto 1.5rem;
        border: none;
        border-top: 1px solid #e5e7eb;

        [data-theme="dark"] & {
            border-top: 1px solid rgba(148, 163, 184, 0.1);
        }
    }

    .footer-bottom {
        max-width: 1440px;
        margin: 0 auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        p {
            margin: 0;
            font-size: 0.85rem;
            color: #6b7280;

            [data-theme="dark"] & {
                color: #64748b;
            }
        }

        .copyright {
            font-weight: 700;
            color: #111827;
            font-size: 0.95rem;

            [data-theme="dark"] & {
                color: #e2e8f0;
            }
        }

        .developer-info {
            font-size: 0.85rem;
            font-weight: 500;
            color: #4b5563;

            [data-theme="dark"] & {
                color: #94a3b8;
            }
        }

        .source-code {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            margin-top: 0.5rem;

            a {
                color: #4b5563;
                font-size: 1.4rem;
                display: inline-flex;
                align-items: center;
                transition: all 0.3s ease;

                &:hover {
                    color: #2563eb;
                    transform: scale(1.2) rotate(10deg);
                }

                [data-theme="dark"] & {
                    color: #94a3b8;

                    &:hover {
                        color: #60a5fa;
                    }
                }
            }
        }
    }
`;

export default Footer;