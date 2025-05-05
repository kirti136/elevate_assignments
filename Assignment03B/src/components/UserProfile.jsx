import React from "react";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";

const UserProfile = ({ name, email, bio, imageUrl }) => {
  return (
    <>
      <Avatar imageUrl={imageUrl} />
      <UserInfo name={name} email={email} bio={bio} />
    </>
  );
};

export default UserProfile;
