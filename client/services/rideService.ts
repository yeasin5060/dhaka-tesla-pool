import axiosInstance from "@/lib/axios";

import type {
  CreateRideData,
  RideRequest,
} from "@/types/ride";

export const createRide = async (
  data: CreateRideData
) => {
  const response =
    await axiosInstance.post<{
      message: string;
      ride: RideRequest;
    }>("/rides", data);

  return response.data;
};

export const getMyRides = async () => {
  const response =
    await axiosInstance.get<{
      rides: RideRequest[];
    }>("/rides");

  return response.data.rides;
};

export const getRideById = async (
  id: string
) => {
  const response =
    await axiosInstance.get<{
      ride: RideRequest;
    }>(`/rides/${id}`);

  return response.data.ride;
};

export const cancelRide = async (
  id: string
) => {
  const response =
    await axiosInstance.patch<{
      message: string;
      ride: RideRequest;
    }>(`/rides/${id}/cancel`);

  return response.data;
};