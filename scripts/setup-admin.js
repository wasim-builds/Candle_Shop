const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://bashakhan:DyUbpomQJU5RBo@candle-shopping.eTbdx5b.mongodb.net/candle-shop?retryWrites=true&w=majority&appName=Candle-Shopping';

async function createAdmin() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const User = mongoose.model('User', new mongoose.Schema({
        email: String,
        password: String,
        name: String,
        role: String,
        emailVerified: Boolean,
        isActive: Boolean,
    }, { timestamps: true }));

    // Delete existing admin if any
    await User.deleteOne({ email: 'admin@candle-shop.com' });
    console.log('Cleared existing admin user');

    // Create new admin
    const hashedPassword = await bcrypt.hash('Hasimwasim@2001', 12);
    const admin = await User.create({
        email: 'admin@candle-shop.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
        emailVerified: true,
        isActive: true,
    });

    console.log('✅ Admin created successfully!');
    console.log('Email: admin@candle-shop.com');
    console.log('Password: Hasimwasim@2001');
    console.log('ID:', admin._id);

    await mongoose.disconnect();
}

createAdmin().catch(console.error);
