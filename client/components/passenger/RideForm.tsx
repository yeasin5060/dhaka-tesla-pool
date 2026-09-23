"use client";

import {
  useState,
} from "react";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";

import {
  DHAKA_ZONES,
} from "@/lib/constants";

import {
  createRide,
} from "@/services/rideService";

export default function RideForm() {
  const router = useRouter();

  const [pickupZone, setPickupZone] =
    useState("");

  const [
    destinationZone,
    setDestinationZone,
  ] = useState("");

  const [
    requestedSeats,
    setRequestedSeats,
  ] = useState(1);

  const [distanceKm, setDistanceKm] =
    useState(5);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      pickupZone === destinationZone
    ) {
      setError(
        "Pickup and destination must be different."
      );

      return;
    }

    setError("");
    setLoading(true);

    try {
      await createRide({
        pickupZone,
        destinationZone,
        requestedSeats,
        distanceKm,
      });

      router.push(
        "/passenger/rides"
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to request ride"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-5 rounded-2xl border bg-white p-6"
    >
      <div>
        <h2 className="text-xl font-bold">
          Request a Ride
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter your journey details.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Pickup
        </label>

        <select
          value={pickupZone}
          onChange={(e) =>
            setPickupZone(
              e.target.value
            )
          }
          required
          className="w-full rounded-lg border px-4 py-3 outline-none"
        >
          <option value="">
            Select pickup
          </option>

          {DHAKA_ZONES.map(
            (zone) => (
              <option
                key={zone}
                value={zone}
              >
                {zone}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Destination
        </label>

        <select
          value={destinationZone}
          onChange={(e) =>
            setDestinationZone(
              e.target.value
            )
          }
          required
          className="w-full rounded-lg border px-4 py-3 outline-none"
        >
          <option value="">
            Select destination
          </option>

          {DHAKA_ZONES.map(
            (zone) => (
              <option
                key={zone}
                value={zone}
              >
                {zone}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Seats
        </label>

        <select
          value={requestedSeats}
          onChange={(e) =>
            setRequestedSeats(
              Number(e.target.value)
            )
          }
          className="w-full rounded-lg border px-4 py-3"
        >
          <option value={1}>
            1 Seat
          </option>

          <option value={2}>
            2 Seats
          </option>

          <option value={3}>
            3 Seats
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Estimated Distance
        </label>

        <input
          type="number"
          min="1"
          step="0.1"
          value={distanceKm}
          onChange={(e) =>
            setDistanceKm(
              Number(e.target.value)
            )
          }
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        Request Ride
      </Button>
    </form>
  );
}