import Link from 'next/link';
import React from 'react';
// import '@rainbow-me/rainbowkit/styles.css';
// import { RainbowKitProvider
// } from '@rainbow-me/rainbowkit';
// import { WagmiProvider } from 'wagmi';
// import {
//   mainnet,
//   polygon,
//   optimism,
//   arbitrum,
//   base,
// } from 'wagmi/chains';
// import {
//   QueryClientProvider,
//   QueryClient,
// } from "@tanstack/react-query";
// import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { getDefaultConfig } from '@rainbow-me/rainbowkit';
// const config = getDefaultConfig({
//   appName: 'My RainbowKit App',
//   projectId: 'YOUR_PROJECT_ID',
//   chains: [ polygon],
//   ssr: true, // If your dApp uses server side rendering (SSR)
// });


export default function Navbar() {
  
  // const queryClient = new QueryClient();
  return (
    // <WagmiProvider config={config}>
    //   <QueryClientProvider client={queryClient}>
    //     <RainbowKitProvider>
          <div className='flex justify-between items-center min-h-20  border-b border-blue-400 w-[100%] py-1 md:px-8 px-5'>
            <div className='min-h-5 flex  justify-start items-center  '>
              <img src='/logo1.png' className='flex items-center h-24 rounded-full'></img>
              <Link href='/' className='text-4xl font-bold px-1 flex flex-wrap md:flex-nowrap max-w-[30vw] text-blue-400'>Secure seats</Link>
            </div>
            <div className='flex items-center md:px-8'>
              {/* <ConnectButton /> */}
            </div>
          </div>
    //     </RainbowKitProvider>
    //   </QueryClientProvider>
    // </WagmiProvider>
  )
}
