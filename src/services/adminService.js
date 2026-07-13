import api from "../api/axios";

// =========================
// ADMIN: USER MANAGEMENT
// =========================

export const getAllUsers = async () => {
  const response = await api.get("/auth/admin/users/");
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post(
    "/auth/admin/users/create/",
    userData
  );

  return response.data;
};

export const updateUser = async (
  userId,
  userData
) => {
  const response = await api.put(
    `/auth/admin/users/${userId}/`,
    userData
  );

  return response.data;
};

export const activateUser = async (
  userId
) => {
  const response = await api.post(
    `/auth/admin/users/${userId}/activate/`
  );

  return response.data;
};

export const deactivateUser = async (
  userId
) => {
  const response = await api.post(
    `/auth/admin/users/${userId}/deactivate/`
  );

  return response.data;
};