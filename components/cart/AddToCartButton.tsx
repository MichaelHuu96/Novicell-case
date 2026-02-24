"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/types/product";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
  label?: string;
};

export function AddToCartButton({
  product,
  className = "",
  label = "Add to cart",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1000);
  };

  return (
    <button
      className={`${className} ${added ? "is-added" : ""}`.trim()}
      onClick={handleAddToCart}
      type="button"
    >
      {added ? "Added" : label}
    </button>
  );
}
