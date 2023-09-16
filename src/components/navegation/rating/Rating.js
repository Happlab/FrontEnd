import { useState } from "react";
import { StartIcon, StartFillIcon } from "../../../assets/icons/Icons";
import "./Rating.css";

const Rating = ({ initialRating = null }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [readOnly] = useState(initialRating !== null);

  const handleStartHover = (startIndex, isHalf) => {
    if (!readOnly) {
      let newRating = startIndex + 1;
      if (isHalf) newRating -= 0.5;
      setHoveredRating(newRating);
    }
  };

  const handleStartClick = (startIndex, isHalf) => {
    if(!readOnly) {
      let newRating = startIndex + 1;
      if (isHalf) newRating -= 0.5;
      setRating(newRating);
      setHoveredRating(null);
    }
  };

  const renderIcons = () => {
    let listIcons = [];
    for (let i = 1; i < 6; i++) {
      let isHalf = false;
      let startClass = "empty";

      if (i <= rating || i < hoveredRating) startClass = "filled";
      else if ((i === Math.round(rating) && rating % 1 !== 0)) {
        startClass = "half-filled";
        isHalf = true;
      }

      listIcons.push(
        <span 
          style={readOnly ? { cursor: 'inherit', }: {}}
          key={i + 1} 
          className="child-rating"
          onMouseOver={() => handleStartHover(i, isHalf)}
          onMouseLeave={() => setHoveredRating(null)}
          onClick={() => handleStartClick(i, isHalf)}
        >
          <span className={`icon-rating ${startClass}`}>
            <span className={`start-icon ${startClass}`}>
              {startClass === "filled" && (<StartFillIcon />)}
              {startClass === "empty" && (<StartIcon />)}
              {startClass === "half-filled" && (
                <>
                  <StartFillIcon />
                  <StartIcon className={startClass}/>
                </>
              )}
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
