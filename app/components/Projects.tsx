"use client";

import React from "react";
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
  const handleSupport = (title: string) => {
    console.log(`Funding project: ${title}`);
    // Add wallet integration or modal here
  };

  const handleViewDetails = (title: string, pdf: string) => {
    console.log(`Viewing details for: ${title}`);

    window.open(pdf, "_blank");
  };

  return (
    <section className="pt-32 pb-12 min-h-screen bg-teal-800 px-4 text-white">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {projectList.map((project, index) => (
            <ProjectCard
              key={index}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
