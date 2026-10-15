type GuestSessionResponse = {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
};

export async function createGuestSession(): Promise<GuestSessionResponse> {
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    throw new Error("TMDB access token is missing");
  }

  const response = await fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to create guest session: ${response.status}`);
  }

  const data: GuestSessionResponse = await response.json();

  if (!data.success || !data.guest_session_id) {
    throw new Error("Failed to receive a valid guest session");
  }

  return data;
}
