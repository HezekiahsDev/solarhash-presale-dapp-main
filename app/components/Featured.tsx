import React from "react";

function Featured() {
  return (
    <div
      className="py-8 flex flex-col items-center text-center justify-center space-y-0 md:space-y-8 px-4 bg-cover bg-center border-b-4 border-yellow-600/90"
      style={{
        backgroundImage: "url('/Solarhash_assets/dark_bg1.jpg')",
      }}
    >
      <div className="w-full overflow-hidden whitespace-nowrap  place-items-center">
        <p className="text-orange-700  text-center text-xl font-bold animate-slide">
          JOIN THE CHANGING MOMENT - JOIN THE CHANGING MOMENT - JOIN THE
          CHANGING MOMENT - JOIN THE CHANGING MOMENT - JOIN THE CHANGING MOMENT
          - JOIN THE CHANGING MOMENT
        </p>
      </div>
      {/* Video Advert */}
      <div className="">
        <div className="relative">
          <video className="h-[320px] w-[720px]" controls>
            <source src="/Solarhash_assets/shtp.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default Featured;
