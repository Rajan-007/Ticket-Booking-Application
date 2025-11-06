import { ethers } from "ethers";
import Token from "./abi.json";

const contractAddress = "0xf5da88f47AdD8B432B484003366eE34d2dB156F7";
// const contractAddress = "0xEF08ACE7eAFba877D43Ca5bbf8cBb940E3b799fc";
export const CreateEvent = async (ipfsHash, totalTickets, ticketPrice) => {
  if (!window.ethereum) {
    throw new Error("Ethereum object not found, install MetaMask.");
  }   
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, Token, signer);
  try {
    const eventData = await contract.createEvent(ipfsHash, totalTickets, ethers.utils.parseEther(ticketPrice),{value:1});
    return eventData;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getAllEvents = async () => {
  if (!window.ethereum) {
    throw new Error("Ethereum object not found, install MetaMask.");
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, Token, provider);
  try {
    const events = await contract.getAllEvents();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const BuyTicket = async (eventId, tokenUri, ticketPrice) => {
  if (!window.ethereum) {
      throw new Error("Ethereum object not found, install MetaMask.");
  }   
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, Token, signer);
  console.log(ticketPrice)
  try {
      const ticketPriceInWei = ethers.utils.parseEther(ticketPrice);
      const eventData = await contract.purchaseTicket(eventId, tokenUri, { value: ticketPriceInWei});
      return eventData;
  } catch (error) {
      console.error("Error buying ticket:", error);
      throw error;
  }
};
export const getMyTickets = async () => {
  if (!window.ethereum) {
      throw new Error("Ethereum object not found, install MetaMask.");
  }   
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, Token, signer);
  try {
      
      const eventData = await contract.getMyTickets();
      return eventData;
  } catch (error) {
      console.error("Error buying ticket:", error);
      throw error;
  }
};


