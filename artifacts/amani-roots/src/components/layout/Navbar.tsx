import React, { useState, useEffect } from "react"
import { Link } from "wouter"
import { ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import LoginModal from "@/components/auth/LoginModal"

const BASE = typeof import.meta !== "undefined" ? import.meta.env.BASE_URL : "/"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const { cartCount, openCart } = useCart()
  const { user, signOut, isConfigured } = useAuth()

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
    >
      {/* ── Mobile: logo row + links row + cart icon stacked ── */}
      <div className="flex flex-col sm:hidden px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-1 flex justify-center" onClick={handleNavClick}>
            <img
              src={`${BASE}assets/logo.png`}
              alt="Amani Roots Oils"
              className="h-[40px] w-auto object-contain"
            />
          </Link>
          {/* Cart icon — mobile */}
          <button
            onClick={openCart}
            className="relative flex items-center justify-center p-1.5 transition-opacity hover:opacity-70"
            aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
          >
            <ShoppingBag size={18} style={{ color: "var(--forest)" }} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center text-[9px] font-light px-0.5 rounded-full leading-none"
                style={{ backgroundColor: "var(--gold)", color: "#fff" }}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
        <nav>
          <ul className="flex items-center justify-between pt-1 pb-0.5">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block text-[7px] font-body font-light tracking-[0.06em] uppercase transition-colors whitespace-nowrap py-1"
                  style={{ color: "var(--text)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--sage)")}
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

      {/* ── Tablet+: single row side-by-side ── */}
      <div
        className="hidden sm:flex w-full max-w-[1400px] mx-auto items-center gap-3 px-4 md:px-8"
        style={{ minHeight: "64px" }}
      >
        <Link href="/" className="flex-shrink-0 flex items-center" onClick={handleNavClick}>
          <img
            src={`${BASE}assets/logo.png`}
            alt="Amani Roots Oils"
            className="h-[56px] md:h-[68px] w-auto object-contain"
          />
        </Link>
        <nav className="flex-1">
          <ul className="flex items-center justify-end gap-5 md:gap-7 lg:gap-10">
            {navLinks.map((link) => (
              <li key={link.name} className="flex-shrink-0">
                <Link
                  href={link.href}
                  className="block text-[9px] md:text-[10px] lg:text-[11px] font-body font-light tracking-[0.1em] md:tracking-[0.13em] uppercase transition-colors whitespace-nowrap py-1"
                  style={{ color: "var(--text)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--sage)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}
                  onClick={handleNavClick}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth button — desktop */}
        {isConfigured && (
          user ? (
            <button
              onClick={signOut}
              className="flex-shrink-0 flex items-center gap-2 transition-opacity hover:opacity-60"
              title={`Signed in as ${user.displayName}`}
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName ?? ""} className="w-7 h-7 rounded-full" />
              ) : (
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ backgroundColor: "var(--mint)", color: "var(--forest)" }}>
                  {(user.displayName ?? "A")[0]?.toUpperCase()}
                </div>
              )}
            </button>
          ) : !emailSubmitted ? (
            <button
              onClick={() => setLoginModalOpen(true)}
              className="flex-shrink-0 text-[9px] font-light tracking-[0.12em] uppercase px-3 py-1.5 border transition-all hover:opacity-70"
              style={{ borderColor: "var(--sage)", color: "var(--text)" }}
            >
              Sign In
            </button>
          ) : null}
        )}

        {/* Cart icon — desktop */}
        <button
          onClick={openCart}
          className="relative flex-shrink-0 flex items-center justify-center p-2 ml-2 transition-opacity hover:opacity-70"
          aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
        >
          <ShoppingBag size={20} style={{ color: "var(--forest)" }} />
          {cartCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] flex items-center justify-center text-[9px] font-light px-0.5 rounded-full leading-none transition-all duration-300"
              style={{ backgroundColor: "var(--gold)", color: "#fff" }}
            >
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>
      </div>

      {loginModalOpen && (
        <LoginModal
          onClose={() => setLoginModalOpen(false)}
          onSubmitSuccess={() => setEmailSubmitted(true)}
        />
      )}
    </header>
  )
}
