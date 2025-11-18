"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const AboutUs = () => {

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
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-white" id='about'>
      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-orange-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-orange-50/60 rounded-full blur-3xl"></div>
      
      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Video Section - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-full"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group h-[400px] md:h-[450px] lg:h-[520px]">
              {/* Video Thumbnail */}
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                alt="About our company"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent"></div>
              
              {/* Play Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:bg-[#0d2549] transition-all duration-300"
              >
                <Play className="w-7 h-7 md:w-9 md:h-9 text-[#0d2549] group-hover:text-white ml-1 transition-colors duration-300" fill="currentColor" />
              </motion.button>
              
              {/* Video Label */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-gray-900">Watch Our Story</span>
              </div>
            </div>
          </motion.div>

          {/* Content Section - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:pl-8 flex flex-col justify-center max-sm:items-center max-sm:text-center"
          >
            <span className="inline-block bg-[#0d2549] text-[#edf2f8] px-4 py-2 rounded-full text-sm font-semibold mb-4 md:mb-6 w-fit">
              About Us
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Building Trust, Creating
              <span className="text-[#2da3dd]"> Dream Homes</span>
            </h2>
            
            <p className="text-base md:text-md text-gray-600 mb-5 md:mb-6 leading-relaxed">
             Eastern Housing Agency is redefining the rental experience in the East, making it stress-free, fair, and transparent for both tenants and landlords. We eliminate hidden fees, streamline processes, and foster trust between landlords and renters.
            </p>

            <p className="text-base md:text-md text-gray-600 mb-6 md:mb-8 leading-relaxed">
            For Renters: Hassle-free guidance, no hidden fees, and transparent support throughout the rental journey.
            For Landlords: Access to quality tenants, reduced vacancies, and investment protection through expert consulting.
            </p>

            <p className="text-base md:text-md text-gray-600 mb-6 md:mb-8 leading-relaxed">
           Our Promise: We prioritize people, ensuring renters find their ideal homes and landlords enjoy peace of mind.
            </p>


            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2da3dd] hover:bg-[#2da3dd] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-fit max-sm:w-full"
              onClick={()=>handleScroll("MeetTheTeam")}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;