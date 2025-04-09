import { FC } from "react";
import { motion } from "framer-motion";

type Props = {
  style?: React.CSSProperties;
};

const Confirmation: FC<Props> = ({ style }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={style}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
    >
      <p className="text-lg">🎉 Purchase Successful!</p>
    </motion.div>
  );
};

export default Confirmation;
