"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Briefcase,
  Home,
  DollarSign,
  UserCheck,
  XCircle,
  FileText,
  Lock,
  Handshake,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const COLORS = {
  primary: "#0d2549",
  secondary: "#2da3dd",
  accent: "#1e55a7",
};

interface TermSection {
  id: string;
  title: string;
  number: string;
  icon: React.ElementType;
  points: (string | { subtitle: string; items: string[] })[];
}

const parsePoint = (text: string) =>
  text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

const terms: TermSection[] = [
  {
    id: "role",
    title: "Our Role as an Agency",
    number: "1",
    icon: Briefcase,
    points: [
      "We are a housing agency that connects landlords with renters.",
      "Provide property listings and video tours.",
      "Arrange inspections through trained field operatives and company vehicles.",
      "Facilitate a transparent process where renters pay landlords directly.",
      "Charge a 10% service fee after securing a property.",
      "We do not own or manage any listed properties.",
    ],
  },

  {
    id: "fees",
    title: "Inspection Fees",
    number: "2",
    icon: DollarSign,
    points: [
      "Renters pay a small inspection fee before viewing a property.",
      "This fee covers logistics such as transport, operatives, and scheduling.",
      "Valid for up to 3 inspections.",
      "Inspection fees are non-refundable.",
    ],
  },

  {
    id: "payments",
    title: "Transparency of Payments",
    number: "3",
    icon: Home,
    points: [
      "Renters pay landlords directly.",
      "We do not collect or store rent payments.",
      "We only collect the agreed 10% service fee after securing a property.",
    ],
  },

  {
    id: "landlord",
    title: "Landlord Responsibilities",
    number: "4",
    icon: UserCheck,
    points: [
      "Landlords agree that:",
      {
        subtitle: "Key Agreements:",
        items: [
          "The property is legally theirs to rent.",
          "All information provided is accurate.",
          "They will honor agreements made with tenants.",
        ],
      },
    ],
  },

  {
    id: "renter",
    title: "Renter Responsibilities",
    number: "5",
    icon: FileText,
    points: [
      "Renters agree to:",
      {
        subtitle: "Key Duties:",
        items: [
          "Provide accurate personal information.",
          "Respect properties during inspections.",
          "Make payments directly to landlords and promptly pay service fees.",
        ],
      },
    ],
  },

  {
    id: "cancellation",
    title: "Cancellations & No-Shows",
    number: "6",
    icon: XCircle,
    points: [
      "Missed inspections still count toward the 3-inspection limit.",
      "Landlords must notify us if a property becomes unavailable.",
    ],
  },

  {
    id: "limitations",
    title: "Service Limitations",
    number: "7",
    icon: Shield,
    points: [
      "We do not guarantee that every renter will secure a property.",
      "We are not liable for landlord-tenant disputes after payment.",
    ],
  },

  {
    id: "privacy",
    title: "Privacy & Data Protection",
    number: "8",
    icon: Lock,
    points: [
      "We protect your information and never sell or share personal data.",
    ],
  },

  {
    id: "agreement",
    title: "Agreement",
    number: "9",
    icon: Handshake,
    points: [
      "By using our services, renters and landlords confirm agreement with these terms.",
    ],
  },
];

// Motion variants for directional slide animation
const slideVariants = {
  enterLeft: { x: -80, opacity: 0 },
  enterRight: { x: 80, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitLeft: { x: -80, opacity: 0 },
  exitRight: { x: 80, opacity: 0 },
};

const TermCard = ({ section }: { section: TermSection }) => {
  const Icon = section.icon;

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${COLORS.secondary}20` }}
        >
          <Icon className="text-[#1e55a7] w-6 h-6" />
        </div>

        <div>
          <p className="font-black text-sm" style={{ color: COLORS.accent }}>
            {section.number}.
          </p>
          <h3
            className="text-xl md:text-2xl font-bold"
            style={{ color: COLORS.primary }}
          >
            {section.title}
          </h3>
        </div>
      </div>

      <ul className="space-y-3 text-gray-700 text-sm md:text-base">
        {section.points.map((point, i) =>
          typeof point === "string" ? (
            <li key={i} dangerouslySetInnerHTML={{ __html: parsePoint(point) }} />
          ) : (
            <li key={i} className="mt-3">
              <p className="font-semibold mb-1">{point.subtitle}</p>
              <ul className="list-disc pl-5 space-y-1">
                {point.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default function TermsOfServiceSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const next = () => {
    if (index < terms.length - 1) {
      setDirection("right");
      setIndex((i) => i + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setDirection("left");
      setIndex((i) => i - 1);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="px-4 py-2 rounded-full text-white text-sm font-semibold shadow-md inline-block mb-4"
            style={{ backgroundColor: COLORS.accent }}
          >
            Legal Agreement
          </span>

          <h1
            className="text-4xl md:text-5xl font-extrabold"
            style={{ color: COLORS.primary }}
          >
            Terms of <span className="text-[#1e55a7]">Service</span>
          </h1>

          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            These terms protect renters, landlords, and our company.
          </p>
        </div>

        {/* Slider */}
        <div className="relative min-h-[380px]">
          <motion.div
            key={index}
            initial={direction === "right" ? "enterRight" : "enterLeft"}
            animate="center"
            exit={direction === "right" ? "exitLeft" : "exitRight"}
            variants={slideVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 flex justify-center items-center"
          >
            <TermCard section={terms[index]} />
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={prev}
            disabled={index === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition text-[#1e55a7]  ${
              index === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-[#1e55a7]" /> Previous
          </button>

          <button
            onClick={next}
            disabled={index === terms.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition text-[#1e55a7]  ${
              index === terms.length - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Next <ArrowRight className="w-4 h-4 text-[#1e55a7] " />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {terms.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition ${
                i === index ? "bg-[#1e55a7]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
