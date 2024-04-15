// pages/index.js
'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Carousel from '../components/Carousel';
import Events from '../components/Events';
import { getAllEvents, CreateEvent } from '../../config/Services'; // Import CreateEvent function

const App = () => {
  const [ipfs, setIpfs] = useState([]);
  const [items, setItems] = useState([
    {
      title: 'Predefault Item',
      image: '/path/to/image.jpg',
      description: 'This is a predefault item.',
      date: '2024-03-22',
      price: '$99.99',
    },
  ]);
  const [events, setEvents] = useState([]);

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
        return;
      }

      const fetchedEvents = [];

      for (let i = 0; i < ipfs.length; i++) {
        const response = await fetch(`https://ipfs.io/ipfs/${ipfs[i].ipfsHash}`);
        const eventData = await response.json();
        console.log("ve",eventData)

        const event = {
          title: eventData.title,
          date: eventData.Date,
          time: eventData.time,
          location: eventData.location,
          description: eventData.description,
          prize: eventData.ticketPrice,
          totalTickets : eventData.totalTickets,
          imageUrl: eventData.eventImage,
          buttonText:" Buy Tickets"
        };

        console.log("events",event);

        fetchedEvents.push(event);

        console.log("fetched events",fetchedEvents);
      }

      setEvents(fetchedEvents);
    };

    fetchDataFromIPFS();
  }, [ipfs]);

  useEffect(() => {
    const getEvent = async () => {
      const res = await getAllEvents();
      setIpfs(res);
    };

    getEvent();
  }, []);

  // Create a new event and fetch IPFS hashes
  const createNewEvent = async () => {
    try {
      // Call CreateEvent function to create a new event
      const eventData = await CreateEvent("your-ipfs-hash", 100, "10"); // Update with your IPFS hash, total tickets, and ticket price
      console.log("New event created:", eventData);
      // Fetch all events after creating the new one
      const res = await getAllEvents();
      setIpfs(res);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className='min-h-[70vh] my-10'>
      <Carousel className='w-[50%] border ' items={items} addItem={addItem} />
      <Head>
        <title>Events</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='flex justify-between items-center py-4'>
        <div className='text-3xl px-2 font-bold m-5'>
          🔥<span className='underline text-blue-400'> Ongoing Events</span>{' '}
        </div>
      </header>
      <main className='w-[98vw] overflow-x-hidden flex flex-row justify-evenly px-4'>
        <Events events={events} />
      </main>
    </div>
  );
};

export default App;
