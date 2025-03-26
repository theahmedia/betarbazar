import React, { useState } from 'react';
import Lottie from "lottie-react";
import animationEmail from "../../assets/animated-icons/Animation_email_white.json";
import animationCall from "../../assets/animated-icons/Animation_calli.json";
import animationLocation from "../../assets/animated-icons/Animation_location_white.json";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/contact/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setResponseMessage(data.message);
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setResponseMessage(data.error);
            }
        } catch (error) {
            setResponseMessage('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="mt-24 lg:mt-32 px-2 max-w-7xl mx-auto">
            <h1 className="text-3xl text-center text-custom-orange font-bold mb-6">Contact Us</h1>

            {/* Contact Information & Map */}
            <div className="grid sm:grid-cols-12 items-center gap-10 mb-12">
                <div className="sm:col-span-12 lg:col-span-5 space-y-8">
                    <div className="relative rounded-lg group">
                        <div className="relative flex flex-col sm:flex-row items-center space-x-4 bg-custom-orange px-2 py-6 sm:p-6 rounded-xl">
                            <div className="px-3 rounded-full mb-4">
                                <Lottie animationData={animationEmail} className="w-8 h-8" />
                            </div>
                            <div className='text-center'>
                                <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                                <p className="mb-2">We&apos;ll respond within 24 hours</p>
                                <a href="mailto:support@theahmedia.com" className="text-white hover:text-custom-black">
                                    support@betarbazar.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative rounded-lg group">
                    <div className="relative flex flex-col sm:flex-row items-center space-x-4 bg-custom-orange px-2 py-6 sm:p-6 rounded-xl">
                            <div className="px-3 rounded-full mb-4">
                                <Lottie animationData={animationCall} className="w-8 h-8" />
                            </div>
                            <div className='text-center'>
                                <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                                <p className="text-white mb-2">Mon-Fri from 8am to 5pm</p>
                                <a href="mailto:support@theahmedia.com" className="text-white hover:text-custom-black">
                                    01758 111 870
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative rounded-lg group">
                    <div className="relative flex flex-col sm:flex-row items-center space-x-4 bg-custom-orange px-2 py-6 sm:p-6 rounded-xl">
                            <div className="px-3 rounded-full mb-4">
                                <Lottie animationData={animationLocation} className="w-8 h-8" />
                            </div>
                            <div className='text-center'>
                                <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                                <p className="text-white mb-2">Come say hello at our office</p>
                                <address className="not-italic text-white hover:text-custom-black">
                                    Stadium road, 488 Matin Manzil<br />
                                    Ziladarpara, Bogura, 5800
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-12 lg:col-span-7">
                    <iframe
                        className="w-full rounded-lg h-[300px] lg:h-[550px]"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.744084251787!2d89.36160777617916!3d24.838423977943677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc55006fe97de1%3A0x25ffb1060c1aa58f!2sThe%20AH%20Media!5e0!3m2!1sen!2sbd!4v1735994663704!5m2!1sen!2sbd"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-semibold">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-semibold">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        rows="4"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                    Submit
                </button>
            </form>
            {responseMessage && <p className="mt-4">{responseMessage}</p>}
        </div>
    );
};

export default ContactUs;
