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

    console.log('Response:', newProduct); // Log response to terminal
    res.status(201).json(newProduct);
  } catch (error) {
    console.log('Error:', error); // Log error to terminal
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    console.log('Response:', products); // Log response to terminal
    res.status(200).json(products);
  } catch (error) {
    console.log('Error:', error); // Log error to terminal
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get a single product by ID
export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log('Response: Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Response:', product); // Log response to terminal
    res.status(200).json(product);
  } catch (error) {
    console.log('Error:', error); // Log error to terminal
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { sku, quantity, name, description, isFavorite } = req.body;
    const files = req.files as Express.Multer.File[]; // Type assertion
    const images = files?.map((file) => file.path);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { sku, quantity, name, images, description, isFavorite },
      { new: true }
    );
    if (!updatedProduct) {
      console.log('Response: Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Response:', updatedProduct); // Log response to terminal
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log('Error:', error); // Log error to terminal
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      console.log('Response: Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Response: Product deleted'); // Log response to terminal
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    console.log('Error:', error); // Log error to terminal
    res.status(500).json({ error: (error as Error).message });
  }
};

// Search products by name
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query) {
      console.log('Response: Query is required');
      return res.status(400).json({ message: 'Query is required' });
    }

    const products = await Product.find({
      name: { $regex: query as string, $options: 'i' } // Case-insensitive search
    });

    console.log('Response:', products); // Log response to terminal
    res.status(200).json(products);
  } catch (error) {
    console.log('Error:', error); // Log error to terminal
    res.status(500).json({ error: (error as Error).message });
  }
};
