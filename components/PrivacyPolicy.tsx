"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Key, Home, Building, Wrench } from "lucide-react";

const policies = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#2da3dd]" />,
    title: "Privacy & Security",
    desc: "We prioritize your privacy and use bank-grade encryption to protect your personal information at all times.",
  },
  {
    icon: <Home className="w-8 h-8 text-[#2da3dd]" />,
    title: "Property Data",
    desc: "We collect information about your property searches and saved listings to provide personalized and efficient service.",
  },
  {
    icon: <Key className="w-8 h-8 text-[#2da3dd]" />,
    title: "Transactions & Payments",
    desc: "Payments for inspections or service fees are handled securely with trusted payment processors.",
  },
  {
    icon: <Building className="w-8 h-8 text-[#2da3dd]" />,
    title: "Sharing Information",
    desc: "We only share necessary details with landlords, payment processors, or law enforcement, never with advertisers.",
  },
  {
    icon: <Wrench className="w-8 h-8 text-[#2da3dd]" />,
    title: "Your Rights",
    desc: "You have full control over your data and can request updates, corrections, or disable cookies anytime in your browser.",
  },
];

const PrivacyPolicy = () => {
  return (
    <section className="relative bg-gray-50 py-20 md:py-28 overflow-hidden" id="privacy-policy">
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
            className="inline-block bg-gray-200 text-[#2da3dd] px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            Privacy Policy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            Your Data <span className="text-[#2da3dd]">Safety</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white shadow-lg hover:shadow-2xl rounded-2xl p-8 border border-gray-100 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mb-6">
                {policy.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{policy.title}</h3>
              <p className="text-gray-600 leading-relaxed">{policy.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
