"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import EnquiryModal from "@/components/enquiry-modal"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Terrarium 1",
    description: "A thriving miniature ecosystem sealed inside a simple glass jar.",
    price: "₹2,499 - ₹2,999",
    image: "/product_1.jpg",
  },
  {
    id: 2,
    name: "Terrarium 2",
    description: "Lush, mossy terrarium with central driftwood and small, vibrant green plants.",
    price: "₹3,499 - ₹3,999",
    image: "/product_2.jpg",
  },
  {
    id: 3,
    name: "Terrarium 3",
    description: "A thriving miniature ecosystem sealed inside a simple glass jar.",
    price: "₹4,999 - ₹5,999",
    image: "/product_3.jpg",
  },
  {
    id: 4,
    name: "Terrarium 4",
    description: "Green miniature world: a captivating, self-sustaining terrarium for office desk.",
    price: "₹5,999 - ₹6,999",
    image: "/product_4.jpg",
  },
]

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEnquire = (productName: string) => {
    setSelectedProduct(productName)
    setIsModalOpen(true)
  }

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50"
            >
              <CardContent className="p-6">
                <div className="w-full aspect-[3/4] bg-muted rounded-lg mb-4 overflow-hidden relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{product.description}</p>
                <div className="text-lg font-semibold text-primary">{product.price}</div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  onClick={() => handleEnquire(product.name)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Enquire Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProduct={selectedProduct}
        allProducts={products.map((p) => p.name)}
      />
    </section>
  )
}
