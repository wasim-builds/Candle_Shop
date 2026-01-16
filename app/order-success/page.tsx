'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { FiCheckCircle } from 'react-icons/fi'
import { useSearchParams } from 'next/navigation'

function OrderSuccessContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId')

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                    <FiCheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for your purchase. Your order has been placed successfully.
                    </p>

                    {orderId && (
                        <div className="bg-gray-100 p-4 rounded-md mb-6">
                            <p className="text-sm text-gray-500">Order ID:</p>
                            <p className="font-mono font-medium text-gray-900">{orderId}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <Link
                            href="/shop"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderSuccessContent />
        </Suspense>
    )
}
