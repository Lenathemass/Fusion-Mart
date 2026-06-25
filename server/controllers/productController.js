import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .populate('category', 'name')
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, image, stockCount } = req.body;
    
    const product = new Product({
      title,
      description,
      price,
      category,
      image,
      stockCount
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
