"use client";

import { Car, Wifi, WifiOff } from "lucide-react";
import Button from "@/components/ui/Button";
import type { Vehicle } from "@/types/pool";

interface Props {
  vehicle: Vehicle;
  onToggle: (isOnline: boolean) => Promise<void>;
  loading?: boolean;
}

export default function VehicleCard({
  vehicle,
  onToggle,
  loading = false,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gray-100 p-3">
            <Car size={24} />
          </div>

          <div>
            <h3 className="font-semibold">
              {vehicle.name}
            </h3>

            <p className="text-sm text-gray-500">
              Capacity: {vehicle.capacity} seats
            </p>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
            vehicle.isOnline
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {vehicle.isOnline ? (
            <Wifi size={14} />
          ) : (
            <WifiOff size={14} />
          )}

          {vehicle.isOnline ? "Online" : "Offline"}
        </div>
      </div>

      <Button
        onClick={() =>
          onToggle(!vehicle.isOnline)
        }
        loading={loading}
        className="mt-5 w-full"
      >
        {vehicle.isOnline
          ? "Go Offline"
          : "Go Online"}
      </Button>
    </div>
  );
}