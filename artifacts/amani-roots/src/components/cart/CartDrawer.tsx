import React, { useState, useEffect } from "react"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/CartContext"

function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`
}

export function CartDrawer() {
  const { cartItems, cartTotal, isOpen, closeCart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [checkoutError, setCheckoutError] = useState("")
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  async function handleCheckout() {
    setCheckoutError("")

    const missingPriceId = cartItems.find(i => !i.priceId)
    if (missingPriceId) {
      setCheckoutError(`"${missingPriceId.name}" doesn't have a Stripe price ID configured yet.`)
      return
    }

    setCheckoutLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map(i => ({ priceId: i.priceId, quantity: i.quantity })),
        }),
      })

      if (!res.ok) {
        const body: unknown = await res.json().catch(() => ({}))
        const message = body && typeof body === "object" && "error" in body && typeof (body as Record<string, unknown>).error === "string"
          ? (body as Record<string, unknown>).error as string
          : `Server error ${res.status}`
        throw new Error(message)
      }

      const data: unknown = await res.json()
      const url = data && typeof data === "object" && "url" in data && typeof (data as Record<string, unknown>).url === "string"
        ? (data as Record<string, unknown>).url as string
        : null
      if (!url) throw new Error("No checkout URL returned.")
      clearCart()
      window.location.href = url
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Checkout failed. Please try again."
      setCheckoutError(message)
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          "fixed inset-0 z-[60] bg-black/30 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={[
          "fixed top-0 right-0 z-[70] h-full w-full max-w-[420px] flex flex-col transition-transform duration-300 ease-in-out",
        ].join(" ")}
        style={{
          backgroundColor: "var(--bg)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          boxShadow: "-4px 0 40px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b flex-shrink-0"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} style={{ color: "var(--forest)" }} />
            <span className="text-[10px] font-body font-light tracking-[0.18em] uppercase" style={{ color: "var(--text)" }}>
              Your Cart
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1 transition-opacity hover:opacity-60"
            aria-label="Close cart"
          >
            <X size={18} style={{ color: "var(--text-muted)" }} />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={40} style={{ color: "var(--mint)" }} />
              <p className="text-sm font-light tracking-wide" style={{ color: "var(--text-muted)" }}>
                Your cart is empty.
              </p>
              <button
                onClick={closeCart}
                className="text-[10px] uppercase tracking-[0.15em] font-light px-6 py-2.5 transition-opacity hover:opacity-80"
                style={{ backgroundColor: "var(--forest)", color: "#fff" }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cartItems.map(item => (
                <li
                  key={item.id}
                  className="flex gap-4 pb-6 border-b last:border-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  {/* Thumbnail */}
                  <div className="flex-shrink-0 overflow-hidden" style={{ width: 72, height: 72 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm font-light leading-snug tracking-wide mb-1 truncate" style={{ color: "var(--text)" }}>
                      {item.name}
                    </p>
                    <p className="text-xs font-light mb-3" style={{ color: "var(--sage)" }}>
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity stepper + remove */}
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center border"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-black/5"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} style={{ color: "var(--text-muted)" }} />
                        </button>
                        <span className="w-7 text-center text-xs font-light" style={{ color: "var(--text)" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-black/5"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} style={{ color: "var(--text-muted)" }} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[9px] uppercase tracking-[0.12em] font-light transition-opacity hover:opacity-60"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Line total */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs font-light" style={{ color: "var(--text)" }}>
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div
            className="flex-shrink-0 px-6 py-6 border-t"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-cream)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-[10px] uppercase tracking-[0.18em] font-light" style={{ color: "var(--text-muted)" }}>
                Subtotal
              </span>
              <span className="font-heading text-lg font-light" style={{ color: "var(--forest)" }}>
                {formatPrice(cartTotal)}
              </span>
            </div>

            {checkoutError && (
              <p className="text-xs font-light text-red-500 mb-3 leading-relaxed">
                {checkoutError}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full text-xs font-body font-light tracking-[0.15em] uppercase py-4 transition-all duration-300 hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: "var(--forest)", color: "#fff" }}
            >
              {checkoutLoading ? "Redirecting…" : "Checkout →"}
            </button>

            <p className="text-[9px] font-light text-center mt-3 tracking-wide" style={{ color: "var(--text-muted)" }}>
              Taxes & shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  )
}
