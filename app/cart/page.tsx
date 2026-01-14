'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useAdmin } from '@/contexts/AdminContext'
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi'
import { useState } from 'react'

export default function CartPage() {
  const router = useRouter()
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const { addOrder } = useAdmin()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    // Check if user is logged in
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/login?redirect=/cart')
      return
    }

    setIsCheckingOut(true)

    // Create order from cart
    const userData = JSON.parse(user)
    const subtotal = getTotalPrice()
    const shipping = subtotal >= 999 ? 0 : 50
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + shipping + tax

    const orderData = {
      customer: {
        name: userData.name || userData.email.split('@')[0],
        email: userData.email,
        phone: '+91 98765 43210',
        address: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
      },
      items: cartItems.map(item => ({
        product: item.product,
        variant: item.variant,
        quantity: item.quantity,
        price: item.variant ? item.variant.price : item.product.price,
      })),
      subtotal,
      shipping,
      tax,
      total,
      status: 'pending' as const,
    }

    addOrder(orderData)
    clearCart()

    // Show success and redirect
    setTimeout(() => {
      alert('Order placed successfully! Check the admin dashboard to view your order.')
      router.push('/')
    }, 500)
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <FiShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Start shopping to add items to your cart.</p>
        <Link
          href="/shop"
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-gravitas font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => {
            const price = item.variant ? item.variant.price : item.product.price
            const itemId = index.toString()

            return (
              <div
                key={itemId}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4"
              >
                <Link href={`/product/${item.product.id}`}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full sm:w-32 h-32 object-cover rounded"
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Link
                        href={`/product/${item.product.id}`}
                        className="text-xl font-semibold hover:text-primary-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      {item.variant && (
                        <p className="text-gray-600 text-sm">Size: {item.variant.name}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(itemId)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 border rounded">
                        <button
                          onClick={() => updateQuantity(itemId, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(itemId, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-600">
                        ₹{(price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">₹{price.toFixed(2)} each</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
          >
            <FiArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {getTotalPrice() >= 999 ? 'FREE' : '₹50.00'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-semibold">₹{(getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    ₹{(getTotalPrice() + (getTotalPrice() >= 999 ? 0 : 50) + (getTotalPrice() * 0.1)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {getTotalPrice() < 999 && (
              <p className="text-sm text-gray-600 mb-4">
                Add ₹{(999 - getTotalPrice()).toFixed(2)} more for free delivery!
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors mb-4 disabled:opacity-50"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            <button
              onClick={clearCart}
              className="w-full text-gray-600 py-2 hover:text-red-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

