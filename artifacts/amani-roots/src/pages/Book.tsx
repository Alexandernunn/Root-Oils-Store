import React, { useEffect, useRef } from "react"
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

const services = [
  {
    id: "consultation",
    calLink: "sifa-mondika-3a3k71/hair-scalp-consultation",
    label: "Hair & Scalp Consultation",
    duration: "30 min",
    description:
      "A personalized 1-on-1 session to assess your scalp health and build a care routine tailored to your hair goals.",
    tag: "Reserve Your Spot",
  },
  {
    id: "course",
    calLink: "sifa-mondika-3a3k71/hair-care-course",
    label: "Hair Care Course",
    duration: "60 min",
    description:
      "An in-depth course covering scalp science, botanical ingredients, and building a lasting natural hair care ritual.",
    tag: "Reserve Your Spot",
  },
]

function ensureCalScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return
    if (window.Cal?.loaded) { resolve(); return }

    ;(function (C: Window, A: string, L: string) {
      const p = (a: Window["Cal"], ar: unknown[]) => a!.q!.push(ar)
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
            s.onload = () => resolve()
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
  })
}

export default function Book() {
  const embedRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Mount Cal embeds for both services
  useEffect(() => {
    const initCals = async () => {
      await ensureCalScript()

      for (const svc of services) {
        const embedDiv = embedRefs.current[svc.id]
        if (!embedDiv) continue

        const ns = `${svc.id}-booking`

        window.Cal!("init", ns, { origin: "https://app.cal.com" })
        window.Cal!.ns![ns]("ui", {
          cssVarsPerTheme: {
            light: { "cal-brand": "#9B72C8" },
            dark: { "cal-brand": "#cf90ff" },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        })
        window.Cal!.ns![ns]("inline", {
          elementOrSelector: embedDiv,
          calLink: svc.calLink,
          layout: "month_view",
        })
      }
    }

    initCals()
  }, [])

  return (
    <div className="min-h-screen bg-bg text-text">

      {/* ── HERO ── */}
      <section className="pt-[64px] px-4 md:px-8" style={{ backgroundColor: "var(--bg-lavender)" }}>
        <div className="max-w-[1200px] mx-auto py-12 md:py-16 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } }, hidden: {} }}
          >
            <motion.p
              variants={fadeInUp}
              className="text-[10px] md:text-xs font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--sage)" }}
            >
              &mdash; CONSULTATIONS &amp; SESSIONS
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-heading text-3xl md:text-5xl font-light tracking-widest leading-[1.1] mb-3"
            >
              Book Online
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xs md:text-sm text-text-muted font-light leading-[1.9] tracking-wide"
            >
              Select a session below and reserve your spot.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CALENDARS SECTION ── */}
      <section className="px-4 md:px-8 py-12 md:py-20 bg-bg">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                className="flex flex-col"
              >
                {/* Service header */}
                <div className="mb-6">
                  <span
                    className="inline-block text-[8px] md:text-[9px] font-light tracking-[0.15em] uppercase px-2.5 py-1 mb-3"
                    style={{ backgroundColor: "var(--lavender)", color: "#fff" }}
                  >
                    {svc.tag}
                  </span>
                  <h2 className="font-heading text-xl md:text-2xl font-light tracking-widest leading-[1.2] mb-2">
                    {svc.label}
                  </h2>
                  <p className="text-[9px] md:text-[10px] font-light tracking-[0.15em] uppercase mb-3" style={{ color: "var(--sage)" }}>
                    {svc.duration}
                  </p>
                  <p className="text-xs md:text-sm font-light leading-[1.8] tracking-wide" style={{ color: "var(--text-muted)" }}>
                    {svc.description}
                  </p>
                </div>

                {/* Cal embed */}
                <div
                  ref={(el) => { if (el) embedRefs.current[svc.id] = el }}
                  style={{ minHeight: "500px" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
