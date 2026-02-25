# Component Documentation

## Overview

This project uses reusable components grouped by domain:

- `components/library` for feature and product UI
- `components/library/layout` for layout UI
- `components/cart` for cart state and actions

---

## Hero

- **File**: `components/library/Hero.tsx`
- **Purpose**: Frontpage hero carousel with product slide, arrows, dots, and auto-slide.
- **Props**:
  - `products: Product[]`
- **Behavior**:
  - Displays one product per slide
  - Loops automatically every 10s
  - Supports manual next/previous and dot navigation

## ProductCard

- **File**: `components/library/ProductCard.tsx`
- **Purpose**: Reusable product tile for listing/featured/similar sections.
- **Props**:
  - `product: Product`
- **Behavior**:
  - Links to PDP (`/products/[id]`)
  - Shows image, title, category
  - Includes Add-to-cart action

## FeaturedProducts

- **File**: `components/library/FeaturedProducts.tsx`
- **Purpose**: Reusable product collection renderer.
- **Props**:
  - `products: Product[]`
  - `currentProduct?: Product`
  - `title?: string`
  - `emptyMessage?: string`
  - `limit?: number`
  - `className?: string`
- **Behavior**:
  - Optional filtering out of current product (used on PDP)
  - Optional item limit (used for similar products)

## Header / Footer / CartIndicator

- **Files**:
  - `components/library/layout/Header.tsx`
  - `components/library/layout/Footer.tsx`
  - `components/library/layout/CartIndicator.tsx`
- **Purpose**:
  - Global navigation and footer links
  - Live cart count badge in header

## CartProvider

- **File**: `components/cart/CartProvider.tsx`
- **Purpose**: Global client-side cart state.
- **Exposed API**:
  - `items`
  - `itemCount`
  - `subtotal`
  - `addItem(product)`
  - `removeItem(productId)`
  - `updateQuantity(productId, quantity)`
  - `clearCart()`
- **Persistence**:
  - Cart is stored in `localStorage`.

## AddToCartButton

- **File**: `components/cart/AddToCartButton.tsx`
- **Purpose**: Shared add-to-cart interaction.
- **Props**:
  - `product: Product`
  - `className?: string`
  - `label?: string`
