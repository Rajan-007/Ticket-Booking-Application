const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/api/nfts', async (req, res) => {
    const { owner, size } = req.query;
    const apiUrl = `https://api.rarible.com/protocol/v0.1/ethereum/nft/items/byOwner?owner=${owner}&size=${size}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        res.status(500).json({ error: 'Failed to fetch NFTs' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
