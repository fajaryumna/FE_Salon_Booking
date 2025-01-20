"use client";

import { useState } from "react";
import Link from "next/link";

export default function SelectTherapist() {
  // Local data simulation
  const treatmentData = [
    {
      treatment_id: 1,
      treatment_name: "Treatment 1",
      treatment_duration: 30,
      therapists: [
        {
          id: 1,
          name: "Therapist 1",
          photo: "image/therapist1.png",
          service_fee: "20000.00",
          rating: 4.5,
        },
        {
          id: 4,
          name: "Therapist 4",
          photo: "image/therapist1.png",
          service_fee: "20000.00",
          rating: 4.1,
        },
      ],
    },
    {
      treatment_id: 4,
      treatment_name: "Treatment 4",
      treatment_duration: 30,
      therapists: [
        {
          id: 2,
          name: "Therapist 2",
          photo: "image/therapist1.png",
          service_fee: "30000.00",
          rating: 4.9,
        },
      ],
    },
  ];

  // State to track selected therapists
  const [selectedTherapists, setSelectedTherapists] = useState({});

  // Function to handle therapist selection
  const handleSelectTherapist = (treatmentId, therapistId) => {
    setSelectedTherapists((prev) => ({
      ...prev,
      [treatmentId]: therapistId,
    }));
  };

  return (
    <div className="min-h-screen bg-white font-roboto">
      <div className="w-full bg-white text-center py-6">
        <h1 className="text-2xl font-bold text-yellow-700">Select Therapist</h1>
      </div>
      <div className="w-full flex-grow bg-yellow-50 rounded-t-3xl shadow-lg">
        {treatmentData.map((treatment) => (
          <div key={treatment.treatment_id} className="bg-yellow-50 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-yellow-700 mb-4">
              Therapist for {treatment.treatment_name}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {treatment.therapists.map((therapist) => (
                <div
                  key={therapist.id}
                  className={`p-4 border rounded-lg cursor-pointer shadow-md ${
                    selectedTherapists[treatment.treatment_id] === therapist.id
                      ? "border-yellow-500 bg-yellow-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleSelectTherapist(treatment.treatment_id, therapist.id)}
                >
                  <img
                    src={`/${therapist.photo}`}
                    alt={therapist.name}
                    className="w-full h-24 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-gray-800 font-bold">{therapist.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-xs font-semibold">
                        Rp {therapist.service_fee}
                    </p>
                    <p className="text-gray-500 text-xs flex items-center">
                        <span>⭐</span> {therapist.rating}
                    </p>                    
                    </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full p-4 bg-yellow-50">
        <Link href="/preview" className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center">
            Select ➔
        </Link>
        
        <Link
            href="/select-date"
            className="w-full mt-4 bg-white border border-yellow-500 text-yellow-500 font-bold py-3 rounded-lg shadow-md flex items-center justify-center text-center"
        >
            ⬅ Back
        </Link>
        </div>

    </div>
  );
}
