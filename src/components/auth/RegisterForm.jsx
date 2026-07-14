import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../../services/authService";

export default function RegisterForm() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validatePhone = (phone) => {
        return /^(07\d{8}|01\d{8}|\+2547\d{8}|\+2541\d{8})$/.test(phone);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("Submitting registration...");

        if (!formData.full_name.trim()) {
            return toast.error("Full name is required.");
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return toast.error("Enter a valid email.");
        }

        if (!validatePhone(formData.phone_number)) {
            return toast.error(
                "Phone must be 07XXXXXXXX, 01XXXXXXXX or +254XXXXXXXXX."
            );
        }

        if (formData.password.length < 6) {
            return toast.error("Password must be at least 6 characters.");
        }

        if (formData.password !== formData.confirm_password) {
            return toast.error("Passwords do not match.");
        }

        try {

            setLoading(true);

            const names = formData.full_name.trim().split(" ");

            const first_name = names.shift();

            const last_name = names.join(" ");

            await registerUser({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                password2: formData.confirm_password,
                first_name,
                last_name,
                phone_number: formData.phone_number,
            });

            toast.success("Registration successful!");

            setFormData({
                full_name: "",
                username: "",
                email: "",
                phone_number: "",
                password: "",
                confirm_password: "",
            });

            setTimeout(() => navigate("/"), 1500);

        } catch (err) {

            toast.error(
                err.response?.data?.error ||
                "Registration failed."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            <div>

                <label className="mb-2 block text-sm font-medium">
                    Full Name
                </label>

                <input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3"
                />

            </div>

            <div>

                <label className="mb-2 block text-sm font-medium">
                    Username
                </label>

                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3"
                />

            </div>

            <div>

                <label className="mb-2 block text-sm font-medium">
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3"
                />

            </div>

            <div>

                <label className="mb-2 block text-sm font-medium">
                    Phone Number
                </label>

                <input
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="0712345678"
                    className="w-full rounded-xl border px-4 py-3"
                />

            </div>

            <div>

                <label className="mb-2 block text-sm font-medium">
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3"
                />

            </div>

            <div>

                <label className="mb-2 block text-sm font-medium">
                    Confirm Password
                </label>

                <input
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3"
                />

            </div>

            <button 
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#1A5F7A] py-3 text-white"
            >
                {loading ? "Creating..." : "Create Account"}
            </button>

            <p className="text-center text-sm">

                Already have an account?

                <Link
                    to="/"
                    className="ml-2 font-semibold text-[#22A39F]"
                >
                    Sign In
                </Link>

            </p>

        </form>
    );

}