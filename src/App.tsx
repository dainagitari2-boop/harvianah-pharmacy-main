/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Pill, 
  Heart, 
  Brain, 
  Instagram, 
  Video, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  Clock,
  ArrowRight,
  User,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, PRODUCTS, Product } from './types';

// --- Components ---

const Navbar = ({ cartCount }: { cartCount: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white">
            <Pill size={20} />
          </div>
          <span className={`text-xl font-serif font-bold tracking-tight ${isScrolled ? 'text-emerald-900' : 'text-emerald-900'}`}>
            Harvianah
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-900/80">
          <a href="#shop" className="hover:text-emerald-600 transition-colors">Shop</a>
          <a href="#expertise" className="hover:text-emerald-600 transition-colors">Expertise</a>
          <a href="#consultations" className="hover:text-emerald-600 transition-colors">Consultations</a>
          <a href="#wellness-hub" className="hover:text-emerald-600 transition-colors">Wellness Hub</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-emerald-900 hover:bg-emerald-50 rounded-full transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 text-emerald-900 hover:bg-emerald-50 rounded-full transition-colors relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 text-white text-[10px] flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="md:hidden p-2 text-emerald-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t border-emerald-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <a href="#shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-emerald-900">Shop</a>
            <a href="#expertise" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-emerald-900">Expertise</a>
            <a href="#consultations" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-emerald-900">Consultations</a>
            <a href="#wellness-hub" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-emerald-900">Wellness Hub</a>
            <hr className="border-emerald-50" />
            <a href="#consultations" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium text-center">Book Consultation</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#F9F8F6]">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 -skew-x-12 translate-x-1/4 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck size={14} />
            Expert-Backed Pharmacy in Ruiru
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-emerald-950 leading-[1.1] mb-6">
            Science-Backed Wellness, <br />
            <span className="italic text-emerald-700">Rooted in Empathy.</span>
          </h1>
          <p className="text-lg text-emerald-900/70 mb-8 max-w-lg leading-relaxed">
            Harvianah Pharmacy combines pharmaceutical precision with psychological insight to provide holistic care that heals both body and mind.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center gap-2 group">
              Shop All Products
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white text-emerald-900 border border-emerald-100 rounded-2xl font-semibold hover:bg-emerald-50 transition-all">
              Book a Consultation
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-emerald-100 pt-8">
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100",
                "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&q=80&w=100",
                "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=100",
                "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?auto=format&fit=crop&q=80&w=100"
              ].map((url, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-emerald-100">
                  <img src={url} alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-orange-400 mb-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-sm text-emerald-900/60 font-medium">Trusted by 2,000+ happy clients</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" 
              alt="Pharmacy Interior" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />
          </div>
          
          {/* Floating Expertise Card */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl max-w-xs border border-emerald-50"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                <Brain size={24} />
              </div>
              <div>
                <h4 className="font-bold text-emerald-950">Dual Expertise</h4>
                <p className="text-xs text-emerald-900/60 uppercase tracking-wider font-bold">Pharma + Psychology</p>
              </div>
            </div>
            <p className="text-sm text-emerald-900/70 italic">"We don't just dispense medicine; we provide a path to holistic well-being."</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const CategorySection = () => {
  return (
    <section id="shop" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-serif text-emerald-950 mb-4">Shop by Category</h2>
            <p className="text-emerald-900/60 max-w-md">Find exactly what you need from our curated selection of medical and wellness essentials.</p>
          </div>
          <button className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All Categories <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              whileHover={{ y: -8 }}
              className="group p-8 rounded-[2rem] bg-emerald-50/50 border border-emerald-100/50 hover:bg-white hover:shadow-xl hover:shadow-emerald-100 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 mb-6 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                {cat.id === 'pharma' && <Pill size={28} />}
                {cat.id === 'supplements' && <Zap size={28} />}
                {cat.id === 'wellness' && <Leaf size={28} />}
                {cat.id === 'mother-baby' && <Baby size={28} />}
              </div>
              <h3 className="text-xl font-bold text-emerald-950 mb-2">{cat.name}</h3>
              <p className="text-sm text-emerald-900/60 leading-relaxed">{cat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Zap = ({ size, className }: { size?: number, className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>;
const Leaf = ({ size, className }: { size?: number, className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a13.42 13.42 0 0 1-10 10Z"/><path d="M17.65 5.24 11 12"/><path d="M11 12a9 9 0 0 0-9 9"/></svg>;
const Baby = ({ size, className }: { size?: number, className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.31A10 10 0 0 0 5 6.31"/><path d="M22 12.82a6 6 0 0 1-2 10.18c-3.5 0-4.4-4.5-8-4.5s-4.5 4.5-8 4.5a6 6 0 0 1-2-10.18"/><path d="M12 2v4"/></svg>;

const FeaturedProducts = ({ onAddToCart }: { onAddToCart: (p: Product) => void }) => {
  return (
    <section className="py-24 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-emerald-950 mb-4">Expert Recommendations</h2>
          <p className="text-emerald-900/60 max-w-2xl mx-auto">Our top-selling wellness products, hand-picked by our pharmaceutical and psychological experts for their efficacy and quality.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.filter(p => p.isFeatured).map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-emerald-50 group"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => onAddToCart(product)}
                  className="absolute bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-xl translate-y-20 group-hover:translate-y-0 transition-transform duration-500 hover:bg-emerald-700"
                >
                  <ShoppingBag size={24} />
                </button>
                <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-900">
                  {product.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-emerald-950">{product.name}</h3>
                  <span className="text-emerald-600 font-bold">KES {product.price.toLocaleString()}</span>
                </div>
                <p className="text-sm text-emerald-900/60 mb-6 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-1 text-orange-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  <span className="text-xs text-emerald-900/40 ml-2">(48 reviews)</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialHub = () => {
  return (
    <section id="wellness-hub" className="py-24 bg-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Video size={14} />
              Join our Community
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-emerald-950 mb-6">
              Wellness Tips & <br />
              <span className="italic text-emerald-700">Expert Insights.</span>
            </h2>
            <p className="text-lg text-emerald-900/70 mb-8 leading-relaxed">
              We're more than just a pharmacy. Follow us on TikTok and Instagram for daily health hacks, mental wellness advice, and product deep-dives from our experts.
            </p>
            
            <p className="text-sm font-bold text-emerald-900/40 uppercase tracking-widest mb-4">Follow Our Journey</p>
            <div className="flex gap-4 mb-12">
              <a 
                href="https://www.tiktok.com/@gitaridiana" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-black text-white rounded-2xl font-bold hover:opacity-80 transition-opacity"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
                TikTok
              </a>
              <a 
                href="https://www.instagram.com/harvianah_pharmacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white rounded-2xl font-bold hover:opacity-90 transition-opacity"
              >
                <Instagram size={20} />
                Instagram
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                <h4 className="text-3xl font-bold text-emerald-950 mb-1">50k+</h4>
                <p className="text-sm text-emerald-900/60 font-medium uppercase tracking-wider">Followers</p>
              </div>
              <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                <h4 className="text-3xl font-bold text-emerald-950 mb-1">1M+</h4>
                <p className="text-sm text-emerald-900/60 font-medium uppercase tracking-wider">Video Likes</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="space-y-4"
              >
                <div className="aspect-[9/16] rounded-3xl overflow-hidden shadow-lg relative group">
                  <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400" alt="Expert Pharmacist" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
                  </div>
                </div>
                <div className="aspect-[9/16] rounded-3xl overflow-hidden shadow-lg relative group">
                  <img src="https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&q=80&w=400" alt="Wellness Routine" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-2 rounded-full text-white">
                    <Instagram size={16} />
                  </div>
                </div>
              </motion.div>
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="space-y-4 pt-12"
              >
                <div className="aspect-[9/16] rounded-3xl overflow-hidden shadow-lg relative group">
                  <img src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400" alt="Mindfulness Session" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
                  </div>
                </div>
                <div className="aspect-[9/16] rounded-3xl overflow-hidden shadow-lg relative group">
                  <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400" alt="Happy Wellness Client" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-2 rounded-full text-white">
                    <Instagram size={16} />
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl z-20">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white animate-pulse">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                <Pill size={20} />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">Harvianah</span>
            </div>
            <p className="text-emerald-100/60 leading-relaxed">
              Premium pharmaceuticals and holistic wellness products delivered with empathy and expertise. Located in Ruiru, Kenya.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/harvianah_pharmacy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"><Instagram size={18} /></a>
              <a href="https://www.tiktok.com/@gitaridiana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"><Video size={18} /></a>
              <a href="tel:+254700000000" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"><Phone size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-emerald-100/60">
              <li><a href="#" className="hover:text-white transition-colors">Shop All Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wellness Hub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Expert Consultations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Our Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Categories</h4>
            <ul className="space-y-4 text-emerald-100/60">
              <li><a href="#" className="hover:text-white transition-colors">Pharmaceuticals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Supplements</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mother & Baby</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Personal Care</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Holistic Wellness</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-emerald-100/60 mb-6 text-sm">Subscribe for wellness tips and exclusive offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 w-full"
              />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-emerald-100/40">
          <p>© 2024 Harvianah Pharmacy. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [showToast, setShowToast] = useState(false);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar cartCount={cart.length} />
      
      <main>
        <Hero />
        
        {/* Trust Bar */}
        <div className="bg-emerald-900 py-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-white/80 text-sm font-medium">
            <div className="flex items-center gap-3">
              <Truck className="text-emerald-400" size={24} />
              <span>Fast Delivery in Ruiru & Beyond</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-emerald-400" size={24} />
              <span>100% Authentic Products</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-emerald-400" size={24} />
              <span>Expert Advice Available 24/7</span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="text-emerald-400" size={24} />
              <span>Compassionate Holistic Care</span>
            </div>
          </div>
        </div>

        <CategorySection />
        <FeaturedProducts onAddToCart={addToCart} />
        
        {/* Expertise Section */}
        <section id="expertise" className="py-24 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-[2rem] overflow-hidden shadow-xl">
                    <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400" alt="Pharmaceutical Technologist" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="aspect-square rounded-[2rem] overflow-hidden shadow-xl mt-12">
                    <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400" alt="Counseling Psychologist" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-emerald-50 text-center max-w-[200px]">
                  <h4 className="text-3xl font-serif text-emerald-950 mb-1">Dual</h4>
                  <p className="text-xs text-emerald-900/60 uppercase tracking-widest font-bold">Expertise Model</p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-serif text-emerald-950 mb-8 leading-tight">
                  Where Science Meets <br />
                  <span className="italic text-emerald-700">Emotional Support.</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 shrink-0 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
                      <Pill size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-emerald-950 mb-2">Pharmaceutical Excellence</h4>
                      <p className="text-emerald-900/60 leading-relaxed">Our lead Pharmaceutical Technologist ensures every product is safe, effective, and scientifically sound.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 shrink-0 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-700">
                      <Brain size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-emerald-950 mb-2">Psychological Insight</h4>
                      <p className="text-emerald-900/60 leading-relaxed">Our Counseling Psychologist provides the empathy and mental health support needed for true holistic healing.</p>
                    </div>
                  </div>
                </div>
                <button className="mt-12 px-8 py-4 bg-emerald-950 text-white rounded-2xl font-semibold hover:bg-emerald-900 transition-all">
                  Learn About Our Story
                </button>
              </div>
            </div>
          </div>
        </section>

        <SocialHub />

        {/* Testimonials */}
        <section className="py-24 bg-emerald-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-emerald-950 mb-4">What Our Clients Say</h2>
              <p className="text-emerald-900/60">Real stories from the Harvianah community.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Sarah W.", role: "Mother", text: "The advice I got for my baby's skin condition was life-changing. They truly care." },
                { name: "David K.", role: "Fitness Enthusiast", text: "Best supplements in Ruiru. The quality is unmatched and the delivery is always on time." },
                { name: "Mercy A.", role: "Wellness Client", text: "I love the holistic approach. They helped me manage my anxiety alongside my physical health." }
              ].map((t, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-emerald-100">
                  <div className="flex text-orange-400 mb-6">
                    {[1, 2, 3, 4, 5].map(j => <Star key={j} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-emerald-900/70 italic mb-8 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <h5 className="font-bold text-emerald-950">{t.name}</h5>
                      <p className="text-xs text-emerald-900/40 uppercase tracking-widest font-bold">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section id="consultations" className="py-24 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-emerald-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
              </div>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 relative z-10">Start Your Wellness <br /> Journey Today.</h2>
              <p className="text-emerald-50 text-lg mb-12 max-w-2xl mx-auto relative z-10">
                Whether you need a prescription filled or a holistic wellness plan, we're here to support you every step of the way.
              </p>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <button className="px-10 py-5 bg-white text-emerald-600 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-xl">
                  Shop Now
                </button>
                <button className="px-10 py-5 bg-emerald-700 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all border border-emerald-500/30">
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-emerald-950 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <ShoppingBag size={16} />
            </div>
            <p className="font-medium">Item added to your cart!</p>
            <button className="text-emerald-400 font-bold text-sm ml-4">View Cart</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
