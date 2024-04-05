// components/Carousel.js
import React, { useState } from 'react';

const Carousel = ({ items, addItem }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % items.length);
  };

  return (
    <div className='flex justify-evenly'>
      <button className='text-4xl' onClick={handlePrev}> ⬅️ </button>
      <div className='flex flex-col items-center bg-[url(`bg.jpeg`) border w-[80vw]  md:w-[50vw] h-[30vh]'>
        <img src={items[activeIndex].image} className='w-[50%] h-[50%]' alt={items[activeIndex].title} />
        <h2>{items[activeIndex].title}</h2>
        <p>{items[activeIndex].description}</p>
        <p>{items[activeIndex].date}</p>
        <p>{items[activeIndex].price}</p>
      </div>
      <button className='text-4xl' onClick={handleNext}>➡️</button>
    </div>
  );
};

export default Carousel;
