"use client";

import { useEffect } from "react";

export default function GuestSessionInit() {
  useEffect(() => {
    async function initializeSession() {
      try {
        const response = await fetch("/api/guest-session", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to initialize guest session");
        }
      } catch (error) {
        console.error("Guest session initialization error:", error);
      }
    }

    void initializeSession();
  }, []);

  return null;
}
