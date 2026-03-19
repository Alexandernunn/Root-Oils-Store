import React, { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Post {
  id: string
  authorName: string
  body: string
  createdAt: Timestamp | null
}

function formatDate(ts: Timestamp | null): string {
  if (!ts) return ""
  const date = ts.toDate()
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="w-full max-w-[680px] mx-auto pt-4">
        <p className="text-xs font-light tracking-[0.1em] uppercase" style={{ color: "var(--text-muted)" }}>
          Loading posts…
        </p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="w-full max-w-[680px] mx-auto pt-4">
        <p className="text-xs font-light tracking-[0.1em] italic" style={{ color: "var(--text-muted)" }}>
          No posts yet — be the first to share.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[680px] mx-auto flex flex-col gap-8">
      {posts.map(post => (
        <article
          key={post.id}
          className="border-b pb-8"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <span className="font-heading text-lg font-light tracking-widest">
              {post.authorName}
            </span>
            <span
              className="text-[9px] font-light tracking-[0.12em] uppercase flex-shrink-0"
              style={{ color: "var(--sage)" }}
            >
              {formatDate(post.createdAt)}
            </span>
          </div>
          <p
            className="text-sm font-light leading-[1.9] tracking-wide whitespace-pre-wrap"
            style={{ color: "var(--text-muted)" }}
          >
            {post.body}
          </p>
        </article>
      ))}
    </div>
  )
}
