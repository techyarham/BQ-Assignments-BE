import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/product.types";

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
