import { Switch, Route, Router as WouterRouter, Redirect } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

import Home from "@/pages/Home"
import Shop from "@/pages/Shop"
import About from "@/pages/About"
import Faq from "@/pages/Faq"
import FounderStory from "@/pages/FounderStory"
import Book from "@/pages/Book"
import Events from "@/pages/Events"
import Groups from "@/pages/Groups"
import Blog from "@/pages/Blog"
import NotFound from "@/pages/not-found"

const queryClient = new QueryClient()

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/founder-story" component={FounderStory} />
      <Route path="/book" component={Book} />
      <Route path="/events" component={Events} />
      <Route path="/groups" component={Groups} />
      <Route path="/blog" component={Blog} />
      <Route path="/about">
        <Redirect to="/founder-story" />
      </Route>
      <Route path="/faq" component={Faq} />
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
