"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";

import PassengerList from "@/components/driver/PassengerList";
import PoolCapacity from "@/components/driver/PoolCapacity";

import {
  getCurrentPool,
  arriveAtRide,
  startRide,
  completeRide,
} from "@/services/driverService";

import type { Pool } from "@/types/pool";

export default function CurrentRidePage() {
  const [pool, setPool] =
    useState<Pool | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  const loadPool = async () => {
    try {
      const data =
        await getCurrentPool();

      setPool(data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load current pool"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPool();
  }, []);

  const getOccupiedSeats = () => {
    if (!pool) return 0;

    return pool.members.reduce(
      (total, member) =>
        total + member.seats,
      0
    );
  };

  const handleAction = async (
    action: "arrive" | "start" | "complete"
  ) => {
    if (!pool || pool.members.length === 0) {
      return;
    }

    setActionLoading(true);

    try {
      // Current implementation assumes
      // first ride controls the pool lifecycle.
      const rideId =
        pool.members[0].rideRequestId;

      let updatedRide;

      if (action === "arrive") {
        updatedRide =
          await arriveAtRide(rideId);
      }

      if (action === "start") {
        updatedRide =
          await startRide(rideId);
      }

      if (action === "complete") {
        updatedRide =
          await completeRide(rideId);
      }

      toast.success(
        `Ride ${action} successful`
      );

      await loadPool();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          `Could not ${action} ride`
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!pool) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">
            Current Pool
          </h1>

          <p className="mt-1 text-gray-500">
            No active pool right now.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-10 text-center">
          <p className="text-gray-500">
            Accept a ride request to create
            your pool.
          </p>
        </div>
      </div>
    );
  }

  const occupiedSeats =
    getOccupiedSeats();

  const capacity =
    pool.vehicle?.capacity || 3;

  const poolStatus =
    pool.status;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Current Pool
        </h1>

        <p className="mt-1 text-gray-500">
          Manage passengers and ride lifecycle.
        </p>
      </div>

      {/* Vehicle */}
      <div className="rounded-2xl border bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">
              Vehicle
            </p>

            <h2 className="mt-1 text-lg font-bold">
              {pool.vehicle?.name || "Tesla"}
            </h2>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
            {poolStatus}
          </span>
        </div>
      </div>

      {/* Capacity */}
      <PoolCapacity
        capacity={capacity}
        occupied={occupiedSeats}
      />

      {/* Passengers */}
      <div className="rounded-2xl border bg-white p-5">
        <div className="mb-4">
          <h2 className="font-semibold">
            Passengers
          </h2>

          <p className="text-sm text-gray-500">
            {pool.members.length} passenger
            {pool.members.length !== 1
              ? "s"
              : ""}
          </p>
        </div>

        <PassengerList
          members={pool.members}
        />
      </div>

      {/* Lifecycle */}
      <div className="rounded-2xl border bg-white p-5">
        <h2 className="font-semibold">
          Ride Lifecycle
        </h2>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {poolStatus === "ACTIVE" && (
            <Button
              onClick={() =>
                handleAction("arrive")
              }
              loading={actionLoading}
              className="flex-1"
            >
              Arrived
            </Button>
          )}

          {poolStatus === "STARTED" && (
            <Button
              onClick={() =>
                handleAction("complete")
              }
              loading={actionLoading}
              className="flex-1"
            >
              Complete Ride
            </Button>
          )}

          {poolStatus === "ACTIVE" && (
            <Button
              onClick={() =>
                handleAction("start")
              }
              loading={actionLoading}
              className="flex-1 bg-gray-800 hover:bg-gray-700"
            >
              Start Ride
            </Button>
          )}
        </div>

        {poolStatus === "COMPLETED" && (
          <div className="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-700">
            This pool has been completed.
          </div>
        )}
      </div>
    </div>
  );
}