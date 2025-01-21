"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, removeToken } from "@/lib/auth";

export default function DetailBooking() {
  const [isInitialized, setIsInitialized] = useState(false); // Tambahkan state untuk cek inisialisasi
  const [orderDetails, setOrderDetails] = useState(null);
  const token = getToken();

  useEffect(() => {
    const initializeState = async () => {
      const pathname = window.location.pathname; // Mendapatkan path dari URL
      const appointmentId = pathname.split("/").pop(); // Ambil ID dari path terakhir
      console.log(appointmentId);

      if (!token || !appointmentId) {
        console.error("Token atau appointmentId tidak ditemukan!");
        return;
      }
  
      try {
        // Fetch appointment details
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments/${appointmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.data.success) {
          const data = response.data.data;
  
          // Set order details
          setOrderDetails({
            treatments: data.treatments.map((treatment) => ({
              treatmentName: treatment.treatment_name,
              categoryName: treatment.treatment_category,
              therapistName: treatment.therapist_name,
              price: parseFloat(treatment.price),
              serviceFee: parseFloat(treatment.service_fee),
            })),
            location: data.branch?.name,
            idLocation: data.branch?.id,
            date: data.date,
            time: data.start_time,
            customer: {
              name: data.customer_name,
              phone: data.customer_phone,
            },
          });
        } else {
          console.error("Error fetching booking details:", response.data.message);
        }
      } catch (err) {
        console.error("Error fetching booking details:", err);
      }
    };
  
    initializeState();
  }, []);  

  // Hitung total harga
  const totalPrice = orderDetails
    ? orderDetails.treatments.reduce(
        (acc, treatment) => acc + treatment.price + treatment.serviceFee,
        0
      )
    : 0;

  const handleLogout = async () => {
    try {
      if (!token) {
        console.error("Token tidak ditemukan!");
        return;
      }

      // Kirim permintaan logout ke API
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
  
      if (response.status === 200) {
        removeToken();
        // Arahkan ke halaman login
        window.location.href = "/login";
      } else {
        // Tangani jika logout API gagal
        alert("Failed to logout. Please try again.");
      }
    } catch (error) {
      // Tangani error dari permintaan API
      console.error("Logout error:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white font-roboto">
      {/* Header */}
      {/* <div className="bg-yellow-500 text-center py-6 relative">
        <h1 className="text-lg font-bold text-white">SALONKU</h1>
        <h1 className="text-lg font-bold text-white">BOOKING ONLINE</h1>
      </div> */}

      {/* Main Content */}
      <div className="bg-white rounded-t-3xl px-6 pt-6 pb-6 relative z-10">
      <div className="flex flex-col items-center justify-center">
        <span className="text-4xl mb-2">😊</span>
        <h2 className="text-center text-2xl font-bold text-yellow-700 mb-4">Booking Successfully</h2>
      </div>

        {/* Order Details */}
        {!orderDetails ? (
          <div className="bg-white h-[480px]">
            <p className=" text-center text-gray-500">Loading order details...</p>
          </div>
        ) : (
          <>
            <div className="bg-yellow-50 rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p className="flex justify-between">
                  <span className="font-medium">Customer</span>{" "}
                  <span className="font-bold">{orderDetails.customer.name}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Location</span>{" "}
                  <span className="font-bold">{orderDetails.location}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Phone No</span>{" "}
                  <span className="font-bold">{orderDetails.customer.phone}</span>
                </p>
                <div className="flex justify-between">
                  <p className="font-medium">Treatment</p>
                  <ul className="list-none text-right">
                    {orderDetails.treatments.map((treatment, index) => (
                      <li className="font-bold" key={index}>{`${treatment.treatmentName} (${treatment.categoryName})`}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Therapist</p>
                  <ul className="list-none text-right">
                    {[...new Set(orderDetails.treatments.map(treatment => treatment.therapistName))].map(
                      (therapistName, index) => (
                        <li className="font-bold" key={index}>{therapistName}</li>
                      )
                    )}
                  </ul>
                </div>
                <p className="flex justify-between">
                  <span className="font-medium">Date</span>{" "}
                  <span className="font-bold">
                    {new Intl.DateTimeFormat("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(orderDetails.date))}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Time</span> <span className="font-bold">{orderDetails.time}</span>
                </p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-yellow-50 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Detail</h3>
              <div className="text-sm text-gray-600 space-y-2">
                {orderDetails.treatments.map((treatment, index) => (
                  <p key={index} className="flex justify-between">
                    <span>{`${treatment.treatmentName} (${treatment.categoryName})`}</span>
                    <span>Rp {Number(treatment.price).toLocaleString()}</span>
                  </p>
                ))}
                <p className="flex justify-between">
                  <span>Service</span>
                  <span>Rp {orderDetails.treatments.reduce((acc, t) => acc + t.serviceFee, 0).toLocaleString()}</span>
                </p>
                <hr className="my-2 border-gray-400" />
                <p className="font-bold text-gray-800 flex justify-between">
                  <span>Total</span>
                  <span>Rp {Number(totalPrice).toLocaleString()}</span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 bg-white pt-4">
        <Link
          href="/homepage"
          className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg flex items-center justify-center shadow-lg"
        >
          Home
        </Link>
        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-white border border-yellow-500 text-yellow-500 font-bold py-3 rounded-lg flex items-center justify-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

