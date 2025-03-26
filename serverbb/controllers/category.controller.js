import Category from "../models/category.model.js";
import fs from "fs";
import path from "path";

// ✅ Create Category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file?.path;

    if (!name || !image) return res.status(400).json({ message: "All fields (name and image) are required" });

    // Check if category name already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) return res.status(400).json({ message: "Category name must be unique" });

    const category = new Category({ name, image });
    await category.save();

    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    console.error("Category Creation Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// ✅ Get All Categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Get All Categories Error:", error);
    res.status(500).json({ message: "Unable to fetch categories. Try again later." });
  }
};

// ✅ Get Category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json(category);
  } catch (error) {
    console.error("Get Category by ID Error:", error);
    res.status(500).json({ message: "Unable to fetch category. Try again later." });
  }
};



// ✅ Update Category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const image = req.file?.path;

    let category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Ensure unique category name
    const existingCategory = await Category.findOne({ name });
    if (existingCategory && existingCategory._id.toString() !== id) {
      return res.status(400).json({ message: "Category name must be unique" });
    }

    // Delete old image if updated
    if (image && category.image && category.image !== image) {
      deleteFile(category.image);
    }

    category.name = name || category.name;
    category.image = image || category.image;
    await category.save();

    res.json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Category Update Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// ✅ Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Delete image from storage
    if (category.image) deleteFile(category.image);

    await Category.findByIdAndDelete(id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Category Deletion Error:", error);
    res.status(500).json({ message: "Unable to delete category. Try again later." });
  }
};

// Helper function to delete file safely
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file if it exists
    }
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};



