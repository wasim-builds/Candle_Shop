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
    addProduct: (product: Product) => void
    updateProduct: (productId: string, updates: Partial<Product>) => void
    deleteProduct: (productId: string) => void
    refreshStats: () => void
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

    // Load orders from localStorage on mount
    useEffect(() => {
        const savedOrders = localStorage.getItem('admin_orders')
        if (savedOrders) {
            try {
                const parsed = JSON.parse(savedOrders)
                // Convert date strings back to Date objects
                const ordersWithDates = parsed.map((order: any) => ({
                    ...order,
                    createdAt: new Date(order.createdAt),
                    updatedAt: new Date(order.updatedAt),
                }))
                setOrders(ordersWithDates)
            } catch (error) {
                console.error('Error loading orders:', error)
                setOrders(mockOrders)
            }
        } else {
            setOrders(mockOrders)
        }
    }, [])

    // Load products from localStorage
    useEffect(() => {
        const savedProducts = localStorage.getItem('admin_products')
        if (savedProducts) {
            try {
                setProducts(JSON.parse(savedProducts))
            } catch (error) {
                console.error('Error loading products:', error)
            }
        }
    }, [])

    // Save orders to localStorage whenever they change
    useEffect(() => {
        if (orders.length > 0) {
            localStorage.setItem('admin_orders', JSON.stringify(orders))
        }
    }, [orders])

    // Save products to localStorage whenever they change
    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem('admin_products', JSON.stringify(products))
        }
    }, [products])

    // Recalculate stats whenever orders or products change
    useEffect(() => {
        const newStats = calculateAdminStats(orders, products)
        setStats(newStats)
        const newSalesData = getSalesData(orders, 7)
        setSalesData(newSalesData)
    }, [orders, products])

    const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => {
        const newOrder: Order = {
            ...orderData,
            id: Date.now().toString(),
            orderNumber: generateOrderNumber(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        setOrders(prev => [newOrder, ...prev])
    }

    const updateOrderStatus = (orderId: string, status: OrderStatus) => {
        setOrders(prev =>
            prev.map(order =>
                order.id === orderId
                    ? { ...order, status, updatedAt: new Date() }
                    : order
            )
        )
    }

    const deleteOrder = (orderId: string) => {
        setOrders(prev => prev.filter(order => order.id !== orderId))
    }

    const addProduct = (product: Product) => {
        setProducts(prev => [product, ...prev])
    }

    const updateProduct = (productId: string, updates: Partial<Product>) => {
        setProducts(prev =>
            prev.map(product =>
                product.id === productId ? { ...product, ...updates } : product
            )
        )
    }

    const deleteProduct = (productId: string) => {
        setProducts(prev => prev.filter(product => product.id !== productId))
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
