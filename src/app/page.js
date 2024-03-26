import React from 'react';

export default function Home() {
  return (
    <div className='  min-h-[100vh]  px-5 md:px-20'>
      <div className='flex flex-col md:flex-row justify-around '>
        <div className=' mt-10 flex flex-col justify-center md:mb-8 '>
          <h1 className='text-6xl  font-bold flex justify-start items-center tracking-normal my-5 mt-16 leading-normal'> Building Trust in <br />Ticket Booking </h1>
          <div className='lg:w-[65%]  leading-normal'>
            <p className='text-lg font-semibold w-[90%] '>This includes integrating NFTs for unique ticket ownership, fostering
              interoperability with Web3 platforms..This strategic approach aligns
              with decentralization principles and blockchain technology for a dynamic
              evolution.
            </p>
            <div className='my-16 flex flex-col md:flex-row justify-between w-[100%]'>
              <a href='' className='bg-red-600 p-3 px-4 md:px-8 rounded-full border-red-600  text-xl  font-semibold hover:border hover:bg-transparent hover:text-red-500 m-2 flex md:flex-row justify-center'>Create Event</a>
              <a href='' className='bg-green-600 p-3 px-4 md:px-8 rounded-full border-green-800 text-xl font-semibold hover:border hover:bg-transparent hover:text-green-500 m-2 flex md:flex-row justify-center'>Book Event</a>
              </div> 
          </div> 
        </div>
        <div className='flex justify-center items-center'>
          <img src='/Ticket1.png' alt='' className='h-[100%] w-[200%]' />
        </div>
      </div> 
      
    </div>
  )
}
