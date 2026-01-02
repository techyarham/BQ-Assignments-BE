export default interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  isActive: boolean;
  tags: string[];
  createdAt: Date;
}
