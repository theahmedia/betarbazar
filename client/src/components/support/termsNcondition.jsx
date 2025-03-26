import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="mt-24 lg:mt-32 max-w-4xl mx-auto p-6">
            <h1 className="text-3xl text-center text-custom-orange font-bold mb-6">Terms and Conditions</h1>

            <p className="mb-4">
                Welcome to <strong className='text-custom-orange'><a target='_blank' href="https://www.betarbazar.com/">Betar Bazar</a></strong>. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our services.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
                By using our website, you agree to these terms and conditions, as well as our Privacy Policy. If you do not agree, you must not use our website.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">2. Use of Our Website</h2>
            <ul className="list-disc ml-6 mb-4">
                <li>You must be at least 18 years old to use our website or have the permission of a parent or guardian.</li>
                <li>You agree to use our website only for lawful purposes.</li>
                <li>Unauthorized use of the website may result in legal action.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Product Information</h2>
            <p className="mb-4">
                We strive to ensure that all product descriptions, images, and prices are accurate. However, errors may occur, and we reserve the right to correct them without prior notice.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Payment and Pricing</h2>
            <p className="mb-4">
                All prices are displayed in [Currency]. Payments must be made in full before orders are processed. We reserve the right to change prices without notice.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Returns and Refunds</h2>
            <p className="mb-4">
                Our return and refund policy is outlined separately on our website. By using our services, you agree to abide by these terms.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
                All content on our website, including text, images, logos, and code, is the property of <strong>Your E-Commerce Website</strong> and is protected by copyright laws. You may not use or reproduce this content without our written permission.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
                We are not responsible for any direct, indirect, or consequential losses arising from the use of our website or products.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">8. Modifications to Terms</h2>
            <p className="mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">9. Governing Law</h2>
            <p className="mb-4">
                These terms are governed by the laws of [Your Country/State]. Any disputes will be resolved in the courts of [Your Jurisdiction].
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">10. Contact Us</h2>
            <p className="mb-4">
                If you have any questions or concerns about these terms, please contact us:
            </p>
            <ul className="list-disc ml-6 mb-4">
                <li>Email: <a href="mailto:support@ecommerce.com" className="text-blue-500 hover:underline">support@ecommerce.com</a></li>
                <li>Phone: +123 456 7890</li>
                <li>Address: 123 E-commerce St, Business City</li>
            </ul>
        </div>
    );
};

export default TermsAndConditions;
