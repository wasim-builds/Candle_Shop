'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdmin } from '@/contexts/AdminContext'
import { Order, OrderStatus } from '@/types'
import { formatCurrency, getStatusColor } from '@/lib/adminUtils'
import { FiArrowLeft, FiPrinter } from 'react-icons/fi'
import Link from 'next/link'

export default function OrderDetailPage() {
    const router = useRouter()
    const params = useParams()
    const { orders, updateOrderStatus } = useAdmin()
    const [order, setOrder] = useState<Order | null>(null)

    useEffect(() => {
        const foundOrder = orders.find(o => o.id === params.id)
        if (foundOrder) {
            setOrder(foundOrder)
        }
    }, [params.id, orders])

    if (!order) {
        return (
            <div className="max-w-6xl mx-auto py-12 text-center">
                <p className="text-gray-500">Order not found</p>
                <Link href="/admin/orders" className="text-primary-600 hover:underline mt-4 inline-block">
                    Back to Orders
                </Link>
            </div>
        )
    }

    const statuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

    const handleStatusChange = (newStatus: OrderStatus) => {
        updateOrderStatus(order.id, newStatus)
        setOrder(prev => prev ? { ...prev, status: newStatus, updatedAt: new Date() } : null)
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/orders"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
                        <p className="text-gray-600 mt-1">{order.orderNumber}</p>
                    </div>
                </div>
                <button
                    onClick={handlePrint}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center gap-2 print:hidden"
                >
                    <FiPrinter className="w-4 h-4" />
                    Print Invoice
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
                        <div className="space-y-4">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-16 h-16 rounded object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {item.variant && `Variant: ${item.variant.name}`}
                                        </p>
                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">
                                            {formatCurrency(item.price * item.quantity)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {formatCurrency(item.price)} each
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="mt-6 pt-6 border-t space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-gray-900">{formatCurrency(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-gray-900">{formatCurrency(order.shipping)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax</span>
                                <span className="text-gray-900">{formatCurrency(order.tax)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                                <span className="text-gray-900">Total</span>
                                <span className="text-primary-600">{formatCurrency(order.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Name</p>
                                <p className="font-medium text-gray-900">{order.customer.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Email</p>
                                <p className="font-medium text-gray-900">{order.customer.email}</p>
                            </div>
                            {order.customer.phone && (
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                                    <p className="font-medium text-gray-900">{order.customer.phone}</p>
                                </div>
                            )}
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-600 mb-1">Shipping Address</p>
                                <p className="font-medium text-gray-900">
                                    {order.customer.address}<br />
                                    {order.customer.city}, {order.customer.state} {order.customer.zipCode}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-yellow-800 mb-1">Order Notes</h3>
                            <p className="text-sm text-yellow-700">{order.notes}</p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Order Status */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h2>
                        <div className="space-y-3">
                            {statuses.map(status => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusChange(status)}
                                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${order.status === status
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Created</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Last Updated</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.updatedAt).toLocaleString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Current Status</p>
                                <span className={`inline-block mt-1 px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
