"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Home, DollarSign, Bed, ChevronDown, X, Filter, ChevronLeft, ChevronRight, Heart, Video, Bath, Square } from 'lucide-react';
import Image from 'next/image';
import PropertyListings from './PropertyListings';

const FindYourHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const dropdownRef = useRef(null);

  // Eastern Nigerian states and major cities
  // const easternNigeria = [
  //   { state: 'Abia', cities: ['Aba', 'Umuahia', 'Arochukwu', 'Ohafia', 'Bende'] },
  //   { state: 'Anambra', cities: ['Awka', 'Onitsha', 'Nnewi', 'Ekwulobia', 'Ihiala'] },
  //   { state: 'Ebonyi', cities: ['Abakaliki', 'Afikpo', 'Onueke', 'Ezza', 'Ishielu'] },
  //   { state: 'Enugu', cities: ['Enugu', 'Nsukka', 'Agbani', 'Oji River', 'Udi'] },
  //   { state: 'Imo', cities: ['Owerri', 'Orlu', 'Okigwe', 'Mbaise', 'Oguta'] }
  // ];

  

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30" id='properties'>
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
            Search through thousands of properties across Abia, Anambra, Ebonyi, Enugu, and Imo states
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100"
        >
          {/* Main Search Bar */}
          <div className="grid lg:grid-cols-12 gap-4 mb-4">
      
              <div className="lg:col-span-3 relative">
              <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:border-[#2da3dd] focus:outline-none transition-colors text-gray-900 appearance-none bg-white cursor-pointer"
              >
                <option value="">Eastern States</option>
                <option value="apartment">Abia</option>
                <option value="house">Anambra</option>
                <option value="villa">Imo</option>
                <option value="duplex">Enugu</option>
                <option value="land">Ebonyi</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Property Type */}
            <div className="lg:col-span-3 relative">
              <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:border-[#2da3dd] focus:outline-none transition-colors text-gray-900 appearance-none bg-white cursor-pointer"
              >
                <option value="">Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="duplex">Duplex</option>
                <option value="land">Land</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Price Range */}
            <div className="lg:col-span-2 relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:border-[#2da3dd] focus:outline-none transition-colors text-gray-900 appearance-none bg-white cursor-pointer"
              >
                <option value="">Price Range</option>
                <option value="0-50m">₦0 - ₦50M</option>
                <option value="50m-100m">₦50M - ₦100M</option>
                <option value="100m-200m">₦100M - ₦200M</option>
                <option value="200m+">₦200M+</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
            
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-600 hover:text-[#2da3dd] transition-colors font-medium"
            >
              <Filter className="w-4 h-4" />
              <span>{showFilters ? 'Hide' : 'Show'} Advanced Filters</span>
            </button>

            {(searchQuery || propertyType || priceRange || bedrooms) && (
              <button
                // onClick={clearFilters}
                className="text-sm text-[#2da3dd] hover:text-[#2da3dd] font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                  {/* Bedrooms */}
                  <div className="relative">
                    <Bed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:border-[#2da3dd] focus:outline-none transition-colors text-gray-900 appearance-none bg-white cursor-pointer"
                    >
                      <option value="">Bedrooms</option>
                      <option value="1">1 Bedroom</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4">4 Bedrooms</option>
                      <option value="5+">5+ Bedrooms</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>

                  {/* Additional filters can be added here */}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick Search Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-3 justify-center"
        >
          <span className="text-sm text-gray-600 font-medium">Popular searches:</span>
          {['Enugu City', 'Owerri', 'Awka', 'Aba', 'Onitsha'].map((city, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // onClick={() => {
              //   const cityObj = cities.find(c => c.name === city);
              //   if (cityObj) handleCitySelect(cityObj);
              // }}
              className="px-4 py-2 bg-white hover:bg-orange-50 border border-gray-200 hover:border-[#2da3dd] rounded-full text-sm text-gray-700 hover:text-[#2da3dd] transition-all shadow-sm hover:shadow"
            >
              {city}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Properties Listed', value: '2,500+' },
            { label: 'Cities Covered', value: '25+' },
            { label: 'Happy Clients', value: '10,000+' },
            { label: 'Expert Agents', value: '50+' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#2da3dd] mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      
      </div>
    </section>
  );
};

// PropertyListings Component


export default FindYourHome;