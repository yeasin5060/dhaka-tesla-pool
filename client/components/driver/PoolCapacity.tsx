import { Users } from "lucide-react";

interface Props {
  capacity: number;
  occupied: number;
}

export default function PoolCapacity({
  capacity,
  occupied,
}: Props) {
  const percentage =
    capacity > 0
      ? Math.min((occupied / capacity) * 100, 100)
      : 0;

  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={20} />

          <h3 className="font-semibold">
            Pool Capacity
          </h3>
        </div>

        <span className="text-sm font-semibold">
          {occupied}/{capacity}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        {Array.from({
          length: capacity,
        }).map((_, index) => {
          const occupiedSeat =
            index < occupied;

          return (
            <div
              key={index}
              className={`flex h-12 flex-1 items-center justify-center rounded-lg border text-sm font-medium ${
                occupiedSeat
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-gray-50 text-gray-400"
              }`}
            >
              Seat {index + 1}
            </div>
          );
        })}
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-black transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-2 text-xs text-gray-500">
        {capacity - occupied}{" "}
        {capacity - occupied === 1
          ? "seat"
          : "seats"}{" "}
        available
      </p>
    </div>
  );
}