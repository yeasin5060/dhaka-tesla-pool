"use client";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import RideRequestCard from "@/components/driver/RideRequestCard";
import Loader from "@/components/ui/Loader";

import {
  getDriverRequests,
  acceptRide,
} from "@/services/driverService";

import type {
  DriverRequest,
} from "@/types/driver";

export default function DriverRequestsPage() {
  const [
    rides,
    setRides,
  ] = useState<DriverRequest[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    acceptingId,
    setAcceptingId,
  ] = useState<string | null>(
    null
  );

  const loadRequests =
    async () => {
      try {
        const data =
          await getDriverRequests();

        setRides(data);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to load requests"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAccept = async (
    rideId: string
  ) => {
    setAcceptingId(rideId);

    try {
      await acceptRide(rideId);

      toast.success(
        "Ride accepted successfully"
      );

      await loadRequests();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Could not accept ride"
      );
    } finally {
      setAcceptingId(null);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Ride Requests
        </h1>

        <p className="mt-1 text-gray-500">
          Available passengers for your Tesla.
        </p>
      </div>

      {rides.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center">
          <p className="text-gray-500">
            No available ride requests.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {rides.map((ride) => (
            <RideRequestCard
              key={ride.id}
              ride={ride}
              onAccept={handleAccept}
              loading={
                acceptingId === ride.id
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}