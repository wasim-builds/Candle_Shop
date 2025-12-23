'use client'

import Link from 'next/link'
import { FiX, FiShoppingCart, FiArrowRight } from 'react-icons/fi'
import { useCart } from '@/contexts/CartContext'

export default function CartPreview() {
    const { cartItems, removeFromCart } = useCart()

    const subtotal = cartItems.reduce((sum, item) => {
        const price = item.variant ? item.variant.price : item.product.price
        return sum + (price * item.quantity)
    }, 0)

    const freeShippingThreshold = 999
    const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100)
    const amountToFreeShipping = Math.max(freeShippingThreshold - subtotal, 0)

    if (cartItems.length === 0) {
        return (
            <div className="w-80 p-6 text-center">
                <FiShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty</p>
                <Link
                    href="/shop"
                    className="btn-primary inline-block"
                >
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="w-96 max-h-[500px] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b dark:border-gray-700">
                <h3 className="font-semibold text-lg dark:text-white">
                    Shopping Cart ({cartItems.length})
                </h3>
            </div>

            {/* Free Shipping Progress */}
            {subtotal < freeShippingThreshold && (
                <div className="p-4 bg-primary-50 dark:bg-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        Add ₹{amountToFreeShipping.toFixed(2)} more for FREE shipping! 🚚
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progressToFreeShipping}%` }}
                        />
                    </div>
                </div>
            )}

            {subtotal >= freeShippingThreshold && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20">
                    <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                        ✓ You qualify for FREE shipping!
                    </p>
                </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cartItems.map((item, index) => (
                    <div
                        key={`${item.product.id}-${item.variant?.id || 'default'}-${index}`}
                        className="flex gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm dark:text-white truncate">
                                {item.product.name}
                            </h4>
                            {item.variant && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {item.variant.name}
                                </p>
                            )}
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-sm font-semibold text-primary">
                                    ₹{((item.variant?.price || item.product.price) * item.quantity).toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Qty: {item.quantity}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => removeFromCart(index.toString())}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                            aria-label="Remove item"
                        >
                            <FiX className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t dark:border-gray-700 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="font-semibold dark:text-white">Subtotal:</span>
                    <span className="font-bold text-xl text-primary">₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Link
                        href="/cart"
                        className="btn-secondary text-center py-2 text-sm"
                    >
                        View Cart
                    </Link>
                    <Link
                        href="/cart"
                        className="btn-primary text-center py-2 text-sm flex items-center justify-center gap-1"
                    >
                        Checkout
                        <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
