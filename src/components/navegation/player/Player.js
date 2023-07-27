import React from "react";

const Player = ({ src }) => {
  return (
    <video
      style={{ width: "100%", height: "100%", borderRadius: "10px" }}
      controls
    >
      <source
        src={"https://www.youtube.com/embed/" + src.split("=")[1]}
      ></source>
    </video>
  );
};

export default Player;
