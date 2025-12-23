import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-warm-cream via-secondary-light to-warm-white overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
                    {/* Text Content */}
                    <div className="text-center lg:text-left animate-fade-in">
                        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Handcrafted Candles for Every Moment
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                            Transform your space with our premium, hand-poured candles.
                            Each piece is crafted with love and the finest ingredients.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="/shop"
                                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2 group"
                            >
                                Shop Collection
                                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/collection/christmas-special"
                                className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
                            >
                                Holiday Specials
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
                            {/* Placeholder - You can replace with actual hero image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                                <div className="text-center text-white p-8">
                                    <svg className="w-32 h-32 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                                    </svg>
                                    <p className="text-lg font-semibold">Hero Image Placeholder</p>
                                    <p className="text-sm opacity-75 mt-2">Replace with beautiful candle photography</p>
                                </div>
                            </div>
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
