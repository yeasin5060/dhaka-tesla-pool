"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import RideStatus from "@/components/passenger/RideStatus";

import { getDriverRequests } from "@/services/driverService";

import type { DriverRequest } from "@/types/driver";

export default function DriverHistoryPage() {
  const [rides, setRides] =
    useState<DriverRequest[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data =
          await getDriverRequests();

        setRides(
          data.filter(
            (ride) =>
              ride.status === "COMPLETED" ||
              ride.status === "CANCELLED"
          )
        );
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Driver History
        </h1>

        <p className="mt-1 text-gray-500">
          Completed and cancelled rides.
        </p>
      </div>

      {rides.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center">
          <p className="text-gray-500">
            No history found.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {rides.map((ride) => (
            <div
              key={ride.id}
              className="rounded-2xl border bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">
                    {ride.passenger?.name ||
                      "Passenger"}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {ride.pickupZone}
                    {" → "}
                    {ride.destinationZone}
                  </p>
                </div>

                <RideStatus
                  status={ride.status}
                />
              </div>

              <div className="mt-4 flex justify-between text-sm">
                <span className="text-gray-500">
                  Seats
                </span>

                <span>
                  {ride.requestedSeats}
                </span>
              </div>

              <div className="mt-2 flex justify-between text-sm">
                <span className="text-gray-500">
                  Fare
                </span>

                <span className="font-medium">
                  ৳{ride.poolFarePaisa / 100}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}