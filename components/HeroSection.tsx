"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const handleScroll = (id: any) => {
  const section = document.getElementById(id);
  if (section) {
    const offsetTop = section.offsetTop - 80; // adjust offset for navbar height
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
 };

  return (
    <div className="relative min-h-screen overflow-hidden" id='home'>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
          alt="Modern luxury home"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
      </div>

      {/* Decorative Blur Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative max-sm:text-center z-10 max-w-[1300px] mx-auto px-6 min-h-screen flex items-center pt-24 pb-20 md:pt-20 md:pb-16">
        <div className="max-w-3xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="hidden sm:inline-block bg-orange-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 md:mb-6">
              Trusted by 10,000+ Happy Homeowners
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Find Your Perfect
              <span className="font-playfair text-orange-400"> Home</span> with Ease
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 leading-relaxed max-w-2xl">
              Where honesty meets exceptional service. Discover properties that match your dreams, 
              backed by transparent pricing and genuine care.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 md:mb-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-2xl transition"
                onClick={() => handleScroll("properties")}
              >
                Browse Properties
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-2xl border border-white/20 transition"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                Watch Video
              </motion.button>
            </div>

            {/* Stats */}
            <div className="hidden sm:grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/20 shadow-xl"
              >
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">2,500+</div>
                <div className="text-gray-200 text-xs mt-1">Active Listings</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/20 shadow-xl"
              >
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">98%</div>
                <div className="text-gray-200 text-xs mt-1">Satisfaction Rate</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/20 shadow-xl"
              >
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">15+</div>
                <div className="text-gray-200 text-xs mt-1">Years Experience</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hidden xl:block absolute top-32 right-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-xs"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
              <Home className="w-7 h-7 text-orange-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">New Listing</div>
              <div className="font-bold text-gray-900 text-lg">Luxury Villa</div>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-3">Modern 4-bedroom villa with ocean view</div>
          <div className="text-3xl font-bold text-orange-500">₦285,000</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="hidden xl:block absolute bottom-32 right-32 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5"
        >
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" 
              alt="Agent"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-gray-900">Elon Swaghat</div>
              <div className="text-xs text-gray-500">Top Rated Agent</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          {/* <div className="text-white/60 text-sm">Scroll to explore</div> */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
  
};

export default HeroSection;