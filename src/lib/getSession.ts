import { cookies } from "next/headers";

export async function getSession() {
    const session = await cookies()
    const idToken = session.get("id_token")?.value
    if (!idToken) return null

    try {
        const parts = idToken.split(".")
        if (parts.length !== 3) return null
        const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString())
        return {
            id: payload.sub,
            email: payload.email,
            name: payload.name,
        }
    } catch (error) {
        console.log("Session decode error:", error)
        return null
    }
}