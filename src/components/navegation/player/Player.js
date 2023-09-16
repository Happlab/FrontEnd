const Player = ({ src }) => {
  return (
    <iframe 
      allowFullScreen
      src={"http://www.youtube.com/embed/" + src.split("=")[1]}
      style={{ width: "100%", height: "100%", float: "none", clear: "both", margin: "2px auto", borderRadius: "12px", border: "none" }}
    ></iframe>
  );
};

export default Player;
