import React from "react"
import { motion } from "framer-motion"
import BlogForm from "@/components/blog/BlogForm"
import BlogFeed from "@/components/blog/BlogFeed"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0, 0.2, 1] } },
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-bg text-text">

      {/* ── HERO ── */}
      <section
        className="pt-[82px] sm:pt-[64px]"
        style={{ backgroundColor: "var(--bg-lavender)" }}
      >
        <div className="max-w-[900px] mx-auto px-6 md:px-12 py-14 md:py-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.13 } }, hidden: {} }}
          >
            <motion.p
              variants={fadeInUp}
              className="text-[10px] md:text-xs font-light tracking-[0.2em] uppercase mb-5"
              style={{ color: "var(--sage)" }}
            >
              &mdash; COMMUNITY
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-heading text-4xl md:text-6xl font-light tracking-widest leading-[1.1] mb-5"
            >
              Community Blog
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide max-w-md mx-auto"
            >
              A space to share hair care journeys, rituals, and wisdom with the Amani Roots community.
            </motion.p>
          </motion.div>
        </div>
        <div
          className="h-[3px]"
          style={{
            background: "linear-gradient(90deg, var(--lavender-deep), var(--lavender), var(--sage))",
          }}
        />
      </section>

      {/* ── SUBMIT FORM ── */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[900px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[9px] md:text-[10px] font-light tracking-[0.2em] uppercase mb-10"
            style={{ color: "var(--sage)" }}
          >
            &mdash; SHARE YOUR STORY
          </motion.p>
          <BlogForm />
        </div>
      </section>

      {/* ── FEED ── */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[900px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[9px] md:text-[10px] font-light tracking-[0.2em] uppercase mb-10"
            style={{ color: "var(--sage)" }}
          >
            &mdash; COMMUNITY POSTS
          </motion.p>
          <BlogFeed />
        </div>
      </section>
    </div>
  )
}
