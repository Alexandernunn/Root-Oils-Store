import React, { useEffect } from "react"
import { motion } from "framer-motion"

declare global {
  interface Window {
    Cal?: ((...args: unknown[]) => void) & {
      loaded?: boolean
      ns?: Record<string, (...args: unknown[]) => void>
      q?: unknown[]
    }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0, 0.2, 1] } },
}

export default function Book() {
  useEffect(() => {
    // Load Cal.com embed script once
    if (typeof window === "undefined") return

    const initCal = () => {
      ;(function (C: Window, A: string, L: string) {
        const p = function (a: Window["Cal"], ar: unknown[]) { a!.q!.push(ar) }
        const d = (C as unknown as { document: Document }).document
        C.Cal =
          C.Cal ||
          function (...args: unknown[]) {
            const cal = C.Cal!
            if (!cal.loaded) {
              cal.ns = {}
              cal.q = cal.q || []
              const s = d.createElement("script") as HTMLScriptElement
              s.src = A
              d.head.appendChild(s)
              cal.loaded = true
            }
            if (args[0] === L) {
              const api: Window["Cal"] = function (...a: unknown[]) { p(api, a) } as Window["Cal"]
              api!.q = []
              const namespace = args[1] as string
              if (typeof namespace === "string") {
                C.Cal!.ns![namespace] = C.Cal!.ns![namespace] || api!
                p(C.Cal!.ns![namespace], args)
                p(C.Cal!, ["initNamespace", namespace])
              } else {
                p(C.Cal!, args)
              }
              return
            }
            p(C.Cal!, args)
          }
      })(window, "https://app.cal.com/embed/embed.js", "init")

      window.Cal!("init", "hair-scalp-consultation", { origin: "https://app.cal.com" })

      window.Cal!.ns!["hair-scalp-consultation"]("ui", {
        cssVarsPerTheme: { dark: { "cal-brand": "#cf90ff" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      })

      // Inline embed
      window.Cal!.ns!["hair-scalp-consultation"]("inline", {
        elementOrSelector: "#cal-inline-embed",
        calLink: "sifa-mondika-3a3k71/hair-scalp-consultation",
        layout: "month_view",
      })
    }

    initCal()
  }, [])

  return (
    <div className="min-h-screen bg-bg text-text">

      {/* ── HERO ── */}
      <section className="pt-[64px]" style={{ backgroundColor: "var(--bg-lavender)" }}>
        <div className="max-w-[900px] mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } }, hidden: {} }}
          >
            <motion.p
              variants={fadeInUp}
              className="text-[10px] md:text-xs font-light tracking-[0.2em] uppercase mb-6"
              style={{ color: "var(--lavender)" }}
            >
              &mdash; HAIR &amp; SCALP CONSULTATION
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-heading text-4xl md:text-6xl font-light tracking-widest leading-[1.1] mb-6"
            >
              Book Online
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide max-w-md mx-auto"
            >
              Schedule a personalized hair &amp; scalp consultation with Sifa. Choose a time that works for you — the calendar below will let you book directly.
            </motion.p>
          </motion.div>
        </div>
        {/* Lavender accent bar */}
        <div className="h-[3px]" style={{ background: "linear-gradient(90deg, var(--lavender-deep), var(--lavender), var(--sage))" }} />
      </section>

      {/* ── CAL EMBED ── */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-bg">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-none overflow-hidden"
            style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-lavender)" }}
          >
            <div
              id="cal-inline-embed"
              style={{ width: "100%", minHeight: "700px", overflow: "hidden" }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
