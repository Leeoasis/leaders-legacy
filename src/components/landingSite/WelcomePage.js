import React, { useRef, useState } from "react";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  Shield,
  Users,
  HeartHandshake,
  Hammer,
  Landmark,
  Megaphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import logo from "../../assets/Images/logo.png";
import heroImage from "../../assets/Images/hero.png";

// === Brand Colors ===
const BRAND = {
  primary: "#C25B00", // Burnt Orange
  rust: "#A34700", // Deep Rust
  secondary: "#708238", // Olive Green
  sage: "#9AA863", // Muted Sage
  cream: "#F3EFE6",
  charcoal: "#0E0F0F",
  black: "#111212",
};

// === Gradients ===
const grad = {
  primary: `linear-gradient(90deg, ${BRAND.primary} 0%, ${BRAND.rust} 35%, ${BRAND.secondary} 100%)`,
  heading: `linear-gradient(180deg, ${BRAND.primary} 0%, ${BRAND.secondary} 90%)`,
  footerBar: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
  warmOverlay: `linear-gradient(180deg, rgba(12,10,10,0.85), rgba(194,91,0,0.15))`,
};

// === Section Header Component ===
const SectionTitle = ({ kicker, title, subtitle }) => (
  <div className="text-center max-w-4xl mx-auto mb-14 px-4">
    {kicker && (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="uppercase tracking-[0.2em] text-xs md:text-sm"
        style={{ color: BRAND.secondary }}
      >
        {kicker}
      </motion.p>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-5xl font-extrabold leading-tight text-transparent bg-clip-text"
      style={{ backgroundImage: grad.heading }}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-4 text-base md:text-lg text-gray-400"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function HomePage() {
  // Carousel scroll ref
  const carouselRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);

  const scrollAmount = 380; // one card width

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setScrollPos(carouselRef.current.scrollLeft - scrollAmount);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPos(carouselRef.current.scrollLeft + scrollAmount);
    }
  };

  const programs = [
    { title: "Youth Boys CYCC", img: "/images/hands.jpg", text: "Residential healing, discipleship, academics, and life prep for at-risk boys." },
    { title: "Victim Empowerment", img: "/images/crowd.jpg", text: "Trauma counseling, peer support, family mediation, and advocacy for male inclusion." },
    { title: "Correctional Reintegration", img: "/images/city.jpg", text: "Discipleship, restorative justice, mentorship, skills, and job placement." },
    { title: "Men’s Leadership Camps", img: "/images/hands.jpg", text: "Identity restoration, healing from father wounds, and servant leadership." },
    { title: "Community Outreach", img: "/images/crowd.jpg", text: "Serving elderly and single mothers, clean-ups, feeding schemes, and repairs." },
    { title: "Skills Development", img: "/images/city.jpg", text: "Trade skills, financial literacy, mentoring, and peer-led training hubs." },
  ];

  return (
    <ParallaxProvider>
      <div className="min-h-screen" style={{ backgroundColor: BRAND.charcoal }}>
        {/* ================= NAVBAR ================= */}
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[86%]">
          <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-2xl shadow-lg px-4 md:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Leaders Building Legacies" className="w-9 h-9 object-contain" />
              <span className="text-white/90 font-semibold tracking-wide">Leaders Building Legacies</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-white/80 text-sm">
              <a href="#crisis" className="hover:text-white">Crisis</a>
              <a href="#vision" className="hover:text-white">Vision</a>
              <a href="#objectives" className="hover:text-white">Objectives</a>
              <a href="#programs" className="hover:text-white">Programs</a>
              <a href="#join" className="hover:text-white">Join</a>
            </nav>
            <a href="#join" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-xl shadow hover:opacity-95" style={{ background: grad.primary }}>
              Get Involved <ArrowRight size={16} />
            </a>
          </div>
        </header>

        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden">
          <ParallaxBanner
            layers={[
              { image: heroImage, speed: -15 },
              { children: <div className="absolute inset-0" style={{ backgroundImage: grad.warmOverlay }} />, speed: -5 },
            ]}
            className="h-[92vh]"
          >
            <div className="relative z-10 flex h-full items-center justify-center text-center">
              <div className="max-w-3xl mx-auto flex flex-col items-center">
                <motion.h1 className="text-white text-4xl md:text-6xl font-black leading-[1.05]" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
                  Leaders <span className="text-transparent bg-clip-text" style={{ backgroundImage: grad.primary }}>Building</span> Legacies
                </motion.h1>
                <motion.p className="mt-5 text-lg md:text-xl text-white/90 max-w-2xl" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                  A Faith-Based Initiative to Transform Men and Restore Communities.
                </motion.p>
                <motion.div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                  <a href="#join" className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-white font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.99] transition" style={{ background: grad.primary }}>
                    Join the Movement <ArrowRight size={18} />
                  </a>
                  <a href="#crisis" className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold text-white/90 backdrop-blur bg-white/10 border border-white/15 hover:bg-white/15">
                    Watch Intro <PlayCircle size={18} />
                  </a>
                </motion.div>
              </div>
            </div>
          </ParallaxBanner>
        </section>

        {/* ================= CRISIS ================= */}
        <section id="crisis" className="relative">
          <ParallaxBanner
            layers={[
              { image: "/images/city.jpg", speed: -20 },
              { children: <div className="absolute inset-0 bg-black/60" />, speed: -10 },
            ]}
            className="h-[70vh] md:h-[64vh]"
          >
            <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-4">
              <div className="max-w-4xl mx-auto flex flex-col items-center text-white">
                <p className="uppercase tracking-[0.25em] text-sm" style={{ color: BRAND.sage }}>The Reality</p>
                <h3 className="text-3xl md:text-5xl font-extrabold leading-tight">A Crisis That Demands Action</h3>
                <p className="mt-4 text-white/90 max-w-2xl">
                  Families are broken. Fathers are absent. Communities are struggling. South Africa faces a crisis that impacts men, families, and whole communities.
                </p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
                  {[{ label: "Children w/ father at home", value: 33, suffix: "%" },
                    { label: "Men in Cape Town gangs", value: 100, suffix: "k+" },
                    { label: "Offenders that are male", value: 90, suffix: "%" }].map(({ label, value, suffix }) => (
                    <motion.div key={label} className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur px-5 py-4" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                      <div className="text-3xl md:text-4xl font-extrabold"><CountUp end={value} duration={2} />{suffix}</div>
                      <div className="text-white/80 text-sm mt-1">{label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </ParallaxBanner>
        </section>

        {/* ================= VISION & MISSION ================= */}
        <section
          id="vision"
          className="relative py-24 text-center"
          style={{
            backgroundColor: "#0E0F0F",
            backgroundImage: "linear-gradient(180deg, rgba(194,91,0,0.15), rgba(112,130,56,0.1))",
          }}
        >
          <SectionTitle
            kicker="Who We Are"
            title="Vision & Mission"
            subtitle="Raising men who lead with purpose, live with integrity, and leave Kingdom-rooted legacies."
          />
          <div className="w-[92%] md:w-[80%] mx-auto grid md:grid-cols-2 gap-8 mt-16">
            {[{ title: "Our Vision", text: "A generation of men leading with purpose, integrity, and legacy grounded in Kingdom values.", icon: <Sparkles className="w-6 h-6" /> },
              { title: "Our Mission", text: "Transform men into Christ-centred leaders—protectors of the vulnerable—through leadership development, advocacy, education, mentorship, and service.", icon: <Shield className="w-6 h-6" /> }].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-10 rounded-3xl border border-white/10 backdrop-blur-lg shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] text-left"
                style={{ backgroundColor: "#111212" }}
              >
                <div className="flex items-center gap-3 mb-4 text-[#9AA863]">
                  {card.icon}
                  <span className="uppercase text-xs tracking-wider font-semibold">
                    {card.title.split(" ")[1]}
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">{card.title}</h4>
                <p className="text-white/85 leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= OBJECTIVES ================= */}
        <section id="objectives" className="py-20" style={{ backgroundColor: BRAND.charcoal }}>
          <SectionTitle kicker="What We Pursue" title="Core Objectives" subtitle="From restoring identity to mobilizing impact, we shape protectors, providers, and peacemakers." />
          <div className="w-[92%] md:w-[86%] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{ title: "Restoring Identity", icon: <Users />, text: "Helping men reclaim their God-given role in family and society." },
              { title: "Empowering Men & Boys", icon: <HeartHandshake />, text: "Forming protectors, providers, and peacemakers for the next generation." },
              { title: "Caring for the Vulnerable", icon: <Shield />, text: "Trauma-informed support for male victims and at-risk youth." },
              { title: "Equipping for Growth", icon: <Hammer />, text: "Life skills, mentorship, and economic development opportunities." },
              { title: "Championing Restoration", icon: <Landmark />, text: "Justice, accountability, and reintegration for formerly incarcerated men." },
              { title: "Mobilizing for Impact", icon: <Megaphone />, text: "Inspiring men to serve, advocate, and transform communities." }].map((o) => (
              <motion.div key={o.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-3xl p-6 border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] bg-[#111212]">
                <div className="flex items-center gap-3 mb-2" style={{ color: BRAND.sage }}>
                  <span className="p-2 rounded-xl bg-white/5 border border-white/10">{o.icon}</span>
                  <h4 className="text-white font-semibold">{o.title}</h4>
                </div>
                <p className="text-white/80">{o.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= PROGRAMS — ARROW NAV ================= */}
        <section id="programs" className="py-20 relative" style={{ backgroundColor: BRAND.charcoal }}>
          <SectionTitle kicker="How We Do It" title="Programs That Transform" subtitle="Healing, equipping, and mobilizing men and boys for lasting change." />

          {/* Carousel Container */}
          <div className="relative w-[92%] md:w-[86%] mx-auto">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-[#C25B00]/80 hover:bg-[#A34700]/90 text-white p-3 rounded-full shadow-lg z-20 backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Cards */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-hidden scroll-smooth"
            >
              {programs.map((card) => (
                <div
                  key={card.title}
                  className="min-w-[280px] sm:min-w-[360px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] flex-shrink-0"
                >
                  <div className="relative h-44">
                    <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                  <div className="p-6 text-white">
                    <h4 className="text-lg font-semibold">{card.title}</h4>
                    <p className="text-white/80 mt-2">{card.text}</p>
                    <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#C25B00] hover:text-[#9AA863] transition">
                      Read More <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-[#708238]/80 hover:bg-[#9AA863]/90 text-white p-3 rounded-full shadow-lg z-20 backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </section>

        {/* ================= JOIN ================= */}
        <section id="join" className="relative">
          <ParallaxBanner
            layers={[
              { image: heroImage, speed: -12 },
              { children: <div className="absolute inset-0" style={{ backgroundImage: grad.warmOverlay }} />, speed: -4 },
            ]}
            className="h-[56vh] md:h-[60vh]"
          >
            <div className="relative z-10 h-full w-[92%] md:w-[86%] mx-auto flex items-center justify-center text-center">
              <div className="max-w-3xl">
                <h3 className="text-white text-3xl md:text-5xl font-extrabold">Join the Movement</h3>
                <p className="mt-4 text-white/90">Stand with us to raise men who heal homes, rebuild communities, and lead generations.</p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-white font-semibold shadow-lg hover:scale-[1.02]" style={{ background: grad.primary }}>
                    Partner With Us <ArrowRight size={18} />
                  </a>
                  <a href="#programs" className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold text-white/90 backdrop-blur bg-white/10 border border-white/15 hover:bg-white/15">
                    Explore Programs
                  </a>
                </div>
              </div>
            </div>
          </ParallaxBanner>
        </section>

        {/* ================= FOOTER ================= */}
        <footer id="contact" className="relative text-white" style={{ backgroundColor: BRAND.charcoal }}>
          <div className="h-[2px] w-full" style={{ background: grad.footerBar }} />
          <div className="w-[92%] md:w-[86%] mx-auto py-12 grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3">
                <img src={logo} alt="LBL" className="w-10 h-10" />
                <h4 className="font-semibold">Leaders Building Legacies</h4>
              </div>
              <p className="mt-3 text-white/80 max-w-sm">Restoring Men, Rebuilding Legacies.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Contact</h5>
              <p className="text-white/80">
                Email:{" "}
                <a className="underline" href="mailto:mseptember@protonmail.com">
                  mseptember@protonmail.com
                </a>
              </p>
              <p className="text-white/80">Phone: 060 530 7742</p>
              <p className="text-white/60 text-sm mt-2">NPC: K2024232409</p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-1 text-white/80">
                <li>
                  <a href="#crisis" className="hover:text-white">
                    Crisis
                  </a>
                </li>
                <li>
                  <a href="#vision" className="hover:text-white">
                    Vision & Mission
                  </a>
                </li>
                <li>
                  <a href="#objectives" className="hover:text-white">
                    Objectives
                  </a>
                </li>
                <li>
                  <a href="#programs" className="hover:text-white">
                    Programs
                  </a>
                </li>
                <li>
                  <a href="#join" className="hover:text-white">
                    Join
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 py-5 text-center text-white/60 text-sm">
            © {new Date().getFullYear()} Leaders Building Legacies. All rights reserved.
          </div>
        </footer>
      </div>
    </ParallaxProvider>
  );
}
