'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        // Check if user is logged in
        const user = localStorage.getItem('user')
        if (!user) {
            router.push('/login?redirect=/admin')
        }
    }, [router])

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
