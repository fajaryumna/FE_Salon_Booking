"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Preview() {
  // State untuk data input pengguna
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const updatedFormData = {
      ...formData,
      [id]: value,
    };
    setFormData(updatedFormData);

    // Simpan data ke localStorage
    localStorage.setItem("detailCustomer", JSON.stringify(updatedFormData));
  };

  // Ambil data dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("detailCustomer"));
    if (storedData) {
      setFormData(storedData);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white font-roboto">
      {/* Header */}
      <div className="w-full bg-white text-center py-6">
        <h1 className="text-2xl font-bold text-yellow-700">Preview</h1>
      </div>

      {/* Form Section */}
      <div className="w-full  bg-yellow-50 rounded-2xl shadow-lg p-6 mx-auto h-[580px]">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Customer Information</h2>
        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            />
          </div>
        </form>
      </div>

      {/* Buttons */}
      <div className="bg-yellow-50 py-4 px-6">
        <Link
          href="/order-review"
          className={`w-full bg-yellow-500 text-white font-bold py-3 rounded-lg flex items-center justify-center ${
            !formData.name || !formData.email || !formData.phone ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={(e) => {
            if (!formData.name || !formData.email || !formData.phone) e.preventDefault();
          }}
        >
          Next ➔
        </Link>
        <Link
          href="/select-therapist"
          className="w-full mt-4 bg-white border border-yellow-500 text-yellow-500 font-bold py-3 rounded-lg flex items-center justify-center"
        >
          ⬅ Back
        </Link>
      </div>
    </div>
  );
}
