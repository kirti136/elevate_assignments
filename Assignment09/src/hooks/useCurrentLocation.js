import { useState } from 'react';

const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude });
      },
      () => alert('Unable to retrieve your location.')
    );
  };

  return { location, getLocation };
};

export default useCurrentLocation;