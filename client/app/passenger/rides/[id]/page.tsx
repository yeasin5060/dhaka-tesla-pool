"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowRight,
  MapPin,
  Users,
  Route,
  Wallet,
} from "lucide-react";

import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import RideStatus from "@/components/passenger/RideStatus";

import {
  cancelRide,
  getRideById,
} from "@/services/rideService";

import type { RideRequest } from "@/types/ride";

export default function RideDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const rideId = params.id as string;

  const [ride, setRide] =
    useState<RideRequest | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [cancelling, setCancelling] =
    useState(false);

  const loadRide = async () => {
    try {
      const data =
        await getRideById(rideId);

      setRide(data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load ride"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rideId) {
      loadRide();
    }
  }, [rideId]);

  const handleCancel = async () => {
    if (!ride) return;

    setCancelling(true);

    try {
      const result =
        await cancelRide(ride.id);

      setRide(result.ride);

      toast.success(
        "Ride cancelled successfully"
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Could not cancel ride"
      );
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!ride) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center">
        <p className="text-gray-500">
          Ride not found.
        </p>
      </div>
    );
  }

  const canCancel =
    ride.status === "REQUESTED" ||
    ride.status === "MATCHED";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Ride Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Ride ID: {ride.id}
          </p>
        </div>

        <RideStatus status={ride.status} />
      </div>

      {/* Route */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="mb-5 font-semibold">
          Your Route
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <MapPin size={20} />
          </div>

          <div className="flex-1">
            <p className="text-xs text-gray-500">
              Pickup
            </p>

            <p className="font-medium">
              {ride.pickupZone}
            </p>
          </div>

          <ArrowRight
            size={20}
            className="text-gray-400"
          />

          <div className="flex-1 text-right">
            <p className="text-xs text-gray-500">
              Destination
            </p>

            <p className="font-medium">
              {ride.destinationZone}
            </p>
          </div>
        </div>
      </div>

      {/* Ride information */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5">
          <Users size={20} />

          <p className="mt-3 text-xs text-gray-500">
            Seats
          </p>

          <p className="mt-1 text-xl font-bold">
            {ride.requestedSeats}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <Route size={20} />

          <p className="mt-3 text-xs text-gray-500">
            Distance
          </p>

          <p className="mt-1 text-xl font-bold">
            {ride.distanceKm} km
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <Wallet size={20} />

          <p className="mt-3 text-xs text-gray-500">
            Pool Fare
          </p>

          <p className="mt-1 text-xl font-bold">
            ৳{ride.poolFarePaisa / 100}
          </p>
        </div>
      </div>

      {/* Fare comparison */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="font-semibold">
          Fare Details
        </h2>

        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">
              Normal Fare
            </span>

            <span>
              ৳{ride.normalFarePaisa / 100}
            </span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>
              Pool Fare
            </span>

            <span>
              ৳{ride.poolFarePaisa / 100}
            </span>
          </div>
        </div>
      </div>

      {/* Cancel */}
      {canCancel && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <h3 className="font-semibold text-red-700">
            Cancel Ride
          </h3>

          <p className="mt-1 text-sm text-red-600">
            You can cancel this ride before
            the trip starts.
          </p>

          <Button
            onClick={handleCancel}
            loading={cancelling}
            className="mt-4 bg-red-600 hover:bg-red-700"
          >
            Cancel Ride
          </Button>
        </div>
      )}
    </div>
  );
}