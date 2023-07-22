import React from "react";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idVideo: this.props.src.split("=")[1],
    }
  }

  render() {
    return (
      <video
        style={{ width: "100%", height: "100%", borderRadius: "10px" }}
        controls
      >
        <source src={"https://www.youtube.com/embed/" + this.state.idVideo}></source>
      </video>
    );
  }
}
