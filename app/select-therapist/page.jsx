"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getToken } from "@/lib/auth";
import Image from "next/image";

export default function SelectTherapist() {
  const [treatmentData, setTreatmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTherapists, setSelectedTherapists] = useState({});

  const selectedLocation = localStorage.getItem("selectedLocation");
  const selectedDate = localStorage.getItem("selectedDate");
  const selectedTime = localStorage.getItem("selectedTime");
  const treatmentIds = useMemo(() => {
    const detailBooking = JSON.parse(localStorage.getItem("detailBooking")) || [];
    return detailBooking.map((detail) => detail.treatmentId);
  }, []);

  useEffect(() => {
    const detailBooking = JSON.parse(localStorage.getItem("detailBooking")) || [];
    const initialSelectedTherapists = {};
    detailBooking.forEach((item) => {
      if (item.therapistId) {
        initialSelectedTherapists[item.treatmentId] = item.therapistId;
      }
    });
    setSelectedTherapists(initialSelectedTherapists);
  }, []);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("Token tidak ditemukan!");
          return;
        }

        setLoading(true);
        const queryParams = new URLSearchParams({
          branch_id: selectedLocation,
          date: selectedDate,
          slot_time: selectedTime,
        });
        treatmentIds.forEach((id) => queryParams.append("treatments_id[]", id));

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/therapists?${queryParams}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch therapists data");
        }
        const data = await response.json();
        setTreatmentData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedLocation && selectedDate && selectedTime && treatmentIds.length > 0) {
      fetchTherapists();
    }
  }, [selectedLocation, selectedDate, selectedTime, treatmentIds]);

  const handleSelectTherapist = (treatmentId, therapistId) => {
    const currentDetailBooking = JSON.parse(localStorage.getItem("detailBooking")) || [];
    const treatmentIndex = currentDetailBooking.findIndex(
      (item) => item.treatmentId === treatmentId
    );

    const selectedTreatment = treatmentData.find(
      (treatment) => treatment.treatment_id === treatmentId
    );
    const selectedTherapist = selectedTreatment?.therapists.find(
      (therapist) => therapist.id === therapistId
    );

    if (treatmentIndex !== -1 && selectedTherapist) {
      currentDetailBooking[treatmentIndex] = {
        ...currentDetailBooking[treatmentIndex],
        therapistId: selectedTherapist.id,
        therapistName: selectedTherapist.name,
        serviceFee: Number(selectedTherapist.service_fee),
      };
      localStorage.setItem("detailBooking", JSON.stringify(currentDetailBooking));
    }

    setSelectedTherapists((prev) => ({
      ...prev,
      [treatmentId]: therapistId,
    }));
  };

  const allTherapistsSelected = useMemo(
    () =>
      treatmentIds.every((id) => selectedTherapists[id] !== undefined),
    [treatmentIds, selectedTherapists]
  );

  return (
    <div className="min-h-screen bg-white font-roboto">
      <div className="w-full bg-white text-center py-6">
        <h1 className="text-2xl font-bold text-yellow-700">Select Therapist</h1>
      </div>
      <div className="w-full flex-grow bg-yellow-50 rounded-t-3xl shadow-lg">
        {loading ? (
          <p className="text-center text-yellow-500">Loading therapists...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-y-auto">
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
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}/${therapist.photo}`}
                        alt={therapist.name}
                        width={80}
                        height={80}
                        className="w-full h-22 object-cover rounded-lg mb-3"
                      />
                      <h3 className="text-gray-800 font-bold">{therapist.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600 text-xs font-semibold">
                          Rp {Number(therapist.service_fee).toLocaleString()}
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
        )}
      </div>

      <div className="w-full p-4 bg-yellow-50">
        <Link
          href={allTherapistsSelected ? "/preview" : "#"}
          className={`w-full py-3 rounded-lg shadow-lg flex items-center justify-center font-bold ${
            allTherapistsSelected
              ? "bg-yellow-500 text-white"
              : "bg-yellow-500 text-white opacity-50 cursor-not-allowed"
          }`}
        >
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
