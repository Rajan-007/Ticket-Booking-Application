import Web3 from "web3";
import { ethers } from "ethers";
import Token from "./abi.json";

const isBrowser = () => typeof window !== "undefined";
const { ethereum } = isBrowser();
if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}
const contractadd = "0xCb56D102F186900CBeFe6e03F3BAD423A460daed";

export const CreateEvent = async ({IpfsHash,totalTickets,ticketprice}) => {
  if (!window.ethereum) {
    throw new Error("Ethereum object not found, install MetaMask.");
  }
  const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractadd, Token, signer);
  try {
    const didInfo = await contract.createEvent(IpfsHash,totalTickets,ticketprice);
    return didInfo;
  } catch (error) {
    console.error("Error fetching DID info:", error);
    throw error;
  }
};

export const Gethash = async () => {
  if (!window.ethereum) {
    throw new Error("Ethereum object not found, install MetaMask.");
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractadd, Token, signer);
  try {
    const didInfo = await contract.getAllIpfsHashes();
    return didInfo;
  } catch (error) {
    console.error("Error fetching DID info:", error);
    throw error;
  }
};
