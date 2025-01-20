"use client";

import Image from "next/image";
import Link from "next/link";

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-roboto">
      {/* Header Section */}
      <div className="w-full bg-white text-center py-20">
        <h1 className="text-2xl font-bold text-yellow-700">SALONKU</h1>
        <h2 className="text-2xl font-bold text-yellow-700">BOOKING ONLINE</h2>
      </div>

      {/* Main Section */}
      <div className="w-full bg-yellow-500 rounded-t-3xl px-6 py-6 text-center">
        <h2 className="text-2xl font-light text-white">
          Hello <span className="font-bold">There,</span>
        </h2>
        <p className="text-white mt-2">Let's take care of your beauty</p>
        <button className="mt-6 bg-white text-yellow-700 font-bold py-3 px-10 rounded-full shadow-md hover:shadow-lg">
          <Link href="/select-location">
            Book Now
          </Link>
        </button>
      </div>

      {/* Feed Section */}
      <div className="w-full bg-yellow-500 px-6 py-10">
        <h3 className="text-lg font-bold text-white mb-6">Feed for you</h3>
        <div className="flex flex-row justify-start gap-4 overflow-x-auto">
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden w-64 flex-shrink-0"
            >
              <Image
                src="/image/feed.png"
                alt="Person wearing pink gloves holding a nail file"
                width={256}
                height={144}
                className="w-full h-36 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-gray-800">
                  5 Advice for your beauty routine
                </h4>
                <p className="text-gray-600 text-sm mt-2">
                  Lorem ipsum dolor sit amet consectetur. At augue scelerisque
                  rutrum id. Tellus adipiscing massa ac in tristique interdum
                  at.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
