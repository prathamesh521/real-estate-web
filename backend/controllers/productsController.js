const asyncHandler = require("express-async-handler");
const Product = require("../models/productsModel");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    res.status(404);
    throw new Error("No products found");
  }

  res.status(200).json({ products });
});

const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({ product });
});

// Get My products
const getMyProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user._id });

  if (!products) {
    res.status(404);
    throw new Error("No products found");
  }

  res.status(200).json({ products });
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const productExists = await Product.findOne({ name });

  if (productExists) {
    res.status(400);
    throw new Error("Product already exists");
  }

  const product = await Product.create({
    name,
    description,
    price,
    user: req.user._id,
  });

  if (!product) {
    res.status(400);
    throw new Error("Product not created");
  }
  res.status(201).json({ product });
});

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
