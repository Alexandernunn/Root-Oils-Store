import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* 2. HERO SECTION */}
      <section ref={heroRef} className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center pt-20">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            poster={`${import.meta.env.BASE_URL}assets/hero-model.png`}
            className="w-full h-full object-cover scale-[1.02] animate-[kenburns_20s_ease-in-out_infinite_alternate]"
          >
            <source src={`${import.meta.env.BASE_URL}assets/hero.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#2D2A35]/30 via-[#2D2A35]/40 to-[#2D2A35]/65" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-xs md:text-sm font-medium tracking-[0.2em] mb-6 text-brand-bg-2"
          >
            ARTISANAL BOTANICAL HAIR CARE
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-white"
          >
            Honoring the Natural Strength of Every Strand
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-lg md:text-xl text-brand-bg mb-10 max-w-2xl font-light leading-relaxed"
          >
            Artisanal botanical blends designed to nurture, protect, and celebrate your unique heritage.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <Button size="lg" onClick={() => window.location.href = "https://www.amanirootsoils.com/category/all-products"}>
              Shop the Collection
            </Button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes kenburns {
            0% { transform: scale(1); }
            100% { transform: scale(1.08); }
          }
        `}} />
      </section>

      {/* 3. PHILOSOPHY SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl md:-ml-12 lg:-ml-24 shadow-2xl shadow-brand-text/5">
              <img 
                src={`${import.meta.env.BASE_URL}assets/hero-model.png`} 
                alt="Woman holding Amani Roots oil" 
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-[2s] ease-out"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-bg-2 rounded-full -z-10 blur-2xl opacity-70" />
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:mt-32 max-w-xl"
          >
            <motion.h2 variants={fadeInUp} className="font-heading text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              Empowering the Natural Hair Journey
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-brand-text-soft text-lg mb-6 leading-relaxed">
              We believe that your natural texture is something to be celebrated, not hidden. Our journey began with a simple desire: to create a product that truly understands and nourishes complex hair types.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-brand-text-soft text-lg mb-10 leading-relaxed">
              Every drop is infused with intention, bringing together the purest botanical ingredients to transform your daily routine into a deeply restorative ritual of self-love.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button variant="outline" className="gap-2 group">
                Discover Our Story 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. THREE PILLARS SECTION */}
      <section className="py-24 md:py-32 bg-brand-bg-2 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.p variants={fadeInUp} className="text-sm font-bold tracking-widest text-brand-accent-1 mb-4 uppercase">The Foundation</motion.p>
            <motion.h2 variants={fadeInUp} className="font-heading text-4xl md:text-5xl lg:text-6xl text-brand-text">
              7 Herbs • 3 Oils • Healthy Roots
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                num: "01",
                title: "7 Powerful Herbs",
                desc: "A meticulous blend including rosemary, fenugreek, and mint, steeped slowly to extract maximum potency for stimulating dormant follicles and calming the scalp.",
                delay: 0
              },
              {
                num: "02",
                title: "3 Nourishing Oils",
                desc: "The perfect synergy of lightweight grapeseed, moisturizing jojoba, and strengthening castor oil. Designed to penetrate deeply without weighing down your strands.",
                delay: 0.15,
                className: "md:mt-12"
              },
              {
                num: "03",
                title: "Healthy Roots",
                desc: "True growth begins beneath the surface. Our formula balances scalp microbiome, reduces inflammation, and creates the optimal environment for your hair to thrive.",
                delay: 0.3,
                className: "md:mt-24"
              }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: pillar.delay, ease: [0.4, 0, 0.2, 1] }}
                className={cn("bg-brand-bg p-10 rounded-3xl relative overflow-hidden group hover:shadow-xl hover:shadow-brand-accent-1/10 transition-all duration-500", pillar.className)}
              >
                <div className="text-8xl font-heading text-brand-bg-2 absolute -top-4 -right-4 font-light select-none pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  {pillar.num}
                </div>
                <div className="relative z-10 pt-8">
                  <h3 className="font-heading text-2xl mb-4">{pillar.title}</h3>
                  <p className="text-brand-text-soft leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SCIENCE SECTION */}
      <section className="py-24 md:py-32 bg-brand-bg-3 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-tight">
              Where Science <br/><span className="text-brand-accent-2 italic font-light">Meets</span> Hair Care
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/40 shadow-xl shadow-brand-text/5"
          >
            <p className="text-lg text-brand-text-soft leading-relaxed mb-6">
              Founded by a biology student, Amani Roots isn't just about mixing pleasant scents. It's about understanding the cellular structure of hair and the biochemistry of the scalp.
            </p>
            <p className="text-lg text-brand-text-soft leading-relaxed">
              Every ingredient is selected not just for its traditional uses, but for its clinically proven properties. We bridge the gap between ancestral apothecary wisdom and modern scientific methodology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. PRODUCT SPOTLIGHT */}
      <section className="py-32 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-bg-2 rounded-full blur-[100px] -z-10 opacity-60" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 inline-block"
          >
            <span className="bg-brand-bg-2 text-brand-rose px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase">Hero Product</span>
          </motion.div>

          <div className="relative h-[400px] md:h-[600px] w-full mb-16 flex items-center justify-center">
            {/* The main floating image */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative z-20 h-full w-full max-w-sm"
            >
              <img 
                src={`${import.meta.env.BASE_URL}assets/product-botanicals.png`} 
                alt="Amani Roots Botanical Hair Growth Oil" 
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />
            </motion.div>
            
            {/* Secondary image drifting slowly in background */}
            <motion.div 
              animate={{ y: [0, 15, 0], rotate: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
              className="absolute z-10 top-1/2 -right-12 md:right-12 -translate-y-1/2 h-2/3 max-w-xs opacity-40 blur-[2px]"
            >
              <img 
                src={`${import.meta.env.BASE_URL}assets/product-herbs.png`} 
                alt="Herbs and botanicals" 
                className="w-full h-full object-contain"
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
            <motion.h2 variants={fadeInUp} className="font-heading text-4xl md:text-5xl mb-4">Botanical Hair Growth Oil</motion.h2>
            <motion.p variants={fadeInUp} className="text-brand-text-soft text-lg mb-10">
              Our signature infusion. A potent, lightweight serum that awakens dormant follicles, soothes the scalp, and seals in essential moisture for visibly thicker, healthier hair.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" size="lg" onClick={() => window.location.href = "https://www.amanirootsoils.com/category/all-products"}>
                Shop 4oz — $24
              </Button>
              <Button size="lg" onClick={() => window.location.href = "https://www.amanirootsoils.com/category/all-products"}>
                Shop 8oz — $42
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 md:py-32 bg-brand-bg-2 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl">Success Stories</h2>
          </motion.div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 md:pb-0 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar">
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
                transition={{ delay: i * 0.15 }}
                className="bg-white p-8 rounded-3xl min-w-[300px] md:min-w-0 snap-center border border-transparent hover:border-brand-accent-1 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-brand-accent-1/10 flex flex-col"
              >
                <div className="font-heading text-6xl text-brand-accent-1 leading-none mb-2">"</div>
                <p className="text-brand-text flex-grow text-lg font-light leading-relaxed mb-8">
                  {review.text}
                </p>
                <div className="mt-auto">
                  <p className="font-semibold text-sm uppercase tracking-wider">{review.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SCALP SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-brand-bg border-b border-brand-bg-2">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-6xl md:text-7xl lg:text-8xl leading-none">
              It Starts <br/>With the <span className="text-brand-accent-2 italic">Scalp</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pl-0 lg:pl-12 lg:border-l border-brand-border"
          >
            <p className="text-xl text-brand-text-soft leading-relaxed mb-6 font-light">
              Think of your scalp as the soil in a garden. If the soil is dry, depleted, or inflamed, the plants cannot grow strong. 
            </p>
            <p className="text-lg text-brand-text-soft leading-relaxed">
              Our oil is formulated to penetrate the epidermis, delivering essential fatty acids and botanical compounds directly to the follicle. By restoring harmony at the root level, we create the perfect foundation for resilient, lustrous hair.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 9. EMAIL SIGNUP */}
      <section className="py-32 px-6 bg-brand-accent-3/35 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent-3 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="max-w-[560px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl mb-4">Stay Rooted</h2>
            <p className="text-brand-text-soft mb-8">Join our community for exclusive access to new releases, hair care tips, and botanical wisdom.</p>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" className="bg-brand-bg border-white" />
                <Input placeholder="Last Name" className="bg-brand-bg border-white" />
              </div>
              <Input type="email" placeholder="Email Address" className="bg-brand-bg border-white" />
              <Button type="submit" className="w-full h-12 text-base mt-2">
                Subscribe to Newsletter
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 10. FAQ ACCORDION */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-brand-bg">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl text-center mb-16"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full">
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
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-base md:text-lg">{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
