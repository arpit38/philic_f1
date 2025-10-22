"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProduct: string | null
  allProducts: string[]
}

export default function EnquiryModal({ isOpen, onClose, selectedProduct, allProducts }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: selectedProduct || "",
    quantity: "1",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({ ...prev, product: selectedProduct }))
    }
  }, [selectedProduct])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    console.log("[v0] Submitting form data:", formData)

    try {
      const googleScriptUrl =
        "https://script.google.com/macros/s/AKfycbwLVQTAt8KzlnAnegoeMlAnUZ4ZrZhHO3gVCjTlwBCDv7gz5QzvOnuPczqAQgOwxptUTw/exec"

      // Create form data for Google Apps Script (using URLSearchParams for form-encoded data)
      const submitData = new URLSearchParams()
      submitData.append("name", formData.name)
      submitData.append("email", formData.email)
      submitData.append("phone", formData.phone || "")
      submitData.append("product", formData.product)
      submitData.append("quantity", formData.quantity)
      submitData.append("message", formData.message || "")
      submitData.append("timestamp", new Date().toISOString())

      console.log("[v0] Sending to Google Script...")

      // Submit to Google Apps Script with timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch(googleScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: submitData.toString(),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log("[v0] Response status:", response.status)

      // Check if response is successful
      if (response.ok || response.redirected) {
        console.log("[v0] Form submitted successfully")
        setIsSubmitted(true)
        setIsSubmitting(false)

        // Reset form and close modal after showing success message
        setTimeout(() => {
          setIsSubmitted(false)
          onClose()
          setFormData({
            name: "",
            email: "",
            phone: "",
            product: "",
            quantity: "1",
            message: "",
          })
        }, 2000)
      } else {
        throw new Error(`Server responded with status: ${response.status}`)
      }
    } catch (err) {
      console.error("[v0] Error submitting form:", err)

      // Handle different error types
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request timed out. Please check your internet connection and try again.")
      } else {
        setError("Failed to send enquiry. Please try again or contact us directly at beejbani@gmail.com")
      }

      // Reset submitting state so user can try again
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Product Enquiry</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-muted">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="name" className="text-foreground">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-foreground">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="product" className="text-foreground">
                Product <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.product}
                onValueChange={(value) => setFormData({ ...formData, product: value })}
                required
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {allProducts.map((product) => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity" className="text-foreground">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-foreground">
                Message / Special Requests
              </Label>
              <Textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1"
                placeholder="Tell us about your requirements..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit Enquiry"}
            </Button>
          </form>
        ) : (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
            <p className="text-muted-foreground">We've received your enquiry and will get back to you soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
