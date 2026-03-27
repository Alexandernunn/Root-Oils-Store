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
  { bg: "linear-gradient(135deg, #D6E8DC, #b8d8c4)", fg: "#2F5F48", border: "#7A9E87" },
  { bg: "linear-gradient(135deg, #EDE8F5, #d8ccf0)", fg: "#6B4E9A", border: "#9B72C8" },
  { bg: "linear-gradient(135deg, #F7F0E3, #eedfc0)", fg: "#C9A96E", border: "#C9A96E" },
  { bg: "linear-gradient(135deg, #EEF4F0, #d6e8dc)", fg: "#7A9E87", border: "#7A9E87" },
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
    <div className="flex flex-col gap-4">
      {posts.map(post => {
        const colors = avatarColor(post.authorName)
        const initials = getInitials(post.authorName)
        return (
          <article
            key={post.id}
            className="border-l-[3px] border border-b p-5 transition-shadow hover:shadow-md"
            style={{
              borderLeftColor: "var(--forest)",
              borderColor: "var(--sage)",
              background: "linear-gradient(135deg, var(--bg-mist, #f4f8f5) 0%, rgba(155,114,200,0.04) 100%)",
            }}
          >
            {/* Header row: avatar + author + timestamp */}
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold border-2"
                style={{ background: colors.bg, color: colors.fg, borderColor: colors.border }}
              >
                {initials || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-heading text-sm font-bold tracking-wide leading-tight"
                  style={{ color: "var(--lavender-deep)" }}
                >
                  {post.authorName}
                </p>
                <p
                  className="text-[10px] font-light tracking-[0.1em] uppercase mt-0.5"
                  style={{ color: "var(--gold)" }}
                >
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>

            {/* Body */}
            <p
              className="text-sm font-light leading-[1.9] tracking-wide whitespace-pre-wrap mb-5 pl-13"
              style={{ color: "var(--text)", paddingLeft: "52px" }}
            >
              {post.body}
            </p>

            {/* Footer: likes / comments / views placeholders */}
            <div className="flex items-center gap-5" style={{ paddingLeft: "52px" }}>
              <button
                className="flex items-center gap-1.5 group transition-all hover:scale-105"
                aria-label="Like"
              >
                <Heart
                  size={14}
                  className="transition-colors group-hover:fill-current"
                  style={{ color: "var(--lavender)" }}
                />
                <span className="text-[10px] font-bold tracking-wide" style={{ color: "var(--lavender-deep)" }}>0</span>
              </button>
              <button
                className="flex items-center gap-1.5 group transition-all hover:scale-105"
                aria-label="Comments"
              >
                <MessageCircle
                  size={14}
                  className="transition-colors"
                  style={{ color: "var(--forest)" }}
                />
                <span className="text-[10px] font-bold tracking-wide" style={{ color: "var(--forest)" }}>0 Comments</span>
              </button>
              <div className="flex items-center gap-1.5 ml-auto">
                <Eye size={14} style={{ color: "var(--gold)" }} />
                <span className="text-[10px] font-bold tracking-wide" style={{ color: "var(--gold)" }}>0 Views</span>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
