import type { User } from "./auth";
import type { RideRequest } from "./ride";
import type { Vehicle } from "./pool";

export interface DriverRequest
  extends RideRequest {
  passenger?: Pick<
    User,
    "id" | "name"
  >;
}

export interface DriverVehicle
  extends Vehicle {
  driver?: User;
}