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
      <iframe
        style={{ width: "100%", height: "100%", borderRadius: "10px" }}
        src={"https://www.youtube.com/embed/" + this.state.idVideo}
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    );
  }
}
