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
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Eastern Nigerian states and cities
const EASTERN_STATES: { state: string; cities: string[] }[] = [
  { state: 'Abia', cities: ['Aba', 'Umuahia', 'Arochukwu', 'Ohafia', 'Bende'] },
  { state: 'Anambra', cities: ['Awka', 'Onitsha', 'Nnewi', 'Ekwulobia', 'Ihiala'] },
  { state: 'Ebonyi', cities: ['Abakaliki', 'Afikpo', 'Onueke', 'Ezza', 'Ishielu'] },
  { state: 'Enugu', cities: ['Enugu', 'Nsukka', 'Agbani', 'Oji River', 'Udi'] },
  { state: 'Imo', cities: ['Owerri', 'Orlu', 'Okigwe', 'Mbaise', 'Oguta'] },
];

type PriceOption = '' | '0-50m' | '50m-100m' | '100m-200m' | '200m+';

type PropertyType = '' | 'apartment' | 'house' | 'villa' | 'duplex' | 'land';

type Property = {
  id: number;
  title: string;
  location: string; // e.g., "New Haven, Enugu"
  state: string; // derived for filtering convenience
  city: string; // derived for filtering convenience
  type: PropertyType;
  price: number; // numeric value for filtering
  priceLabel: string; // formatted label
  beds: number;
  baths: number;
  sqft: string;
  images: string[];
};

const ALL_PROPERTIES: Property[] = [
  {
    id: 1,
    title: 'Luxury 4-Bedroom Duplex',
    location: 'Independence Layout, Enugu',
    state: 'Enugu',
    city: 'Enugu',
    type: 'duplex',
    price: 85000000,
    priceLabel: '₦85,000,000',
    beds: 4,
    baths: 5,
    sqft: '3,500',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
  },
  {
    id: 2,
    title: 'Modern 3-Bedroom Apartment',
    location: 'GRA, Owerri',
    state: 'Imo',
    city: 'Owerri',
    type: 'apartment',
    price: 45000000,
    priceLabel: '₦45,000,000',
    beds: 3,
    baths: 3,
    sqft: '2,100',
    images: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800'],
  },
  {
    id: 3,
    title: 'Cozy Bungalow',
    location: 'New Haven, Enugu',
    state: 'Enugu',
    city: 'Enugu',
    type: 'house',
    price: 35000000,
    priceLabel: '₦35,000,000',
    beds: 2,
    baths: 2,
    sqft: '1,800',
    images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800'],
  },
  {
    id: 4,
    title: 'Elegant 5-Bedroom Mansion',
    location: 'Asokoro, Abuja',
    state: 'FCT',
    city: 'Abuja',
    type: 'villa',
    price: 150000000,
    priceLabel: '₦150,000,000',
    beds: 5,
    baths: 6,
    sqft: '5,200',
    images: ['https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800'],
  },
  {
    id: 5,
    title: 'Stylish 2-Bedroom Flat',
    location: 'Aba, Abia',
    state: 'Abia',
    city: 'Aba',
    type: 'apartment',
    price: 65000000,
    priceLabel: '₦65,000,000',
    beds: 2,
    baths: 2,
    sqft: '2,000',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'],
  },
  {
    id: 6,
    title: 'Charming 3-Bedroom Villa',
    location: 'Onitsha, Anambra',
    state: 'Anambra',
    city: 'Onitsha',
    type: 'villa',
    price: 70000000,
    priceLabel: '₦70,000,000',
    beds: 3,
    baths: 3,
    sqft: '2,500',
    images: ['https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800'],
  },
  {
    id: 7,
    title: 'Cozy Bungalow',
    location: 'New Haven, Enugu',
    state: 'Enugu',
    city: 'Enugu',
    type: 'house',
    price: 35000000,
    priceLabel: '₦35,000,000',
    beds: 2,
    baths: 2,
    sqft: '1,800',
    images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800'],
  },
];

const priceRanges: { key: PriceOption; label: string; min?: number; max?: number }[] = [
  { key: '0-50m', label: '₦0 - ₦50M', min: 0, max: 50_000_000 },
  { key: '50m-100m', label: '₦50M - ₦100M', min: 50_000_000, max: 100_000_000 },
  { key: '100m-200m', label: '₦100M - ₦200M', min: 100_000_000, max: 200_000_000 },
  { key: '200m+', label: '₦200M+', min: 200_000_000 },
];

