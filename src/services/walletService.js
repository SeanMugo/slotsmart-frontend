import api from "../api/axios";

// =========================
// WALLET BALANCE
// =========================

export const getWalletBalance = async () => {
  const response = await api.get("/wallet/balance/");
  return response.data;
};

// =========================
// WALLET TRANSACTIONS
// =========================

export const getWalletTransactions = async () => {
  const response = await api.get("/wallet/transactions/");
  return response.data;
};