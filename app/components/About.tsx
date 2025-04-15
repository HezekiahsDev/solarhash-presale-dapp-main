"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="py-16 px-6 flex flex-col items-center text-center space-y-8 bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/Solarhash_assets/green_bg.png')" }}
    >
      {/* Title */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="p-2 border-b border-yellow-500 rounded-lg"
      >
        <h2 className="text-xl md:text-2xl font-bold uppercase text-yellow-500">
          About Us
        </h2>
      </motion.div>

      {/* Content Section */}
      <motion.div
        data-aos="fade-up"
        className="max-w-3xl space-y-6 bg-black bg-opacity-20 p-6 rounded-lg border-yellow-500 border"
      >
        <p className="text-base md:text-xl">
          <strong>Solar Hash Token (SHTP)</strong> is an innovative
          blockchain-based token developed on the Solana blockchain to promote a
          sustainable future. With a clear focus on renewable energy, especially
          solar power, the Solar Hash Token bridges the gap between eco-friendly
          energy production and the cryptocurrency world.
        </p>

        {/* Vision Section */}
        <div data-aos="zoom-in">
          <h3 className="text-xl md:text-2xl font-semibold text-yellow-400 mb-2">
            The Vision
          </h3>
          <p className="text-sm md:text-lg">
            The vision behind Solar Hash Token is to provide funding for
            renewable energy projects while offering a sustainable solution to
            the energy-intensive Bitcoin mining industry. In the face of climate
            change and rising energy consumption, SHTP offers a unique
            opportunity to actively support the transition to clean energy.
          </p>
        </div>

        {/* Mission Section */}
        <div data-aos="fade-right">
          <h3 className="text-xl md:text-2xl font-semibold text-yellow-400 mb-2">
            The Mission
          </h3>
          <p className="text-sm md:text-lg">
            Our mission is to support and fully fund solar energy projects
            globally, connecting the renewable energy sector with blockchain
            technology to enable the shift to clean energy. Investors and
            supporters gain real value, such as:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2 text-sm md:text-lg">
            <li>
              Low-cost hosting for mining operations powered by renewable
              energy.
            </li>
            <li>Regular airdrops in $SHTP & SHTU with growing potential.</li>
          </ul>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 p-4 bg-yellow-500 text-black rounded-lg"
        >
          <h3 className="text-xl font-bold">Be Part of the Vision!</h3>
          <p className="text-sm md:text-lg">
            Support the Solar Hash Token and invest in a sustainable and
            profitable future, where innovation and environmental stewardship go
            hand in hand. Together, we can achieve more!
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default About;
