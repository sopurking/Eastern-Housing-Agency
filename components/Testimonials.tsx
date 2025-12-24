"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star, MessageSquarePlus } from "lucide-react";
import TestimonialModal from "./TestimonialModal";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    rating: 5,
    text: "Eastern Housing Agency made finding our dream home effortless. Their transparency and professionalism exceeded all expectations. Highly recommended!",
  },
  {
    name: "Michael Chen",
    role: "Property Investor",
    rating: 5,
    text: "Outstanding service from start to finish. The team's expertise in property management has been invaluable for my investment portfolio.",
  },
  {
    name: "Amara Okafor",
    role: "First-Time Buyer",
    rating: 5,
    text: "As a first-time buyer, I was nervous about the process. The team guided me every step of the way with patience and genuine care.",
  },
  // {
  //   name: "David Thompson",
  //   role: "Landlord",
  //   rating: 5,
  //   text: "Their estate management service is top-notch. My properties are well-maintained and tenants are happy. Couldn't ask for more!",
  // },
  // {
  //   name: "Fatima Hassan",
  //   role: "Tenant",
  //   rating: 5,
  //   text: "Found the perfect rental within my budget. The process was smooth, transparent, and stress-free. Excellent customer service!",
  // },
  // {
  //   name: "James Williams",
  //   role: "Home Seller",
  //   rating: 5,
  //   text: "Sold my property faster than expected thanks to their professional marketing. Great communication throughout the entire process.",
  // },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials");
      const data = await response.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden" id="testimonials">
      <div className="absolute top-20 right-0 w-80 h-80 bg-blue-50/50 blur-3xl rounded-full hidden sm:block"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-blue-50/30 blur-3xl rounded-full hidden sm:block"></div>

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-gray-100 text-[#0d2549] px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            Testimonials
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            What Our <span className="text-[#2da3dd]">Clients Say</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12 text-gray-500">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">No testimonials yet. Be the first to leave a review!</div>
          ) : (
            testimonials.slice(0, showAll ? testimonials.length : 3).map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#0d2549] hover:bg-[#1a3a6b] shadow-xl hover:shadow-2xl rounded-2xl p-8 border border-white/10 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-10 h-10 text-[#2da3dd] opacity-70" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#2da3dd] text-[#2da3dd]" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-200 leading-relaxed mb-6 flex-1">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-white/20 pt-4">
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="text-center mt-12 space-y-4">
          {testimonials.length > 3 && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 bg-[#0d2549] hover:bg-[#1a3a6b] text-white px-6 py-3 rounded-full font-semibold transition shadow-lg"
            >
              {showAll ? "Show Less" : "See More Reviews"}
            </motion.button>
          )}
          <div>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-[#2da3dd] hover:bg-[#1f6f97] text-white px-6 py-3 rounded-full font-semibold transition shadow-lg"
            >
              <MessageSquarePlus className="w-5 h-5" />
              Leave a Review
            </motion.button>
          </div>
        </div>
      </div>

      <TestimonialModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
};

export default Testimonials;