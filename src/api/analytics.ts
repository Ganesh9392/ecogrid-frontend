import { api } from "./client";

export const getAnalyticsSummary = async () => {
  const { data } = await api.get("/analytics/summary/");
  return data;
};