"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

function Airdrop() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 to-teal-900 px-4 flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Blurred background accents */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-400 rounded-full filter blur-3xl opacity-20 animate-pulse" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-6 z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Airdrop Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-white/80">
          We’re preparing something amazing. Stay tuned for the Airdrop launch!
        </p>

        <div className="flex items-center justify-center gap-2 text-white/70">
          <Clock className="w-5 h-5" />
          <span>Launching Q2 2025</span>
        </div>

        {/* Optional: Add a notify me button */}
        <button className="mt-4 px-6 py-2 bg-white text-teal-800 font-medium rounded-full hover:bg-gray-100 transition">
          Notify Me
        </button>
      </motion.div>
    </div>
  );
}

export default Airdrop;
