import React from "react"
import { Link } from "wouter"

export function Footer() {
  return (
    <footer className="py-24 px-6 md:px-12" style={{ backgroundColor: '#1A1714', color: '#fff' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Top accent line */}
        <div className="h-[1px] mb-16 opacity-20" style={{ backgroundColor: 'var(--sage)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="max-w-sm">
            <h2 className="font-heading italic text-4xl mb-6 tracking-widest font-light" style={{ color: 'var(--mint)' }}>
              Amani Roots
            </h2>
            <p className="text-xs font-light tracking-[0.05em] leading-relaxed max-w-[280px]" style={{ color: '#8A8580' }}>
              Artisanal botanical blends designed to nurture, protect, and celebrate your unique heritage. Cultivated from nature, made for you.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:flex md:justify-end md:gap-24">
            <div>
              <ul className="space-y-6">
                <li>
                  <Link href="/shop" className="text-xs font-light tracking-[0.15em] uppercase transition-colors" style={{ color: '#fff' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                  >Shop</Link>
                </li>
                <li>
                  <a href="https://www.amanirootsoils.com/product-page/scalp-soothing-oil" target="_blank" rel="noopener noreferrer"
                    className="text-xs font-light tracking-[0.15em] uppercase transition-colors"
                    style={{ color: '#8A8580' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8A8580')}
                  >Hair Growth Oil</a>
                </li>
                <li>
                  <Link href="/shop" className="text-xs font-light tracking-[0.15em] uppercase transition-colors" style={{ color: '#8A8580' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8A8580')}
                  >All Products</Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-6">
                <li>
                  <Link href="/about" className="text-xs font-light tracking-[0.15em] uppercase transition-colors" style={{ color: '#fff' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                  >About</Link>
                </li>
                <li>
                  <a href="https://www.amanirootsoils.com" target="_blank" rel="noopener noreferrer"
                    className="text-xs font-light tracking-[0.15em] uppercase transition-colors"
                    style={{ color: '#8A8580' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8A8580')}
                  >Ingredients</a>
                </li>
                <li>
                  <a href="https://www.amanirootsoils.com" target="_blank" rel="noopener noreferrer"
                    className="text-xs font-light tracking-[0.15em] uppercase transition-colors"
                    style={{ color: '#8A8580' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8A8580')}
                  >Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-[10px] font-light tracking-[0.1em] uppercase" style={{ color: '#8A8580' }}>
            © {new Date().getFullYear()} Amani Roots Oils. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {["Instagram", "TikTok", "Pinterest"].map(s => (
              <a key={s} href="https://www.amanirootsoils.com" target="_blank" rel="noopener noreferrer"
                className="text-[10px] font-light tracking-[0.1em] uppercase transition-colors"
                style={{ color: '#8A8580' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8A8580')}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
