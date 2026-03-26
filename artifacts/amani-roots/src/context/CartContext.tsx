import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  priceId: string
  image: string
  quantity: number
}

interface CartContextValue {
  cartItems: CartItem[]
  cartCount: number
  cartTotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = "amani-roots-cart"

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as CartItem[]
  } catch {
    return []
  }
}

function saveToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // ignore write errors
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadFromStorage)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    saveToStorage(cartItems)
  }, [cartItems])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addToCart = useCallback((incoming: Omit<CartItem, "quantity">) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === incoming.id)
      if (existing) {
        return prev.map(i =>
          i.id === incoming.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...incoming, quantity: 1 }]
    })
    setIsOpen(true)
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return
    setCartItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity } : i))
    )
  }, [])

  const clearCart = useCallback(() => setCartItems([]), [])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
