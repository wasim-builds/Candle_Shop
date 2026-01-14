import connectDB from '../lib/mongodb';
import Product from '../models/Product';
import { products } from '../data/products';

/**
 * Data Seeding Script
 * Run this script to populate the database with initial product data
 * 
 * Usage: npx tsx scripts/seed.ts
 */

async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');

        // Connect to database
        await connectDB();
        console.log('✅ Connected to MongoDB');

        // Clear existing products (optional - comment out if you want to keep existing data)
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Transform and insert products
        const productsToInsert = products.map(product => ({
            name: product.name,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice,
            category: product.category,
            collections: product.collections,
            images: product.images || [product.image],
            stock: product.stockCount || 50,
            isNew: product.isNew || false,
            isSale: product.isSale || false,
        }));

        const insertedProducts = await Product.insertMany(productsToInsert);
        console.log(`✅ Inserted ${insertedProducts.length} products`);

        console.log('🎉 Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeding function
seedDatabase();
