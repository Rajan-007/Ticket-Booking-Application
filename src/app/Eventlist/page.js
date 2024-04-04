'use client'
// pages/index.js
import Head from 'next/head';
import Image from 'next/image';

// Sample event data (replace with your actual data)
const events = [
  {
    title: "The Real Van Gogh Immersive Experience",
    date: "2 February - 7 March",
    time: "10AM - 9PM",
    location: "Express Avenue Mall, Gate no. 2, Chennai",
    buttonText: "Buy Tickets",
    buttonLink: "#", // Replace with actual link
    backgroundImage: "url('https://th.bing.com/th/id/OIG4.UAykKjjTx3HEjg5xdA3q?pid=ImgGn')", // Replace with actual image URL
  },  
  {
    title: "The Real Van Gogh Immersive Experience",
    date: "2 February - 7 March",
    time: "10AM - 9PM",
    location: "Express Avenue Mall, Gate no. 2, Chennai",
    buttonText: "Buy Tickets",
    buttonLink: "#", // Replace with actual link
    backgroundImage: "url('/bg.jpeg')", // Replace with actual image URL
  },
  // Add more events here
];

const EventBanner = ({ event }) => (
  <div className="bg-transparent p-4 md:p-10 md:m-5 rounded-lg  shadow-md border border-white bg-[url('/bg.jpeg')] bg-no-repeat bg-cover " Style={{backgroundImage: event.backgroundImage}}>
    <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
    <p className="mb-4 font-semibold">Now dates: {event.date} | {event.time}</p>
    <p className="mb-4 font-semibold">{event.location}</p>
    <a href={event.buttonLink} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-500">
      {event.buttonText}
    </a>
  </div>
);

export default function Eventlist() {
  return (
    <div className="container mx-auto px-4 min-h-[80vh] ">
      <Head>
        <title >Events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center py-4">
        <div className="text-2xl px-2 font-bold">Ongoing Events</div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">List your event</a></li>
            <li><a href="#" className="hover:underline">Chennai</a></li>
          </ul>
        </nav>
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
