import React from "react";

export const LoginMessage = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back, User!</h1> : <h1>Please log in.</h1>}
    </div>
  );
};
