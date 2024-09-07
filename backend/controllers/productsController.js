const asyncHandler = require("express-async-handler");
const Product = require("../models/productsModel");

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    res.status(404);
    throw new Error("No products found");
  }

  res.status(200).json({ products });
});

// Get a product by slug
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({ product });
});

// Get products created by the logged-in user
const getMyProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user._id });

  if (!products) {
    res.status(404);
    throw new Error("No products found");
  }

  res.status(200).json({ products });
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category } = req.body;

  // Check if all required fields are provided
  if (!name || !description || !price || !category) {
    res.status(400);
    throw new Error('All fields are required');
  }

  // Check if the product already exists
  const productExists = await Product.findOne({ name });

  if (productExists) {
    res.status(400);
    throw new Error('Product already exists');
  }

  // Create a new product
  const product = await Product.create({
    name,
    description,
    price,
    category,
    images: req.files.map((file) => file.path), // Use 'images' to store file paths
    user: req.user._id,
  });

  if (!product) {
    res.status(400);
    throw new Error('Product not created');
  }

  res.status(201).json({ product });
});

// Update an existing product by slug
const updateProduct = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  // Find the product by slug and update it
  const updatedProduct = await Product.findOneAndUpdate({ slug }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    res.status(400);
    throw new Error("Product not updated");
  }

  res.status(200).json({ updatedProduct });
});

// Delete a product by slug
const deleteProduct = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  // Find the product by slug
  const product = await Product.findOne({ slug });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Delete the product
  await product.deleteOne();
  
  res.status(200).json({
    slug: req.params.slug,
    message: "Product deleted successfully",
  });
});

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  getMyProducts,
};
