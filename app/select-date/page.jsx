"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { enUS } from "date-fns/locale";
import Link from "next/link";
import axios from "axios";
import { getToken } from "@/lib/auth";

export default function SelectDateAndTime() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [branchId, setBranchId] = useState(null);
  const [treatmentsId, setTreatmentsId] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const storedBooking = JSON.parse(localStorage.getItem("detailBooking")) || [];
    const ids = storedBooking.map((item) => parseInt(item.treatmentId, 10));
    setTreatmentsId(ids);

    const storedLocation = JSON.parse(localStorage.getItem("selectedLocation"));
    const branchId = parseInt(storedLocation, 10);
    setBranchId(branchId);

    // Load selected date and time from localStorage
    const savedDate = localStorage.getItem("selectedDate");
    const savedTime = localStorage.getItem("selectedTime");

    if (savedDate) {
      setSelectedDate(savedDate); // Set the date
    }
    if (savedTime) {
      setSelectedTime(savedTime); // Temporarily save time
    }
  }, []);

  // Fetch available time slots when selectedDate changes
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!selectedDate || !branchId || treatmentsId.length === 0) return;

      try {
        const token = getToken();
        if (!token) {
          setError("Token tidak ditemukan!");
          return;
        }

        setIsLoading(true);
        setError("");

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments/check-slots`,
          {
            branch_id: branchId,
            date: selectedDate,
            treatments_id: treatmentsId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const slots = response.data.data.map((slot) => slot.start_time);
          setAvailableTimeSlots(slots);

          // Automatically select the saved time if it exists and matches
          const savedTime = localStorage.getItem("selectedTime");
          if (savedTime && slots.includes(savedTime)) {
            setSelectedTime(savedTime);
          }
        } else {
          setError(response.data.message || "Failed to retrieve available slots.");
        }
      } catch (err) {
        console.error("Error fetching time slots:", err);
        setError("An error occurred while fetching time slots.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDate, branchId, treatmentsId]);

  // Save selectedDate and selectedTime to localStorage
  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem("selectedDate", selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime) {
      localStorage.setItem("selectedTime", selectedTime);
    }
  }, [selectedTime]);

  const handleDateChange = (date) => {
    const formattedDate = date.toLocaleDateString("en-CA"); // Format menjadi YYYY-MM-DD
    setSelectedDate(formattedDate); // Atur tanggal yang dipilih
    setSelectedTime(null); // Reset selectedTime ketika selectedDate berubah
    localStorage.removeItem("selectedTime"); // Hapus dari localStorage
  };  

  const isDateAvailable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-roboto">
      <div className="w-full bg-white text-center py-6">
        <h1 className="text-2xl font-bold text-yellow-700">Select Date</h1>
      </div>

      <div className="w-full p-6 bg-yellow-50 rounded-t-3xl shadow-lg">
        <h2 className="text-lg font-bold text-yellow-700 mb-4">Set Appointment</h2>
        <Calendar
          value={selectedDate ? new Date(selectedDate) : null} // Preselect date from localStorage
          onChange={handleDateChange}
          tileDisabled={({ date }) => !isDateAvailable(date)}
          className="w-full mb-6"
          locale={enUS}
        />
      </div>

      <div className="w-full p-6 bg-white shadow-lg bg-yellow-50">
        <h2 className="text-lg font-bold text-yellow-700 mb-4">Slot Available</h2>
        <div className="grid grid-cols-3 gap-4">
          {isLoading ? (
            <p className="text-gray-500 col-span-3">Loading time slots...</p>
          ) : error ? (
            <p className="text-red-500 col-span-3">{error}</p>
          ) : availableTimeSlots.length > 0 ? (
            availableTimeSlots.map((time, index) => (
              <button
                key={index}
                className={`p-3 border rounded-lg ${
                  selectedTime === time
                    ? "bg-yellow-500 text-white border-yellow-500"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))
          ) : (
            <p className="text-gray-500 col-span-3">No available slots for this date.</p>
          )}
        </div>
      </div>

      <div className="w-full p-4 bg-yellow-50 ">
        <Link
          href="/select-therapist"
          className={`w-full py-3 rounded-lg shadow-lg flex items-center justify-center font-bold ${
            selectedDate && selectedTime
              ? "bg-yellow-500 text-white"
              : "bg-yellow-500 text-white opacity-50 cursor-not-allowed"
          }`} 
        >
          Select ➔
        </Link>

        <Link
          href="/select-treatment"
          className="w-full mt-4 bg-white border border-yellow-500 text-yellow-500 font-bold py-3 rounded-lg shadow-md flex items-center justify-center text-center"
        >
          ⬅ Back
        </Link>
      </div>
    </div>
  );
}
