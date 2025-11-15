"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Home, FileCheck, Key } from 'lucide-react';

const HowItWorks = () => {
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

  const steps = [
    {
      icon: Search,
      step: '01',
      title: 'Search Properties',
      description: 'Browse through our extensive collection of verified properties that match your preferences and budget.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Home,
      step: '02',
      title: 'Visit & Inspect',
      description: 'Schedule a tour with our agents to visit your shortlisted properties and get expert guidance.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: FileCheck,
      step: '03',
      title: 'Review & Negotiate',
      description: 'Review property details, legal documents, and negotiate the best deal with our support.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Key,
      step: '04',
      title: 'Get Your Keys',
      description: 'Complete the paperwork and move into your dream home with full peace of mind.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br bg-gray-100">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block bg-[#0d2549] text-[#edf2f8] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Your Journey to a New Home in
            <span className="text-[#0d2549]"> 4 Simple Steps</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We've streamlined the home-finding process to make it easy, transparent, and stress-free for you.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connecting Line (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-[60%] w-full h-0.5 bg-gradient-to-r from-orange-200 to-transparent z-0"></div>
                )}

                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#0d2549] to-[#2da3dd] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{step.step}</span>
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-5 md:mb-6 relative z-10`}>
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-base md:text-lg text-gray-600 mb-6">
            Ready to start your home-finding journey?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#2da3dd] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => handleScroll("properties")}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;