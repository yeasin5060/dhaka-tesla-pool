"use client";

import {
  useEffect,
  useState,
} from "react";

import RideCard from "@/components/passenger/RideCard";
import Loader from "@/components/ui/Loader";

import {
  getMyRides,
} from "@/services/rideService";

import type {
  RideRequest,
} from "@/types/ride";

export default function RidesPage() {
  const [rides, setRides] =
    useState<RideRequest[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadRides = async () => {
      try {
        const data =
          await getMyRides();

        setRides(data);
      } finally {
        setLoading(false);
      }
    };

    loadRides();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          My Rides
        </h1>

        <p className="mt-1 text-gray-500">
          Your requested and active rides.
        </p>
      </div>

      {rides.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center">
          <p className="text-gray-500">
            No rides found.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {rides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
            />
          ))}
        </div>
      )}
    </div>
  );
}