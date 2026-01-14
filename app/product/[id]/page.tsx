'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { products } from '@/data/products'
import { ProductVariant } from '@/types'
import { FiHeart, FiShoppingCart, FiArrowLeft } from 'react-icons/fi'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import Link from 'next/link'
import ProductGallery from '@/components/ProductGallery'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const product = products.find((p) => p.id === params.id)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants?.[0] || null
  )
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/shop" className="text-primary-600 hover:underline">
          Back to shop
        </Link>
      </div>
    )
  }

  const currentPrice = selectedVariant ? selectedVariant.price : product.price
  const displayPrice = product.originalPrice
    ? product.originalPrice
    : selectedVariant
      ? selectedVariant.price
      : product.price

  const handleAddToCart = () => {
    addToCart(product, selectedVariant || undefined, quantity)
    router.push('/cart')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <FiArrowLeft className="w-4 h-4" />
        Back to shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div className="relative">
          <ProductGallery
            images={product.images || [product.image]}
            productName={product.name}
          />
          {product.isSale && (
            <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold z-10">
              SALE
            </span>
          )}
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold z-10">
              NEW
            </span>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-gravitas font-bold mb-4">{product.name}</h1>

          <div className="mb-6">
            {product.originalPrice ? (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary-600">
                  ₹{currentPrice.toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                  -{Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)}%
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-primary-600">
                ₹{currentPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <label className="block font-semibold mb-2">Select Size:</label>
              <div className="flex gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 border-2 rounded ${selectedVariant?.id === variant.id
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-primary-400'
                      } ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!variant.inStock}
                  >
                    {variant.name}
                    <span className="block text-sm mt-1">₹{variant.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Quantity:</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border rounded flex items-center justify-center hover:bg-gray-100"
              >
                −
              </button>
              <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border rounded flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock Info */}
          {product.stockCount !== undefined && (
            <div className="mb-6 text-sm text-gray-600">
              {product.stockCount > 0 ? (
                <p>
                  <span className="font-semibold">Available:</span> {product.stockCount} in stock
                </p>
              ) : (
                <p className="text-red-600 font-semibold">Out of stock</p>
              )}
              {product.soldCount !== undefined && (
                <p>
                  <span className="font-semibold">Sold:</span> {product.soldCount}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || !!(selectedVariant && !selectedVariant.inStock)}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <FiShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-lg border-2 ${isInWishlist(product.id)
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-300 hover:border-primary-400'
                } transition-colors`}
              title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FiHeart className="w-5 h-5" />
            </button>
          </div>

          {/* Collections */}
          {product.collections.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Collections:</span>{' '}
                {product.collections.join(', ')}
              </p>
            </div>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < Math.floor(product.rating!) ? '★' : '☆'}</span>
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.rating})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

