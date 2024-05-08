"use client"
import { BuyTicket, getAllEvents } from '@/config/Services';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ViewEvents = () => {
    const [ipfs, setIpfs] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // Initial loading state


    useEffect(() => {
        const fetchDataFromIPFS = async () => {
            if (ipfs.length === 0) {
                return;
            }

            const fetchedEvents = [];

            for (let i = 0; i < ipfs.length; i++) {
                const response = await fetch(`https://ipfs.io/ipfs/${ipfs[i].ipfsHash}`);
                const eventData = await response.json();
                console.log("jijij",eventData);
                const event = {
                    id: parseInt(ipfs[i].id),
                    title: eventData.title,
                    date: eventData.Date,
                    time: eventData.time,
                    location: eventData.location,
                    description: eventData.description,
                    price: eventData.ticketPrice,
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

    useEffect(() => {
        const getEvents = async () => {
            const result = await getAllEvents();
            setIpfs(result);
        }
        getEvents();
    }, []);

    console.log("Data", ipfs);
    console.log("Ipfs", events);

    const router = useRouter();

    const BuyTicketFun = async (eventId, tokenUri, ticketPrice) => {
        try {
            const result = await BuyTicket(eventId, tokenUri, ticketPrice);
            const { nftMetadataUri } = result; // Assuming you get back the URI for the NFT metadata
            console.log("NFT Metadata URI:", nftMetadataUri);
    
            // Navigate to new page with metadata URI
            router.push(`/Nft_Tickets`);
        } catch (error) {
            console.error("Error buying ticket:", error);
            // Handle error gracefully
        }
    }    
    if (loading) {
        return (
         <div className='w-full min-h-screen flex flex-col justify-center items-center'>   
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div> 
            <div className="text-lg my-2"> Loading...</div> 
        </div>
        )
    }

    const EventComponent = ({ event, ipfsTicketCount, buyTicketFunction }) => {
        const { id, imageUrl, title, date, location, description, price, buttonText } = event;
    
        return (
            <div className='mx-4 text-lg'>
                <div className="bg-transparent h-[100%] p-4 md:my-3 my-4 rounded-lg shadow-md border border-white w-full flex flex-col justify-center items-start">
                   <div className='flex flex-col w-full flex-1'>
                        <div className='flex justify-center w-full'>
                            <img className='h-60' src={imageUrl} alt="Event" />
                        </div>
                        <div className='my-2 font-semibold'>Title: {title}</div>
                        <div className='mb-2 font-semibold'>Description: {description}</div>
                        <div className='mb-2 font-semibold'>Date & Time : {date}</div>
                        <div className='mb-2 font-semibold'>Location: {location}</div>
                        <div className='mb-2 font-semibold'>Price: {price}</div>
                        <div className='mb-2 font-semibold'>Total Tickets: {ipfsTicketCount}</div>
                   </div>
                    <div className='mb-2 w-full p-5 flex items-center justify-center'>
                        <button
                            className='flex justify-center items-end text-white font-semibold bg-blue-600 rounded-lg p-2 px-4'
                            onClick={() => buyTicketFunction(id, title, price, ipfsTicketCount)}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    
    return (
        <div>
            <div className='text-4xl px-2 font-bold m-5 mt-10'>
                🔥<span className='underline text-blue-00'> Upcoming Events</span>{' '}
            </div>
            <div className=" flex justify-evenly mx-5 ">
                <div className='bg-transparent py-5 rounded-lg shadow-md  w-full  grid grid-cols-1 md:grid-cols-3 '>
                {events.map((event, index) => (
                <EventComponent
                    key={event.id}
                    event={event}
                    ipfsTicketCount={ipfs[index]?.ticketCount?.toNumber() || 0} // Default to 0 if no ticketCount is available
                    buyTicketFunction={BuyTicketFun}
                />
            ))}
                </div>
            </div>
        </div>
    );
};

export default ViewEvents;