const cities = ['London', 'New York', 'Paris', 'Berlin', 'Tokyo', 'Delhi', 'Mumbai', 'Chennai', 'Sydney', 'Moscow'];

const getCitySuggestions = async (query) => {
  if (!query) return [];
  return cities.filter((city) =>
    city.toLowerCase().startsWith(query.toLowerCase())
  );
};

export default getCitySuggestions;
