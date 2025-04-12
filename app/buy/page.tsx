import React from "react";
import BuyTokens from "../components/BuyTokens";

function BuyPage() {
  return (
    <div className="pt-32 pb-12 min-h-screen bg-teal-800 px-4 text-white flex flex-col items-center justify-center space-y-12">
      <BuyTokens />
    </div>
  );
}

export default BuyPage;
