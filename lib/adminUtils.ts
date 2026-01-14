import { Order, Product, AdminStats, SalesData } from '@/types';

/**
 * Generate a unique order number
 */
export function generateOrderNumber(): string {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ORD-${year}-${random}`;
}

/**
 * Calculate admin statistics from orders and products
 */
export function calculateAdminStats(orders: Order[], products: Product[]): AdminStats {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    // Current period (last 7 days)
    const currentOrders = orders.filter(o => new Date(o.createdAt) >= sevenDaysAgo);
    const currentRevenue = currentOrders.reduce((sum, o) => sum + o.total, 0);

    // Previous period (7-14 days ago)
    const previousOrders = orders.filter(
        o => new Date(o.createdAt) >= fourteenDaysAgo && new Date(o.createdAt) < sevenDaysAgo
    );
    const previousRevenue = previousOrders.reduce((sum, o) => sum + o.total, 0);

    // Calculate percentage changes
    const revenueChange = previousRevenue > 0
        ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
        : 0;
    const ordersChange = previousOrders.length > 0
        ? ((currentOrders.length - previousOrders.length) / previousOrders.length) * 100
        : 0;

    // Count low stock products (less than 10 items)
    const lowStockProducts = products.filter(p => p.stockCount && p.stockCount < 10).length;

    // Count pending orders
    const pendingOrders = orders.filter(o => o.status === 'pending').length;

    // Get unique customers
    const uniqueCustomers = new Set(orders.map(o => o.customer.email)).size;

    return {
        totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
        totalOrders: orders.length,
        totalProducts: products.length,
        totalCustomers: uniqueCustomers,
        revenueChange: Math.round(revenueChange * 10) / 10,
        ordersChange: Math.round(ordersChange * 10) / 10,
        lowStockProducts,
        pendingOrders,
    };
}

/**
 * Get sales data for the last N days
 */
export function getSalesData(orders: Order[], days: number = 7): SalesData[] {
    const salesMap = new Map<string, { revenue: number; orders: number }>();
    const now = new Date();

    // Initialize all days
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        salesMap.set(dateStr, { revenue: 0, orders: 0 });
    }

    // Aggregate orders by date
    orders.forEach(order => {
        const orderDate = new Date(order.createdAt);
        const dateStr = orderDate.toISOString().split('T')[0];

        if (salesMap.has(dateStr)) {
            const current = salesMap.get(dateStr)!;
            salesMap.set(dateStr, {
                revenue: current.revenue + order.total,
                orders: current.orders + 1,
            });
        }
    });

    // Convert to array
    return Array.from(salesMap.entries()).map(([date, data]) => ({
        date,
        revenue: Math.round(data.revenue * 100) / 100,
        orders: data.orders,
    }));
}

/**
 * Format currency in Indian Rupees
 */
export function formatCurrency(amount: number): string {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Export orders to CSV
 */
export function exportOrdersToCSV(orders: Order[]): string {
    const headers = ['Order Number', 'Customer', 'Email', 'Total', 'Status', 'Date'];
    const rows = orders.map(order => [
        order.orderNumber,
        order.customer.name,
        order.customer.email,
        order.total.toFixed(2),
        order.status,
        new Date(order.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    return csvContent;
}

/**
 * Download CSV file
 */
export function downloadCSV(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Get order status badge color
 */
export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        shipped: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Get top selling products
 */
export function getTopProducts(orders: Order[], limit: number = 5): Array<{ product: string; quantity: number; revenue: number }> {
    const productMap = new Map<string, { quantity: number; revenue: number }>();

    orders.forEach(order => {
        order.items.forEach(item => {
            const current = productMap.get(item.product.name) || { quantity: 0, revenue: 0 };
            productMap.set(item.product.name, {
                quantity: current.quantity + item.quantity,
                revenue: current.revenue + (item.price * item.quantity),
            });
        });
    });

    return Array.from(productMap.entries())
        .map(([product, data]) => ({ product, ...data }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, limit);
}
