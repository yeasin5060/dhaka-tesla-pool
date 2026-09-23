"use client";

import {
  useCallback,
  useState,
} from "react";

import {
  toggleDriverOnline,
  getCurrentPool,
} from "@/services/driverService";

import type {
  Pool,
  Vehicle,
} from "@/types/pool";

export const useDriver = () => {
  const [vehicle, setVehicle] =
    useState<Vehicle | null>(
      null
    );

  const [pool, setPool] =
    useState<Pool | null>(null);

  const [loading, setLoading] =
    useState(false);

  const toggleOnline =
    async (isOnline: boolean) => {
      setLoading(true);

      try {
        const updated =
          await toggleDriverOnline(
            isOnline
          );

        setVehicle(updated);

        return updated;
      } finally {
        setLoading(false);
      }
    };

  const fetchCurrentPool =
    useCallback(async () => {
      const data =
        await getCurrentPool();

      setPool(data);

      return data;
    }, []);

  return {
    vehicle,
    pool,
    loading,
    toggleOnline,
    fetchCurrentPool,
  };
};