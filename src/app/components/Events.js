// components/Events.js
import React from 'react';

const EventBanner = ({ event, handleButtonClick }) => (
  <div className="bg-transparent p-4 md:m-5 rounded-lg shadow-md border border-white w-full md:w-[45%] lg:w-[30%] flex flex-col justify-center items-center" style={{ margin: '0 1rem' }}>
    <img src={event.imageUrl} className="w-[90%] h-[50%]" alt={event.title} />
    <h2 className="text-2xl font-bold my-2 text-center">{event.title}</h2>
    <p className="mb-4 font-semibold"> {event.description} </p>
    <p className="mb-4 font-semibold">Now dates: {event.date} | {event.time}</p>
    <p className="mb-4 font-semibold">{event.location}</p>
    <p className="mb-4 font-semibold">{event.total}</p>
    <p className="mb-4 text-2xl font-semibold">Price : {event.prize}</p>
    <button onClick={() => handleButtonClick(event)} className="bg-blue-500 text-white font-semibold px-4 py-3 rounded hover:bg-blue-600">
      {event.buttonText}
    </button>
  </div>
);
  

const Events = ({ events,handleButtonClick }) => {
  const getColumnsClass = (count) => {
    switch (count) {
      case 1:
        return 'lg:w-[100%]';
      case 2:
        return 'md:w-[50%] lg:w-[45%]';
      case 3:
      default:
        return 'md:w-[33.33%] lg:w-[30%]';
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap justify-evenly min-w-20vw">
        {events.map((event, index) => (
          <EventBanner key={index} event={event} handleButtonClick={handleButtonClick} className={getColumnsClass(events.length)} />
        ))}
      </div>
    </section>
  );
};

export default Events;
