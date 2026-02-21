import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Card1 from '../Card-1';

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission here
        reset();
    };

    return (
        <StyledWrapper>
            <Card1 width="100%" height="auto">
                <div className="contact-content">
                    <div className="contact-info">
                        <h2>Got a Query? Contact Us</h2>
                        <p>We are Available for you 24/7</p>
                        <p>Helpline: +880 123456789</p>
                    </div>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Your Name"
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && <span className="error">{errors.name.message}</span>}
                        </div>
                        
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Your Email"
                                {...register('email', { 
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                            />
                            {errors.email && <span className="error">{errors.email.message}</span>}
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Subject"
                                {...register('subject', { required: 'Subject is required' })}
                            />
                            {errors.subject && <span className="error">{errors.subject.message}</span>}
                        </div>

                        <div className="form-group">
                            <textarea
                                placeholder="Your Message"
                                rows="5"
                                {...register('message', { required: 'Message is required' })}
                            />
                            {errors.message && <span className="error">{errors.message.message}</span>}
                        </div>

                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </Card1>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  padding: 3rem;
  max-width: 1200px;
  margin: 0 auto;

  .contact-content {
    display: flex;
    flex-direction: row;
    gap: 3rem;
    align-items: flex-start;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 2rem;
    }
  }

  .contact-info {
    flex: 1;
    
    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #262626;
    }

    p {
      font-size: 1.125rem;
      color: #555;
    }
  }

  .form {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .form input,
  .form textarea {
    width: 100%;
    resize: none;
    outline: 0;
    padding: 8px 14px;
    border: 1px solid rgb(219, 213, 213);
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;
    background: #f5f5f5;
  }

  .form input:focus,
  .form textarea:focus {
    border-color: royalblue;
    background: white;
  }

  .form button {
    align-self: flex-end;
    padding: 8px 16px;
    outline: 0;
    border: 0;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    background-color: royalblue;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .form button:hover {
    background-color: #4169e1;
  }

  .error {
    color: red;
    font-size: 12px;
  }
`;

export default ContactUs;
