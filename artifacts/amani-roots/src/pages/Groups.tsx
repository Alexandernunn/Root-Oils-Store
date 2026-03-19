import React from "react"
import { motion } from "framer-motion"
import { Link } from "wouter"

export default function Groups() {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center text-center px-6 pt-[82px] sm:pt-[64px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0, 0.2, 1] }}
        className="max-w-md"
      >
        <p className="text-[10px] md:text-xs font-light tracking-[0.2em] uppercase mb-6" style={{ color: "var(--lavender)" }}>
          &mdash; COMING SOON
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-light tracking-widest leading-[1.2] mb-8">
          Community Groups
        </h1>
        <p className="text-sm text-text-muted font-light leading-[1.9] tracking-wide mb-12">
          A space for the natural hair community to share journeys, progress photos, and support one another. The community is growing — stay tuned.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.instagram.com/amani_roots_oils/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs font-body font-light tracking-[0.15em] uppercase px-8 py-3 transition-all duration-300 hover:opacity-80"
            style={{ backgroundColor: "var(--lavender)", color: "#fff" }}
          >
            Follow on Instagram &rarr;
          </a>
          <Link
            href="/"
            className="inline-block text-xs font-body font-light tracking-[0.15em] uppercase px-8 py-3 transition-all duration-300 hover:opacity-80"
            style={{ border: "1px solid var(--border)", color: "var(--text)" }}
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
