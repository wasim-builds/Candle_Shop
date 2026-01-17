import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User'; // Ensure User model is registered

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        // Basic admin check - ideally should check role
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Check if user is admin (optional but recommended)
        /* 
        const user = await User.findById(session.user.id);
        if (user?.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
        */

        const orders = await Order.find({})
            .sort({ createdAt: -1 })
            .populate('userId', 'name email');

        return NextResponse.json(orders);

    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}
