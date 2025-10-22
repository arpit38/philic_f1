"use client"

import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"

export default function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById("products")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-primary/20 p-4 rounded-full">
              <Leaf className="h-12 w-12 text-primary" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            Natural Gifts That Bring Life & Joy
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed text-pretty max-w-2xl mx-auto">
            Beejbani specializes in curated plant gifts that celebrate nature's beauty. Each gift is thoughtfully selected
            to bring lasting joy and greenery to your loved ones.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={scrollToProducts}
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Explore Our Collections
          </Button>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center gap-8 text-muted-foreground">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">30+</div>
              <div className="text-sm">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">54</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
