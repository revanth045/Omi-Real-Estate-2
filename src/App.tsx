import React, { useState, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X, Globe2, Compass, Layers, Mail, Search, Map } from 'lucide-react'

// --- Types ---
interface Listing {
  id: number;
  title: string;
  price: string;
  loc: string;
  img: string;
  acres: string;
}

// --- Data ---
const LISTINGS: Listing[] = [
  { id: 1, title: "Summit View Estate", price: "$4.5M", loc: "Montana", acres: "1,200 Acres", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" },
  { id: 2, title: "Azure Shoreline", price: "$3.2M", loc: "California", acres: "45 Acres", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" },
  { id: 3, title: "Lonestar Territory", price: "$5.8M", loc: "Texas", acres: "2,500 Acres", img: "https://images.unsplash.com/photo-1600585154340-be6199f7a096?auto=format&fit=crop&q=80&w=1200" },
  { id: 4, title: "Rocky Peak Lodge", price: "$2.1M", loc: "Colorado", acres: "120 Acres", img: "https://images.unsplash.com/photo-1600607687940-4e524cb35d03?auto=format&fit=crop&q=80&w=1200" },
  { id: 5, title: "Canyon Ridge", price: "$6.4M", loc: "Arizona", acres: "320 Acres", img: "https://images.unsplash.com/photo-1600566753190-17f0bcd2a6c4?auto=format&fit=crop&q=80&w=1200" },
  { id: 6, title: "Ocean Breeze Manor", price: "$7.9M", loc: "Florida", acres: "12 Acres", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200" },
  { id: 7, title: "Teton Wilderness", price: "$12.5M", loc: "Wyoming", acres: "4,500 Acres", img: "https://images.unsplash.com/photo-1449156001446-d419672010ba?auto=format&fit=crop&q=80&w=1200" },
  { id: 8, title: "Pacific Coastline", price: "$2.8M", loc: "Oregon", acres: "85 Acres", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200" },
  { id: 9, title: "Monument Valley Ranch", price: "$3.9M", loc: "Utah", acres: "210 Acres", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200" },
  { id: 10, title: "Desert Sun Retreat", price: "$1.7M", loc: "New Mexico", acres: "150 Acres", img: "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200" },
  { id: 11, title: "Olympic Rain Forest", price: "$8.2M", loc: "Washington", acres: "60 Acres", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1200" },
  { id: 12, title: "Lake Coeur d'Alene", price: "$5.1M", loc: "Idaho", acres: "400 Acres", img: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1200" },
];

// --- Components ---

const RevealText = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

const ScaleIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const MagneticCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setRotate({ x: -y, y: x });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 120, damping: 25 }}
      className={className}
      style={{ perspective: 1500 }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  return (
    <div className="relative min-h-screen font-sans selection:bg-secondary selection:text-white bg-background text-primary">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-secondary z-[100] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-primary/5">
        <div className="container mx-auto px-10 py-8 flex justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 cursor-pointer">
            <span className="text-3xl font-serif font-bold tracking-tighter">OMI</span>
            <div className="h-5 w-px bg-primary/20" />
            <span className="text-[9px] uppercase tracking-[0.5em] opacity-40 font-bold">Land Heritage</span>
          </motion.div>

          <div className="hidden md:flex gap-16 text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">
            {['The Portfolio', 'Our Method', 'Global Reach', 'Connect'].map((item) => (
              <a key={item} href={`#${item.split(' ').pop()?.toLowerCase()}`} className="hover:text-secondary transition-colors duration-300">{item}</a>
            ))}
          </div>

          <button className="hidden md:block text-[10px] uppercase tracking-widest font-bold border-b border-primary/20 pb-1 hover:border-secondary hover:text-secondary transition-all">
            Private Access
          </button>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-32 px-10 md:hidden"
          >
            {['Portfolio', 'Method', 'Global', 'Connect'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="block text-4xl font-serif mb-8">{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-10">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/30 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2400" 
            className="w-full h-full object-cover" 
          />
        </motion.div>

        <div className="container mx-auto relative z-20 text-white text-center">
          <RevealText>
            <p className="text-secondary uppercase tracking-[0.6em] text-[10px] font-bold mb-10">Generational Stewardship</p>
          </RevealText>
          <RevealText>
            <h1 className="text-7xl md:text-[140px] font-serif font-bold leading-[0.9] mb-14">
              Quiet <span className="italic font-light">Legacy.</span>
            </h1>
          </RevealText>
          <ScaleIn delay={0.6}>
            <p className="text-white/80 max-w-xl mx-auto text-xl font-light leading-relaxed mb-16">
              Securing the most pristine acreage in the American West through discretion and unrivaled data.
            </p>
          </ScaleIn>
          <ScaleIn delay={0.8}>
            <div className="flex justify-center gap-12">
              <a href="#portfolio" className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-bold border-b border-white/20 pb-2 hover:border-secondary transition-all">
                The Collection <ArrowRight className="w-3 h-3 group-hover:translate-x-3 transition-transform" />
              </a>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-40 bg-background">
        <div className="container mx-auto px-10">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-7">
              <ScaleIn>
                <h2 className="text-4xl md:text-7xl font-serif font-bold leading-tight mb-12">
                  The intersection of <br />
                  <span className="text-secondary italic">heritage</span> and data.
                </h2>
                <p className="text-primary/60 text-lg font-light leading-relaxed max-w-2xl">
                  Omi is not a brokerage; it is a legacy partner. We utilize proprietary mapping technology and a multi-generational network to identify land that never reaches the open market.
                </p>
              </ScaleIn>
            </div>
            <div className="lg:col-span-5">
              <ScaleIn delay={0.2}>
                <div className="aspect-[4/5] bg-primary/5 p-12 flex flex-col justify-center">
                  <p className="text-secondary text-5xl font-serif mb-6 italic">40+</p>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-40 mb-10">Years of Stewardship</p>
                  <p className="text-sm leading-relaxed opacity-60 italic font-light">
                    "Land is the only thing in the world that amounts to anything, for it's the only thing in this world that lasts."
                  </p>
                </div>
              </ScaleIn>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-32 border-t border-primary/5">
        <div className="container mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
            <div className="max-w-3xl">
              <p className="text-secondary uppercase tracking-[0.4em] text-[10px] font-bold mb-6">Current Inventory</p>
              <h2 className="text-4xl md:text-8xl font-serif font-bold">The Parcels.</h2>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Search className="w-4 h-4" /></button>
              <button className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Map className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-16">
            {LISTINGS.map((listing, i) => (
              <ScaleIn key={listing.id} delay={i * 0.05}>
                <MagneticCard className="group cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden mb-10 bg-primary/5">
                    <img 
                      src={listing.img} 
                      alt={listing.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-secondary text-[9px] uppercase tracking-widest font-bold mb-2">{listing.loc}</p>
                      <h3 className="text-2xl font-serif font-bold mb-1">{listing.title}</h3>
                      <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{listing.acres}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-serif text-secondary mb-1">{listing.price}</p>
                      <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
                    </div>
                  </div>
                </MagneticCard>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section id="global" className="py-40 bg-primary text-white">
        <div className="container mx-auto px-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <ScaleIn>
              <p className="text-secondary uppercase tracking-[0.4em] text-[10px] font-bold mb-10">World Influence</p>
              <h2 className="text-4xl md:text-8xl font-serif font-bold mb-14 leading-none">Global <br /><span className="italic font-light">Presence.</span></h2>
              <div className="grid grid-cols-2 gap-16">
                {[
                  { icon: <Globe2 />, value: "14", label: "Countries" },
                  { icon: <Compass />, value: "2.4B", label: "Managed Assets" },
                  { icon: <Layers />, value: "85", label: "Network Sites" },
                  { icon: <Map />, value: "12", label: "U.S. States" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-secondary mb-4">{stat.icon}</div>
                    <p className="text-5xl font-serif mb-2">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScaleIn>
            <div className="relative aspect-square">
              <div className="absolute inset-0 border border-white/5 rounded-full animate-pulse" />
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-40 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-40">
        <div className="container mx-auto px-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScaleIn>
              <h2 className="text-4xl md:text-8xl font-serif font-bold mb-14 leading-none italic">Let's Talk <br />Heritage.</h2>
              <p className="text-primary/50 text-xl font-light mb-20 max-w-xl mx-auto leading-relaxed">
                We are currently accepting new stewardship partners for the 2024 season.
              </p>
              <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
                <button className="px-16 py-6 bg-primary text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-secondary transition-all duration-700">
                  Submit Inquiry
                </button>
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-widest opacity-40 font-bold mb-2">Heritage Hotline</p>
                  <p className="text-2xl font-serif font-bold">+1 (406) 555-0198</p>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-primary/5">
        <div className="container mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-2xl font-serif font-bold">OMI</div>
          <div className="flex gap-16 text-[9px] uppercase tracking-[0.3em] font-bold opacity-40">
            {['Instagram', 'LinkedIn', 'Twitter'].map((i) => <p key={i} className="hover:text-secondary cursor-pointer transition-all">{i}</p>)}
          </div>
          <p className="text-[9px] uppercase tracking-widest opacity-20 font-bold">
            © 2024 OMI LAND HERITAGE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  )
}
