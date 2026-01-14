'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdmin } from '@/contexts/AdminContext'
import { Product } from '@/types'
import { FiArrowLeft, FiSave, FiTrash2 } from 'react-icons/fi'
import Link from 'next/link'

export default function EditProductPage() {
    const router = useRouter()
    const params = useParams()
    const { products, updateProduct, deleteProduct } = useAdmin()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        const foundProduct = products.find(p => p.id === params.id)
        if (foundProduct) {
            setProduct(foundProduct)
        }
    }, [params.id, products])

    if (!product) {
        return (
            <div className="max-w-4xl mx-auto py-12 text-center">
                <p className="text-gray-500">Product not found</p>
                <Link href="/admin/products" className="text-primary-600 hover:underline mt-4 inline-block">
                    Back to Products
                </Link>
            </div>
        )
    }

    const categories = [
        'Beverage & Cafe',
        'Teddy & Character',
        'Floral & Garden',
        'Gourmet Jars & Bowls',
        'Seasonal & Theme',
        'Essentials & Home Fragrance',
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        updateProduct(product.id, product)
        router.push('/admin/products')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked
            setProduct(prev => prev ? { ...prev, [name]: checked } : null)
        } else if (type === 'number') {
            setProduct(prev => prev ? { ...prev, [name]: parseFloat(value) || 0 } : null)
        } else {
            setProduct(prev => prev ? { ...prev, [name]: value } : null)
        }
    }

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
            deleteProduct(product.id)
            router.push('/admin/products')
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/products"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
                        <p className="text-gray-600 mt-1">{product.name}</p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2"
                >
                    <FiTrash2 className="w-4 h-4" />
                    Delete
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={product.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            rows={4}
                            value={product.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                id="category"
                                name="category"
                                required
                                value={product.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                Image URL *
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                required
                                value={product.image}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Pricing</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                Price (₹) *
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                required
                                min="0"
                                step="0.01"
                                value={product.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-2">
                                Original Price (₹) - Optional
                            </label>
                            <input
                                type="number"
                                id="originalPrice"
                                name="originalPrice"
                                min="0"
                                step="0.01"
                                value={product.originalPrice || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Inventory */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Inventory</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="stockCount" className="block text-sm font-medium text-gray-700 mb-2">
                                Stock Count *
                            </label>
                            <input
                                type="number"
                                id="stockCount"
                                name="stockCount"
                                required
                                min="0"
                                value={product.stockCount || 0}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                                Rating (1-5) - Optional
                            </label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                min="1"
                                max="5"
                                step="0.1"
                                value={product.rating || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={product.inStock}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="text-sm font-medium text-gray-700">In Stock</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isNew"
                                checked={product.isNew || false}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="text-sm font-medium text-gray-700">New Product</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isSale"
                                checked={product.isSale || false}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="text-sm font-medium text-gray-700">On Sale</span>
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
                    >
                        <FiSave className="w-5 h-5" />
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                    <Link
                        href="/admin/products"
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}
