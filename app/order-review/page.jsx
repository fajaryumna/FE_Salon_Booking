"use client";

import Link from "next/link";

export default function OrderReview() {
  const orderDetails = {
    transactionId: "A2023060600001",
    customer: "Lilya Amanda",
    location: "Cabang 1",
    phoneNumber: "+62 812 3231 231",
    treatments: [
      { name: "Lorem Ipsum 1 (Category A)", price: 120000 },
      { name: "Lorem Ipsum 2 (Category B)", price: 70000 },
    ],
    therapist: "Natalia Kennedy Nasution",
    date: "Sunday, 18 June 2023",
    time: "08:00",
    serviceFee: 80000,
  };

  const totalPrice = orderDetails.treatments.reduce(
    (acc, treatment) => acc + treatment.price,
    orderDetails.serviceFee
  );

  return (
    <div className="min-h-screen bg-yellow-500 font-roboto">
      {/* Header */}
      <div className="bg-yellow-500 text-center py-6 relative">
        <h1 className="text-lg font-bold text-white">SALONKU</h1>
        <h1 className="text-lg font-bold text-white">BOOKING ONLINE</h1>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-t-3xl shadow-lg  px-6 pt-6 pb-6 relative z-10">
        <h2 className="text-center text-2xl font-bold text-yellow-700 mb-6">Review</h2>

        {/* Order Details */}
        <div className="bg-yellow-50 rounded-2xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p className="flex justify-between">
              <span className="font-medium">ID Trans</span> {orderDetails.transactionId}
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Customer</span> {orderDetails.customer}
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Location</span> {orderDetails.location}
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Phone No</span> {orderDetails.phoneNumber}
            </p>
            <div className="flex justify-between">
              <p className="font-medium">Treatment:</p>
              <ul className="list-disc text-right">
                {orderDetails.treatments.map((treatment, index) => (
                  <li key={index}>{treatment.name}</li>
                ))}
              </ul>
            </div>
            <p className="flex justify-between">
              <span className="font-medium">Therapist:</span> {orderDetails.therapist}
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Date:</span> {orderDetails.date}
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Time:</span> {orderDetails.time}
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-yellow-50 rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Detail</h3>
          <div className="text-sm text-gray-600 space-y-2">
            {orderDetails.treatments.map((treatment, index) => (
              <p key={index} className="flex justify-between">
                <span>{treatment.name}</span>
                <span>IDR {treatment.price}</span>
              </p>
            ))}
            <p className="flex justify-between">
              <span>Service</span>
              <span>IDR {orderDetails.serviceFee}</span>
            </p>
            <hr className="my-2" />
            <p className="font-bold text-gray-800 flex justify-between">
              <span>Total</span>
              <span>Rp. {totalPrice}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-white">
        <Link
          href="/"
          className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg flex items-center justify-center shadow-lg"
        >
          Submit
        </Link>
      </div>
    </div>
  );
}
