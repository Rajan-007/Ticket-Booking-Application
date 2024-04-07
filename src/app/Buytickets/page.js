import Link from 'next/link';
import React from 'react';


function CheckoutModal({ event, onClose }) {
  // Implement ticket selection form, user information form, and payment processing integration here
  // This example uses placeholder content

  return (
    <div className="fixed inset-0  bg-gray-500 bg-opacity-75 overflow-y-auto h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md mx-2">
        <h2 className="text-xl font-bold mb-4 text-slate-900">Checkout for </h2>
        {/* Placeholder content for ticket selection and user information */}
        <p className="text-gray-800 font-semibold mb-4">Select Ticket Type and Quantity</p>
        <div className="flex items-center mb-2">
          <select className="border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full py-2 px-3 shadow-sm">
            <option value="">Select Ticket Type</option>
            <option value="general">General Admission</option>
            <option value="vip">VIP</option>
          </select>
          <span className="text-gray-700 ml-4">Quantity: </span>
          <input type="number" min="1" className="border border-gray-300 text-gray-700 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 px-2 py-1 ml-2" />
        </div>
        <input type="date" placeholder="Date " className="w-full border border-gray-300 text-gray-700 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 shadow-sm" />
        {/* {event.shows && event.shows.length > 1 && (
          <div className="mb-4">
            <p className="text-gray-700 mb-2">Select Show:</p>
            <select value={selectedShow} onChange={handleShowChange} className="border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full py-2 px-3 shadow-sm">
              {event.shows.map((show) => (
                <option key={show.id} value={show.id}>
                  {show.date} ({show.startTime})
                </option>
              ))}
            </select>
          </div>
        )} */}
        <p className="text-gray-700 py-4 ">Enter Billing and Contact Information</p>
        <form className="space-y-2">
          <input type="text" placeholder="Full Name" className="w-full border border-gray-300 text-gray-700 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 shadow-sm" />
          <input type="email" placeholder="Email Address" className="w-full border border-gray-300 text-gray-700 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 shadow-sm" />
          <input type="text" placeholder="Phone Number (Optional)" className="w-full border border-gray-300 text-gray-700 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 shadow-sm" />
          <div className="flex items-center mb-2">
            <label htmlFor="address" className="text-gray-700 mr-2">Billing Address:</label>
            <textarea id="address" rows="3" className="w-full border border-gray-300 text-gray-700 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 shadow-sm"></textarea>
          </div>
          <div className='flex justify-around'>
            
            <Link href='/Eventlist'className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Cancel Checkout
            </Link>
            <Link href='/Nft_Tickets' onClick={onClose} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Complete Purchase
            </Link>
          </div>
         
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;
