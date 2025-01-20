"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { enUS } from "date-fns/locale"; // Atur locale secara eksplisit
import Link from "next/link";

export default function SelectDateAndTime() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const apiResponse = {
    availableDates: ["2025-01-21", "2025-01-22", "2025-01-23"],
    timeSlots: {
      "2025-01-21": ["08:00", "08:30", "09:00", "10:00"],
      "2025-01-22": ["09:30", "11:00", "14:00", "15:00"],
      "2025-01-23": ["08:30", "13:30", "15:30"]
    }
  };

  const isDateAvailable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
    setSelectedTime(null);
  };

  const availableTimeSlots = selectedDate ? apiResponse.timeSlots[selectedDate] || [] : [];

  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-roboto">
      <div className="w-full bg-white text-center py-6">
        <h1 className="text-2xl font-bold text-yellow-700">Select Date</h1>
      </div>

      <div className="w-full p-6 bg-yellow-50 rounded-t-3xl shadow-lg">
        <h2 className="text-lg font-bold text-yellow-700 mb-4">Set Appointment</h2>
        <Calendar
          onChange={handleDateChange}
          tileDisabled={({ date }) => !isDateAvailable(date)}
          className="w-full mb-6"
          locale={enUS} // Pastikan locale sama di server dan klien
        />
      </div>

      <div className="w-full p-6 bg-white shadow-lg bg-yellow-50">
        <h2 className="text-lg font-bold text-yellow-700 mb-4">Slot Available</h2>
        <div className="grid grid-cols-3 gap-4">
          {availableTimeSlots.length > 0 ? (
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
        <Link href="/select-therapist" className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center">
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
