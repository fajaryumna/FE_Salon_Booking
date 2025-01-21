"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
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
    setSuccess("");
  
    try {
      // Kirim data ke endpoint register
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`,
        formData,
        {
            headers: {
                "Content-Type": "application/json",    
            },
        }
      );
  
      if (response.status === 200) {
        setSuccess("Registration successful!");
        setFormData({ name: "", email: "", password: "" }); // Reset form

        // Tunggu 3 detik sebelum mengarahkan ke halaman login
        setTimeout(() => {
            router.push("/login");
          }, 3000);
      } else {
        setError(response.data.message || "Registration failed. Please try again.");
    }
    } catch (error) {
      console.error("Error:", error);
       // Ambil pesan error dari errors jika tersedia
        if (error.response?.data?.errors) {
        const errors = error.response.data.errors;

        // Gabungkan semua pesan error menjadi satu string
        const errorMessages = Object.keys(errors)
            .map((field) => `${field}: ${errors[field].join(", ")}`)
            .join("\n");

            setError(`\n${errorMessages}`);
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
        <h2 className="text-2xl font-bold text-center text-black">Register</h2>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            />
          </div>

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
                    type={showPassword ? 'text' : 'password'}
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
                        src={`/image/icons/${
                            showPassword ? "eye-fill" : "eye-off-fill"
                        }.svg`}
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
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </form>

        {/* Notifikasi */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}      </div>
    </div>
  );
}
