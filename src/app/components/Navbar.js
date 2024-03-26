import React from 'react';

export default function Navbar() {
  return (
    <div className='flex justify-between items-center min-h-20  border border-white w-[100%] md:px-8 px-5'>
      <div className='min-h-5 flex  justify-start items-center  '>
        <p className='text-4xl font-semibold'>o</p>
        <p className='text-2xl font-bold px-1 flex flex-wrap md:flex-nowrap max-w-[30vw]'>Secure seats</p>
      </div>
      <div className='flex items-center md:px-8'>
        <button className='border px-8 p-2 rounded-full'>Wallet</button>
      </div>
    </div>
  )
}
