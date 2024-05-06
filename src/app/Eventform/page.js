'use client'
import React, { useState } from "react";
import { CreateEvent } from "../../config/Services";

const AddEventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Date, setDate] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [virtualLink,setVirtualLink] = useState("");
  const [location, setLocation] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [shortDescription, setShortDescription] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [totalTickets, setTotalTickets] = useState(0);
  const [ipfsHash, setIpfsHash] = useState("");
  const [loading, setLoading] = useState(false);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !Date || !eventImage || !totalTickets || !ticketPrice || !location) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    
    const formData = {
      title: title,
      description: description,
      category: category,
      Date: Date,
      location: location,
      eventImage: eventImage,
      ticketPrice: ticketPrice,
      totalTickets: totalTickets
    };

    try {
      const pinataToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2YjA3MjIwMy0zM2VhLTQzN2ItOTc5OS03NTEyMzMzODI0NjEiLCJlbWFpbCI6ImFyYXZpbnRocmFqYW4wMzRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjZhYTViZjZmZGQ1MTFlMTY5OGE2Iiwic2NvcGVkS2V5U2VjcmV0IjoiM2M3ODllMDJiMjgyZGIxOGFjOTgyZGI1OTZkN2MxOGUxZGQ5OWFhZmFlNjFmMzA4OTE3MWQwNmFlZDhjNGE3YiIsImlhdCI6MTcxMjQwNTYxM30.p74ZW1kUhi8l_fk4yQWaKvGrPPtjnO3xrqNNyHDg5Sg';
      const ipfsResponse = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${pinataToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const ipfsData = await ipfsResponse.json();
      setIpfsHash(ipfsData.IpfsHash);

      const eventData = await CreateEvent(ipfsData.IpfsHash, totalTickets, ticketPrice);
      console.log("Event created:", eventData);
      console.log(ipfsData.IpfsHash);

      alert('Event created successfully!');

      setTitle("");
      setDescription("");
      setCategory("");
      setDate("");
      setTicketPrice("");
      setVirtualLink("");
      setLocation("");
      setEventImage("");
      setShortDescription("");
      setIsVisible(true);
      setTotalTickets(0);

    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event. Please try again.');
    } finally {
      setLoading(false); // End loading (whether success or failure)
    }
  };


  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      <h2 className="text-3xl text-blue-400 font-bold mt-10">Add New Event</h2>

      <div className="w-[90vw] md:w-[50vw] p-6 py-40 md:p-10 border rounded-2xl">
        {/* Form Inputs */}
        {/* Basic Information */}
        <div className="mb-4 flex flex-col mt-5">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Event Title*
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full py-2 px-3 text-lg text-black"
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Event Description*
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="About the event more than 10 words"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full py-2 px-3 text-lg text-black"
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category*
          </label>
          <select
            name="category"
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full py-2 px-3 shadow-sm"
            value={category}
            onChange={(e)=>{setCategory(e.target.value)}}
            required
          >
            <option value="">Select Category</option>
            <option value="concert">Concert</option>
            <option value="workshop">Workshop</option>
            <option value="conference">Conference</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium mb-2">
             Date & Time*
          </label>
          <input
            type="datetime-local"
            name="Date"
            id="Date"
            className="shadow-sm focus:ring-indigo-500 text-lg text-black focus:border-indigo-500 rounded-md w-full py-2 px-3 "
            value={Date}
            onChange={(e)=>{setDate(e.target.value)}}
            required
          />
        </div>
        
        <div className="mb-4">
          <label
            htmlFor="totalTickets"
            className="block text-sm font-medium mb-2"
          >
            Available Tickets
          </label>
          <input
            type="number"
            name="totalTickets"
            id="totalTickets"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full py-2 px-3 text-lg text-black"
            value={totalTickets}
            onChange={(e)=>{setTotalTickets(e.target.value)}}
            min="1"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="ticketprice"
            className="block text-sm font-medium mb-2"
          >
            Ticket price (usd)
          </label>
          <input
            type="number"
            name="ticketprice"
            id="ticketprice"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full py-2 px-3 text-lg text-black"
            value={ticketPrice}
            onChange={(e)=>{setTicketPrice(e.target.value)}}
            min="1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location (Optional)
          </label>
          <input
            type="text"
            name="location"
            id="location"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full py-2 px-3 text-lg text-black"
            value={location}
            onChange={(e)=>{setLocation(e.target.value)}}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="virtualLink"
            className="block text-sm font-medium mb-2"
          >
            Virtual Event Link (Optional)
          </label>
          <input
            type="url"
            name="virtualLink"
            id="virtualLink"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full py-2 px-3 text-lg text-black"
            value={virtualLink}
            onChange={(e)=>{setVirtualLink(e.target.value)}}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventImage"
            className="block text-sm font-medium mb-2 rounded"
          >
            Event Image (Recommended)
          </label>
          <input
            type="file"
            name="eventImage"
            id="eventImage"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white rounded-md w-full py-2 px-3 text-lg text-black"
            onChange={handleImageUpload}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="shortDescription"
            className="block text-sm font-medium mb-2"
          >
            Short Description (Optional)
          </label>
          <textarea
            name="shortDescription"
            id="shortDescription"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full py-2 px-3 text-lg text-black"
            value={shortDescription}
            onChange={(e)=>{setShortDescription(e.target.value)}}
          ></textarea>
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="isVisible" className="mr-2 text-sm font-medium">
            Publish Event
          </label>
          <input
            type="checkbox"
            name="isVisible"
            id="isVisible"
            className="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
            checked={isVisible}
            onChange={(e)=>{setisVisible(e.target.value)}}
          />
        </div>
        <div className="flex justify-center">
          <button type="submit"
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Creating Event...' : 'Create Event'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventForm;