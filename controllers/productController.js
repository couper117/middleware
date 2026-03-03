import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';

// 1. GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. CREATE PRODUCT
export const createProduct = async (req, res) => {
    try {
        const { name, price, category, description, stock } = req.body;
        if (!name || !price || !category) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newProduct = new Product({
            name, price, category, description, stock,
            image: req.file ? req.file.filename : ""
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 4. UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    try {
        const updates = req.body;
        if (req.file) updates.image = req.file.filename;

        const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 5. DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.image) {
            const imagePath = path.join(process.cwd(), 'uploads', product.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};