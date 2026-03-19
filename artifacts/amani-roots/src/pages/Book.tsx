import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
    id: "hair-scalp-consultation",
    calLink: "sifa-mondika-3a3k71/hair-scalp-consultation",
    namespace: "hair-scalp-consultation",
    label: "Hair & Scalp Consultation",
    duration: "30 min",
    description:
      "A personalized 1-on-1 session to assess your scalp health and build a care routine tailored to your hair goals.",
    tag: "Complimentary",
    available: true,
  },
  {
    id: "growth-check-in",
    calLink: null,
    namespace: null,
    label: "Growth Check-In",
    duration: "15 min",
    description:
      "A quick follow-up to review your progress, adjust your routine, and answer any questions about your journey.",
    tag: "Coming Soon",
    available: false,
  },
  {
    id: "group-workshop",
    calLink: null,
    namespace: null,
    label: "Group Workshop",
    duration: "60 min",
    description:
      "An immersive group session covering scalp health fundamentals and botanical hair care rituals.",
    tag: "Coming Soon",
    available: false,
  },
]

function loadCalScript(callback: () => void) {
  if (typeof window === "undefined") return
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
          s.onload = callback
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
}

export default function Book() {
  const [selected, setSelected] = useState<string | null>(null)
  const [calReady, setCalReady] = useState(false)
  const calInitialized = useRef<Set<string>>(new Set())
  const calSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadCalScript(() => setCalReady(true))
    // If script already loaded
    if (window.Cal?.loaded) setCalReady(true)
  }, [])

  useEffect(() => {
    if (!selected || !calReady) return

    const svc = services.find((s) => s.id === selected)
    if (!svc?.calLink || !svc.namespace) return
    if (calInitialized.current.has(selected)) return

    calInitialized.current.add(selected)

    const elementId = `cal-embed-${selected}`

    window.Cal!("init", svc.namespace, { origin: "https://app.cal.com" })
    window.Cal!.ns![svc.namespace]("ui", {
      cssVarsPerTheme: { light: { "cal-brand": "#9B72C8" }, dark: { "cal-brand": "#cf90ff" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    })
    window.Cal!.ns![svc.namespace]("inline", {
      elementOrSelector: `#${elementId}`,
      calLink: svc.calLink,
      layout: "month_view",
    })

    // Scroll to calendar
    setTimeout(() => {
      calSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 150)
  }, [selected, calReady])

  const handleSelect = (id: string) => {
    if (selected === id) return
    setSelected(id)
  }

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
              style={{ color: "var(--sage)" }}
            >
              &mdash; CONSULTATIONS &amp; SESSIONS
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
              Choose a session below, then select a date and time that works for you.
            </motion.p>
          </motion.div>
        </div>
        <div className="h-[3px]" style={{ background: "linear-gradient(90deg, var(--lavender-deep), var(--lavender), var(--sage))" }} />
      </section>

      {/* ── SERVICE SELECTION ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-bg border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[10px] md:text-xs font-light tracking-[0.2em] uppercase mb-10"
            style={{ color: "var(--sage)" }}
          >
            &mdash; SELECT A SESSION
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {services.map((svc, i) => {
              const isSelected = selected === svc.id
              return (
                <motion.button
                  key={svc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  onClick={() => svc.available && handleSelect(svc.id)}
                  disabled={!svc.available}
                  className="text-left w-full p-6 md:p-8 transition-all duration-300 relative group"
                  style={{
                    border: isSelected
                      ? "2px solid var(--lavender)"
                      : "2px solid var(--border)",
                    backgroundColor: isSelected
                      ? "var(--bg-lavender)"
                      : svc.available
                      ? "var(--bg)"
                      : "var(--bg-cream)",
                    cursor: svc.available ? "pointer" : "default",
                    opacity: svc.available ? 1 : 0.65,
                  }}
                >
                  {/* Tag */}
                  <span
                    className="inline-block text-[9px] font-light tracking-[0.18em] uppercase px-2.5 py-1 mb-5"
                    style={{
                      backgroundColor: svc.available ? "var(--lavender)" : "var(--border)",
                      color: svc.available ? "#fff" : "var(--text-muted)",
                    }}
                  >
                    {svc.tag}
                  </span>

                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-heading text-xl md:text-2xl font-light tracking-widest leading-[1.2]">
                      {svc.label}
                    </h3>
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full border-2 mt-1 transition-colors duration-300"
                      style={{
                        borderColor: isSelected ? "var(--lavender)" : "var(--border)",
                        backgroundColor: isSelected ? "var(--lavender)" : "transparent",
                      }}
                    />
                  </div>

                  <p className="text-[10px] font-light tracking-[0.15em] uppercase mb-4" style={{ color: "var(--sage)" }}>
                    {svc.duration}
                  </p>

                  <p className="text-sm font-light leading-[1.8] tracking-wide" style={{ color: "var(--text-muted)" }}>
                    {svc.description}
                  </p>

                  {svc.available && (
                    <p
                      className="mt-6 text-[10px] font-light tracking-[0.15em] uppercase transition-colors duration-300"
                      style={{ color: isSelected ? "var(--lavender)" : "var(--sage)" }}
                    >
                      {isSelected ? "Selected — see calendar below ↓" : "Click to select →"}
                    </p>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CAL EMBED — only visible after selection ── */}
      <AnimatePresence>
        {selected && (
          <motion.section
            ref={calSectionRef}
            key="cal-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="px-0 md:px-0 bg-bg"
          >
            {services.map((svc) =>
              svc.id === selected && svc.available ? (
                <div key={svc.id} style={{ width: "100%" }}>
                  <div
                    id={`cal-embed-${svc.id}`}
                    style={{
                      width: "100%",
                      height: "clamp(600px, 85vh, 900px)",
                      overflow: "hidden",
                    }}
                  />
                </div>
              ) : null
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Prompt if nothing selected */}
      {!selected && (
        <div className="py-20 px-6 text-center">
          <p className="text-sm font-light tracking-wide" style={{ color: "var(--text-muted)" }}>
            Select a session above to view available times.
          </p>
        </div>
      )}
    </div>
  )
}
