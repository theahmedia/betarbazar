import React from "react";

const HelpNSupport = () => {
  return (
    <div className="mt-24 lg:mt-32 max-w-4xl mx-auto p-6">
      <h1 className="text-3xl text-center text-custom-orange font-bold mb-6">Help & Support</h1>
      <p className="mb-4">
        Welcome to our Help & Support page. Here, you'll find answers to common questions and details on how we can assist you.
      </p>

      {/* Section 1: FAQs */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQs)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>How do I place an order?</strong> - Browse our products, add items to your cart, and proceed to checkout.
          </li>
          <li>
            <strong>What payment methods are accepted?</strong> - We accept credit cards, debit cards, PayPal, and more.
          </li>
          <li>
            <strong>How can I track my order?</strong> - Go to the "Order History & Tracking" page in your account to check your order status.
          </li>
          <li>
            <strong>Can I return or exchange an item?</strong> - Yes, please visit our <a href="/return-policy" className="text-blue-500">Return Policy</a> page for more information.
          </li>
          <li>
            <strong>How do I contact customer support?</strong> - Scroll down for our contact options.
          </li>
        </ul>
      </section>

      {/* Section 2: Common Issues */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Common Issues</h2>
        <p className="mb-4">Here are some common issues and how we can help:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Order Not Delivered:</strong> If your order hasn’t arrived, track it or contact our support team.
          </li>
          <li>
            <strong>Wrong Item Received:</strong> If you received the wrong item, please report it immediately for a replacement.
          </li>
          <li>
            <strong>Payment Issues:</strong> For failed or incorrect payments, contact our billing support.
          </li>
        </ul>
      </section>

      {/* Section 3: Return & Refund Policy */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Return & Refund Policy</h2>
        <p>
          We offer a hassle-free return policy. You can return most items within 30 days of delivery. For refunds, the amount will be credited back to your original payment method. Visit our <a href="/return-policy" className="text-blue-500">Return Policy</a> page for more details.
        </p>
      </section>

      {/* Section 4: Account Management */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Account Management</h2>
        <p>
          Need help managing your account? You can update your personal details, change your password, and view your order history in the <a href="/profile" className="text-blue-500">Profile</a> section.
        </p>
      </section>

      {/* Section 5: Contact Us */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any further questions, feel free to get in touch with us:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Email:</strong> <a href="mailto:support@ecommerce.com" className="text-blue-500">support@ecommerce.com</a>
          </li>
          <li>
            <strong>Phone:</strong> +1 (555) 123-4567
          </li>
          <li>
            <strong>Live Chat:</strong> Available 24/7 on our website.
          </li>
          <li>
            <strong>Address:</strong> 123 E-commerce Lane, City, Country.
          </li>
        </ul>
      </section>

      {/* Section 6: Delivery Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
        <p>
          We aim to deliver all orders within the estimated timeframe. For detailed information, visit our <a href="/delivery-info" className="text-blue-500">Delivery Information</a> page.
        </p>
      </section>

      {/* Section 7: Affiliate Program */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Affiliate Program</h2>
        <p>
          Join our affiliate program to earn commissions on referrals. Learn more on our <a href="/affiliate-program" className="text-blue-500">Affiliate Program</a> page.
        </p>
      </section>

      {/* Section 8: Technical Support */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Technical Support</h2>
        <p>
          Having trouble using our website? Contact our technical support team for assistance with account access, checkout issues, or any other technical concerns.
        </p>
      </section>
    </div>
  );
};

export default HelpNSupport;
