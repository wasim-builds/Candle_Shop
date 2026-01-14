# Candle Shop - E-commerce Web Application

A modern, full-featured e-commerce web application for a candle shop, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🛍️ **Product Catalog**: Browse products with filtering and sorting
- 🛒 **Shopping Cart**: Add items, manage quantities, and view totals
- ❤️ **Wishlist**: Save favorite products for later
- 🎨 **Collections**: Organize products by seasonal collections
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🎯 **Product Variants**: Support for products with multiple size/price options
- 💰 **Sale Items**: Display discounted products with original prices
- 🔍 **Search & Filter**: Filter by category and collection, sort by various criteria

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **State Management**: React Context API
- **Storage**: LocalStorage for cart and wishlist persistence

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
Candle_Shop/
├── app/                    # Next.js app directory
│   ├── shop/              # Shop page with filters
│   ├── product/[id]/      # Product detail pages
│   ├── cart/              # Shopping cart page
│   ├── wishlist/          # Wishlist page
│   └── collection/[slug]/ # Collection pages
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Footer component
├── contexts/              # React Context providers
│   ├── CartContext.tsx    # Shopping cart state
│   └── WishlistContext.tsx # Wishlist state
├── data/                  # Sample data
│   └── products.ts        # Product data and collections
├── types/                 # TypeScript type definitions
│   └── index.ts          # Type definitions
└── public/                # Static assets
```

## Features in Detail

### Shopping Cart
- Add/remove items
- Update quantities
- Calculate totals with shipping
- Free delivery threshold (₹999)
- Persistent storage (localStorage)

### Wishlist
- Add/remove products
- Quick add to cart from wishlist
- Persistent storage (localStorage)

### Product Pages
- Detailed product information
- Variant selection (sizes, etc.)
- Quantity selector
- Stock information
- Add to cart/wishlist

### Shop Page
- Grid view of all products
- Filter by category and collection
- Sort by popularity, price, newness
- Responsive product cards
- Quick view and add to cart

## Customization

### Adding Products
Edit `data/products.ts` to add new products. Each product should follow the `Product` interface defined in `types/index.ts`.

### Styling
Modify `tailwind.config.js` to customize colors, fonts, and other design tokens.

### Collections
Update the `collections` array in `data/products.ts` to add or modify collections.

## Admin Dashboard

The application includes a comprehensive admin dashboard with:

- **Product Management**: Add, edit, delete products
- **Order Management**: View and update order status
- **Analytics**: Sales charts and statistics
- **Real-time Stats**: Revenue, orders, customers tracking
- **Alerts**: Low stock and pending order notifications

Access the admin dashboard at `/admin` after deployment.

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

Quick deploy to Vercel:
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables (MongoDB URI, NextAuth secret)
4. Deploy!

## Future Enhancements

- User authentication with NextAuth
- Payment integration (Razorpay ready)
- Order history for customers
- Product reviews and ratings
- Advanced search functionality
- Email notifications (SendGrid ready)
- Backend API integration
- Image optimization
- SEO improvements

## License

This project is open source and available under the MIT License.


