import { ethers } from "ethers";
import Token from "./abi.json";

const contractAddress = "0x22dA753DEd764aBfCbccFb3D6fEBc9f5830b7f71"; // Update with your contract address

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
