import { useState } from "react";
import toast from "react-hot-toast";

import useParking from "../hooks/useParking";
import useAuth from "../hooks/useAuth";

import {
  updateParkingSlot,
  createParkingSlot,
  deleteParkingSlot,
} from "../services/parkingService";

import ParkingStats from "../components/parking/ParkingStats";
import ParkingFilters from "../components/parking/ParkingFilters";
import ParkingSlotCard from "../components/parking/ParkingSlotCard";
import SlotModal from "../components/parking/SlotModal";
import ConfirmModal from "../components/common/ConfirmModal";

import { ParkingSquare } from "lucide-react";

export default function Parking() {
  const { slots, loading, refreshSlots } = useParking();
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";
  const isGateStaff = user?.role === "gate_staff";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showDeleteModal, setShowDeleteModal] =
  useState(false);

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-lg text-slate-500">
          Loading parking slots...
        </p>
      </div>
    );
  }

  const available = slots.filter(
    (slot) => slot.status === "available"
  ).length;

  const occupied = slots.filter(
    (slot) => slot.status === "occupied"
  ).length;

  const maintenance = slots.filter(
    (slot) => slot.status === "maintenance"
  ).length;

  const filteredSlots = slots.filter((slot) => {
    const matchesSearch = slot.slot_number
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      slot.status === statusFilter;

    const matchesZone =
      zoneFilter === "all" ||
      slot.zone === zoneFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesZone
    );
  });

  async function handleSaveSlot() {
    if (!selectedSlot) return;

    try {
      if (selectedSlot.id) {
        await updateParkingSlot(
          selectedSlot.id,
          selectedSlot
        );

        toast.success(
          "Parking slot updated successfully."
        );
      } else {
        await createParkingSlot(selectedSlot);

        toast.success(
          "Parking slot created successfully."
        );
      }

      await refreshSlots();
      setSelectedSlot(null);

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ??
        "Failed to save parking slot."
      );
    }
  }

  async function handleDeleteSlot() {
  if (!selectedSlot?.id) return;

  try {
    await deleteParkingSlot(
      selectedSlot.id
    );

    await refreshSlots();

    toast.success(
      `Parking slot ${selectedSlot.slot_number} deleted successfully.`
    );

    setSelectedSlot(null);
    setShowDeleteModal(false);

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.detail ??
      "Unable to delete parking slot."
    );
  }
}

  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            🅿 Parking Overview
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor the live status of every parking space.
          </p>

        </div>

        {isAdmin && (
          <button
            onClick={() =>
              setSelectedSlot({
                slot_number: "",
                floor: 1,
                zone: "A",
                slot_type: "car",
                has_charger: false,
                status: "available",
                base_rate: "",
              })
            }
            className="rounded-xl bg-[#1A5F7A] px-5 py-2 font-semibold text-white transition hover:bg-[#144b61]"
          >
            + New Slot
          </button>
        )}

      </div>

      <ParkingStats
        total={slots.length}
        available={available}
        occupied={occupied}
        maintenance={maintenance}
      />

      <ParkingFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        zoneFilter={zoneFilter}
        setZoneFilter={setZoneFilter}
      />

      {filteredSlots.length === 0 ? (

        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

          <ParkingSquare
            className="mx-auto mb-3 text-slate-400"
            size={40}
          />

          <h2 className="text-xl font-semibold text-slate-700">
            No parking slots found
          </h2>

          <p className="mt-2 text-slate-500">
            Try changing your search or filters.
          </p>

        </div>

      ) : (

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filteredSlots.map((slot) => (
            <ParkingSlotCard
              key={slot.id}
              slot={slot}
              isAdmin={isAdmin}
              isGateStaff={isGateStaff}
              onEdit={setSelectedSlot}
            />
          ))}

        </div>

      )}

      <SlotModal
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        onSave={handleSaveSlot}
        onDelete={() => setShowDeleteModal(true)}
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Parking Slot"
        message={
          selectedSlot &&
          `Delete parking slot ${selectedSlot.slot_number}? This action cannot be undone.`
        }
        confirmText="Delete"
        confirmColor="bg-red-600 hover:bg-red-700"
        onConfirm={handleDeleteSlot}
        onCancel={() => setShowDeleteModal(false)}
      />

    </div>
  );
}