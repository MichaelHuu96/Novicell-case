import Link from "next/link";
import { CartIndicator } from "@/components/library/layout/CartIndicator";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="site-brand" href="/">
          Infinity Electronics
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <Link key={item.href} className="site-nav-link" href={item.href}>
              {item.label}
            </Link>
          ))}
          <CartIndicator />
        </nav>
      </div>
    </header>
  );
}
