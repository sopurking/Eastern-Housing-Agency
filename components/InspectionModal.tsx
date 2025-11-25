"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Home,
  DollarSign,
  BedDouble,
  Bath,
  Square,
  PlayCircle,
  ImageIcon,
} from "lucide-react";

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

const InspectionModal: React.FC<InspectionModalProps> = ({
  isOpen,
  onClose,
  property,
}) => {
  const inspectionFee = 5000; // ₦5,000 inspection fee

  // Parse images/videos safely
  const parseMedia = (input: string[] | string): string[] => {
    if (Array.isArray(input)) return input;
    try {
      return JSON.parse(input);
    } catch {
      return [];
    }
  };

  const images = parseMedia(property.images);
  const videos = parseMedia(property.videos);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
        >
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
            className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Property Inspection Details
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Property Media Preview */}
            <div className="p-6">
              <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
                {images.length > 0 ? (
                  <img
                    src={images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : videos.length > 0 ? (
                  <video
                    src={videos[0]}
                    className="w-full h-full object-contain"
                    controls
                    muted
                    autoPlay
                    playsInline
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
              </div>
            </div>

            {/* Property Basic Info */}
            <div className="px-6 pb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {property.title}
              </h3>

              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <MapPin className="w-4 h-4" />
                {property.location}
              </div>

              <div className="flex flex-wrap gap-6 text-gray-700 mt-4">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-gray-500" />
                  <span>{property.type}</span>
                </div>
                {property.beds !== null && (
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-gray-500" />
                    <span>{property.beds} Beds</span>
                  </div>
                )}
                {property.baths !== null && (
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-gray-500" />
                    <span>{property.baths} Baths</span>
                  </div>
                )}
                {property.sqft && (
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5 text-gray-500" />
                    <span>{property.sqft}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 text-lg font-semibold text-[#2da3dd]">
                ₦{property.price.toLocaleString()}
              </div>
            </div>

            {/* Media Sections */}
            <div className="px-6 pb-6 space-y-8">
              {/* Images */}
              {images.length > 1 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    More Images
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {images.slice(1).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-full h-28 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Videos */}
              {videos.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Videos
                  </h4>
                  <div className="space-y-3">
                    {videos.map((video, i) => (
                      <video
                        key={i}
                        src={video}
                        className="w-full h-48 object-cover rounded-lg"
                        controls
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Inspection Fee Section */}
            <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
              <p className="text-gray-700 text-sm mb-4">
                Your {" "}
                <strong className="text-gray-900">
                  ₦{inspectionFee.toLocaleString()}
                </strong>{" "}
                inspection fee gives you full access to verified houses.
Once payment is made, our customer service team will call you immediately to confirm your appointment. Then, our company vehicle picks you up at your location for a smooth inspection experience.
If the house isn't what you want, we;ll take you to see more verified houses at no extra cost until you find the home you love.
              </p>

              <button
                onClick={() => alert("Paystack coming soon!")}
                className="w-full bg-[#2da3dd] hover:bg-[#2095ce] text-white py-4 rounded-xl text-lg font-semibold transition"
              >
                Pay Inspection Fee (₦{inspectionFee.toLocaleString()})
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InspectionModal;
