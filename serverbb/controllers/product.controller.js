import Product from "../models/product.model.js";
import Purchase from "../models/purchase.model.js";
import Brand from "../models/brand.model.js";
import Category from "../models/category.model.js";
import mongoose from "mongoose";

// 🔹 CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { productName, category, brand, sellPrice, sellQuantity, sellAmount, product_size, description, hotDeal, todaysMarketPrice, bestSeller, featured, topRated, topSelling, newArrival, purchases } = req.body;

    if (!productName || !category || !brand || !sellPrice || !sellQuantity) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    if (!mongoose.Types.ObjectId.isValid(category) || !mongoose.Types.ObjectId.isValid(brand)) {
      return res.status(400).json({ message: "Invalid category or brand ID" });
    }

    const categoryExists = await Category.findById(category);
    const brandExists = await Brand.findById(brand);
    if (!categoryExists || !brandExists) {
      return res.status(400).json({ message: "Category or Brand not found" });
    }

    const purchase = await Purchase.findOne({ productName });
    if (!purchase && !purchases) {
      return res.status(400).json({ message: "Purchase record for this product does not exist" });
    }

    const imagePath = req.file ? req.file.filename : null;
    if (!imagePath) {
      return res.status(400).json({ message: "Image is required" });
    }

    // const newProduct = new Product({
    //   productName,
    //   purchaseId: purchase._id,
    //   purchasePrice: purchase.purchasePrice,
    //   sellPrice,
    //   quantity: purchase.quantity,
    //   brand,
    //   category,
    //   product_size,
    //   description,
    //   hotDeal: hotDeal || false,
    //   todaysMarketPrice: todaysMarketPrice || false,
    //   bestSeller: bestSeller || false,
    //   featured: featured || false,
    //   image: imagePath, 
    // });

    const newProduct = new Product({
      productName,
      sellPrice,
      sellQuantity,
      sellAmount,
      brand,
      category,
      product_size,
      description,
      hotDeal: hotDeal || false,
      todaysMarketPrice: todaysMarketPrice || false,
      bestSeller: bestSeller || false,
      featured: featured || false,
      topSelling: topSelling || false,
      newArrival: newArrival || false,
      topRated: topRated || false,
      image: req.file ? req.file.filename : null,
      purchases: purchases || [],
    });
    
    console.log("New Product Object:", newProduct); // Debugging: Log the new product object
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// 🔹 GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("brand", "name") // Fetch brand name
      .populate("category", "name") // Fetch category name
      .populate({
        path: "purchases.purchaseId", // Populate the purchase details
        select: "purchaseDate supplier purchasePrice quantity", // Select specific fields from Purchase
      });

    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🔹 GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("brand", "name")
      .populate("category", "name")
      .populate({
        path: "purchases.purchaseId", // Populate the purchase details
        select: "purchaseDate supplier purchasePrice quantity", // Select specific fields from Purchase
      });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🔹 UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, purchaseDate, purchasePrice, sellPrice, sellQuantity, sellAmount, existingImage, hotDeal, todaysMarketPrice, bestSeller, newArrival, topRated, featured } = req.body;
    const newImage = req.file ? req.file.filename : null;

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product fields
    product.productName = productName || product.productName;
    product.purchaseDate = purchaseDate || product.purchaseDate;
    product.purchasePrice = purchasePrice || product.purchasePrice;
    product.sellPrice = sellPrice || product.sellPrice;
    product.sellQuantity = sellQuantity || product.sellQuantity;
    product.sellAmount = sellAmount || product.sellAmount;
    product.hotDeal = hotDeal || product.hotDeal;
    product.todaysMarketPrice = todaysMarketPrice || product.todaysMarketPrice;
    product.bestSeller = bestSeller || product.bestSeller;
    product.newArrival = newArrival || product.newArrival;
    product.topRated = topRated || product.topRated;
    product.featured = featured || product.featured;
    product.image = newImage || existingImage || product.image; // Prioritize new image, then existing image from body, then existing image in DB

    // Save the updated product
    await product.save();

    // Return the updated product
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// 🔹 DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🔥 HOT DEALS
export const getHotDeals = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default limit = 10

    const products = await Product.find({ hotDeal: true }).limit(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hot deals", error: error.message });
  }
};

// 📊 TODAY'S MARKET PRICE
export const getTodaysMarketPrice = async (req, res) => {
  try {
    const products = await Product.find({ todaysMarketPrice: true }).limit(10);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔝 TOP SELLING
export const getTopSelling = async (req, res) => {
  try {
    const products = await Product.find({ topSelling: true }).limit(10);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🌟 BEST SELLER
export const getBestSeller = async (req, res) => {
  try {
    const products = await Product.find({ bestSeller: true }).limit(10);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🆕 NEW ARRIVALS
export const getNewArrival = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(10); // Sort by createdAt for new arrivals
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⭐ TOP RATED
export const getTopRated = async (req, res) => {
  try {
    const products = await Product.find().sort({ rating: -1 }).limit(10); // Sort by rating for top-rated
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🚀 FEATURED PRODUCTS
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(10);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to fetch products by category
export const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Fetch products that belong to the specified category
    const products = await Product.find({ category: categoryId });

    // If products are found, send them as a JSON response
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found for this category." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};