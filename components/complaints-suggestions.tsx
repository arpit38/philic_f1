"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ComplaintsSuggestions() {
  const [formData, setFormData] = useState({
    type: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.type || !formData.message.trim()) {
      setError("Please select a type and enter your message.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    console.log("[v0] Submitting complaint/suggestion:", formData)

    try {
      const googleScriptUrl =
        "https://script.google.com/macros/s/AKfycbwLVQTAt8KzlnAnegoeMlAnUZ4ZrZhHO3gVCjTlwBCDv7gz5QzvOnuPczqAQgOwxptUTw/exec"

      // Create form data for Google Apps Script
      const submitData = new URLSearchParams()
      submitData.append("type", formData.type)
      submitData.append("message", formData.message)
      submitData.append("timestamp", new Date().toISOString())
      submitData.append("formType", "complaint_suggestion") // Identifier for the backend

      console.log("[v0] Sending complaint/suggestion to Google Script...")

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
        console.log("[v0] Complaint/suggestion submitted successfully")
        setIsSubmitted(true)
        setIsSubmitting(false)

        // Reset form after showing success message
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            type: "",
            message: "",
          })
        }, 3000)
      } else {
        throw new Error(`Server responded with status: ${response.status}`)
      }
    } catch (err) {
      console.error("[v0] Error submitting complaint/suggestion:", err)

      // Handle different error types
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request timed out. Please check your internet connection and try again.")
      } else {
        setError("Failed to submit. Please try again or contact us directly at beejbani@gmail.com")
      }

      // Reset submitting state so user can try again
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complaints & Suggestions</CardTitle>
            <p className="text-muted-foreground text-center text-sm">
              We value your feedback. Please share your complaints or suggestions with us.
            </p>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <Label htmlFor="type" className="text-foreground">
                    Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                    required
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="complaint">Complaint</SelectItem>
                      <SelectItem value="suggestion">Suggestion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground">
                    Your Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1"
                    placeholder="Please share your feedback with us..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            ) : (
              <div className="py-8 text-center">
                <div className="text-5xl mb-3">✓</div>
                <h3 className="text-xl font-bold text-primary mb-2">Thank You!</h3>
                <p className="text-muted-foreground">
                  We've received your {formData.type} and will review it carefully.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
