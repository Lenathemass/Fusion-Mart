import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import User from './models/User.js';
import Order from './models/Order.js';
import { products } from './data/products.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    const createdCategory = await Category.create({
      name: 'Electronics',
      description: 'Electronic devices and accessories'
    });

    const categoryId = createdCategory._id;

    const sampleProducts = products.map((product) => {
      return { ...product, category: categoryId };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
