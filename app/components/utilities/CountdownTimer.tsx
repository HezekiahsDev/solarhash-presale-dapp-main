"use client";
import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div
      className="flex justify-center space-x-1 mb-2"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="bg-amber-800 px-2 py-2 rounded text-center">
          <span className="text-lg font-bold">{value}</span>
          <span className="block text-sm text-gray-300">
            {unit.charAt(0).toUpperCase() + unit.slice(1)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
