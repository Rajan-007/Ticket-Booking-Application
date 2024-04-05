'use client'
// pages/index.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Carousel from '../components/Carousel';
import Events from '../components/Events';

const App = () => {
  const [items, setItems] = useState([
    {
      title: 'Predefault Item',
      image: '/path/to/image.jpg',
      description: 'This is a predefault item.',
      date: '2024-03-22',
      price: '$99.99',
    },
  ]);

  useEffect(() => {
    if (items.length === 4) {
      setItems(items.slice(1));
    }
  }, [items]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  // Define the events array
  const events = [
    {
      title: "The Real Van Gogh Immersive Experience",
      date: "2 February - 7 March",
      time: "10AM - 9PM",
      location: "Express Avenue Mall, Gate no. 2, Chennai",
      buttonText: "Buy Tickets",
      prize: "$90",
      buttonLink: "#", // Replace with actual link
      imageUrl: "https://th.bing.com/th/id/OIG4.UAykKjjTx3HEjg5xdA3q?pid=ImgGn", // Replace with the actual image URL
    },  
    {
      title: "The Real Van Gogh Immersive Experience",
      date: "2 February - 7 March",
      time: "10AM - 9PM",
      location: "Express Avenue Mall, Gate no. 2, Chennai",
      buttonText: "Buy Tickets",
      prize: "$90",
      buttonLink: "#", // Replace with actual link
      imageUrl: "https://th.bing.com/th/id/OIG4.UAykKjjTx3HEjg5xdA3q?pid=ImgGn", // Replace with the actual image URL
    },  
    {
      title: "The Real Van Gogh Immersive Experience",
      date: "2 February - 7 March",
      time: "10AM - 9PM",
      location: "Express Avenue Mall, Gate no. 2, Chennai",
      buttonText: "Buy Tickets",      
      prize: "$90",
      buttonLink: "#", // Replace with actual link
      imageUrl: "/bg.jpeg", // Replace with the actual image URL
    },  
    
    // Add more events here
  ];

  return (
    <div className='min-h-[70vh] my-10'>
      <Carousel className='w-[50%] border ' items={items} addItem={addItem} />
      <Head>
        <title >Events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center py-4">
        <div className="text-3xl px-2 font-bold m-5 "> 🔥<span className='underline text-blue-400'> Ongoing Events</span> </div>
      </header>
      <main className='w-[98vw] overflow-x-hidden flex flex-row justify-evenly px-4' >
        <Events events={events} />
      </main>
    </div>
  );
};

export default App;
