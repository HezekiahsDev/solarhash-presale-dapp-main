import React from "react";

function Banner() {
  return (
    <section
      id="banner"
      className="p-4  justify-center bg-cover bg-center border-b-4 border-green-900 overflow-hidden"
      style={{
        backgroundImage: "url('/Solarhash_assets/cloud.gif')",
      }}
    >
      <div className="w-full overflow-hidden whitespace-nowrap justify-center place-items-center">
        <p className="text-green-900  text-center text-lg font-bold animate-slide">
          🚀 Welcome to Solar Hash Family!🌟
        </p>
      </div>
    </section>
  );
}

export default Banner;
