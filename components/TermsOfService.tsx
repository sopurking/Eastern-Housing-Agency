"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link as LinkIcon, List as TocIcon } from "lucide-react";

// Article-style Terms of Service with sticky Table of Contents and anchor links
// Uses TailwindCSS and semantic HTML for a professional legal-doc presentation.

type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p>
          Welcome to Eastern Housing Agency. By using our services, you agree to these Terms of Service. Please read them carefully; they are designed to protect you, the landlord, the renter, and our company, while keeping the renting process clear, fair, and stress-free.
        </p>
      </>
    ),
  },
  {
    id: "our-role",
    title: "Our Role",
    content: (
      <>
        <p>We are a housing agency that connects landlords with renters. We:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Provide property listings and video tours.</li>
          <li>Arrange inspections through our trained field operatives and company vehicles.</li>
          <li>Facilitate a transparent process where renters pay rent directly to landlords.</li>
          <li>Charge a service fee of 10% (paid by renters after successfully securing a property).</li>
        </ul>
        <p className="mt-3">We are not landlords and do not own the listed properties.</p>
      </>
    ),
  },
  {
    id: "inspection-fees",
    title: "Inspection Fees",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>Renters pay a small inspection fee before viewing any property.</li>
          <li>
            This fee covers logistics: assigning a trained field operative, transport, and customer service scheduling.
          </li>
          <li>The fee is valid for up to 3 house inspections.</li>
          <li>The inspection fee is non-refundable.</li>
        </ul>
      </>
    ),
  },
  {
    id: "transparency-of-payments",
    title: "Transparency of Payments",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>Renters pay directly to the landlord.</li>
          <li>Eastern Housing Agency does not collect or hold any payments on behalf of landlords.</li>
          <li>Our company only collects the agreed 10% service fee after a renter secures a property.</li>
        </ul>
      </>
    ),
  },
  {
    id: "landlord-responsibilities",
    title: "Landlord Responsibilities",
    content: (
      <>
        <p>Landlords listing properties with us agree that:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>The property is legally theirs to rent.</li>
          <li>All information (rent, condition, availability) provided is accurate.</li>
          <li>They will honor agreements made with tenants who rent through our platform.</li>
        </ul>
      </>
    ),
  },
  {
    id: "renter-responsibilities",
    title: "Renter Responsibilities",
    content: (
      <>
        <p>Renters agree to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Provide accurate personal details when booking inspections.</li>
          <li>Treat properties with respect during inspections.</li>
          <li>Make payment directly to the landlord, and service fees promptly to Eastern Housing Agency.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cancellations-and-no-shows",
    title: "Cancellations and No-Shows",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            If a renter fails to attend a scheduled inspection, the fee remains valid but will count toward the 3 inspections.
          </li>
          <li>
            Landlords must notify us immediately if a property is no longer available to avoid inconveniencing renters.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "service-limitations",
    title: "Service Limitations",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>We do not guarantee that every renter will secure a property.</li>
          <li>
            We are not liable for disputes between landlords and renters after rent has been paid, though we will provide guidance where possible.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "privacy-and-data-protection",
    title: "Privacy and Data Protection",
    content: (
      <>
        <p>
          We respect your privacy. Personal details (phone numbers, house numbers, payment confirmations) are used only for service purposes and are never sold or shared with third parties.
        </p>
      </>
    ),
  },
  {
    id: "agreement",
    title: "Agreement",
    content: (
      <>
        <p>
          By using our services, both renters and landlords confirm they understand and agree to these terms.
        </p>
      </>
    ),
  },
];

export default function TermsOfService() {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const [tocOpen, setTocOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const ids = useMemo(() => sections.map((s) => s.id), []);

  // Scrollspy
  useEffect(() => {
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [ids]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setTocOpen(false);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const lastUpdated = "Last updated: Nov 2025";

  return (
    <section className="relative py-16 md:py-20 bg-gray-50 w-full overflow-hidden">
      <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-[#2da3dd]/10 blur-3xl pointer-events-none hidden sm:block" />
      <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-[#1e55a7]/10 blur-3xl pointer-events-none hidden sm:block" />

      <div className="max-w-[1300px] mx-auto px-6">
        {/* Hero */}
        <header className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#1e55a7] text-white px-4 py-2 rounded-full text-xs font-semibold">
            Terms of Service
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0d2549] mt-4 tracking-tight">
            Clear, Fair, and Stress‑Free Renting
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Please review these terms carefully. They protect renters, landlords, and our company.
          </p>
          <p className="text-gray-500 text-sm mt-2">{lastUpdated}</p>
        </header>

        {/* Two-column layout */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-w-0 overflow-x-hidden">
          {/* TOC */}
          <aside className="lg:col-span-4 xl:col-span-3 min-w-0 sticky">
            {/* Mobile TOC toggle */}
            <div className="lg:hidden mb-2">
              <button
                onClick={() => setTocOpen((v) => !v)}
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
                aria-expanded={tocOpen}
                aria-controls="tos-toc"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <TocIcon className="w-4 h-4" /> Table of contents
                </span>
                <span className="text-xs text-gray-500">{sections.length} sections</span>
              </button>
            </div>

            <nav
              id="tos-toc"
              className={`bg-white border border-gray-200 rounded-2xl p-4 lg:p-6 shadow-sm lg:sticky lg:top-24 ${
                tocOpen ? "block" : "hidden lg:block"
              } max-w-full w-full overflow-x-hidden`}
              aria-label="Table of contents"
            >
              <ol className="space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollTo(s.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2da3dd] ${
                        activeId === s.id
                          ? "bg-[#2da3dd]/10 text-[#0d2549] font-semibold"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                      aria-current={activeId === s.id ? "true" : undefined}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Article */}
          <article className="lg:col-span-8 xl:col-span-9 min-w-0">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 sm:p-8 md:p-10 overflow-x-hidden">
              {sections.map((s, i) => (
                <section key={s.id} className={i !== 0 ? "mt-10 md:mt-12" : undefined}>
                  <div className="group flex items-center gap-2 min-w-0">
                    <h2 id={s.id} className="text-xl sm:text-2xl font-bold text-[#0d2549] tracking-tight scroll-mt-24 break-words">
                      {s.title}
                    </h2>
                    <button
                      onClick={() => navigator.clipboard.writeText(`${location.origin}${location.pathname}#${s.id}`)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
                      aria-label={`Copy link to ${s.title}`}
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="prose prose-gray max-w-none mt-4 break-words">
                    <div className="text-gray-700 leading-relaxed space-y-4">{s.content}</div>
                  </div>

                  {i < sections.length - 1 && <hr className="mt-8 md:mt-10 border-gray-200" />}
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
