'use client'
// pages/index.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Carousel from '../components/Carousel';
import Events from '../components/Events';
import { Gethash } from '@/config/Services';

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

  useEffect(() => {
    if (items.length === 4) {
      setItems(items.slice(1));
    }
  }, [items]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  
  useEffect(() => {
    const getAllHash = async () => {
      const result = await Gethash();
      setIpfs(result);
    }
    
    getAllHash();
  }, []); // Empty dependency array to run only once when component mounts

  useEffect(() => {
    const fetchDataFromIPFS = async () => {
      // Check if ipfs array is empty
      if (ipfs.length === 0) {
        return; // Exit function if ipfs is empty
      }
  
      for (const hash of ipfs) {
        const response = await fetch(`https://ipfs.io/ipfs/${hash}`);
        const data = await response.json(); // or response.text(), depending on the response type
        console.log(data); // Do something with the fetched data
      }
    };
  
    fetchDataFromIPFS();
  }, [ipfs]);
  
  
  // Define the events array
  const events = [
    {
      title: "The Hackverse hackathon",
      date: "6 APRIL - 7 March",
      time: "12AM - 12PM",
      location: "Express Avenue Mall, Gate no. 2, Chennai",
      buttonText: "Buy Tickets",
      prize: "$10",
      buttonLink: "#", // Replace with actual link
      imageUrl: "/bg.jpeg", // Replace with the actual image URL
    },  
    {
      title: " Immersive Experience",
      date: " 7 april",
      time: "11AM - 9PM",
      location: "marina Mall, Chennai",
      buttonText: "Buy Tickets",
      prize: "$90",
      buttonLink: "#", // Replace with actual link
      imageUrl: "https://th.bing.com/th/id/OIG4.UAykKjjTx3HEjg5xdA3q?pid=ImgGn", // Replace with the actual image URL
    },  
    
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
