"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { getToken } from "@/lib/auth";

export default function SelectLocation() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null); // Default null
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false); // Tambahkan state untuk cek inisialisasi

  useEffect(() => {
    const initializeState = async () => {
      // Ambil token
      const token = getToken();
      if (!token) {
        setError("Token tidak ditemukan!");
        setIsLoading(false);
        return;
      }
  
      try {
        // Fetch lokasi
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/locations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.data.success) {
          setLocations(response.data.data);
        } else {
          setError(response.data.message || "Failed to retrieve locations.");
        }
  
        // Ambil lokasi dari localStorage jika ada
        const savedLocation = localStorage.getItem("selectedLocation");
        if (savedLocation) {
          // Pastikan tipe data konsisten dengan location.id
          setSelectedLocation(parseInt(savedLocation, 10)); // Ubah ke integer
        }
      } catch (err) {
        console.error("Error fetching locations:", err);
        setError("An error occurred while fetching locations.");
      } finally {
        setIsInitialized(true); // Tandai inisialisasi selesai
        setIsLoading(false);
      }
    };
  
    initializeState();
  }, []);  

  const handleSelectLocation = (id) => {
    setSelectedLocation(id);
    localStorage.setItem("selectedLocation", id); // Simpan di localStorage
  };

  // if (!isInitialized) {
  //   // Tampilkan placeholder loading saat data belum siap
  //   return <div className="text-center mt-10">Loading...</div>;
  // }


  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-roboto">
      {/* Header Section */}
      <div className="w-full bg-white text-center py-6">
        <h1 className="text-2xl font-bold text-yellow-700">Select Location</h1>
      </div>

      {/* Location Section */}
      <div className="w-full flex-grow bg-yellow-50 rounded-t-3xl p-6 shadow-lg">
        {isLoading ? (
          <p className="text-center text-yellow-500">Loading locations...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-4 overflow-y-auto max-h-[400px]">
            {locations.map((location) => (
              <div
                key={location.id}
                className={`flex items-start justify-between border rounded-lg p-4 cursor-pointer ${
                  selectedLocation === location.id
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                onClick={() => handleSelectLocation(location.id)}
              >
                <div className="flex items-start">
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full ${
                      selectedLocation === location.id
                        ? "bg-white text-yellow-500"
                        : "bg-yellow-500 text-white"
                    } mr-3`}
                  >
                    📍
                  </div>
                  <div>
                    <h2 className="font-bold">{location.name}</h2>
                    <p className="text-sm">{location.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="w-full p-4 bg-yellow-50">
        <Link
          href={
            selectedLocation
              ? `/select-treatment?location=${selectedLocation}`
              : "#"
          }
          className={`w-full py-3 rounded-lg shadow-lg flex items-center justify-center font-bold ${
            selectedLocation
              ? "bg-yellow-500 text-white"
              : "bg-yellow-400 text-yellow-100 cursor-not-allowed"
          }`}
        >
          Select ➔
        </Link>

        <Link
          href="/homepage"
          className="w-full mt-4 bg-white border border-yellow-500 text-yellow-500 font-bold py-3 rounded-lg shadow-md flex items-center justify-center"
        >
          ⬅ Back
        </Link>
      </div>
    </div>
  );
}
