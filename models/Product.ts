import mongoose, { Schema, Model } from 'mongoose';

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    collection: string;
    images: string[];
    stock: number;
    isNew: boolean;
    isSale: boolean;
    scent?: string;
    burnTime?: string;
    size?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
        },
        originalPrice: {
            type: Number,
            min: 0,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
        },
        collection: {
            type: String,
            required: [true, 'Collection is required'],
        },
        images: {
            type: [String],
            default: [],
        },
        stock: {
            type: Number,
            required: [true, 'Stock is required'],
            min: 0,
            default: 0,
        },
        isNew: {
            type: Boolean,
            default: false,
        },
        isSale: {
            type: Boolean,
            default: false,
        },
        scent: String,
        burnTime: String,
        size: String,
    },
    {
        timestamps: true,
    }
);

// Index for search and filtering
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1, collection: 1 });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
