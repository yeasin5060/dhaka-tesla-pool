import axiosInstance from "../lib/axios";

import type { Pool } from "../types/pool";

export const getPools = async () => {
  const response =
    await axiosInstance.get<{
      pools: Pool[];
    }>("/pools");

  return response.data.pools;
};

export const getPoolById = async (
  id: string
) => {
  const response =
    await axiosInstance.get<{
      pool: Pool;
    }>(`/pools/${id}`);

  return response.data.pool;
};