import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    purchaseId: mongoose.Schema.Types.ObjectId,
    purchaseDate: { type: Date, required: true },
    supplier: { type: String, required: true },
    productName: { type: String, required: true },
    purchasePrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    stockStatus: { type: String, enum: ["In Stock", "Out of Stock"], default: "In Stock" },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String }, // Assuming user email or ID
  },
  { timestamps: true }
);

export default mongoose.model("Purchase", purchaseSchema);