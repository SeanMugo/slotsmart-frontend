import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllUsers,
  activateUser,
  deactivateUser,
} from "../services/adminService";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    refreshUsers();
  }, []);

  async function refreshUsers() {
    setLoading(true);

    try {
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Could not load users.");
    } finally {
      setLoading(false);
    }
  }

  async function activate(id, username) {
    setBusyId(id);

    try {
      await activateUser(id);
      toast.success(`${username} activated.`);
      refreshUsers();
    } finally {
      setBusyId(null);
    }
  }

  async function deactivate(id, username) {
    setBusyId(id);

    try {
      await deactivateUser(id);
      toast.success(`${username} deactivated.`);
      refreshUsers();
    } finally {
      setBusyId(null);
    }
  }

  return {
    users,
    loading,
    busyId,
    refreshUsers,
    activate,
    deactivate,
  };
}