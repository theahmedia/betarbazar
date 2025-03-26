import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, unique: true }, // Ensure productName is required & unique
    purchases: [{ 
      purchaseId: { type: mongoose.Schema.Types.ObjectId, ref: "Purchase" },
      purchasePrice: { type: Number, required: true },
      quantity: { type: Number, required: true },
      purchaseDate: { type: Date }
    }],
    sellPrice: { type: Number, required: true },
    sellQuantity: { type: Number, required: true },
    sellAmount: { type: Number, required: true },
    product_size: { type: String },
    description: { type: String },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String },
    // 🔥 New Fields for Product Sections
    hotDeal: { type: Boolean, default: false }, 
    todaysMarketPrice: { type: Boolean, default: false }, 
    topSelling: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: Date.now }, // Set default to current date if not provided
    topRated: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  }, 
  { timestamps: true } // Automatically add createdAt & updatedAt fields
);

export default mongoose.model("Product", productSchema);
