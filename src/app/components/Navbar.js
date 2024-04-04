import React from 'react';

export default function Navbar() {
  return (
    <div className='flex justify-between items-center min-h-20  border-b border-blue-400 w-[100%] md:px-8 px-5'>
      <div className='min-h-5 flex  justify-start items-center  '>
        <p className='text-4xl font-semibold flex items-center'>o</p>
        <p className='text-4xl font-bold px-1 flex flex-wrap md:flex-nowrap max-w-[30vw] text-blue-400'>Secure seats</p>
      </div>
      <div className='flex items-center md:px-8'>
        <button className='border px-10 py-2 rounded-full hover:bg-blue-500 font-semibold'>Wallet</button>
      </div>
    </div>
  )
}
