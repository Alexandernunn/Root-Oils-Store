import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0, 0.2, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  
  return (
    <div className="min-h-screen bg-bg text-text">
      {/* 2. HERO SECTION */}
      <section ref={heroRef} className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-bg pt-[72px]">
        <div className="w-full max-w-[1400px] h-full relative flex items-center px-6 md:px-12">
          
          {/* Framed Video */}
          <div className="absolute right-0 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 w-full md:w-[60%] h-[60%] md:h-[75%] shadow-[0_20px_80px_rgba(0,0,0,0.12)] z-0">
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
          </div>

          {/* Hero Text */}
          <div className="relative z-10 max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0, 0.2, 1] }}
              className="mb-8"
            >
              <p className="text-[10px] md:text-xs font-light tracking-[0.2em] text-text-muted uppercase mb-4">
                ARTISANAL BOTANICAL HAIR CARE
              </p>
              <div className="w-20 h-[1px] bg-text/20" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.2, 0, 0.2, 1] }}
              className="font-heading text-[clamp(3rem,6vw,6rem)] leading-[1.1] mb-8 tracking-widest font-light"
              style={{ color: '#1A1714' }}
            >
              Honoring the <br />Natural Strength <br />of Every Strand
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.2, 0, 0.2, 1] }}
              className="text-sm text-text-muted mb-12 max-w-[280px] font-light leading-[1.9] tracking-wide"
            >
              Artisanal botanical blends designed to nurture, protect, and celebrate your unique heritage.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.2, 0, 0.2, 1] }}
            >
              <a 
                href="https://www.amanirootsoils.com/category/all-products"
                className="text-sm font-body font-light tracking-[0.1em] text-text underline underline-offset-4 hover:underline-offset-8 transition-all"
              >
                Shop the Collection &rarr;
              </a>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-4 hidden md:flex"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted rotate-90 origin-left translate-y-4">Scroll</span>
            <div className="w-[1px] h-12 bg-text/20 overflow-hidden mt-6">
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-full h-full bg-text"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. PHILOSOPHY SECTION */}
      <section className="py-40 md:py-64 px-6 md:px-12 bg-bg border-t border-black/8 relative">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[10px] md:text-xs font-light tracking-[0.2em] text-text-muted uppercase mb-16 md:mb-32">
            &mdash; 01 PHILOSOPHY
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="lg:col-span-5"
            >
              <div className="aspect-[3/4] shadow-[0_4px_40px_rgba(0,0,0,0.06)] bg-bg-alt">
                <img 
                  src={`${import.meta.env.BASE_URL}assets/hero-model.png`} 
                  alt="Woman holding Amani Roots oil" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="lg:col-span-7 lg:pl-16"
            >
              <motion.h2 variants={fadeInUp} className="font-heading text-5xl md:text-7xl mb-12 leading-[1.1] font-light tracking-widest">
                Empowering the <br />Natural Hair Journey
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-text-muted text-sm md:text-base font-light mb-16 leading-[1.9] tracking-wide max-w-lg">
                We believe that your natural texture is something to be celebrated, not hidden. Every drop is infused with intention, bringing together the purest botanical ingredients to transform your daily routine into a deeply restorative ritual.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <a href="/about" className="text-xs font-body font-light tracking-[0.1em] text-text-muted hover:text-text transition-colors">
                  &rarr; Read more
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. THREE PILLARS SECTION */}
      <section className="py-40 md:py-64 px-6 md:px-12 bg-bg border-t border-black/8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mb-24 md:mb-40"
          >
            <p className="text-[10px] md:text-xs font-light tracking-[0.2em] text-text-muted uppercase mb-8">
              &mdash; BOTANICAL FORMULA
            </p>
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-text font-light tracking-widest leading-[1.1]">
              7 Herbs &middot; 3 Oils &middot; Healthy Roots
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-black/8 border-t border-black/8 pt-12 md:pt-20">
            {[
              {
                num: "01",
                title: "Powerful Herbs",
                desc: "A meticulous blend including rosemary, fenugreek, and mint, steeped slowly to extract maximum potency for stimulating dormant follicles."
              },
              {
                num: "02",
                title: "Nourishing Oils",
                desc: "The synergy of lightweight grapeseed, moisturizing jojoba, and strengthening castor oil. Penetrates deeply without weighing down strands."
              },
              {
                num: "03",
                title: "Healthy Roots",
                desc: "True growth begins beneath the surface. Our formula balances scalp microbiome, creating the optimal environment for your hair to thrive."
              }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
                className="md:px-12 lg:px-16 first:pl-0 last:pr-0"
              >
                <div className="text-[10px] text-text-muted uppercase tracking-[0.2em] mb-8">{pillar.num}</div>
                <h3 className="font-heading text-3xl md:text-4xl mb-6 font-light tracking-widest">{pillar.title}</h3>
                <p className="text-text-muted text-sm font-light leading-[1.9] tracking-wide">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SCIENCE SECTION */}
      <section className="py-40 md:py-64 bg-bg-alt px-6 md:px-12 border-t border-black/8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-16 lg:gap-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex-1"
          >
            <p className="text-[10px] md:text-xs font-light tracking-[0.2em] text-text-muted uppercase mb-8">
              &mdash; METHODOLOGY
            </p>
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[1.1] font-light tracking-widest">
              Where Science <br/><span className="italic">Meets</span> Hair Care
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex-1 md:pl-16"
          >
            <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide mb-8">
              Founded by a biology student, Amani Roots isn't just about mixing pleasant scents. It's about understanding the cellular structure of hair and the biochemistry of the scalp.
            </p>
            <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide">
              Every ingredient is selected not just for its traditional uses, but for its clinically proven properties. We bridge the gap between ancestral apothecary wisdom and modern scientific methodology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. PRODUCT SPOTLIGHT */}
      <section className="py-40 md:py-64 px-6 md:px-12 bg-bg border-t border-black/8 text-center relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative h-[600px] md:h-[800px] w-full mb-24 flex items-center justify-center">
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-20 h-full w-full max-w-md"
            >
              <img 
                src={`${import.meta.env.BASE_URL}assets/product-botanicals.png`} 
                alt="Amani Roots Botanical Hair Growth Oil" 
                className="w-full h-full object-contain filter drop-shadow-2xl"
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
            <motion.h2 variants={fadeInUp} className="font-heading text-5xl md:text-7xl mb-8 font-light tracking-widest">
              Botanical Hair Growth Oil
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-text-muted text-sm md:text-base font-light leading-[1.9] tracking-wide mb-16">
              Our signature infusion. A potent, lightweight serum that awakens dormant follicles, soothes the scalp, and seals in essential moisture for visibly thicker, healthier hair.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Button onClick={() => window.location.href = "https://www.amanirootsoils.com/category/all-products"}>
                Shop 8oz &mdash; $42
              </Button>
              <a 
                href="https://www.amanirootsoils.com/category/all-products" 
                className="text-xs font-body font-light tracking-[0.1em] text-text underline underline-offset-4 hover:underline-offset-8 transition-all uppercase"
              >
                Shop 4oz &rarr;
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-40 md:py-64 bg-bg px-6 md:px-12 border-t border-black/8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 md:mb-40"
          >
            <p className="text-[10px] md:text-xs font-light tracking-[0.2em] text-text-muted uppercase">
              &mdash; SUCCESS STORIES
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
            {[
              {
                name: "Priscilla T.",
                text: "My curls have never felt more hydrated. Amani Roots is a game-changer for my transition journey."
              },
              {
                name: "Naomi T.",
                text: "The thickness and shine I've gained are incredible. I finally feel confident with my natural texture."
              },
              {
                name: "Catarina V.",
                text: "It's more than just oil — it's a ritual of self-love. My hair is flourishing like never before."
              }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.9 }}
                className="flex flex-col relative"
              >
                <div className="font-heading text-[8rem] text-text-light leading-none absolute -top-16 -left-4 select-none opacity-50">&ldquo;</div>
                <p className="text-text text-xl md:text-2xl font-heading italic font-light leading-relaxed mb-8 relative z-10">
                  {review.text}
                </p>
                <div className="mt-auto relative z-10">
                  <p className="font-body font-light text-[10px] uppercase tracking-[0.2em] text-text-muted">{review.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SCALP SECTION */}
      <section className="py-40 md:py-64 px-6 md:px-12 bg-bg border-t border-black/8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="font-heading text-6xl md:text-8xl leading-[1.1] font-light tracking-widest">
              It Starts <br/>With the <span className="italic">Scalp</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:pl-16"
          >
            <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide mb-8">
              Think of your scalp as the soil in a garden. If the soil is dry, depleted, or inflamed, the plants cannot grow strong. 
            </p>
            <p className="text-sm md:text-base text-text-muted font-light leading-[1.9] tracking-wide">
              Our oil is formulated to penetrate the epidermis, delivering essential fatty acids and botanical compounds directly to the follicle. By restoring harmony at the root level, we create the perfect foundation for resilient, lustrous hair.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 9. EMAIL SIGNUP */}
      <section className="py-40 md:py-64 px-6 bg-bg-alt border-t border-black/8">
        <div className="max-w-[600px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-[10px] font-light tracking-[0.2em] text-text-muted uppercase mb-8">
              STAY ROOTED
            </p>
            <h2 className="font-heading text-5xl md:text-7xl mb-12 font-light tracking-widest leading-[1.1]">Join the Ritual</h2>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input 
                  type="text"
                  placeholder="First Name" 
                  className="w-full bg-transparent border-0 border-b border-black/20 pb-4 text-sm font-light text-text placeholder:text-text-light focus:outline-none focus:border-text transition-colors rounded-none" 
                />
                <input 
                  type="text"
                  placeholder="Last Name" 
                  className="w-full bg-transparent border-0 border-b border-black/20 pb-4 text-sm font-light text-text placeholder:text-text-light focus:outline-none focus:border-text transition-colors rounded-none" 
                />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent border-0 border-b border-black/20 pb-4 text-sm font-light text-text placeholder:text-text-light focus:outline-none focus:border-text transition-colors rounded-none" 
              />
              <div className="pt-8">
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 10. FAQ ACCORDION */}
      <section className="py-40 md:py-64 px-6 md:px-12 bg-bg border-t border-black/8">
        <div className="max-w-[1000px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 md:mb-40"
          >
            <p className="text-[10px] md:text-xs font-light tracking-[0.2em] text-text-muted uppercase mb-8">
              &mdash; FAQ
            </p>
            <h2 className="font-heading text-5xl md:text-7xl font-light tracking-widest">
              Questions & Answers
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            <Accordion type="single" collapsible className="w-full border-t border-black/8">
              {[
                {
                  q: "What makes your oil different from others on the market?",
                  a: "Our formula is cold-infused over several weeks, allowing the herbs to slowly release their potent properties into the carrier oils without heat damage. We also use a very specific ratio of lightweight and heavy oils to ensure penetration without buildup."
                },
                {
                  q: "How often should I use the Botanical Hair Growth Oil?",
                  a: "For best results, we recommend applying to the scalp 2-3 times a week, massaging gently for 5 minutes. You can also use a few drops daily on the ends of your hair to seal in moisture."
                },
                {
                  q: "Is this suitable for all hair types?",
                  a: "Yes! While formulated with textured and natural hair in mind, our oil's balanced molecular weight makes it effective for straight, wavy, curly, and coily hair types. If you have very fine straight hair, we recommend using it primarily as a pre-shampoo scalp treatment."
                },
                {
                  q: "When will I start seeing results?",
                  a: "Most of our community notices increased softness and reduced shedding within the first 2-3 weeks. Noticeable thickness and new growth typically appear between 8-12 weeks of consistent use, as this aligns with the natural hair growth cycle."
                },
                {
                  q: "Is it safe for a sensitive scalp?",
                  a: "Our ingredients are 100% natural and chosen for their soothing properties. However, as with any potent botanical product, we recommend doing a patch test on your inner arm 24 hours before full scalp application."
                },
                {
                  q: "Can I use this while wearing protective styles?",
                  a: "Absolutely. The pointed applicator nozzle makes it incredibly easy to reach your scalp while wearing braids, locs, or weaves, keeping your roots nourished and preventing tension breakage."
                }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-black/8 py-4">
                  <AccordionTrigger className="text-base md:text-lg font-body font-light text-text hover:text-text-muted transition-colors py-6 data-[state=open]:text-text-muted [&[data-state=open]>svg]:rotate-45 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-text-muted font-light leading-[1.9] tracking-wide pb-8 pr-12">
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
