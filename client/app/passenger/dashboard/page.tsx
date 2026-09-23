"use client";

import Link from "next/link";

import { useAuth } from "../../hooks/useAuth";

export default function PassengerDashboard() {
  const { user } =
    useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Hello, {user?.name}
        </h1>

        <p className="mt-1 text-gray-500">
          Ready to find your next ride?
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/passenger/request-ride"
          className="rounded-2xl bg-black p-6 text-white"
        >
          <h2 className="font-semibold">
            Request a Ride
          </h2>

          <p className="mt-2 text-sm text-gray-300">
            Choose pickup, destination
            and seats.
          </p>
        </Link>

        <Link
          href="/passenger/rides"
          className="rounded-2xl border bg-white p-6"
        >
          <h2 className="font-semibold">
            My Rides
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            View your active rides.
          </p>
        </Link>

        <Link
          href="/passenger/history"
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