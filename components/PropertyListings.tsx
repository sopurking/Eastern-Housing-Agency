"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Bed, Bath, Square, X, Calendar, CreditCard } from "lucide-react";
import Pagination from "./Pagination";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FindYourHome from "./FindYourHome";

const PropertyListings = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const router = useRouter();

  const propertiesPerPage = 3;

  const properties = [
    {
      id: 1,
      title: "Luxury 4-Bedroom Duplex",
      location: "Independence Layout, Enugu",
      price: "₦85,000,000",
      beds: 4,
      baths: 5,
      sqft: "3,500",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      ],
    },
    {
      id: 2,
      title: "Modern 3-Bedroom Apartment",
      location: "GRA, Owerri",
      price: "₦45,000,000",
      beds: 3,
      baths: 3,
      sqft: "2,100",
      images: [
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
      ],
    },
    {
      id: 3,
      title: "Cozy Bungalow",
      location: "New Haven, Enugu",
      price: "₦35,000,000",
      beds: 2,
      baths: 2,
      sqft: "1,800",
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
      ],
    },
    {
      id: 4,
      title: "Elegant 5-Bedroom Mansion",
      location: "Asokoro, Abuja",
      price: "₦150,000,000",
      beds: 5,
      baths: 6,
      sqft: "5,200",
      images: [
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
      ],
    },
    {
      id: 5,
      title: "Stylish 2-Bedroom Flat",
      location: "Lekki, Lagos",
      price: "₦65,000,000",
      beds: 2,
      baths: 2,
      sqft: "2,000",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      ],
    },
    {
      id: 6,
      title: "Charming 3-Bedroom Villa",
      location: "Port Harcourt",
      price: "₦70,000,000",
      beds: 3,
      baths: 3,
      sqft: "2,500",
      images: [
        "https://images.unsplash.com/photo-1600596541446-9619e3fce8b9?w=800",
      ],
    },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
      return newFavorites;
    });
  };

  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirst, indexOfLast);

  return (
    <div className="bg-gray-700">
      <FindYourHome />
      <h3 className="text-3xl font-bold mb-6 text-gray-300 flex justify-center align-items: center pt-20">
        Featured Properties
      </h3>
      <div className="grid pb-20 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1300px] mx-auto">
        {currentProperties.map((property) => (
          <Link href={`/properties/${property.id}`} key={property.id}>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(property.id);
                  }}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(property.id)
                        ? "text-[#0d2549] fill-[#0d2549]"
                        : "text-gray-600"
                    }`}
                  />
                </motion.button>
              </div>

              <div className="p-5">
                <div className="text-2xl font-bold text-[#2da3dd] mb-2">
                  {property.price}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {property.title}
                </h4>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <MapPin className="w-4 h-4" /> {property.location}
                </div>

                <div className="flex gap-4 mb-4 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    <Bed className="w-4 h-4" /> {property.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-4 h-4" /> {property.baths}
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="w-4 h-4" /> {property.sqft} sqft
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedProperty(property);
                    }}
                    className="flex-1 bg-[#2da3dd] hover:bg-[#1f6f97] text-white py-2.5 rounded-lg font-semibold text-sm"
                  >
                    Book Inspection
                  </button>
                  <button
                    onClick={()=>router.push(`/properties/${property.id}`)}
                    className="flex-1 bg-[#2da3dd] hover:bg-[#1f6f97] text-white py-2.5 rounded-lg font-semibold text-sm"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProperty.title}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    {selectedProperty.location}
                  </div>
                  <div className="text-3xl font-bold text-[#2da3dd] mb-4">
                    {selectedProperty.price}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Bed className="w-6 h-6 mx-auto mb-2 text-[#2da3dd]" />
                    <div className="font-semibold">{selectedProperty.beds}</div>
                    <div className="text-sm text-gray-500">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <Bath className="w-6 h-6 mx-auto mb-2 text-[#2da3dd]" />
                    <div className="font-semibold">{selectedProperty.baths}</div>
                    <div className="text-sm text-gray-500">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <Square className="w-6 h-6 mx-auto mb-2 text-[#2da3dd]" />
                    <div className="font-semibold">{selectedProperty.sqft}</div>
                    <div className="text-sm text-gray-500">Sq Ft</div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Property Inspection</h3>
                  </div>
                  <p className="text-blue-800 text-sm mb-3">
                    Schedule a professional inspection to view this property in person. 
                    Our team will guide you through all features and answer your questions.
                  </p>
                  <div className="text-sm text-blue-700">
                    <strong>Inspection Fee:</strong> ₦5,000 (Refundable upon purchase)
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      alert('Redirecting to payment...');
                    }}
                    className="flex-1 bg-[#2da3dd] hover:bg-[#1f6f97] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <CreditCard className="w-5 h-5" />
                    Pay Inspection Fee
                  </button>
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Pagination
        total={Math.ceil(properties.length / propertiesPerPage)}
        current={currentPage}
        onPageChange={setCurrentPage}
      />

      <div className="text-center mt-8 pb-20">
        <button
          onClick={() => router.push("/properties")}
          className="bg-[#0d2549] hover:bg-[#0d2549] text-white px-6 py-3 rounded-md font-semibold mb-3"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default PropertyListings;