'use client'
// pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';


// Sample event data (replace with your actual data)
const events = [
  {
    title: "The Hackverse hackathon",
    date: " 6 APRIL - 7 March",
    time: " 12AM - 12PM",
    location: "Express Avenue Mall, Gate no. 2, Chennaii",
    backgroundImage: "url('https://th.bing.com/th/id/OIG4.UAykKjjTx3HEjg5xdA3q?pid=ImgGn')", // Replace with actual image URL
  },  
 
];

const EventBanner = ({ event }) => (
  <div className="bg-transparent p-4 md:p-10 md:m-5 rounded-lg  shadow-md border border-white bg-[url('/bg.jpeg')] bg-no-repeat bg-cover " Style={{backgroundImage: event.backgroundImage}}>
    <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
    <p className="mb-4 font-semibold">Now dates: {event.date} | {event.time}</p>
    <p className="mb-4 font-semibold">{event.location}</p>
    <p className="mb-4 font-semibold">No.of Tickets{event.location}</p>
  </div>
);

export default function Eventlist() {
  return (
    <div className="container mx-auto px-4 min-h-[80vh] ">
      <Head>
        <title >Events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-between items-center my-4">
        <div className="text-2xl p-2 font-bold">Your Tickets</div>
        
      </header>
      <main>
        {/* Event banners */}
        <section className="space-y-4 ">
          {events.map((event, index) => (
            <EventBanner key={index} event={event} className="bg-[url('')]" />
          ))}
        </section>
      </main>
    </div>
  );
}
