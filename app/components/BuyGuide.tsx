"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const BuyGuide = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      id="buy-guide"
      className="pt-32 pb-12 min-h-screen bg-teal-800 px-4 text-white flex flex-col items-center justify-center space-y-12"
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Presale Paused</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Presale steps and wallet connection instructions are temporarily
          commented out. Check back later for updated purchase guidance.
        </p>
      </motion.div>
    </section>
  );
};

export default BuyGuide;

/*
Original presale buying guide with wallet instructions has been commented out while presale is paused.
*/
