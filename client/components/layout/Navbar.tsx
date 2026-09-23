"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const router = useRouter();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h1 className="text-lg font-bold">
          Dhaka Tesla Pool
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <>
            <div className="text-right">
              <p className="text-sm font-medium">
                {user.name}
              </p>

              <p className="text-xs text-gray-500">
                {user.role}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}