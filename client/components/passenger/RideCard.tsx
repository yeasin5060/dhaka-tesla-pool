import Link from "next/link";

import RideStatus from "./RideStatus";

import type {
  RideRequest,
} from "@/types/ride";

interface Props {
  ride: RideRequest;
}

export default function RideCard({
  ride,
}: Props) {
  const normalFare =
    ride.normalFarePaisa / 100;

  const poolFare =
    ride.poolFarePaisa / 100;

  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            {ride.pickupZone}
          </p>

          <p className="font-semibold">
            ↓
          </p>

          <p className="text-sm font-medium">
            {ride.destinationZone}
          </p>
        </div>

        <RideStatus
          status={ride.status}
        />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-gray-500">
            Seats
          </p>

          <p className="font-medium">
            {ride.requestedSeats}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Distance
          </p>

          <p className="font-medium">
            {ride.distanceKm} km
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Pool Fare
          </p>

          <p className="font-medium">
            ৳{poolFare}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Normal: ৳{normalFare}
        </span>

        <Link
          href={`/passenger/rides/${ride.id}`}
          className="text-sm font-medium underline"
        >
          View details
        </Link>
      </div>
    </div>
  );
}