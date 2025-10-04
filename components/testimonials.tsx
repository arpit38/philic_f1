import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Customer 1",
    image: "/placeholder.svg?height=400&width=300",
    testimonial: "",
  },
  {
    id: 2,
    name: "Customer 2",
    image: "/placeholder.svg?height=400&width=300",
    testimonial: "",
  },
  {
    id: 3,
    name: "Customer 3",
    image: "/placeholder.svg?height=400&width=300",
    testimonial: "",
  },
  {
    id: 4,
    name: "Customer 4",
    image: "/placeholder.svg?height=400&width=300",
    testimonial: "",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Happy Customers</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="w-full aspect-[3/4] bg-muted relative flex items-center justify-center">
                  <span className="text-6xl">🍃</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
