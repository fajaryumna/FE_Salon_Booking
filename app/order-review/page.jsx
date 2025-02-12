"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation"; // Perbaiki impor di sini

export default function OrderReview() {
  const [orderDetails, setOrderDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Ambil data dari localStorage
    const treatments = JSON.parse(localStorage.getItem("detailBooking")) || [];
    const selectedLocationId = localStorage.getItem("selectedLocation");
    const selectedLocationName = localStorage.getItem("selectedLocationName");
    const selectedDate = localStorage.getItem("selectedDate");
    const selectedTime = localStorage.getItem("selectedTime");
    const customer = JSON.parse(localStorage.getItem("detailCustomer"));

    // Gabungkan data menjadi satu objek
    setOrderDetails({
      treatments,
    location: selectedLocationName,
      idLocation: selectedLocationId,
      date: selectedDate,
      time: selectedTime,
      customer,
    });
  }, []);

  const handleSubmit = async () => {
    if (!orderDetails) {
      alert("Order details not available.");
      return;
    }

    const { treatments, idLocation, customer, date, time } = orderDetails;

    // Format data untuk dikirim ke API
    const data = {
      branch_id: idLocation,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      date,
      start_time: time,
      detail: treatments.map((treatment) => ({
        treatment_id: treatment.treatmentId,
        therapist_id: treatment.therapistId,
      })),
    };

    try {

      console.log(data);
      // Ambil token dari cookie
      const token = getToken();
      if (!token) {
        console.error("Token tidak ditemukan!");
        return;
      }

      // Kirim data ke API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        //save to local storage
        const appointmentId = response.data.data.appointment_id;
        localStorage.setItem("appointmentId", appointmentId);

        alert("Appointment successfully created!");

        // Hapus data dari localStorage
        localStorage.removeItem("detailBooking");
        localStorage.removeItem("detailCustomer");
        localStorage.removeItem("selectedDate");
        localStorage.removeItem("selectedLocation");
        localStorage.removeItem("selectedLocationName");
        localStorage.removeItem("selectedTime");``

        router.push(`/detail-booking/${appointmentId}`);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create appointment. Please try again.");
    }
  };

  // Hitung total harga
  const totalPrice = orderDetails?.treatments?.reduce(
    (acc, treatment) => acc + treatment.price + treatment.serviceFee,
    0
  ) || 0;

  return (
    <div className="min-h-screen bg-yellow-500 font-roboto">
      {/* Header */}
      <div className="bg-yellow-500 text-center py-4 relative">
        <h1 className="text-2xl font-bold text-white">SALONKU</h1>
        <h1 className="text-2xl font-bold text-white">BOOKING ONLINE</h1>
      </div>
  
      {/* Main Content */}
      <div className="bg-white rounded-t-3xl shadow-lg px-6 pt-6 pb-6 relative z-10">
        <h2 className="text-center text-2xl font-bold text-yellow-700 mb-6">Review</h2>
  
        {/* Order Details */}
        {!orderDetails ? (
          <div className="bg-white h-[480px]">
            <p className="text-center text-gray-500">Loading order details...</p>
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
                  <span>
                    Rp{" "}
                    {orderDetails.treatments.reduce(
                      (acc, t) => acc + t.serviceFee,
                      0
                    ).toLocaleString()}
                  </span>
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
      <div className="p-6 bg-white">
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg flex items-center justify-center shadow-lg"
        >
          Submit
        </button>
        <Link
          href="/preview"
          className="w-full mt-4 bg-white border border-yellow-500 text-yellow-500 font-bold py-3 rounded-lg flex items-center justify-center"
        >
          Back
        </Link>
      </div>
    </div>
  );
}  
