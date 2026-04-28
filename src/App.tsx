import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Home, MapPin, Phone, Mail, ArrowRight, Menu, X, Star, Shield, Zap } from 'lucide-react'

// --- Types ---
interface Listing {
  id: number;
  title: string;
  price: string;
  loc: string;
  img: string;
  color: string;
}

// --- Data ---
const LISTINGS: Listing[] = [
  { id: 1, title: "Neon Horizon Villa", price: "$4.5M", loc: "Malibu, CA", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000", color: "#4F46E5" },
  { id: 2, title: "Prism Peaks Estate", price: "$3.2M", loc: "Aspen, CO", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000", color: "#EC4899" },
  { id: 3, title: "Golden Sands Manor", price: "$5.8M", loc: "Miami, FL", img: "https://images.unsplash.com/photo-1600585154340-be6199f7a096?auto=format&fit=crop&q=80&w=1000", color: "#F59E0B" },
  { id: 4, title: "Cyber Sunset Loft", price: "$2.1M", loc: "Austin, TX", img: "https://images.unsplash.com/photo-1600607687940-4e524cb35d03?auto=format&fit=crop&q=80&w=1000", color: "#10B981" },
  { id: 5, title: "Electric Emerald Ranch", price: "$6.4M", loc: "Bozeman, MT", img: "https://images.unsplash.com/photo-1600566753190-17f0bcd2a6c4?auto=format&fit=crop&q=80&w=1000", color: "#6366F1" },
  { id: 6, title: "Indigo Isle Retreat", price: "$7.9M", loc: "Orcas Island, WA", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000", color: "#8B5CF6" },
];

// --- Components ---

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const FloatingOrb = ({ color, size, delay }: { color: string, size: string, delay: number }) => (
  <motion.div
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className={`absolute blur-3xl opacity-20 rounded-full`}
    style={{ backgroundColor: color, width: size, height: size }}
  />
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg" />
            <span className="gradient-text">OMI</span>
          </motion.div>

          <div className="hidden md:flex gap-8 text-sm font-medium">
            {['Properties', 'About', 'Experience', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors">{item}</a>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <FloatingOrb color="#4F46E5" size="400px" delay={0} />
        <div className="absolute top-1/4 -right-20">
          <FloatingOrb color="#EC4899" size="300px" delay={1} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-secondary mb-6"
            >
              FUTURE OF REAL ESTATE
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1]"
            >
              Digital Scenery,<br />
              <span className="gradient-text">Physical Legacy.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Omi redefines the landscape of luxury land acquisition through immersive experiences and colorful innovation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="px-8 py-4 bg-primary rounded-full font-bold hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all flex items-center justify-center gap-2">
                Explore Properties <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all">
                Our Story
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Assets Managed", value: "$2.4B+" },
              { label: "States Covered", value: "12" },
              { label: "Exclusive Listings", value: "85" },
              { label: "Happy Clients", value: "1.2k" },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest text-foreground/40 mt-2">{stat.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section id="properties" className="py-28">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Curated Collection</h2>
              <p className="text-foreground/50">Exceptional land for exceptional visionaries.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {LISTINGS.map((listing, i) => (
              <FadeUp key={listing.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="glass-card overflow-hidden group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={listing.img} 
                      alt={listing.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold">
                      {listing.loc}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{listing.title}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold gradient-text">{listing.price}</p>
                      <button className="p-3 bg-white/5 rounded-full hover:bg-primary transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-28 relative overflow-hidden">
        <div className="absolute bottom-0 left-0">
          <FloatingOrb color="#F59E0B" size="400px" delay={2} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-square">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full"
              />
              <div className="absolute inset-4 overflow-hidden rounded-full border-8 border-white/5 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" />
              </div>
            </div>
            
            <FadeUp>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Interactive<br /><span className="gradient-text">Excellence.</span></h2>
              <div className="space-y-8">
                {[
                  { icon: <Zap className="text-primary" />, title: "Instant Access", desc: "View detailed site reports and environmental data in real-time." },
                  { icon: <Shield className="text-secondary" />, title: "Secure Transactions", desc: "Proprietary digital landscape verification and title guarantee." },
                  { icon: <Star className="text-accent" />, title: "Premium Network", desc: "Direct connection to off-market legacy parcels globally." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-6">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-foreground/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <div className="glass-card p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute -top-10 -left-10 opacity-20">
              <FloatingOrb color="#4F46E5" size="200px" delay={0} />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay Colorful.</h2>
              <p className="text-foreground/50 mb-10 max-w-xl mx-auto">Join 5,000+ visionaries receiving weekly insights on high-yield luxury land and off-market opportunities.</p>
              <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:border-primary transition-colors"
                />
                <button className="px-8 py-4 bg-primary rounded-full font-bold hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg" />
                <span className="gradient-text">OMI</span>
              </div>
              <p className="text-foreground/40 max-w-xs leading-relaxed">
                Building a more colorful and transparent future for luxury real estate acquisition.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Navigation</h4>
              <div className="space-y-4 text-foreground/40">
                {['Home', 'Listings', 'Services', 'Contact'].map((i) => <p key={i} className="hover:text-primary cursor-pointer">{i}</p>)}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Connect</h4>
              <div className="space-y-4 text-foreground/40">
                {['Instagram', 'LinkedIn', 'Twitter', 'YouTube'].map((i) => <p key={i} className="hover:text-primary cursor-pointer">{i}</p>)}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-foreground/20">
            <p>© 2024 OMI REAL ESTATE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
