// Google Apps Script Code
// Deploy this as a Web App in Google Apps Script
// Instructions:
// 1. Go to https://script.google.com/
// 2. Create a new project
// 3. Copy this code into the script editor
// 4. Deploy as Web App (Deploy > New deployment > Web app)
// 5. Set "Execute as" to "Me" and "Who has access" to "Anyone"
// 6. Copy the Web App URL and add it as NEXT_PUBLIC_GOOGLE_SCRIPT_URL in your environment variables

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents)

    // Email configuration
    const recipient = "philic.agro@gmail.com"
    const subject = `New Product Enquiry: ${data.product}`

    // Create HTML email body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7c9a3e; border-bottom: 2px solid #7c9a3e; padding-bottom: 10px;">
          New Product Enquiry
        </h2>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 15px;">Customer Details:</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 15px;">Product Information:</h3>
          <p><strong>Product:</strong> ${data.product}</p>
          <p><strong>Quantity:</strong> ${data.quantity}</p>
        </div>
        
        ${
          data.message
            ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Message:</h3>
            <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${data.message}
            </p>
          </div>
        `
            : ""
        }
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>This enquiry was submitted through the Philic website on ${new Date(data.timestamp).toLocaleString()}.</p>
          <p>Reply-to: ${data.email}</p>
        </div>
      </div>
    `

    // Send email
    GmailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody,
      replyTo: data.email,
    })

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() })).setMimeType(
      ContentService.MimeType.JSON,
    )
  }
}

// Test function (optional - for testing in the script editor)
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        phone: "1234567890",
        product: "Moss Terrarium",
        quantity: "2",
        message: "This is a test enquiry",
        timestamp: new Date().toISOString(),
      }),
    },
  }

  const result = doPost(testData)
  Logger.log(result.getContent())
}
