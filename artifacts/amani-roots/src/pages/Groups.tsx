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
              className="border p-4 mb-6"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
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
                    className="flex-1 text-left text-sm font-light tracking-wide py-2 px-3 border transition-colors"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-muted)",
                      backgroundColor: "transparent",
                    }}
                  >
                    Share something…
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
                  <div className="flex gap-3 mb-6">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border text-[10px] font-light tracking-[0.12em] uppercase transition-all hover:opacity-80"
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                    >
                      <span>🖼️</span> Picture
                    </button>
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border text-[10px] font-light tracking-[0.12em] uppercase transition-all hover:opacity-80"
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                    >
                      <span>🎥</span> Video
                    </button>
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border text-[10px] font-light tracking-[0.12em] uppercase transition-all hover:opacity-80"
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                    >
                      <span>🎬</span> GIF
                    </button>
                  </div>

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
