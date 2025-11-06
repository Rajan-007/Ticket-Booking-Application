"use client"
import { BuyTicket, getAllEvents } from '@/config/Services';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageLoader, CardSkeleton } from '../components/loader';

const ViewEvents = () => {
    const [ipfs, setIpfs] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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
                        price: eventData.ticketPrice,
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
        const getEvents = async () => {
            try {
                const result = await getAllEvents();
                setIpfs(result);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };
        getEvents();
    }, []);

    const BuyTicketFun = async (eventId, title, price, ticketCount) => {
        try {
            if (ticketCount <= 0) {
                alert('Sorry, this event is sold out!');
                return;
            }
            
            const result = await BuyTicket(eventId, title, price);
            const { nftMetadataUri } = result;
            console.log("NFT Metadata URI:", nftMetadataUri);
            
            router.push(`/Nft_Tickets`);
        } catch (error) {
            console.error("Error buying ticket:", error);
            alert('Error purchasing ticket. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mx-auto mb-4"></div>
                        <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <CardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const EventComponent = ({ event, ipfsTicketCount, buyTicketFunction, index }) => {
        const { id, imageUrl, title, date, location, description, price, buttonText, category } = event;
        const isSoldOut = ipfsTicketCount <= 0;

        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
            >
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover-lift hover-glow transition-all duration-300 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-64">
                        <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={imageUrl || '/concert.jpg'}
                            alt={title}
                            onError={(e) => {
                                e.target.src = '/concert.jpg';
                            }}
                        />
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full capitalize">
                                {category}
                            </span>
                        </div>
                        {isSoldOut && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="px-6 py-3 bg-red-600 text-white font-bold text-lg rounded-full">
                                    SOLD OUT
                                </span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-1">
                            {description}
                        </p>

                        {/* Event Details */}
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="font-medium">{new Date(date).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="font-medium">{location}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                    <span className="font-medium">{ipfsTicketCount} tickets left</span>
                                </div>
                                <div className="text-lg font-bold text-blue-600 dark:text-red-400">
                                    {price} avalancheFuji
                                </div>
                            </div>
                        </div>

                        {/* Buy Button */}
                        <motion.button
                            onClick={() => buyTicketFunction(id, title, price, ipfsTicketCount)}
                            disabled={isSoldOut}
                            whileHover={{ scale: isSoldOut ? 1 : 1.02 }}
                            whileTap={{ scale: isSoldOut ? 1 : 0.98 }}
                            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                                isSoldOut
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                            }`}
                        >
                            {isSoldOut ? 'Sold Out' : buttonText}
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">🔥
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                             Upcoming Events
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Discover amazing events and secure your tickets now
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
                            No Events Available
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Check back soon for exciting events!
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event, index) => (
                            <EventComponent
                                key={event.id}
                                event={event}
                                ipfsTicketCount={ipfs[index]?.ticketCount?.toNumber() || 0}
                                buyTicketFunction={BuyTicketFun}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewEvents;