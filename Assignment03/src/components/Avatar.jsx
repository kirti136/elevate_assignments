import React from "react";

const Avatar = ({ imageUrl }) => {
  return (
    <div>
      <img width={50} height={50} src={imageUrl} alt="profile" />
    </div>
  );
};

export default Avatar;
