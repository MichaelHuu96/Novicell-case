import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/library/layout/Footer";
import type { Metadata } from "next";
import { Header } from "@/components/library/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "InfinityElectronics",
  description: "Frontend case",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="site-main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}