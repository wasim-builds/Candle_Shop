'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, Product, ProductVariant } from '@/types'
import toast from 'react-hot-toast'

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      setCartItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: Product, variant?: ProductVariant, quantity = 1) => {
    setCartItems((prev) => {
      const itemId = variant ? `${product.id}-${variant.id}` : product.id
      const existingItem = prev.find((item) => {
        const currentItemId = item.variant ? `${item.product.id}-${item.variant.id}` : item.product.id
        return currentItemId === itemId
      })

      if (existingItem) {
        return prev.map((item) => {
          const currentItemId = item.variant ? `${item.product.id}-${item.variant.id}` : item.product.id
          if (currentItemId === itemId) {
            return { ...item, quantity: item.quantity + quantity }
          }
          return item
        })
      }

      return [...prev, { product, variant, quantity }]
    })
    toast.success('Added to cart')
  }

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((_, index) => index.toString() !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCartItems((prev) =>
      prev.map((item, index) =>
        index.toString() === itemId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.variant ? item.variant.price : item.product.price
      return total + price * item.quantity
    }, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

