import api from "../api/axios";

/**
 * Initiate an M-Pesa STK Push
 */
export const initiateSTKPush = async (data) => {
  const response = await api.post("/mpesa/initiate/", data);
  return response.data;
};