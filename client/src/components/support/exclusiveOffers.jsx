import React from "react";

const ExclusiveOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Buy One Get One Free",
      description:
        "Purchase any product from the specified category and get another product of equal or lesser value for free.",
      eligibility: "All registered users are eligible.",
      process:
        "Add two products to your cart from the offer category, and the discount will be automatically applied at checkout.",
    },
    {
      id: 2,
      title: "Flat 20% Off on Orders Above ৳10,000",
      description:
        "Get a flat 20% discount when your total order value exceeds ৳10,000.",
      eligibility: "Offer available to all users.",
      process:
        "Ensure your cart value is above ৳10,000, and the discount will be applied at checkout.",
    },
    {
      id: 3,
      title: "Exclusive Membership Rewards",
      description:
        "Members of our loyalty program earn double points on every purchase during this offer period.",
      eligibility: "Applicable for loyalty program members only.",
      process:
        "Join the loyalty program and shop during the offer period to earn double points.",
    },
    {
      id: 4,
      title: "Free Shipping on First Order",
      description: "Enjoy free shipping on your first order with us.",
      eligibility: "New users placing their first order.",
      process:
        "Place your first order, and free shipping will be automatically applied.",
    },
  ];

  return (
    <div className="mt-24 lg:mt-28 max-w-4xl mx-auto p-6">
      <h1 className="text-3xl text-center text-custom-orange font-bold mb-6">Exclusive Offers</h1>
      <p className="mb-6">
        Discover the exciting offers available exclusively on our platform.
        Check out the details below and enjoy amazing discounts and rewards!
      </p>

      <div className="space-y-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> {offer.description}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Eligibility:</strong> {offer.eligibility}
            </p>
            <p className="text-gray-600">
              <strong>Process:</strong> {offer.process}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
