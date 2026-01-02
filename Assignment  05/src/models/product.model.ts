import mongoose, { Schema } from "mongoose";
import IProduct from "../types/product.types";
const productSchema = new Schema<IProduct>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  tags: { type: [String], required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});
export const Product = mongoose.model<IProduct>("Product", productSchema);
