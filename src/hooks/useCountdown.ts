import { useEffect, useState } from 'react';

export const useCountdown = (start: number, end: number) => {
  const [countdown, setCountdown] = useState(start);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown <= end) {
        clearInterval(timer);
      } else {
        setCountdown(count => count - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown, end]);

  return countdown;
};
