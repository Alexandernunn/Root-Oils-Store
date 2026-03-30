import React, { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"

interface LoginModalProps {
  onClose: () => void
  reason?: string
}

export default function LoginModal({ onClose, reason }: LoginModalProps) {
  const { signInWithGoogle, sendEmailLink } = useAuth()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [signingInGoogle, setSigningInGoogle] = useState(false)

  const handleEmailLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSending(true)
    try {
      await sendEmailLink(email.trim())
      setSent(true)
    } catch (err: unknown) {
      console.error("Email link error:", err)
    } finally {
      setSending(false)
    }
  }

  const handleGoogle = async () => {
    setSigningInGoogle(true)
    try {
      await signInWithGoogle()
      onClose()
    } catch (err: unknown) {
      console.error("Google sign-in error:", err)
    } finally {
      setSigningInGoogle(false)
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
            {sent ? "Check your inbox" : "Join the conversation"}
          </h2>
          <p className="text-xs font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {sent
              ? `We sent a sign-in link to ${email}. Click it to continue.`
              : (reason ?? "Enter your email and we'll send you a magic link — no password needed.")}
          </p>
        </div>

        {!sent ? (
          <>
            <form onSubmit={handleEmailLink} className="flex flex-col gap-3 mb-5">
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
                disabled={sending}
                className="w-full py-3.5 px-6 text-sm font-light tracking-[0.12em] uppercase transition-all hover:opacity-80 disabled:opacity-50"
                style={{ backgroundColor: "var(--forest)", color: "#fff" }}
              >
                {sending ? "Sending…" : "Send Magic Link →"}
              </button>
            </form>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-[1px]" style={{ backgroundColor: "var(--border)" }} />
              <span className="text-[10px] font-light tracking-[0.1em] uppercase" style={{ color: "var(--text-muted)" }}>or</span>
              <div className="flex-1 h-[1px]" style={{ backgroundColor: "var(--border)" }} />
            </div>

            <button
              onClick={handleGoogle}
              disabled={signingInGoogle}
              className="w-full flex items-center justify-center gap-3 py-3 px-6 border text-xs font-light tracking-wide transition-all hover:shadow-sm disabled:opacity-50"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "transparent" }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71C3.784 10.17 3.682 9.593 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              {signingInGoogle ? "Signing in…" : "Continue with Google"}
            </button>

            <p className="text-center text-[10px] font-light mt-5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              By signing in you agree to our community guidelines.
            </p>
          </>
        ) : (
          <div className="text-center">
            <div
              className="w-12 h-12 mx-auto mb-5 rounded-full flex items-center justify-center text-xl"
              style={{ backgroundColor: "var(--mint)" }}
            >
              ✉️
            </div>
            <p className="text-xs font-light leading-[1.8] tracking-wide mb-6" style={{ color: "var(--text-muted)" }}>
              Didn't receive it? Check your spam folder, or{" "}
              <button
                onClick={() => setSent(false)}
                className="underline underline-offset-2 transition-opacity hover:opacity-60"
                style={{ color: "var(--forest)" }}
              >
                try again
              </button>
              .
            </p>
            <button
              onClick={onClose}
              className="text-[10px] font-light tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
              style={{ color: "var(--text-muted)" }}
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
