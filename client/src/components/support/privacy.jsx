import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="mt-24 lg:mt-32 max-w-4xl mx-auto p-6">
            <h1 className="text-3xl text-center text-custom-orange font-bold mb-6">Privacy Policy</h1>

            <p className="mb-4">
                Your privacy is critically important to us. At <strong className='text-custom-orange'><a target='_blank' href="https://www.betarbazar.com/">Betar Bazar</a></strong>, we have a few fundamental principles:
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
            <p className="mb-4">
                We collect information to provide better services to all our users. The information we collect includes:
            </p>
            <ul className="list-disc ml-6 mb-4">
                <li>Personal Information: Your name, email address, phone number, and delivery address.</li>
                <li>Transaction Information: Details of purchases made on our website.</li>
                <li>Usage Information: Information about how you use our website, such as your IP address, browser type, and pages visited.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
            <p className="mb-4">
                We use the information we collect to:
            </p>
            <ul className="list-disc ml-6 mb-4">
                <li>Process and fulfill your orders.</li>
                <li>Provide customer support.</li>
                <li>Improve our website and services.</li>
                <li>Send you promotional emails and updates (you can opt out at any time).</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Sharing Your Information</h2>
            <p className="mb-4">
                We do not share your personal information with third parties except in the following circumstances:
            </p>
            <ul className="list-disc ml-6 mb-4">
                <li>When required by law or to protect our legal rights.</li>
                <li>To third-party service providers who assist us in operating our website and services (e.g., payment processors).</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Cookies</h2>
            <p className="mb-4">
                Our website uses cookies to improve your browsing experience. Cookies are small text files stored on your device that help us analyze web traffic and customize our content to your preferences.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Your Rights</h2>
            <p className="mb-4">
                You have the right to:
            </p>
            <ul className="list-disc ml-6 mb-4">
                <li>Access and update your personal information.</li>
                <li>Request the deletion of your personal data.</li>
                <li>Opt-out of receiving promotional communications.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-4">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the updated policy will be effective immediately.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
            <p className="mb-4">
                If you have any questions about this Privacy Policy or your personal data, please contact us:
            </p>
            <ul className="list-disc ml-6 mb-4">
                <li>Email: <a href="mailto:support@ecommerce.com" className="text-blue-500 hover:underline">support@ecommerce.com</a></li>
                <li>Phone: +123 456 7890</li>
                <li>Address: 123 E-commerce St, Business City</li>
            </ul>
        </div>
    );
};

export default PrivacyPolicy;
