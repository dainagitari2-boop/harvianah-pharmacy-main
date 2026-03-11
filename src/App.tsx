/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
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
  Phone,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  HelpCircle,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, PRODUCTS, Product } from './types';

// --- Components ---

const Navbar = ({ 
  cartCount, 
  wishlistCount,
  onOpenCart, 
  onOpenWishlist,
  onSearch, 
  onHome, 
  onShop,
  onConsult,
  onNavigate,
  currentPage
}: { 
  cartCount: number; 
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearch: (q: string) => void;
  onHome: () => void;
  onShop: () => void;
  onConsult: () => void;
  onNavigate: (sectionId: string) => void;
  currentPage: number;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
    onShop();
    setIsSearchOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-emerald-950/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onHome}>
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white">
            <Pill size={20} />
          </div>
          <span className={`text-xl font-serif font-bold tracking-tight ${isScrolled ? 'text-emerald-900 dark:text-emerald-50' : 'text-emerald-900 dark:text-emerald-50'}`}>
            Harvianah
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-900/80 dark:text-emerald-100/80">
          <button onClick={onHome} className={`transition-colors ${currentPage === 0 ? 'text-emerald-600 font-bold' : 'hover:text-emerald-600'}`}>Home</button>
          <button onClick={onShop} className={`transition-colors ${currentPage >= 1 && currentPage <= 4 ? 'text-emerald-600 font-bold' : 'hover:text-emerald-600'}`}>Shop</button>
          <button onClick={() => onNavigate('expertise')} className={`transition-colors ${currentPage === 5 ? 'text-emerald-600 font-bold' : 'hover:text-emerald-600'}`}>Expertise</button>
          <button onClick={onConsult} className="hover:text-emerald-600 transition-colors">Consultations</button>
          <button onClick={() => onNavigate('community')} className={`transition-colors ${currentPage === 6 ? 'text-emerald-600 font-bold' : 'hover:text-emerald-600'}`}>Join Our Community</button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.form 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  onSubmit={handleSearchSubmit}
                  className="absolute right-full mr-2"
                >
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search products..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-emerald-500 shadow-sm dark:text-white"
                  />
                </motion.form>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>
          </div>
          <button 
            onClick={onOpenWishlist}
            className="p-2 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900 rounded-full transition-colors relative"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 text-white text-[10px] flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>
          <button 
            onClick={onOpenCart}
            className="p-2 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900 rounded-full transition-colors relative"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 text-white text-[10px] flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="md:hidden p-2 text-emerald-900 dark:text-emerald-100"
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
            className="absolute top-full left-0 w-full bg-white dark:bg-emerald-950 border-t border-emerald-100 dark:border-emerald-900 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <button onClick={() => { onShop(); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-emerald-900 dark:text-emerald-100">Shop</button>
            <button onClick={() => { onNavigate('expertise'); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-emerald-900 dark:text-emerald-100">Expertise</button>
            <button onClick={() => { onConsult(); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-emerald-900 dark:text-emerald-100">Consultations</button>
            <button onClick={() => { onNavigate('community'); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-emerald-900 dark:text-emerald-100">Join Our Community</button>
            <button onClick={() => { onNavigate('faqs'); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-emerald-900 dark:text-emerald-100">FAQs</button>
            <button onClick={() => { onNavigate('tracking'); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-emerald-900 dark:text-emerald-100">Track Order</button>
            <hr className="border-emerald-50 dark:border-emerald-900" />
            <button onClick={() => { onConsult(); setIsMobileMenuOpen(false); }} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium text-center">Book Consultation</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onShop, onConsult }: { onShop: () => void; onConsult: () => void }) => {
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
            Expert-Backed Pharmacy in Kimbo-Toll
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-emerald-950 leading-[1.1] mb-6">
            Science-Backed Wellness, <br />
            <span className="italic text-emerald-700">Rooted in Empathy.</span>
          </h1>
          <p className="text-lg text-emerald-900/70 mb-8 max-w-lg leading-relaxed">
            Harvianah Pharmacy combines pharmaceutical precision with psychological insight to provide holistic care that heals both body and mind.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onShop}
              className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center gap-2 group"
            >
              Shop All Products
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onConsult}
              className="px-8 py-4 bg-white text-emerald-900 border border-emerald-100 rounded-2xl font-semibold hover:bg-emerald-50 transition-all"
            >
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

const CartModal = ({ 
  isOpen, 
  onClose, 
  cart, 
  onRemove, 
  onUpdateQuantity,
  onClearCart
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cart: { product: Product; quantity: number }[]; 
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      onClearCart();
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-emerald-50 flex items-center justify-between">
              <h2 className="text-2xl font-serif text-emerald-950">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-emerald-50 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-300 mb-4">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-950 mb-2">Your cart is empty</h3>
                  <p className="text-emerald-900/60 mb-8">Looks like you haven't added anything yet.</p>
                  <button onClick={onClose} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold">Start Shopping</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-emerald-50 shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-emerald-950 line-clamp-1">{item.product.name}</h4>
                        <button onClick={() => onRemove(item.product.id)} className="text-emerald-300 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex flex-col mb-3">
                        {item.product.originalPrice && (
                          <p className="text-xs text-emerald-900/30 line-through">KES {item.product.originalPrice.toLocaleString()}</p>
                        )}
                        <p className="text-sm font-bold text-emerald-600">KES {item.product.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-emerald-100 rounded-lg">
                          <button 
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-emerald-50 text-emerald-600"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-emerald-50 text-emerald-600"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-emerald-950 ml-auto">
                          KES {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-emerald-50 bg-emerald-50/30">
                <div className="flex justify-between mb-6">
                  <span className="text-emerald-900/60 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-emerald-950">KES {total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut || isSuccess}
                  className={`w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                    isSuccess ? 'bg-emerald-500' : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {isCheckingOut ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 size={20} />
                      Order Placed!
                    </>
                  ) : (
                    'Buy Now'
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <div className="bg-emerald-600 p-12 text-white hidden md:block">
                <h2 className="text-3xl font-serif mb-6">Expert <br /> Consultation</h2>
                <p className="text-emerald-50 mb-8 leading-relaxed">Book a session with our Pharmaceutical Technologist or Counseling Psychologist for personalized care.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Clock size={20} /></div>
                    <p className="text-sm font-medium">30-60 Minute Sessions</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><ShieldCheck size={20} /></div>
                    <p className="text-sm font-medium">Confidential & Private</p>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-12">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-emerald-50 rounded-full transition-colors text-emerald-900">
                  <X size={24} />
                </button>
                
                {isSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-serif text-emerald-950 mb-2">Request Received!</h3>
                    <p className="text-emerald-900/60">We'll contact you within 24 hours to confirm your appointment.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-2xl font-serif text-emerald-950 mb-6">Book Your Session</h3>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-emerald-900/40 mb-2">Full Name</label>
                      <input required type="text" className="w-full bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500" placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-emerald-900/40 mb-2">Email Address</label>
                      <input required type="email" className="w-full bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500" placeholder="jane@example.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-emerald-900/40 mb-2">Consultation Type</label>
                      <select className="w-full bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500">
                        <option>Pharmaceutical Advice</option>
                        <option>Mental Wellness Counseling</option>
                        <option>Holistic Health Plan</option>
                      </select>
                    </div>
                    <div className="pt-4">
                      <button 
                        disabled={isSubmitting}
                        className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          'Confirm Booking'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const WishlistModal = ({ 
  isOpen, 
  onClose, 
  wishlist, 
  onRemove, 
  onAddToCart 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  wishlist: Product[]; 
  onRemove: (id: string) => void;
  onAddToCart: (p: Product) => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-emerald-50 flex items-center justify-between">
              <h2 className="text-2xl font-serif text-emerald-950">Your Wishlist</h2>
              <button onClick={onClose} className="p-2 hover:bg-emerald-50 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-300 mb-4">
                    <Heart size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-950 mb-2">Your wishlist is empty</h3>
                  <p className="text-emerald-900/60 mb-8">Save items you love for later!</p>
                  <button onClick={onClose} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold">Start Browsing</button>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div key={product.id} className="flex gap-4">
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-emerald-50 shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-emerald-950 line-clamp-1">{product.name}</h4>
                        <button onClick={() => onRemove(product.id)} className="text-emerald-300 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex flex-col mb-4">
                        {product.originalPrice && (
                          <p className="text-xs text-emerald-900/30 line-through">KES {product.originalPrice.toLocaleString()}</p>
                        )}
                        <p className="text-sm font-bold text-emerald-600">KES {product.price.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => { onAddToCart(product); onRemove(product.id); }}
                        className="w-full py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ShopView = ({ 
  onAddToCart, 
  onToggleWishlist,
  onQuickView,
  onBuyNow,
  wishlist,
  searchQuery, 
  onSearch,
  onBack,
  activeCategoryOverride
}: { 
  onAddToCart: (p: Product) => void; 
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  wishlist: string[];
  searchQuery: string;
  onSearch: (q: string) => void;
  onBack: () => void;
  activeCategoryOverride?: string;
}) => {
  const [selectedCategory, setSelectedCategory] = useState(activeCategoryOverride || 'all');

  useEffect(() => {
    if (activeCategoryOverride) {
      setSelectedCategory(activeCategoryOverride);
    }
  }, [activeCategoryOverride]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pt-32 pb-12 bg-[#F9F8F6] dark:bg-emerald-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-emerald-600 font-bold mb-4 hover:gap-3 transition-all"
            >
              <ArrowRight size={18} className="rotate-180" />
              Back to Home
            </button>
            <h1 className="text-5xl font-serif text-emerald-950 dark:text-emerald-50 mb-4">
              {selectedCategory === 'all' ? 'Our Pharmacy' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </h1>
            <p className="text-emerald-900/60 dark:text-emerald-100/60 max-w-2xl">
              {selectedCategory === 'all' 
                ? 'Browse our complete collection of expert-backed pharmaceuticals, supplements, and wellness essentials.'
                : CATEGORIES.find(c => c.id === selectedCategory)?.description}
            </p>
          </div>
        </div>

        {!activeCategoryOverride && (
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="flex-1 flex flex-wrap gap-2">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === 'all' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 border border-emerald-100 dark:border-emerald-800'}`}
              >
                All Products
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 border border-emerald-100 dark:border-emerald-800'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300" size={20} />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:border-emerald-500 shadow-sm dark:text-white"
              />
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900 rounded-full flex items-center justify-center text-emerald-300 mx-auto mb-6">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-serif text-emerald-950 dark:text-emerald-50 mb-2">No products found</h3>
            <p className="text-emerald-900/60 dark:text-emerald-100/60">Try adjusting your search or category filters.</p>
            <button 
              onClick={() => { onSearch(''); setSelectedCategory('all'); }}
              className="mt-8 text-emerald-600 font-bold underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-emerald-900/50 rounded-[2.5rem] overflow-hidden border border-emerald-50 dark:border-emerald-800 group flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => onQuickView(product)}
                      className="px-6 py-2.5 bg-white text-emerald-900 rounded-full font-bold text-sm shadow-xl hover:bg-emerald-50 transition-all translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                      Quick View
                    </button>
                  </div>
                  <div className="absolute bottom-6 right-6 flex flex-col gap-2 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                    <button 
                      onClick={() => onToggleWishlist(product)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-colors ${wishlist.includes(product.id) ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-800'}`}
                    >
                      <Heart size={20} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-emerald-700"
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                  <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 dark:bg-emerald-900/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-900 dark:text-emerald-100">
                    {product.category}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-emerald-950 dark:text-emerald-50">{product.name}</h3>
                  <div className="flex flex-col items-end mb-2">
                    {product.originalPrice && (
                      <span className="text-xs text-emerald-900/30 dark:text-emerald-100/30 line-through">KES {product.originalPrice.toLocaleString()}</span>
                    )}
                    <span className="text-emerald-600 font-bold">KES {product.price.toLocaleString()}</span>
                  </div>
                  </div>
                  <p className="text-sm text-emerald-900/60 dark:text-emerald-100/60 mb-6 line-clamp-2">{product.description}</p>
                  <div className="mt-auto">
                    <div className="flex items-center gap-1 text-orange-400 mb-6">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                      <span className="text-xs text-emerald-900/40 dark:text-emerald-100/40 ml-2">({product.reviews?.length || 0} reviews)</span>
                    </div>
                    <button 
                      onClick={() => onBuyNow(product)}
                      className="w-full py-3 bg-emerald-50 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-100 rounded-xl font-bold text-sm hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CategorySection = ({ onShop }: { onShop: () => void }) => {
  return (
    <section id="shop" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-serif text-emerald-950 mb-4">Shop by Category</h2>
            <p className="text-emerald-900/60 max-w-md">Find exactly what you need from our curated selection of medical and wellness essentials.</p>
          </div>
          <button 
            onClick={onShop}
            className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
          >
            View All Categories <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              whileHover={{ y: -8 }}
              onClick={onShop}
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

const FeaturedProducts = ({ 
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onBuyNow,
  wishlist
}: { 
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  wishlist: string[];
}) => {
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
              className="bg-white rounded-[2.5rem] overflow-hidden border border-emerald-50 group flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => onQuickView(product)}
                    className="px-6 py-2.5 bg-white text-emerald-900 rounded-full font-bold text-sm shadow-xl hover:bg-emerald-50 transition-all translate-y-4 group-hover:translate-y-0 duration-300"
                  >
                    Quick View
                  </button>
                </div>
                <div className="absolute bottom-6 right-6 flex flex-col gap-2 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                  <button 
                    onClick={() => onToggleWishlist(product)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-colors ${wishlist.includes(product.id) ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-900 hover:bg-emerald-50'}`}
                  >
                    <Heart size={20} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-emerald-700"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>
                <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-900">
                  {product.category}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-emerald-950">{product.name}</h3>
                  <div className="flex flex-col items-end mb-2">
                    {product.originalPrice && (
                      <span className="text-xs text-emerald-900/30 line-through">KES {product.originalPrice.toLocaleString()}</span>
                    )}
                    <span className="text-emerald-600 font-bold">KES {product.price.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-sm text-emerald-900/60 mb-6 line-clamp-2">{product.description}</p>
                <div className="mt-auto">
                  <div className="flex items-center gap-1 text-orange-400 mb-6">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                    <span className="text-xs text-emerald-900/40 ml-2">({product.reviews?.length || 0} reviews)</span>
                  </div>
                  <button 
                    onClick={() => onBuyNow(product)}
                    className="w-full py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    Buy Now
                  </button>
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
                  <img src="https://images.unsplash.com/photo-1631217816660-ad44c3e99b08?auto=format&fit=crop&q=80&w=400" alt="Our Friendly Pharmacist" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
                  </div>
                </div>
                <div className="aspect-[9/16] rounded-3xl overflow-hidden shadow-lg relative group">
                  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400" alt="Vibrant Community" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
                  <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400" alt="Healthy & Happy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
                  </div>
                </div>
                <div className="aspect-[9/16] rounded-3xl overflow-hidden shadow-lg relative group">
                  <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400" alt="Wellness Together" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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

const QuickViewModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart,
  onBuyNow
}: { 
  product: Product | null; 
  isOpen: boolean; 
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
}) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-emerald-900 hover:bg-white transition-colors shadow-sm"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-emerald-900 shadow-sm">
                {product.category}
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-serif text-emerald-950 mb-4">{product.name}</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex flex-col">
                    {product.originalPrice && (
                      <span className="text-sm text-emerald-900/30 line-through">KES {product.originalPrice.toLocaleString()}</span>
                    )}
                    <span className="text-2xl font-bold text-emerald-600">KES {product.price.toLocaleString()}</span>
                  </div>
                  <div className="h-8 w-px bg-emerald-100" />
                  <div className="flex items-center gap-1 text-orange-400">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold text-emerald-950">4.8</span>
                    <span className="text-xs text-emerald-900/40 ml-1">({product.reviews?.length || 0} reviews)</span>
                  </div>
                </div>
                <p className="text-emerald-900/70 leading-relaxed mb-6">
                  {product.longDescription || product.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-10">
                <button 
                  onClick={() => { onBuyNow(product); onClose(); }}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                >
                  Buy Now <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="w-full py-4 bg-white border-2 border-emerald-600 text-emerald-600 rounded-2xl font-bold hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} /> Add to Cart
                </button>
              </div>

              {product.reviews && product.reviews.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-emerald-950 mb-6 flex items-center gap-2">
                    Customer Reviews <span className="text-sm font-normal text-emerald-900/40">({product.reviews.length})</span>
                  </h3>
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="pb-6 border-b border-emerald-50 last:border-0">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-emerald-900">{review.user}</span>
                          <span className="text-[10px] text-emerald-900/30 uppercase tracking-widest">{review.date}</span>
                        </div>
                        <div className="flex gap-0.5 text-orange-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                        <p className="text-sm text-emerald-900/60 italic">"{review.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const StoryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-emerald-50 rounded-full transition-colors text-emerald-900">
                <X size={24} />
              </button>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-8">
                  <Star size={40} fill="currentColor" />
                </div>
                <h2 className="text-4xl font-serif text-emerald-950 mb-6">The Harvianah Spark: <br /><span className="italic text-emerald-700">Where Science Got a Soul</span></h2>
                
                <div className="space-y-6 text-lg text-emerald-900/70 leading-relaxed">
                  <p>
                    Once upon a time in Kimbo-Toll, a lab coat met a listening ear. 🧪✨ 
                  </p>
                  <p>
                    Our founders realized that while pills can fix a fever, they can't always fix the "feeling." 
                    We saw people leaving pharmacies with bags of medicine but hearts still heavy with worry.
                  </p>
                  <p className="font-serif italic text-2xl text-emerald-800">
                    "Why choose between body and mind when you can heal both?"
                  </p>
                  <p>
                    So, we did something a little crazy. We combined pharmaceutical precision with psychological insight. 
                    Think of us as your health's best friends—one who knows exactly what's in the bottle, 
                    and another who knows exactly what's on your mind.
                  </p>
                  <p>
                    We're here to make wellness feel less like a chore and more like a high-five for your body and soul! 
                    Welcome to the family. 💚
                  </p>
                </div>

                <button 
                  onClick={onClose}
                  className="mt-10 px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl"
                >
                  Let's Get Healthy Together!
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onNext, 
  onBack,
  nextLabel
}: { 
  currentPage: number; 
  totalPages: number; 
  onNext: () => void; 
  onBack: () => void;
  nextLabel?: string;
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 border-t border-emerald-100 flex items-center justify-between">
      <button 
        onClick={onBack}
        disabled={currentPage === 0}
        className={`flex items-center gap-2 font-bold transition-all ${currentPage === 0 ? 'opacity-0 pointer-events-none' : 'text-emerald-600 hover:gap-3'}`}
      >
        <ArrowRight size={18} className="rotate-180" />
        Previous Page
      </button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-all ${i === currentPage ? 'w-8 bg-emerald-600' : 'bg-emerald-200'}`}
          />
        ))}
      </div>

      <button 
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        className={`flex items-center gap-2 font-bold transition-all ${currentPage === totalPages - 1 ? 'opacity-0 pointer-events-none' : 'text-emerald-600 hover:gap-3'}`}
      >
        {nextLabel || 'Next Page'}
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

const ExpertiseView = ({ onBack }: { onBack: () => void }) => {
  return (
    <section id="expertise" className="py-32 bg-white dark:bg-emerald-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:gap-3 transition-all">
          <ArrowRight size={18} className="rotate-180" /> Back to Home
        </button>
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-emerald-900 p-8 rounded-[2.5rem] shadow-2xl border border-emerald-50 dark:border-emerald-800 text-center max-w-[200px]">
              <h4 className="text-3xl font-serif text-emerald-950 dark:text-emerald-50 mb-1">Dual</h4>
              <p className="text-xs text-emerald-900/60 dark:text-emerald-100/60 uppercase tracking-widest font-bold">Expertise Model</p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-serif text-emerald-950 dark:text-emerald-50 mb-8 leading-tight">
              Science with a Soul, <br />
              <span className="italic text-emerald-700">Care with a Smile.</span>
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 shrink-0 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center text-emerald-700 dark:text-emerald-100">
                  <Pill size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">The Science Squad</h4>
                  <p className="text-emerald-900/60 dark:text-emerald-100/60 leading-relaxed">Our lead Pharmaceutical Technologist ensures every product is safe, effective, and scientifically sound. No guesswork, just results!</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 shrink-0 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-700 dark:text-orange-400">
                  <Brain size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">The Soul Support</h4>
                  <p className="text-emerald-900/60 dark:text-emerald-100/60 leading-relaxed">Our Counseling Psychologist provides the empathy and mental health support needed for true holistic healing. Because your mind matters too.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CommunityView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-32 pb-24 bg-[#F9F8F6] dark:bg-emerald-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:gap-3 transition-all">
          <ArrowRight size={18} className="rotate-180" /> Back to Home
        </button>
        <SocialHub />
        
        {/* Testimonials */}
        <section className="py-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-[3rem] mt-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-emerald-950 dark:text-emerald-50 mb-4">What Our Clients Say</h2>
              <p className="text-emerald-900/60 dark:text-emerald-100/60">Real stories from the Harvianah community.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Sarah W.", role: "Mother", text: "The advice I got for my baby's skin condition was life-changing. They truly care." },
                { name: "David K.", role: "Fitness Enthusiast", text: "Best supplements in Kimbo-Toll. The quality is unmatched and the delivery is always on time." },
                { name: "Mercy A.", role: "Wellness Client", text: "I love the holistic approach. They helped me manage my anxiety alongside my physical health." }
              ].map((t, i) => (
                <div key={i} className="bg-white dark:bg-emerald-900/50 p-10 rounded-[2.5rem] shadow-sm border border-emerald-100 dark:border-emerald-800">
                  <div className="flex text-orange-400 mb-6">
                    {[1, 2, 3, 4, 5].map(j => <Star key={j} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-emerald-900/70 dark:text-emerald-100/70 italic mb-8 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-100 font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <h5 className="font-bold text-emerald-950 dark:text-emerald-50">{t.name}</h5>
                      <p className="text-xs text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest font-bold">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section id="consultations" className="py-24">
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
                <button 
                  onClick={() => onBack()}
                  className="px-10 py-5 bg-white text-emerald-600 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-xl"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const FAQsView = ({ onBack }: { onBack: () => void }) => {
  const faqs = [
    { q: "How do I place an order?", a: "You can browse our shop, add items to your cart, and proceed to checkout. We'll guide you through the process." },
    { q: "What are your delivery times?", a: "We offer fast delivery in Kimbo-Toll within 2-4 hours. Other areas in Kenya typically receive orders within 24-48 hours." },
    { q: "Do you require prescriptions?", a: "For prescription-only medicines, we require a valid prescription from a registered medical practitioner. You can upload it during checkout or send it via WhatsApp." },
    { q: "Can I return products?", a: "Due to safety regulations, we cannot accept returns on pharmaceutical products once they have left our premises. For other items, please contact our support." },
    { q: "How can I track my order?", a: "You can use our 'Order Tracking' page with your order ID and email to see the real-time status of your delivery." }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#F9F8F6] dark:bg-emerald-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:gap-3 transition-all">
          <ArrowRight size={18} className="rotate-180" /> Back to Home
        </button>
        <h1 className="text-5xl font-serif text-emerald-950 dark:text-emerald-50 mb-12">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-emerald-900/50 p-8 rounded-3xl border border-emerald-50 dark:border-emerald-800 shadow-sm">
              <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-3">{faq.q}</h3>
              <p className="text-emerald-900/70 dark:text-emerald-100/60 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OrderTrackingView = ({ onBack }: { onBack: () => void }) => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'not-found'>('idle');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      if (orderId.length > 4) setStatus('found');
      else setStatus('not-found');
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-[#F9F8F6] dark:bg-emerald-950 min-h-screen">
      <div className="max-w-xl mx-auto px-6 text-center">
        <button onClick={onBack} className="flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:gap-3 transition-all mx-auto">
          <ArrowRight size={18} className="rotate-180" /> Back to Home
        </button>
        <h1 className="text-5xl font-serif text-emerald-950 dark:text-emerald-50 mb-6">Track Your Order</h1>
        <p className="text-emerald-900/60 dark:text-emerald-100/60 mb-12">Enter your order ID below to see the current status of your health and wellness delivery.</p>
        
        <form onSubmit={handleTrack} className="bg-white dark:bg-emerald-900/50 p-8 rounded-[2.5rem] shadow-xl border border-emerald-50 dark:border-emerald-800 mb-12">
          <div className="mb-6">
            <label className="block text-left text-sm font-bold text-emerald-900/40 dark:text-emerald-100/40 uppercase tracking-widest mb-2">Order ID</label>
            <input 
              required
              type="text" 
              placeholder="e.g. HV-12345"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full bg-emerald-50/50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500 dark:text-white"
            />
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            Track Order
          </button>
        </form>

        <AnimatePresence mode="wait">
          {status === 'loading' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
              <p className="text-emerald-900/60 dark:text-emerald-100/60 font-medium">Locating your order...</p>
            </motion.div>
          )}
          {status === 'found' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-50 dark:bg-emerald-900/30 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-800 text-left">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-950 dark:text-emerald-50">Order #{orderId}</h3>
                  <p className="text-emerald-600 font-bold">In Transit</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-2 bg-emerald-600 rounded-full" />
                  <div>
                    <p className="font-bold text-emerald-900 dark:text-emerald-100">Out for Delivery</p>
                    <p className="text-sm text-emerald-900/60 dark:text-emerald-100/60">Today, 10:30 AM - Kimbo-Toll Hub</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 bg-emerald-200 dark:bg-emerald-800 rounded-full" />
                  <div>
                    <p className="font-bold text-emerald-900/40 dark:text-emerald-100/40">Processing</p>
                    <p className="text-sm text-emerald-900/40 dark:text-emerald-100/40">Yesterday, 4:15 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {status === 'not-found' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-red-50 dark:bg-red-900/20 rounded-3xl border border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 font-bold">
              Order not found. Please check your ID and try again.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Footer = ({ 
  onShop, 
  onConsult, 
  onNavigate,
  onLegal 
}: { 
  onShop: () => void; 
  onConsult: () => void;
  onNavigate: (id: string) => void;
  onLegal: (type: string) => void;
}) => {
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
              Premium pharmaceuticals and holistic wellness products delivered with empathy and expertise. Located in Kimbo-Toll, Anchor 2 Building.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/harvianah_pharmacy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"><Instagram size={18} /></a>
              <a href="https://www.tiktok.com/@gitaridiana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"><Video size={18} /></a>
              <a href="tel:0702759927" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"><Phone size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-emerald-100/60">
              <li><button onClick={() => onNavigate('tracking')} className="hover:text-white transition-colors text-left">Track Your Order</button></li>
              <li><button onClick={() => onNavigate('faqs')} className="hover:text-white transition-colors text-left">FAQs</button></li>
              <li><button onClick={onConsult} className="hover:text-white transition-colors text-left">Expert Consultations</button></li>
              <li><button onClick={() => onNavigate('community')} className="hover:text-white transition-colors text-left">Join Our Community</button></li>
              <li><a href="mailto:info@harvianah.com" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Shop Categories</h4>
            <ul className="space-y-4 text-emerald-100/60">
              {CATEGORIES.map(cat => (
                <li key={cat.id}><button onClick={onShop} className="hover:text-white transition-colors text-left">{cat.name}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-emerald-100/60 mb-6 text-sm">Subscribe for wellness tips and exclusive offers.</p>
            <form onSubmit={(e) => { e.preventDefault(); onLegal('Newsletter'); }} className="flex gap-2">
              <input 
                required
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 w-full"
              />
              <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-emerald-100/40">
          <p>© 2024 Harvianah Pharmacy. All rights reserved.</p>
          <div className="flex gap-8">
            <button onClick={() => onLegal('Privacy Policy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => onLegal('Terms of Service')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => onLegal('Shipping Policy')} className="hover:text-white transition-colors">Shipping Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Item added to your cart!');
  
  // Page Navigation State
  // 0: Home, 1: Pharma, 2: Supplements, 3: Mother & Baby, 4: Wellness, 5: Expertise, 6: Join Our Community, 7: FAQs, 8: Tracking
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 9;
  const pageNames = [
    'Home', 
    'Pharmaceuticals', 
    'Supplements', 
    'Mother & Baby', 
    'Holistic Wellness', 
    'Our Expertise', 
    'Join Our Community',
    'FAQs',
    'Order Tracking'
  ];

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setToastMessage('Item added to your cart!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.includes(product.id);
      if (exists) {
        setToastMessage('Removed from wishlist');
        return prev.filter(id => id !== product.id);
      }
      setToastMessage('Added to wishlist!');
      return [...prev, product.id];
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLegal = (type: string) => {
    setToastMessage(`${type} coming soon!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItems = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900 bg-white transition-colors duration-300">
      <Navbar 
          cartCount={cartCount} 
          wishlistCount={wishlist.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onSearch={setSearchQuery}
          onHome={() => goToPage(0)}
          onShop={() => goToPage(1)}
          onConsult={() => setIsConsultationOpen(true)}
          onNavigate={(id) => {
            if (id === 'expertise') goToPage(5);
            if (id === 'community') goToPage(6);
            if (id === 'faqs') goToPage(7);
            if (id === 'tracking') goToPage(8);
            if (id === 'consultations') goToPage(0); // Hero has consultation
          }}
          currentPage={currentPage}
        />
      
      <main className="min-h-[80vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 0 && (
              <>
                <Hero 
                  onShop={() => goToPage(1)} 
                  onConsult={() => setIsConsultationOpen(true)} 
                />
                
                {/* Trust Bar */}
                <div className="bg-emerald-900 py-10">
                  <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-white/80 text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <Truck className="text-emerald-400" size={24} />
                      <span>Fast Delivery in Kimbo-Toll & Beyond</span>
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

                <CategorySection onShop={() => goToPage(1)} />
                <FeaturedProducts 
                  onAddToCart={addToCart} 
                  onToggleWishlist={toggleWishlist}
                  onQuickView={handleQuickView}
                  onBuyNow={handleBuyNow}
                  wishlist={wishlist}
                />
              </>
            )}

            {currentPage >= 1 && currentPage <= 4 && (
              <ShopView 
                onAddToCart={addToCart} 
                onToggleWishlist={toggleWishlist}
                onQuickView={handleQuickView}
                onBuyNow={handleBuyNow}
                wishlist={wishlist}
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                onBack={() => goToPage(0)}
                // Override the internal category selection to match the page
                activeCategoryOverride={
                  currentPage === 1 ? 'pharma' :
                  currentPage === 2 ? 'supplements' :
                  currentPage === 3 ? 'mother-baby' :
                  'wellness'
                }
              />
            )}

            {currentPage === 5 && <ExpertiseView onBack={() => goToPage(0)} />}
            {currentPage === 6 && <CommunityView onBack={() => goToPage(0)} />}
            {currentPage === 7 && <FAQsView onBack={() => goToPage(0)} />}
            {currentPage === 8 && <OrderTrackingView onBack={() => goToPage(0)} />}

            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onBack={() => goToPage(currentPage - 1)}
              onNext={() => goToPage(currentPage + 1)}
              nextLabel={currentPage < totalPages - 1 ? `Next: ${pageNames[currentPage + 1]}` : undefined}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer 
        onShop={() => goToPage(1)} 
        onConsult={() => setIsConsultationOpen(true)} 
        onNavigate={(id) => {
          if (id === 'expertise') goToPage(5);
          if (id === 'community') goToPage(6);
          if (id === 'faqs') goToPage(7);
          if (id === 'tracking') goToPage(8);
        }}
        onLegal={handleLegal}
      />

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onClearCart={() => setCart([])}
      />

      <WishlistModal 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)} 
        wishlist={wishlistItems}
        onRemove={(id) => setWishlist(prev => prev.filter(i => i !== id))}
        onAddToCart={addToCart}
      />

      <ConsultationModal 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
      />

      <StoryModal 
        isOpen={isStoryOpen} 
        onClose={() => setIsStoryOpen(false)} 
      />

      <QuickViewModal 
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={addToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={() => {
              if (toastMessage.includes('cart')) setIsCartOpen(true);
              if (toastMessage.includes('wishlist')) setIsWishlistOpen(true);
            }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-emerald-950 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 cursor-pointer"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              {toastMessage.includes('wishlist') ? <Heart size={16} fill="currentColor" /> : <ShoppingBag size={16} />}
            </div>
            <p className="font-medium">{toastMessage}</p>
            {toastMessage.includes('cart') && <button className="text-emerald-400 font-bold text-sm ml-4">View Cart</button>}
            {toastMessage.includes('wishlist') && <button className="text-emerald-400 font-bold text-sm ml-4">View Wishlist</button>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
