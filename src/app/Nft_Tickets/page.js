'use client'
import { useEffect, useState } from 'react';
import { getMyTickets } from '@/config/Services';
import { motion } from 'framer-motion';
import { PageLoader, CardSkeleton } from '../components/loader';

const EventBanner = ({ event, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 hover-lift transition-all duration-300"
  >
    {/* Background Image with Overlay */}
    <div className="relative h-64 md:h-80 overflow-hidden">
      <img
        src={event.imageUrl || '/concert.jpg'}
        alt="Event Image"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          e.target.src = '/concert.jpg';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      {/* NFT Badge */}
      <div className="absolute top-4 right-4">
        <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full backdrop-blur-sm">
          <span className="text-white font-bold text-sm flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            NFT Ticket
          </span>
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {event.title}
      </h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-start">
          <svg className="w-6 h-6 mr-3 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Description</p>
            <p className="text-base text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">{event.description}</p>
          </div>
        </div>

        <div className="flex items-start">
          <svg className="w-6 h-6 mr-3 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Date & Time</p>
            <p className="text-base text-gray-700 dark:text-gray-300 mt-1">
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
              {event.time && ` | ${event.time}`}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <svg className="w-6 h-6 mr-3 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Location</p>
            <p className="text-base text-gray-700 dark:text-gray-300 mt-1">{event.location}</p>
          </div>
        </div>

        <div className="flex items-start">
          <svg className="w-6 h-6 mr-3 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Ticket Number</p>
            <p className="text-base font-bold text-gray-900 dark:text-white mt-1">#{event.totalTickets || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Price Badge */}
      {event.prize && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Purchase Price</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              {event.prize} avalancheFuji
            </span>
          </div>
        </div>
      )}
    </div>
  </motion.div>
);

export default function Eventlist() {
  const [ipfs, setIpfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchDataFromIPFS = async () => {
      if (ipfs.length === 0) {
        return;
      }

      const fetchedEvents = [];

      for (let i = 0; i < ipfs.length; i++) {
        try {
          const response = await fetch(`https://ipfs.io/ipfs/${ipfs[i].ipfsHash}`);
          const eventData = await response.json();

          const event = {
            id: parseInt(ipfs[i].id),
            title: eventData.title,
            date: eventData.Date,
            time: eventData.time,
            location: eventData.location,
            description: eventData.description,
            prize: eventData.ticketPrice,
            totalTickets: eventData.totalTickets,
            imageUrl: eventData.eventImage,
            buttonText: "Buy Tickets"
          };
          fetchedEvents.push(event);
        } catch (error) {
          console.error(`Error fetching ticket ${i}:`, error);
        }
      }

      setEvents(fetchedEvents);
      setLoading(false);
    };

    fetchDataFromIPFS();
  }, [ipfs]);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const result = await getMyTickets();
        setIpfs(result);
        console.log(result, 'tickets');
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mx-auto mb-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">🎫
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
               Your Tickets
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your NFT tickets are securely stored on the blockchain
          </p>
        </motion.div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🎭</div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              No Tickets Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You haven't purchased any tickets yet.
            </p>
            <motion.a
              href="/ViewEvents"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Browse Events
            </motion.a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <EventBanner key={event.id || index} event={event} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}