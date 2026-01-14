'use client'

import { SalesData } from '@/types'
import { formatCurrency } from '@/lib/adminUtils'

interface SalesChartProps {
    data: SalesData[]
}

export default function SalesChart({ data }: SalesChartProps) {
    if (data.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-center">No sales data available</p>
            </div>
        )
    }

    const maxRevenue = Math.max(...data.map(d => d.revenue), 1)
    const chartHeight = 200

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Sales Overview (Last 7 Days)</h3>

            <div className="relative" style={{ height: chartHeight + 40 }}>
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between text-xs text-gray-500">
                    <span>{formatCurrency(maxRevenue)}</span>
                    <span>{formatCurrency(maxRevenue / 2)}</span>
                    <span>₹0</span>
                </div>

                {/* Chart area */}
                <div className="ml-16 mr-4 h-full flex items-end justify-between gap-2">
                    {data.map((item, index) => {
                        const heightPercent = (item.revenue / maxRevenue) * 100
                        const date = new Date(item.date)
                        const dayName = date.toLocaleDateString('en-IN', { weekday: 'short' })

                        return (
                            <div key={index} className="flex-1 flex flex-col items-center">
                                {/* Bar */}
                                <div className="w-full flex flex-col justify-end" style={{ height: chartHeight }}>
                                    <div
                                        className="w-full bg-primary-500 rounded-t hover:bg-primary-600 transition-colors relative group"
                                        style={{ height: `${heightPercent}%`, minHeight: item.revenue > 0 ? '4px' : '0' }}
                                    >
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                                            <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                                <div>{formatCurrency(item.revenue)}</div>
                                                <div className="text-gray-300">{item.orders} orders</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* X-axis label */}
                                <div className="mt-2 text-xs text-gray-600">
                                    {dayName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary-500 rounded"></div>
                    <span>Revenue</span>
                </div>
            </div>
        </div>
    )
}
