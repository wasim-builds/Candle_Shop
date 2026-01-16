import Link from 'next/link'
import { Product } from '@/types'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'

interface ProductCardProps {
    product: Product
    onAddToCart?: (product: Product) => void
    onToggleWishlist?: (product: Product) => void
    isInWishlist?: boolean
}

export default function ProductCard({
    product,
    onAddToCart,
    onToggleWishlist,
    isInWishlist
}: ProductCardProps) {
    const hasDiscount = product.originalPrice && product.originalPrice > product.price
    const discountPercent = hasDiscount
        ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
        : 0

    return (
        <div className="group relative bg-warm-cream rounded-lg overflow-hidden transition-all duration-300 hover:shadow-soft">
            {/* Sale Badge */}
            {hasDiscount && (
                <div className="absolute top-3 left-3 z-10 bg-primary text-white px-3 py-1 text-sm font-medium rounded">
                    {discountPercent}% Off
                </div>
            )}

            {/* New Badge */}
            {product.isNew && !hasDiscount && (
                <div className="absolute top-3 left-3 z-10 bg-green-600 text-white px-3 py-1 text-sm font-medium rounded">
                    NEW
                </div>
            )}

            {/* Wishlist Button */}
            {onToggleWishlist && (
                <button
                    onClick={() => onToggleWishlist(product)}
                    className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                    aria-label="Add to wishlist"
                >
                    <FiHeart
                        className={`w-5 h-5 ${isInWishlist ? 'fill-primary stroke-primary' : 'stroke-gray-700'}`}
                    />
                </button>
            )}

            {/* Product Image */}
            <Link href={`/product/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Low Stock Badge */}
                    {product.stockCount !== undefined && product.stockCount < 10 && product.stockCount > 0 && (
                        <div className="absolute bottom-3 left-3 bg-yellow-500 text-white px-2 py-1 text-xs font-medium rounded">
                            Only {product.stockCount} left
                        </div>
                    )}

                    {/* Out of Stock Overlay */}
                    {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">Out of Stock</span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
                <Link href={`/product/${product.id}`}>
                    <h3 className="font-display text-sm sm:text-base md:text-lg text-gray-900 mb-2 hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                    {hasDiscount ? (
                        <>
                            <span className="text-gray-400 line-through text-sm">
                                ₹{product.originalPrice?.toFixed(2)}
                            </span>
                            <span className="text-primary font-bold text-xl">
                                ₹{product.price.toFixed(2)}
                            </span>
                        </>
                    ) : product.variants && product.variants.length > 0 ? (
                        <span className="text-gray-900 font-semibold text-lg">
                            ₹{Math.min(...product.variants.map(v => v.price)).toFixed(2)} – ₹
                            {Math.max(...product.variants.map(v => v.price)).toFixed(2)}
                        </span>
                    ) : (
                        <span className="text-gray-900 font-semibold text-lg sm:text-xl">
                            ₹{product.price.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Add to Cart Button */}
                {product.inStock && (
                    product.variants && product.variants.length > 0 ? (
                        <Link
                            href={`/product/${product.id}`}
                            className="w-full btn-secondary text-center block py-1.5 sm:py-2 text-xs sm:text-sm"
                        >
                            Select Options
                        </Link>
                    ) : onAddToCart ? (
                        <button
                            onClick={() => onAddToCart(product)}
                            className="w-full btn-primary py-1.5 sm:py-2 text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2"
                        >
                            <FiShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </button>
                    ) : null
                )}
            </div>
        </div>
    )
}
