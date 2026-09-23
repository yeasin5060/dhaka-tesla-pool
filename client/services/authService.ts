import axiosInstance from "@/lib/axios";

import type {
  AuthResponse,
  LoginData,
  RegisterData,
  User,
} from "@/types/auth";

export const registerUser = async (
  data: RegisterData
): Promise<AuthResponse> => {
  const response =
    await axiosInstance.post<AuthResponse>(
      "/auth/register",
      data
    );

  return response.data;
};

export const loginUser = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response =
    await axiosInstance.post<AuthResponse>(
      "/auth/login",
      data
    );

  return response.data;
};

export const getCurrentUser =
  async (): Promise<User> => {
    const response =
      await axiosInstance.get<{
        user: User;
      }>("/auth/me");

    return response.data.user;
  };