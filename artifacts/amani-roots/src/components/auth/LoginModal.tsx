import React, { useState } from "react"
import { motion } from "framer-motion"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface LoginModalProps {
  onClose: () => void
  reason?: string
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    
    setSubmitting(true)
    try {
      if (db) {
        await addDoc(collection(db, "emails"), {
          email: email.trim(),
          createdAt: new Date()
        })
      }
      setSubmitted(true)
      setTimeout(onClose, 2000)
    } catch (err: unknown) {
      console.error("Email submission error:", err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(26,23,20,0.5)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-sm p-8"
        style={{ backgroundColor: "var(--bg)", boxShadow: "0 20px 60px rgba(47,95,72,0.2)" }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-lg transition-opacity hover:opacity-50"
          style={{ color: "var(--text-muted)" }}
        >
          ✕
        </button>

        <div className="mb-7 text-center">
          <p className="text-[10px] font-light tracking-[0.2em] uppercase mb-3" style={{ color: "var(--sage)" }}>
            — AMANI ROOTS COMMUNITY
          </p>
          <h2 className="font-heading text-2xl font-light tracking-wide mb-2" style={{ color: "var(--text)" }}>
            {submitted ? "Thanks!" : "Join the conversation"}
          </h2>
          <p className="text-xs font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {submitted ? "You're on the list. Welcome to the community." : "Drop your email to join our community."}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoFocus
              className="w-full bg-transparent border-2 px-4 py-3 text-sm font-light tracking-wide outline-none transition-colors placeholder:opacity-40"
              style={{ borderColor: "var(--lavender)", color: "var(--text)" }}
              onFocus={e => (e.target.style.borderColor = "var(--forest)")}
              onBlur={e => (e.target.style.borderColor = "var(--lavender)")}
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 text-sm font-light tracking-[0.12em] uppercase transition-all hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: "var(--forest)", color: "#fff" }}
            >
              {submitting ? "Submitting…" : "Join →"}
            </button>
          </form>
        ) : null}
      </motion.div>
    </div>
  )
}
