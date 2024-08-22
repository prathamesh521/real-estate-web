const asyncHandler = require("express-async-handler");
const Product = require("../models/productsModel");

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    if(!products) {
        res.status(404);
        throw new Error("No products found");
    }

    res.status(200).json({ products });
});

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price } = req.body;

    if(!name || !description || !price) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const productExists = await Product.findOne({ name });

    if(productExists) {
        res.status(400);
        throw new Error("Product already exists");
    }

    const product = await Product.create({
        name,
        description,
        price,
        user: req.user._id
    });

    if(!product) {
        res.status(400);
        throw new Error("Product not created");
    }
    res.status(201).json({ product });
});

const updateProduct = asyncHandler(async (req, res) => {

    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if(!updateProduct) {
        res.status(400);
        throw new Error("Product not updated");
    }

    res.status(200).json({ updateProduct });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    await product.deleteOne();
    res.status(200).json({ 
        id: req.params.id,
        message: "Delete product" });
});

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };