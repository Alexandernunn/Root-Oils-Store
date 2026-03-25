import React, { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function BlogForm() {
  const [authorName, setAuthorName] = useState("")
  const [body, setBody] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!authorName.trim() || !body.trim()) return
    if (!db) {
      setError("Blog is not configured yet.")
      return
    }

    setSubmitting(true)
    setError("")
    try {
      await addDoc(collection(db, "posts"), {
        authorName: authorName.trim(),
        body: body.trim(),
        createdAt: serverTimestamp(),
      })
      setAuthorName("")
      setBody("")
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[680px] mx-auto">
      <div className="mb-5">
        <label
          htmlFor="authorName"
          className="block text-[9px] font-light tracking-[0.18em] uppercase mb-2"
          style={{ color: "var(--sage)" }}
        >
          Author Name
        </label>
        <input
          id="authorName"
          type="text"
          value={authorName}
          onChange={e => setAuthorName(e.target.value)}
          placeholder="Your name"
          required
          className="w-full bg-transparent border-b px-0 py-2 text-sm font-light tracking-wide outline-none transition-colors placeholder:text-text-muted/50 focus:border-[var(--sage)]"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        />
      </div>

      <div className="mb-7">
        <label
          htmlFor="body"
          className="block text-[9px] font-light tracking-[0.18em] uppercase mb-2"
          style={{ color: "var(--sage)" }}
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
          className="w-full bg-transparent border px-4 py-3 text-sm font-light leading-[1.8] tracking-wide outline-none resize-none transition-colors placeholder:text-text-muted/50 focus:border-[var(--sage)]"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="text-xs font-body font-light tracking-[0.15em] uppercase px-10 py-3.5 transition-all duration-300 hover:opacity-80 disabled:opacity-50"
        style={{ backgroundColor: "var(--forest)", color: "#fff" }}
      >
        {submitting ? "Posting…" : "Share Post →"}
      </button>

      {success && (
        <p
          className="mt-4 text-xs font-light tracking-wide"
          style={{ color: "var(--sage)" }}
        >
          Your post has been shared with the community.
        </p>
      )}
      {error && (
        <p className="mt-4 text-xs font-light tracking-wide text-red-400">
          {error}
        </p>
      )}
    </form>
  )
}
