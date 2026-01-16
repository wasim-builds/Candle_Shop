import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import OrderTracking from '@/models/OrderTracking';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const { items, shippingAddress, subtotal, shipping, total } = await req.json();

        // Generate Order Number
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const orderNumber = `ORD-${timestamp}-${random}`;

        // Create order
        const order = await Order.create({
            userId: session.user.id,
            orderNumber,
            items,
            shippingAddress,
            subtotal,
            shippingCost: shipping,
            total,
            status: 'pending',
            paymentStatus: 'pending',
            createdAt: new Date(),
        });

        // Create initial tracking entry
        await OrderTracking.create({
            orderId: order._id,
            status: 'pending',
            description: 'Order placed successfully',
            timestamp: new Date(),
        });

        return NextResponse.json({
            success: true,
            order,
        }, { status: 201 });

    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}
