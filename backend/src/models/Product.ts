import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  sku: string;
  quantity: number;
  name: string;
  images: string[];
  description: string;
  featuredImage: string;
}

const productSchema = new Schema<IProduct>({
  sku: { type: String, required: true },
  quantity: { type: Number, required: true },
  name: { type: String, required: true },
  images: { type: [String], required: true },
  description: { type: String, required: true },
  featuredImage: { type: String, required: false },
});

export default model<IProduct>('Product', productSchema);
