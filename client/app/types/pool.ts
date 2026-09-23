import type { RideRequest } from "./ride";
import type { User } from "./auth";

export type PoolStatus =
  | "ACTIVE"
  | "STARTED"
  | "COMPLETED"
  | "CANCELLED";

export interface Vehicle {
  id: string;
  name: string;
  capacity: number;
  driverId: string;
  isOnline: boolean;
}

export interface PoolMember {
  id: string;
  poolId: string;
  rideRequestId: string;
  seats: number;
  farePaisa: number;

  rideRequest?: RideRequest & {
    passenger?: Pick<
      User,
      "id" | "name"
    >;
  };
}

export interface Pool {
  id: string;
  vehicleId: string;
  status: PoolStatus;

  vehicle?: Vehicle;

  members: PoolMember[];

  createdAt: string;
  updatedAt: string;
}