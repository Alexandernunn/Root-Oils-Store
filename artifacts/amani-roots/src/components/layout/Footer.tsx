import React from "react"
import { Link } from "wouter"

export function Footer() {
  return (
    <footer className="bg-brand-text text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="max-w-sm">
            <h2 className="font-heading text-3xl mb-4 text-brand-bg">Amani Roots Oils</h2>
            <p className="text-brand-text-soft text-sm leading-relaxed mb-6">
              Artisanal botanical blends designed to nurture, protect, and celebrate your unique heritage. Cultivated from nature, made for you.
            </p>
          </div>
          
          <div className="flex gap-16 md:justify-end">
            <div>
              <h3 className="font-medium mb-4 text-brand-bg-2">Shop</h3>
              <ul className="space-y-3 text-sm text-brand-text-soft">
                <li><a href="https://www.amanirootsoils.com/category/all-products" className="hover:text-brand-rose transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-brand-rose transition-colors">Hair Growth Oil</a></li>
                <li><a href="#" className="hover:text-brand-rose transition-colors">Bundles</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-brand-bg-2">About</h3>
              <ul className="space-y-3 text-sm text-brand-text-soft">
                <li><Link href="/about" className="hover:text-brand-rose transition-colors">Our Story</Link></li>
                <li><a href="#" className="hover:text-brand-rose transition-colors">Ingredients</a></li>
                <li><a href="#" className="hover:text-brand-rose transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-text-soft">
          <p>© {new Date().getFullYear()} Amani Roots Oil. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://www.amanirootsoils.com" className="hover:text-brand-rose transition-colors">Instagram</a>
            <a href="https://www.amanirootsoils.com" className="hover:text-brand-rose transition-colors">TikTok</a>
            <a href="https://www.amanirootsoils.com" className="hover:text-brand-rose transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
