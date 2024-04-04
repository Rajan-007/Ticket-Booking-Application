import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Secure Seats',
  description: ' It is a Web3 Ticket booking Application for Events , Movies , Sports , Meetups and more ... ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16*16" />
      </head>
      <body className= {inter.className}> <Navbar />{children} <Footer /></body>
    </html>
  )
}
