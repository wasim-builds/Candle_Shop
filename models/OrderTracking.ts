import mongoose, { Schema, Model } from 'mongoose';

export interface IOrderTracking {
    _id: string;
    orderId: mongoose.Types.ObjectId;
    status: string;
    location?: string;
    description: string;
    timestamp: Date;
    updatedBy?: mongoose.Types.ObjectId;
}

const OrderTrackingSchema = new Schema<IOrderTracking>({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    location: String,
    description: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const OrderTracking: Model<IOrderTracking> =
    mongoose.models.OrderTracking ||
    mongoose.model<IOrderTracking>('OrderTracking', OrderTrackingSchema);

export default OrderTracking;
