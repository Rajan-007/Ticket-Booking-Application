'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Carousel from '../components/Carousel';
import Events from '../components/Events';
import CheckoutModal from '../components/CheckoutModal';
import { getAllEvents, CreateEvent } from '../../config/Services';
import { motion } from 'framer-motion';
import { CardSkeleton } from '../components/loader';

const App = () => {
  const [ipfs, setIpfs] = useState([]);
  const [items, setItems] = useState([
    {
      title: 'Predefault Item',
      image: '/concert.jpg',
      description: 'This is a predefault item.',
      date: '2024-03-22',
      price: '$99.99',
    },
  ]);
  const [events, setEvents] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (items.length === 4) {
      setItems(items.slice(1));
    }
  }, [items]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  useEffect(() => {
    const fetchDataFromIPFS = async () => {
      if (ipfs.length === 0) {
        setLoading(false);
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
            buttonText: "Buy Tickets",
            category: eventData.category || 'event',
          };

          fetchedEvents.push(event);
        } catch (error) {
          console.error(`Error fetching event ${i}:`, error);
        }
      }

      setEvents(fetchedEvents);
      setLoading(false);
    };

    fetchDataFromIPFS();
  }, [ipfs]);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await getAllEvents();
        setIpfs(res);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    getEvent();
  }, []);

  const createNewEvent = async () => {
    try {
      const eventData = await CreateEvent("your-ipfs-hash", 100, "10");
      const res = await getAllEvents();
      setIpfs(res);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleToggleCheckoutModal = (event = null) => {
    if (event) {
      setSelectedEvent(event);
    }
    setShowCheckoutModal(!showCheckoutModal);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mx-auto mb-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 py-20 px-4">
      <Head>
        <title>Events - Secure Seats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Carousel Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <Carousel className="w-full" items={items} addItem={addItem} />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            🔥 Ongoing Events
          </span>
        </h1>
      </motion.div>

      {/* Events Grid */}
      <main className="max-w-7xl mx-auto">
        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🎭</div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              No Events Available
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Check back soon for exciting events!
            </p>
          </motion.div>
        ) : (
          <Events
            events={events}
            handleToggleCheckoutModal={(event) => handleToggleCheckoutModal(event)}
          />
        )}

        {/* Checkout Modal */}
        {showCheckoutModal && selectedEvent && (
          <CheckoutModal
            events={[selectedEvent]}
            onClose={() => handleToggleCheckoutModal()}
          />
        )}
      </main>
    </div>
  );
};

export default App;