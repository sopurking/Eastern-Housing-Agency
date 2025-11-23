"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Home, DollarSign, User, Phone, Mail } from 'lucide-react';

type Property = {
  id: string;
  title: string;
  location: string;
  type: string;
  price: number;
  beds: number | null;
  baths: number | null;
  sqft: string | null;
  images: string[] | string;
  videos: string[] | string;
};

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

const InspectionModal: React.FC<InspectionModalProps> = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  console.log('🏠 InspectionModal opened for property:', property.id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('📝 Submitting inspection booking:', { property: property.id, formData });

    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('✅ Inspection booking submitted successfully');
      alert('Inspection booking submitted! We will contact you shortly to confirm the appointment.');
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
    } catch (error) {
      console.error('💥 Error submitting inspection booking:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inspectionFee = 5000; // ₦5,000 inspection fee

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Book Inspection</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Property Summary */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex gap-4">
                {(() => {
                  let images: string[] = [];
                  try {
                    if (typeof property.images === 'string') {
                      images = JSON.parse(property.images);
                    } else if (Array.isArray(property.images)) {
                      images = property.images;
                    }
                  } catch (error) {
                    console.error('Error parsing images in modal:', error);
                  }
                  
                  return images.length > 0 ? (
                    <img 
                      src={images[0]} 
                      alt={property.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  ) : null;
                })()}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {property.location}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      {property.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ₦{property.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., +234 801 234 5678"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Preferred Schedule */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Preferred Schedule</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Preferred Time *
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any specific requirements or questions about the property..."
                />
              </div>

              {/* Inspection Fee Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-800 font-medium mb-2">
                  <DollarSign className="w-5 h-5" />
                  Inspection Fee
                </div>
                <p className="text-blue-700 text-sm">
                  A refundable inspection fee of <strong>₦{inspectionFee.toLocaleString()}</strong> is required to confirm your appointment. 
                  This fee will be deducted from your deposit if you decide to proceed with the property.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-[#2da3dd] text-white rounded-lg font-medium hover:bg-[#2da3dd]/90 disabled:opacity-50 transition"
                >
                  {loading ? 'Booking...' : `Book Inspection (₦${inspectionFee.toLocaleString()})`}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InspectionModal;