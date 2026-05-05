import React from 'react';
import { useForm } from 'react-hook-form';
import Card from '../Card';
import { FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import ModernBtn from '../ModernBtn';

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        Swal.fire({
            title: 'Message Sent!',
            text: 'We will get back to you shortly.',
            icon: 'success',
            confirmButtonColor: '#3B82F6'
        });
        reset();
    };

    return (
        <section id="contact-section" className="w-full px-6 py-12">
            <div className="max-w-4xl mx-auto">
                <Card className="p-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-gray-800 dark:text-gray-100 font-adaptive mb-2">Get in Touch</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-adaptive">Have questions about your booking? Our team is available 24/7 to assist you.</p>
                    </div>

                    

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="form-label">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="form-input"
                                    {...register('name', { required: 'Name is required' })}
                                />
                                {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="form-input"
                                    {...register('email', { 
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                />
                                {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Subject
                            </label>
                            <input
                                type="text"
                                placeholder="What's this about?"
                                className="form-input"
                                {...register('subject', { required: 'Subject is required' })}
                            />
                            {errors.subject && <span className="text-xs text-red-500 mt-1">{errors.subject.message}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Message
                            </label>
                            <textarea
                                placeholder="Write your message here..."
                                rows="5"
                                className="form-input"
                                {...register('message', { required: 'Message is required' })}
                            />
                            {errors.message && <span className="text-xs text-red-500 mt-1">{errors.message.message}</span>}
                        </div>

                        <div className="flex justify-center pt-2">
                            <ModernBtn 
                                type="submit" 
                                text="Send Message"
                            />
                        </div>
                    </form>
                </Card>
            </div>
        </section>
    );
};

export default ContactUs;
