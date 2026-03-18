import React from "react"
import { motion } from "framer-motion"
import { Link } from "wouter"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0, 0.2, 1] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const eyebrow = "text-[10px] md:text-xs font-light tracking-[0.2em] uppercase mb-6"
const eyebrowStyle = { color: "var(--sage)" }

const BASE = typeof import.meta !== "undefined" ? import.meta.env.BASE_URL : "/"

export default function About() {
  return (
    <div className="min-h-screen bg-bg text-text">

      {/* ── HERO — founder image ── */}
      <section className="relative w-full pt-[72px]" style={{ backgroundColor: "var(--bg-mist)" }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          <div className="lg:col-span-7 overflow-hidden" style={{ aspectRatio: "4/3", maxHeight: "60vw" }}>
            <img
              src={`${BASE}assets/founder.jpg`}
              alt="Sifa Mondika, Founder of Amani Roots Oils"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-5 flex items-center px-8 md:px-12 lg:px-16 py-16 lg:py-0" style={{ backgroundColor: "var(--bg-mist)" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              <p className={eyebrow} style={eyebrowStyle}>&mdash; THE GENESIS</p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-widest leading-[1.1] mb-6">
                The Story Behind<br /><span className="italic" style={{ color: "var(--forest)" }}>Amani Roots</span>
              </h1>
              <p className="text-sm text-text-muted font-light leading-[1.9] tracking-wide max-w-sm">
                Amani Roots grew from a personal journey into something much bigger.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STORY INTRO ── */}
      <section className="py-28 md:py-48 px-6 md:px-12" style={{ backgroundColor: "var(--bg-cream)", borderTop: "2px solid var(--sage)" }}>
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className={eyebrow} style={eyebrowStyle}>&mdash; OUR STORY</motion.p>
            <motion.h2 variants={fadeInUp} className="font-heading text-3xl md:text-5xl font-light tracking-widest leading-[1.2] mb-10">
              From Curiosity to<br /><span className="italic" style={{ color: "var(--forest)" }}>Community</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-sm md:text-base text-text-muted font-light leading-[2] tracking-wide mb-8">
              Amani Roots grew from a personal journey into something much bigger. What began as a quiet ritual of learning, experimenting, and understanding the science behind scalp health has evolved into a brand dedicated to helping women care for the foundation of their hair.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-sm md:text-base text-text-muted font-light leading-[2] tracking-wide mb-8">
              Along the way, I realized that healthy hair doesn&rsquo;t begin with styling products &mdash; it begins at the roots. When the scalp is nourished and supported with the right ingredients, hair has the environment it needs to grow.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-sm md:text-base text-text-muted font-light leading-[2] tracking-wide">
              Amani Roots was born from the realization that healthy hair begins at the root. What started as a personal journey to understand and care for the scalp has grown into a brand dedicated to helping women nurture the foundation of their hair through intentional education and botanical care. By blending science with powerful herbs and nourishing oils, Amani Roots focuses on creating the conditions where hair can truly thrive.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-28 md:py-48 px-6 md:px-12 bg-bg border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden" style={{ aspectRatio: "3/4", maxHeight: "55vw", boxShadow: "var(--shadow-green)" }}>
              <img
                src={`${BASE}assets/holding-bottle.png`}
                alt="Woman holding Amani Roots oil"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:col-span-7 lg:pl-8"
          >
            <motion.p variants={fadeInUp} className={eyebrow} style={eyebrowStyle}>&mdash; OUR MISSION</motion.p>
            <motion.h2 variants={fadeInUp} className="font-heading text-3xl md:text-5xl font-light tracking-widest leading-[1.2] mb-10">
              Cherish Your Roots
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-sm md:text-base text-text-muted font-light leading-[2] tracking-wide">
              Our mission is to replace the pressure to conform with the pride of heritage. Through education and artisanal botanical blends, we empower every woman to embrace her unique beauty. At Amani Roots, we believe that when you cherish your roots, you stand taller, rooted in the strength of exactly who you are meant to be.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── FOUNDER'S JOURNEY ── */}
      <section className="py-28 md:py-48 px-6 md:px-12 border-t" style={{ backgroundColor: "var(--bg-mist)", borderColor: "var(--border)" }}>
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className={eyebrow} style={eyebrowStyle}>&mdash; FOUNDER&rsquo;S JOURNEY</motion.p>
            <motion.h2 variants={fadeInUp} className="font-heading text-3xl md:text-5xl font-light tracking-widest leading-[1.2] mb-10">
              The Roots of My Confidence
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-sm md:text-base text-text-muted font-light leading-[2] tracking-wide mb-8">
              For years, my hair wouldn&rsquo;t grow the way I wanted it to.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-sm md:text-base text-text-muted font-light leading-[2] tracking-wide mb-8">
              I tried everything. I spent hours watching YouTube natural hair girlies, following routines, buying products everyone swore by, and hoping something would finally work for me. But even after all that, I still felt like I didn&rsquo;t understand my own hair&rsquo;s language. My hair would grow a little, then break. Some products made it dry. Others made it heavy. I kept asking myself the same question: why does everyone else seem to figure it out except me?
            </motion.p>

            <motion.p variants={fadeInUp} className="text-sm md:text-base text-text-muted font-light leading-[2] tracking-wide mb-8">
              Eventually, that frustration turned into curiosity. As a biology and computational neuroscience student, I began to view hair care differently. Instead of just following trends, I began learning about the science behind the scalp, hair follicles, and plant nutrients. I realized that healthy hair doesn&rsquo;t start with styling products &mdash; it starts with a healthy scalp.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-sm md:text-base text-text-muted font-light leading-[2] tracking-wide mb-8">
              That&rsquo;s where the idea for Amani Roots Oils began.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-sm md:text-base text-text-muted font-light leading-[2] tracking-wide mb-8">
              I started researching herbs and botanical oils that have been used for generations and studying how they support scalp health and hair strength. By combining traditional botanical knowledge with scientific understanding, I created a formula with 7 herbs and 3 nourishing oils designed to support stronger, healthier hair from the roots.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-sm md:text-base text-text-muted font-light leading-[2] tracking-wide mb-8">
              Amani Roots Oils was created to help women reconnect with their natural hair and care for it with intention, knowledge, and confidence.
            </motion.p>

            <motion.p variants={fadeInUp} className="font-heading text-2xl md:text-3xl italic font-light tracking-widest leading-[1.4]" style={{ color: "var(--forest)" }}>
              Because healthy hair begins at the roots.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── FOUNDER SIGN-OFF ── */}
      <section className="py-28 md:py-48 px-6 md:px-12 bg-bg border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <motion.div variants={fadeInUp} className="w-8 h-[2px] mb-8" style={{ backgroundColor: "var(--sage)" }} />
            <motion.p variants={fadeInUp} className="font-heading text-3xl md:text-4xl font-light tracking-widest leading-[1.3] mb-4">
              Sifa Mondika
            </motion.p>
            <motion.p variants={fadeInUp} className="text-text-muted text-sm font-light tracking-[0.1em] uppercase mb-10">
              Founder & CEO
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href="/shop"
                className="inline-block text-xs font-body font-light tracking-[0.15em] uppercase px-8 py-3 transition-all duration-300 hover:opacity-80"
                style={{ backgroundColor: "var(--forest)", color: "#fff" }}
              >
                Shop Our Blends &rarr;
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <div className="overflow-hidden" style={{ aspectRatio: "4/3", maxWidth: "440px", boxShadow: "var(--shadow-green)" }}>
              <img
                src={`${BASE}assets/herbs-grid-1.png`}
                alt="Amani Roots botanical herbs"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
