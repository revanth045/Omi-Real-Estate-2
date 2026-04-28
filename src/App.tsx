import { useState, useRef, useMemo } from 'react'
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Home, MapPin, Phone, Mail, ArrowRight, Menu, X, Star, Shield, Zap, Globe2, Compass, Layers } from 'lucide-react'

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
  { id: 1, title: "Whispering Pines Estate", price: "$4.5M", loc: "Montana", acres: "1,200 Acres", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, title: "Azure Cove", price: "$3.2M", loc: "California", acres: "45 Acres", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" },
  { id: 3, title: "Silver Spur Ranch", price: "$5.8M", loc: "Texas", acres: "2,500 Acres", img: "https://images.unsplash.com/photo-1600585154340-be6199f7a096?auto=format&fit=crop&q=80&w=1000" },
  { id: 4, title: "Summit Peaks Lodge", price: "$2.1M", loc: "Colorado", acres: "120 Acres", img: "https://images.unsplash.com/photo-1600607687940-4e524cb35d03?auto=format&fit=crop&q=80&w=1000" },
  { id: 5, title: "Red Rock Reserve", price: "$6.4M", loc: "Arizona", acres: "320 Acres", img: "https://images.unsplash.com/photo-1600566753190-17f0bcd2a6c4?auto=format&fit=crop&q=80&w=1000" },
  { id: 6, title: "Coral Reef Estate", price: "$7.9M", loc: "Florida", acres: "12 Acres", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000" },
  { id: 7, title: "Grand Teton Range", price: "$12.5M", loc: "Wyoming", acres: "4,500 Acres", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" },
  { id: 8, title: "Coastal Mist Retreat", price: "$2.8M", loc: "Oregon", acres: "85 Acres", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000" },
  { id: 9, title: "Sandstone Villa", price: "$3.9M", loc: "Utah", acres: "210 Acres", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000" },
  { id: 10, title: "Adobe Sun Manor", price: "$1.7M", loc: "New Mexico", acres: "150 Acres", img: "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1000" },
  { id: 11, title: "Emerald Island", price: "$8.2M", loc: "Washington", acres: "60 Acres", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1000" },
  { id: 12, title: "Sapphire Lake Point", price: "$5.1M", loc: "Idaho", acres: "400 Acres", img: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1000" },
];

// --- Components ---

const RevealText = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

const ScaleIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
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
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setRotate({ x: -y, y: x });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={className}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="relative min-h-screen font-sans selection:bg-secondary selection:text-white">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-secondary z-[100] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-sm border-b border-primary/5">
        <div className="container mx-auto px-8 py-6 flex justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <span className="text-2xl font-serif font-bold tracking-tighter text-primary">OMI</span>
            <div className="h-4 w-px bg-primary/20" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-primary/60 font-bold">Heritage Land</span>
          </motion.div>

          <div className="hidden md:flex gap-12 text-[11px] uppercase tracking-[0.2em] font-bold text-primary/60">
            {['Portfolio', 'Method', 'Global', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-secondary transition-colors duration-300">{item}</a>
            ))}
          </div>

          <button className="px-6 py-2 border border-primary/10 text-[10px] uppercase tracking-widest font-bold hover:bg-primary hover:text-white transition-all duration-500">
            Enquire
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover" 
          />
        </motion.div>

        <div className="container mx-auto px-8 relative z-20 text-white text-center">
          <RevealText>
            <p className="text-secondary uppercase tracking-[0.5em] text-xs font-bold mb-8">Est. 1984 — Luxury Brokerage</p>
          </RevealText>
          <RevealText>
            <h1 className="text-6xl md:text-[120px] font-serif font-bold leading-none mb-12">
              Legacy <span className="italic font-light">Land.</span>
            </h1>
          </RevealText>
          <ScaleIn delay={0.5}>
            <p className="text-white/70 max-w-xl mx-auto text-lg font-light leading-relaxed mb-12">
              Curating the most significant acreage in the American West for over four decades.
            </p>
          </ScaleIn>
          <ScaleIn delay={0.7}>
            <div className="flex justify-center gap-8">
              <a href="#portfolio" className="group flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold">
                View Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </ScaleIn>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white/30"
        >
          <div className="w-px h-20 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
        </motion.div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <p className="text-secondary uppercase tracking-[0.3em] text-[10px] font-bold mb-4">Current Collection</p>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary">Significant Parcels.</h2>
            </div>
            <p className="text-primary/50 text-sm max-w-sm pb-2 border-b border-primary/10">
              Each property in our portfolio represents a unique stewardship opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {LISTINGS.map((listing, i) => (
              <ScaleIn key={listing.id} delay={i * 0.05}>
                <MagneticCard className="group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden mb-8">
                    <img 
                      src={listing.img} 
                      alt={listing.title} 
                      className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <p className="text-[10px] uppercase tracking-widest mb-1">{listing.acres}</p>
                      <p className="text-xl font-serif">{listing.price}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-primary mb-1">{listing.title}</h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40 font-bold">{listing.loc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                  </div>
                </MagneticCard>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* The Method Section */}
      <section id="method" className="py-32 bg-primary text-white overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <ScaleIn>
              <div className="relative">
                <div className="absolute -top-12 -left-12 w-64 h-64 border border-white/5 rounded-full" />
                <img 
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000" 
                  className="relative z-10 w-full aspect-square object-cover grayscale opacity-60" 
                />
              </div>
            </ScaleIn>
            
            <div>
              <p className="text-secondary uppercase tracking-[0.3em] text-[10px] font-bold mb-6">The Approach</p>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-12 leading-tight">Expertise in<br /><span className="italic font-light">Acquisition.</span></h2>
              <div className="space-y-12">
                {[
                  { step: "01", title: "Site Analysis", desc: "Exhaustive review of water rights, mineral rights, and conservation potential." },
                  { step: "02", title: "Targeted Search", desc: "Accessing off-market inventory through a multi-generational network." },
                  { step: "03", title: "Strategic Terms", desc: "Negotiation focused on long-term legacy and preservation." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-10 group">
                    <span className="text-secondary font-serif text-3xl opacity-30 group-hover:opacity-100 transition-opacity duration-500">{item.step}</span>
                    <div>
                      <h3 className="text-xl font-serif font-bold mb-3">{item.title}</h3>
                      <p className="text-white/50 text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section id="global" className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <Globe2 className="w-[120%] h-[120%] absolute -top-1/4 -right-1/4 text-primary stroke-[0.5]" />
        </div>
        <div className="container mx-auto px-8 relative z-10 text-center">
          <ScaleIn>
            <p className="text-secondary uppercase tracking-[0.3em] text-[10px] font-bold mb-6">Global Reach</p>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-primary mb-12">A Global Network.</h2>
            <p className="text-primary/50 max-w-2xl mx-auto text-lg font-light leading-relaxed mb-20">
              Connecting significant land holdings with serious stewards across 14 countries.
            </p>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: <Compass />, value: "2,500+", label: "Active Investors" },
                { icon: <Globe2 />, value: "85", label: "Partner Brokerages" },
                { icon: <Layers />, value: "14", label: "Countries Present" },
              ].map((stat, i) => (
                <div key={stat.label} className="p-12 bg-white border border-primary/5 shadow-sm">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                    {stat.icon}
                  </div>
                  <p className="text-4xl font-serif font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40 font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto bg-primary p-16 md:p-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Mail className="w-64 h-64 text-white" />
            </div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 italic">Ready to Find Your Land?</h2>
              <p className="text-white/50 text-lg mb-16 max-w-xl mx-auto font-light">
                Whether you're acquiring a generational estate or divesting acreage, let's discuss your vision.
              </p>
              <div className="flex flex-col md:flex-row gap-8 justify-center">
                <button className="px-12 py-5 bg-secondary text-primary font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-colors duration-500">
                  Request a Consultation
                </button>
                <div className="flex items-center gap-6 justify-center">
                  <div className="text-left">
                    <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold mb-1">Direct Line</p>
                    <p className="text-white font-serif font-bold text-xl">+1 (406) 555-0198</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-primary/5 bg-background">
        <div className="container mx-auto px-8 text-center">
          <span className="text-3xl font-serif font-bold text-primary mb-12 block">OMI</span>
          <div className="flex flex-wrap justify-center gap-12 text-[10px] uppercase tracking-[0.3em] font-bold text-primary/40 mb-16">
            {['Instagram', 'LinkedIn', 'Twitter', 'YouTube'].map((i) => <p key={i} className="hover:text-secondary cursor-pointer transition-colors">{i}</p>)}
          </div>
          <p className="text-[10px] uppercase tracking-widest text-primary/20 font-bold">
            © 2024 OMI REAL ESTATE HERITAGE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  )
}
