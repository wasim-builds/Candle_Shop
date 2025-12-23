'use client'

import { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiX, FiZoomIn } from 'react-icons/fi'

interface ProductGalleryProps {
    images: string[]
    productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') prevImage()
        if (e.key === 'ArrowRight') nextImage()
        if (e.key === 'Escape') setIsLightboxOpen(false)
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group">
                <img
                    src={images[selectedImage]}
                    alt={`${productName} - Image ${selectedImage + 1}`}
                    className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                    onClick={() => setIsLightboxOpen(true)}
                />

                {/* Zoom Indicator */}
                <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiZoomIn className="w-5 h-5" />
                </div>

                {/* Navigation Arrows (only show if multiple images) */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-700"
                            aria-label="Previous image"
                        >
                            <FiChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-700"
                            aria-label="Next image"
                        >
                            <FiChevronRight className="w-6 h-6 text-gray-900 dark:text-white" />
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {selectedImage + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`${productName} thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={() => setIsLightboxOpen(false)}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                        aria-label="Close lightbox"
                    >
                        <FiX className="w-6 h-6 text-white" />
                    </button>

                    {/* Image */}
                    <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <img
                            src={images[selectedImage]}
                            alt={`${productName} - Image ${selectedImage + 1}`}
                            className="max-w-full max-h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Navigation in Lightbox */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        prevImage()
                                    }}
                                    className="absolute left-4 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                                    aria-label="Previous image"
                                >
                                    <FiChevronLeft className="w-8 h-8 text-white" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        nextImage()
                                    }}
                                    className="absolute right-4 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                                    aria-label="Next image"
                                >
                                    <FiChevronRight className="w-8 h-8 text-white" />
                                </button>

                                {/* Counter in Lightbox */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 text-white px-4 py-2 rounded-full">
                                    {selectedImage + 1} / {images.length}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
