import React, { useRef } from "react"
import { motion } from "framer-motion"
import { Link } from "wouter"
import { Button } from "@/components/ui/button"
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

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-bg text-text">

      {/* ── 1. HERO ────────────────────────────────────────── */}
      <section ref={heroRef} className="relative w-full bg-bg pt-[72px]" style={{ borderTop: "2px solid var(--sage)" }}>
        {/* 16:9 video container */}
        <div className="relative w-full aspect-video overflow-hidden" style={{ maxHeight: "90vh" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={`${import.meta.env.BASE_URL}assets/hero-model.png`}
            className="w-full h-full object-cover"
          >
            <source src={`${import.meta.env.BASE_URL}assets/hero.mp4`} type="video/mp4" />
          </video>

          {/* Dark gradient overlay so text reads clearly */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0.05) 100%)" }}
          />

          {/* Overlaid text */}
          <div className="absolute inset-0 flex items-center px-6 md:px-16 lg:px-24">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0, 0.2, 1] }}
                className="mb-6"
              >
                <p className="text-[10px] md:text-xs font-light tracking-[0.2em] uppercase mb-4" style={{ color: "var(--mint)" }}>
                  ARTISANAL BOTANICAL HAIR CARE
                </p>
                <div className="w-16 h-[1px]" style={{ backgroundColor: "var(--sage)" }} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.2, 0, 0.2, 1] }}
                className="font-heading font-light leading-[1.1] mb-6 tracking-widest"
                style={{ color: "#fff", fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
              >
                Honoring the<br />Natural Strength<br />of Every Strand
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.8, ease: [0.2, 0, 0.2, 1] }}
                className="text-sm font-light leading-[1.9] tracking-wide mb-10 max-w-[300px]"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                Artisanal botanical blends designed to nurture, protect, and celebrate your unique heritage.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: [0.2, 0, 0.2, 1] }}
              >
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

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-3"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] rotate-90 origin-center" style={{ color: "rgba(255,255,255,0.5)" }}>Scroll</span>
            <div className="w-[1px] h-10 overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-full h-full"
                style={{ backgroundColor: "var(--mint)" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. PHILOSOPHY ──────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12" style={{ backgroundColor: "var(--bg-cream)", borderTop: "2px solid var(--sage)" }}>
        <div className="max-w-[1400px] mx-auto">
          <p className={eyebrow} style={eyebrowStyle}>&mdash; 01 PHILOSOPHY</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1 }}
              className="lg:col-span-5"
            >
              {/* Constrained image — never fills the screen on mobile */}
              <div
                className="w-full max-h-[55vh] sm:max-h-none overflow-hidden"
                style={{ aspectRatio: "3/4", boxShadow: "var(--shadow-green)" }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/hero-model.png`}
                  alt="Woman holding Amani Roots oil"
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
                We believe that your natural texture is something to be celebrated, not hidden. Every drop is infused with intention, bringing together the purest botanical ingredients to transform your daily routine into a deeply restorative ritual.
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

      {/* ── 3. THREE PILLARS ───────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 bg-bg border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mb-20 md:mb-32"
          >
            <p className={eyebrow} style={eyebrowStyle}>&mdash; BOTANICAL FORMULA</p>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-text font-light tracking-widest leading-[1.1]">
              7 Herbs &middot; 3 Oils &middot; Healthy Roots
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x border-t pt-10 md:pt-16" style={{ borderColor: "var(--border)", '--tw-divide-opacity': '1' } as React.CSSProperties}>
            {[
              { num: "01", title: "Powerful Herbs", desc: "A meticulous blend including rosemary, fenugreek, and mint, steeped slowly to extract maximum potency for stimulating dormant follicles." },
              { num: "02", title: "Nourishing Oils", desc: "The synergy of lightweight grapeseed, moisturizing jojoba, and strengthening castor oil. Penetrates deeply without weighing down strands." },
              { num: "03", title: "Healthy Roots", desc: "True growth begins beneath the surface. Our formula balances scalp microbiome, creating the optimal environment for your hair to thrive." },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
                className="md:px-10 lg:px-14 first:pl-0 last:pr-0"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] mb-6 font-light" style={{ color: "var(--sage)" }}>{pillar.num}</div>
                <h3 className="font-heading text-2xl md:text-3xl mb-5 font-light tracking-widest">{pillar.title}</h3>
                <p className="text-text-muted text-sm font-light leading-[1.9] tracking-wide">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SCIENCE ─────────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 border-t" style={{ backgroundColor: "var(--bg-mist)", borderColor: "var(--border)" }}>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-14 lg:gap-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex-1"
          >
            <p className={eyebrow} style={eyebrowStyle}>&mdash; METHODOLOGY</p>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-light tracking-widest">
              Where Science<br /><span className="italic">Meets</span> Hair Care
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex-1 md:pl-12"
          >
            <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide mb-6">
              Founded by a biology student, Amani Roots isn't just about mixing pleasant scents. It's about understanding the cellular structure of hair and the biochemistry of the scalp.
            </p>
            <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide">
              Every ingredient is selected not just for its traditional uses, but for its clinically proven properties. We bridge the gap between ancestral apothecary wisdom and modern scientific methodology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 5. PRODUCT SPOTLIGHT ───────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 bg-bg border-t text-center" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[1400px] mx-auto">
          <p className={eyebrow + " text-center"} style={eyebrowStyle}>&mdash; SIGNATURE FORMULA</p>

          {/* Floating product image — capped so it never overflows mobile */}
          <div className="relative flex items-center justify-center mb-16 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md" style={{ height: "clamp(260px, 50vh, 560px)" }}>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-full h-full"
              style={{ filter: "drop-shadow(0 16px 40px rgba(47,95,72,0.18))" }}
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/product-botanicals.png`}
                alt="Amani Roots Botanical Hair Growth Oil"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="font-heading text-4xl md:text-6xl mb-6 font-light tracking-widest">
              Botanical Hair Growth Oil
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-text-muted text-sm md:text-base font-light leading-[1.9] tracking-wide mb-12">
              Our signature infusion. A potent, lightweight serum that awakens dormant follicles, soothes the scalp, and seals in essential moisture for visibly thicker, healthier hair.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/shop"
                className="inline-block text-xs font-body font-light tracking-[0.15em] uppercase px-8 py-3 transition-all duration-300 hover:opacity-80"
                style={{ backgroundColor: "var(--forest)", color: "#fff" }}
              >
                Shop 8oz &mdash; $14
              </Link>
              <Link
                href="/shop"
                className="text-xs font-body font-light tracking-[0.1em] uppercase underline underline-offset-4 hover:underline-offset-8 transition-all"
                style={{ color: "var(--forest)" }}
              >
                Shop 4oz &rarr;
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ────────────────────────────────── */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-20">
            {[
              { name: "Priscilla T.", text: "My curls have never felt more hydrated. Amani Roots is a game-changer for my transition journey." },
              { name: "Naomi T.", text: "The thickness and shine I've gained are incredible. I finally feel confident with my natural texture." },
              { name: "Catarina V.", text: "It's more than just oil — it's a ritual of self-love. My hair is flourishing like never before." },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.9 }}
                className="flex flex-col relative"
              >
                <div className="font-heading leading-none absolute -top-12 -left-3 select-none opacity-30" style={{ fontSize: "7rem", color: "var(--sage)" }}>&ldquo;</div>
                <p className="text-text text-xl md:text-2xl font-heading italic font-light leading-relaxed mb-6 relative z-10">
                  {review.text}
                </p>
                <div className="mt-auto relative z-10">
                  <div className="w-6 h-[1px] mb-3" style={{ backgroundColor: "var(--sage)" }} />
                  <p className="font-body font-light text-[10px] uppercase tracking-[0.2em] text-text-muted">{review.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SCALP ───────────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 bg-bg border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-28 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl leading-[1.1] font-light tracking-widest">
              It Starts<br />With the <span className="italic" style={{ color: "var(--forest)" }}>Scalp</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:pl-12"
          >
            <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide mb-6">
              Think of your scalp as the soil in a garden. If the soil is dry, depleted, or inflamed, the plants cannot grow strong.
            </p>
            <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide">
              Our oil is formulated to penetrate the epidermis, delivering essential fatty acids and botanical compounds directly to the follicle. By restoring harmony at the root level, we create the perfect foundation for resilient, lustrous hair.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 8. EMAIL SIGNUP ────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 border-t" style={{ backgroundColor: "var(--bg-mist)", borderColor: "var(--border)" }}>
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
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-transparent border-0 border-b pb-4 text-sm font-light text-text placeholder:text-text-light focus:outline-none transition-colors rounded-none"
                  style={{ borderColor: "rgba(47,95,72,0.25)" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--sage)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(47,95,72,0.25)")}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-transparent border-0 border-b pb-4 text-sm font-light text-text placeholder:text-text-light focus:outline-none transition-colors rounded-none"
                  style={{ borderColor: "rgba(47,95,72,0.25)" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--sage)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(47,95,72,0.25)")}
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-0 border-b pb-4 text-sm font-light text-text placeholder:text-text-light focus:outline-none transition-colors rounded-none"
                style={{ borderColor: "rgba(47,95,72,0.25)" }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--sage)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(47,95,72,0.25)")}
              />
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full text-xs font-body font-light tracking-[0.15em] uppercase py-4 transition-all duration-300 hover:opacity-80"
                  style={{ backgroundColor: "var(--forest)", color: "#fff" }}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── 9. FAQ ─────────────────────────────────────────── */}
      <section className="py-28 md:py-48 px-6 md:px-12 bg-bg border-t" style={{ borderColor: "var(--border)" }}>
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
                { q: "Is this suitable for all hair types?", a: "Yes! While formulated with textured and natural hair in mind, our oil's balanced molecular weight makes it effective for straight, wavy, curly, and coily hair types. If you have very fine straight hair, we recommend using it primarily as a pre-shampoo scalp treatment." },
                { q: "When will I start seeing results?", a: "Most of our community notices increased softness and reduced shedding within the first 2-3 weeks. Noticeable thickness and new growth typically appear between 8-12 weeks of consistent use, as this aligns with the natural hair growth cycle." },
                { q: "Is it safe for a sensitive scalp?", a: "Our ingredients are 100% natural and chosen for their soothing properties. However, as with any potent botanical product, we recommend doing a patch test on your inner arm 24 hours before full scalp application." },
                { q: "Can I use this while wearing protective styles?", a: "Absolutely. The pointed applicator nozzle makes it incredibly easy to reach your scalp while wearing braids, locs, or weaves, keeping your roots nourished and preventing tension breakage." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b py-2" style={{ borderColor: "var(--border)" }}>
                  <AccordionTrigger className="text-base md:text-lg font-body font-light text-text py-6 hover:no-underline transition-colors"
                    style={{ color: "var(--text)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--forest)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}
                  >
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
