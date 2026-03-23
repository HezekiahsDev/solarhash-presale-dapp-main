"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LitePaper from "./buttons/LitePaper";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image"; // ✅ Import Next.js Image component

const Welcome = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        {/* Hero Title */}
        <h1
          className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          data-aos="fade-down"
        >
          Solar Hash Token
        </h1>

        {/* Hero Subtitle */}
        <p
          className="text-base md:text-xl font-medium text-gray-300 mb-8"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          The bridge between crypto mining and green energy
        </p>

        {/* Rotating Logo */}
        <div className="flex justify-center mb-8 animate-spin-slow">
          <Image
            src="/Solarhash_assets/icon.png"
            alt="Solar Hash Logo"
            width={100}
            height={100}
            className="animate-spin-slow"
            data-aos="zoom-in"
            data-aos-delay="200"
          />
        </div>

        {/* Hero CTA and short pitch */}
        <div
          className="flex flex-col items-center gap-6 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="text-center max-w-2xl">
            <p className="text-sm md:text-base text-teal-200">
              Solar Hash Token (SHTP) funds and powers solar-driven mining and
              clean-energy projects worldwide, delivering real value to holders
              through low-cost hosting, airdrops, and transparent, community-led
              financing.
            </p>
          </div>

          <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <LitePaper />

            <Link href="/about" data-aos="fade-right" data-aos-delay="350">
              <Button className="w-full text-center" variant="action">
                Join the Movement
              </Button>
            </Link>

            <Link href="/projects" data-aos="fade-right" data-aos-delay="350">
              <Button className="w-full text-center" variant="secondary">
                View Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
