'use client'
// pages/index.js
import { useEffect, useState } from 'react';
import { getMyTickets } from '@/config/Services';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';




const EventBanner = ({ event }) => (
  <div className="flex justify-around p-4 md:p-10 md:m-5 rounded-lg text-black shadow-md border border-white bg-cover bg-no-repeat relative " style={{ backgroundImage: `url(${event.imageUrl})`}}>
    <div className='flex justify-center'>
      <img src={event.imageUrl} alt="Event Image" width={300} height={200} className="rounded-lg" />
    </div>
    <div className='flex flex-col justify-center'>
      <h2 className="text-2xl font-bold mb-2">Ticket for {event.title}</h2>
      <p className="mb-4 font-semibold flex flex-wrap">Event description: {event.description}</p>
      <p className="mb-4 font-semibold">Event date: {event.date} | {event.time}</p>
      <p className="mb-4 font-semibold">Event location: {event.location}</p>
      <p className="mb-4 font-semibold">Ticket.No: {event.totalTickets}</p>
    </div>
    
  </div>
);

export default function Eventlist() {
  const [ipfs, setIpfs] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading state

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchDataFromIPFS = async () => {
            if (ipfs.length === 0) {
                return;
            }

            const fetchedEvents = [];

            for (let i = 0; i < ipfs.length; i++) {
                const response = await fetch(`https://ipfs.io/ipfs/${ipfs[i].ipfsHash}`);
                const eventData = await response.json();
                console.log(eventData)

                const event = {
                    id: parseInt(ipfs[i].id),
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
                fetchedEvents.push(event);
            }

            setEvents(fetchedEvents);
            setLoading(false); // Set loading to false once data is fetched

        };

        fetchDataFromIPFS();
    }, [ipfs]);
    console.log(ipfs)

    const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchTickets() {
      try {
        // Call the API function to fetch user's tickets
        const result = await getMyTickets(); // Assuming getMyTickets() returns an array of ticket data
        // setTickets(result); // Update the state with the fetched ticket data
        setIpfs(result); // Update the state with the fetched ticket data
        console.log(result, 'tickets');
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }

    fetchTickets(); // Invoke the async function to fetch tickets when the component mounts
  }, []); 

  if (loading) {
    return (
     <div className='w-full min-h-screen flex flex-col justify-center items-center'>   
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div> 
        <div className="text-lg my-2"> Loading...</div> 
    </div>
    )
}


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
