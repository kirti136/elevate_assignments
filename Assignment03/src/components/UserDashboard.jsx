import React from "react";
import UserProfile from "./UserProfile";

const UserDashboard = ({ name, email, bio, imageUrl, isLoggedIn }) => {
  return (
    <>
      {isLoggedIn && (
        <UserProfile
          name={name}
          email={email}
          bio={bio}
          imageUrl={imageUrl}
          isLoggedIn={isLoggedIn}
        />
      )}

      {isLoggedIn && <button>Logout</button>}

      {!isLoggedIn && <p>You need to Login </p> && <button>Login</button>}
    </>
  );
};

export default UserDashboard;
