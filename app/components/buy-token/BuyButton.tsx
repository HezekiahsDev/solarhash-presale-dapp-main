"use client";

import { FC } from "react";
import { event as gaEvent } from "../../lib/gtag"; // Adjust import path if needed

type Props = {
  onClick: () => void;
  text: string;
};

const BuyButton: FC<Props> = ({ onClick, text }) => {
  const handleClick = () => {
    // Fire Google Analytics Event
    gaEvent({
      action: "buy_button_click",
      category: "Presale",
      label: text,
    });

    // Then execute the provided onClick
    onClick();
  };

  return (
    <button
      className="bg-amber-600 hover:bg-amber-700 text-white text-base font-semibold py-2 px-4 rounded-lg glow-on-hover"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default BuyButton;
