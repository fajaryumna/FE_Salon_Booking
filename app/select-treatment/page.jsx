"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { getToken } from "@/lib/auth";

export default function SelectTreatment() {
  const [treatments, setTreatments] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("Token tidak ditemukan!");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/treatments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const fetchedData = response.data.data;
          const detailBooking = JSON.parse(
            localStorage.getItem("detailBooking") || "[]"
          ).map((item) => ({
            ...item,
            treatmentId: parseInt(item.treatmentId, 10),
          }));

          const formattedData = fetchedData.map((category) => ({
            ...category,
            treatments: category.treatments.map((treatment) => ({
              ...treatment,
              selected: detailBooking.some(
                (selected) => selected.treatmentId === treatment.id
              ),
            })),
          }));

          setTreatments(formattedData);
          setSelectedTreatments(detailBooking);
        } else {
          setError(response.data.message || "Failed to retrieve treatments.");
        }
      } catch (err) {
        console.error("Error fetching treatments:", err);
        setError("An error occurred while fetching treatments.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  const toggleTreatment = (categoryId, treatmentId) => {
    setTreatments((prev) =>
      prev.map((category) =>
        category.category_id === categoryId
          ? {
              ...category,
              treatments: category.treatments.map((treatment) =>
                treatment.id === treatmentId
                  ? { ...treatment, selected: !treatment.selected }
                  : treatment
              ),
            }
          : category
      )
    );

    setSelectedTreatments((prev) => {
      const alreadySelected = prev.some((t) => t.treatmentId === treatmentId);
      if (alreadySelected) {
        const updatedSelected = prev.filter((t) => t.treatmentId !== treatmentId);
        updateLocalStorage(updatedSelected);
        return updatedSelected;
      } else {
        const selectedTreatment = treatments
          .flatMap((category) => category.treatments)
          .find((t) => t.id === treatmentId);

        if (!selectedTreatment) return prev;

        const updatedSelected = [
          ...prev,
          {
            treatmentId: selectedTreatment.id,
            treatmentName: selectedTreatment.name,
            categoryName: treatments.find(
              (category) => category.category_id === categoryId
            ).category_name,
            therapistId: null,
            therapistName: null,
            price: Number(selectedTreatment.price),
            serviceFee: null,
          },
        ];
        updateLocalStorage(updatedSelected);
        return updatedSelected;
      }
    });
  };

  const updateLocalStorage = (detailBooking) => {
    localStorage.setItem("detailBooking", JSON.stringify(detailBooking));
  };

  const selectedCount = selectedTreatments.length;

  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-roboto">
      {/* Header */}
      <div className="w-full bg-white text-center py-6">
        <h1 className="text-2xl font-bold text-yellow-700">Select Treatment</h1>
      </div>

      {/* Treatment List */}
      <div className="w-full flex-grow bg-yellow-50 rounded-t-3xl p-6 shadow-lg">
        {isLoading ? (
          <p className="text-center text-yellow-500">Loading treatment...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
            <div className="space-y-4 overflow-y-auto h-[550px]">
              {treatments.map((category) => (
                <div key={category.category_id}>
                  <h2 className="text-lg font-bold text-yellow-700 my-4">
                    {category.category_name}
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    {category.treatments.map((treatment) => (
                      <div
                        key={treatment.id}
                        className={`p-4 border rounded-lg cursor-pointer ${
                          treatment.selected
                            ? "bg-yellow-500 text-white border-yellow-500"
                            : "bg-white text-gray-800 border-gray-300"
                        }`}
                        onClick={() => toggleTreatment(category.category_id, treatment.id)}
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMG_URL}/${treatment.image}`}
                          alt={treatment.name}
                          className="w-16 h-16 object-cover mx-auto mb-2"
                        />
                        <p className="font-bold text-xs text-center">{treatment.name}</p>
                        <p className="text-xs text-center">
                          Rp {Number(treatment.price).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>

      {/* Buttons */}
      <div className="w-full p-4 bg-yellow-50">
        <Link
          href="/select-date"
          className={`w-full py-3 rounded-lg shadow-lg flex items-center justify-center font-bold ${
            selectedTreatments && selectedTreatments.length > 0
              ? "bg-yellow-500 text-white"
              : "bg-yellow-500 text-white opacity-50 cursor-not-allowed"
          }`} 
        >
          {selectedCount} Treatment{selectedCount > 1 ? "s" : ""} ➔
        </Link>

        <Link
          href="/select-location"
          className="w-full mt-4 bg-white border border-yellow-500 text-yellow-500 font-bold py-3 rounded-lg shadow-md flex items-center justify-center"
        >
          ⬅ Back
        </Link>
      </div>
    </div>
  );
}
