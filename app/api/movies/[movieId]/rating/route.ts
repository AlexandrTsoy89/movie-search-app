import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type RouteContext = {
  params: Promise<{ movieId: string }>;
};

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { movieId } = await params;

    const cookieStore = await cookies();

    const guestSessionId = cookieStore.get("tmdb_guest_session")?.value;

    if (!guestSessionId) {
      return NextResponse.json(
        { error: "Guest session not found" },
        { status: 401 },
      );
    }

    const token = process.env.TMDB_ACCESS_TOKEN;

    if (!token) {
      throw new Error("TMDB access token is missing");
    }

    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("value" in body) ||
      typeof body.value !== "number" ||
      !Number.isFinite(body.value) ||
      body.value < 0.5 ||
      body.value > 10 ||
      !Number.isInteger(body.value * 2)
    ) {
      return NextResponse.json(
        { error: "Rating must be between 0.5 and 10, in steps of 0.5" },
        { status: 400 },
      );
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${encodeURIComponent(movieId)}/rating?guest_session_id=${encodeURIComponent(guestSessionId)}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: body.value }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to save movie rating" },
        { status: response.status },
      );
    }

    const data = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { error: "TMDB did not accept the rating" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Movie rating error:", error);

    return NextResponse.json(
      { error: "Failed to save movie rating" },
      { status: 500 },
    );
  }
}
