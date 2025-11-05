"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, Bed, Bath, Square, Play, ChevronLeft, ChevronRight, Image, Video } from 'lucide-react';

const PropertyListings = () => {
  const [viewMode, setViewMode] = useState('image'); // 'image' or 'video'
  const [favorites, setFavorites] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  // Sample property data
  const properties = [
    {
      id: 1,
      title: 'Luxury 4-Bedroom Duplex',
      location: 'Independence Layout, Enugu',
      price: '₦85,000,000',
      beds: 4,
      baths: 5,
      sqft: '3,500',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      featured: true,
      type: 'For Sale'
    },
    {
      id: 2,
      title: 'Modern 3-Bedroom Apartment',
      location: 'GRA, Owerri',
      price: '₦45,000,000',
      beds: 3,
      baths: 3,
      sqft: '2,100',
      images: [
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      featured: false,
      type: 'For Sale'
    },
    {
      id: 3,
      title: 'Spacious 5-Bedroom Villa',
      location: 'Awka, Anambra',
      price: '₦120,000,000',
      beds: 5,
      baths: 6,
      sqft: '4,800',
      images: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=800&h=600&fit=crop'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      featured: true,
      type: 'For Sale'
    },
    {
      id: 4,
      title: 'Elegant 3-Bedroom Terrace',
      location: 'Umuahia, Abia',
      price: '₦38,000,000',
      beds: 3,
      baths: 4,
      sqft: '2,400',
      images: [
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&h=600&fit=crop'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      featured: false,
      type: 'For Rent'
    },
    {
      id: 5,
      title: 'Contemporary 4-Bedroom House',
      location: 'New Haven, Enugu',
      price: '₦95,000,000',
      beds: 4,
      baths: 5,
      sqft: '3,200',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      featured: true,
      type: 'For Sale'
    },
    {
      id: 6,
      title: 'Luxury Penthouse',
      location: 'Onitsha, Anambra',
      price: '₦150,000,000',
      beds: 4,
      baths: 5,
      sqft: '4,000',
      images: [
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      featured: false,
      type: 'For Sale'
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const nextImage = (propertyId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (propertyId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const goToImage = (propertyId, index) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: index
    }));
  };

  return (
    <div className="mt-16">
      {/* View Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
      >
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Featured Properties
          </h3>
          <p className="text-gray-600">
            Showing {properties.length} properties in Eastern Nigeria
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 shadow-lg border border-gray-100">
          <button
            onClick={() => setViewMode('image')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
              viewMode === 'image'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Images</span>
          </button>
          <button
            onClick={() => setViewMode('video')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
              viewMode === 'video'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Videos</span>
          </button>
        </div>
      </motion.div>

      {/* Property Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {properties.map((property, index) => {
          const currentIndex = currentImageIndex[property.id] || 0;
          
          return (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Image/Video Container */}
              <div className="relative h-64 overflow-hidden">
                {viewMode === 'image' ? (
                  <>
                    {/* Image Carousel */}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        src={property.images[currentIndex]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={() => prevImage(property.id, property.images.length)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-800" />
                        </button>
                        <button
                          onClick={() => nextImage(property.id, property.images.length)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-800" />
                        </button>
                      </>
                    )}

                    {/* Image Dots */}
                    {property.images.length > 1 && (
                      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
                        {property.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => goToImage(property.id, idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentIndex
                                ? 'bg-white w-6'
                                : 'bg-white/60 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* Video Preview */
                  <div className="relative w-full h-full bg-gray-900">
                    <iframe
                      src={property.videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2 z-10">
                  {property.featured && (
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Featured
                    </span>
                  )}
                  <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {property.type}
                  </span>
                </div>

                {/* Favorite Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg z-10 group/fav"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      favorites.has(property.id)
                        ? 'text-red-500 fill-red-500'
                        : 'text-gray-600 group-hover/fav:text-red-500'
                    }`}
                  />
                </motion.button>

                {/* Image Counter Badge */}
                {viewMode === 'image' && property.images.length > 1 && (
                  <div className="absolute top-3 right-16 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg z-10">
                    {currentIndex + 1} / {property.images.length}
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="p-5">
                {/* Price */}
                <div className="text-2xl font-bold text-orange-500 mb-2">
                  {property.price}
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                  {property.title}
                </h4>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm line-clamp-1">{property.location}</span>
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{property.beds}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{property.baths}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Square className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{property.sqft} sqft</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold text-sm transition-colors"
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                  >
                    Contact
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Load More Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-12"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-orange-500"
        >
          Load More Properties
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PropertyListings;