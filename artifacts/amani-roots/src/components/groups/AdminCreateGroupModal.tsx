import React, { useState } from "react"
import { X } from "lucide-react"
import { checkAdminPassword, createGroup } from "@/lib/groups"
import { db } from "@/lib/firebase"

interface Props {
  onClose: () => void
}

type Step = "password" | "form"

export default function AdminCreateGroupModal({ onClose }: Props) {
  const [step, setStep] = useState<Step>("password")
  const [password, setPassword] = useState("")
  const [pwError, setPwError] = useState("")
  const [pwLoading, setPwLoading] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState("")

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!password.trim()) return
    setPwLoading(true)
    setPwError("")
    try {
      const result = await checkAdminPassword(password.trim())
      if (result === "match") {
        setStep("form")
      } else if (result === "noconfig") {
        setPwError(
          "Admin password not configured. Create a Firestore document at admin_config/auth with a field named \"password\"."
        )
      } else {
        setPwError("Incorrect password.")
      }
    } catch {
      setPwError("Could not verify password. Check your Firebase configuration.")
    } finally {
      setPwLoading(false)
    }
  }

  async function handleGroupSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setSubmitting(true)
    setFormError("")
    try {
      await createGroup({ name, description, coverImage })
      onClose()
    } catch {
      setFormError("Failed to create group. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(26,23,20,0.45)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-[440px] p-8"
        style={{ backgroundColor: "var(--bg)", boxShadow: "var(--shadow-green-lg)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 transition-opacity hover:opacity-60"
          aria-label="Close"
        >
          <X size={16} style={{ color: "var(--text-muted)" }} />
        </button>

        {!db ? (
          <div>
            <p className="text-[9px] font-light tracking-[0.2em] uppercase mb-2" style={{ color: "var(--sage)" }}>
              — Not Available
            </p>
            <h2 className="font-heading text-2xl font-light tracking-wider mb-4" style={{ color: "var(--text)" }}>
              Firebase Not Configured
            </h2>
            <p className="text-xs font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Group creation requires Firebase. Please add your Firebase environment variables to enable this feature.
            </p>
          </div>
        ) : step === "password" ? (
          <form onSubmit={handlePasswordSubmit}>
            <p className="text-[9px] font-light tracking-[0.2em] uppercase mb-2" style={{ color: "var(--sage)" }}>
              — Admin Access
            </p>
            <h2 className="font-heading text-2xl font-light tracking-wider mb-6" style={{ color: "var(--text)" }}>
              Enter Password
            </h2>
            <p className="text-xs font-light leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              Group creation is restricted to admins. Enter the admin password to continue.
            </p>
            <p
              className="text-[10px] font-light leading-relaxed mb-4 px-3 py-2"
              style={{ backgroundColor: "var(--bg-mist)", color: "var(--text-muted)" }}
            >
              First time? Set your password in Firebase console at{" "}
              <span style={{ color: "var(--sage)", fontFamily: "monospace" }}>
                admin_config / auth → password
              </span>
            </p>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Admin password"
              autoFocus
              className="w-full bg-transparent border-b px-0 py-2 text-sm font-light tracking-wide outline-none mb-6 placeholder:opacity-40"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            />
            {pwError && (
              <p className="text-xs font-light mb-4 leading-relaxed" style={{ color: "#c0392b" }}>
                {pwError}
              </p>
            )}
            <button
              type="submit"
              disabled={pwLoading || !password.trim()}
              className="w-full text-xs font-body font-light tracking-[0.15em] uppercase py-3.5 transition-all hover:opacity-80 disabled:opacity-40"
              style={{ backgroundColor: "var(--forest)", color: "#fff" }}
            >
              {pwLoading ? "Verifying…" : "Continue →"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleGroupSubmit}>
            <p className="text-[9px] font-light tracking-[0.2em] uppercase mb-2" style={{ color: "var(--sage)" }}>
              — New Group
            </p>
            <h2 className="font-heading text-2xl font-light tracking-wider mb-6" style={{ color: "var(--text)" }}>
              Create a Group
            </h2>

            <div className="mb-5">
              <label className="block text-[9px] font-light tracking-[0.18em] uppercase mb-2" style={{ color: "var(--sage)" }}>
                Group Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Amani Roots Oil Group"
                required
                className="w-full bg-transparent border-b px-0 py-2 text-sm font-light tracking-wide outline-none placeholder:opacity-40"
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              />
            </div>

            <div className="mb-5">
              <label className="block text-[9px] font-light tracking-[0.18em] uppercase mb-2" style={{ color: "var(--sage)" }}>
                Description
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What is this group about?"
                rows={3}
                className="w-full bg-transparent border px-3 py-2 text-sm font-light leading-relaxed tracking-wide outline-none resize-none placeholder:opacity-40"
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-[9px] font-light tracking-[0.18em] uppercase mb-2" style={{ color: "var(--sage)" }}>
                Cover Image URL
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={e => setCoverImage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-transparent border-b px-0 py-2 text-sm font-light tracking-wide outline-none placeholder:opacity-40"
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              />
            </div>

            {formError && (
              <p className="text-xs font-light mb-4" style={{ color: "#c0392b" }}>
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className="w-full text-xs font-body font-light tracking-[0.15em] uppercase py-3.5 transition-all hover:opacity-80 disabled:opacity-40"
              style={{ backgroundColor: "var(--forest)", color: "#fff" }}
            >
              {submitting ? "Creating…" : "Create Group →"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
