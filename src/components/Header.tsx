import { useState } from "react";
import { Menu, X } from "lucide-react";
import schoolLogo from "@/assets/school-logo.png";

const navLinks = [
  { name: "HOME", href: "#" },
  { name: "ABOUT US", href: "#about" },
  { name: "ACADEMICS", href: "#academics" },
  { name: "STUDENT AFFAIRS & SERVICES", href: "#services" },
  { name: "ADMISSION", href: "#admission" },
  { name: "NEWS AND EVENTS", href: "#news" },
  { name: "CONTACT", href: "#contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo and School Name */}
          <div className="flex items-center gap-3">
            <img
              src={schoolLogo}
              alt="St. Catherine's College Logo"
              className="h-12 w-12 object-contain"
            />
            <div className="text-primary-foreground">
              <h1 className="font-heading text-lg font-bold leading-tight md:text-xl">
                St. Catherine's College Inc.
              </h1>
              <p className="text-xs opacity-80">
                6019, Poblacion 1, Carcar City, Cebu
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:text-gold"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-light">
          <nav className="container mx-auto px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 text-sm font-medium text-primary-foreground border-b border-primary/20 transition-colors hover:text-gold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
