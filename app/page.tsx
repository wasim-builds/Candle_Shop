import Link from 'next/link'
import { products, collections } from '@/data/products'
import HeroSection from '@/components/HeroSection'
import Newsletter from '@/components/Newsletter'

export default function Home() {
  const featuredProducts = products.slice(0, 8)

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-gravitas font-bold text-gray-900 dark:text-white mb-4">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-400">Discover our most popular candles</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
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
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
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
                      ) : (
                        <span className="text-primary-600 font-bold">
                          ₹{product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-gravitas font-bold text-gray-900 dark:text-white mb-4">Shop by Collection</h2>
            <p className="text-gray-600 dark:text-gray-400">Find the perfect candle for every season</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collections.slice(0, 8).map((collection) => (
              <Link
                key={collection.id}
                href={`/collection/${collection.slug}`}
                className="group bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                {collection.image && (
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                      <h3 className="font-semibold text-lg text-white p-4 w-full">{collection.name}</h3>
                    </div>
                  </div>
                )}
                {!collection.image && (
                  <div className="p-6 text-center">
                    <h3 className="font-semibold text-lg dark:text-white">{collection.name}</h3>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}

