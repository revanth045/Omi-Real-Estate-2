import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X, Globe2, Compass, Layers, Phone, Mail, Instagram, Linkedin, Twitter, CheckCircle2, ChevronRight } from 'lucide-react'

// --- Types ---
interface Listing {
  id: number;
  title: string;
  price: string;
  loc: string;
  img: string;
  category: string;
  sqft: string;
}

// --- Data ---
const LISTINGS: Listing[] = [
  { id: 1, title: "Royal Heritage Villas", price: "$4.5M", loc: "Malibu, CA", sqft: "5,400 sqft", category: "Villas", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200" },
  { id: 2, title: "Emerald Farm Lands", price: "$1.2M", loc: "Bozeman, MT", sqft: "12 Acres", category: "Farmlands", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" },
  { id: 3, title: "Skyline Plotting", price: "$800k", loc: "Austin, TX", sqft: "2,500 sqft", category: "Plots", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" },
  { id: 4, title: "Golden Gate Estate", price: "$7.8M", loc: "San Francisco, CA", sqft: "8,200 sqft", category: "Villas", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1200" },
  { id: 5, title: "Sedona Red Rock Estate", price: "$2.1M", loc: "Arizona, USA", sqft: "50 Acres", category: "Farmlands", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" },
  { id: 6, title: "Metropolis Plots", price: "$1.5M", loc: "Seattle, WA", sqft: "4,000 sqft", category: "Plots", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200" },
  { id: 7, title: "Aspen Peak Retreat", price: "$6.2M", loc: "Aspen, CO", sqft: "6,500 sqft", category: "Villas", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200" },
  { id: 8, title: "Savannah Green Fields", price: "$1.8M", loc: "Savannah, GA", sqft: "25 Acres", category: "Farmlands", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" },
  { id: 9, title: "Coastal Driftwood Plot", price: "$950k", loc: "Cannon Beach, OR", sqft: "3,200 sqft", category: "Plots", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200" },
];

const CATEGORIES = ["All", "Villas", "Farmlands", "Plots"];

const METRICS = [
  { label: "Ensured Quality", value: 98 },
  { label: "Client Contentedness", value: 95 },
  { label: "Project Timelines", value: 92 },
  { label: "Legal Compliance", value: 100 },
];

const TESTIMONIALS = [
  { id: 1, name: "Alexander Sterling", role: "Legacy Partner", content: "Omi's discretion and data-driven approach to land acquisition is unparalleled. They found us a parcel that wasn't even on the market.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" },
  { id: 2, name: "Elena Rodriguez", role: "Estate Owner", content: "The transition from vision to heritage was seamless. Omi understands that we aren't just buying land; we are securing a legacy.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" },
  { id: 3, name: "Marcus Chen", role: "Investment Steward", content: "Professionalism meets deep-rooted heritage. Their mapping technology saved us months of site analysis.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" },
];

const ONGOING_PROJECTS = [
  { id: 1, title: "Veridian Enclave", status: "Groundbreaking", completion: "Q4 2025", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" },
  { id: 2, title: "Azure Heights", status: "Structural Phase", completion: "Q2 2026", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200" },
  { id: 3, title: "Marble Arch Villas", status: "Interior Finishing", completion: "Q3 2024", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200" },
];

const FAQS = [
  { id: 1, q: "How do you source off-market properties?", a: "We utilize a proprietary network of multi-generational land owners and advanced mapping data to identify properties before they reach the public market." },
  { id: 2, q: "Are water and mineral rights included?", a: "Site-specific analysis of water and mineral rights is a core part of our due diligence process for every acquisition." },
  { id: 3, q: "What is the typical acquisition timeline?", a: "Timelines vary by parcel complexity, but typically range from 45 to 90 days for full legal and environmental verification." },
  { id: 4, q: "Do you offer custom villa development?", a: "Yes, we partner with premier architects to provide bespoke design-build services for our land stewardship clients." },
];

// --- Components ---

const ProgressBar = ({ label, value }: { label: string, value: number }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-widest text-primary/60">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-[2px] bg-primary/10 w-full overflow-hidden">
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: value / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-primary origin-left"
        />
      </div>
    </div>
  );
};

const FAQItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-primary/10 py-6">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left group">
        <span className="text-lg font-serif font-bold text-primary group-hover:text-secondary transition-colors">{q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-secondary">
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-primary/60 text-sm leading-relaxed max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ScaleIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const filteredListings = LISTINGS.filter(l => activeCategory === "All" || l.category === activeCategory);

  return (
    <div className="relative min-h-screen font-sans bg-white text-foreground">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-secondary z-[100] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-primary/5">
        <div className="container mx-auto px-10 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-serif font-bold tracking-tighter text-primary">OMI</span>
            <div className="h-6 w-px bg-primary/10 hidden md:block" />
            <div className="hidden md:flex flex-col">
              <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-primary/40 leading-none">Luxury Heritage</span>
              <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-secondary leading-none mt-1">Properties</span>
            </div>
          </div>

          <div className="hidden lg:flex gap-12 items-center">
            {['Home', 'Portfolio', 'Global', 'Contact'].map((item) => (
              <a key={item} href={`#${item === 'Contact' ? 'inquiry' : item.toLowerCase()}`} className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary/60 hover:text-secondary transition-colors">
                {item}
              </a>
            ))}
            <button className="px-8 py-3 bg-primary text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-secondary transition-all">
              Book Visit
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white pt-32 px-10 md:hidden"
          >
            {['Home', 'Portfolio', 'Global', 'Contact'].map((item) => (
              <a key={item} href={`#${item === 'Contact' ? 'inquiry' : item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="block text-3xl font-serif mb-8 text-primary border-b border-primary/5 pb-4">{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=2400" 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="container mx-auto px-10 relative z-20 text-white">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-line" />
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Discover Your Dream Space</p>
            </div>
            <h1 className="text-6xl md:text-[100px] font-serif font-bold leading-none mb-10">
              Redefining <br />
              <span className="italic font-light">Excellence.</span>
            </h1>
            <p className="text-white/80 max-w-xl text-lg font-light leading-relaxed mb-12">
              Bespoke villas, lush farmlands, and premium plots curated for those who seek the extraordinary.
            </p>
            <div className="flex gap-8">
              <button className="px-10 py-4 bg-secondary text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-primary transition-all">
                View Projects
              </button>
              <button className="px-10 py-4 border border-white/30 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                Contact Us
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats/Quality Metrics */}
      <section id="metrics" className="py-24 bg-accent">
        <div className="container mx-auto px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <Reveal>
                <div className="gold-line mb-6" />
                <h2 className="text-4xl font-serif font-bold text-primary mb-8 leading-tight">Our Quality Benchmarks</h2>
                <p className="text-primary/60 text-sm leading-relaxed mb-12">
                  At Omi, we don't just build; we craft legacies. Every square foot is measured against the highest global standards of quality and legal transparency.
                </p>
                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <p className="text-4xl font-serif font-bold text-secondary mb-1">12+</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Years Experience</p>
                  </div>
                  <div>
                    <p className="text-4xl font-serif font-bold text-secondary mb-1">500+</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Clients Served</p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="bg-white p-12 shadow-xl border border-primary/5">
              {METRICS.map((m) => (
                <ProgressBar key={m.label} label={m.label} value={m.value} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="py-32 bg-[#252A25] text-white overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="flex justify-between items-end mb-20">
            <Reveal>
              <p className="text-secondary uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Future Living</p>
              <h2 className="text-4xl md:text-6xl font-serif font-bold">Ongoing <br /><span className="italic font-light">Developments.</span></h2>
            </Reveal>
            <button className="hidden md:block px-8 py-3 border border-white/20 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-primary transition-all">
              Join Waitlist
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ONGOING_PROJECTS.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden mb-6">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  <div className="absolute top-4 left-4 bg-secondary px-3 py-1 text-[8px] uppercase tracking-widest font-bold">
                    {project.status}
                  </div>
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">{project.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Estimated Completion: {project.completion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Explorer (Tabbed) */}
      <section id="portfolio" className="py-32">
        <div className="container mx-auto px-10">
          <div className="text-center mb-20">
            <Reveal>
              <p className="text-secondary uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Our Projects</p>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-12">Explore the Collection</h2>
              <div className="flex justify-center flex-wrap gap-8">
                {CATEGORIES.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b-2 transition-all ${activeCategory === cat ? 'border-secondary text-secondary' : 'border-transparent text-primary/40 hover:text-primary'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="wait">
              {filteredListings.map((listing, i) => (
                <motion.div
                  key={listing.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="group"
                >
                  <div className="arch-container aspect-[4/5] mb-8 shadow-2xl">
                    <img 
                      src={listing.img} 
                      alt={listing.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <button className="px-6 py-3 bg-white text-primary text-[9px] uppercase tracking-widest font-bold translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-primary mb-1">{listing.title}</h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40 font-bold">{listing.loc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-serif font-bold text-secondary mb-1">{listing.price}</p>
                      <p className="text-[9px] uppercase tracking-widest text-primary/30">{listing.sqft}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Global & Expertise */}
      <section id="global" className="py-32 bg-accent/50 text-primary overflow-hidden relative">
        <div className="container mx-auto px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1 relative aspect-square">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-primary/5 rounded-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover rounded-full scale-95" 
              />
            </div>
            <div className="order-1 lg:order-2">
              <Reveal>
                <div className="gold-line mb-10" />
                <h2 className="text-4xl md:text-7xl font-serif font-bold mb-14 leading-none text-primary">Global <br /><span className="italic font-light">Reach.</span></h2>
                <div className="space-y-12">
                  {[
                    { icon: <CheckCircle2 className="text-secondary" />, title: "Transparency", desc: "Every project is legally verified and titles are 100% clear." },
                    { icon: <Globe2 className="text-secondary" />, title: "Market Intelligence", desc: "Direct access to premium plots in emerging high-growth corridors." },
                    { icon: <Layers className="text-secondary" />, title: "Custom Development", desc: "Collaborative design approach for bespoke villa projects." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-8">
                      <div className="flex-shrink-0 mt-1">{item.icon}</div>
                      <div>
                        <h3 className="text-xl font-serif font-bold mb-2">{item.title}</h3>
                        <p className="text-primary/50 text-sm font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="inquiry" className="py-32 bg-white">
        <div className="container mx-auto px-10">
          <div className="max-w-6xl mx-auto bg-accent p-12 md:p-20 shadow-2xl border border-primary/5">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <Reveal>
                  <p className="text-secondary uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Get In Touch</p>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-10">Start Your <br />Legacy.</h2>
                  <p className="text-primary/60 text-sm leading-relaxed mb-12">
                    Our stewardship advisors are ready to help you find the perfect parcel or villa for your future. Fill out the form and we will reach out within 24 hours.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest font-bold text-primary/40">Direct Line</p>
                        <p className="font-bold text-primary">+1 (406) 555-0198</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest font-bold text-primary/40">Email Inquiry</p>
                        <p className="font-bold text-primary">heritage@omi.com</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Full Name</label>
                    <input type="text" className="w-full bg-white border-b border-primary/20 py-3 px-4 focus:outline-none focus:border-secondary transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Email Address</label>
                    <input type="email" className="w-full bg-white border-b border-primary/20 py-3 px-4 focus:outline-none focus:border-secondary transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Property Interest</label>
                  <select className="w-full bg-white border-b border-primary/20 py-3 px-4 focus:outline-none focus:border-secondary transition-colors appearance-none">
                    <option>Villas</option>
                    <option>Farmlands</option>
                    <option>Plots</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Your Message</label>
                  <textarea rows={4} className="w-full bg-white border-b border-primary/20 py-3 px-4 focus:outline-none focus:border-secondary transition-colors" placeholder="Tell us about your requirements..."></textarea>
                </div>
                <button className="w-full py-5 bg-primary text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-secondary transition-all">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-10">
          <div className="text-center mb-20">
            <Reveal>
              <p className="text-secondary uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Testimonials</p>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary">Voices of Stewardship</h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((t, i) => (
              <ScaleIn key={t.id} delay={i * 0.1}>
                <div className="p-12 border border-primary/5 bg-accent/20 relative">
                  <div className="absolute -top-6 left-12 w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-primary/70 italic text-sm leading-relaxed mb-8 pt-4">"{t.content}"</p>
                  <div>
                    <p className="font-serif font-bold text-primary">{t.name}</p>
                    <p className="text-[9px] uppercase tracking-widest font-bold text-secondary">{t.role}</p>
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-accent">
        <div className="container mx-auto px-10">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-secondary uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Inquiries</p>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-8">Frequently <br />Asked.</h2>
                <p className="text-primary/60 text-sm leading-relaxed">
                  Clear answers for significant land stewardship. If you have specific questions, please reach out to our team.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              {FAQS.map((faq) => (
                <FAQItem key={faq.id} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-32 border-t border-primary/5 bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-10">
          <div className="grid md:grid-cols-4 gap-20 mb-20">
            <div className="col-span-2">
              <span className="text-3xl font-serif font-bold text-white mb-8 block">OMI</span>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-10">
                Crafting luxury spaces and heritage farmlands for the modern steward. Professionalism meets vision.
              </p>
              <div className="flex gap-6 text-white/30">
                <Instagram className="w-5 h-5 text-primary/30 hover:text-secondary cursor-pointer" />
                <Linkedin className="w-5 h-5 text-primary/30 hover:text-secondary cursor-pointer" />
                <Twitter className="w-5 h-5 text-primary/30 hover:text-secondary cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white mb-10">Links</h4>
              <div className="space-y-4 text-xs font-bold text-white/50">
                <p className="hover:text-secondary cursor-pointer transition-colors">Villas</p>
                <p className="hover:text-secondary cursor-pointer transition-colors">Plots</p>
                <p className="hover:text-secondary cursor-pointer transition-colors">Farmlands</p>
                <p className="hover:text-secondary cursor-pointer transition-colors">Privacy Policy</p>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white mb-10">Contact</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-bold text-white/80">+1 (406) 555-0198</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-bold text-white/80">inquiry@omirealestate.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">
              © 2024 OMI REAL ESTATE HERITAGE. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
