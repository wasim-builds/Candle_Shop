'use client'

import { ReactNode } from 'react'
import { IconType } from 'react-icons'

interface StatsCardProps {
    title: string
    value: string | number
    icon: IconType
    trend?: number
    trendLabel?: string
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
}

const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    trendLabel,
    color = 'blue'
}: StatsCardProps) {
    const isPositiveTrend = trend !== undefined && trend >= 0

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`${colorClasses[color]} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${isPositiveTrend ? 'text-green-600' : 'text-red-600'
                        }`}>
                        <span>{isPositiveTrend ? '↑' : '↓'}</span>
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>

            <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                {trendLabel && (
                    <p className="text-xs text-gray-500 mt-1">{trendLabel}</p>
                )}
            </div>
        </div>
    )
}
