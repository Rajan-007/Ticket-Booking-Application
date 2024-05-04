"use client"
import { BuyTicket, getAllEvents } from '@/config/Services';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ViewEvents = () => {
    const [ipfs, setIpfs] = useState([]);
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
        };

        fetchDataFromIPFS();
    }, [ipfs]);

    useEffect(() => {
        const getEvents = async () => {
            const result = await getAllEvents();
            setIpfs(result);
        };
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
    

    return (
        <div>
            <div className='text-4xl px-2 font-bold m-5 mt-10'>
                🔥<span className='underline text-blue-00'> Upcoming Events</span>{' '}
            </div>
            <div className=" flex justify-evenly mx-5 ">
                <div className='bg-transparent py-5 rounded-lg shadow-md  w-full  grid grid-cols-1 md:grid-cols-3 '>
                    {events.map((event) => (
                        <div className='mx-4 text-lg '>
                            <div key={event.id} className=" bg-transparent p-4 md:my-3 my-4  rounded-lg min-h-[80%] shadow-md border border-white w-full flex flex-col justify-center items-start">
                                <div className='flex justify-center w-full'>
                                    <img  className='h-60' src={event.imageUrl} alt="Event" />
                                </div>
                                <div className='my-2 font-semibold'>Title: {event.title}</div>
                                <div className='mb-2 font-semibold'>Date & Time : {event.date}</div>
                                {/* <div className='mb-2 font-semibold'>Time: {event.time}</div> */}
                                <div className='mb-2 font-semibold'>Location: {event.location}</div>
                                <div className='mb-2 font-semibold'>Description: {event.description}</div>
                                <div className='mb-2 font-semibold'>Prize: {event.prize}</div>
                                <div className='mb-2 font-semibold'>Total Tickets: {event.totalTickets}</div>
                                <div className='mb-2 w-full flex justify-center'>
                                    <button className=' text-white font-semibold bg-blue-600 rounded-lg p-2 px-4' onClick={() => {BuyTicketFun(event.id, event.title, event.prize)}}>
                                        {event.buttonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewEvents;