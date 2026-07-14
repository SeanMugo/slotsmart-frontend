import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CarFront } from "lucide-react";

import { getParkingSlots, checkIn } from "../../services/parkingService";
import { getDrivers } from "../../services/adminService";

export default function CheckInForm({ onCheckedIn }) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    loadSlots();
    loadDrivers();
  }, []);

  async function loadSlots() {
    setLoadingSlots(true);

    try {
      const data = await getParkingSlots();

      const slots = Array.isArray(data)
        ? data
        : data.results || [];

      setAvailableSlots(
        slots.filter(
          (slot) => slot.status === "available"
        )
      );
    } catch (error) {
      console.error(error);
      toast.error(
        "Unable to load available parking slots."
      );
    } finally {
      setLoadingSlots(false);
    }
  }

  async function loadDrivers() {
    try {
      const data = await getDrivers();
      setDrivers(data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load drivers.");
    }
  }

  async function onSubmit(data) {
    try {
      const payload = {
        driver_id: Number(data.driver_id),
        slot_id: Number(data.slot_id),
        license_plate:
          data.license_plate.toUpperCase(),
      };

      const response = await checkIn(payload);

      toast.success(
        response.message ||
          "Vehicle checked in successfully."
      );

      reset();

      await loadSlots();

      onCheckedIn?.();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.error ||
          "Unable to check in vehicle."
      );
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-3">

        <div className="rounded-xl bg-[#1A5F7A]/10 p-3 text-[#1A5F7A]">
          <CarFront size={22} />
        </div>

        <div>

          <h2 className="text-lg font-semibold text-slate-800">
            Vehicle Check-In
          </h2>

          <p className="text-sm text-slate-500">
            Register an arriving vehicle.
          </p>

        </div>

      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* Driver */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Driver
          </label>

          <select
            disabled={isSubmitting}
            {...register("driver_id", {
              required:
                "Please select a driver.",
              valueAsNumber: true,
            })}
            onChange={(e) => {
              const driver = drivers.find(
                (d) =>
                  d.id === Number(e.target.value)
              );

              if (driver) {
                setValue(
                  "license_plate",
                  driver.default_vehicle || ""
                );
              }
            }}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1A5F7A] focus:ring-2 focus:ring-[#1A5F7A]/20"
          >

            <option value="">
              Select a driver
            </option>

            {drivers.map((driver) => (
              <option
                key={driver.id}
                value={driver.id}
              >
                #{driver.id} • {driver.name}
              </option>
            ))}

          </select>

          {errors.driver_id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.driver_id.message}
            </p>
          )}

        </div>

        {/* Vehicle */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            License Plate
          </label>

          <input
            defaultValue=""
            type="text"
            placeholder="KDA123A"
            disabled={isSubmitting}
            {...register("license_plate", {
              required:
                "License plate is required.",
              minLength: {
                value: 6,
                message:
                  "Enter a valid license plate.",
              },
            })}
            onInput={(e) =>
              (e.target.value =
                e.target.value.toUpperCase())
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 uppercase outline-none transition focus:border-[#1A5F7A] focus:ring-2 focus:ring-[#1A5F7A]/20 disabled:bg-slate-100"
          />

          {errors.license_plate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.license_plate.message}
            </p>
          )}

        </div>

        {/* Parking Slot */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Parking Slot
          </label>

          <select
            disabled={
              loadingSlots || isSubmitting
            }
            {...register("slot_id", {
              required:
                "Please select a parking slot.",
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1A5F7A] focus:ring-2 focus:ring-[#1A5F7A]/20 disabled:bg-slate-100"
          >

            <option value="">
              {loadingSlots
                ? "Loading available slots..."
                : "Choose a parking slot"}
            </option>

            {availableSlots.map((slot) => (
              <option
                key={slot.id}
                value={slot.id}
              >
                {slot.slot_number} • Floor{" "}
                {slot.floor} • Zone {slot.zone}
                • KES {slot.base_rate}/hr
              </option>
            ))}

          </select>

          {!loadingSlots &&
            availableSlots.length ===
              0 && (
              <p className="mt-1 text-xs text-amber-600">
                No parking slots are
                currently available.
              </p>
            )}

          {errors.slot_id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.slot_id.message}
            </p>
          )}

        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-[#1A5F7A] py-3 font-semibold text-white transition hover:bg-[#164d63] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Checking Vehicle In..."
            : "Check In Vehicle"}
        </button>

      </form>

    </div>
  );
}