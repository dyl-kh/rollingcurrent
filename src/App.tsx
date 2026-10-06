import { useState, useEffect } from "react";
import logoImg from "@/imports/669342392_122182840292932458_1880932170201731250_n__1_.jpg";
import victronLogo from "@/imports/victron-logo.svg";
import Gallery, { WorkPreview } from "./Gallery";
import { appPathname, withBase } from "./paths";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const SERVICES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="11" rx="2" />
        <path d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
        <line x1="12" y1="11" x2="12" y2="14" />
        <line x1="10" y1="12.5" x2="14" y2="12.5" />
      </svg>
    ),
    title: "Dual Battery Systems",
    desc: "Full dual battery installs with DC-DC chargers and battery management — AGM, gel, or lithium. Keep your fridge running all night without touching the starter battery.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L2 9l10 6 10-6-10-6z" />
        <path d="M2 9v6l10 6 10-6V9" />
      </svg>
    ),
    title: "Solar & Off-Grid Power",
    desc: "Rooftop solar panels, MPPT controllers, and Victron Energy power systems designed for extended off-grid trips. We size and install the whole setup.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Reverse Cameras",
    desc: "Reverse cameras and monitor installs for 4WDs, caravans, trailers, and motorhomes. See exactly what's behind you — especially when towing.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
    title: "Lighting & Light Bars",
    desc: "LED light bar installs, driving lights, rock lights, and interior lighting for 4WDs and campers. Properly wired with switches, relays, and fusing.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Caravans & Trailers",
    desc: "Trailer wiring, breakaway systems, electric brakes, Anderson plugs, and full caravan 12V fitouts. Everything you need to tow with confidence.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    title: "Motorhome & Camper Fitouts",
    desc: "Complete 12V builds for motorhomes and camper conversions — fridges, lighting, USB outlets, inverters, water pumps, and solar. Built to live off.",
  },
];

