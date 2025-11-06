// components/Events.js
import React from 'react';
import { motion } from 'framer-motion';

const EventBanner = ({ event, handleToggleCheckoutModal, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover-lift transition-all duration-300 h-full flex flex-col"
  >
    <div className="relative h-64 overflow-hidden">
      <img
        src={event.imageUrl || '/concert.jpg'}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        alt={event.title}
        onError={(e) => {
          e.target.src = '/concert.jpg';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    
    <div className="p-6 flex-1 flex flex-col">
      <h2 className="text-2xl font-bold my-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {event.title}
      </h2>
      <p className="mb-2 text-gray-600 dark:text-gray-400 line-clamp-2">
        <span className="font-semibold">Description:</span> {event.description}
      </p>
      <div className="space-y-2 my-4 flex-1">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
          <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {event.date}
        </p>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
          <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location}
        </p>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Available Tickets: {event.totalTickets}
        </p>
      </div>
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {event.prize || event.price} {event.prize && !event.prize.includes('Fuji') ? 'Fuji' : ''}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
          onClick={() => handleToggleCheckoutModal && handleToggleCheckoutModal(event)}
        >
          {event.buttonText || 'Buy Tickets'}
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const Events = ({ events, handleToggleCheckoutModal }) => {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <EventBanner
            key={event.id || index}
            event={event}
            handleToggleCheckoutModal={handleToggleCheckoutModal}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Events;