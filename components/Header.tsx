'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiSearch, FiLogOut, FiSun, FiMoon } from 'react-icons/fi'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useTheme } from '@/contexts/ThemeContext'
import SearchBar from './SearchBar'
import { collections } from '@/data/products'
import CartPreview from './CartPreview'

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()
  const { theme, toggleTheme } = useTheme()

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlistItems.length

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  useEffect(() => {
    // Close user menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isUserMenuOpen && !target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setIsUserMenuOpen(false)
    router.push('/')
  }

  return (
    <header className={`sticky top-0 z-50 bg-white dark:bg-gray-800 ${isScrolled ? 'shadow-md' : ''} transition-shadow`}>
      {/* Top Bar */}
      <div className="bg-primary-600 dark:bg-primary-700 text-white text-center py-2 px-4 text-sm">
        <p>🎄🎁 FREE DELIVERY ABOVE ₹999 | SHIPPING 3 - 5 DAYS 🎁🎄</p>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-gravitas font-bold text-gray-900 dark:text-white">
            Professor's candle-shop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              HOME
            </Link>
            <div className="relative group">
              <button className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1">
                COLLECTIONS
              </button>
              <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-lg py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border dark:border-gray-700 z-50">
                <div className="grid grid-cols-2 gap-2 px-3 max-h-96 overflow-y-auto">
                  {collections.slice(0, 8).map((collection) => (
                    <Link
                      key={collection.id}
                      href={`/collection/${collection.slug}`}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group/item"
                    >
                      {collection.image && (
                        <img
                          src={collection.image}
                          alt={collection.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <span className="text-sm dark:text-gray-200 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 flex-1">
                        {collection.name}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/shop"
                  className="block mt-2 pt-2 px-4 text-center text-sm text-primary-600 dark:text-primary-400 hover:underline border-t dark:border-gray-700"
                >
                  View All Collections →
                </Link>
              </div>
            </div>
            <Link href="/shop" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              SHOP ALL
            </Link>
            <Link href="/sale" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              SALE
            </Link>
            <Link href="/contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              CONTACT
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <FiMoon className="w-5 h-5" />
              ) : (
                <FiSun className="w-5 h-5" />
              )}
            </button>
            <SearchBar />
            <Link
              href="/wishlist"
              className="relative p-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FiHeart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <div className="relative group">
              <Link
                href="/cart"
                className="relative p-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FiShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {/* Cart Preview Dropdown */}
              <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border dark:border-gray-700 z-50">
                <CartPreview />
              </div>
            </div>
            {user ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <FiUser className="w-5 h-5" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50 user-menu-container border dark:border-gray-700">
                    <div className="px-4 py-2 border-b dark:border-gray-700">
                      <p className="text-sm font-semibold dark:text-white">{user.name || user.email}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm dark:text-gray-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm dark:text-gray-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-2 text-red-600 dark:text-red-400"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                title="Login"
              >
                <FiUser className="w-5 h-5" />
              </Link>
            )}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t dark:border-gray-700 bg-white dark:bg-gray-800">
          <nav className="px-4 py-4 space-y-2">
            <Link
              href="/"
              className="block py-2 hover:text-primary-600 dark:hover:text-primary-400 dark:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/shop"
              className="block py-2 hover:text-primary-600 dark:hover:text-primary-400 dark:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              SHOP ALL
            </Link>
            <div className="py-2">
              <p className="font-semibold mb-2 dark:text-gray-200">COLLECTIONS</p>
              <div className="pl-4 space-y-1">
                {collections.slice(0, 8).map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/collection/${collection.slug}`}
                    className="block py-1 text-sm hover:text-primary-600 dark:hover:text-primary-400 dark:text-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {collection.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/sale"
              className="block py-2 hover:text-primary-600 dark:hover:text-primary-400 dark:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              SALE
            </Link>
            <Link
              href="/contact"
              className="block py-2 hover:text-primary-600 dark:hover:text-primary-400 dark:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </Link>
            {user ? (
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left py-2 hover:text-primary-600 dark:hover:text-primary-400 text-red-600 dark:text-red-400"
              >
                LOGOUT
              </button>
            ) : (
              <Link
                href="/login"
                className="block py-2 hover:text-primary-600 dark:hover:text-primary-400 dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                LOGIN
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