function Header({ scrolled, pathname }: { scrolled: boolean; pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const raised = scrolled || pathname !== "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        raised
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <a href={withBase("/")} className="flex items-center gap-2.5">
          <img src={logoImg} alt="Rollingcurrent logo" className="w-9 h-9 object-contain" />
          <span
            className="text-lg font-bold tracking-tight text-[#1c2b3a]"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Rollingcurrent
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={withBase(l.href)}
              aria-current={l.href === pathname ? "page" : undefined}
              className={`text-sm font-medium transition-colors duration-200 ${
                l.href === pathname
                  ? "text-[#e04a1a]"
                  : "text-[#1c2b3a]/60 hover:text-[#e04a1a]"
              }`}
              style={{ fontFamily: "Source Sans 3, sans-serif" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={withBase("/#contact")}
            className="px-5 py-2 rounded bg-[#e04a1a] text-white text-sm font-semibold hover:bg-[#c43c10] transition-colors duration-200"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Get a Quote
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#1c2b3a]/70 hover:text-[#1c2b3a]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#e0d8cc] px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={withBase(l.href)}
              aria-current={l.href === pathname ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
              className={`text-base font-medium transition-colors py-1 ${
                l.href === pathname ? "text-[#e04a1a]" : "text-[#1c2b3a]/70 hover:text-[#e04a1a]"
              }`}
              style={{ fontFamily: "Source Sans 3, sans-serif" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={withBase("/#contact")}
            onClick={() => setMenuOpen(false)}
            className="mt-1 px-5 py-3 rounded bg-[#e04a1a] text-white text-sm font-semibold text-center hover:bg-[#c43c10] transition-colors"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Get a Quote
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#faf7f2] overflow-hidden">
      {/* Subtle warm texture shape */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block"
        style={{ background: "linear-gradient(135deg, #f4ede0 0%, #eedfc8 100%)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=900&fit=crop&auto=format"
          alt="4WD adventure off-road"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #faf7f2 0%, transparent 30%)" }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-20 w-full grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6"
            style={{ background: "#f0ebe2", color: "#e04a1a", fontFamily: "Source Sans 3, sans-serif" }}
          >
            4WD & Off-Grid Electrical Specialists
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold text-[#1c2b3a] leading-tight mb-5"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Kit out your rig.
            <br />
            Go further.
            <br />
            <span style={{ color: "#e04a1a" }}>Stay powered.</span>
          </h1>
          <p
            className="text-[#1c2b3a]/60 text-lg leading-relaxed mb-8 max-w-sm"
            style={{ fontFamily: "Source Sans 3, sans-serif" }}
          >
            Rollingcurrent specialises in 4WD and off-grid electrical fitouts — dual batteries, solar, caravans, camper builds, and everything in between.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="px-6 py-3 rounded bg-[#e04a1a] text-white font-semibold hover:bg-[#c43c10] transition-colors duration-200 text-sm"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Get a Free Quote
            </a>
            <a
              href="#services"
              className="px-6 py-3 rounded border border-[#1c2b3a]/20 text-[#1c2b3a]/70 font-semibold hover:border-[#1c2b3a]/40 hover:text-[#1c2b3a] transition-colors duration-200 text-sm"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              See Our Services
            </a>
          </div>

          {/* Trust bar */}
          <div className="mt-12 flex flex-wrap gap-6">
            {[
              { text: "4WD & off-grid specialists", dot: "#e04a1a" },
              { text: "Caravans, trailers & motorhomes", dot: "#1878c8" },
              { text: "Victron Certified Installer", dot: "#8ac43c" },
            ].map((t) => (
              <span
                key={t.text}
                className="flex items-center gap-2 text-sm text-[#1c2b3a]/50"
                style={{ fontFamily: "Source Sans 3, sans-serif" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke={t.dot} strokeWidth="1.4" />
                  <path d="M4.5 7l2 2 3-3" stroke={t.dot} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p
            className="text-[#e04a1a] text-sm font-semibold mb-3"
            style={{ fontFamily: "Source Sans 3, sans-serif" }}
          >
            What we do
          </p>
          <h2
            className="text-4xl font-bold text-[#1c2b3a]"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Our Services
          </h2>
          <p
            className="mt-3 text-[#1c2b3a]/55 max-w-md mx-auto"
            style={{ fontFamily: "Source Sans 3, sans-serif" }}
          >
            From a quick diagnostic to a full electrical overhaul — we've got it covered.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-lg border border-[#e0d8cc] p-6 bg-[#faf7f2] hover:border-[#e04a1a]/40 hover:shadow-sm transition-all duration-250 group"
            >
              <div className="mb-4 text-[#e04a1a] group-hover:text-[#c43c10] transition-colors duration-200">{s.icon}</div>
              <h3
                className="text-lg font-semibold text-[#1c2b3a] mb-2 group-hover:text-[#e04a1a] transition-colors duration-200"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {s.title}
              </h3>
              <p
                className="text-[#1c2b3a]/55 text-sm leading-relaxed"
                style={{ fontFamily: "Source Sans 3, sans-serif" }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Victron certified banner */}
        <div className="mt-10 rounded-lg border border-[#1B72BE]/20 bg-[#1B72BE]/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <img src={victronLogo} alt="Victron Energy" className="h-10 w-auto shrink-0" />
            <div className="border-l border-[#1B72BE]/20 pl-5">
              <p className="text-sm font-bold text-[#1B72BE]" style={{ fontFamily: "Outfit, sans-serif" }}>
                Victron Certified Installer
              </p>
              <p className="text-sm text-[#1c2b3a]/55 mt-0.5" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                We design and install complete Victron Energy power systems — from a single DC-DC charger to a full solar, battery, and inverter setup for your camper or motorhome.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-5 py-2.5 rounded border border-[#1B72BE] text-[#1B72BE] text-sm font-semibold hover:bg-[#1B72BE] hover:text-white transition-all duration-200 whitespace-nowrap"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Get a Quote
          </a>
        </div>
      </div>
    </section>
  );
}

function OurApproach() {
  return (
    <section className="py-20 bg-[#faf7f2]">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        {/* What we do well */}
        <div className="rounded-lg bg-white border border-[#e0d8cc] p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#e04a1a]/10 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e04a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1c2b3a]" style={{ fontFamily: "Outfit, sans-serif" }}>What we do well</h3>
          </div>
          <ul className="space-y-4">
            {[
              "Custom electrical fitouts for 4WDs, caravans, motorhomes, and campers",
              "Full off-grid power systems — solar, dual battery, inverters, and DC-DC charging",
              "Victron Energy certified installs, designed and sized for your specific setup",
              "Reverse cameras, trailer wiring, electric brakes, and Anderson plug fitouts",
              "LED lighting, light bars, and 12V accessories — all properly wired with fusing and switches",
              "Honest advice on what system will actually suit how you travel",
            ].map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#e04a1a] shrink-0" />
                <span className="text-[#1c2b3a]/65 text-sm leading-relaxed" style={{ fontFamily: "Source Sans 3, sans-serif" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What we don't do */}
        <div className="rounded-lg bg-[#1c2b3a] border border-[#1c2b3a] p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>What we don't do</h3>
          </div>
          <ul className="space-y-5">
            {[
              {
                heading: "We don't design systems for self-installation",
                body: "Our expertise is in doing the job right ourselves. We're not in a position to design a system for you to install — that's not the service we offer.",
              },
              {
                heading: "We don't install products you've sourced yourself",
                body: "We take pride in the quality of the products we use. Installing gear we haven't supplied means we can't stand behind the result — and we're not willing to put our name on something we can't guarantee.",
              },
              {
                heading: "We don't do general auto electrical diagnosis",
                body: "If your check engine light is on or your power windows aren't working, we're not the right fit. We specialise in fitouts and off-grid builds — not fault finding on everyday vehicles.",
              },
            ].map((item) => (
              <li key={item.heading} className="flex gap-3 items-start">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{item.heading}</p>
                  <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "Source Sans 3, sans-serif" }}>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-[#faf7f2]">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&h=560&fit=crop&auto=format"
            alt="4WD kitted out for off-road camping"
            className="w-full h-full object-cover aspect-[4/3] bg-[#f0ebe2]"
          />
        </div>

        <div>
          <p
            className="text-[#e04a1a] text-sm font-semibold mb-3"
            style={{ fontFamily: "Source Sans 3, sans-serif" }}
          >
            About us
          </p>
          <h2
            className="text-4xl font-bold text-[#1c2b3a] mb-5 leading-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Built for people
            who love the outdoors.
          </h2>
          <div
            className="space-y-4 text-[#1c2b3a]/60 leading-relaxed text-base"
            style={{ fontFamily: "Source Sans 3, sans-serif" }}
          >
            <p>
              Rollingcurrent is a specialist auto electrician focused on one thing: getting your 4WD, caravan, trailer, or camper properly set up for the road ahead.
            </p>
            <p>
              Whether you're heading off on a lap of Australia, setting up a weekender van, or just want a reliable dual battery so your fridge makes it through the night — we design and install the right system for how you actually use your rig.
            </p>
            <p>
              As a Victron certified installer, we use quality gear and wire everything properly. No shortcuts, no bodge jobs — just a clean, reliable build you can depend on when you're miles from the nearest town.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-block mt-4 px-6 py-3 rounded bg-[#1878c8] text-white text-sm font-semibold hover:bg-[#1265aa] transition-colors duration-200"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", service: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const labelClass = "block text-xs font-semibold text-[#1c2b3a]/50 mb-1.5 uppercase tracking-wide";
  const inputClass =
    "w-full bg-white border border-[#e0d8cc] text-[#1c2b3a] placeholder-[#1c2b3a]/30 px-4 py-3 rounded text-sm focus:outline-none focus:border-[#e04a1a] focus:ring-2 focus:ring-[#e04a1a]/10 transition-all duration-200";

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p
            className="text-[#e04a1a] text-sm font-semibold mb-3"
            style={{ fontFamily: "Source Sans 3, sans-serif" }}
          >
            Get in touch
          </p>
          <h2
            className="text-4xl font-bold text-[#1c2b3a]"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            We'd love to hear from you
          </h2>
          <p
            className="mt-3 text-[#1c2b3a]/55 max-w-sm mx-auto"
            style={{ fontFamily: "Source Sans 3, sans-serif" }}
          >
            Tell us about your rig and what you're planning. We'll get back to you with a no-obligation quote tailored to your build.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Contact details */}
          <div className="md:col-span-2 space-y-7">
            {[
              { label: "Phone", value: "(03) 9123 4567", href: "tel:0391234567", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.36-.36a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> },
              { label: "Email", value: "hello@rollingcurrent.com.au", href: "mailto:hello@rollingcurrent.com.au", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg> },
              { label: "Address", value: "42 Sparks Lane, Moorabbin VIC 3189", href: undefined, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg> },
              { label: "Hours", value: "Mon–Fri 7:30am–5pm\nSat 8am–12pm", href: undefined, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 items-start">
                <span className="mt-0.5 text-[#e04a1a] shrink-0">{item.icon}</span>
                <div>
                  <p
                    className="text-xs font-semibold text-[#1c2b3a]/40 uppercase tracking-wide mb-1"
                    style={{ fontFamily: "Source Sans 3, sans-serif" }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[#1c2b3a] text-sm hover:text-[#e04a1a] transition-colors font-medium"
                      style={{ fontFamily: "Source Sans 3, sans-serif" }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      className="text-[#1c2b3a]/70 text-sm whitespace-pre-line"
                      style={{ fontFamily: "Source Sans 3, sans-serif" }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-[#faf7f2] rounded-xl p-8 border border-[#e0d8cc]">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="w-14 h-14 rounded-full bg-[#e04a1a]/10 flex items-center justify-center text-[#e04a1a]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h3
                  className="text-2xl font-bold text-[#1c2b3a]"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Message received!
                </h3>
                <p
                  className="text-[#1c2b3a]/55 text-sm max-w-xs"
                  style={{ fontFamily: "Source Sans 3, sans-serif" }}
                >
                  We'll be in touch within one business day with your quote.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-3 text-sm text-[#e04a1a] font-medium hover:underline"
                  style={{ fontFamily: "Source Sans 3, sans-serif" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={{ fontFamily: "Source Sans 3, sans-serif" }}>Name *</label>
                    <input required type="text" placeholder="Your name" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass} style={{ fontFamily: "Source Sans 3, sans-serif" }} />
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "Source Sans 3, sans-serif" }}>Phone</label>
                    <input type="tel" placeholder="Your phone number" value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass} style={{ fontFamily: "Source Sans 3, sans-serif" }} />
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: "Source Sans 3, sans-serif" }}>Email *</label>
                  <input required type="email" placeholder="your@email.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass} style={{ fontFamily: "Source Sans 3, sans-serif" }} />
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: "Source Sans 3, sans-serif" }}>Service needed</label>
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className={`${inputClass} cursor-pointer`} style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value="Other">Other / Not sure</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: "Source Sans 3, sans-serif" }}>Message *</label>
                  <textarea required rows={4} placeholder="Tell us about your vehicle and what you need..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`} style={{ fontFamily: "Source Sans 3, sans-serif" }} />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded bg-[#e04a1a] text-white font-semibold text-sm hover:bg-[#c43c10] active:bg-[#b0360c] transition-colors duration-200"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#e0d8cc] py-8 bg-[#faf7f2]">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="text-sm font-bold text-[#1c2b3a]/50"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Rollingcurrent
        </span>
        <p
          className="text-[#1c2b3a]/40 text-xs"
          style={{ fontFamily: "Source Sans 3, sans-serif" }}
        >
          © {new Date().getFullYear()} Rollingcurrent Auto Electrical. All rights reserved.
        </p>
        <div className="flex gap-5">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={withBase(l.href)}
              className="text-xs text-[#1c2b3a]/40 hover:text-[#e04a1a] transition-colors"
              style={{ fontFamily: "Source Sans 3, sans-serif" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function FloatingCTA({ visible }: { visible: boolean }) {
  return (
    <a
      href={withBase("/#contact")}
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-[#e04a1a] text-white text-sm font-semibold shadow-lg hover:bg-[#c43c10] transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      }`}
      style={{ fontFamily: "Outfit, sans-serif", boxShadow: "0 4px 20px rgba(192,120,64,0.35)" }}
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M2 3a1 1 0 011-1h2.5a1 1 0 01.97.757l.5 2a1 1 0 01-.42 1.052l-.9.6a8 8 0 003.94 3.94l.6-.9a1 1 0 011.052-.42l2 .5A1 1 0 0114 10.5V13a1 1 0 01-1 1A11 11 0 012 3z" fill="white" />
      </svg>
      Get a Quote
    </a>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const pathname = appPathname();
  const isGallery = pathname === "/gallery";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
      setPastHero(window.scrollY > window.innerHeight * 0.6);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-full bg-[#faf7f2]">
      <Header scrolled={scrolled} pathname={pathname} />
      {isGallery ? (
        <Gallery />
      ) : (
        <>
          <Hero />
          <Services />
          <WorkPreview />
          <OurApproach />
          <About />
          <Contact />
        </>
      )}
      <Footer />
      <FloatingCTA visible={pastHero} />
    </div>
  );
}
