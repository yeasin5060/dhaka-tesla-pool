import type { PoolMember } from "@/types/pool";

interface Props {
  members: PoolMember[];
}

export default function PassengerList({
  members,
}: Props) {
  if (members.length === 0) {
    return (
      <div className="rounded-xl border bg-gray-50 p-5 text-center">
        <p className="text-sm text-gray-500">
          No passengers in this pool yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {members.map((member) => {
        const passengerName =
          member.rideRequest?.passenger?.name ||
          "Passenger";

        return (
          <div
            key={member.id}
            className="flex items-center justify-between rounded-xl border bg-white p-4"
          >
            <div>
              <p className="font-medium">
                {passengerName}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {member.rideRequest?.pickupZone}
                {" → "}
                {member.rideRequest?.destinationZone}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold">
                {member.seats}{" "}
                {member.seats === 1
                  ? "Seat"
                  : "Seats"}
              </p>

              <p className="text-xs text-gray-500">
                ৳{member.farePaisa / 100}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}