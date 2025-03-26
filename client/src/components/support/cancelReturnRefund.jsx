import React from "react";

const CancellationReturnRefund = () => {
  return (
    <div className="mt-24 lg:mt-26 max-w-4xl mx-auto p-6">
      <h1 className="text-3xl text-center text-custom-orange font-bold mb-6">
        Cancellation, Return & Refund Policy
      </h1>
      <p className="mb-6">
        At our e-commerce platform, we strive to ensure your satisfaction with every purchase. Below are the details of our policies and processes for cancellations, returns, and refunds.
      </p>

      <div className="space-y-8">
        {/* Cancellation Policy */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-custom-orange">Cancellation Policy</h2>
          <p className="text-gray-900 mb-4">
            You can cancel your order before it is shipped. Once shipped, cancellation requests cannot be processed.
          </p>
          <ul className="list-disc ml-5 text-gray-700">
            <li>Login to your account and go to the "My Orders" section.</li>
            <li>Select the order you wish to cancel.</li>
            <li>Click on the "Cancel Order" button and confirm the cancellation.</li>
            <li>If your payment has already been made, the refund process will be initiated.</li>
          </ul>
        </section>

        {/* Return Policy */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-custom-orange">Return Policy</h2>
          <p className="text-gray-900 mb-4">
            Products can be returned within 7 days of delivery if they meet the following conditions:
          </p>
          <ul className="list-disc ml-5 text-gray-700">
            <li>The product is in its original condition with all tags and packaging.</li>
            <li>The product is not damaged or used.</li>
            <li>The product is eligible for return (check the product details for return eligibility).</li>
          </ul>
          <p className="text-gray-900">
            To initiate a return:
          </p>
          <ul className="list-disc ml-5 text-gray-700">
            <li>Go to the "My Orders" section in your account.</li>
            <li>Select the product you wish to return and click on "Request Return."</li>
            <li>Provide the required details and submit your request.</li>
          </ul>
        </section>

        {/* Refund Policy */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-custom-orange">Refund Policy</h2>
          <p className="text-gray-900 mb-4">
            Refunds are processed within 7-10 business days after the return is approved or the cancellation request is confirmed.
          </p>
          <ul className="list-disc ml-5 text-gray-700">
            <li>For prepaid orders, the amount will be refunded to your original payment method.</li>
            <li>For COD (Cash on Delivery) orders, refunds will be processed through bank transfer or wallet credit.</li>
            <li>Shipping charges are non-refundable unless the return is due to a mistake on our part.</li>
          </ul>
        </section>

        {/* Support Section */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-custom-orange">Need Help?</h2>
          <p className="text-gray-900 mb-4">
            For any issues related to cancellations, returns, or refunds, please contact our support team:
          </p>
          <ul className="list-disc ml-5 text-gray-700">
            <li>Phone: +8801XXXXXXXXX</li>
            <li>Email: support@yourwebsite.com</li>
            <li>Live Chat: Available on our website</li>
          </ul>
          <p className="text-gray-900">
            Our customer support is available 24/7 to assist you with your queries.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CancellationReturnRefund;
