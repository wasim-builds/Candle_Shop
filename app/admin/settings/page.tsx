'use client'

import { useState } from 'react'
import { FiSave } from 'react-icons/fi'

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        storeName: 'Candle Shop',
        storeEmail: 'admin@candleshop.com',
        storePhone: '+91 98765 43210',
        currency: 'INR',
        taxRate: 10,
        shippingFee: 50,
        freeShippingThreshold: 999,
        lowStockThreshold: 10,
        emailNotifications: true,
        orderNotifications: true,
        lowStockNotifications: true,
    })

    const [isSaving, setIsSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked
            setSettings(prev => ({ ...prev, [name]: checked }))
        } else if (type === 'number') {
            setSettings(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
        } else {
            setSettings(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        // Save to localStorage
        localStorage.setItem('admin_settings', JSON.stringify(settings))

        setTimeout(() => {
            setIsSaving(false)
            setSaveMessage('Settings saved successfully!')
            setTimeout(() => setSaveMessage(''), 3000)
        }, 500)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Manage your store settings and preferences</p>
            </div>

            {/* Save Message */}
            {saveMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    {saveMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Store Information */}
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Store Information</h2>

                    <div>
                        <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-2">
                            Store Name
                        </label>
                        <input
                            type="text"
                            id="storeName"
                            name="storeName"
                            value={settings.storeName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="storeEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                Store Email
                            </label>
                            <input
                                type="email"
                                id="storeEmail"
                                name="storeEmail"
                                value={settings.storeEmail}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label htmlFor="storePhone" className="block text-sm font-medium text-gray-700 mb-2">
                                Store Phone
                            </label>
                            <input
                                type="tel"
                                id="storePhone"
                                name="storePhone"
                                value={settings.storePhone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Pricing & Shipping */}
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Pricing & Shipping</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                                Currency
                            </label>
                            <select
                                id="currency"
                                name="currency"
                                value={settings.currency}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="INR">INR (₹)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 mb-2">
                                Tax Rate (%)
                            </label>
                            <input
                                type="number"
                                id="taxRate"
                                name="taxRate"
                                min="0"
                                max="100"
                                step="0.1"
                                value={settings.taxRate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label htmlFor="shippingFee" className="block text-sm font-medium text-gray-700 mb-2">
                                Shipping Fee (₹)
                            </label>
                            <input
                                type="number"
                                id="shippingFee"
                                name="shippingFee"
                                min="0"
                                value={settings.shippingFee}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label htmlFor="freeShippingThreshold" className="block text-sm font-medium text-gray-700 mb-2">
                                Free Shipping Threshold (₹)
                            </label>
                            <input
                                type="number"
                                id="freeShippingThreshold"
                                name="freeShippingThreshold"
                                min="0"
                                value={settings.freeShippingThreshold}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Inventory */}
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Inventory</h2>

                    <div>
                        <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700 mb-2">
                            Low Stock Threshold
                        </label>
                        <input
                            type="number"
                            id="lowStockThreshold"
                            name="lowStockThreshold"
                            min="0"
                            value={settings.lowStockThreshold}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Products with stock below this number will be flagged as low stock
                        </p>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>

                    <div className="space-y-3">
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={settings.emailNotifications}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <div>
                                <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                                <p className="text-xs text-gray-500">Receive general email notifications</p>
                            </div>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="orderNotifications"
                                checked={settings.orderNotifications}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <div>
                                <span className="text-sm font-medium text-gray-700">Order Notifications</span>
                                <p className="text-xs text-gray-500">Get notified when new orders are placed</p>
                            </div>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="lowStockNotifications"
                                checked={settings.lowStockNotifications}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <div>
                                <span className="text-sm font-medium text-gray-700">Low Stock Notifications</span>
                                <p className="text-xs text-gray-500">Get alerts when products are running low</p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
                    >
                        <FiSave className="w-5 h-5" />
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    )
}
