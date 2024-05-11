// components/Events.js
import React from 'react';

const EventBanner = ({ event, handleToggleCheckoutModal }) => (
  <div className="bg-transparent p-4 md:my-6 my-2  rounded-lg shadow-md border border-white w-full md:w-[45%] lg:w-[30%] flex flex-col justify-center items-start" >
    <div className=''>
      <img src={event.imageUrl} className="w-[50vh] h-[50%] px-4" alt={event.title} />
      <h2 className="text-2xl font-bold my-2 text-center p-2"> {event.title}</h2>
      <p className="mb-2 "><span className='font-semibold'>Description :</span> {event.description} </p>
      <p className="mb-2 font-semibold">Date : {event.date}  </p>
      <p className="mb-2 font-semibold">Place : {event.location}</p>  
      <p className="mb-2 font-semibold">Available Tickets : {event.totalTickets}</p>
      <p className="mb-2 text-2xl font-semibold"><span className='font-normal text-xl'>Price :</span> {event.prize}</p>
    </div>
    <div className='w-full mt-2 flex justify-center items-end'>
    <button className=' text-black font-semibold bg-white rounded-lg py-1 px-2' onClick={() => {BuyTicketFun(event.id, event.title, event.prize)}}>
      {event.buttonText}
    </button>
    </div>
  </div>
);

const Events = ({ events, handleToggleCheckoutModal }) => {
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
          <EventBanner key={index} event={event} handleToggleCheckoutModal={handleToggleCheckoutModal} className={getColumnsClass(events.length)} />
        ))}
      </div>
    </section>
  );
};

export default Events;
