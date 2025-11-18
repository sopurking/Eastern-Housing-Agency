"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Search Properties",
    description:
      "Browse through our extensive collection of verified properties that match your preferences and budget.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "02",
    title: "Visit & Inspect",
    description:
      "Schedule a tour with our agents to visit shortlisted properties and get expert guidance.",
    img: "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "03",
    title: "Review & Negotiate",
    description:
      "Review all details, legal documents, and negotiate the best deal effortlessly.",
    img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "04",
    title: "Get Your Keys",
    description:
      "Complete the paperwork and move into your new home with peace of mind.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },
];

const HowItWorks = () => {
  const [index, setIndex] = useState(0);

  const nextStep = () => {
    setIndex((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const current = steps[index];

  return (
    <section className="relative py-20 bg-[#0d2549] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="bg-[#1e55a7] text-white px-4 py-2 rounded-full text-sm font-semibold">
            How It Works
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Your Journey in{" "}
            <span className="text-[#2da3dd]">4 Simple Steps</span>
          </h2>

          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            We’ve made the renting process smooth, transparent, and stress-free.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.step}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-white rounded-3xl overflow-hidden shadow-xl max-w-3xl"
            >
              {/* Image */}
              <div className="w-full h-64 md:h-80 overflow-hidden">
                <motion.img
                  src={current.img}
                  alt={current.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                <span className="text-4xl font-extrabold text-[#1e55a7] block mb-2">
                  {current.step}
                </span>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {current.title}
                </h3>

                <p className="text-gray-600 text-base leading-relaxed">
                  {current.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-6 mt-8">
            <button
              onClick={prevStep}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-2xl transition"
            >
              <ArrowLeft className="text-[#0d2549]" />
            </button>

            <button
              onClick={nextStep}
              className="p-3 bg-[#2da3dd] text-white rounded-full shadow-lg hover:shadow-2xl transition"
            >
              <ArrowRight />
            </button>
          </div>

          {/* Step Indicators */}
          <div className="flex gap-3 mt-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === i ? "bg-[#2da3dd] w-6" : "bg-gray-500"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
