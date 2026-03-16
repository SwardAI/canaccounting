"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-black">
            United<span style={{ color: "var(--color-ed-forest)" }}>Tax</span>
          </Link>

          {/* CTA button — fades in on scroll, like Cranston */}
          <div
            className={`transition-all duration-300 ${
              scrolled
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 translate-x-4 pointer-events-none"
            }`}
          >
            <Link
              href="/qualify"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white hover:opacity-90 transition-all"
              style={{
                background:
                  "linear-gradient(to bottom, oklch(0.3357 0.06 156.81), oklch(0.2857 0.05 156.81))",
              }}
            >
              Start Your Return
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
