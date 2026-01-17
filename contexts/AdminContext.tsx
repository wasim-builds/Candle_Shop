'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Order, Product, AdminStats, SalesData, OrderStatus } from '@/types'
import { mockOrders } from '@/data/mockOrders'
import { products as initialProducts } from '@/data/products'
import { calculateAdminStats, getSalesData, generateOrderNumber } from '@/lib/adminUtils'

interface AdminContextType {
    orders: Order[]
    products: Product[]
    stats: AdminStats
    salesData: SalesData[]
    addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => void
    updateOrderStatus: (orderId: string, status: OrderStatus) => void
    deleteOrder: (orderId: string) => void
    addProduct: (product: Product) => Promise<void>
    updateProduct: (productId: string, updates: Partial<Product>) => Promise<void>
    deleteProduct: (productId: string) => Promise<void>
    refreshStats: () => void
    fetchOrders: () => Promise<void>
    fetchProducts: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([])
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [stats, setStats] = useState<AdminStats>({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalCustomers: 0,
        revenueChange: 0,
        ordersChange: 0,
        lowStockProducts: 0,
        pendingOrders: 0,
    })
    const [salesData, setSalesData] = useState<SalesData[]>([])

    // Load orders and products from API on mount
    useEffect(() => {
        fetchOrders()
        fetchProducts()
    }, [])

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders')
            if (res.ok) {
                const data = await res.json()
                // Convert date strings back to Date objects
                const ordersWithDates = data.map((order: any) => ({
                    ...order,
                    id: order._id, // Ensure ID mapping if needed (MongoDB uses _id)
                    createdAt: new Date(order.createdAt),
                    updatedAt: new Date(order.updatedAt),
                }))
                setOrders(ordersWithDates)
            }
        } catch (error) {
            console.error('Error fetching orders:', error)
        }
    }

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products')
            if (res.ok) {
                const data = await res.json()
                const productsWithDates = data.map((product: any) => ({
                    ...product,
                    id: product._id,
                    createdAt: new Date(product.createdAt),
                    updatedAt: new Date(product.updatedAt),
                }))
                setProducts(productsWithDates)
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    // Recalculate stats whenever orders or products change
    useEffect(() => {
        const newStats = calculateAdminStats(orders, products)
        setStats(newStats)
        const newSalesData = getSalesData(orders, 7)
        setSalesData(newSalesData)
    }, [orders, products])

    const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => {
        // This might need to be an API call too if we want manual order creation
        // For now, we can leave it as is or update it to use API if required.
        // Assuming orders mainly come from checkout.
        console.warn('Manual order creation not fully implemented with API yet')
    }

    const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
        try {
            const res = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            })

            if (res.ok) {
                const updatedOrder = await res.json()
                setOrders(prev =>
                    prev.map(order =>
                        order.id === orderId
                            ? {
                                ...order,
                                status,
                                updatedAt: new Date()
                            }
                            : order
                    )
                )
            }
        } catch (error) {
            console.error('Error updating order status:', error)
        }
    }

    const deleteOrder = (orderId: string) => {
        setOrders(prev => prev.filter(order => order.id !== orderId))
    }

    const addProduct = async (product: Product) => {
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            })

            if (res.ok) {
                const newProduct = await res.json()
                setProducts(prev => [{
                    ...newProduct,
                    id: newProduct._id,
                    createdAt: new Date(newProduct.createdAt),
                    updatedAt: new Date(newProduct.updatedAt),
                }, ...prev])
            }
        } catch (error) {
            console.error('Error adding product:', error)
        }
    }

    const updateProduct = async (productId: string, updates: Partial<Product>) => {
        try {
            const res = await fetch(`/api/products/${productId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            })

            if (res.ok) {
                const updatedProduct = await res.json()
                setProducts(prev =>
                    prev.map(product =>
                        product.id === productId
                            ? {
                                ...updatedProduct,
                                id: updatedProduct._id,
                                createdAt: new Date(updatedProduct.createdAt),
                                updatedAt: new Date(updatedProduct.updatedAt),
                            }
                            : product
                    )
                )
            }
        } catch (error) {
            console.error('Error updating product:', error)
        }
    }

    const deleteProduct = async (productId: string) => {
        try {
            const res = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                setProducts(prev => prev.filter(product => product.id !== productId))
            }
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    const refreshStats = () => {
        const newStats = calculateAdminStats(orders, products)
        setStats(newStats)
        const newSalesData = getSalesData(orders, 7)
        setSalesData(newSalesData)
    }

    return (
        <AdminContext.Provider
            value={{
                orders,
                products,
                stats,
                salesData,
                addOrder,
                updateOrderStatus,
                deleteOrder,
                addProduct,
                updateProduct,
                deleteProduct,
                refreshStats,
                fetchOrders,
                fetchProducts,
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}

export function useAdmin() {
    const context = useContext(AdminContext)
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider')
    }
    return context
}
