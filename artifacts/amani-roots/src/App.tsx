import { Switch, Route, Router as WouterRouter } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

import Home from "@/pages/Home"
import Shop from "@/pages/Shop"
import NotFound from "@/pages/not-found"

const queryClient = new QueryClient()

function AboutPlaceholder() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center pt-24 px-6 text-center">
      <div className="max-w-xl">
        <p className="text-[10px] uppercase tracking-[0.2em] font-light mb-6" style={{ color: 'var(--sage)' }}>
          &mdash; OUR STORY
        </p>
        <h1 className="font-heading text-5xl md:text-6xl font-light tracking-widest mb-8" style={{ color: 'var(--text)' }}>
          Coming Soon
        </h1>
        <p className="text-text-muted text-sm font-light leading-[1.9] tracking-wide mb-10">
          This section is currently being curated. Please check back soon.
        </p>
        <button
          onClick={() => window.history.back()}
          className="text-xs font-light tracking-[0.15em] uppercase underline underline-offset-4 hover:underline-offset-8 transition-all"
          style={{ color: 'var(--forest)' }}
        >
          Go back
        </button>
      </div>
    </div>
  )
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/about" component={AboutPlaceholder} />
      <Route component={NotFound} />
    </Switch>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
