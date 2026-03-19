import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

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
  const [openService, setOpenService] = useState<(typeof services)[0] | null>(null)
  const embedRef = useRef<HTMLDivElement>(null)
  const nsRef = useRef<string | null>(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (openService) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [openService])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Mount Cal embed once modal + embed div are in the DOM
  useEffect(() => {
    if (!openService) return

    // Give the modal a frame to fully mount, then init Cal
    const timer = setTimeout(async () => {
      if (!embedRef.current) return

      await ensureCalScript()

      // Use a unique namespace per open so Cal always re-initializes
      const ns = `${openService.id}-${Date.now()}`
      nsRef.current = ns

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
        elementOrSelector: embedRef.current,
        calLink: openService.calLink,
        layout: "month_view",
      })
    }, 80)

    return () => clearTimeout(timer)
  }, [openService])

  const closeModal = useCallback(() => setOpenService(null), [])

  return (
    <div className="min-h-screen bg-bg text-text">

      {/* ── CENTERED MAIN CONTENT ── */}
      <section
        className="pt-[64px] flex flex-col items-center justify-center px-4 md:px-8"
        style={{ minHeight: "calc(100svh - 64px)", backgroundColor: "var(--bg-lavender)" }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } }, hidden: {} }}
          className="w-full max-w-[900px] mx-auto text-center mb-8 md:mb-12"
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
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-light tracking-widest leading-[1.1] mb-3"
          >
            Book Online
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xs md:text-sm text-text-muted font-light leading-[1.9] tracking-wide"
          >
            Choose a session to open the booking calendar.
          </motion.p>
        </motion.div>

        {/* ── SERVICE CARDS — side by side on all screens ── */}
        <div className="w-full max-w-[900px] mx-auto grid grid-cols-2 gap-3 md:gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.12 }}
              className="flex flex-col justify-between p-4 md:p-8 border"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
            >
              <div className="mb-4 md:mb-6">
                <span
                  className="inline-block text-[7px] md:text-[9px] font-light tracking-[0.15em] uppercase px-2 py-1 mb-3 md:mb-4"
                  style={{ backgroundColor: "var(--lavender)", color: "#fff" }}
                >
                  {svc.tag}
                </span>
                <h3 className="font-heading text-base sm:text-xl md:text-2xl font-light tracking-widest leading-[1.2] mb-1 md:mb-2">
                  {svc.label}
                </h3>
                <p className="text-[8px] md:text-[10px] font-light tracking-[0.15em] uppercase mb-2 md:mb-4" style={{ color: "var(--sage)" }}>
                  {svc.duration}
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-light leading-[1.8] tracking-wide hidden sm:block" style={{ color: "var(--text-muted)" }}>
                  {svc.description}
                </p>
              </div>

              <button
                onClick={() => setOpenService(svc)}
                className="w-full text-[8px] md:text-xs font-body font-light tracking-[0.12em] uppercase px-3 py-2.5 md:px-6 md:py-3.5 transition-all duration-300 hover:opacity-80"
                style={{ backgroundColor: "var(--forest)", color: "#fff" }}
              >
                Book Now &rarr;
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CALENDAR MODAL ── */}
      <AnimatePresence>
        {openService && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100]"
              style={{ backgroundColor: "rgba(20,18,15,0.72)", backdropFilter: "blur(4px)" }}
              onClick={closeModal}
            />

            {/* Modal panel */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ duration: 0.3, ease: [0.2, 0, 0.2, 1] }}
              className="fixed z-[101] flex flex-col"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "min(96vw, 900px)",
                height: "min(92vh, 820px)",
                backgroundColor: "#fff",
                boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
              }}
            >
              {/* Modal header */}
              <div
                className="flex items-center justify-between px-6 md:px-8 py-5 flex-shrink-0 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <div>
                  <p className="text-[9px] font-light tracking-[0.18em] uppercase mb-0.5" style={{ color: "var(--sage)" }}>
                    Booking
                  </p>
                  <p className="font-heading text-lg md:text-xl font-light tracking-widest">
                    {openService.label}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="flex items-center justify-center w-9 h-9 transition-opacity hover:opacity-60"
                  aria-label="Close"
                  style={{ color: "var(--text)" }}
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Cal embed */}
              <div className="flex-1 overflow-hidden">
                <div
                  ref={embedRef}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
