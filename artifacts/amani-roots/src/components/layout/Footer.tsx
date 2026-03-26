import React from "react"
import { Link } from "wouter"
import { Instagram } from "lucide-react"

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
            <p className="text-xs font-light tracking-[0.05em] leading-relaxed max-w-[280px] mb-8" style={{ color: '#8A8580' }}>
              Artisanal botanical blends designed to nurture, protect, and celebrate your unique heritage. Cultivated from nature, made for you.
            </p>
            <div className="space-y-2">
              <a href="mailto:amanirootsoils@gmail.com" className="text-xs font-light tracking-[0.05em] transition-colors" style={{ color: '#8A8580' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8A8580')}
              >
                amanirootsoils@gmail.com
              </a>
              <p className="text-xs font-light tracking-[0.05em]" style={{ color: '#8A8580' }}>
                Texas, USA
              </p>
            </div>
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
                  <Link href="/book" className="text-xs font-light tracking-[0.15em] uppercase transition-colors" style={{ color: '#8A8580' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8A8580')}
                  >Book Online</Link>
                </li>
                <li>
                  <Link href="/events" className="text-xs font-light tracking-[0.15em] uppercase transition-colors" style={{ color: '#8A8580' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8A8580')}
                  >Events</Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-6">
                <li>
                  <Link href="/founder-story" className="text-xs font-light tracking-[0.15em] uppercase transition-colors" style={{ color: '#fff' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                  >Founder's Story</Link>
                </li>
                <li>
                  <Link href="/groups" className="text-xs font-light tracking-[0.15em] uppercase transition-colors" style={{ color: '#8A8580' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8A8580')}
                  >Groups</Link>
                </li>
                <li>
                  <Link href="/faq" className="text-xs font-light tracking-[0.15em] uppercase transition-colors" style={{ color: '#8A8580' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8A8580')}
                  >FAQ</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-[10px] font-light tracking-[0.1em] uppercase" style={{ color: '#8A8580' }}>
            © {new Date().getFullYear()} Amani Roots Oils. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/amaniroots_oils/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors group"
              style={{ color: '#8A8580' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8A8580')}
              aria-label="Follow on Instagram"
            >
              <Instagram className="w-4 h-4 stroke-[1.5]" />
              <span className="text-[10px] font-light tracking-[0.1em] uppercase">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
