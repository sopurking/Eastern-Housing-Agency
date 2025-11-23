"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Home as HomeIcon,
  DollarSign,
  ChevronDown,
  ChevronRight,
  Heart,
  Bath,
  Square,
  Bed,
  ChevronLeft,
  Image as ImageIcon,
  Video,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InspectionModal from './InspectionModal';

type Property = {
  id: string;
  title: string;
  location: string;
  state: string;
  city: string;
  type: string;
  price: number;
  beds: number | null;
  baths: number | null;
  sqft: string | null;
  images: string[] | string;
  videos: string[] | string;
  featured: boolean;
};

/* ---------------------------------------------------------
   PROPERTY CARD (MODAL REMOVED — uses callback instead)
--------------------------------------------------------- */
const PropertyCard = ({ 
  property, 
  favorites, 
  toggleFavorite,
  onOpenInspection
}: { 
  property: Property; 
  favorites: Set<string>; 
  toggleFavorite: (id: string) => void;
  onOpenInspection: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaType, setMediaType] = useState<'images' | 'videos'>('images');

  // Debug logging for media
  console.log(`🏠 Property ${property.id} (${property.title}):`);
  console.log('🖼️ Raw images:', property.images);
  console.log('🎥 Raw videos:', property.videos);
  console.log('🔍 Images type:', typeof property.images, Array.isArray(property.images));
  console.log('🔍 Videos type:', typeof property.videos, Array.isArray(property.videos));

  // Parse images and videos if they're strings
  let parsedImages: string[] = [];
  let parsedVideos: string[] = [];

  try {
    if (typeof property.images === 'string') {
      parsedImages = JSON.parse(property.images);
      console.log('🔄 Parsed images from string:', parsedImages);
    } else if (Array.isArray(property.images)) {
      parsedImages = property.images;
    }
  } catch (error) {
    console.error('❌ Error parsing images:', error);
    parsedImages = [];
  }

  try {
    if (typeof property.videos === 'string') {
      parsedVideos = JSON.parse(property.videos);
      console.log('🔄 Parsed videos from string:', parsedVideos);
    } else if (Array.isArray(property.videos)) {
      parsedVideos = property.videos;
    }
  } catch (error) {
    console.error('❌ Error parsing videos:', error);
    parsedVideos = [];
  }

  const currentMedia = mediaType === 'images' ? parsedImages : parsedVideos;
  const hasImages = parsedImages.length > 0;
  const hasVideos = parsedVideos.length > 0;

  console.log('📊 Media stats:', { hasImages, hasVideos, currentMediaLength: currentMedia?.length || 0 });

  const nextMedia = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % currentMedia.length);
  };

  const prevMedia = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + currentMedia.length) % currentMedia.length);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [mediaType]);

  return (
    <Link href={`/properties/${property.id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
      >
        <div className="relative h-56 overflow-hidden bg-gray-200">
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
                  muted
                  loop
                  playsInline
                  autoPlay
                  controls
                />
              )}

              {currentMedia.length > 1 && (
                <>
                  <button
                    onClick={prevMedia}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {currentMedia.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition ${
                          idx === currentIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No media
            </div>
          )}

          <div className="absolute top-3 left-3 flex gap-2">
            {hasImages && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setMediaType('images');
                }}
                className={`px-2 py-1 rounded-md text-xs font-medium transition ${
                  mediaType === 'images'
                    ? 'bg-white text-gray-900'
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <ImageIcon className="w-3 h-3 inline mr-1" />
                Images
              </button>
            )}
            {hasVideos && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setMediaType('videos');
                }}
                className={`px-2 py-1 rounded-md text-xs font-medium transition ${
                  mediaType === 'videos'
                    ? 'bg-white text-gray-900'
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <Video className="w-3 h-3 inline mr-1" />
                Videos
              </button>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(property.id);
            }}
            className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
          >
            <Heart className={`w-5 h-5 ${favorites.has(property.id) ? 'text-[#0d2549] fill-[#0d2549]' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="p-5">
          <div className="text-xl font-bold text-[#2da3dd] mb-2">
            ₦{property.price.toLocaleString()}
          </div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">{property.title}</h4>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <MapPin className="w-4 h-4" /> {property.location}
          </div>
          <div className="flex gap-4 mb-4 text-gray-600 text-sm">
            {property.beds && <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {property.beds}</span>}
            {property.baths && <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {property.baths}</span>}
            {property.sqft && <span className="flex items-center gap-1"><Square className="w-4 h-4" /> {property.sqft} sqft</span>}
          </div>
          
          {/* Book Inspection Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log('📅 Opening inspection modal for property:', property.id);
              onOpenInspection();
            }}
            className="w-full bg-[#2da3dd] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#2da3dd]/90 transition flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Book Inspection
          </button>
        </div>
      </motion.div>
    </Link>
  );
};


/* ---------------------------------------------------------
   FIND YOUR HOME — MODAL RENDERED AT ROOT LEVEL
--------------------------------------------------------- */
const FindYourHome = () => {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [locations, setLocations] = useState<{ state: string; cities: string[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [expandedState, setExpandedState] = useState<string>('');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const typeRef = useRef<HTMLDivElement | null>(null);
  const priceRef = useRef<HTMLDivElement | null>(null);

  // NEW: modal moved to this level
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('🚀 Fetching properties and locations...');
      try {
        const { getProperties, getLocations } = await import('@/lib/actions/listings.actions');
        
        const [propertiesResult, locationsResult] = await Promise.all([
          getProperties({ featured: true, status: 'active' }),
          getLocations()
        ]);
        
        console.log('📋 Properties result:', propertiesResult);
        console.log('🗺️ Locations result:', locationsResult);
        
        if (propertiesResult.success && propertiesResult.properties) {
          console.log('🏠 Setting properties:', propertiesResult.properties.length, 'properties');
          propertiesResult.properties.forEach((prop: any, index: number) => {
            console.log(`Property ${index + 1}:`, {
              id: prop.id,
              title: prop.title,
              images: prop.images,
              videos: prop.videos,
              imagesType: typeof prop.images,
              videosType: typeof prop.videos
            });
          });
          setProperties(propertiesResult.properties as Property[]);
        }
        
        if (locationsResult.success && locationsResult.locations) {
          setLocations(locationsResult.locations);
        }
      } catch (error) {
        console.error('💥 Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const availableTypes = useMemo(() => {
    const types = new Set(properties.map(p => p.type));
    return Array.from(types).sort();
  }, [properties]);

  const priceRanges = useMemo(() => {
    if (properties.length === 0) return [];
    const prices = properties.map(p => p.price).sort((a, b) => a - b);
    const max = prices[prices.length - 1];
    
    const ranges = [];
    if (max > 0) ranges.push({ key: '0-50m', label: '₦0 - ₦50M', min: 0, max: 50_000_000 });
    if (max > 50_000_000) ranges.push({ key: '50m-100m', label: '₦50M - ₦100M', min: 50_000_000, max: 100_000_000 });
    if (max > 100_000_000) ranges.push({ key: '100m-200m', label: '₦100M - ₦200M', min: 100_000_000, max: 200_000_000 });
    if (max > 200_000_000) ranges.push({ key: '200m+', label: '₦200M+', min: 200_000_000 });
    
    return ranges;
  }, [properties]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setShowLocationDropdown(false);
      }
      if (typeRef.current && !typeRef.current.contains(target)) {
        setShowTypeDropdown(false);
      }
      if (priceRef.current && !priceRef.current.contains(target)) {
        setShowPriceDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (selectedCity && p.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
      if (!selectedCity && selectedState && p.state.toLowerCase() !== selectedState.toLowerCase()) return false;
      if (propertyType && p.type !== propertyType) return false;
      if (priceRange) {
        const range = priceRanges.find((r) => r.key === priceRange);
        if (range) {
          if (range.min !== undefined && p.price < range.min) return false;
          if (range.max !== undefined && p.price >= range.max) return false;
        }
      }
      return true;
    });
  }, [properties, selectedState, selectedCity, propertyType, priceRange, priceRanges]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section className="relative py-16 md:py-24 lg:py-28 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30" id="properties">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-block bg-[#edf2f8] text-[#0d2549] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Find Properties
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Your Dream Home in
            <span className="text-[#2da3dd]"> Eastern Nigeria</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Filter featured properties in real time across all available locations.
          </p>
        </motion.div>

        {/* FILTERS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100"
        >
          <div className="grid md:grid-cols-12 gap-4">
            {/* LOCATION */}
            <div className="md:col-span-5 relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowLocationDropdown((v) => !v)}
                className="w-full text-left pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:border-[#2da3dd] focus:outline-none transition-colors text-gray-900 bg-white relative"
              >
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <span className="block truncate">
                  {selectedCity
                    ? `${selectedCity}, ${selectedState}`
                    : selectedState
                    ? selectedState
                    : 'Select state or city'}
                </span>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </button>

              <AnimatePresence>
                {showLocationDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      <div className="p-3 sm:p-4 border-b sm:border-b-0 sm:border-r border-gray-100 max-h-72 overflow-auto">
                        <p className="text-xs uppercase text-gray-500 font-semibold mb-2 px-1">
                          Available States
                        </p>
                        <ul className="space-y-1">
                          <li>
                            <button
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition hover:bg-gray-50 ${
                                selectedState === '' && selectedCity === '' 
                                  ? 'bg-[#2da3dd]/10 text-[#0d2549]' 
                                  : 'text-gray-700'
                              }`}
                              onClick={() => {
                                setExpandedState('');
                                setSelectedState('');
                                setSelectedCity('');
                                setShowLocationDropdown(false);
                              }}
                            >
                              <span>All States</span>
                            </button>
                          </li>
                          {locations.map((s) => (
                            <li key={s.state}>
                              <button
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition hover:bg-gray-50 ${
                                  expandedState === s.state
                                    ? 'bg-[#2da3dd]/10 text-[#0d2549]'
                                    : 'text-gray-700'
                                }`}
                                onClick={() => {
                                  setExpandedState((prev) => 
                                    prev === s.state ? '' : s.state
                                  );
                                  setSelectedState(s.state);
                                  setSelectedCity('');
                                }}
                              >
                                <span>{s.state}</span>
                                <ChevronRight
                                  className={`w-4 h-4 transition-transform ${
                                    expandedState === s.state ? 'rotate-90' : ''
                                  }`}
                                />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 sm:p-4 max-h-72 overflow-auto">
                        {expandedState ? (
                          <>
                            <p className="text-xs uppercase text-gray-500 font-semibold mb-2 px-1">
                              Cities in {expandedState}
                            </p>
                            <ul className="space-y-1">
                              {locations
                                .find((s) => s.state === expandedState)
                                ?.cities.map((c) => (
                                  <li key={c}>
                                    <button
                                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition hover:bg-gray-50 ${
                                        selectedCity === c
                                          ? 'bg-[#2da3dd]/10 text-[#0d2549] font-medium'
                                          : 'text-gray-700'
                                      }`}
                                      onClick={() => {
                                        setSelectedCity(c);
                                        setSelectedState(expandedState);
                                        setShowLocationDropdown(false);
                                      }}
                                    >
                                      {c}
                                    </button>
                                  </li>
                                )) || []}
                            </ul>
                          </>
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-sm text-gray-500">
                            Select a state to view cities
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PROPERTY TYPE */}
            <div className="md:col-span-4 relative" ref={typeRef}>
              <button
                type="button"
                onClick={() => setShowTypeDropdown((v) => !v)}
                className="w-full text-left pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:border-[#2da3dd] focus:outline-none transition-colors text-gray-900 bg-white relative"
              >
                <HomeIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <span className="block truncate">
                  {propertyType
                    ? propertyType[0].toUpperCase() + propertyType.slice(1)
                    : 'Property Type'}
                </span>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </button>

              <AnimatePresence>
                {showTypeDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden"
                  >
                    <ul className="p-2">
                      <li>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition hover:bg-gray-50 ${
                            propertyType === '' 
                              ? 'bg-[#2da3dd]/10 text-[#0d2549] font-medium' 
                              : 'text-gray-700'
                          }`}
                          onClick={() => {
                            setPropertyType('');
                            setShowTypeDropdown(false);
                          }}
                        >
                          All
                        </button>
                      </li>

                      {availableTypes.map((t) => (
                        <li key={t}>
                          <button
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition hover:bg-gray-50 ${
                              propertyType === t
                                ? 'bg-[#2da3dd]/10 text-[#0d2549] font-medium'
                                : 'text-gray-700'
                            }`}
                            onClick={() => {
                              setPropertyType(t);
                              setShowTypeDropdown(false);
                            }}
                          >
                            {t[0].toUpperCase() + t.slice(1)}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PRICE RANGE */}
            <div className="md:col-span-3 relative" ref={priceRef}>
              <button
                type="button"
                onClick={() => setShowPriceDropdown((v) => !v)}
                className="w-full text-left pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:border-[#2da3dd] focus:outline-none transition-colors text-gray-900 bg-white relative"
              >
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <span className="block truncate">
                  {priceRange
                    ? priceRanges.find((r) => r.key === priceRange)?.label
                    : 'Price Range'}
                </span>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </button>

              <AnimatePresence>
                {showPriceDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden"
                  >
                    <ul className="p-2">
                      <li>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition hover:bg-gray-50 ${
                            priceRange === '' 
                              ? 'bg-[#2da3dd]/10 text-[#0d2549] font-medium' 
                              : 'text-gray-700'
                          }`}
                          onClick={() => {
                            setPriceRange('');
                            setShowPriceDropdown(false);
                          }}
                        >
                          All
                        </button>
                      </li>

                      {priceRanges.map((r) => (
                        <li key={r.key}>
                          <button
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition hover:bg-gray-50 ${
                              priceRange === r.key
                                ? 'bg-[#2da3dd]/10 text-[#0d2549] font-medium'
                                : 'text-gray-700'
                            }`}
                            onClick={() => {
                              setPriceRange(r.key);
                              setShowPriceDropdown(false);
                            }}
                          >
                            {r.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

        {/* PROPERTY GRID */}
        <div className="mt-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Featured Properties
          </h3>

          {loading ? (
            <div className="text-center text-gray-500 py-14">
              Loading properties...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-14">
              No properties match your filters.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  favorites={favorites} 
                  toggleFavorite={toggleFavorite} 
                  onOpenInspection={() => setActiveProperty(property)}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <button
              onClick={() => router.push('/properties')}
              className="bg-[#0d2549] hover:bg-[#0b1f3e] text-white px-6 py-3 rounded-md font-semibold"
            >
              See More
            </button>
          </div>
        </div>
      </div>

      {/* ROOT-LEVEL INSPECTION MODAL */}
      {activeProperty && (
        <InspectionModal 
          isOpen={true}
          onClose={() => setActiveProperty(null)}
          property={activeProperty}
        />
      )}

    </section>
  );
};

export default FindYourHome;
