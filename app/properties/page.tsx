"use client";

import FindYourHome from "@/components/FindYourHome";
import MiniBrowserAuth from "@/components/MiniBrowserAuth";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  image: string;
}

export default function AllPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Comprehensive logging
  useEffect(() => {
    console.log('[PropertiesPage] Auth Status:', status);
    console.log('[PropertiesPage] Session:', session);
    console.log('[PropertiesPage] User:', session?.user);
  }, [status, session]);

  useEffect(() => {
    const mockData: Property[] = [
      { id: "1", name: "Luxury 4-Bedroom Duplex", location: "Independence Layout, Enugu", price: "₦85,000,000", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800" },
      { id: "2", name: "Modern 3-Bedroom Apartment", location: "GRA, Owerri", price: "₦45,000,000", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800" },
      { id: "3", name: "Cozy Bungalow", location: "New Haven, Enugu", price: "₦35,000,000", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800" },
      { id: "4", name: "Elegant 5-Bedroom Mansion", location: "Asokoro, Abuja", price: "₦150,000,000", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800" },
      { id: "5", name: "Stylish 2-Bedroom Flat", location: "Lekki, Lagos", price: "₦65,000,000", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" },
      { id: "6", name: "Charming 3-Bedroom Villa", location: "Port Harcourt", price: "₦70,000,000", image: "https://images.unsplash.com/photo-1600596541446-9619e3fce8b9?w=800" },
    ];
    setProperties(mockData);
  }, []);

  const handleBookInspection = (propertyId: string) => {
    console.log('[BookInspection] Button clicked for property:', propertyId);
    console.log('[BookInspection] Current auth status:', status);
    console.log('[BookInspection] Session exists:', !!session);
    
    if (status === "loading") {
      console.log('[BookInspection] Auth still loading, please wait...');
      return;
    }
    
    if (!session || status === "unauthenticated") {
      console.log('[BookInspection] User NOT authenticated - opening auth popup');
      sessionStorage.setItem('bookingPropertyId', propertyId);
      sessionStorage.setItem('bookingAction', 'inspection');
      setShowAuthPopup(true);
    } else {
      console.log('[BookInspection] User IS authenticated - proceeding with booking');
      alert(`Booking inspection for property ${propertyId}`);
    }
  };

  const handleAuthSuccess = () => {
    console.log('[BookInspection] Auth successful');
    setShowAuthPopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-16">
      <h1 className="text-4xl font-bold text-[#0d2549] text-center mb-10">
        Explore All Properties
      </h1>

      <FindYourHome />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Fixed height image container for balanced cards */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{property.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{property.location}</p>
              </div>

              <div className="mt-3 flex items-center justify-between mb-2">
                <span className="text-[#2da3dd] font-bold">{property.price}</span>

              </div>

              <div>
                <button
                  onClick={() => handleBookInspection(property.id)}
                  className="bg-[#2da3dd] hover:bg-[#2da3dd] text-white text-sm px-4 py-2 rounded-lg transition mr-3"
                >
                  Book Inspection
                </button>

                <Link
                  href={`/properties/${property.id}`}
                  className="bg-[#2da3dd] hover:bg-[#2da3dd] text-white text-sm px-4 py-2 rounded-lg transition"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {properties.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No properties available right now.
        </p>
      )}

      {/* Authentication Popup */}
      <MiniBrowserAuth
        isOpen={showAuthPopup}
        onClose={() => {
          console.log('[BookInspection] Auth popup closed');
          setShowAuthPopup(false);
        }}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
