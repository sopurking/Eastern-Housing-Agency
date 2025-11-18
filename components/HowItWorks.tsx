"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Search & Explore Homes",
    description:
      "Browse our available houses right here on our website. Every listing includes photos and video tours, so you can see the property before booking.",
    img: "/search.jpg",
  },
  {
    step: "02",
    title: "Book a One Time Inspection",
    description:
      "Once you find a home you like, you can book an inspection. Our customer service representative will call you to schedule your inspection.",
    img: "/booking.jpg",
  },
  {
    step: "03",
    title: "Get Picked Up by Our Field Operative",
    description:
      "We assign a standby field operative who arrives in a company vehicle to pick you up from your location and escort you to the property.",
    img: "/pickup.jpg",
  },
  {
    step: "04",
    title: "Decide with Confidence & Secure Your Home",
    description:
      "If you love the home, pay the landlord directly, then pay our service fee of 10%. If not, your inspection fee covers up to 3 different houses at no extra cost.",
    img: "/keys.jpg",
  },
];

const HowItWorks = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const nextStep = () => setIndex((prev) => (prev + 1) % steps.length);
  const prevStep = () => setIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(nextStep, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleFocusIn = () => setPaused(true);
    const handleFocusOut = () => setPaused(false);
    el.addEventListener("focusin", handleFocusIn);
    el.addEventListener("focusout", handleFocusOut);
    return () => {
      el.removeEventListener("focusin", handleFocusIn);
      el.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const current = steps[index];
  const isEven = useMemo(() => index % 2 === 0, [index]);

  const imageVariants = {
    initial: { opacity: 0, x: isEven ? -60 : 60, scale: 1.03 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: isEven ? 60 : -60 },
  };

  const textVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -24 },
  };

  return (
    <section className="relative py-20 bg-[#0d2549] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="bg-[#1e55a7] text-white px-4 py-2 rounded-full text-sm font-semibold inline-block">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Your Journey in <span className="text-[#2da3dd]">4 Simple Steps</span>
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            At Eastern Housing Agency, we believe finding your next home should be simple,
            transparent, and stress-free — with no hidden fees or middleman issues.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative w-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          tabIndex={0}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.step}
              className="grid items-stretch md:grid-cols-2 gap-8 lg:gap-12 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Image */}
              <motion.div
                className={`${isEven ? "md:order-1" : "md:order-2"} relative group rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10`}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <img
                  src={current.img}
                  alt={current.title}
                  className="h-[260px] sm:h-[360px] md:h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-white/90 text-xs sm:text-sm font-medium bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full ring-1 ring-white/15">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#2da3dd]" />
                    Step {current.step}
                  </span>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                className={`${isEven ? "md:order-2" : "md:order-1"} bg-white rounded-3xl p-7 sm:p-10 shadow-2xl ring-1 ring-black/5 flex flex-col justify-center`}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[#1e55a7] font-extrabold text-3xl leading-none">
                    {current.step}
                  </span>
                  <span className="h-1 w-16 bg-[#2da3dd] rounded-full" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                  {current.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {current.description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {steps.map((s, i) => (
                <button
                  key={s.step}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ring-1 ring-white/10 ${
                    index === i ? "bg-[#2da3dd] w-8" : "bg-white/40 w-3 hover:w-6"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={prevStep}
                className="p-3 rounded-full bg-white/90 hover:bg-white text-[#0d2549] shadow-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextStep}
                className="p-3 rounded-full bg-[#2da3dd] hover:bg-[#278fbe] text-white shadow-lg transition"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Why Renters Love Our Process */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-white mb-8">
            Why Renters Love Our Process?
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Fair and Transparent – No hidden charges.",
              "Fast and Reliable – Inspections arranged within 1 hour.",
              "Convenient – Company ride & professional operatives.",
              "Risk-Free – Your inspection fee covers up to 3 houses.",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-left flex items-start gap-3"
              >
                <CheckCircle className="text-[#2da3dd] w-6 h-6 shrink-0 mt-1" />
                <p className="text-gray-200 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative accents */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#2da3dd]/20 blur-3xl hidden sm:block" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#1e55a7]/20 blur-3xl hidden sm:block" />
    </section>
  );
};

export default HowItWorks;
