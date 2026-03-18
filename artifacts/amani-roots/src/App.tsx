import { Switch, Route, Router as WouterRouter } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

// Layout
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

// Pages
import Home from "@/pages/Home"
import NotFound from "@/pages/not-found"

const queryClient = new QueryClient()

// Placeholders for Shop/About pages requested in prompt for completeness
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center pt-24 px-6 text-center">
      <div className="max-w-xl">
        <h1 className="font-heading text-5xl md:text-6xl text-brand-text mb-6">{title}</h1>
        <p className="text-brand-text-soft text-lg mb-8">This section is currently being curated. Please check back soon.</p>
        <button 
          onClick={() => window.history.back()}
          className="text-brand-rose hover:underline underline-offset-4"
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
      <Route path="/shop">
        <PlaceholderPage title="Shop Coming Soon" />
      </Route>
      <Route path="/about">
        <PlaceholderPage title="Our Story Coming Soon" />
      </Route>
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

export default App;
