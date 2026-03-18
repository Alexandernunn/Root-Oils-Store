import React from "react"
import { Link } from "wouter"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg text-center px-6">
      <h1 className="font-heading text-8xl md:text-9xl text-brand-accent-1 mb-4">404</h1>
      <h2 className="font-heading text-3xl md:text-4xl text-brand-text mb-6">Page Not Found</h2>
      <p className="text-brand-text-soft mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button size="lg">Return Home</Button>
      </Link>
    </div>
  )
}
