"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building, Key, Home, Wrench, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: <Home className="w-8 h-8 text-[#2da3dd]" />,
    title: "Property Sales",
    desc: "Buy your dream home with confidence — we connect you to verified properties with transparent pricing.",
  },
  {
    icon: <Key className="w-8 h-8 text-[#2da3dd]" />,
    title: "Property Rentals",
    desc: "Whether short or long-term, we help you find ideal rentals that suit your style and budget.",
  },
  {
    icon: <Building className="w-8 h-8 text-[#2da3dd]" />,
    title: "Estate Management",
    desc: "We handle property supervision, tenant relations, and maintenance for maximum peace of mind.",
  },
  {
    icon: <Wrench className="w-8 h-8 text-[#2da3dd]" />,
    title: "Renovation & Interior Design",
    desc: "Transform your property with expert renovation, furnishing, and modern interior designs.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#2da3dd]" />,
    title: "Legal & Documentation",
    desc: "From land verification to legal paperwork, our experts ensure safe and stress-free ownership.",
  },
];

const Services = () => {
  return (
    <section className="relative bg-gray-50 py-20 md:py-28 overflow-hidden" id="services">
      {/* Decorative Blurs */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-orange-100/40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-orange-50/50 blur-3xl rounded-full"></div>

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-white text-[#0d2549] px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            Our Services
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            What We <span className="text-[#2da3dd]">Offer</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white shadow-lg hover:shadow-2xl rounded-2xl p-8 border border-gray-100 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mb-6 ">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
