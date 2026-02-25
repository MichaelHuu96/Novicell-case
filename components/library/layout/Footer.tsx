import Link from "next/link";

const pageLinks = [
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy policy", href: "/privacy-policy" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Facebook", href: "https://www.facebook.com" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <nav className="footer-links" aria-label="Footer pages">
          {pageLinks.map((link) => (
            <Link key={link.href} className="footer-link" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className="footer-links" aria-label="Social media links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              className="footer-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
