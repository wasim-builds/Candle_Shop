import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

// Load env vars
config({ path: resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

async function testConnection() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI!);
        console.log('✅ Connected successfully!');

        // Check collections
        const db = mongoose.connection.db;
        if (!db) {
            console.error('❌ Database connection not established');
            return;
        }

        const collections = await db.listCollections().toArray();
        console.log('\n📂 Collections found:', collections.map(c => c.name).join(', ') || 'None');

        // Basic counts (if collections exist)
        if (collections.find(c => c.name === 'users')) {
            const userCount = await db.collection('users').countDocuments();
            console.log(`👤 Users: ${userCount}`);
        }

        if (collections.find(c => c.name === 'orders')) {
            const orderCount = await db.collection('orders').countDocuments();
            console.log(`📦 Orders: ${orderCount}`);
        }

        await mongoose.disconnect();
        console.log('\n👋 Disconnected.');
    } catch (error) {
        console.error('❌ Connection failed:', error);
    }
}

testConnection();
