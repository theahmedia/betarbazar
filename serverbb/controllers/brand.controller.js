import Brand from '../models/brand.model.js';

// Function to check if the brand name already exists
const isDuplicateBrandName = async (name, excludeId = null) => {
  const brand = await Brand.findOne({ name: name.trim().toLowerCase() });
  if (brand && brand._id.toString() !== excludeId) {
    return true;
  }
  return false;
};

// Create Brand
export const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the brand name already exists
    const isDuplicate = await isDuplicateBrandName(name);
    if (isDuplicate) {
      return res.status(400).json({ message: 'Brand name already exists.' });
    }

    const brand = new Brand({
      name: name,
    });

    try {
      const newBrand = await brand.save();
      res.status(201).json(newBrand);  // Send the newly created brand as a response
    } catch (err) {
      res.status(400).json({ message: err.message });  // Handle errors
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating brand', error });
  }
};

// Get all Brands
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching brands', error });
  }
};

// Update Brand
export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Check for duplicate brand name, excluding the current brand
    const isDuplicate = await isDuplicateBrandName(name, id);
    if (isDuplicate) {
      return res.status(400).json({ message: 'Brand name already exists.' });
    }

    const updatedBrand = await Brand.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedBrand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.status(200).json({ message: 'Brand updated successfully', updatedBrand });
  } catch (error) {
    res.status(500).json({ message: 'Error updating brand', error });
  }
};

// Delete Brand
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting brand', error });
  }
};
