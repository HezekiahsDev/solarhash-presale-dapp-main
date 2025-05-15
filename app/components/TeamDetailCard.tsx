"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

type TeamDetailCardProps = {
  name: string;
  title: string;
  description: string[];
  image: string;
};

const TeamDetailCard: React.FC<TeamDetailCardProps> = ({
  name,
  title,
  description,
  image,
}) => {
  return (
    <motion.div
      className="bg-white bg-opacity-10 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center backdrop-blur-md hover:scale-[1.02] transition-transform"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="rounded-full object-cover mb-4"
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-sm text-teal-200 mb-3">{title}</p>
      <ul className="text-sm space-y-1">
        {description.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TeamDetailCard;
