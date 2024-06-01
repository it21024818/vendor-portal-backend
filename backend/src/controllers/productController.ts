import { Request, Response } from 'express';
import Product from '../models/Product';

// Add a new product
export const addProduct = async (req: Request, res: Response) => {
    try {
      const { sku, quantity, name, description, isFavorite } = req.body;
      const files = req.files as Express.Multer.File[]; // Type assertion
      const images = files?.map((file) => file.path);
  
      const newProduct = new Product({ sku, quantity, name, images, description, isFavorite });
      await newProduct.save();
  
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get a single product by ID
export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
    try {
      const { sku, quantity, name, description, isFavorite } = req.body;
      const files = req.files as Express.Multer.File[]; // Type assertion
      const images = files?.map((file) => file.path);
  
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { sku, quantity, name, images, description, isFavorite }, { new: true });
      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };  

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Search products by name
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const products = await Product.find({
      name: { $regex: query as string, $options: 'i' } // Case-insensitive search
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
