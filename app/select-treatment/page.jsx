"use client";

import Link from "next/link";
import { useState } from "react";

export default function SelectTreatment() {
  const [treatments, setTreatments] = useState([
    { id: 1, name: "Service 1", category: "Category 1", price: 78000, selected: false, image: "/image/treatment1.png"},
    { id: 2, name: "Service 2", category: "Category 1", price: 175000, selected: false, image: "/image/treatment1.png"},
    { id: 3, name: "Service 3", category: "Category 1", price: 175000, selected: false, image: "/image/treatment1.png"},
    { id: 4, name: "Service 4", category: "Category 2", price: 78000, selected: false, image: "/image/treatment1.png"},
    { id: 5, name: "Service 5", category: "Category 2", price: 175000, selected: false, image: "/image/treatment1.png"},
    { id: 6, name: "Service 6", category: "Category 2", price: 175000, selected: false, image: "/image/treatment1.png"},
    { id: 7, name: "Service 4", category: "Category 3", price: 78000, selected: false, image: "/image/treatment1.png"},
    { id: 8, name: "Service 5", category: "Category 3", price: 175000, selected: false, image: "/image/treatment1.png"},
    { id: 9, name: "Service 6", category: "Category 3", price: 175000, selected: false, image: "/image/treatment1.png"},
    // { id: 10, name: "Service 4", category: "Category 4", price: 78000, selected: false },
    // { id: 11, name: "Service 5", category: "Category 4", price: 175000, selected: false },
    // { id: 12, name: "Service 6", category: "Category 4", price: 175000, selected: false },
    // { id: 13, name: "Service 1", category: "Category 5", price: 78000, selected: false },
    // { id: 14, name: "Service 2", category: "Category 5", price: 175000, selected: false },
    // { id: 15, name: "Service 3", category: "Category 5", price: 175000, selected: false },
  ]);

  const toggleTreatment = (id) => {
    setTreatments((prev) =>
      prev.map((treatment) =>
        treatment.id === id
          ? { ...treatment, selected: !treatment.selected }
          : treatment
      )
    );
  };

  const selectedCount = treatments.filter((t) => t.selected).length;

  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-roboto">
      {/* Header */}
      <div className="w-full bg-white text-center py-6">
        <h1 className="text-2xl font-bold text-yellow-700">Select Treatment</h1>
      </div>

      {/* Treatment List */}
      <div className="w-full flex-grow bg-yellow-50 rounded-t-3xl p-6 shadow-lg">
        <div className="space-y-4 overflow-y-auto h-[550px]">
          {[...new Set(treatments.map((t) => t.category))].map((category) => (
            <div key={category}>
              <h2 className="text-lg font-bold text-yellow-700 my-4">{category}</h2>
              <div className="grid grid-cols-3 gap-4">
                {treatments
                  .filter((t) => t.category === category)
                  .map((treatment) => (
                <div
                      key={treatment.id}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        treatment.selected
                          ? "bg-yellow-500 text-white border-yellow-500"
                          : "bg-white text-gray-800 border-gray-300"
                      }`}
                      onClick={() => toggleTreatment(treatment.id)}
                    >
                      <img
                        src={treatment.image}
                        alt={treatment.name}
                        className="w-16 h-16 object-cover mx-auto mb-2"
                      />
                      <p className="font-bold text-sm text-center">{treatment.name}</p>
                      <p className="text-sm text-center">{treatment.price}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full p-4 bg-yellow-50">
        <Link 
            href="/select-date" 
            className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center">
            {selectedCount} Treatment{selectedCount > 1 ? "s" : ""} ➔
        </Link>

        <Link
          href="/select-location"
          className="w-full mt-4 bg-white border border-yellow-500 text-yellow-500 font-bold py-3 rounded-lg shadow-md flex items-center justify-center text-center"
        >
          ⬅ Back
        </Link>
      </div>
    </div>
  );
}