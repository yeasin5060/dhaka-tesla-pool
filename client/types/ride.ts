export type RideStatus =
  | "REQUESTED"
  | "MATCHED"
  | "DRIVER_ARRIVED"
  | "STARTED"
  | "COMPLETED"
  | "CANCELLED";

export interface RideRequest {
  id: string;

  passengerId: string;

  pickupZone: string;
  destinationZone: string;

  pickupLat?: number;
  pickupLng?: number;

  destinationLat?: number;
  destinationLng?: number;

  requestedSeats: number;

  distanceKm: number;

  normalFarePaisa: number;
  poolFarePaisa: number;

  status: RideStatus;

  poolId?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface CreateRideData {
  pickupZone: string;
  destinationZone: string;

  pickupLat?: number;
  pickupLng?: number;

  destinationLat?: number;
  destinationLng?: number;

  requestedSeats: number;

  distanceKm: number;
}