'use client'

import { useState } from 'react'
import { FiMail, FiCheck } from 'react-icons/fi'

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setStatus('error')
            setMessage('Please enter a valid email address')
            return
        }

        setStatus('loading')

        // Simulate API call (replace with actual newsletter service)
        setTimeout(() => {
            // For now, just save to localStorage
            const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]')
            if (subscribers.includes(email)) {
                setStatus('error')
                setMessage('This email is already subscribed!')
            } else {
                subscribers.push(email)
                localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers))
                setStatus('success')
                setMessage('Thank you for subscribing! Check your email for a 10% discount code.')
                setEmail('')
            }
        }, 1000)
    }

    return (
        <section className="bg-gradient-to-br from-primary via-primary-600 to-primary-700 dark:from-gray-800 dark:to-gray-900 py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                        <FiMail className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                        Join Our Candle Community
                    </h2>
                    <p className="text-xl text-white/90 mb-2">
                        Get 10% off your first order!
                    </p>
                    <p className="text-white/80">
                        Subscribe to receive exclusive offers, candle care tips, and new collection updates.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            disabled={status === 'loading'}
                            className="flex-1 px-6 py-4 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
                            required
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </div>

                    {/* Status Messages */}
                    {status === 'success' && (
                        <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-white">
                            <FiCheck className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{message}</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-white">
                            <p className="text-sm">{message}</p>
                        </div>
                    )}
                </form>

                <p className="mt-6 text-sm text-white/60">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </section>
    )
}
