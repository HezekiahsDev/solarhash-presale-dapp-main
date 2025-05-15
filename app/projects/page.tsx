import React from "react";

import Projects from "../components/Projects";

function ProjectPage() {
  return (
    <div className="flex flex-col">
      <main className="flex-grow">
        <Projects />
      </main>
    </div>
  );
}

export default ProjectPage;
