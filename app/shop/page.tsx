'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { products, collections } from '@/data/products'
import { Product } from '@/types'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import ProductCard from '@/components/ProductCard'

type SortOption = 'popularity' | 'latest' | 'price-low' | 'price-high'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedCollection, setSelectedCollection] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('popularity')
  const [showFilters, setShowFilters] = useState(false)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))]

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by collection
    if (selectedCollection !== 'all') {
      filtered = filtered.filter((p) =>
        p.collections.some((c) => c.toLowerCase().replace(' ', '-') === selectedCollection)
      )
    }

    // Sort
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'popularity':
      default:
        filtered.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
        break
    }

    return filtered
  }, [selectedCategory, selectedCollection, sortBy])

  const handleAddToCart = (product: Product) => {
    if (product.variants && product.variants.length > 0) {
      // If product has variants, navigate to product page
      return
    }
    addToCart(product)
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-gravitas font-bold mb-8">SHOP ALL PRODUCTS</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`lg:w-56 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md sticky top-24">
            <div className="mb-6">
              <h2 className="font-bold text-lg mb-4 dark:text-white">Sort by</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="popularity">Popularity</option>
                <option value="latest">Newness</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </div>

            <div className="mb-6">
              <h2 className="font-bold text-lg mb-4 dark:text-white">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left p-2 rounded ${selectedCategory === category
                      ? 'bg-primary-100 text-primary-700 font-semibold dark:bg-primary-600 dark:text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'
                      }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-4 dark:text-white">Collections</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCollection('all')}
                  className={`block w-full text-left p-2 rounded ${selectedCollection === 'all'
                    ? 'bg-primary-100 text-primary-700 font-semibold dark:bg-primary-600 dark:text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'
                    }`}
                >
                  All Collections
                </button>
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => setSelectedCollection(collection.slug)}
                    className={`block w-full text-left p-2 rounded ${selectedCollection === collection.slug
                      ? 'bg-primary-100 text-primary-700 font-semibold dark:bg-primary-600 dark:text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'
                      }`}
                  >
                    {collection.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {filteredAndSortedProducts.length} results
            </p>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-gray-200 px-4 py-2 rounded"
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.isSale && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                        SALE
                      </span>
                    )}
                    {product.isNew && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                        NEW
                      </span>
                    )}
                    {product.stockCount !== undefined && product.stockCount < 10 && (
                      <span className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                        Only {product.stockCount} left
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      {product.originalPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 line-through text-sm">
                            ₹{product.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-primary-600 font-bold">
                            ₹{product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : product.variants ? (
                        <div>
                          <span className="text-primary-600 font-bold">
                            ₹{Math.min(...product.variants.map((v) => v.price)).toFixed(2)} – ₹
                            {Math.max(...product.variants.map((v) => v.price)).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-primary-600 font-bold">
                          ₹{product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-2 rounded ${isInWishlist(product.id)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                        } transition-colors`}
                      title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <FiHeart className="w-4 h-4" />
                    </button>
                    {product.variants && product.variants.length > 0 ? (
                      <Link
                        href={`/product/${product.id}`}
                        className="flex-1 bg-primary-600 text-white text-center py-2 rounded hover:bg-primary-700 transition-colors"
                      >
                        Select options
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <FiShoppingCart className="w-4 h-4" />
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

