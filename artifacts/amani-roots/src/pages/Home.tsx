import React, { useRef } from "react"
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

const HERO_GREEN = "#243B2E"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative w-full pt-[64px]" style={{ borderTop: "2px solid var(--sage)" }}>

        {/* ── DESKTOP: text LEFT, video RIGHT ── */}
        <div className="hidden md:flex" style={{ minHeight: "calc(100svh - 64px)" }}>

          {/* Left: text panel */}
          <div className="flex items-center px-14 lg:px-20 xl:px-28" style={{ flex: "1 1 50%", backgroundColor: HERO_GREEN }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.2, 0, 0.2, 1] }}
              className="max-w-md"
            >
              <p className="text-[10px] font-light tracking-[0.2em] uppercase mb-4" style={{ color: "rgba(214,232,220,0.7)" }}>
                ARTISANAL BOTANICAL HAIR CARE
              </p>
              <div className="w-12 h-[1px] mb-8" style={{ backgroundColor: "rgba(122,158,135,0.6)" }} />
              <h1 className="font-heading font-light leading-[1.08] mb-8 tracking-widest" style={{ color: "#F5F0E8", fontSize: "clamp(2.4rem, 4vw, 4.5rem)" }}>
                Honoring the<br />Natural Strength<br />of Every Strand
              </h1>
              <p className="text-sm font-light leading-[1.95] tracking-wide mb-10" style={{ color: "rgba(245,240,232,0.72)", maxWidth: "340px" }}>
                Amani Roots Oils empowers your natural hair journey with artisanal botanical blends designed to nurture, protect, and celebrate your unique heritage.
              </p>
              <Link
                href="/shop"
                className="inline-block text-xs font-body font-light tracking-[0.15em] uppercase px-7 py-3.5 transition-all duration-300 hover:opacity-80"
                style={{ backgroundColor: "var(--sage)", color: "#fff" }}
              >
                Shop the Collection &rarr;
              </Link>
            </motion.div>
          </div>

          {/* Right: 9:16 video */}
          <div className="relative overflow-hidden" style={{ flex: "0 0 46%", maxWidth: "520px" }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover pointer-events-none"
            >
              <source src={`${BASE}assets/hero.mp4`} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* ── MOBILE: same side-by-side split as desktop ── */}
        <div className="md:hidden flex flex-row" style={{ minHeight: "calc(100svh - 64px)" }}>

          {/* Left: dark green text panel */}
          <div className="flex flex-col justify-center px-5 py-10" style={{ flex: "0 0 52%", backgroundColor: HERO_GREEN }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0, 0.2, 1] }}
            >
              <p className="font-light tracking-[0.18em] uppercase mb-3" style={{ fontSize: "8px", color: "rgba(214,232,220,0.65)" }}>
                ARTISANAL BOTANICAL HAIR CARE
              </p>
              <div className="w-8 h-[1px] mb-5" style={{ backgroundColor: "rgba(122,158,135,0.5)" }} />
              <h1 className="font-heading font-light leading-[1.1] mb-4 tracking-widest" style={{ color: "#F5F0E8", fontSize: "clamp(1.25rem, 6.5vw, 1.75rem)" }}>
                Honoring the<br />Natural Strength<br />of Every Strand
              </h1>
              <p className="font-light leading-[1.8] tracking-wide mb-6" style={{ fontSize: "10px", color: "rgba(245,240,232,0.68)" }}>
                Artisanal botanical blends designed to nurture, protect, and celebrate your unique heritage.
              </p>
              <Link
                href="/shop"
                className="inline-block font-body font-light tracking-[0.12em] uppercase transition-all duration-300 hover:opacity-80"
                style={{ backgroundColor: "var(--sage)", color: "#fff", fontSize: "9px", padding: "10px 16px" }}
              >
                Shop the Collection &rarr;
              </Link>
            </motion.div>
          </div>

          {/* Right: hero video */}
          <div className="relative overflow-hidden" style={{ flex: "0 0 48%" }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            >
              <source src={`${BASE}assets/hero.mp4`} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
      {/* ── 2. PHILOSOPHY ────────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12" style={{ backgroundColor: "var(--bg-cream)", borderTop: "2px solid var(--sage)" }}>
        <div className="max-w-[1400px] mx-auto">
          <p className={eyebrow} style={eyebrowStyle}>&mdash; OUR PHILOSOPHY</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1 }}
              className="lg:col-span-5"
            >
              {/* constrain height on mobile so portrait image doesn't dominate small screens */}
              <div
                className="w-full overflow-hidden"
                style={{ aspectRatio: "3/4", maxHeight: "55vw", boxShadow: "var(--shadow-green)" }}
              >
                <img
                  src={`${BASE}assets/botanical-product.avif`}
                  alt="Amani Roots botanical hair oil product"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="lg:col-span-7 lg:pl-12"
            >
              <motion.h2 variants={fadeInUp} className="font-heading text-4xl md:text-6xl lg:text-7xl mb-10 leading-[1.1] font-light tracking-widest">
                Empowering the<br />Natural Hair Journey
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-text-muted text-sm md:text-base font-light mb-10 leading-[1.9] tracking-wide max-w-lg">
                At Amani Roots, our mission is to foster a deeper appreciation for the beauty of natural texture. We provide the artisanal tools and empowerment for every woman to embrace her authentic self with confidence, nourishment, and care.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link href="/founder-story" className="text-xs font-body font-light tracking-[0.1em] transition-colors" style={{ color: "var(--lavender)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--lavender-deep)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--lavender)")}
                >
                  &rarr; Read the Founder's Story
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── 3. THREE PILLARS — 7 Herbs · 3 Oils · Healthy Roots ── */}
      <section className="py-28 md:py-48 px-6 md:px-12 bg-bg border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mb-16 md:mb-24"
          >
            <p className={eyebrow} style={eyebrowStyle}>&mdash; BOTANICAL FORMULA</p>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-text font-light tracking-widest leading-[1.1]">
              7 Herbs &middot; 3 Oils<br />
              <span className="italic" style={{ color: "var(--forest)" }}>Healthy Roots</span>
            </h2>
          </motion.div>

          {/* Botanical pillars — image + text side-by-side on mobile */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 mb-20 md:mb-28">
            {[
              { src: "herbs-grid-1.png", alt: "Botanical herbs" },
              { src: "herbs-grid-2.png", alt: "Botanical oils" },
              { src: "bottle-herbs.png", alt: "Amani Roots oil with botanicals" },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15 }}
                className="overflow-hidden"
                style={{ aspectRatio: "1/1", boxShadow: "var(--shadow-green)" }}
              >
                <img src={`${BASE}assets/${img.src}`} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>

          {/* Three pillars */}
          <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-2 gap-10 md:gap-0 md:divide-x border-t pt-10 md:pt-16" style={{ borderColor: "var(--border)" }}>
            {[
              { src: "herbs-grid-1.png", alt: "Botanical herbs", num: "01", title: "7 Powerful Herbs", desc: "Inspired by both traditional botanicals and modern hair science, our formula brings together seven powerful herbs known to support scalp health and strengthen hair at the root. Each ingredient was carefully chosen to nourish the scalp and support healthier, stronger hair." },
              { src: "herbs-grid-2.png", alt: "Botanical oils", num: "02", title: "3 Nourishing Oils", desc: "A blend of grapeseed, jojoba, and castor oil works together to hydrate the scalp, seal in moisture, and support stronger hair. These lightweight oils nourish your strands without leaving heavy buildup." },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
                className="md:px-8 lg:px-14 first:pl-0 last:pr-0 flex flex-col md:flex-row md:flex-col gap-6 md:gap-0"
              >
                {/* Mobile: image + number side-by-side, text below */}
                <div className="md:hidden flex gap-6 items-start">
                  <div className="overflow-hidden shrink-0" style={{ width: "120px", height: "120px", aspectRatio: "1/1", boxShadow: "var(--shadow-green)" }}>
                    <img src={`${BASE}assets/${pillar.src}`} alt={pillar.alt} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-[10px] uppercase tracking-[0.2em] mb-2 font-light" style={{ color: "var(--sage)" }}>{pillar.num}</div>
                    <h3 className="font-heading text-lg font-light tracking-widest">{pillar.title}</h3>
                  </div>
                </div>
                
                {/* Mobile: description */}
                <p className="md:hidden text-text-muted text-sm font-light leading-[1.9] tracking-wide">{pillar.desc}</p>

                {/* Desktop: number, title, description stacked */}
                <div className="hidden md:block">
                  <div className="text-[10px] uppercase tracking-[0.2em] mb-6 font-light" style={{ color: "var(--sage)" }}>{pillar.num}</div>
                  <h3 className="font-heading text-2xl md:text-3xl mb-5 font-light tracking-widest">{pillar.title}</h3>
                  <p className="text-text-muted text-sm font-light leading-[1.9] tracking-wide">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── 4. SCIENCE ─────────────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 border-t" style={{ backgroundColor: "var(--bg-mist)", borderColor: "var(--border)" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="lg:col-span-6"
            >
              <p className={eyebrow} style={eyebrowStyle}>&mdash; METHODOLOGY</p>
              <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-light tracking-widest mb-10">
                Where Science<br /><span className="italic">Meets</span> Hair Care
              </h2>
              <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide">
                Founded by a biology and computational neuroscience student, Amani Roots blends scientific understanding with botanical traditions to support scalp health and natural hair growth. Healthy roots create the environment where hair can thrive.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-6"
            >
              <div
                className="overflow-hidden mx-auto"
                style={{ aspectRatio: "4/5", maxWidth: "380px", maxHeight: "60vw", boxShadow: "var(--shadow-green)" }}
              >
                <img
                  src={`${BASE}assets/science-image.avif`}
                  alt="Where science meets hair care"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── 5. PRODUCT SPOTLIGHT ──────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 bg-bg border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-6 order-2 lg:order-1"
            >
              <p className={eyebrow} style={eyebrowStyle}>&mdash; SIGNATURE FORMULA</p>
              <motion.h2 variants={fadeInUp} className="font-heading text-4xl md:text-6xl mb-6 font-light tracking-widest">
                Botanical Hair<br />Growth Oil
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-text-muted text-sm md:text-base font-light leading-[1.9] tracking-wide mb-12">
                A lightweight botanical oil designed to nourish the scalp, strengthen hair strands, and support natural growth. Cold-infused over weeks, never rushed.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-6 w-full">
                <Link
                  href="/shop"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-block text-xs font-body font-light tracking-[0.15em] uppercase px-8 py-3 transition-all duration-300 hover:opacity-80"
                  style={{ backgroundColor: "var(--forest)", color: "#fff" }}
                >
                  Shop 8oz
                </Link>
                <Link
                  href="/shop"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-block text-xs font-body font-light tracking-[0.15em] uppercase px-8 py-3 transition-all duration-300 hover:opacity-80"
                  style={{ backgroundColor: "transparent", color: "var(--forest)", border: "2px solid var(--forest)" }}
                >Shop 4oz </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:col-span-6 order-1 lg:order-2"
            >
              <div
                className="overflow-hidden mx-auto"
                style={{ aspectRatio: "3/4", maxWidth: "460px", maxHeight: "60vw", boxShadow: "var(--shadow-green)" }}
              >
                <img
                  src={`${BASE}assets/bottle-flatlay.png`}
                  alt="Amani Roots oil with herbs and botanicals"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── 6. TESTIMONIALS ────────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 border-t" style={{ backgroundColor: "var(--bg-cream)", borderColor: "var(--border)" }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 md:mb-32"
          >
            <p className={eyebrow} style={eyebrowStyle}>&mdash; SUCCESS STORIES</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light tracking-widest leading-[1.1]">What Our Community Says</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-12">
            {[
              { name: "Priscilla T.", text: "My curls have never felt more hydrated. Amani Roots is a game-changer for my transition journey. Thank you so much!", img: `${BASE}assets/testimonial-1.jpg` },
              { name: "Naomi T.", text: "The thickness and shine I've gained are incredible. I finally feel confident with my natural texture.", img: `${BASE}assets/testimonial-2.jpg` },
              { name: "Catarina V.", text: "It's more than just oil; it's a ritual of self-love. My hair is flourishing like never before.", img: `${BASE}assets/testimonial-3.jpg` },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.9 }}
                className="flex flex-col"
              >
                <div className="overflow-hidden mb-8" style={{ aspectRatio: "4/5", boxShadow: "var(--shadow-green)" }}>
                  <img src={review.img} alt={review.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="relative">
                  <div className="font-heading leading-none absolute -top-10 -left-2 select-none opacity-25" style={{ fontSize: "5rem", color: "var(--sage)" }}>&ldquo;</div>
                  <p className="text-text text-lg md:text-xl font-heading italic font-light leading-relaxed mb-5 relative z-10">
                    {review.text}
                  </p>
                  <div className="w-6 h-[1px] mb-3" style={{ backgroundColor: "var(--sage)" }} />
                  <p className="font-body font-light text-[10px] uppercase tracking-[0.2em] text-text-muted">{review.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── 7. SCALP ───────────────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 bg-bg border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl leading-[1.1] font-light tracking-widest mb-10">
              It Starts<br />With the <span className="italic" style={{ color: "var(--forest)" }}>Scalp</span>
            </h2>
            <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide">
              Many hair problems begin at the scalp. Dryness, breakage, thinning, and slow growth are often signs that the scalp needs nourishment. Amani Roots focuses on creating a healthy foundation so your hair can grow stronger and longer naturally.
            </p>
          </motion.div>
        </div>
      </section>
      {/* ── 8. THE RITUAL ──────────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 border-t" style={{ backgroundColor: "var(--bg-mist)", borderColor: "var(--border)" }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden mx-auto" style={{ aspectRatio: "3/4", maxWidth: "380px", maxHeight: "55vw" }}>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 16px 40px rgba(47,95,72,0.18))" }}
              >
                <img
                  src={`${BASE}assets/bottle-floating.png`}
                  alt="Amani Roots oil bottle"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <p className={eyebrow} style={eyebrowStyle}>&mdash; THE RITUAL</p>
            <h2 className="font-heading text-4xl md:text-5xl leading-[1.1] font-light tracking-widest mb-6">
              Cold-Infused.<br /><span className="italic" style={{ color: "var(--forest)" }}>Never Rushed.</span>
            </h2>
            <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide mb-4 max-w-lg">
              Our formula is infused over several weeks, allowing each herb to slowly release its potent properties into the carrier oils without heat damage. Crafted with intention for your roots.
            </p>
            <p className="text-sm font-light tracking-wide mb-10" style={{ color: "var(--sage)" }}>
              7 Herbs &middot; 3 Oils &middot; Botanical Hair Growth Oil
            </p>
            <Link
              href="/shop"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block text-xs font-body font-light tracking-[0.15em] uppercase px-8 py-3 transition-all duration-300 hover:opacity-80"
              style={{ backgroundColor: "var(--forest)", color: "#fff" }}
            >
              Shop Now &rarr;
            </Link>
          </motion.div>
        </div>
      </section>
      {/* ── 9. EMAIL SIGNUP ────────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 border-t bg-bg" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[560px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className={eyebrow + " text-center"} style={eyebrowStyle}>STAY ROOTED</p>
            <h2 className="font-heading text-4xl md:text-6xl mb-10 font-light tracking-widest leading-[1.1]">Join the Ritual</h2>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="w-full bg-transparent border-0 border-b pb-4 text-sm font-light text-text placeholder:text-text-light focus:outline-none transition-colors rounded-none" style={{ borderColor: "rgba(47,95,72,0.25)" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--sage)")} onBlur={e => (e.currentTarget.style.borderColor = "rgba(47,95,72,0.25)")} />
                <input type="text" placeholder="Last Name" className="w-full bg-transparent border-0 border-b pb-4 text-sm font-light text-text placeholder:text-text-light focus:outline-none transition-colors rounded-none" style={{ borderColor: "rgba(47,95,72,0.25)" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--sage)")} onBlur={e => (e.currentTarget.style.borderColor = "rgba(47,95,72,0.25)")} />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-transparent border-0 border-b pb-4 text-sm font-light text-text placeholder:text-text-light focus:outline-none transition-colors rounded-none" style={{ borderColor: "rgba(47,95,72,0.25)" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--sage)")} onBlur={e => (e.currentTarget.style.borderColor = "rgba(47,95,72,0.25)")} />
              <div className="pt-6">
                <button type="submit" className="w-full text-xs font-body font-light tracking-[0.15em] uppercase py-4 transition-all duration-300 hover:opacity-80" style={{ backgroundColor: "var(--forest)", color: "#fff" }}>
                  Subscribe
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      {/* ── 10. FAQ TEASER → link to /faq ─────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-t" style={{ backgroundColor: "var(--bg-cream)", borderColor: "var(--border)" }}>
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className={eyebrow} style={eyebrowStyle}>&mdash; HAVE QUESTIONS?</p>
            <h2 className="font-heading text-3xl md:text-5xl font-light tracking-widest">Read Our FAQ</h2>
          </div>
          <Link
            href="/faq"
            className="inline-block text-xs font-body font-light tracking-[0.15em] uppercase px-8 py-3.5 transition-all duration-300 hover:opacity-80 shrink-0"
            style={{ backgroundColor: "var(--forest)", color: "#fff" }}
          >
            View All Questions &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
