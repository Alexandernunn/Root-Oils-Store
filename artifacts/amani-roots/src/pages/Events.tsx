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

const BASE = typeof import.meta !== "undefined" ? import.meta.env.BASE_URL : "/"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0, 0.2, 1] } },
}

const events = [
  {
    id: "qa",
    namespace: "community-q-a-session",
    calLink: "sifa-mondika-3a3k71/community-q-a-session",
    label: "Community Q&A Session",
    duration: "15 min · Cal Video",
    tag: "Free · Open to All",
    description:
      "An open conversation where you can ask questions about scalp care, hair growth routines, and how to use Amani Roots products effectively. A supportive space to learn, share experiences, and receive real guidance on building healthier hair habits.",
    image: `${BASE}assets/event-qa.jpeg`,
    imageAlt: "Community of women laughing and connecting",
  },
  {
    id: "workshop",
    namespace: "hair-growth-worshop",
    calLink: "sifa-mondika-3a3k71/hair-growth-worshop",
    label: "Hair Growth Workshop",
    duration: "15 min · Cal Video",
    tag: "Live Workshop",
    description:
      "We explore the science behind healthy scalp care and hair growth — how scalp health affects growth, the role of natural herbs and oils, and how to build a simple routine that supports stronger, healthier hair. Practical, rooted knowledge you can use immediately.",
    image: `${BASE}assets/event-workshop.jpg`,
    imageAlt: "Women resting together with roses",
  },
  {
    id: "course",
    namespace: "hair-care-course",
    calLink: "sifa-mondika-3a3k71/hair-care-course",
    label: "Hair Care Course",
    duration: "60 min · Cal Video",
    tag: "In-Depth Course",
    description:
      "An immersive course covering scalp science, botanical ingredients, and the art of building a lasting natural hair care ritual. Walk away with a personalised plan crafted around your hair type, lifestyle, and growth goals.",
    image: `${BASE}assets/event-course.avif`,
    imageAlt: "Women at a hair care event",
  },
]

function initCal() {
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

  const uiConfig = {
    cssVarsPerTheme: { light: { "cal-brand": "#9B72C8" }, dark: { "cal-brand": "#cf90ff" } },
    hideEventTypeDetails: false,
    layout: "month_view",
  }

  window.Cal!("init", "community-q-a-session", { origin: "https://app.cal.com" })
  window.Cal!.ns!["community-q-a-session"]("ui", uiConfig)

  window.Cal!("init", "hair-growth-worshop", { origin: "https://app.cal.com" })
  window.Cal!.ns!["hair-growth-worshop"]("ui", uiConfig)

  window.Cal!("init", "hair-care-course", { origin: "https://app.cal.com" })
  window.Cal!.ns!["hair-care-course"]("ui", uiConfig)
}

export default function Events() {
  useEffect(() => {
    initCal()
  }, [])

  return (
    <div className="min-h-screen bg-bg text-text">

      {/* ── HERO ── */}
      <section
        className="pt-[82px] sm:pt-[64px] px-6 md:px-12 py-20 md:py-28 text-center"
        style={{ backgroundColor: "var(--bg-lavender)" }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } }, hidden: {} }}
          className="max-w-2xl mx-auto"
        >
          <motion.p
            variants={fadeInUp}
            className="text-[10px] md:text-xs font-light tracking-[0.2em] uppercase mb-5"
            style={{ color: "var(--sage)" }}
          >
            &mdash; EVENTS &amp; SESSIONS
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-light tracking-widest leading-[1.1] mb-6"
          >
            Join the Conversation
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-sm text-text-muted font-light leading-[1.9] tracking-wide"
          >
            Live sessions, workshops, and community gatherings — all rooted in natural hair care. Choose an event below to reserve your spot.
          </motion.p>
        </motion.div>
      </section>

      {/* ── EVENT CARDS ── */}
      <section className="py-20 md:py-32 px-6 md:px-12" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {events.map((evt, i) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.13, ease: [0.2, 0, 0.2, 1] }}
              className="flex flex-col border"
              style={{ borderColor: "var(--border)" }}
            >
              {/* Image */}
              <div className="w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src={evt.image}
                  alt={evt.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-6 md:p-7" style={{ backgroundColor: "var(--bg)" }}>
                <span
                  className="inline-block self-start text-[8px] font-light tracking-[0.15em] uppercase px-2 py-1 mb-4"
                  style={{ backgroundColor: "var(--lavender)", color: "#fff" }}
                >
                  {evt.tag}
                </span>

                <h3 className="font-heading text-xl md:text-2xl font-light tracking-widest leading-[1.2] mb-2">
                  {evt.label}
                </h3>

                <p
                  className="text-[9px] font-light tracking-[0.15em] uppercase mb-4"
                  style={{ color: "var(--sage)" }}
                >
                  {evt.duration}
                </p>

                <p
                  className="text-xs font-light leading-[1.9] tracking-wide mb-6 flex-grow"
                  style={{ color: "var(--text-muted)" }}
                >
                  {evt.description}
                </p>

                {/* Cal.com element-click popup trigger */}
                <button
                  data-cal-link={evt.calLink}
                  data-cal-namespace={evt.namespace}
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                  className="w-full text-[9px] font-body font-light tracking-[0.15em] uppercase px-6 py-3.5 transition-all duration-300 hover:opacity-80 cursor-pointer"
                  style={{ backgroundColor: "var(--forest)", color: "#fff" }}
                >
                  Reserve Your Spot &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM ACCENT ── */}
      <section
        className="py-20 md:py-28 px-6 text-center border-t"
        style={{ backgroundColor: "var(--bg-mist)", borderColor: "var(--border)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-md mx-auto"
        >
          <div className="w-8 h-[2px] mx-auto mb-8" style={{ backgroundColor: "var(--sage)" }} />
          <p className="font-heading text-2xl md:text-3xl font-light tracking-widest leading-[1.4]" style={{ color: "var(--forest)" }}>
            Growth starts with community.
          </p>
          <p className="text-text-muted text-xs font-light leading-[1.9] tracking-wide mt-5">
            Follow us on Instagram for upcoming pop-ups and announcements.
          </p>
          <a
            href="https://www.instagram.com/amaniroots_oils/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 text-[9px] font-body font-light tracking-[0.15em] uppercase px-8 py-3 transition-all duration-300 hover:opacity-80"
            style={{ backgroundColor: "var(--forest)", color: "#fff" }}
          >
            Follow on Instagram &rarr;
          </a>
        </motion.div>
      </section>
    </div>
  )
}
