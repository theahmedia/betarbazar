import Supplier from '../models/supplier.model.js';

// Create Supplier
export const createSupplier = async (req, res) => {
  try {
    const { name, email, phone, address, products } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !address || !products || !products.length) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const supplier = new Supplier({ name, email, phone, address, products });
    await supplier.save();

    res.status(201).json({ success: true, data: supplier });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get All Suppliers
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate("products").lean();
    res.json({ success: true, data: suppliers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Single Supplier
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate("products").lean();
    if (!supplier) return res.status(404).json({ success: false, message: 'Supplier not found' });

    res.json({ success: true, data: supplier });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Supplier
export const updateSupplier = async (req, res) => {
  try {
    const { name, email, phone, address, products } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !address || !products || !products.length) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("products");
    if (!supplier) return res.status(404).json({ success: false, message: 'Supplier not found' });

    res.json({ success: true, data: supplier });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete Supplier
export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).json({ success: false, message: 'Supplier not found' });

    res.json({ success: true, message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
