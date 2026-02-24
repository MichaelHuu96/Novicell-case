"use client";

import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const shipping = items.length > 0 ? 12 : 0;
  const tax = subtotal * 0.25;
  const total = subtotal + shipping + tax;

  const canCheckout = items.length > 0;

  const itemText = useMemo(
    () => (items.length === 1 ? "1 item" : `${items.length} items`),
    [items.length],
  );

  const handleCheckout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canCheckout) {
      return;
    }

    setOrderPlaced(true);
    clearCart();
  };

  return (
    <main className="page-shell cart-page">
      <h1>Shopping cart</h1>

      {orderPlaced ? (
        <p className="checkout-success">
          Order placed. Thank you for shopping with Infinity Electronics.
        </p>
      ) : null}

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Cart items">
            <h2>Items ({itemText})</h2>

            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img alt={item.title} className="cart-item-image" src={item.image} />

                <div className="cart-item-content">
                  <h3>{item.title}</h3>
                  <p>{item.category}</p>
                  <p>${item.price.toFixed(2)}</p>
                </div>

                <div className="cart-item-actions">
                  <label htmlFor={`quantity-${item.id}`}>Qty</label>
                  <select
                    id={`quantity-${item.id}`}
                    onChange={(event) =>
                      updateQuantity(item.id, Number(event.target.value))
                    }
                    value={item.quantity}
                  >
                    {[1, 2, 3, 4, 5].map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity}
                      </option>
                    ))}
                  </select>

                  <button
                    className="cart-remove-button"
                    onClick={() => removeItem(item.id)}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="checkout-panel" aria-label="Checkout summary">
            <h2>Checkout</h2>
            <p>Market-standard flow: shipping, payment, and order review.</p>

            <form className="checkout-form" onSubmit={handleCheckout}>
              <label htmlFor="full-name">Full name</label>
              <input id="full-name" name="full-name" required type="text" />

              <label htmlFor="address">Address</label>
              <input id="address" name="address" required type="text" />

              <label htmlFor="card-number">Card number</label>
              <input id="card-number" name="card-number" required type="text" />

              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-summary-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="checkout-summary-row">
                <span>Tax (25%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="checkout-summary-row checkout-summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="checkout-button" disabled={!canCheckout} type="submit">
                Place order
              </button>
            </form>
          </aside>
        </div>
      )}
    </main>
  );
}