const FindYourHome = () => {
  const router = useRouter();

  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [propertyType, setPropertyType] = useState<PropertyType>('');
  const [priceRange, setPriceRange] = useState<PriceOption>('');

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [expandedState, setExpandedState] = useState<string>('');

  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const typeRef = useRef<HTMLDivElement | null>(null);
  const priceRef = useRef<HTMLDivElement | null>(null);

  // Close dropdowns on outside click
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

  // Filtering
  const filtered = useMemo(() => {
    return ALL_PROPERTIES.filter((p) => {
      // State/city filter
      if (selectedCity) {
        if (p.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
      } else if (selectedState) {
        if (p.state.toLowerCase() !== selectedState.toLowerCase()) return false;
      }
      // Property type
      if (propertyType && p.type !== propertyType) return false;
      // Price range
      if (priceRange) {
        const range = priceRanges.find((r) => r.key === priceRange)!;
        if (typeof range.min === 'number' && p.price < range.min) return false;
        if (typeof range.max === 'number' && p.price >= range.max) return false;
      }
      // Only show Eastern states by default (if no state chosen), but keep Abuja listing out
      // Remove non-eastern by default to keep featured focused
      const easternStates = EASTERN_STATES.map((s) => s.state);
      if (!selectedState && !selectedCity && !easternStates.includes(p.state)) return false;
      return true;
    });
  }, [selectedState, selectedCity, propertyType, priceRange]);

  const activeState = useMemo(
    () => EASTERN_STATES.find((s) => s.state === expandedState),
    [expandedState]
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section className="relative py-16 md:py-24 lg:py-28 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30" id="properties">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        {/* Section Header */}
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
            Filter featured properties in real time across Abia, Anambra, Ebonyi, Enugu, and Imo.
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100"
        >
          <div className="grid md:grid-cols-12 gap-4">
            {/* Location dropdown */}
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
                      {/* States list */}
                      <div className="p-3 sm:p-4 border-b sm:border-b-0 sm:border-r border-gray-100 max-h-72 overflow-auto">
                        <p className="text-xs uppercase text-gray-500 font-semibold mb-2 px-1">Eastern States</p>
                        <ul className="space-y-1">
                          <li>
                            <button
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition hover:bg-gray-50 ${
                                selectedState === '' && selectedCity === '' ? 'bg-[#2da3dd]/10 text-[#0d2549]' : 'text-gray-700'
                              }`}
                              onClick={() => {
                                setExpandedState('');
                                setSelectedState('');
                                setSelectedCity('');
                                setShowLocationDropdown(false);
                              }}
                            >
                              <span>All (Eastern)</span>
                            </button>
                          </li>
                          {EASTERN_STATES.map((s) => (
                            <li key={s.state}>
                              <button
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition hover:bg-gray-50 ${
                                  expandedState === s.state ? 'bg-[#2da3dd]/10 text-[#0d2549]' : 'text-gray-700'
                                }`}
                                onClick={() => {
                                  setExpandedState((prev) => (prev === s.state ? '' : s.state));
                                  setSelectedState(s.state);
                                  setSelectedCity('');
                                }}
                              >
                                <span>{s.state}</span>
                                <ChevronRight className={`w-4 h-4 transition-transform ${expandedState === s.state ? 'rotate-90' : ''}`} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cities panel */}
                      <div className="p-3 sm:p-4 max-h-72 overflow-auto">
                        {expandedState ? (
                          <>
                            <p className="text-xs uppercase text-gray-500 font-semibold mb-2 px-1">Cities in {expandedState}</p>
                            <ul className="space-y-1">
                              {EASTERN_STATES.find((s) => s.state === expandedState)!.cities.map((c) => (
                                <li key={c}>
                                  <button
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition hover:bg-gray-50 ${
                                      selectedCity === c ? 'bg-[#2da3dd]/10 text-[#0d2549] font-medium' : 'text-gray-700'
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
                              ))}
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

            {/* Property Type dropdown */}
            <div className="md:col-span-4 relative" ref={typeRef}>
              <button
                type="button"
                onClick={() => setShowTypeDropdown((v) => !v)}
                className="w-full text-left pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:border-[#2da3dd] focus:outline-none transition-colors text-gray-900 bg-white relative"
              >
                <HomeIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <span className="block truncate">{propertyType ? propertyType[0].toUpperCase() + propertyType.slice(1) : 'Property Type'}</span>
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
                            propertyType === '' ? 'bg-[#2da3dd]/10 text-[#0d2549] font-medium' : 'text-gray-700'
                          }`}
                          onClick={() => {
                            setPropertyType('');
                            setShowTypeDropdown(false);
                          }}
                        >
                          All
                        </button>
                      </li>
                      {(['apartment', 'house', 'villa', 'duplex', 'land'] as PropertyType[]).map((t) => (
                        <li key={t}>
                          <button
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition hover:bg-gray-50 ${
                              propertyType === t ? 'bg-[#2da3dd]/10 text-[#0d2549] font-medium' : 'text-gray-700'
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

            {/* Price Range dropdown */}
            <div className="md:col-span-3 relative" ref={priceRef}>
              <button
                type="button"
                onClick={() => setShowPriceDropdown((v) => !v)}
                className="w-full text-left pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:border-[#2da3dd] focus:outline-none transition-colors text-gray-900 bg-white relative"
              >
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <span className="block truncate">{priceRange ? priceRanges.find((r) => r.key === priceRange)?.label : 'Price Range'}</span>
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
                            priceRange === '' ? 'bg-[#2da3dd]/10 text-[#0d2549] font-medium' : 'text-gray-700'
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
                              priceRange === r.key ? 'bg-[#2da3dd]/10 text-[#0d2549] font-medium' : 'text-gray-700'
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

        {/* Featured Properties (filtered in real time) */}
        <div className="mt-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Featured Properties</h3>
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-14">No properties match your filters.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((property) => (
                <Link href={`/properties/${property.id}`} key={property.id}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
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
                      <div className="text-xl font-bold text-[#2da3dd] mb-2">{property.priceLabel}</div>
                      <h4 className="text-base font-semibold text-gray-900 mb-1">{property.title}</h4>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <MapPin className="w-4 h-4" /> {property.location}
                      </div>
                      <div className="flex gap-4 mb-1 text-gray-600 text-sm">
                        <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {property.beds}</span>
                        <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {property.baths}</span>
                        <span className="flex items-center gap-1"><Square className="w-4 h-4" /> {property.sqft} sqft</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
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
    </section>
  );
};

export default FindYourHome;