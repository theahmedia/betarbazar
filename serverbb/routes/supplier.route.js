import express from 'express';
import { 
  createSupplier, 
  getSuppliers, 
  getSupplierById, 
  updateSupplier, 
  deleteSupplier 
} from '../controllers/supplier.Controller.js';

const router = express.Router();

// Supplier CRUD Routes
router.post('/', createSupplier);
router.get('/', getSuppliers);

// Validate ObjectId before fetching, updating, or deleting
router.get('/:id', validateObjectId, getSupplierById);
router.put('/:id', validateObjectId, updateSupplier);
router.delete('/:id', validateObjectId, deleteSupplier);

// Middleware to validate MongoDB ObjectId
import mongoose from 'mongoose';
function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid Supplier ID' });
  }
  next();
}

export default router;