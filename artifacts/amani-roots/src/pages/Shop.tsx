import React from "react"
import { motion } from "framer-motion"

const BASE = typeof import.meta !== "undefined" ? import.meta.env.BASE_URL : "/"

const products = [
  {
    name: "Amani Roots 4oz Oil",
    price: "$10.00",
    badge: "New",
    description: "Our 4oz bottle crafted with seven powerful herbs and three nourishing oils. Perfect for consistent scalp care on the go.",
    image: "https://static.wixstatic.com/media/50866c_c05dcfe7730f449eb0247e363678872f~mv2.png/v1/fill/w_856,h_856,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/50866c_c05dcfe7730f449eb0247e363678872f~mv2.png",
    link: "https://www.amanirootsoils.com/product-page/nourish-growth-elixir",
  },
  {
    name: "Amani Roots 8oz Oil",
    price: "$14.00",
    badge: "New",
    description: "Our 8oz bottle for your daily hair care ritual. Seven herbs and three nourishing oils — supports scalp health and stronger growth.",
    image: "https://static.wixstatic.com/media/50866c_569acf4c6d41404f86f955fe33956a05~mv2.png/v1/fill/w_856,h_1283,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/50866c_569acf4c6d41404f86f955fe33956a05~mv2.png",
    link: "https://www.amanirootsoils.com/product-page/scalp-soothing-oil",
  },
  {
    name: "Satin Pillow Case",
    price: "$10.00",
    badge: "New",
    description: "Smooth satin fabric reduces friction, protects your strands, and maintains moisture overnight. Pair with your oil routine.",
    image: "https://static.wixstatic.com/media/50866c_46645de31f7f4672a01e3b086a692f2a~mv2.jpg/v1/fill/w_840,h_1120,al_c,q_85,enc_avif,quality_auto/50866c_46645de31f7f4672a01e3b086a692f2a~mv2.jpg",
    link: "https://www.amanirootsoils.com/product-page/curl-styling-handbook",
  },
  {
    name: "Satin Scrunchy",
    price: "$3.69",
    badge: "Sale",
    description: "Gentle on your hair, secure on your style. Satin fabric minimizes breakage and maintains natural moisture every day.",
    image: "https://static.wixstatic.com/media/50866c_a739f5e90abc4152b773dee3814f43f9~mv2.jpg/v1/fill/w_796,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/50866c_a739f5e90abc4152b773dee3814f43f9~mv2.jpg",
    link: "https://www.amanirootsoils.com/product-page/satin-lined-cap",
  },
  {
    name: "Silk Bonnet",
    price: "$6.99",
    badge: "New",
    description: "Soft silk fabric protects your strands and maintains moisture while you rest. A nightly ritual for healthier hair.",
    image: "https://static.wixstatic.com/media/50866c_86b68c1031f047ada59d479fcd693eac~mv2.jpg/v1/fill/w_856,h_1283,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/50866c_86b68c1031f047ada59d479fcd693eac~mv2.jpg",
    link: "https://www.amanirootsoils.com/product-page/curl-hydration-serum",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0, 0.2, 1] } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export default function Shop() {
  return (
    <div className="min-h-screen bg-bg text-text">

      {/* Hero image header */}
      <section className="relative w-full pt-[64px] overflow-hidden" style={{ backgroundColor: "var(--bg-cream)" }}>
        <div className="w-full overflow-hidden" style={{ aspectRatio: "21/9", maxHeight: "50vh" }}>
          <img
            src={`${BASE}assets/philosophy-wide.png`}
            alt="Amani Roots botanical collection"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0, 0.2, 1] }}
            >
              <p className="text-[10px] md:text-xs font-light tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--sage)' }}>
                &mdash; THE COLLECTION
              </p>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light tracking-widest leading-[1.1]" style={{ color: 'var(--text)' }}>
                Shop All Products
              </h1>
              <p className="text-text-muted text-sm font-light leading-[1.9] tracking-wide mt-8 max-w-md">
                Artisanal botanical blends and hair care essentials — crafted to nurture, protect, and celebrate your natural heritage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t" style={{ backgroundColor: "var(--bg-lavender)", borderColor: "var(--border)" }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10"
          >
            {products.map((product, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group flex flex-col"
              >
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative overflow-hidden bg-bg-cream mb-5"
                  style={{ boxShadow: 'var(--shadow-green)' }}
                >
                  {product.badge && (
                    <span
                      className="absolute top-3 left-3 z-10 text-[9px] uppercase tracking-[0.15em] font-light px-2 py-1"
                      style={{
                        backgroundColor: product.badge === "Sale" ? 'var(--gold)' : 'var(--mint)',
                        color: product.badge === "Sale" ? '#fff' : 'var(--forest)',
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </a>

                <div className="flex flex-col flex-grow">
                  <h3 className="font-heading text-xl md:text-2xl font-light tracking-wide leading-snug mb-2" style={{ color: 'var(--text)' }}>
                    {product.name}
                  </h3>
                  <p className="text-text-muted text-xs font-light leading-[1.8] tracking-wide mb-4 hidden sm:block flex-grow">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="font-body font-light text-sm tracking-wide" style={{ color: 'var(--forest)' }}>
                      {product.price}
                    </span>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase tracking-[0.15em] font-light px-4 py-2 transition-all duration-300 hover:opacity-80"
                      style={{ backgroundColor: 'var(--forest)', color: '#fff' }}
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom accent */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t text-center" style={{ backgroundColor: "var(--bg-mist)", borderColor: "var(--border)" }}>
        <div className="max-w-[600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="w-8 h-[2px] mx-auto mb-8" style={{ backgroundColor: 'var(--sage)' }} />
            <p className="font-heading text-3xl md:text-4xl font-light tracking-widest leading-[1.3]" style={{ color: 'var(--forest)' }}>
              Every bottle is a ritual.
            </p>
            <p className="text-text-muted text-sm font-light leading-[1.9] tracking-wide mt-6 max-w-sm mx-auto">
              Cold-infused over weeks, never rushed. Crafted with intention for your roots.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
