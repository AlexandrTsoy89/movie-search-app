import { NextResponse } from "next/server";
import { createGuestSession } from "@/lib/createGuestSession";

const COOKIE_NAME = "tmdb_guest_session";

export async function POST(request: Request) {
  try {
    const existingSession = request.headers
      .get("cookie")
      ?.split("; ")
      .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`))
      ?.split("=")[1];

    if (existingSession) {
      return NextResponse.json({ success: true });
    }

    const session = await createGuestSession();

    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, session.guest_session_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(
        session.expires_at.replace(" UTC", "Z").replace(" ", "T"),
      ),
    });

    return response;
  } catch (error) {
    console.error("Guest session error:", error);

    return NextResponse.json(
      { error: "Failed to initialize guest session" },
      { status: 500 },
    );
  }
}
