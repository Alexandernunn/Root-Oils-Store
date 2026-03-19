import React, { useState, useEffect } from "react"
import { Link } from "wouter"
import { cn } from "@/lib/utils"

const BASE = typeof import.meta !== "undefined" ? import.meta.env.BASE_URL : "/"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = () => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Book Online", href: "/book" },
    { name: "Events", href: "/events" },
    { name: "Groups", href: "/groups" },
    { name: "Founder's Story", href: "/founder-story" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        scrolled
          ? "bg-[#FAFAF8]/96 backdrop-blur-md border-b border-black/8"
          : "bg-[#FAFAF8]/92 backdrop-blur-sm border-b border-black/5"
      )}
      style={{ minHeight: "64px" }}
    >
      <div
        className="w-full max-w-[1400px] mx-auto flex items-center gap-3 px-4 md:px-8"
        style={{ minHeight: "64px" }}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center" onClick={handleNavClick}>
          <img
            src={`${BASE}assets/logo.png`}
            alt="Amani Roots Oils"
            className="h-[40px] sm:h-[44px] md:h-[52px] w-auto object-contain"
          />
        </Link>

        {/* Nav — always flat, scrollable on small screens, no hamburger */}
        <nav className="flex-1 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
          <ul className="flex items-center justify-end gap-3 sm:gap-5 md:gap-7 lg:gap-10 min-w-max ml-auto">
            {navLinks.map((link) => (
              <li key={link.name} className="flex-shrink-0">
                <Link
                  href={link.href}
                  className="block text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-body font-light tracking-[0.1em] md:tracking-[0.13em] uppercase transition-colors whitespace-nowrap py-1"
                  style={{ color: "var(--text)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--lavender)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}
                  onClick={handleNavClick}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
