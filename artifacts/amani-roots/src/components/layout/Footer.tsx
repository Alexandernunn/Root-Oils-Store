import React from "react"
import { Link } from "wouter"

export function Footer() {
  return (
    <footer className="bg-[#1A1714] text-white py-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="max-w-sm">
            <h2 className="font-heading italic text-5xl mb-6 text-white tracking-widest font-light">
              AMANI ROOTS
            </h2>
            <p className="text-[#8A8580] text-xs font-light tracking-[0.05em] leading-relaxed max-w-[280px]">
              Artisanal botanical blends designed to nurture, protect, and celebrate your unique heritage. Cultivated from nature, made for you.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:flex md:justify-end md:gap-24">
            <div>
              <ul className="space-y-6">
                <li><a href="https://www.amanirootsoils.com/category/all-products" className="text-xs font-light tracking-[0.15em] uppercase hover:text-[#C2BDB8] transition-colors">Shop</a></li>
                <li><a href="#" className="text-xs font-light tracking-[0.15em] uppercase text-[#8A8580] hover:text-[#C2BDB8] transition-colors">Hair Growth Oil</a></li>
                <li><a href="#" className="text-xs font-light tracking-[0.15em] uppercase text-[#8A8580] hover:text-[#C2BDB8] transition-colors">Bundles</a></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-6">
                <li><Link href="/about" className="text-xs font-light tracking-[0.15em] uppercase hover:text-[#C2BDB8] transition-colors">About</Link></li>
                <li><a href="#" className="text-xs font-light tracking-[0.15em] uppercase text-[#8A8580] hover:text-[#C2BDB8] transition-colors">Ingredients</a></li>
                <li><a href="#" className="text-xs font-light tracking-[0.15em] uppercase text-[#8A8580] hover:text-[#C2BDB8] transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-[#8A8580] font-light tracking-[0.1em] uppercase">
          <p>© {new Date().getFullYear()} Amani Roots. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="https://www.amanirootsoils.com" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://www.amanirootsoils.com" className="hover:text-white transition-colors">TikTok</a>
            <a href="https://www.amanirootsoils.com" className="hover:text-white transition-colors">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
