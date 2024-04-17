// In CheckoutModal.js

import React from 'react';
import Link from 'next/link';
import { BuyTicket } from '@/config/Services';

function CheckoutModal(events,{ onClose }) {

  const buyticket = async(eventId, price, title) => {
    const result = await BuyTicket(eventId, title, price);
    if (result) {
      onClose();
    }
  }
  console.log("check",events.events[0].id);
  return (
    <div className="fixed inset-0  bg-gray-500 bg-opacity-75 overflow-y-auto h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md mx-2">
        <h2 className="text-xl font-bold mb-4 text-slate-900">Checkout for </h2>
        <p className="text-gray-800 font-semibold mb-4">Event Name</p>
        <p className="text-gray-800 font-semibold mb-4">{events.events[0].title}</p>
        <p className="text-gray-800 font-semibold mb-4">Event Date</p>
        <p className="text-gray-800 font-semibold mb-4">{events.events[0].date}</p>
        <p className="text-gray-800 font-semibold mb-4">Event Location</p>
        <p className="text-gray-800 font-semibold mb-4">{events.events[0].location}</p>
        <p className="text-gray-800 font-semibold mb-4">Event Price</p>
        <p className="text-gray-800 font-semibold mb-4">{events.events[0].prize}</p>
        
          <div className='flex justify-around'>
            <Link href='/Eventlist' className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Cancel Checkout
            </Link>
            <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
             onClick={buyticket(events.events[0].id, events.events[0].prize, events.events[0].title)}>Buy Ticket</button>
            <Link href='/Nft_Tickets' className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Complete Purchase
            </Link>
          </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
