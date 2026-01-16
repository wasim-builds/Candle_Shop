'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useSession } from 'next-auth/react'
import { FiArrowLeft, FiLock, FiCheck } from 'react-icons/fi'
import Link from 'next/link'
import Script from 'next/script'

export default function CheckoutPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const { cartItems, getTotalPrice, clearCart } = useCart()
    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
    })
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (session?.user) {
            setShippingAddress(prev => ({
                ...prev,
                name: session?.user?.name || '',
                email: session?.user?.email || '',
            }))
        }
    }, [session])

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                <Link href="/shop" className="text-primary-600 hover:underline">
                    Return to Shop
                </Link>
            </div>
        )
    }

    const subtotal = getTotalPrice()
    const shipping = subtotal >= 999 ? 0 : 50
    const total = subtotal + shipping

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value,
        })
    }

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)
        setError('')

        try {
            // 1. Create Order in Database
            const orderRes = await fetch('/api/orders/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        product: item.product.id,
                        quantity: item.quantity,
                        price: item.variant ? item.variant.price : item.product.price,
                        variant: item.variant ? { name: item.variant.name, price: item.variant.price } : undefined
                    })),
                    shippingAddress,
                    subtotal,
                    shipping,
                    total,
                }),
            })

            const orderData = await orderRes.json()
            if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create order')

            // 2. Create Razorpay Order
            const paymentRes = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: orderData.order._id }),
            })

            const paymentData = await paymentRes.json()
            if (!paymentRes.ok) throw new Error(paymentData.error || 'Failed to initiate payment')

            // 3. Open Razorpay Checkout
            const options = {
                key: paymentData.keyId,
                amount: paymentData.amount,
                currency: paymentData.currency,
                name: "Professor's Candle Shop",
                description: `Order #${orderData.order.orderNumber}`,
                order_id: paymentData.orderId,
                handler: async function (response: any) {
                    // 4. Verify Payment
                    try {
                        const verifyRes = await fetch('/api/payment/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        })

                        const verifyData = await verifyRes.json()
                        if (!verifyRes.ok) throw new Error(verifyData.error || 'Payment verification failed')

                        clearCart()
                        router.push(`/order-success?orderId=${orderData.order._id}`)
                    } catch (err: any) {
                        setError(err.message)
                        setIsProcessing(false)
                    }
                },
                prefill: {
                    name: shippingAddress.name,
                    email: shippingAddress.email,
                    contact: shippingAddress.phone,
                },
                theme: {
                    color: '#D97706', // amber-600
                },
            }

            const rzp1 = new (window as any).Razorpay(options)
            rzp1.open()

        } catch (err: any) {
            setError(err.message)
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link href="/cart" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                        <FiArrowLeft className="mr-2" /> Back to Cart
                    </Link>
                    <h1 className="text-3xl font-bold mt-4 text-gray-900">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Shipping Form */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                            <span className="bg-primary-100 text-primary-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                            Shipping Details
                        </h2>

                        <form id="checkout-form" onSubmit={handlePayment} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={shippingAddress.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-3 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={shippingAddress.phone}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-3 border"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={shippingAddress.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-3 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={shippingAddress.address}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-3 border"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={shippingAddress.city}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-3 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        required
                                        value={shippingAddress.state}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-3 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        required
                                        value={shippingAddress.zipCode}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm p-3 border"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-lg shadow-sm h-fit sticky top-24">
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                            <span className="bg-primary-100 text-primary-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                            Order Summary
                        </h2>

                        <div className="divide-y divide-gray-200 mb-6">
                            {cartItems.map((item, idx) => (
                                <div key={idx} className="py-4 flex justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">{item.product.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium text-gray-900">
                                        ₹{((item.variant?.price || item.product.price) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 pt-4 space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 mt-4 pt-4">
                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={isProcessing}
                            className="w-full mt-6 bg-primary-600 text-white py-4 rounded-lg font-bold hover:bg-primary-700 transition-colors flex items-center justify-center disabled:opacity-50"
                        >
                            {isProcessing ? (
                                'Processing...'
                            ) : (
                                <>
                                    <FiLock className="mr-2" /> Pay ₹{total.toFixed(2)}
                                </>
                            )}
                        </button>
                        <p className="mt-4 text-xs text-center text-gray-500 flex items-center justify-center">
                            <FiLock className="mr-1" /> Secure payment powered by Razorpay
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
