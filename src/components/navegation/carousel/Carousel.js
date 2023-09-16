import { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = (props) => {
  const [current, setCurrent] = useState(0);
  const length = props.items.length;
  const intervalTime = props.time; 
  const transitionTime = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [current, length, intervalTime]);

  const handleClickPrev = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const handleClickNext = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-items"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: `${current === 0 ? `none` : `transform ${transitionTime}ms ease-in-out`}`,
        }}
      >
        {props.items.map((item, index) => (
          <div key={index + 1} className="item-carousel">
            <img src={item} className="images-carousel" alt={`Imagen ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button className='prev-button' onClick={handleClickPrev}>&lt;</button>
        <button className='next-button' onClick={handleClickNext}>&gt;</button>
      </div>
    </div>
  );
};

export default Carousel;
