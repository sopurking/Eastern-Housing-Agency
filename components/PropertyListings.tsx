"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import Pagination from "./Pagination";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FindYourHome from "./FindYourHome";

const PropertyListings = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
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
    
    <div className="mt-16 bg-gray-700">
      <FindYourHome />
      <h3 className="text-3xl font-bold mb-6 text-gray-300 flex justify-center align-items: center pt-2">
        Featured Properties
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                    e.preventDefault(); // Prevent navigating when liking
                    toggleFavorite(property.id);
                  }}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(property.id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </motion.button>
              </div>

              <div className="p-5">
                <div className="text-2xl font-bold text-orange-500 mb-2">
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
                    onClick={(e) => e.preventDefault()}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold text-sm"
                  >
                    Book Inspection
                  </button>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold text-sm"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        total={Math.ceil(properties.length / propertiesPerPage)}
        current={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* See More */}
      <div className="text-center mt-8">
        <button
          onClick={() => router.push("/properties")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold mb-3"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default PropertyListings;
