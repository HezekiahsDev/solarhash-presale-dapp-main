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
    <section className="mb-4 py-8">
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
            src="/Solarhash_assets/icon-nobg.png"
            alt="Solar Hash Logo"
            width={100}
            height={100}
            className="animate-spin-slow"
            data-aos="zoom-in"
            data-aos-delay="200"
          />
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <LitePaper />
          <Link href={"/guide"} data-aos="fade-right" data-aos-delay="300">
            <Button variant="secondary">Buying Guide</Button>
          </Link>

          <Link href={"/buy"} data-aos="fade-right" data-aos-delay="400">
            <Button variant="action">Buy Token</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
