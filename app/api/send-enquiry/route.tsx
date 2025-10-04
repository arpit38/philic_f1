import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, product, quantity, message } = body

    console.log("[v0] Received enquiry form data:", { name, email, phone, product, quantity })

    const googleScriptUrl =
      "https://script.google.com/macros/s/AKfycbygwIS3d1qzJyxPd8Gr8ptSC4Gszb7xpueb6HEEaeE8LNd1fEWebE2dtbJ_a1Jtb4Gf1A/exec"

    const formData = new URLSearchParams()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone || "")
    formData.append("product", product)
    formData.append("quantity", quantity.toString())
    formData.append("message", message || "")
    formData.append("timestamp", new Date().toISOString())

    console.log("[v0] Sending to Google Script:", googleScriptUrl)

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      redirect: "follow",
    })

    console.log("[v0] Google Script response status:", response.status)

    const responseText = await response.text()
    console.log("[v0] Google Script response text:", responseText.substring(0, 200))

    let data
    try {
      data = JSON.parse(responseText)
      console.log("[v0] Parsed response:", data)
    } catch (parseError) {
      console.error("[v0] Failed to parse response as JSON:", parseError)
      // If we get HTML, it might be a redirect or error page
      if (responseText.includes("<HTML>") || responseText.includes("<html>")) {
        console.error("[v0] Received HTML instead of JSON - check Google Script deployment")
        return NextResponse.json(
          { error: "Email service configuration error. Please contact support." },
          { status: 500 },
        )
      }
      return NextResponse.json({ error: "Invalid response from email service" }, { status: 500 })
    }

    if (data.success || data.result === "success") {
      console.log("[v0] Enquiry sent successfully")
      return NextResponse.json({ success: true, message: "Enquiry sent successfully" })
    } else {
      console.error("[v0] Google Script returned error:", data)
      return NextResponse.json({ error: data.error || "Failed to send enquiry" }, { status: 500 })
    }
  } catch (error) {
    console.error("[v0] Error in send-enquiry route:", error)
    return NextResponse.json({ error: "Failed to send enquiry. Please try again later." }, { status: 500 })
  }
}
