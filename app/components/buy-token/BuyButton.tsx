import { FC } from "react";

type Props = {
  onClick: () => void;
  text: string;
};

const BuyButton: FC<Props> = ({ onClick, text }) => {
  return (
    <button
      className="bg-amber-600 hover:bg-amber-700 text-white text-base font-semibold py-2 px-4 rounded-lg glow-on-hover"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BuyButton;
