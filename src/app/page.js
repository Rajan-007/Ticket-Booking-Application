'use client'
import React from 'react';
import Link from 'next/link';

// Define a functional component named Home
export default function Home() {
  // Return JSX representing the component's UI
  return (
    <div className='min-h-[100vh] px-5 md:px-20'>
      {/* Container div with flex layout */}
      <div className='flex flex-col md:flex-row justify-around'>
        {/* Left column */}
        <div className='mt-10 flex flex-col justify-center md:mb-8'>
          {/* Heading */}
          <h1 className='text-6xl text-gradient-to-r from-blue-500 to-teal-500 font-bold flex justify-start items-center tracking-normal my-5 mt-16 leading-normal'>
            Building Trust in <br />Ticket Booking
          </h1>
          {/* Description */}
          <div className='lg:w-[80%] leading-normal'>
            <p className='text-lg font-semibold w-[90%]'>
              This includes integrating NFTs for unique ticket ownership, fostering
              interoperability with Web3 platforms... This strategic approach aligns
              with decentralization principles and blockchain technology for a dynamic
              evolution.
            </p>
            {/* Buttons */}
            <div className='my-16 flex flex-col md:flex-row justify-between w-[100%]'>
              <Link href='/Event_page/index.js' className='bg-blue-500 p-4 px-4 md:px-8 rounded-full border-blue-500 text-xl font-semibold hover:border hover:bg-transparent hover:text-blue-500 m-2 flex md:flex-row justify-center'>
                Create Event
              </Link>
              <Link href='Eventlist/' className='bg-blue-500 p-4 px-6 md:px-8 rounded-full border-blue-500 text-xl font-semibold hover:border hover:bg-transparent hover:text-blue-500 m-2 flex md:flex-row justify-center'>
                Book Event
              </Link>
            </div>
          </div>
        </div>
        {/* Right column */}
        <div className='flex justify-center items-center'>
          {/* Image */}
          <img src='/Ticket1.png' alt='' className='h-[90vh] w-[100vw]' />
        </div>
      </div>
    </div>
  );
}
