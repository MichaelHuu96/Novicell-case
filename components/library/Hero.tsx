"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";

type HeroProps = {
  products: Product[];
};

export function Hero({ products }: HeroProps) {
  const heroProducts = products.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (heroProducts.length <= 1) {
      return;
    }

    const intervalId = setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % heroProducts.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [heroProducts.length]);

  useEffect(() => {
    if (activeIndex >= heroProducts.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, heroProducts.length]);

  const goToPrevious = () => {
    if (heroProducts.length === 0) {
      return;
    }

    setActiveIndex((previous) =>
      previous === 0 ? heroProducts.length - 1 : previous - 1,
    );
  };

  const goToNext = () => {
    if (heroProducts.length === 0) {
      return;
    }

    setActiveIndex((previous) => (previous + 1) % heroProducts.length);
  };

  const sliderTransform = `translateX(-${activeIndex * 100}%)`;

  return (
    <section className="hero-slider" aria-label="Hero slider">
      <button
        className="hero-click-zone hero-click-zone-left"
        aria-label="Previous slide area"
        onClick={goToPrevious}
        type="button"
      />

      <button
        className="hero-click-zone hero-click-zone-right"
        aria-label="Next slide area"
        onClick={goToNext}
        type="button"
      />

      <button
        className="hero-arrow hero-arrow-left"
        aria-label="Previous slide"
        onClick={goToPrevious}
        type="button"
      >
        &lsaquo;
      </button>

      <button
        className="hero-arrow hero-arrow-right"
        aria-label="Next slide"
        onClick={goToNext}
        type="button"
      >
        &rsaquo;
      </button>

      <div className="hero-products" aria-label="Hero products">
        {heroProducts.length > 0 ? (
          <div className="hero-track" style={{ transform: sliderTransform }}>
            {heroProducts.map((product) => (
              <Link
                key={product.id}
                className="hero-product-slide"
                href={`/products/${product.id}`}
              >
                <div className="hero-product-image-wrap">
                  <img
                    className="hero-product-image"
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                  />
                </div>

                <div className="hero-product-content">
                  <h2 className="hero-product-title">{product.title}</h2>
                  <p className="hero-product-description">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="hero-product-empty">No products available.</div>
        )}
      </div>

      <div className="hero-dots" aria-label="Slide indicators">
        {heroProducts.map((_, index) => (
          <button
            key={`hero-dot-${index}`}
            className={`hero-dot ${index === activeIndex ? "hero-dot-active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
