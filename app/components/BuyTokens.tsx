"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Presale and wallet connection flows are temporarily disabled.
const BuyTokens = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="justify-center text-center px-6 py-10 shadow-lg rounded-3xl sm:p-12 snake-border">
      <motion.h1
        className="py-2 text-lg font-bold text-[#F4C542]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Presale Unavailable
      </motion.h1>

      <motion.p
        className="text-gray-200 mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Wallet connection, token purchases, and admin actions are commented out
        while the presale is paused.
      </motion.p>
    </div>
  );
};

export default BuyTokens;

/*
Original presale and wallet implementation (commented out for now):

<original code removed>
*/
