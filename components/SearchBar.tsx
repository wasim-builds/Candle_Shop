'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiSearch, FiX } from 'react-icons/fi'
import { products } from '@/data/products'
import { Product } from '@/types'

export default function SearchBar() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Product[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    // Search logic
    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([])
            setIsOpen(false)
            return
        }

        const searchQuery = query.toLowerCase()
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery) ||
            product.category.toLowerCase().includes(searchQuery) ||
            product.collections.some(c => c.toLowerCase().includes(searchQuery))
        ).slice(0, 5) // Limit to 5 results

        setResults(filtered)
        setIsOpen(filtered.length > 0)
    }, [query])

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/shop?search=${encodeURIComponent(query)}`)
            setIsOpen(false)
            setIsMobileSearchOpen(false)
        }
    }

    const handleResultClick = () => {
        setQuery('')
        setIsOpen(false)
        setIsMobileSearchOpen(false)
    }

    return (
        <>
            {/* Desktop Search */}
            <div className="hidden md:block relative" ref={searchRef}>
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-64 lg:w-80 px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    {query && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery('')
                                setResults([])
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    )}
                </form>

                {/* Search Results Dropdown */}
                {isOpen && results.length > 0 && (
                    <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                        {results.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                onClick={handleResultClick}
                                className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 dark:text-white truncate">
                                        {product.name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        ₹{product.price.toFixed(2)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                router.push(`/shop?search=${encodeURIComponent(query)}`)
                                setIsOpen(false)
                            }}
                            className="w-full p-3 text-center text-primary hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                        >
                            View all results
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Search Button */}
            <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                aria-label="Search"
            >
                <FiSearch className="w-6 h-6" />
            </button>

            {/* Mobile Search Modal */}
            {isMobileSearchOpen && (
                <div className="fixed inset-0 bg-black/50 z-[100] md:hidden">
                    <div className="bg-white dark:bg-gray-900 h-full">
                        <div className="p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <form onSubmit={handleSearch} className="flex-1">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search products..."
                                            autoFocus
                                            className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </form>
                                <button
                                    onClick={() => {
                                        setIsMobileSearchOpen(false)
                                        setQuery('')
                                    }}
                                    className="p-2 text-gray-600 dark:text-gray-400"
                                >
                                    <FiX className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Mobile Results */}
                            <div className="space-y-2">
                                {results.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.id}`}
                                        onClick={handleResultClick}
                                        className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 dark:text-white truncate">
                                                {product.name}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                ₹{product.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
