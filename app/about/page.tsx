import React from "react";

import AboutSolarHashToken from "../components/AboutSolarHashToken";
import SolarHashTeam from "../components/SolarHashTeam";

function AboutUsPage() {
  return (
    <div className="min-h-screen bg-teal-800 px-4 text-white flex flex-col items-center justify-center space-y-12">
      <main className="flex-grow">
        <AboutSolarHashToken />
        <SolarHashTeam />
      </main>
    </div>
  );
}

export default AboutUsPage;
