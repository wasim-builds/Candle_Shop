import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
    _id: string;
    email: string;
    password: string;
    name: string;
    phone?: string;
    role: 'customer' | 'admin';
    emailVerified: boolean;
    phoneVerified: boolean;
    wishlist: mongoose.Types.ObjectId[];
    lastLogin?: Date;
    isActive: boolean;
    addresses: {
        street: string;
        city: string;
        state: string;
        pincode: string;
        isDefault: boolean;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const AddressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
});

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: ['customer', 'admin'],
            default: 'customer',
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        phoneVerified: {
            type: Boolean,
            default: false,
        },
        wishlist: [{
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }],
        lastLogin: Date,
        isActive: {
            type: Boolean,
            default: true,
        },
        addresses: [AddressSchema],
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
