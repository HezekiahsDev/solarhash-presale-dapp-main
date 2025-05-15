"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projectList = [
  {
    title: "50kwp Solar Plant Tkviavi Village Georgia",
    year: 2024,
    status: "finished",
    description: "50kwp Solar Plant in Tkviavi Village Georgia.",
    image: "/Solarhash_assets/solar-powered.jpeg",
    pdf: "/Solarhash_assets/50kwp+Tkviavi+funding.pdf",
  },
  {
    title: "500kwp Upgrade Shida Kartli Area Georgia",
    year: 2023,
    status: "ongoing",
    description: "500kwp Upgrade Shida Kartli Area Georgia",
    image: "/Solarhash_assets/solar-field.jpeg",
    pdf: "/Solarhash_assets/Project+Shida+Kartli+funding.pdf",
  },
];

const Projects: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSupport = (title: string) => {
    console.log(`Funding project: ${title}`);
    // TODO: implement funding modal
  };

  const handleViewDetails = (title: string, pdf: string) => {
    console.log(`Viewing details for: ${title}`);
    window.open(pdf, "_blank");
  };

  return (
    <section className="pt-32 pb-12 min-h-screen bg-teal-800 px-4 text-white flex flex-col items-center justify-center space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold">Our Projects</h2>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectList.map((project, index) => (
          <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <ProjectCard
              title={project.title}
              year={project.year}
              status={project.status as "ongoing" | "finished"}
              description={project.description}
              image={project.image}
              onViewClick={() => handleViewDetails(project.title, project.pdf)}
              onSupportClick={
                project.status === "ongoing"
                  ? () => handleSupport(project.title)
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
