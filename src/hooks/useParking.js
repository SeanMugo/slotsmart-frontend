import { useEffect, useState } from "react";
import { getParkingSlots } from "../services/parkingService";

export default function useParking() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSlots = async () => {
    try {
      const data = await getParkingSlots();
      setSlots(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return {
    slots,
    loading,
    refreshSlots: fetchSlots,
  };
}