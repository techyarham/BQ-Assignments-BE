import { Request, Response } from "express";
import { Product } from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const getProducts = async (_req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
