"use client";
import { motion } from "framer-motion";

export default function MeetTheTeam() {
  const team = [
    {
      name: "John Doe",
      role: "Founder",
        img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Jane Smith",
      role: "Co-Founder",
      img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Michael Brown",
      role: "CTO",
       img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Sarah Johnson",
      role: "HR Manager",
      img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="w-full py-16 bg-[#f8fafc] text-center px-6" id="MeetTheTeam">
      <h2 className="text-3xl font-bold text-[#0d2549] mb-10">Meet The Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex flex-col items-center bg-white shadow-md p-6 rounded-2xl border border-[#2da3dd]/20"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-[#2da3dd] shadow"
            />
            <h3 className="mt-4 text-xl font-semibold text-[#0d2549]">{member.name}</h3>
            <p className="text-[#2da3dd] text-sm font-medium">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
