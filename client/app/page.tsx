"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "./lib/constants";
import { useAuth } from "./hooks/useAuth";

export default function HomePage() {
  const router = useRouter();

  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (user.role === "PASSENGER") {
      router.replace(
        ROUTES.PASSENGER_DASHBOARD
      );
    } else {
      router.replace(
        ROUTES.DRIVER_DASHBOARD
      );
    }
  }, [
    user,
    loading,
    router,
  ]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p>Loading...</p>
    </main>
  );
}