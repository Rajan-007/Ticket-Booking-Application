import { ethers } from "ethers";
import Token from "./abi.json";

const contractAddress = "0x4Dc23310ab30851048e97bdbf2042b513B096B6B"; // Update with your contract address

export const CreateEvent = async (ipfsHash, totalTickets, ticketPrice) => {
  if (!window.ethereum) {
    throw new Error("Ethereum object not found, install MetaMask.");
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, Token, signer);
  try {
    const eventData = await contract.createEvent(ipfsHash, totalTickets, ethers.utils.parseEther(ticketPrice));
    return eventData;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const GetAllIpfsHashes = async () => {
  if (!window.ethereum) {
    throw new Error("Ethereum object not found, install MetaMask.");
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, Token, provider);
  try {
    const ipfsHashes = await contract.getAllIpfsHashes();
    return ipfsHashes;
  } catch (error) {
    console.error("Error fetching IPFS hashes:", error);
    throw error;
  }
};
