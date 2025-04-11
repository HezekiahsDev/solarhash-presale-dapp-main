"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LitePaper from "./buttons/LitePaper";

const Welcome = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="mb-20">
      <div className="container mx-auto px-4 text-center">
        {/* Hero Title */}
        <h1 className="text-xl md:text-2xl font-bold" data-aos="fade-down">
          Solar Hash Token
        </h1>

        {/* Hero Subtitle */}
        <p
          className=" md:text-lg  font-semibold p-4 text-gray-300"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          The bridge between crypto mining and green energy
        </p>

        {/* Token Sale Statistics */}
        <div
          className="bg-amber-800 p-6 rounded-lg mb-8 inline-block"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h2 className="text-xl font-bold mb-2">Token Sale Progress</h2>
          <p className="text-gray-300">$1,234,567 Raised of $5,000,000 Goal</p>
        </div>

        <div className=" " data-aos="fade-right" data-aos-delay="300">
          <LitePaper />
        </div>
      </div>
    </section>
  );
};

export default Welcome;
