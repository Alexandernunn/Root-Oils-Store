import React, { useState } from "react"
import { motion } from "framer-motion"
import BlogForm from "@/components/blog/BlogForm"
import BlogFeed from "@/components/blog/BlogFeed"
import GroupsSidebar from "@/components/groups/GroupsSidebar"
import AdminCreateGroupModal from "@/components/groups/AdminCreateGroupModal"
import LoginModal from "@/components/auth/LoginModal"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0, 0.2, 1] } },
}

// 700 KB raw → ~933 KB base64 (×4/3), safely under Firestore's 1 MB document limit
const IMAGE_RAW_LIMIT = 700 * 1024

export type SelectedMedia = {
  file: File
  preview: string
  type: "image" | "video" | "gif"
  tooLargeToStore: boolean
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function Groups() {
  const [adminModalOpen, setAdminModalOpen] = useState(false)
  const [composeOpen, setComposeOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia | null>(null)
  const pictureInputRef = React.useRef<HTMLInputElement>(null)
  const videoInputRef = React.useRef<HTMLInputElement>(null)
  const gifInputRef = React.useRef<HTMLInputElement>(null)

  const openCompose = () => {
    setComposeOpen(true)
  }

  const handleFileSelect = (file: File | null, mediaType: "image" | "video" | "gif") => {
    if (!file) return
    const isVideo = mediaType === "video"
    const rawMax = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > rawMax) {
      alert(`File too large. Max ${isVideo ? "50MB" : "10MB"} for upload.`)
      return
    }
    const tooLargeToStore = isVideo ? true : file.size > IMAGE_RAW_LIMIT
    const preview = URL.createObjectURL(file)
    setSelectedMedia({ file, preview, type: mediaType, tooLargeToStore })
  }

  const clearMedia = () => {
    if (selectedMedia) URL.revokeObjectURL(selectedMedia.preview)
    setSelectedMedia(null)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>

      {/* ── HERO ── */}
      <section
        className="pt-[82px] sm:pt-[64px]"
        style={{ backgroundColor: "var(--bg-lavender)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 md:py-14">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-xs font-light tracking-[0.1em] uppercase mb-6 transition-opacity hover:opacity-60"
            style={{ color: "var(--sage)" }}
          >
            ← Back
          </button>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
          >
            <motion.p
              variants={fadeInUp}
              className="text-[10px] font-light tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--sage)" }}
            >
              &mdash; COMMUNITY
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-heading text-3xl md:text-5xl font-light tracking-widest leading-[1.1] mb-3"
            >
              Groups Feed
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-sm font-light leading-relaxed tracking-wide"
              style={{ color: "var(--text-muted)" }}
            >
              View groups and posts below
            </motion.p>
          </motion.div>
        </div>
        <div
          className="h-[2px]"
          style={{
            background: "linear-gradient(90deg, var(--lavender-deep), var(--lavender), var(--sage))",
          }}
        />
      </section>

      {/* ── MAIN TWO-COLUMN LAYOUT ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT: Feed ── */}
          <div className="flex-1 min-w-0">

            {/* Compose Box */}
            <div
              className="border-l-2 border p-4 mb-6"
              style={{ borderColor: "var(--sage)", backgroundColor: "var(--bg-mist)", borderLeftColor: "var(--forest)", borderLeftWidth: "3px" }}
            >
              {!composeOpen ? (
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-light"
                    style={{ backgroundColor: "var(--mint)", color: "var(--forest)" }}
                  >
                    {user ? (user.displayName ?? "A")[0]?.toUpperCase() : "A"}
                  </div>
                  <button
                    onClick={openCompose}
                    className="flex-1 text-left text-sm font-bold tracking-wider py-3 px-4 border-2 transition-all hover:shadow-lg"
                    style={{
                      borderColor: "var(--lavender)",
                      color: "var(--lavender-deep)",
                      background: "linear-gradient(135deg, rgba(155, 114, 200, 0.12) 0%, rgba(47, 95, 72, 0.1) 100%)",
                      fontWeight: "600",
                      letterSpacing: "0.02em",
                    }}
                  >
                    ✨ Share something…
                  </button>
                  <button
                    onClick={openCompose}
                    className="flex-shrink-0 text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-2 border-2 transition-all hover:shadow-md"
                    style={{
                      borderColor: "var(--gold)",
                      backgroundColor: "linear-gradient(135deg, rgba(201, 169, 110, 0.12), rgba(201, 169, 110, 0.06))",
                      color: "var(--gold)",
                    }}
                  >
                    + Media
                  </button>
                  <button
                    onClick={openCompose}
                    className="flex-shrink-0 text-[10px] font-light tracking-[0.14em] uppercase px-5 py-2 transition-all hover:opacity-80"
                    style={{ backgroundColor: "var(--forest)", color: "#fff" }}
                  >
                    Create a Post
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3
                      className="text-lg font-bold tracking-[0.15em] uppercase"
                      style={{ color: "var(--lavender-deep)", letterSpacing: "0.08em" }}
                    >
                      🌿 Share Your Story
                    </h3>
                    <button
                      onClick={() => { setComposeOpen(false); clearMedia() }}
                      className="text-xs font-light tracking-wide uppercase hover:opacity-60 transition-opacity"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Media Upload Buttons */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => pictureInputRef.current?.click()}
                      className="flex flex-col items-center justify-center gap-2 py-4 px-3 border-2 text-[10px] font-bold tracking-[0.12em] uppercase transition-all hover:shadow-md"
                      style={{ borderColor: selectedMedia?.type === "image" ? "var(--forest)" : "var(--lavender)", backgroundColor: "linear-gradient(135deg, rgba(155, 114, 200, 0.15), rgba(155, 114, 200, 0.08))", color: "var(--lavender-deep)" }}
                    >
                      <span className="text-2xl">🖼️</span>
                      <span>Picture</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      className="flex flex-col items-center justify-center gap-2 py-4 px-3 border-2 text-[10px] font-bold tracking-[0.12em] uppercase transition-all hover:shadow-md"
                      style={{ borderColor: "var(--forest)", backgroundColor: "linear-gradient(135deg, rgba(47, 95, 72, 0.12), rgba(47, 95, 72, 0.06))", color: "var(--forest)" }}
                    >
                      <span className="text-2xl">🎥</span>
                      <span>Video</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => gifInputRef.current?.click()}
                      className="flex flex-col items-center justify-center gap-2 py-4 px-3 border-2 text-[10px] font-bold tracking-[0.12em] uppercase transition-all hover:shadow-md"
                      style={{ borderColor: selectedMedia?.type === "gif" ? "var(--forest)" : "var(--gold)", backgroundColor: "linear-gradient(135deg, rgba(201, 169, 110, 0.12), rgba(201, 169, 110, 0.06))", color: "var(--gold)" }}
                    >
                      <span className="text-2xl">🎬</span>
                      <span>GIF</span>
                    </button>

                    <input ref={pictureInputRef} type="file" accept="image/*" style={{ display: "none" }}
                      onChange={e => handleFileSelect(e.target.files?.[0] ?? null, "image")} />
                    <input ref={videoInputRef} type="file" accept="video/*" style={{ display: "none" }}
                      onChange={e => handleFileSelect(e.target.files?.[0] ?? null, "video")} />
                    <input ref={gifInputRef} type="file" accept=".gif,image/gif" style={{ display: "none" }}
                      onChange={e => handleFileSelect(e.target.files?.[0] ?? null, "gif")} />
                  </div>

                  {/* Media Preview */}
                  {selectedMedia && (
                    <div className="mb-4">
                      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", borderRadius: "4px", backgroundColor: "var(--bg-alt)" }}>
                        {selectedMedia.type === "image" || selectedMedia.type === "gif" ? (
                          <img src={selectedMedia.preview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <video src={selectedMedia.preview} className="w-full h-full object-cover" controls autoPlay loop muted />
                        )}
                        <button
                          type="button"
                          onClick={clearMedia}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all hover:opacity-70"
                          style={{ backgroundColor: "rgba(26,23,20,0.7)", color: "#fff" }}
                        >
                          ✕
                        </button>
                        <p className="absolute bottom-2 left-2 text-[9px] font-light px-2 py-1 rounded" style={{ backgroundColor: "rgba(26,23,20,0.6)", color: "#fff" }}>
                          {selectedMedia.file.name} · {formatBytes(selectedMedia.file.size)}
                        </p>
                      </div>

                      {selectedMedia.tooLargeToStore && (
                        <p className="mt-2 text-[10px] font-light leading-relaxed px-1" style={{ color: "var(--gold)" }}>
                          {selectedMedia.type === "video"
                            ? "Video preview only — videos can't be saved in posts yet. Remove it to post without media."
                            : "This image is over 700 KB and can't be saved. Remove it to post text only, or choose a smaller image (under 700 KB)."}
                        </p>
                      )}
                    </div>
                  )}

                  <BlogForm
                    selectedMedia={selectedMedia}
                    onMediaClear={clearMedia}
                    onPostSuccess={() => setComposeOpen(false)}
                  />
                </div>
              )}
            </div>

            {/* Post Feed */}
            <GroupFeedWrapper />
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <GroupsSidebar onCreateGroup={() => setAdminModalOpen(true)} />
          </div>

        </div>
      </div>

      {adminModalOpen && (
        <AdminCreateGroupModal onClose={() => setAdminModalOpen(false)} />
      )}

      {loginModalOpen && (
        <LoginModal
          onClose={() => {
            setLoginModalOpen(false)
            if (user) setComposeOpen(true)
          }}
          reason="Sign in to share your hair care journey with the community."
        />
      )}
    </div>
  )
}

function GroupFeedWrapper() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <h3
          className="text-lg font-bold tracking-[0.08em] uppercase"
          style={{ color: "var(--lavender-deep)" }}
        >
          🌱 Community Posts
        </h3>
        <input
          type="text"
          placeholder="Search posts…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 max-w-xs text-sm font-light tracking-wide px-4 py-2 border-2 bg-transparent outline-none transition-colors"
          style={{
            borderColor: searchQuery ? "var(--lavender)" : "var(--sage)",
            color: "var(--text)",
          }}
          onFocus={(e) => e.target.style.borderColor = "var(--lavender)"}
          onBlur={(e) => e.target.style.borderColor = searchQuery ? "var(--lavender)" : "var(--sage)"}
        />
      </div>
      <BlogFeed searchQuery={searchQuery} />
    </div>
  )
}
