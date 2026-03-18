import React, { useRef } from "react"
import { motion } from "framer-motion"
import { Link } from "wouter"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-bg text-text">

      {/* ── 1. HERO ─ full-bleed mobile, 9:16 portrait framed desktop ── */}
      <section ref={heroRef} className="relative w-full bg-bg pt-[72px]" style={{ borderTop: "2px solid var(--sage)" }}>
        <div className="relative w-full md:px-12 lg:px-20">
          <div
            className="relative w-full overflow-hidden"
            style={{ height: "calc(100svh - 72px)" }}
            data-hero-container
          >
            <style>{`@media (min-width: 768px) { [data-hero-container] { height: auto; aspect-ratio: 9/16; max-height: 82vh; max-width: 460px; } }`}</style>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={`${BASE}assets/hero-model.png`}
              className="w-full h-full object-cover"
            >
              <source src={`${BASE}assets/hero.mp4`} type="video/mp4" />
            </video>

            <div
              className="absolute inset-0 hidden md:block"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.60) 100%)" }}
            />
            <div
              className="absolute inset-0 md:hidden"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.60) 40%, rgba(0,0,0,0.65) 100%)" }}
            />

          </div>

          {/* Desktop side text next to 9:16 video */}
          <div className="hidden md:flex absolute top-[72px] right-20 lg:right-24 bottom-0 items-center" style={{ maxWidth: "480px", width: "40%" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.2, 0, 0.2, 1] }}
            >
              <p className="text-[10px] font-light tracking-[0.2em] uppercase mb-5" style={{ color: "var(--sage)" }}>
                ARTISANAL BOTANICAL HAIR CARE
              </p>
              <div className="w-16 h-[1px] mb-8" style={{ backgroundColor: "var(--sage)" }} />
              <h1 className="font-heading font-light leading-[1.1] mb-6 tracking-widest" style={{ color: "var(--text)", fontSize: "clamp(2rem, 3.5vw, 4rem)" }}>
                Honoring the<br />Natural Strength<br />of Every Strand
              </h1>
              <p className="text-sm font-light leading-[1.9] tracking-wide text-text-muted mb-10 max-w-sm">
                Amani Roots Oils empowers your natural hair journey with artisanal botanical blends designed to nurture, protect, and celebrate your unique heritage.
              </p>
              <Link
                href="/shop"
                className="inline-block text-xs font-body font-light tracking-[0.15em] uppercase px-6 py-3 transition-all duration-300 hover:opacity-85"
                style={{ backgroundColor: "var(--forest)", color: "#fff" }}
              >
                Shop the Collection &rarr;
              </Link>
            </motion.div>
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
              <div className="w-full overflow-hidden" style={{ aspectRatio: "3/4", boxShadow: "var(--shadow-green)" }}>
                <img
                  src={`${BASE}assets/applying-oil.png`}
                  alt="Applying Amani Roots oil to natural hair"
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
                <Link href="/about" className="text-xs font-body font-light tracking-[0.1em] transition-colors" style={{ color: "var(--sage)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--forest)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--sage)")}
                >
                  &rarr; Read more
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
              7 Herbs &middot; 3 Oils &middot; Healthy Roots
            </h2>
          </motion.div>

          {/* Two botanical images side by side */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-20 md:mb-28">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="overflow-hidden"
              style={{ aspectRatio: "1/1", boxShadow: "var(--shadow-green)" }}
            >
              <img src={`${BASE}assets/herbs-grid-1.png`} alt="Botanical herbs illustration" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15 }}
              className="overflow-hidden"
              style={{ aspectRatio: "1/1", boxShadow: "var(--shadow-green)" }}
            >
              <img src={`${BASE}assets/herbs-grid-2.png`} alt="Botanical oils illustration" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="overflow-hidden col-span-2 md:col-span-1"
              style={{ aspectRatio: "1/1", boxShadow: "var(--shadow-green)" }}
            >
              <img src={`${BASE}assets/bottle-herbs.png`} alt="Amani Roots oil with botanicals" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </div>

          {/* Three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x border-t pt-10 md:pt-16" style={{ borderColor: "var(--border)" }}>
            {[
              { num: "01", title: "7 Powerful Herbs", desc: "Inspired by both traditional botanicals and modern hair science, our formula brings together seven powerful herbs known to support scalp health and strengthen hair at the root. Each ingredient was carefully chosen to help nourish the scalp and support healthier, stronger hair." },
              { num: "02", title: "3 Nourishing Oils", desc: "A blend of grapeseed, jojoba, and castor oil works together to hydrate the scalp, seal in moisture, and support stronger hair. These lightweight oils help nourish your strands without leaving heavy buildup." },
              { num: "03", title: "Healthy Roots", desc: "Healthy hair begins at the scalp. Amani Roots oils are designed to nourish your roots, support scalp balance, and create the foundation for stronger, thriving hair." },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
                className="md:px-8 lg:px-14 first:pl-0 last:pr-0"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] mb-6 font-light" style={{ color: "var(--sage)" }}>{pillar.num}</div>
                <h3 className="font-heading text-2xl md:text-3xl mb-5 font-light tracking-widest">{pillar.title}</h3>
                <p className="text-text-muted text-sm font-light leading-[1.9] tracking-wide">{pillar.desc}</p>
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
              <div className="overflow-hidden ml-auto" style={{ aspectRatio: "3/4", maxWidth: "420px", boxShadow: "var(--shadow-green)" }}>
                <img
                  src={`${BASE}assets/holding-bottle.png`}
                  alt="Woman holding Amani Roots oil"
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
                A lightweight botanical oil designed to nourish the scalp, strengthen hair strands, and support natural growth.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start gap-6">
                <Link
                  href="/shop"
                  className="inline-block text-xs font-body font-light tracking-[0.15em] uppercase px-8 py-3 transition-all duration-300 hover:opacity-80"
                  style={{ backgroundColor: "var(--forest)", color: "#fff" }}
                >
                  Shop 8oz
                </Link>
                <Link
                  href="/shop"
                  className="text-xs font-body font-light tracking-[0.1em] uppercase underline underline-offset-4 hover:underline-offset-8 transition-all py-3"
                  style={{ color: "var(--forest)" }}
                >
                  Shop 4oz &rarr;
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:col-span-6 order-1 lg:order-2"
            >
              <div className="overflow-hidden mx-auto" style={{ aspectRatio: "3/4", maxWidth: "460px", boxShadow: "var(--shadow-green)" }}>
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
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6"
          >
            <h2 className="font-heading text-5xl md:text-7xl leading-[1.1] font-light tracking-widest mb-10">
              It Starts<br />With the <span className="italic" style={{ color: "var(--forest)" }}>Scalp</span>
            </h2>
            <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide">
              Many hair problems begin at the scalp. Dryness, breakage, thinning, and slow growth are often signs that the scalp needs nourishment. Amani Roots focuses on creating a healthy foundation so your hair can grow stronger and longer naturally.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="overflow-hidden ml-auto" style={{ aspectRatio: "3/4", maxWidth: "420px", boxShadow: "var(--shadow-green)" }}>
              <img
                src={`${BASE}assets/bottle-mint.png`}
                alt="Amani Roots oil bottle with mint and herbs"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 8. FLOATING BOTTLE ─────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 border-t" style={{ backgroundColor: "var(--bg-mist)", borderColor: "var(--border)" }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden mx-auto" style={{ aspectRatio: "3/4", maxWidth: "380px" }}>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 16px 40px rgba(47,95,72,0.18))" }}
              >
                <img
                  src={`${BASE}assets/bottle-floating.png`}
                  alt="Amani Roots oil bottle with oil droplets and leaves"
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
            <h2 className="font-heading text-4xl md:text-5xl leading-[1.1] font-light tracking-widest mb-6 italic" style={{ color: "var(--forest)" }}>
              Grow Longer. Shine Brighter.
            </h2>
            <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide mb-10 max-w-lg">
              7 Herbs &middot; 3 Oils &middot; Botanical Hair Growth Oil
            </p>
            <Link
              href="/shop"
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

      {/* ── 10. FAQ ────────────────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 border-t" style={{ backgroundColor: "var(--bg-cream)", borderColor: "var(--border)" }}>
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 md:mb-32"
          >
            <p className={eyebrow} style={eyebrowStyle}>&mdash; FAQ</p>
            <h2 className="font-heading text-4xl md:text-6xl font-light tracking-widest">Questions & Answers</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            <Accordion type="single" collapsible className="w-full border-t" style={{ borderColor: "var(--border)" }}>
              {[
                { q: "What makes your oil different from others on the market?", a: "Our formula is cold-infused over several weeks, allowing the herbs to slowly release their potent properties into the carrier oils without heat damage. We also use a very specific ratio of lightweight and heavy oils to ensure penetration without buildup." },
                { q: "How often should I use the Botanical Hair Growth Oil?", a: "For best results, we recommend applying to the scalp 2-3 times a week, massaging gently for 5 minutes. You can also use a few drops daily on the ends of your hair to seal in moisture." },
                { q: "Is this suitable for all hair types?", a: "Yes! While formulated with textured and natural hair in mind, our oil's balanced molecular weight makes it effective for straight, wavy, curly, and coily hair types." },
                { q: "When will I start seeing results?", a: "Most of our community notices increased softness and reduced shedding within the first 2-3 weeks. Noticeable thickness and new growth typically appear between 8-12 weeks of consistent use, as this aligns with the natural hair growth cycle." },
                { q: "Is it safe for a sensitive scalp?", a: "Our ingredients are 100% natural and chosen for their soothing properties. However, as with any potent botanical product, we recommend doing a patch test on your inner arm 24 hours before full scalp application." },
                { q: "Can I use this while wearing protective styles?", a: "Absolutely. The pointed applicator nozzle makes it incredibly easy to reach your scalp while wearing braids, locs, or weaves, keeping your roots nourished and preventing tension breakage." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b py-2" style={{ borderColor: "var(--border)" }}>
                  <AccordionTrigger className="text-base md:text-lg font-body font-light text-text py-6 hover:no-underline transition-colors" style={{ color: "var(--text)" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--forest)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}>
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-light leading-[1.9] tracking-wide pb-6 pr-10 text-sm" style={{ color: "var(--text-muted)" }}>
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
