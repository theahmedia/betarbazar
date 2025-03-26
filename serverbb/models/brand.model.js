import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: {
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    required: true,
    unique: true,  // Ensure brand name is unique
  },
});

const Brand = mongoose.model('Brand', brandSchema);
export default Brand;
