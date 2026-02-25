"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export function CartIndicator() {
  const { itemCount } = useCart();

  return (
    <Link className="site-nav-link cart-link" href="/cart">
      Cart
      <span className="cart-badge" aria-live="polite">
        {itemCount}
      </span>
    </Link>
  );
}
