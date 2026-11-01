import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Careers", to: "/career" },
  { label: "Vendors", to: "/vendors" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const linkColor = scrolled
    ? "text-charcoal/80 hover:text-charcoal"
    : "text-warm-white/90 hover:text-warm-white";

  const activeColor = scrolled ? "text-charcoal" : "text-warm-white";

  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-border/60 py-2 shadow-sm"
          : "py-4 bg-gradient-to-b from-charcoal/55 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 lg:px-12 xl:gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 group">
          <img
            src="/assets/logo.png"
            alt="Art Interiorz"
            className={`h-14 w-auto object-contain transition-all duration-300 ${
              scrolled
                ? "brightness-100"
                : "brightness-0 invert"
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
          {links.map((l) => {
            const isActive = location === l.to;
            return (
              <Link
                key={l.to}
                href={l.to}
                className={`relative whitespace-nowrap text-[11px] font-medium tracking-[0.12em] uppercase transition-colors xl:text-[13px] xl:tracking-[0.15em] ${
                  isActive ? activeColor : linkColor
                }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA button */}
        <Link
          href="/contact"
          className={`hidden shrink-0 items-center gap-3 px-4 py-2.5 text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 xl:px-5 xl:text-[11px] xl:tracking-[0.25em] lg:inline-flex ${
            scrolled
              ? "bg-charcoal text-warm-white hover:bg-gold"
              : "bg-warm-white/15 border border-warm-white/50 text-warm-white hover:bg-warm-white hover:text-charcoal backdrop-blur-sm"
          }`}
        >
          Book Consultation
        </Link>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 transition-colors ${
            scrolled ? "text-charcoal" : "text-warm-white"
          }`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden glass border-t border-border/40"
          >
            <div className="px-6 py-8 flex flex-col gap-1">
              {links.map((l, i) => {
                const isActive = location === l.to;
                return (
                  <motion.div
                    key={l.to}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={l.to}
                      className={`block py-3 font-display text-2xl tracking-wide border-b border-border/40 transition-colors ${
                        isActive ? "text-gold" : "text-charcoal hover:text-gold"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: links.length * 0.05 }}
                className="pt-5"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-charcoal text-warm-white px-7 py-3.5 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-gold transition-colors"
                >
                  Book Consultation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
