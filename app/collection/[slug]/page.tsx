'use client'

import { useParams } from 'next/navigation'
import { products, collections } from '@/data/products'
import Link from 'next/link'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'

export default function CollectionPage() {
  const params = useParams()
  const slug = params.slug as string
  const collection = collections.find((c) => c.slug === slug)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const collectionProducts = products.filter((p) =>
    p.collections.some((c) => c.toLowerCase().replace(' ', '-') === slug)
  )

  if (!collection) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Collection not found</h1>
        <Link href="/shop" className="text-primary-600 hover:underline">
          Back to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Collection Banner */}
      {collection.image && (
        <div className="relative h-64 md:h-96 w-full overflow-hidden">
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
            <div className="max-w-7xl mx-auto px-4 pb-8 w-full">
              <h1 className="text-4xl md:text-5xl font-gravitas font-bold text-white mb-2">
                {collection.name}
              </h1>
              <p className="text-white/90 text-lg">
                {collection.description || `Discover our ${collection.name} collection`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!collection.image && (
          <>
            <h1 className="text-4xl font-gravitas font-bold mb-4">{collection.name}</h1>
            <p className="text-gray-600 mb-8">
              {collection.description || `Discover our ${collection.name} collection`}
            </p>
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collectionProducts.map((product) => (
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
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between mb-3">
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
                      onClick={() => addToCart(product)}
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
  )
}

