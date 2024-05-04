"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewNFT = () => {
    const [userAddress, setUserAddress] = useState('');
    const [userNFTs, setUserNFTs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserWalletAddress = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const address = accounts[0];
                    setUserAddress(address);
                    fetchUserNFTs(address);
                } catch (error) {
                    console.error('Error requesting accounts:', error);
                    setLoading(false);
                }
            } else {
                console.warn('Ethereum provider (Rainbow Wallet) not available.');
                setLoading(false);
            }
        };

        getUserWalletAddress();
    }, []); // Run once on component mount

    const fetchUserNFTs = async (walletAddress) => {
        try {
            const apiUrl = `http://localhost:3001/api/nfts?owner=${walletAddress}&size=20`;
            const response = await axios.get(apiUrl);
    
            // Handle response as needed
        } catch (error) {
            console.error('Error fetching NFTs:', error);
        }
    };

    return (
        <div>
            <h1>View NFT</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p>Your Wallet Address: {userAddress}</p>
                    <h2>Your NFTs:</h2>
                    <ul>
                        {userNFTs.map((nft) => (
                            <li key={nft.tokenId}>
                                <img src={nft.imageUrl} alt={nft.tokenName} style={{ width: 100 }} />
                                <div>
                                    <p>Name: {nft.tokenName}</p>
                                    <p>Token ID: {nft.tokenId}</p>
                                    <a href={nft.tokenUrl} target="_blank" rel="noopener noreferrer">
                                        View on Rarible
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ViewNFT;
