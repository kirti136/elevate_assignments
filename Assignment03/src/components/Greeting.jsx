import React from "react";

const Greeting = ({ name, timeOfDay }) => {
  return (
    <div>
      Good {timeOfDay}, {name}!
    </div>
  );
};

export default Greeting;
