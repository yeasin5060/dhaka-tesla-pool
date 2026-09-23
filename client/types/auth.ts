export type UserRole =
  | "PASSENGER"
  | "DRIVER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}