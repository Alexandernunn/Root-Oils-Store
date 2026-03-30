import React, { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, Timestamp, addDoc, getDocs, updateDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Heart, MessageCircle, Eye } from "lucide-react"

// Generate or retrieve session ID for tracking likes
const getSessionId = () => {
  let id = localStorage.getItem("amani_session_id")
  if (!id) {
    id = `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
    localStorage.setItem("amani_session_id", id)
  }
  return id
}

interface Comment {
  id: string
  author: string
  text: string
  createdAt: Timestamp | null
}

interface Post {
  id: string
  authorName: string
  body: string
  createdAt: Timestamp | null
  mediaUrl?: string | null
  mediaType?: string | null
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

interface BlogFeedProps {
  searchQuery?: string
}

export default function BlogFeed({ searchQuery = "" }: BlogFeedProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [postComments, setPostComments] = useState<Record<string, Comment[]>>({})
  const [postLikes, setPostLikes] = useState<Record<string, string[]>>({})
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [commentText, setCommentText] = useState<Record<string, string>>({})
  const sessionId = getSessionId()

  const loadComments = async (postId: string) => {
    if (!db) return
    try {
      const commentsCollection = collection(db, `posts/${postId}/comments`)
      const q = query(commentsCollection, orderBy("createdAt", "asc"))
      const snapshot = await getDocs(q)
      const comments = snapshot.docs.map(doc => ({
        id: doc.id,
        author: doc.data().author ?? "Member",
        text: doc.data().text ?? "",
        createdAt: doc.data().createdAt ?? null,
      }))
      setPostComments(prev => ({ ...prev, [postId]: comments }))
    } catch (err) {
      console.error("Failed to load comments:", err)
    }
  }

  const loadLikes = async (postId: string) => {
    if (!db) return
    try {
      const postDoc = doc(db, "posts", postId)
      const postSnap = await getDocs(collection(db, `posts`))
      const post = postSnap.docs.find(d => d.id === postId)
      if (post) {
        setPostLikes(prev => ({ ...prev, [postId]: post.data().likes ?? [] }))
      }
    } catch (err) {
      console.error("Failed to load likes:", err)
    }
  }

  const handleLike = async (postId: string) => {
    if (!db) return
    try {
      const postRef = doc(db, "posts", postId)
      const likes = postLikes[postId] ?? []
      const hasLiked = likes.includes(sessionId)
      const newLikes = hasLiked ? likes.filter(id => id !== sessionId) : [...likes, sessionId]
      
      await updateDoc(postRef, { likes: newLikes })
      setPostLikes(prev => ({ ...prev, [postId]: newLikes }))
    } catch (err) {
      console.error("Failed to update like:", err)
    }
  }

  const handleAddComment = async (postId: string) => {
    const text = commentText[postId]?.trim()
    if (!text || !db) return
    
    try {
      const commentsCollection = collection(db, `posts/${postId}/comments`)
      await addDoc(commentsCollection, {
        author: "Member",
        text,
        createdAt: new Date(),
      })
      setCommentText(prev => ({ ...prev, [postId]: "" }))
      await loadComments(postId)
    } catch (err) {
      console.error("Failed to add comment:", err)
    }
  }

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return
    }
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
    const unsub = onSnapshot(q, snapshot => {
      const postList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, "id">),
      }))
      setPosts(postList)
      postList.forEach(post => {
        loadComments(post.id)
        loadLikes(post.id)
      })
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const filteredPosts = posts.filter(post => {
    const query = searchQuery.toLowerCase()
    return (
      post.authorName.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)
    )
  })

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

  if (filteredPosts.length === 0 && searchQuery) {
    return (
      <div className="pt-2">
        <p className="text-xs font-light italic" style={{ color: "var(--text-muted)" }}>
          No posts matching "{searchQuery}".
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredPosts.map(post => {
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
              className="text-sm font-light leading-[1.9] tracking-wide whitespace-pre-wrap mb-4 pl-13"
              style={{ color: "var(--text)", paddingLeft: "52px" }}
            >
              {post.body}
            </p>

            {/* Attached media */}
            {post.mediaUrl && (
              <div className="mb-5 overflow-hidden rounded-sm" style={{ paddingLeft: "52px" }}>
                {post.mediaType === "gif" || post.mediaType === "image" ? (
                  <img
                    src={post.mediaUrl}
                    alt="Post image"
                    className="w-full max-h-[360px] object-cover rounded-sm"
                    loading="lazy"
                  />
                ) : null}
              </div>
            )}

            {/* Footer: likes / comments / views placeholders */}
            <div className="flex items-center gap-5" style={{ paddingLeft: "52px" }}>
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 group transition-all hover:scale-105"
                aria-label="Like"
              >
                <Heart
                  size={14}
                  className="transition-colors"
                  fill={(postLikes[post.id] ?? []).includes(sessionId) ? "currentColor" : "none"}
                  style={{ color: "var(--lavender)" }}
                />
                <span className="text-[10px] font-bold tracking-wide" style={{ color: "var(--lavender-deep)" }}>
                  {(postLikes[post.id] ?? []).length}
                </span>
              </button>
              <button
                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                className="flex items-center gap-1.5 group transition-all hover:scale-105"
                aria-label="Comments"
              >
                <MessageCircle
                  size={14}
                  className="transition-colors"
                  style={{ color: "var(--forest)" }}
                />
                <span className="text-[10px] font-bold tracking-wide" style={{ color: "var(--forest)" }}>
                  {(postComments[post.id] ?? []).length} Comments
                </span>
              </button>
            </div>

            {/* Comments section */}
            {expandedPost === post.id && (
              <div className="mt-6 border-t pt-4" style={{ borderColor: "var(--sage)", paddingLeft: "52px" }}>
                {/* Display existing comments */}
                <div className="mb-4 space-y-3">
                  {(postComments[post.id] ?? []).map(comment => (
                    <div key={comment.id} className="text-sm">
                      <p className="font-bold text-xs" style={{ color: "var(--forest)" }}>
                        {comment.author}
                      </p>
                      <p className="text-xs font-light mt-1" style={{ color: "var(--text)" }}>
                        {comment.text}
                      </p>
                      <p className="text-[9px] font-light mt-1" style={{ color: "var(--gold)" }}>
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Comment input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={commentText[post.id] ?? ""}
                    onChange={e => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                    onKeyPress={e => {
                      if (e.key === "Enter") handleAddComment(post.id)
                    }}
                    placeholder="Add a comment..."
                    className="flex-1 bg-transparent border-b-2 px-0 py-2 text-xs font-light outline-none transition-colors"
                    style={{ borderColor: "var(--lavender)", color: "var(--text)" }}
                    onFocus={e => (e.target.style.borderColor = "var(--forest)")}
                    onBlur={e => (e.target.style.borderColor = "var(--lavender)")}
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="text-xs font-light tracking-wide px-3 py-1 transition-opacity hover:opacity-70"
                    style={{ color: "var(--forest)" }}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
