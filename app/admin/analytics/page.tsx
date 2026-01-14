'use client'

import { useAdmin } from '@/contexts/AdminContext'
import SalesChart from '@/components/admin/SalesChart'
import { formatCurrency, getTopProducts } from '@/lib/adminUtils'
import { FiTrendingUp, FiShoppingBag, FiDollarSign } from 'react-icons/fi'

export default function AnalyticsPage() {
    const { orders, salesData, stats } = useAdmin()

    const topProducts = getTopProducts(orders, 10)

    // Calculate category performance
    const categoryRevenue = new Map<string, number>()
    orders.forEach(order => {
        order.items.forEach(item => {
            const current = categoryRevenue.get(item.product.category) || 0
            categoryRevenue.set(item.product.category, current + (item.price * item.quantity))
        })
    })

    const categoryData = Array.from(categoryRevenue.entries())
        .map(([category, revenue]) => ({ category, revenue }))
        .sort((a, b) => b.revenue - a.revenue)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-600 mt-1">Detailed insights into your store performance</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-500 p-3 rounded-lg">
                            <FiDollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">All time revenue</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-500 p-3 rounded-lg">
                            <FiShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">All time orders</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-500 p-3 rounded-lg">
                            <FiTrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Average Order Value</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatCurrency(stats.totalOrders > 0 ? stats.totalRevenue / stats.totalOrders : 0)}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">Per order average</p>
                </div>
            </div>

            {/* Sales Chart */}
            <SalesChart data={salesData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Products */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h2>
                    <div className="space-y-4">
                        {topProducts.map((item, index) => (
                            <div key={index} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{item.product}</p>
                                        <p className="text-sm text-gray-500">{item.quantity} sold</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">{formatCurrency(item.revenue)}</p>
                                    <p className="text-xs text-gray-500">Revenue</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category Performance */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h2>
                    <div className="space-y-4">
                        {categoryData.map((item, index) => {
                            const percentage = (item.revenue / stats.totalRevenue) * 100
                            return (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-900">{item.category}</span>
                                        <span className="text-sm text-gray-600">{formatCurrency(item.revenue)}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-primary-600 h-2 rounded-full"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% of total revenue</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Order Status Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => {
                        const count = orders.filter(o => o.status === status).length
                        const percentage = stats.totalOrders > 0 ? (count / stats.totalOrders) * 100 : 0
                        return (
                            <div key={status} className="text-center">
                                <div className="text-3xl font-bold text-gray-900">{count}</div>
                                <div className="text-sm text-gray-600 capitalize mt-1">{status}</div>
                                <div className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}%</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
