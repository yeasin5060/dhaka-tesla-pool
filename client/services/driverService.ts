import axiosInstance from "@/lib/axios";

import type {
  DriverRequest,
} from "@/types/driver";

import type { Pool, Vehicle } from "@/types/pool";
import type { RideRequest } from "@/types/ride";

export const toggleDriverOnline =
  async (
    isOnline: boolean
  ): Promise<Vehicle> => {
    const response =
      await axiosInstance.patch<{
        vehicle: Vehicle;
      }>("/driver/online", {
        isOnline,
      });

    return response.data.vehicle;
  };

  export const getDriverVehicle =
  async (): Promise<Vehicle> => {
    const response =
      await axiosInstance.get<{
        vehicle: Vehicle;
      }>("/driver/vehicle");

    return response.data.vehicle;
  };

export const getDriverRequests =
  async (): Promise<DriverRequest[]> => {
    const response =
      await axiosInstance.get<{
        rides: DriverRequest[];
      }>("/driver/requests");

    return response.data.rides;
  };

export const acceptRide = async (
  rideId: string
): Promise<RideRequest> => {
  const response =
    await axiosInstance.post<{
      ride: RideRequest;
    }>(
      `/driver/rides/${rideId}/accept`
    );

  return response.data.ride;
};

export const arriveAtRide = async (
  rideId: string
) => {
  const response =
    await axiosInstance.post<{
      ride: RideRequest;
    }>(
      `/driver/rides/${rideId}/arrive`
    );

  return response.data.ride;
};

export const startRide = async (
  rideId: string
) => {
  const response =
    await axiosInstance.post<{
      ride: RideRequest;
    }>(
      `/driver/rides/${rideId}/start`
    );

  return response.data.ride;
};

export const completeRide = async (
  rideId: string
) => {
  const response =
    await axiosInstance.post<{
      ride: RideRequest;
    }>(
      `/driver/rides/${rideId}/complete`
    );

  return response.data.ride;
};

export const getCurrentPool =
  async (): Promise<Pool | null> => {
    const response =
      await axiosInstance.get<{
        pool: Pool | null;
      }>("/driver/current-pool");

    return response.data.pool;
  };