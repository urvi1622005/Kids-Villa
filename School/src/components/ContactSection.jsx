import React from 'react';

const ContactSection = () => {
    return (
        <section id="contact" className="p-8 bg-gray-100">
            <h2 className="text-3xl text-center">Contact Us</h2>
            <form className="mt-4 max-w-md mx-auto">
                <div>
                    <label className="block" htmlFor="name">Name:</label>
                    <input className="w-full p-2 border" type="text" id="name" required />
                </div>
                <div className="mt-4">
                    <label className="block" htmlFor="email">Email:</label>
                    <input className="w-full p-2 border" type="email" id="email" required />
                </div>
                <div className="mt-4">
                    <label className="block" htmlFor="message">Message:</label>
                    <textarea className="w-full p-2 border" id="message" rows="4" required></textarea>
                </div>
                <button className="mt-4 bg-blue-600 text-white p-2" type="submit">Send Message</button>
            </form>
        </section>
    );
};

export default ContactSection;
