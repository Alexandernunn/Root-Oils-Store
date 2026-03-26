import React, { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Heart, MessageCircle, Eye } from "lucide-react"

interface Post {
  id: string
  authorName: string
  body: string
  createdAt: Timestamp | null
}

function formatDate(ts: Timestamp | null): string {
  if (!ts) return ""
  const date = ts.toDate()
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map(w => w[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

const AVATAR_COLORS = [
  { bg: "#D6E8DC", fg: "#2F5F48" },
  { bg: "#EDE8F5", fg: "#6B4E9A" },
  { bg: "#F7F0E3", fg: "#C9A96E" },
  { bg: "#EEF4F0", fg: "#7A9E87" },
]

function avatarColor(name: string) {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length
  return AVATAR_COLORS[idx] ?? AVATAR_COLORS[0]!
}

export default function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return
    }
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
    const unsub = onSnapshot(q, snapshot => {
      setPosts(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Post, "id">),
        }))
      )
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (!db) {
    return (
      <div className="pt-2">
        <p className="text-xs font-light italic" style={{ color: "var(--text-muted)" }}>
          Firebase not configured — posts unavailable.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="pt-2">
        <p className="text-xs font-light tracking-[0.1em] uppercase" style={{ color: "var(--text-muted)" }}>
          Loading posts…
        </p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="pt-2">
        <p className="text-xs font-light italic" style={{ color: "var(--text-muted)" }}>
          No posts yet — be the first to share.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0">
      {posts.map(post => {
        const colors = avatarColor(post.authorName)
        const initials = getInitials(post.authorName)
        return (
          <article
            key={post.id}
            className="border-b py-5"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Header row: avatar + author + timestamp */}
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-light"
                style={{ backgroundColor: colors.bg, color: colors.fg }}
              >
                {initials || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-heading text-sm font-light tracking-wide leading-tight"
                  style={{ color: "var(--text)" }}
                >
                  {post.authorName}
                </p>
                <p
                  className="text-[10px] font-light tracking-[0.08em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>

            {/* Body */}
            <p
              className="text-sm font-light leading-[1.85] tracking-wide whitespace-pre-wrap mb-4 pl-12"
              style={{ color: "var(--text-muted)" }}
            >
              {post.body}
            </p>

            {/* Footer: likes / comments / views placeholders */}
            <div className="flex items-center gap-5 pl-12">
              <button
                className="flex items-center gap-1.5 group"
                aria-label="Like"
              >
                <Heart
                  size={13}
                  className="transition-colors group-hover:text-red-400"
                  style={{ color: "var(--text-muted)" }}
                />
                <span className="text-[10px] font-light" style={{ color: "var(--text-muted)" }}>0</span>
              </button>
              <button
                className="flex items-center gap-1.5 group"
                aria-label="Comments"
              >
                <MessageCircle
                  size={13}
                  className="transition-colors"
                  style={{ color: "var(--text-muted)" }}
                />
                <span className="text-[10px] font-light" style={{ color: "var(--text-muted)" }}>0 Comments</span>
              </button>
              <div className="flex items-center gap-1.5 ml-auto">
                <Eye size={13} style={{ color: "var(--text-muted)" }} />
                <span className="text-[10px] font-light" style={{ color: "var(--text-muted)" }}>0 Views</span>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
