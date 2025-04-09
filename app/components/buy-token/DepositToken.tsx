import { FC } from "react";

type Props = {
  onClick: () => void;
};

const DepositToken: FC<Props> = ({ onClick }) => {
  return (
    <button
      className="bg-amber-600 hover:bg-amber-700 text-white text-base font-semibold py-2 px-4 rounded-lg glow-on-hover"
      onClick={onClick}
    >
      Deposit Tokens
    </button>
  );
};

export default DepositToken;
