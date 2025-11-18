"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Link as LinkIcon, List as TocIcon, Phone, Mail, Globe } from "lucide-react";

// Article-style Privacy Policy with sticky TOC and anchor links.

type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const sections: Section[] = [
  {
    id: "intro",
    title: "Privacy Policy",
    content: (
      <>
        <p>
          At Eastern Housing Agency, your trust and safety come first. We know that when you search for a home, you’re also sharing personal information. This Privacy Policy explains how we collect, use, and protect your information when you interact with our website, mobile services, field operatives, and customer support team.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Protecting your privacy</li>
          <li>Keeping your data secure</li>
          <li>Using your information responsibly</li>
          <li>Being transparent at every step</li>
        </ul>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: (
      <>
        <p>When you use our services, we may collect the following types of information:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            <strong>Personal Information:</strong> Full name, phone number, email address, payment details (for inspection fees/service fees).
          </li>
          <li>
            <strong>Property Search Data:</strong> The type of houses you are interested in, locations, and saved searches.
          </li>
          <li>
            <strong>Transaction Information:</strong> Payments you make for inspections or service fees, along with proof of payment.
          </li>
          <li>
            <strong>Communication Records:</strong> Calls, WhatsApp chats, or emails with our customer support.
          </li>
          <li>
            <strong>Location Information:</strong> Only when you request a pickup for house inspections, to enable our field operatives to reach you.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: (
      <>
        <p>We use your information only for the purpose of serving you better. Specifically, we may use it to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Verify and confirm your inspection fee payment</li>
          <li>Schedule and coordinate property inspections</li>
          <li>Connect you with verified landlords and property listings</li>
          <li>Improve our website and services for a smoother experience</li>
          <li>Communicate updates, confirmations, and inspection reminders</li>
          <li>Prevent fraud, scams, or misuse of our platform</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-protect",
    title: "3. How We Protect Your Information",
    content: (
      <>
        <p>
          Your security is non-negotiable. We use bank-grade encryption, secure servers, and strict access controls to make sure your data is always safe.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>We never sell or rent your personal data to third parties.</li>
          <li>
            Only authorized staff (customer support, field operatives) have access to the information they need to serve you.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "4. Sharing of Information",
    content: (
      <>
        <p>We may share limited information only when necessary:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            <strong>With landlords:</strong> Only the details relevant to inspection scheduling (e.g., your name and phone number for arranging access).
          </li>
          <li>
            <strong>With payment processors:</strong> To confirm your inspection and service fee payments securely.
          </li>
          <li>
            <strong>With law enforcement:</strong> Only if required by law or to prevent fraud.
          </li>
        </ul>
        <p className="mt-3">We never share your information with advertisers or third parties for marketing.</p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "5. Your Rights",
    content: (
      <>
        <p>You have full control over your data:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>You can request to update or correct your personal details.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "6. Cookies & Tracking",
    content: (
      <>
        <p>
          Our website may use cookies to improve your browsing experience—helping you find the right house faster. You can disable cookies anytime in your browser settings.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "7. Changes to this Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time. When we do, we will notify you by email, WhatsApp, or a notice on our website.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "8. Contact Us",
    content: (
      <>
        <ul className="space-y-2">
          <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#2da3dd]" /> <span>0805 776 6616</span></li>
          <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#2da3dd]" /> <span>easternhousingagency@gmail.com</span></li>
          <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#2da3dd]" /> <span>easternhousingagency.com</span></li>
        </ul>
      </>
    ),
  },
  {
    id: "promise",
    title: "Our Promise to You",
    content: (
      <>
        <p>
          We believe renting a house should be safe, simple, and transparent. Your data is yours, and we treat it with the same care and respect we’d want for ourselves. Trust us to protect your privacy—while you focus on finding your perfect home.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const [tocOpen, setTocOpen] = useState(false);

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
            Privacy Policy
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0d2549] mt-4 tracking-tight">
            Your Privacy. Protected.
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Learn how we collect, use, and safeguard your information.
          </p>
          <p className="text-gray-500 text-sm mt-2">{lastUpdated}</p>
        </header>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-w-0 overflow-x-hidden">
          {/* TOC */}
          <aside className="lg:col-span-4 xl:col-span-3 min-w-0">
            {/* Mobile TOC toggle */}
            <div className="lg:hidden mb-2">
              <button
                onClick={() => setTocOpen((v) => !v)}
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
                aria-expanded={tocOpen}
                aria-controls="pp-toc"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <TocIcon className="w-4 h-4" /> Table of contents
                </span>
                <span className="text-xs text-gray-500">{sections.length} sections</span>
              </button>
            </div>

            <nav
              id="pp-toc"
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
