"use client";

import Link from "next/link";
import { setToken } from "@/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import Image from "next/image";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Kirim data ke endpoint login
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Cek jika login berhasil
      if (response.data.success) {
        const { token, role } = response.data.data;

        // Simpan token ke localStorage (atau sesuai kebutuhan)
        setToken(token);

        // Arahkan berdasarkan peran pengguna
        if (role === "customer") {
          router.push("/homepage");
        } else {
          setError("Anda tidak memiliki akses.");
        }
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;

        // Gabungkan semua pesan error menjadi satu string
        const errorMessages = Object.keys(errors)
            .map((field) => `${field}: ${errors[field].join(", ")}`)
            .join("\n");

            setError(`Validation failed:\n${errorMessages}`);
        } else {
            setError(
            error.response?.data?.message || "An error occurred. Please try again."
        );
        }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white font-roboto">
      <div className="w-full max-w-sm p-6">
        <h2 className="text-2xl font-bold text-center text-black">Login</h2>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your e-mail"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <Image
                  src={`/image/icons/${showPassword ? "eye-fill" : "eye-off-fill"}.svg`}
                  alt={showPassword ? "Hide Password" : "Show Password"}
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-bold py-3 rounded-lg ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </form>

        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}

        <p className="text-center text-gray-500 mt-4">
          Belum punya akun?{" "}
          <Link href="/register" className="text-yellow-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
