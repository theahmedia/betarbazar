import express from 'express';
import { createBrand, getBrands, updateBrand, deleteBrand } from '../controllers/brand.controller.js';

const router = express.Router();

router.post('/brands', createBrand);  // Create Brand
router.get('/brands', getBrands);     // Get all Brands
router.put('/brands/:id', updateBrand);  // Update Brand
router.delete('/brands/:id', deleteBrand);  // Delete Brand

export default router;
