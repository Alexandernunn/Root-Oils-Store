import React from "react"
import { motion } from "framer-motion"
import { Link } from "wouter"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const eyebrow = "text-[10px] md:text-xs font-light tracking-[0.2em] uppercase mb-6"
const eyebrowStyle = { color: "var(--sage)" }
const BASE = typeof import.meta !== "undefined" ? import.meta.env.BASE_URL : "/"

const faqs = [
  {
    q: "What makes your oil different from others on the market?",
    a: "Our formula is cold-infused over several weeks, allowing the herbs to slowly release their potent properties into the carrier oils without heat damage. We also use a very specific ratio of lightweight and heavy oils to ensure penetration without buildup.",
  },
  {
    q: "How often should I use the Botanical Hair Growth Oil?",
    a: "For best results, we recommend applying to the scalp 2-3 times a week, massaging gently for 5 minutes. You can also use a few drops daily on the ends of your hair to seal in moisture.",
  },
  {
    q: "Is this suitable for all hair types?",
    a: "Yes! While formulated with textured and natural hair in mind, our oil's balanced molecular weight makes it effective for straight, wavy, curly, and coily hair types.",
  },
  {
    q: "When will I start seeing results?",
    a: "Most of our community notices increased softness and reduced shedding within the first 2-3 weeks. Noticeable thickness and new growth typically appear between 8-12 weeks of consistent use, as this aligns with the natural hair growth cycle.",
  },
  {
    q: "Is it safe for a sensitive scalp?",
    a: "Our ingredients are 100% natural and chosen for their soothing properties. However, as with any potent botanical product, we recommend doing a patch test on your inner arm 24 hours before full scalp application.",
  },
  {
    q: "Can I use this while wearing protective styles?",
    a: "Absolutely. The pointed applicator nozzle makes it incredibly easy to reach your scalp while wearing braids, locs, or weaves, keeping your roots nourished and preventing tension breakage.",
  },
  {
    q: "How long does one bottle last?",
    a: "With 2-3 applications per week to the scalp, an 8oz bottle typically lasts 6-8 weeks. A 4oz bottle is a great option to start your journey or for travel.",
  },
  {
    q: "Is Amani Roots Oils cruelty-free?",
    a: "Yes — always. We never test on animals and are committed to ethical, sustainable sourcing for every ingredient in our formula.",
  },
]

export default function Faq() {
  return (
    <div className="min-h-screen bg-bg text-text">

      {/* ── HERO ── */}
      <section className="pt-[82px] sm:pt-[64px] pb-20 md:pb-32 px-6 md:px-12 border-b" style={{ backgroundColor: "var(--bg-lavender)", borderColor: "var(--border)" }}>
        <div className="max-w-[1000px] mx-auto pt-16 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className={eyebrow} style={eyebrowStyle}>&mdash; FREQUENTLY ASKED</p>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light tracking-widest leading-[1.05] mb-6">
              Questions &<br /><span className="italic" style={{ color: "var(--forest)" }}>Answers</span>
            </h1>
            <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide max-w-lg mt-8">
              Everything you need to know about Amani Roots Oils, our botanical formula, and your natural hair journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ LIST ── */}
      <section className="py-20 md:py-36 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full border-t" style={{ borderColor: "var(--border)" }}>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b py-2" style={{ borderColor: "var(--border)" }}>
                  <AccordionTrigger
                    className="text-base md:text-lg font-body font-light text-text py-6 hover:no-underline transition-colors text-left"
                    style={{ color: "var(--text)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--forest)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-light leading-[1.9] tracking-wide pb-8 pr-10 text-sm" style={{ color: "var(--text-muted)" }}>
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-24 md:mt-36 pt-16 border-t text-center"
            style={{ borderColor: "var(--border)" }}
          >
            <p className={eyebrow + " text-center"} style={eyebrowStyle}>STILL HAVE QUESTIONS?</p>
            <h2 className="font-heading text-3xl md:text-5xl font-light tracking-widest mb-8">
              We&rsquo;re Here to Help
            </h2>
            <p className="text-sm text-text-muted font-light leading-[1.9] tracking-wide max-w-md mx-auto mb-10">
              Reach out to us directly or explore our collection to find the right product for your hair journey.
            </p>
            <Link
              href="/shop"
              className="inline-block text-xs font-body font-light tracking-[0.15em] uppercase px-8 py-4 transition-all duration-300 hover:opacity-80"
              style={{ backgroundColor: "var(--forest)", color: "#fff" }}
            >
              Shop the Collection &rarr;
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
