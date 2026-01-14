'use client'

import { ReactNode } from 'react'
import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AdminProvider } from '@/contexts/AdminContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AdminProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </AdminProvider>
    </ThemeProvider>
  )
}
