import React, { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { type User } from "firebase/auth"

interface BlogFormProps {
  user?: User | null
}

export default function BlogForm({ user }: BlogFormProps) {
  const [body, setBody] = useState("")
  const [manualName, setManualName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const authorName = user?.displayName ?? manualName

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!authorName.trim() || !body.trim()) return
    if (!db) {
      console.error("Firestore not configured")
      return
    }

    setSubmitting(true)
    setError("")
    try {
      await addDoc(collection(db, "posts"), {
        authorName: authorName.trim(),
        body: body.trim(),
        createdAt: serverTimestamp(),
        uid: user?.uid ?? null,
        photoURL: user?.photoURL ?? null,
      })
      setBody("")
      setManualName("")
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      console.error("Error posting:", err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[680px] mx-auto">
      {/* Author — auto-filled when signed in */}
      {user ? (
        <div className="flex items-center gap-3 mb-6 px-3 py-2.5 border-2" style={{ borderColor: "var(--lavender)" }}>
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName ?? ""} className="w-8 h-8 rounded-full flex-shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: "var(--mint)", color: "var(--forest)" }}>
              {(user.displayName ?? "A")[0]?.toUpperCase()}
            </div>
          )}
          <p className="text-sm font-light" style={{ color: "var(--text)" }}>{user.displayName}</p>
          <span className="ml-auto text-[9px] font-light tracking-[0.12em] uppercase px-2 py-0.5"
            style={{ backgroundColor: "var(--mint)", color: "var(--forest)" }}>
            Signed In
          </span>
        </div>
      ) : (
        <div className="mb-6">
          <label
            htmlFor="authorName"
            className="block text-[10px] font-bold tracking-[0.15em] uppercase mb-3"
            style={{ color: "var(--lavender-deep)", letterSpacing: "0.08em" }}
          >
            Author Name
          </label>
          <input
            id="authorName"
            type="text"
            value={manualName}
            onChange={e => setManualName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full bg-transparent border-2 border-b px-3 py-3 text-sm font-light tracking-wide outline-none transition-colors placeholder:text-text-muted/50"
            style={{ borderColor: "var(--lavender)", color: "var(--text)" }}
            onFocus={(e) => e.target.style.borderColor = "var(--forest)"}
            onBlur={(e) => e.target.style.borderColor = "var(--lavender)"}
          />
        </div>
      )}

      <div className="mb-8">
        <label
          htmlFor="body"
          className="block text-[10px] font-bold tracking-[0.15em] uppercase mb-3"
          style={{ color: "var(--lavender-deep)", letterSpacing: "0.08em" }}
        >
          Post
        </label>
        <textarea
          id="body"
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Share your hair care journey, tips, or thoughts…"
          required
          rows={5}
          className="w-full bg-transparent border-2 px-4 py-3 text-sm font-light leading-[1.8] tracking-wide outline-none resize-none transition-colors placeholder:text-text-muted/50"
          style={{ borderColor: "var(--lavender)", color: "var(--text)" }}
          onFocus={(e) => e.target.style.borderColor = "var(--forest)"}
          onBlur={(e) => e.target.style.borderColor = "var(--lavender)"}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="text-xs font-bold tracking-[0.15em] uppercase px-10 py-3.5 transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:scale-100"
        style={{ backgroundColor: "var(--forest)", color: "#fff" }}
      >
        {submitting ? "Posting…" : "✨ Share Post →"}
      </button>

      {success && (
        <p className="mt-4 text-xs font-light tracking-wide" style={{ color: "var(--sage)" }}>
          Your post has been shared with the community.
        </p>
      )}
      {error && (
        <p className="mt-4 text-xs font-light tracking-wide text-red-400">{error}</p>
      )}
    </form>
  )
}
