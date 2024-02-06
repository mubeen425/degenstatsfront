import axiosInstance from "../services/AxiosInstance";

export function getProfile() {
  return axiosInstance.get("/api/profile/");
}
