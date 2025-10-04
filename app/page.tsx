import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Categories from "@/components/categories"
import Products from "@/components/products"
import Testimonials from "@/components/testimonials"
import ComplaintsSuggestions from "@/components/complaints-suggestions"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Categories />
      <Products />
      <Testimonials />
      <ComplaintsSuggestions />
      <Footer />
    </main>
  )
}
