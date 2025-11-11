"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Bed, Bath, Square } from "lucide-react";

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
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
    ],
    videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
    description:
      "A stunning modern duplex located in the heart of Enugu. This home features luxurious amenities, spacious rooms, and a serene environment perfect for family living.",
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
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800",
    ],
    videos: ["https://www.youtube.com/embed/tgbNymZ7vqY"],
    description:
      "A contemporary 3-bedroom apartment offering modern finishes and excellent amenities in a prime location in Owerri.",
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
      "https://images.unsplash.com/photo-1599423300746-b62533397364?w=800",
    ],
    videos: [],
    description:
      "A charming 2-bedroom bungalow perfect for small families or couples, with a warm and inviting atmosphere in New Haven.",
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
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600596541446-9619e3fce8b9?w=800",
    ],
    videos: [],
    description:
      "An exquisite 5-bedroom mansion in Abuja with expansive living spaces, high-end finishes, and stunning architecture.",
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
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800",
    ],
    videos: [],
    description:
      "A modern 2-bedroom flat in Lekki with a sleek design, open-plan living, and top-notch amenities for comfortable urban living.",
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
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    ],
    videos: [],
    description:
      "A beautiful 3-bedroom villa in Port Harcourt, featuring spacious interiors, landscaped gardens, and a relaxing ambiance.",
  },
];

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const property = properties.find((p) => p.id === Number(params.id));

  if (!property) return <p className="text-center mt-20">Property not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-orange-500 font-semibold mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          whileHover={{ scale: 1.02 }}
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <p className="text-orange-500 text-xl font-semibold mb-3">
            {property.price}
          </p>

          <div className="flex items-center gap-2 text-gray-500 mb-4">
            <MapPin className="w-4 h-4" /> {property.location}
          </div>

          <div className="flex gap-4 text-gray-600 text-sm mb-6">
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

          <p className="text-gray-700 leading-relaxed mb-8">{property.description}</p>

          <div className="flex gap-4">
            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold">
              Book Inspection
            </button>
            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold">
              Contact Agent
            </button>
          </div>
        </div>
      </div>

      {/* Image gallery */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {property.images.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt={`Image ${i}`}
            className="w-full h-48 object-cover rounded-xl shadow-sm"
            whileHover={{ scale: 1.03 }}
          />
        ))}
      </div>

      {/* Video Section */}
      {property.videos.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Video Tour</h2>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={property.videos[0]}
              title="Video Tour"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
