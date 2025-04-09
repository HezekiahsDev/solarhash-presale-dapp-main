"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

function SHTP() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="py-12 px-6 h-auto flex flex-col items-center text-center space-y-8 bg-cover bg-center text-black relative overflow-hidden"
      style={{ backgroundImage: "url('/Solarhash_assets/train.gif')" }}
    >
      {/* Overlay to dim the background */}
      <div className="absolute inset-0 bg-green-900 opacity-20"></div>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-xl md:text-2xl text-green-700 font-bold">
          Why Solar Hash Token?
        </h2>
        <p className="max-w-3xl md:text-lg">
          At Solar Hash Token, we believe in building trust and empowering our
          community through 100% transparency and real value. Here’s why you
          should choose to join us on this journey.
        </p>
      </motion.div>

      <div className="max-w-3xl space-y-6">
        {/** Card Section */}
        {cardData.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center"
            data-aos="fade-up"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={96}
              height={96}
              className="mb-2"
            />
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p>{item.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="max-w-3xl text-lg font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        By choosing Solar Hash Token, you’re not just investing in a
        cryptocurrency – you’re becoming part of a movement that values
        transparency, sustainability, and community-driven growth.
      </motion.p>
    </div>
  );
}

const cardData = [
  {
    image: "/Solarhash_assets/money_bulb.png",
    title: "Complete Transparency",
    description:
      "We provide full documentation for all upcoming projects through our dedicated project portfolio, ensuring every investor has access to detailed pricing and purchase data for all components involved.",
  },
  {
    image: "/Solarhash_assets/money_connect.png",
    title: "Direct Access to the Founders",
    description:
      "Unlike many projects that hide behind anonymity, we offer personal and direct communication with the founders. Whether you have questions, suggestions, or concerns, our team is always available to engage with you.",
  },
  {
    image: "/Solarhash_assets/coin_in_hand.png",
    title: "Fair Distribution of Tokens",
    description:
      "To reward our community, we’ve allocated a portion of tokens specifically for airdrops to registered users, allowing early supporters to benefit from the project’s growth and success.",
  },
  {
    image: "/Solarhash_assets/coin_grow.png",
    title: "Low-Cost Hosting for Token Holders",
    description:
      "Holders of the Solar Hash Token gain exclusive access to low-cost hosting services for their mining operations. Hosting is available at a maximum cost of $0.07 per kWh, supporting sustainable energy solutions.",
  },
];

export default SHTP;
