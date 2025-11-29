import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromNumber = process.env.TWILIO_PHONE_NUMBER

// Initialize Twilio client only if credentials exist
const client = accountSid && authToken ? twilio(accountSid, authToken) : null

export async function sendSMS(to: string, body: string) {
    if (!client) {
        console.warn("Twilio credentials not found. SMS not sent.")
        console.log(`[MOCK SMS] To: ${to}, Body: ${body}`)
        return { success: false, error: "Twilio not configured" }
    }

    try {
        await client.messages.create({
            body,
            from: fromNumber,
            to,
        })
        return { success: true }
    } catch (error) {
        console.error("Failed to send SMS:", error)
        return { success: false, error: "Failed to send SMS" }
    }
}
