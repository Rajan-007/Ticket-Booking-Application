'use client'
import React, { useState } from "react";
import { CreateEvent } from "../../config/Services";
import { motion } from "framer-motion";
import { PageLoader, ButtonLoader } from "../components/loader";

const AddEventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Date, setDate] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [virtualLink, setVirtualLink] = useState("");
  const [location, setLocation] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [shortDescription, setShortDescription] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [totalTickets, setTotalTickets] = useState(0);
  const [ipfsHash, setIpfsHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        return value.length < 3 ? 'Title must be at least 3 characters' : '';
      case 'description':
        return value.length < 10 ? 'Description must be at least 10 characters' : '';
      case 'totalTickets':
        return value <= 0 ? 'Must have at least 1 ticket' : '';
      case 'ticketPrice':
        return value <= 0 ? 'Price must be greater than 0' : '';
      default:
        return '';
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, eventImage: 'Image size must be less than 5MB' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventImage(reader.result);
        setErrors({ ...errors, eventImage: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!category) newErrors.category = 'Category is required';
    if (!Date) newErrors.Date = 'Date is required';
    if (!eventImage) newErrors.eventImage = 'Event image is required';
    if (!totalTickets || totalTickets <= 0) newErrors.totalTickets = 'Valid ticket count is required';
    if (!ticketPrice || ticketPrice <= 0) newErrors.ticketPrice = 'Valid price is required';
    if (!location) newErrors.location = 'Location is required';

    // Field-specific validation
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) {
        const error = validateField(key, key === 'title' ? title : key === 'description' ? description : key === 'totalTickets' ? totalTickets : ticketPrice);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    
    const formData = {
      title: title,
      description: description,
      category: category,
      Date: Date,
      location: location,
      eventImage: eventImage,
      ticketPrice: ticketPrice,
      totalTickets: totalTickets,
      virtualLink: virtualLink || undefined,
      shortDescription: shortDescription || undefined,
    };

    try {
      const pinataToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2YjA3MjIwMy0zM2VhLTQzN2ItOTc5OS03NTEyMzMzODI0NjEiLCJlbWFpbCI6ImFyYXZpbnRocmFqYW4wMzRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjZhYTViZjZmZGQ1MTFlMTY5OGE2Iiwic2NvcGVkS2V5U2VjcmV0IjoiM2M3ODllMDJiMjgyZGIxOGFjOTgyZGI1OTZkN2MxOGUxZGQ5OWFhZmFlNjFmMzA4OTE3MWQwNmFlZDhjNGE3YiIsImlhdCI6MTcxMjQwNTYxM30.p74ZW1kUhi8l_fk4yQWaKvGrPPtjnO3xrqNNyHDg5Sg';
      const ipfsResponse = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${pinataToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!ipfsResponse.ok) {
        throw new Error('Failed to upload to IPFS');
      }
      
      const ipfsData = await ipfsResponse.json();
      setIpfsHash(ipfsData.IpfsHash);

      const eventData = await CreateEvent(ipfsData.IpfsHash, totalTickets, ticketPrice);
      console.log("Event created:", eventData);

      // Success notification
      alert('Event created successfully!');

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setDate("");
      setTicketPrice("");
      setVirtualLink("");
      setLocation("");
      setEventImage(null);
      setShortDescription("");
      setIsVisible(true);
      setTotalTickets(0);
      setErrors({});

    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  if (loading) {
    return <PageLoader message="Creating your event..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 py-20 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fieldVariants}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create New Event
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Fill in the details to create your amazing event
          </p>
        </motion.div>

        <motion.div
          variants={fieldVariants}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <motion.div variants={fieldVariants} className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                  errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors({ ...errors, title: '' });
                }}
                placeholder="Enter event title"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </motion.div>

            {/* Description */}
            <motion.div variants={fieldVariants} className="space-y-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Event Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                rows="4"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                  errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-slate-700 text-gray-900 dark:text-white resize-none`}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors({ ...errors, description: '' });
                }}
                placeholder="Describe your event in detail..."
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </motion.div>

            {/* Category & Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fieldVariants} className="space-y-2">
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (errors.category) setErrors({ ...errors, category: '' });
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="concert">Concert</option>
                  <option value="workshop">Workshop</option>
                  <option value="conference">Conference</option>
                  <option value="sports">Sports</option>
                  <option value="meetup">Meetup</option>
                  <option value="other">Other</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </motion.div>

              <motion.div variants={fieldVariants} className="space-y-2">
                <label htmlFor="Date" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Date & Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="Date"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    errors.Date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                  value={Date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (errors.Date) setErrors({ ...errors, Date: '' });
                  }}
                />
                {errors.Date && <p className="text-red-500 text-sm">{errors.Date}</p>}
              </motion.div>
            </div>

            {/* Tickets & Price Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fieldVariants} className="space-y-2">
                <label htmlFor="totalTickets" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Available Tickets <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="totalTickets"
                  min="1"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    errors.totalTickets ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                  value={totalTickets}
                  onChange={(e) => {
                    setTotalTickets(parseInt(e.target.value) || 0);
                    if (errors.totalTickets) setErrors({ ...errors, totalTickets: '' });
                  }}
                  placeholder="Number of tickets"
                />
                {errors.totalTickets && <p className="text-red-500 text-sm">{errors.totalTickets}</p>}
              </motion.div>

              <motion.div variants={fieldVariants} className="space-y-2">
                <label htmlFor="ticketprice" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Ticket Price (avalancheFuji) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="ticketprice"
                  min="0.01"
                  step="0.01"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    errors.ticketPrice ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                  value={ticketPrice}
                  onChange={(e) => {
                    setTicketPrice(e.target.value);
                    if (errors.ticketPrice) setErrors({ ...errors, ticketPrice: '' });
                  }}
                  placeholder="0.00"
                />
                {errors.ticketPrice && <p className="text-red-500 text-sm">{errors.ticketPrice}</p>}
              </motion.div>
            </div>

            {/* Location & Virtual Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fieldVariants} className="space-y-2">
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (errors.location) setErrors({ ...errors, location: '' });
                  }}
                  placeholder="Event location"
                />
                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
              </motion.div>

              <motion.div variants={fieldVariants} className="space-y-2">
                <label htmlFor="virtualLink" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Virtual Event Link <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="url"
                  id="virtualLink"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  value={virtualLink}
                  onChange={(e) => setVirtualLink(e.target.value)}
                  placeholder="https://..."
                />
              </motion.div>
            </div>

            {/* Event Image */}
            <motion.div variants={fieldVariants} className="space-y-2">
              <label htmlFor="eventImage" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Event Image <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col space-y-4">
                <input
                  type="file"
                  id="eventImage"
                  accept="image/*"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    errors.eventImage ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                  onChange={handleImageUpload}
                />
                {eventImage && (
                  <div className="relative rounded-xl overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                    <img src={eventImage} alt="Event preview" className="w-full h-64 object-cover" />
                  </div>
                )}
              </div>
              {errors.eventImage && <p className="text-red-500 text-sm">{errors.eventImage}</p>}
            </motion.div>

            {/* Short Description */}
            <motion.div variants={fieldVariants} className="space-y-2">
              <label htmlFor="shortDescription" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Short Description <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <textarea
                id="shortDescription"
                rows="3"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white dark:bg-slate-700 text-gray-900 dark:text-white resize-none"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief description (optional)"
              />
            </motion.div>

            {/* Publish Toggle */}
            <motion.div variants={fieldVariants} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isVisible"
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
              />
              <label htmlFor="isVisible" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Publish Event Immediately
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={fieldVariants} className="pt-6">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <ButtonLoader className="text-white" />
                    <span>Creating Event...</span>
                  </>
                ) : (
                  <>
                    <span>Create Event</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddEventForm;