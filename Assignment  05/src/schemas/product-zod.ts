import z from "zod";

export const productBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),

  price: z.number().min(0, "Price must be 0 or greater"),

  quantity: z.number().min(1, "Quantity must be at least 1"),

  category: z.string().min(1, "Category is required"),

  tags: z.array(z.string()),

  isActive: z.boolean().optional(),
});

export const productParams = z.object({
  id: z.string(),
});
