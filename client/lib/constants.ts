export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",

  PASSENGER_DASHBOARD:
    "/passenger/dashboard",

  REQUEST_RIDE:
    "/passenger/request-ride",

  PASSENGER_RIDES:
    "/passenger/rides",

  PASSENGER_HISTORY:
    "/passenger/history",

  DRIVER_DASHBOARD:
    "/driver/dashboard",

  DRIVER_REQUESTS:
    "/driver/requests",

  DRIVER_CURRENT_RIDE:
    "/driver/current-ride",

  DRIVER_HISTORY:
    "/driver/history",
};

export const RIDE_STATUS = {
  REQUESTED: "REQUESTED",
  MATCHED: "MATCHED",
  DRIVER_ARRIVED: "DRIVER_ARRIVED",
  STARTED: "STARTED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export const USER_ROLES = {
  PASSENGER: "PASSENGER",
  DRIVER: "DRIVER",
} as const;

export const DHAKA_ZONES = [
  "Banani",
  "Mohakhali",
  "Gulshan 1",
  "Gulshan 2",
  "Tejgaon",
];