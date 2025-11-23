"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import MiniBrowserAuth from "./MiniBrowserAuth";
import { signOut, useSession } from "next-auth/react";




const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  // State for MiniBrowser
  const [showMiniBrowser, setShowMiniBrowser] = useState(false);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Properties", href: "#properties" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/60 backdrop-blur-xl shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1300px] mx-auto px-6">
          {/* Mobile Layout */}
          <div className="flex lg:hidden items-center justify-between h-20">
            <motion.div whileHover={{ scale: 1.05 }} className="flex gap-3 items-center cursor-pointer">
              <img src="/logo1.jpg" alt="Eastern Housing Logo" className="h-12 w-auto rounded-full" />
              <span className={`${isScrolled ? "text-gray-900" : "text-white"} text-lg font-bold`}>
                Eastern Housing Agency
              </span>
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-3 items-center h-20">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer justify-self-start">
              <img src="/logo1.jpg" alt="Eastern Housing Logo" className="h-12 w-auto rounded-full" />
              <span className={`${isScrolled ? "text-gray-900" : "text-white"} text-lg font-bold`}>
                Eastern Housing Agency
              </span>
            </motion.div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center gap-8 justify-self-center">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`font-medium transition-colors relative group ${
                    isScrolled ? "text-gray-700 hover:text-white" : "text-white hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? "bg-white" : "bg-white"
                    }`}
                  ></span>
                </motion.a>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4 justify-self-end">
              {session?.user ? (
                <>
                  <span className={`font-medium ${isScrolled ? "text-gray-700" : "text-white"}`}>
                    Hi, {session.user.name?.split(" ")[0]}
                  </span>
                  {session.user.role === 'admin' && (
                    <motion.a
                      href="/admin"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 bg-[#0d2549] text-white rounded-lg hover:bg-[#0b1f3e] transition"
                    >
                      Admin
                    </motion.a>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => setShowMiniBrowser(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                      isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
                    }`}
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    onClick={() => setShowMiniBrowser(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#0d2549] text-white px-6 py-2.5 rounded-lg font-medium shadow-lg transition-all"
                  >
                    Get Started
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors justify-self-end ${
                isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img src="/logo1.jpg" alt="Eastern Housing Logo" className="h-10 w-auto rounded-full" />
                    <span className="text-lg font-bold text-gray-900">Eastern Housing Agency</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-900" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-1 mb-8">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-[#0d2549] rounded-lg font-medium transition-colors"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>

                {/* Mobile Contact Info */}
                <div className="space-y-3 mb-8 px-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 text-[#0d2549]" />
                    <span className="text-sm">+234 (0) 123 456 7890</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5 text-[#0d2549]" />
                    <span className="text-sm">info@dreamhome.com</span>
                  </div>
                </div>

                {/* Mobile CTA Buttons */}
                <div className="space-y-3">
                  {session?.user ? (
                    <>
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">
                          Hi, {session.user.name?.split(" ")[0]}
                        </span>
                      </div>
                      {session.user.role === 'admin' && (
                        <a
                          href="/admin"
                          className="w-full block px-6 py-3 bg-[#0d2549] text-white rounded-lg font-medium hover:bg-[#0b1f3e] transition text-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Admin Panel
                        </a>
                      )}
                      <button
                        onClick={() => signOut()}
                        className="w-full px-6 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="w-full px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                        onClick={() => setShowMiniBrowser(true)}
                      >
                        Sign In
                      </button>
                      <button
                        className="w-full bg-[#0d2549] hover:bg-[#0d2549] text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all"
                        onClick={() => setShowMiniBrowser(true)}
                      >
                        Get Started
                      </button>
                    </>
                  )}
                </div>

                {/* Mobile Menu Footer */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    © 2025 Eastern Housing. All rights reserved.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Authentication */}
      <MiniBrowserAuth 
        isOpen={showMiniBrowser} 
        onClose={() => setShowMiniBrowser(false)}
        onSuccess={() => {
          setShowMiniBrowser(false);
        }}
      />
    </>
  );
};

export default Navbar;
