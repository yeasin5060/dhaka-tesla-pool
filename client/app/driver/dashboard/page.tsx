"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/useAuth";
import VehicleCard from "@/components/driver/VehicleCard";
import Loader from "@/components/ui/Loader";

import {
  toggleDriverOnline,
  getCurrentPool,
  getDriverVehicle,
} from "@/services/driverService";

import type { Vehicle, Pool } from "@/types/pool";

export default function DriverDashboard() {
  const { user } = useAuth();

  const [vehicle, setVehicle] =
    useState<Vehicle | null>(null);

  const [pool, setPool] =
    useState<Pool | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [onlineLoading, setOnlineLoading] =
    useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
        try {
            const [currentVehicle, currentPool] =
            await Promise.all([
                getDriverVehicle(),
                getCurrentPool(),
            ]);

            setVehicle(currentVehicle);
            setPool(currentPool);
        } catch (error: any) {
            toast.error(
            error?.response?.data?.message ||
                "Failed to load dashboard"
            );
        } finally {
            setLoading(false);
        }
    };

    loadDashboard();
  }, []);

  const handleToggleOnline = async (
    isOnline: boolean
  ) => {
    setOnlineLoading(true);

    try {
      const updated =
        await toggleDriverOnline(
          isOnline
        );

      setVehicle(updated);

      toast.success(
        isOnline
          ? "You are now online"
          : "You are now offline"
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Could not update driver status"
      );
    } finally {
      setOnlineLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Hello, {user?.name}
        </h1>

        <p className="mt-1 text-gray-500">
          Manage your Tesla pool.
        </p>
      </div>

      {vehicle && (
        <VehicleCard
          vehicle={vehicle}
          onToggle={handleToggleOnline}
          loading={onlineLoading}
        />
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/driver/requests"
          className="rounded-2xl bg-black p-6 text-white"
        >
          <h2 className="font-semibold">
            Ride Requests
          </h2>

          <p className="mt-2 text-sm text-gray-300">
            View available passengers.
          </p>
        </Link>

        <Link
          href="/driver/current-ride"
          className="rounded-2xl border bg-white p-6"
        >
          <h2 className="font-semibold">
            Current Pool
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {pool
              ? `${pool.members.length} passengers`
              : "No active pool"}
          </p>
        </Link>

        <Link
          href="/driver/history"
          className="rounded-2xl border bg-white p-6"
        >
          <h2 className="font-semibold">
            History
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            View completed rides.
          </p>
        </Link>
      </div>
    </div>
  );
}