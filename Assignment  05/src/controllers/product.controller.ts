import { Product } from "../models/product.model";
import { Request, Response } from "express";
import { productBodySchema } from "../schemas/product-zod";


export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ isActive: true });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Invalid ID" });
  }
};


export const createProduct = async (req: Request, res: Response) => {
  try {
    const parsed = productBodySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.issues[0].message,
      });
    }

    const product = await Product.create(parsed.data);

    res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
