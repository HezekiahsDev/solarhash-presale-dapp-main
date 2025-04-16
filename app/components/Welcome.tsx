"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LitePaper from "./buttons/LitePaper";
import { Button } from "./ui/button";
import Link from "next/link";

const Welcome = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="mb-4 py-12">
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

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <LitePaper />
          <Link href={"/guide"}>
            <Button variant="secondary" className="">
              Buying Guide
            </Button>
          </Link>

          <Link href={"/buy"}>
            <Button variant="action" className="">
              Buy Token
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
