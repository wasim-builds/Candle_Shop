const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://bashakhan:DyUbpomQJU5RBo@candle-shopping.eTbdx5b.mongodb.net/candle-shop?retryWrites=true&w=majority&appName=Candle-Shopping';

async function checkAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
        const admin = await User.findOne({ email: 'admin@candle-shop.com' });

        if (admin) {
            console.log('\n✅ Admin user found!');
            console.log('Email:', admin.email);
            console.log('Name:', admin.name);
            console.log('Role:', admin.role);
        } else {
            console.log('\n❌ Admin user not found');
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error.message);
    }
}

checkAdmin();
