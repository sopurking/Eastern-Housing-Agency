"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PropertyModal = ({
  isOpen,
  onClose,
  property,
  type,
  currentIndex,
  next,
  prev,
}: any) => {
  if (!isOpen || !property) return null;

  const mediaList =
    type === "image" ? property.images : property.videos || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl p-4 w-[90%] max-w-lg shadow-xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media */}
            <div className="relative flex justify-center items-center">
              {type === "image" ? (
                <motion.img
                  key={currentIndex}
                  src={mediaList[currentIndex]}
                  alt="property"
                  className="w-full h-72 object-cover rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              ) : (
                <motion.iframe
                  key={currentIndex}
                  src={mediaList[currentIndex]}
                  allowFullScreen
                  className="w-full h-72 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              {/* Navigation */}
              {mediaList.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            <div className="text-center mt-2 text-gray-500 text-sm">
              {currentIndex + 1} / {mediaList.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PropertyModal;
