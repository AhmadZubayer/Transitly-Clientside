import React from 'react';
import { useForm } from 'react-hook-form';
import Card1, { CardWrapper } from '../Card-1';

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission here
        reset();
    };

    return (
        <div className="max-w-4xl mx-auto w-full">
            <CardWrapper>
                <Card1 width="100%" height="auto">
                    <div className="contact-content">
                        <div className="contact-info">
                            <h2 className="font-adaptive">Got a Query? Contact Us</h2>
                            <p className="font-adaptive">We are Available for you 24/7</p>
                            <p className="font-adaptive">Helpline: +880 123456789</p>
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
            </CardWrapper>
        </div>
    );
};

export default ContactUs;
