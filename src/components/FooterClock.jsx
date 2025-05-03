import { useEffect, useState } from 'react';

const FooterClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', {
      hour12: false,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <footer className="text-center py-4 border-t border-gray-700 mt-auto">
      <p className="text-sm text-gray-300">
        {formatTime(time)} {formatDate(time)}
      </p>
    </footer>
  );
};

export default FooterClock;
