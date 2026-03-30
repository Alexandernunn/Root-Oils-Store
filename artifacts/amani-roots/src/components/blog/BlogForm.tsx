import React, { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { type User } from "firebase/auth"
import { type SelectedMedia } from "@/pages/Groups"

const IMAGE_STORE_LIMIT_BASE64 = 900 * 1024
const IMAGE_RAW_LIMIT = Math.floor(IMAGE_STORE_LIMIT_BASE64 * 0.75)

interface BlogFormProps {
  user?: User | null
  selectedMedia?: SelectedMedia | null
  onMediaClear?: () => void
  onPostSuccess?: () => void
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function BlogForm({ user, selectedMedia, onMediaClear, onPostSuccess }: BlogFormProps) {
  const [body, setBody] = useState("")
  const [manualName, setManualName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mediaError, setMediaError] = useState("")

  const authorName = user
    ? (user.displayName || user.email || "Member")
    : manualName

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!authorName.trim() || !body.trim()) return

    if (selectedMedia && selectedMedia.tooLargeToStore) {
      setMediaError(
        selectedMedia.type === "video"
          ? "Remove the video before posting — videos can't be saved in posts yet."
          : "Remove the oversized image or choose one under 900 KB before posting."
      )
      return
    }

    setMediaError("")

    if (!db) {
      console.error("Firestore not configured")
      return
    }

    setSubmitting(true)
    try {
      let mediaUrl: string | null = null
      let mediaType: string | null = null

      if (selectedMedia && !selectedMedia.tooLargeToStore) {
        const isImage = selectedMedia.type === "image" || selectedMedia.type === "gif"
        if (isImage && selectedMedia.file.size <= IMAGE_RAW_LIMIT) {
          const encoded = await fileToBase64(selectedMedia.file)
          if (encoded.length > IMAGE_STORE_LIMIT_BASE64) {
            setMediaError("Image is too large to save (over 900 KB when encoded). Remove it or choose a smaller image.")
            setSubmitting(false)
            return
          }
          mediaUrl = encoded
          mediaType = selectedMedia.type
        }
      }

      await addDoc(collection(db, "posts"), {
        authorName: authorName.trim(),
        body: body.trim(),
        createdAt: serverTimestamp(),
        uid: user?.uid ?? null,
        photoURL: user?.photoURL ?? null,
        mediaUrl,
        mediaType,
      })

      setBody("")
      setManualName("")
      setSuccess(true)
      onMediaClear?.()
      setTimeout(() => {
        setSuccess(false)
        onPostSuccess?.()
      }, 2000)
    } catch (err: unknown) {
      console.error("Error posting:", err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[680px] mx-auto">
      {user ? (
        <div className="flex items-center gap-3 mb-6 px-3 py-2.5 border-2" style={{ borderColor: "var(--lavender)" }}>
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName ?? ""} className="w-8 h-8 rounded-full flex-shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: "var(--mint)", color: "var(--forest)" }}>
              {(user.displayName || user.email || "M")[0]?.toUpperCase()}
            </div>
          )}
          <p className="text-sm font-light truncate" style={{ color: "var(--text)" }}>
            {user.displayName || user.email}
          </p>
          <span className="ml-auto flex-shrink-0 text-[9px] font-light tracking-[0.12em] uppercase px-2 py-0.5"
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
            Your Name
          </label>
          <input
            id="authorName"
            type="text"
            value={manualName}
            onChange={e => setManualName(e.target.value)}
            placeholder="Enter your name"
            required
            className="w-full bg-transparent border-2 px-3 py-3 text-sm font-light tracking-wide outline-none transition-colors placeholder:opacity-40"
            style={{ borderColor: "var(--lavender)", color: "var(--text)" }}
            onFocus={(e) => e.target.style.borderColor = "var(--forest)"}
            onBlur={(e) => e.target.style.borderColor = "var(--lavender)"}
          />
        </div>
      )}

      <div className="mb-6">
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
          className="w-full bg-transparent border-2 px-4 py-3 text-sm font-light leading-[1.8] tracking-wide outline-none resize-none transition-colors placeholder:opacity-40"
          style={{ borderColor: "var(--lavender)", color: "var(--text)" }}
          onFocus={(e) => e.target.style.borderColor = "var(--forest)"}
          onBlur={(e) => e.target.style.borderColor = "var(--lavender)"}
        />
      </div>

      {mediaError && (
        <p className="mb-4 text-[11px] font-light leading-relaxed px-1" style={{ color: "#c0392b" }}>
          {mediaError}
        </p>
      )}

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
    </form>
  )
}
