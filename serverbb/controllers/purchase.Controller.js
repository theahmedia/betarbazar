import Purchase from "../models/purchase.model.js";
import Supplier from "../models/supplier.model.js";
// Create Purchase
export const createPurchase = async (req, res) => {
  try {
    const { purchaseDate, supplier, productName, purchasePrice, quantity } = req.body;

    if (!purchaseDate || !supplier || !productName || !purchasePrice || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

     // Check if the purchase date is the current date
     const currentDate = new Date().toISOString().split('T')[0];
     if (purchaseDate !== currentDate) {
       return res.status(400).json({ message: "Purchases can only be created for the current date" });
     }

    // Check if a purchase already exists for the same product on the same date
    const existingPurchase = await Purchase.findOne({ productName, purchaseDate });
    if (existingPurchase) {
      return res.status(400).json({ message: "This product has already been purchased on this date!" });
    }

    // Create a new purchase entry
    const newPurchase = new Purchase({ purchaseDate, supplier, productName, purchasePrice, quantity });
    const savedPurchase = await newPurchase.save();
    console.log("New Purchase Saved:", savedPurchase);

    res.status(201).json({ message: "Purchase recorded successfully", purchase: savedPurchase });
  } catch (error) {
    console.error("Error creating purchase:", error.stack);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



// Get All Purchases
export const getPurchases = async (req, res) => {
  try {
    // Fetch all purchases and sort by creation date (if necessary)
    const purchases = await Purchase.find().sort({ createdAt: -1 }); // Sorting by creation date (latest first)
    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ message: "Error fetching purchases", error });
  }
};

// Get Single Purchase
export const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) return res.status(404).json({ message: "Purchase not found" });
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: "Error fetching purchase", error });
  }
};

// Update Purchase
export const updatePurchase = async (req, res) => {
  try {
    const { purchaseDate, supplier, productName, purchasePrice, quantity, stockStatus } = req.body;
    const productImage = req.file ? req.file.path : req.body.productImage;

    const updatedPurchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      { purchaseDate, supplier, productName, purchasePrice, quantity, stockStatus, productImage },
      { new: true }
    );

    if (!updatedPurchase) return res.status(404).json({ message: "Purchase not found" });

    res.status(200).json({ message: "Purchase updated successfully", purchase: updatedPurchase });
  } catch (error) {
    res.status(500).json({ message: "Error updating purchase", error });
  }
};

// Delete Purchase
export const deletePurchase = async (req, res) => {
  try {
    const deletedPurchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!deletedPurchase) return res.status(404).json({ message: "Purchase not found" });

    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting purchase", error });
  }
};

// Fetch Suppliers for Autocomplete
export const getSuppliers = async (req, res) => {
  try {
    const { query } = req.query; // Get user input
    const suppliers = await Supplier.find({ name: new RegExp(query, "i") }).limit(10); // Filter suppliers
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suppliers", error });
  }
};
