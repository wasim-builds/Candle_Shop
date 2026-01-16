'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AdminProvider } from '@/contexts/AdminContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <AdminProvider>
          <CartProvider>
            <WishlistProvider>
              <Toaster position="top-center" reverseOrder={false} />
              {children}
            </WishlistProvider>
          </CartProvider>
        </AdminProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
