import React, { useState, useEffect } from "react"
import { Link } from "wouter"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SHOP", href: "/shop" },
    { name: "ABOUT", href: "/about" },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 h-[72px] flex items-center",
          scrolled
            ? "bg-[#FAFAF8]/95 backdrop-blur-md border-b border-black/8"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="z-50 flex items-center">
            <img
              src={`${import.meta.env.BASE_URL}assets/logo.png`}
              alt="Amani Roots Oils"
              className="h-9 w-auto object-contain"
              style={{ filter: "brightness(0) saturate(100%) invert(26%) sepia(28%) saturate(600%) hue-rotate(110deg) brightness(90%) contrast(95%)" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs font-body font-light tracking-[0.15em] text-text uppercase transition-colors"
                    style={{ color: 'var(--text)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--sage)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block z-50">
            <Link
              href="/shop"
              className="text-xs font-body font-light tracking-[0.15em] uppercase underline underline-offset-4 hover:underline-offset-8 transition-all"
              style={{ color: 'var(--forest)' }}
            >
              Shop &rarr;
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-text p-2 -mr-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ backgroundColor: '#1A1714' }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-heading text-4xl font-light tracking-widest uppercase transition-colors"
                  style={{ color: '#fff' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--sage)')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/shop"
                className="mt-8 font-body text-sm font-light tracking-[0.2em] uppercase underline underline-offset-8 transition-colors"
                style={{ color: 'var(--mint)' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop Collection &rarr;
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
