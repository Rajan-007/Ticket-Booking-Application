'use client'
import React, { useState } from 'react';

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    location: '',
    virtualLink: '',
    eventImage: null,
    shortDescription: '',
    isVisible: true,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Implement form validation logic here
    if (!formData.title || !formData.description || !formData.category || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields.');
      return;
    }

    // Send form data to your backend API for event creation
    const response = await fetch('/api/create-event', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Event created successfully!');
      setFormData({ ...initialState }); // Reset form after successful submission
    } else {
      alert('Error creating event. Please try again.');
    }
  };

  return (
    <form className="space-y-4  flex flex-col items-center justify-center " onSubmit={handleSubmit}>
      <h2 className="text-2xl text-blue-500 font-bold m-5">Add New Event</h2>

      {/* Basic Information */}
      <div className='w-[90vw] md:w-[50vw] p-6 py-8 md:p-10 border rounded-2xl'>
        <div className="mb-4 flex flex-col">
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                Event Title*
                </label>
                <input
                type="text"
                name="title"
                id="title"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full py-2 px-3 text-lg text-black font-semibold"
                value={formData.title}
                onChange={handleChange}
                required
                />
        </div>
        <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-2">
            Event Description*
            </label>
            <textarea
            name="description"
            id="description"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full py-2 px-3 text-lg text-black"
            value={formData.description}
            onChange={handleChange}
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
            value={formData.category}
            onChange={handleChange}
            required
            >
            <option value="">Select Category</option>
            <option value="concert">Concert</option>
            <option value="workshop">Workshop</option>
            <option value="conference">Conference</option>
            {/* Add more options as needed */}
            </select>
        </div>

        {/* Event Details */}
        <div className="mb-4">
            <label htmlFor="startDate" className="block text-sm font-medium mb-2">
            Start Date & Time*
            </label>
            <input
            type="datetime-local"
            name="startDate"
            id="startDate"
            className="shadow-sm focus:ring-indigo-500 text-lg text-black focus:border-indigo-500 rounded-md w-full py-2 px-3 "
            value={formData.startDate}
            onChange={handleChange}
            required
            />
        </div>
        <div className="mb-4">
            <label htmlFor="endDate" className="block text-sm font-medium mb-2">
            End Date & Time*
            </label>
            <input
            type="datetime-local"
            name="endDate"
            id="endDate"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full py-2 px-3 text-lg text-black"
            value={formData.endDate}
            onChange={handleChange}
            required
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
            value={formData.location}
            onChange={handleChange}
            />
        </div>
        <div className="mb-4">
            <label htmlFor="virtualLink" className="block text-sm font-medium mb-2">
            Virtual Event Link (Optional)
            </label>
            <input
            type="url"
            name="virtualLink"
            id="virtualLink"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full py-2 px-3 text-lg text-black"
            value={formData.virtualLink}
            onChange={handleChange}
            />
        </div>

        {/* Event Display */}
        <div className="mb-4">
            <label htmlFor="eventImage" className="block text-sm font-medium mb-2 rounded">
            Event Image (Recommended)
            </label>
            <input
            type="file"
            name="eventImage"
            id="eventImage"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-xl w-full py-2 px-3 text-lg text-black"
            onChange={handleChange}
            />
        </div>
        <div className="mb-4">
            <label htmlFor="shortDescription" className="block text-sm font-medium mb-2">
            Short Description (Optional)
            </label>
            <textarea
            name="shortDescription"
            id="shortDescription"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full py-2 px-3 text-lg text-black"
            value={formData.shortDescription}
            onChange={handleChange}
            ></textarea>
        </div>

        {/* Additional Options */}
        <div className="flex items-center mb-4">
            <label htmlFor="isVisible" className="mr-2 text-sm font-medium">
            Publish Event
            </label>
            <input
            type="checkbox"
            name="isVisible"
            id="isVisible"
            className="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
            checked={formData.isVisible}
            onChange={handleChange}
            />
        </div>

        <div className="flex justify-center">
            <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Create Event
            </button>
        </div>
      </div>
      
    </form>
  );
};

export default AddEventForm;
