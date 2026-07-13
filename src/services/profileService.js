import api from "../api/axios";

// =========================
// PROFILE
// =========================

export const getProfile = async () => {
  const response = await api.get("/auth/profile/");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/auth/profile/", data);
  return response.data;
};

// =========================
// CHANGE PASSWORD
// =========================

export const changePassword = async (data) => {
  const response = await api.post(
    "/auth/change-password/",
    data
  );

  return response.data;
};