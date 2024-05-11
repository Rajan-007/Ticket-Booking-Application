// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EventTicketing is ERC721URIStorage {
    using Counters for Counters.Counter;

    struct Event {
        int256 id;
        string ipfsHash;
        uint256 ticketCount;
        uint256 ticketPrice;
    }
    
    struct Ticket {
        uint256 eventId;
        address owner;
    }

    Event[] public events;
    Ticket[] public tickets;

    address public owner;
    uint256 public eventCreationFee = 1 wei;
    Counters.Counter private tokenIdCounter;

    event EventCreated(int256 indexed eventId, string ipfsHash, uint256 ticketCount, uint256 ticketPrice);
    event TicketPurchased(uint256 indexed ticketId, address indexed buyer, uint256 eventId, uint256 tokenId);
    
    constructor() ERC721("EventTicket", "TICKET") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }
    
    int256 public lastEventId = int256(-1);

    function createEvent(string memory _ipfsHash, uint256 _ticketCount, uint256 _ticketPrice) external payable {
        require(msg.value >= eventCreationFee, "Insufficient funds to create event");

        payable(owner).transfer(msg.value); // Transfer fee to contract owner

        lastEventId++; // Increment last event ID
        int256 eventId = lastEventId; // Use the incremented value as event ID
        events.push(Event(eventId, _ipfsHash, _ticketCount, _ticketPrice));
        emit EventCreated(eventId, _ipfsHash, _ticketCount, _ticketPrice);
    }



    function retrieveEventDetails(uint256 _eventId) external view returns (string memory, uint256, uint256) {
        require(_eventId < events.length, "Event does not exist");
        return (events[_eventId].ipfsHash, events[_eventId].ticketCount, events[_eventId].ticketPrice);
    }
    
    function purchaseTicket(uint256 _eventId, string memory _tokenURI) external payable {
        require(_eventId < events.length, "Event does not exist");
        require(events[_eventId].ticketCount > 0, "Tickets are sold out");
        require(msg.value >= events[_eventId].ticketPrice, "Insufficient funds");

        tickets.push(Ticket(_eventId, msg.sender));
        events[_eventId].ticketCount--;

        // Mint NFT and assign to the buyer with token URI
        uint256 tokenId = tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        tokenIdCounter.increment();

        emit TicketPurchased(tickets.length, msg.sender, _eventId, tokenId);
    }

    function getAllEvents() external view returns (Event[] memory) {
        return events;
    }

    function getMyTickets() external view returns (TicketDetails[] memory) {
    uint256 numTickets = 0;
    
    // Count how many tickets belong to the caller (msg.sender)
    for (uint256 i = 0; i < tickets.length; i++) {
        if (tickets[i].owner == msg.sender) {
            numTickets++;
        }
    }
    
    // Prepare an array to hold the user's tickets with details
    TicketDetails[] memory myTickets = new TicketDetails[](numTickets);
    uint256 index = 0;
    
    // Populate the array with the caller's tickets and event details
    for (uint256 i = 0; i < tickets.length; i++) {
        if (tickets[i].owner == msg.sender) {
            uint256 eventId = tickets[i].eventId;
            Event memory eventDetails = events[eventId];
            
            myTickets[index] = TicketDetails({
                eventId: eventId,
                ipfsHash: eventDetails.ipfsHash,
                ticketPrice: eventDetails.ticketPrice,
                ticketCount: eventDetails.ticketCount,
                tokenId: i + 1  // TokenId starts from 1 (ticketId = index + 1)
            });
            index++;
        }
    }
    
    return myTickets;
}

struct TicketDetails {
    uint256 eventId;
    string ipfsHash;
    uint256 ticketPrice;
    uint256 ticketCount;
    uint256 tokenId;
}


    
}
