import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  brand: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  stockCount: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
