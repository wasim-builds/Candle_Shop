import type { Metadata } from 'next'
import { Gravitas_One } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

const gravitasOne = Gravitas_One({ 
  subsets: ['latin'],
  variable: '--font-gravitas',
  weight: '400',
})

export const metadata: Metadata = {
  title: "Professor's candle-shop - Premium Handmade Candles",
  description: 'Discover our collection of premium handmade candles for every season and occasion.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${gravitasOne.variable} font-gravitas bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

