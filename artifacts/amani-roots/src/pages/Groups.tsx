import React, { useState } from "react"
import { motion } from "framer-motion"
import BlogForm from "@/components/blog/BlogForm"
import BlogFeed from "@/components/blog/BlogFeed"
import GroupsSidebar from "@/components/groups/GroupsSidebar"
import AdminCreateGroupModal from "@/components/groups/AdminCreateGroupModal"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0, 0.2, 1] } },
}

export default function Groups() {
  const [adminModalOpen, setAdminModalOpen] = useState(false)
  const [composeOpen, setComposeOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<{ file: File; preview: string; type: "image" | "video" | "gif" } | null>(null)
  const pictureInputRef = React.useRef<HTMLInputElement>(null)
  const videoInputRef = React.useRef<HTMLInputElement>(null)
  const gifInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File | null, mediaType: "image" | "video" | "gif") => {
    if (!file) return
    const maxSize = file.type.startsWith("video") ? 5 * 1024 * 1024 : 2 * 1024 * 1024
    if (file.size > maxSize) {
      alert(`File too large. Max ${file.type.startsWith("video") ? "5MB" : "2MB"}`)
      return
    }
    const preview = URL.createObjectURL(file)
    setSelectedMedia({ file, preview, type: mediaType })
  }

  const clearMedia = () => {
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
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div
                    className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-light"
                    style={{ backgroundColor: "var(--mint)", color: "var(--forest)" }}
                  >
                    A
                  </div>
                  <button
                    onClick={() => setComposeOpen(true)}
                    className="flex-1 text-left text-sm font-bold tracking-wider py-3 px-4 border-2 transition-all hover:shadow-lg"
                    style={{
                      borderColor: "var(--lavender)",
                      color: "var(--lavender-deep)",
                      backgroundColor: "linear-gradient(135deg, rgba(155, 114, 200, 0.12) 0%, rgba(47, 95, 72, 0.1) 100%)",
                      background: "linear-gradient(135deg, rgba(155, 114, 200, 0.12) 0%, rgba(47, 95, 72, 0.1) 100%)",
                      fontWeight: "600",
                      letterSpacing: "0.02em",
                    }}
                  >
                    ✨ Share something…
                  </button>
                  <button
                    onClick={() => setComposeOpen(true)}
                    className="flex-shrink-0 text-[10px] font-light tracking-[0.14em] uppercase px-5 py-2 transition-all hover:opacity-80"
                    style={{ backgroundColor: "var(--forest)", color: "#fff" }}
                  >
                    Create a Post
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <p
                      className="text-[9px] font-light tracking-[0.18em] uppercase"
                      style={{ color: "var(--sage)" }}
                    >
                      — Share Your Story
                    </p>
                    <button
                      onClick={() => setComposeOpen(false)}
                      className="text-[9px] font-light tracking-wide uppercase hover:opacity-60"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Media Upload Buttons */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => pictureInputRef.current?.click()}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-2 border text-[9px] sm:text-[10px] font-light tracking-[0.12em] uppercase transition-all hover:opacity-85 active:opacity-70"
                      style={{ borderColor: "var(--mint)", backgroundColor: "rgba(214, 232, 220, 0.25)", color: "var(--forest)" }}
                    >
                      <span>🖼️</span>
                      <span className="hidden sm:inline">Picture</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-2 border text-[9px] sm:text-[10px] font-light tracking-[0.12em] uppercase transition-all hover:opacity-85 active:opacity-70"
                      style={{ borderColor: "var(--sage)", backgroundColor: "rgba(122, 158, 135, 0.15)", color: "var(--forest)" }}
                    >
                      <span>🎥</span>
                      <span className="hidden sm:inline">Video</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => gifInputRef.current?.click()}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-2 border text-[9px] sm:text-[10px] font-light tracking-[0.12em] uppercase transition-all hover:opacity-85 active:opacity-70"
                      style={{ borderColor: "var(--lavender)", backgroundColor: "rgba(155, 114, 200, 0.12)", color: "var(--lavender-deep)" }}
                    >
                      <span>🎬</span>
                      <span className="hidden sm:inline">GIF</span>
                    </button>

                    {/* Hidden File Inputs */}
                    <input
                      ref={pictureInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={e => handleFileSelect(e.target.files?.[0] ?? null, "image")}
                    />
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      style={{ display: "none" }}
                      onChange={e => handleFileSelect(e.target.files?.[0] ?? null, "video")}
                    />
                    <input
                      ref={gifInputRef}
                      type="file"
                      accept=".gif,image/gif"
                      style={{ display: "none" }}
                      onChange={e => handleFileSelect(e.target.files?.[0] ?? null, "gif")}
                    />
                  </div>

                  {/* Media Preview */}
                  {selectedMedia && (
                    <div className="mb-6 relative overflow-hidden" style={{ aspectRatio: "16/9", borderRadius: "4px", backgroundColor: "var(--bg-alt)", boxShadow: "var(--shadow-green)" }}>
                      {selectedMedia.type === "image" || selectedMedia.type === "gif" ? (
                        <img
                          src={selectedMedia.preview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={selectedMedia.preview}
                          className="w-full h-full object-cover"
                          controls
                          autoPlay
                          loop
                          muted
                        />
                      )}
                      <button
                        type="button"
                        onClick={clearMedia}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-light transition-all hover:opacity-70"
                        style={{ backgroundColor: "rgba(26,23,20,0.7)", color: "#fff" }}
                      >
                        ✕
                      </button>
                      <p className="absolute bottom-2 left-2 text-[9px] font-light px-2 py-1 rounded" style={{ backgroundColor: "rgba(26,23,20,0.6)", color: "#fff" }}>
                        {selectedMedia.file.name}
                      </p>
                    </div>
                  )}

                  <BlogForm />
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

      {/* Admin Modal */}
      {adminModalOpen && (
        <AdminCreateGroupModal onClose={() => setAdminModalOpen(false)} />
      )}
    </div>
  )
}

function GroupFeedWrapper() {
  return (
    <div>
      <p
        className="text-[9px] font-light tracking-[0.18em] uppercase mb-6"
        style={{ color: "var(--sage)" }}
      >
        — Community Posts
      </p>
      <BlogFeed />
    </div>
  )
}
