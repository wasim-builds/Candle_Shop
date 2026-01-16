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

      {/* Seasonal Collections Highlight */}
      <section className="py-16 px-4 bg-gradient-to-br from-pink-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-gravitas font-bold text-gray-900 dark:text-white mb-4">
              ✨ Seasonal Collections
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Limited edition candles for life's most special moments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Valentine's Collection Card */}
            <Link
              href="/collection/valentines-collection"
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-80">
                <img
                  src="/images/valentine/valentine_rose_romance.png"
                  alt="Valentine's Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block mb-2 px-3 py-1 bg-red-500 rounded-full text-sm font-semibold">
                    💝 Valentine's Week
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Love & Romance</h3>
                  <p className="text-gray-200 text-sm mb-3">
                    Express your love with romantic candles
                  </p>
                  <div className="inline-flex items-center gap-2 text-pink-300 group-hover:gap-3 transition-all">
                    Shop Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Ramadan Collection Card */}
            <Link
              href="/collection/ramadan-collection"
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-80">
                <img
                  src="/images/ramadan/ramadan_oud_luxury.png"
                  alt="Ramadan Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block mb-2 px-3 py-1 bg-emerald-600 rounded-full text-sm font-semibold">
                    🌙 Ramadan Kareem
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Spiritual Serenity</h3>
                  <p className="text-gray-200 text-sm mb-3">
                    Traditional fragrances for the holy month
                  </p>
                  <div className="inline-flex items-center gap-2 text-emerald-300 group-hover:gap-3 transition-all">
                    Shop Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Holi Collection Card */}
            <Link
              href="/collection/holi-collection"
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-80">
                <img
                  src="/images/holi/holi_rainbow_celebration_1768573172493.png"
                  alt="Holi Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block mb-2 px-3 py-1 bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 rounded-full text-sm font-semibold">
                    🎨 Festival of Colors
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Holi Celebration</h3>
                  <p className="text-gray-200 text-sm mb-3">
                    Vibrant candles for joyful celebrations
                  </p>
                  <div className="inline-flex items-center gap-2 text-yellow-300 group-hover:gap-3 transition-all">
                    Shop Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Easter Collection Card */}
            <Link
              href="/collection/easter-collection"
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-80">
                <img
                  src="/images/easter/easter_pastel_eggs_1768573261223.png"
                  alt="Easter Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block mb-2 px-3 py-1 bg-gradient-to-r from-pink-300 to-blue-300 rounded-full text-sm font-semibold">
                    🐰 Easter Spring
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Spring Celebration</h3>
                  <p className="text-gray-200 text-sm mb-3">
                    Pastel candles for Easter joy
                  </p>
                  <div className="inline-flex items-center gap-2 text-blue-300 group-hover:gap-3 transition-all">
                    Shop Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Mother's Day Collection Card */}
            <Link
              href="/collection/mothers-day-collection"
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-80">
                <img
                  src="/images/mothers-day/mothers_day_rose_gold_1768573312664.png"
                  alt="Mother's Day Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block mb-2 px-3 py-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full text-sm font-semibold">
                    💐 Mother's Day
                  </div>
                  <h3 className="text-2xl font-bold mb-2">For Mom</h3>
                  <p className="text-gray-200 text-sm mb-3">
                    Elegant gifts to show appreciation
                  </p>
                  <div className="inline-flex items-center gap-2 text-rose-300 group-hover:gap-3 transition-all">
                    Shop Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Eid Collection Card */}
            <Link
              href="/collection/eid-collection"
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-80">
                <img
                  src="/images/eid/eid_mubarak_gold_1768573382480.png"
                  alt="Eid Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block mb-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-emerald-600 rounded-full text-sm font-semibold">
                    ✨ Eid Mubarak
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Eid Celebration</h3>
                  <p className="text-gray-200 text-sm mb-3">
                    Festive candles with Islamic elegance
                  </p>
                  <div className="inline-flex items-center gap-2 text-amber-300 group-hover:gap-3 transition-all">
                    Shop Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-gravitas font-bold text-gray-900 dark:text-white mb-4">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-400">Discover our most popular candles</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-6">
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

