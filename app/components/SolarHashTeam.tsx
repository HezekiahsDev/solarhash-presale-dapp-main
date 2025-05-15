"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import TeamDetailCard from "./TeamDetailCard";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Oliver Spitzer",
    title: "Project Manager & CEO of So-Mining Supply (sold)",
    description: [
      "Years of experience managing mining farms and solar installations",
      "Oversees technical and operational aspects",
      "Web design & software development",
    ],
    image: "/Solarhash_assets/oliver.jpg",
  },
  {
    name: "Giorgi Khubashvili",
    title: "Project Manager for Georgia",
    description: [
      "Responsible for on-ground operations, permits, and technical maintenance",
      "Master’s degree in economics",
    ],
    image: "/Solarhash_assets/giorgi.jpg",
  },
  {
    name: "Ing. Can Orhan",
    title: "Project Manager for Turkey, Romania, Hungary (upcoming projects)",
    description: [
      "Early investor and supporter",
      "Responsible for operations in Turkey, Romania, and Hungary",
    ],
    image: "/Solarhash_assets/can.jpg",
  },

  {
    name: "Chinedu Justin Ogwu",
    title: "Project Advisor / BSc Business Administrator",
    description: [
      "Operations and permits in Nigeria",
      "Customer support for African community",
      "Social media presence manager",
    ],
    image: "/Solarhash_assets/chinedu.jpg",
  },
];

const SolarHashTeam: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      id="solarhash-team"
      className="pt-32 pb-20 px-6 bg-teal-800 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl  mb-12"
      >
        <h2 className="text-4xl text-amber-300 font-bold mb-4">
          Meet the Team
        </h2>
        <p className="text-lg text-teal-300 talic">
          The passionate minds behind Solar Hash Token driving our mission for
          sustainable, decentralized energy innovation.
        </p>
      </motion.div>
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text"></h2>
        <p className="text-lg max-w-2xl mx-auto"></p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        data-aos="fade-up"
      >
        {teamMembers.map((member, index) => (
          <TeamDetailCard
            key={index}
            name={member.name}
            title={member.title}
            description={member.description}
            image={member.image}
          />
        ))}
      </div>
    </section>
  );
};

export default SolarHashTeam;
