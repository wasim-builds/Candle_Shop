'use client'

import { useAdmin } from '@/contexts/AdminContext'
import StatsCard from '@/components/admin/StatsCard'
import OrdersTable from '@/components/admin/OrdersTable'
import SalesChart from '@/components/admin/SalesChart'
import { FiDollarSign, FiShoppingBag, FiPackage, FiUsers, FiAlertCircle } from 'react-icons/fi'
import { formatCurrency } from '@/lib/adminUtils'
import Link from 'next/link'

export default function AdminDashboard() {
    const { stats, orders, salesData, products } = useAdmin()

    // Get recent orders (last 5)
    const recentOrders = orders.slice(0, 5)

    // Get low stock products
    const lowStockProducts = products.filter(p => p.stockCount && p.stockCount < 10)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Revenue"
                    value={formatCurrency(stats.totalRevenue)}
                    icon={FiDollarSign}
                    trend={stats.revenueChange}
                    trendLabel="vs last 7 days"
                    color="green"
                />
                <StatsCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon={FiShoppingBag}
                    trend={stats.ordersChange}
                    trendLabel="vs last 7 days"
                    color="blue"
                />
                <StatsCard
                    title="Total Products"
                    value={stats.totalProducts}
                    icon={FiPackage}
                    color="purple"
                />
                <StatsCard
                    title="Total Customers"
                    value={stats.totalCustomers}
                    icon={FiUsers}
                    color="yellow"
                />
            </div>

            {/* Alerts */}
            {(stats.pendingOrders > 0 || stats.lowStockProducts > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stats.pendingOrders > 0 && (
                        <Link href="/admin/orders?status=pending">
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 hover:bg-yellow-100 transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <FiAlertCircle className="text-yellow-400 w-5 h-5 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-yellow-800">
                                            {stats.pendingOrders} Pending Order{stats.pendingOrders !== 1 ? 's' : ''}
                                        </p>
                                        <p className="text-sm text-yellow-700">
                                            Click to view and process
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}

                    {stats.lowStockProducts > 0 && (
                        <Link href="/admin/products?stock=low">
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 hover:bg-red-100 transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <FiAlertCircle className="text-red-400 w-5 h-5 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-red-800">
                                            {stats.lowStockProducts} Low Stock Product{stats.lowStockProducts !== 1 ? 's' : ''}
                                        </p>
                                        <p className="text-sm text-red-700">
                                            Click to view and restock
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            )}

            {/* Sales Chart */}
            <SalesChart data={salesData} />

            {/* Recent Orders */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                    <Link
                        href="/admin/orders"
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                        View All →
                    </Link>
                </div>
                <OrdersTable orders={recentOrders} />
            </div>

            {/* Low Stock Alert */}
            {lowStockProducts.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Low Stock Products</h2>
                        <Link
                            href="/admin/products"
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                            View All →
                        </Link>
                    </div>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Stock
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {lowStockProducts.slice(0, 5).map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-10 h-10 rounded object-cover"
                                                    />
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {product.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                    {product.stockCount} left
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {formatCurrency(product.price)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
