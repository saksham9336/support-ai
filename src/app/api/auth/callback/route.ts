import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get("code")
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`

    if (!code) {
        return NextResponse.json({ message: "code is not found" }, { status: 400 })
    }

    try {
        const params = new URLSearchParams()
        params.set("grant_type", "authorization_code")
        params.set("code", code)
        params.set("redirect_uri", redirectUri)
        params.set("client_id", process.env.SCALEKIT_CLIENT_ID!)
        params.set("client_secret", process.env.SCALEKIT_CLIENT_SECRET!)

        const tokenRes = await fetch(`${process.env.SCALEKIT_ENVIRONMENT_URL}/oauth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString()
        })

        const tokenData = await tokenRes.json()
        const accessToken = tokenData.access_token
        const idToken = tokenData.id_token

        if (!accessToken) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}?error=token_failed`)
        }

        const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`)
        response.cookies.set("access_token", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            path: "/"
        })
        response.cookies.set("id_token", idToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            path: "/"
        })
        return response

    } catch (error) {
        console.log("Auth error:", error)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}?error=auth_failed`)
    }
}