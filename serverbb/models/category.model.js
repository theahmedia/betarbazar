import mongoose from "mongoose";

// Define Category Schema
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;

