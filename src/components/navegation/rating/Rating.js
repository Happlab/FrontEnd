import React from "react";
import { StartIcon } from "../../../assets/icons/Icons";
import "./Rating.css";

const Rating = ({ initialRating }) => {
  const renderIcons = () => {
    let listIcons = [];
    for (let i = 0; i < 5; i++) {
      listIcons.push(
        <span key={i + 1} className="child-rating">
          <span className="icon-rating">
            <span>
              <StartIcon />
            </span>
          </span>
        </span>
      );
    }
    return listIcons;
  };

  return (
    <span className="container-rating">
      {renderIcons()}
    </span>
  );
};

export default Rating;
