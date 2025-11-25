"use client";

import React, { useState } from "react";
import { X, MapPin, Bed, Bath, ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertyDetailsModal({ open, onClose, property }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaType, setMediaType] = useState<'images' | 'videos'>('images');

  if (!open) return null;

  const images = Array.isArray(property.images) ? property.images : [];
  const videos = Array.isArray(property.videos) ? property.videos : [];
  const currentMedia = mediaType === 'images' ? images : videos;

  const nextMedia = () => setCurrentIndex((prev) => (prev + 1) % currentMedia.length);
  const prevMedia = () => setCurrentIndex((prev) => (prev - 1 + currentMedia.length) % currentMedia.length);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative">
        <button
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 text-gray-600 hover:text-black shadow-lg"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Media Gallery */}
        <div className="relative h-96 bg-gray-200">
          {currentMedia.length > 0 ? (
            <>
              {mediaType === 'images' ? (
                <img 
                  src={currentMedia[currentIndex]} 
                  alt={property.title} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <video
                  key={currentMedia[currentIndex]}
                  src={currentMedia[currentIndex]}
                  className="w-full h-full object-cover"
                  controls
                />
              )}

              {currentMedia.length > 1 && (
                <>
                  <button
                    onClick={prevMedia}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No media available
            </div>
          )}

          {/* Media Type Toggle */}
          <div className="absolute top-4 left-4 flex gap-2">
            {images.length > 0 && (
              <button
                onClick={() => { setMediaType('images'); setCurrentIndex(0); }}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  mediaType === 'images' ? 'bg-white text-gray-900' : 'bg-black/50 text-white'
                }`}
              >
                Images ({images.length})
              </button>
            )}
            {videos.length > 0 && (
              <button
                onClick={() => { setMediaType('videos'); setCurrentIndex(0); }}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  mediaType === 'videos' ? 'bg-white text-gray-900' : 'bg-black/50 text-white'
                }`}
              >
                Videos ({videos.length})
              </button>
            )}
          </div>
        </div>

        {/* Property Details */}
        <div className="p-6 space-y-4">
          <div>
            <div className="text-3xl font-bold text-[#2da3dd] mb-2">
              ₦{property.price.toLocaleString()}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{property.location}, {property.city}, {property.state}</span>
            </div>
          </div>

          <div className="flex gap-6 py-4 border-y">
            {property.beds && (
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-600">{property.beds} Beds</span>
              </div>
            )}
            {property.baths && (
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-600">{property.baths} Baths</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-600">Description</h3>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <span className="text-gray-600">Type:</span>
              <span className="ml-2 font-medium capitalize text-gray-900">{property.type}</span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <span className="ml-2 font-medium capitalize text-gray-900">{property.status}</span>
            </div>
            <div>
              <span className="text-gray-600">Featured:</span>
              <span className="ml-2 font-medium text-gray-900">{property.featured ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
