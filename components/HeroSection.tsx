import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-warm-cream via-secondary-light to-warm-white overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-24">
                    {/* Text Content */}
                    <div className="text-center lg:text-left animate-fade-in px-4 lg:px-0">
                        {/* Seasonal Badge */}
                        <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-red-100 via-pink-100 to-emerald-100 dark:from-red-900/30 dark:via-pink-900/30 dark:to-emerald-900/30 text-gray-800 dark:text-gray-200 rounded-full text-xs sm:text-sm font-semibold">
                            ✨ Seasonal Collections - Limited Edition
                        </div>

                        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6 leading-tight">
                            Celebrate Every Moment
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0">
                            Discover our exclusive seasonal collections for Valentine's, Ramadan, Holi, Easter, Mother's Day, and Eid.
                            Handcrafted candles perfect for every celebration.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                            <Link
                                href="/shop"
                                className="btn-primary text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 inline-flex items-center justify-center gap-2 group bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600"
                            >
                                Shop All Collections
                                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/collection/seasonal"
                                className="btn-secondary text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 inline-flex items-center justify-center bg-gray-900 text-white hover:bg-gray-800"
                            >
                                View Seasonal Collections
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>100% Natural Wax</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Hand-Poured</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Free Shipping ₹999+</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative animate-scale-in">
                        <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="/images/hero-candle.jpeg"
                                alt="Beautiful handcrafted candles"
                                className="w-full h-full object-cover"
                            />
                            {/* Optional overlay for better text contrast if needed */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-slide-up hidden lg:block">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-white">4.9/5</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">500+ Reviews</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-20 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20 -z-10"></div>
        </section>
    )
}
