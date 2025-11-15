"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Contact = () => {
    

  return (
    <section
      className="relative bg-gray-900 text-white py-20 md:py-28 overflow-hidden"
      id="contact"
    >
   
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-orange-500/20 text-[#2da3dd] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Let’s <span className="text-[#2da3dd]">Connect</span> With You
          </h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto">
            Reach out through any of the platforms below — we’d love to help
            you find your perfect home.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <a
              href="tel:+2348057766616"
              className="bg-white/10 p-4 rounded-2xl mb-4 flex items-center justify-center"
            >
              <Phone className="w-6 h-6 text-[#2da3dd]" />
            </a>
            <h3 className="font-semibold text-lg mb-1">Call Us</h3>
            <p className="text-gray-400">+234 805 776 6616</p>
            <a
              href="tel:+2348057766616"
              className="mt-3 bg-[#2da3dd] hover:bg-[#154760] text-white px-6 py-2 rounded-lg font-semibold text-sm transition"
            >
              Call Now
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <a
              href="mailto:easternhousingagency@gmail.com"
              className="bg-white/10 p-4 rounded-2xl mb-4 flex items-center justify-center"
            >
              <Mail className="w-6 h-6 text-[#2da3dd]" />
            </a>
            <h3 className="font-semibold text-lg mb-1">Email Us</h3>
            <p className="text-gray-400">easternhousingagency@gmail.com</p>
            <a
              href="mailto:easternhousingagency@gmail.com"
              className="mt-3 bg-[#2da3dd] hover:bg-[#154760] text-white px-6 py-2 rounded-lg font-semibold text-sm transition"
            >
              Send Email
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="bg-white/10 p-4 rounded-2xl mb-4">
              <MapPin className="w-6 h-6 text-[#2da3dd]" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Office Address</h3>
            <p className="text-gray-400">‎📍 Office: 79 Transaerodrome Emene Enugu State</p>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-6 mt-14"
        >
          {[{ icon: <Facebook />, link: "#" }, { icon: <Twitter />, link: "#" }, { icon: <Instagram />, link: "#" }, { icon: <Linkedin />, link: "#" }].map(
            (social, i) => (
              <motion.a
                key={i}
                href={social.link}
                whileHover={{ scale: 1.15 }}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[#2da3dd] hover:bg-[#154760] hover:text-white transition"
              >
                {social.icon}
              </motion.a>
            )
          )}
        </motion.div>

        {/* Business Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 text-center md:text-left mt-14 max-w-3xl mx-auto"
          >
            <h3 className="text-xl font-semibold text-[#2da3dd] mb-2">Business Hours & Registration</h3>
            <p className="text-gray-300 mb-1">Mon–Sat, 8 AM – 5:30 PM</p>
            <p className="text-gray-400 text-sm">(24/7 WhatsApp & Email Support Available)</p>
            <p className="text-gray-400 text-sm mt-2">
              Registered in Nigeria under Company Number <span className="font-semibold">8937715</span>
            </p>
          </motion.div>


        <p className="text-center text-gray-500 text-sm mt-10">
          © {new Date().getFullYear()} Eastern Housing Agency. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Contact;
