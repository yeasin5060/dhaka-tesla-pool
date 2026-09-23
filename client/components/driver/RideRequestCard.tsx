"use client";

import Button from "@/components/ui/Button";

import type {
  DriverRequest,
} from "@/types/driver";

interface Props {
  ride: DriverRequest;
  onAccept: (
    rideId: string
  ) => Promise<void>;
  loading?: boolean;
}

export default function RideRequestCard({
  ride,
  onAccept,
  loading = false,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">
            {ride.passenger?.name ||
              "Passenger"}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {ride.pickupZone} →{" "}
            {ride.destinationZone}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">
            Seats
          </p>

          <p className="font-bold">
            {ride.requestedSeats}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">
            Distance
          </p>

          <p className="font-medium">
            {ride.distanceKm} km
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Pool Fare
          </p>

          <p className="font-medium">
            ৳{ride.poolFarePaisa / 100}
          </p>
        </div>
      </div>

      <Button
        onClick={() =>
          onAccept(ride.id)
        }
        loading={loading}
        className="mt-5 w-full"
      >
        Accept Ride
      </Button>
    </div>
  );
}