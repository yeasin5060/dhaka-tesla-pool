"use client";

import Link from "next/link";

import { useAuth } from "../../hooks/useAuth";

export default function DriverDashboard() {
  const { user } =
    useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Hello, {user?.name}
        </h1>

        <p className="mt-1 text-gray-500">
          Manage your Tesla pool.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/driver/requests"
          className="rounded-2xl bg-black p-6 text-white"
        >
          <h2 className="font-semibold">
            Ride Requests
          </h2>

          <p className="mt-2 text-sm text-gray-300">
            View available passengers.
          </p>
        </Link>

        <Link
          href="/driver/current-ride"
          className="rounded-2xl border bg-white p-6"
        >
          <h2 className="font-semibold">
            Current Pool
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage your active pool.
          </p>
        </Link>

        <Link
          href="/driver/history"
          className="rounded-2xl border bg-white p-6"
        >
          <h2 className="font-semibold">
            History
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            View completed rides.
          </p>
        </Link>
      </div>
    </div>
  );
}