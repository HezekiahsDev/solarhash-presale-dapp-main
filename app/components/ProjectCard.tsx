"use client";

import React from "react";
import { Button } from "../components/ui/button";
import Image from "next/image";

type ProjectStatus = "ongoing" | "finished";

interface ProjectCardProps {
  title: string;
  year: number;
  status: ProjectStatus;
  description: string;
  image: string;
  onViewClick?: () => void;
  onSupportClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  year,
  status,
  description,
  image,
  onViewClick,
  onSupportClick,
}) => {
  return (
    <div className="bg-amber-200/50 rounded-2xl shadow-md p-6 flex flex-col justify-between w-full max-w-md text-gray-900">
      <Image
        src={image}
        alt={title}
        width={600}
        height={192}
        className="rounded-xl w-full h-48 object-cover mb-4"
      />
      <div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-teal-800 text-sm">Year: {year}</p>
        <p className="text-sm mt-2 mb-4 text-gray-700">{description}</p>
        <p
          className={`font-bold text-lg ${
            status === "ongoing" ? "text-blue-600" : "text-green-600"
          }`}
        >
          Status: {status === "ongoing" ? "Ongoing" : "Finished"}
        </p>
      </div>

      <div className="mt-4 flex gap-3">
        {status === "ongoing" ? (
          <>
            <Button variant="secondary" onClick={onViewClick}>
              View Details
            </Button>
            <Button variant="action" onClick={onSupportClick}>
              Support project
            </Button>
          </>
        ) : (
          <Button variant="secondary" onClick={onViewClick}>
            View Details
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
