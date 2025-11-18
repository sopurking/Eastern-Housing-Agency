"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Key } from 'lucide-react';

// Define the two main colors for easy reference
const PRIMARY_COLOR = '#0d2549'; // Dark Blue
const SECONDARY_COLOR = '#2da3dd'; // Light Blue

const LandlordCTA: React.FC = () => {

    const WHATSAPP_NUMBER = '+2348057766616'; // Replace with your agency's number (e.g., 1234567890)
const PRE_FILLED_MESSAGE = "Hi, I am a landlord and will like to lease my house";

const handleListProperties = () => {
    const encodedMessage = encodeURIComponent(PRE_FILLED_MESSAGE);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
};

    return (
        // Component container with a light background and padding
        <div className="py-16 bg-gray-50 border-t border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className={`p-8 md:p-12 rounded-xl text-center shadow-2xl`}
                    style={{ 
                        backgroundColor: PRIMARY_COLOR, // Dark blue background
                        backgroundImage: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #1a3c63 100%)` 
                    }}
                >
                    <Home className="w-10 h-10 text-white mx-auto mb-4" />
                    
                    {/* Main Headline */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        Are you a Landlord? Lease your house
                    </h2>
                    
                    {/* Supporting Text (Optional) */}
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                        Connect with reliable renters quickly and transparently through Eastern Housing Agency.
                    </p>

                    {/* CTA Button */}
                    <motion.button
                        onClick={handleListProperties}
                        whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(45, 163, 221, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex items-center justify-center 
                                    bg-[${SECONDARY_COLOR}] text-white 
                                    px-8 py-3 rounded-lg font-semibold 
                                    shadow-lg transition-all duration-300 hover:brightness-110`}
                    >
                        <Key className="w-5 h-5 mr-2" />
                        Lease Properties
                    </motion.button>

                </motion.div>
            </div>
        </div>
    );
};

export default LandlordCTA;