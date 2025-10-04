"use client"

import { Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [{ id: "gifts", name: "Gifts", icon: Gift }]

export default function Categories() {
  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-foreground mb-2">Our Products</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our thoughtfully curated plant gift collections for every occasion
          </p>
        </div>

        <div className="flex justify-center">
          <Button variant="default" size="lg" className="flex items-center gap-2 bg-primary text-primary-foreground">
            <Gift className="h-5 w-5" />
            Gifts
          </Button>
        </div>
      </div>
    </section>
  )
}
