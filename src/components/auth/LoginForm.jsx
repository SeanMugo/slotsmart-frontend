import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      login(
        response.user,
        response.access,
        response.refresh
      );

      toast.success("Welcome back!");

      if (response.user?.role === "admin") {
        navigate("/admin");
      } else if (response.user?.role === "gate_staff") {
        navigate("/gate");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      const message =
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.detail ||
        "Login failed."; 
     
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Username */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Username
        </label>

        <input
          type="text"
          placeholder="Enter your username"
          disabled={isSubmitting}
          {...register("username", {
            required: "Username is required",
          })}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#1A5F7A] focus:ring-2 focus:ring-[#1A5F7A]/20 disabled:bg-slate-100"
        />

        {errors.username && (
          <p className="mt-1 text-sm text-red-500">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            disabled={isSubmitting}
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-[#1A5F7A] focus:ring-2 focus:ring-[#1A5F7A]/20 disabled:bg-slate-100"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-[#1A5F7A] py-3 font-semibold text-white transition hover:bg-[#164d63] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>

      {/* Register */}
      <p className="text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-[#22A39F] hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}