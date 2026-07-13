import { useEffect, useState } from "react";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";

export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshProfile() {
    try {
      setLoading(true);

      const data = await getProfile();

      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile(data) {
    const response = await updateProfile(data);

    setProfile(response.user);

    return response;
  }

  useEffect(() => {
    refreshProfile();
  }, []);

  return {
    profile,
    loading,
    refreshProfile,
    saveProfile,
  };
}