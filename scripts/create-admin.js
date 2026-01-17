const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://bashakhan:DyUbpomQJU5RBo@candle-shopping.eTbdx5b.mongodb.net/candle-shop?retryWrites=true&w=majority&appName=Candle-Shopping';

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: String,
    role: { type: String, default: 'customer' },
    emailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createAdminUser() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected successfully!');

        // Admin user details
        const adminEmail = 'admin@candle-shop.com';
        const adminPassword = 'Hasimwasim@2001';
        const adminName = 'Admin User';

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('Email:', existingAdmin.email);
            console.log('Name:', existingAdmin.name);
            console.log('Role:', existingAdmin.role);
            await mongoose.disconnect();
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(adminPassword, 12);

        // Create admin user
        const admin = await User.create({
            email: adminEmail,
            password: hashedPassword,
            name: adminName,
            role: 'admin',
            emailVerified: true,
            isActive: true,
        });

        console.log('\n✅ Admin user created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email:', adminEmail);
        console.log('🔑 Password:', adminPassword);
        console.log('👤 Name:', adminName);
        console.log('🛡️  Role:', admin.role);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        await mongoose.disconnect();
        console.log('\n👋 Disconnected.');
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
}

createAdminUser();
