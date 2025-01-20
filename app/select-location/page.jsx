"use client";

import Image from "next/image";
import Link from "next/link";

export default function SelectLocation() {
  const locations = [
    {
      id: 1,
      name: "Majapahit - Semarang",
      address: "Jl. Majapahit Raya No.12, Blok 10...",
      isSelected: false,
    },
    {
      id: 2,
      name: "Pleburuan - Semarang",
      address: "Jl. Pleburuan Raya No.12, Blok 10...",
      isSelected: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-roboto">
      {/* Header Section */}
      <div className="w-full bg-white text-center py-6">
        <h1 className="text-2xl font-bold text-yellow-700">Select Location</h1>
      </div>

      {/* Location Section */}
      <div className="w-full flex-grow bg-yellow-50 rounded-t-3xl p-6 shadow-lg">
        <div className="space-y-4 overflow-y-auto max-h-[400px]">
          {locations.map((location) => (
            <div
              key={location.id}
              className={`flex items-start justify-between border rounded-lg p-4 ${
                location.isSelected
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              <div className="flex items-start">
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded-full ${
                    location.isSelected
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
              <button
                className={`w-6 h-6 flex items-center justify-center ${
                  location.isSelected ? "text-white" : "text-yellow-500"
                }`}
              >
                📌
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full p-4 bg-yellow-50">
        <Link href="/select-treatment" className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center">
            Select ➔
        </Link>
        
        <Link
            href="/homepage"
            className="w-full mt-4 bg-white border border-yellow-500 text-yellow-500 font-bold py-3 rounded-lg shadow-md flex items-center justify-center text-center"
        >
            ⬅ Back
        </Link>
        </div>
    </div>
  );
}
