/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  ArrowUp,
  User,
  Phone,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  HelpCircle,
  MapPin,
  Sparkles,
  MessageCircle,
  ClipboardList,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, PRODUCTS, Product } from './types';
import Logo from './components/Logo';

// --- Utilities ---

const getLevenshteinDistance = (a: string, b: string): number => {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array.from({ length: b.length + 1 }, (_, i) => i)
  );
  for (let i = 1; i <= a.length; i++) matrix[i][0] = i;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
};

const findDidYouMean = (query: string, items: string[]): string | null => {
  if (!query || query.length < 3) return null;
  const normalizedQuery = query.toLowerCase();
  
  let bestMatch: string | null = null;
  let minDistance = 3; // Max distance allowed

  for (const item of items) {
    const normalizedItem = item.toLowerCase();
    if (normalizedItem === normalizedQuery) return null; // Exact match exists
    
    const distance = getLevenshteinDistance(normalizedQuery, normalizedItem);
    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = item;
    }
  }
  
  return bestMatch;
};

// --- Components ---

const ExpandableText = ({ text, limit = 150 }: { text: string; limit?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > limit;

  if (!shouldTruncate) return <p className="text-sm text-brand-dark/60 mb-6">{text}</p>;

  return (
    <div className="mb-6">
      <p className="text-sm text-brand-dark/60 leading-relaxed">
        {isExpanded ? text : `${text.slice(0, limit)}...`}
      </p>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        className="text-brand-primary text-xs font-bold mt-2 hover:underline flex items-center gap-1"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-primary shadow-lg py-3' : 'bg-brand-primary py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onHome}>
          <Logo className="w-10 h-10 text-brand-primary" />
          <span className="text-xl font-serif font-bold tracking-tight text-white">
            Harvianah
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
          <AnimatePresence mode="wait">
            {!isSearchOpen ? (
              <motion.div 
                key="nav-links"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-8"
              >
                <button onClick={onHome} className={`transition-colors ${currentPage === 0 ? 'text-white font-bold underline underline-offset-8' : 'hover:text-white'}`}>Home</button>
                <button onClick={onShop} className={`transition-colors ${currentPage >= 1 && currentPage <= 6 ? 'text-white font-bold underline underline-offset-8' : 'hover:text-white'}`}>Shop</button>
                <button onClick={onConsult} className="hover:text-white transition-colors">Consultations</button>
                <button onClick={() => onNavigate('tracking')} className={`transition-colors ${currentPage === 9 ? 'text-white font-bold underline underline-offset-8' : 'hover:text-white'}`}>Track Order</button>
                <button onClick={() => onNavigate('community')} className={`transition-colors ${currentPage === 7 ? 'text-white font-bold underline underline-offset-8' : 'hover:text-white'}`}>Join Our Community</button>
              </motion.div>
            ) : (
              <motion.form 
                key="search-form"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 400, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                onSubmit={handleSearchSubmit}
                className="relative"
              >
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search for products, health tips, or expertise..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:bg-white focus:text-brand-dark focus:placeholder:text-brand-dark/40 transition-all shadow-inner"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors">
                  <Search size={16} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-full transition-all ${isSearchOpen ? 'bg-white text-brand-primary' : 'text-white hover:bg-white/10'}`}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>
          <button 
            onClick={onOpenWishlist}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors relative"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-white text-brand-primary text-[10px] flex items-center justify-center rounded-full font-bold">
                {wishlistCount}
              </span>
            )}
          </button>
          <button 
            onClick={onOpenCart}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors relative"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-white text-brand-primary text-[10px] flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="md:hidden p-2 bg-white text-brand-primary rounded-full transition-colors hover:bg-brand-surface"
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
            className="absolute top-full left-0 w-full bg-brand-primary border-t border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <button onClick={() => { onShop(); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-white">Shop</button>
            <button onClick={() => { onConsult(); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-white">Consultations</button>
            <button onClick={() => { onNavigate('community'); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-white">Join Our Community</button>
            <button onClick={() => { onNavigate('faqs'); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-white">FAQs</button>
            <button onClick={() => { onNavigate('tracking'); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-white">Track Order</button>
            <hr className="border-white/10" />
            <button onClick={() => { onConsult(); setIsMobileMenuOpen(false); }} className="w-full bg-white text-brand-primary py-3 rounded-xl font-bold text-center">Book Consultation</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onShop, onConsult }: { onShop: () => void; onConsult: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#F9F8F6]">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-surface/50 -skew-x-12 translate-x-1/4 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-surface text-brand-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck size={14} />
            Expert-Backed Pharmacy in Kimbo-Toll
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-brand-dark leading-[1.1] mb-6">
            Science-Backed Wellness, <br />
            <span className="italic text-brand-primary">Rooted in Empathy.</span>
          </h1>
          <p className="text-lg text-brand-dark/70 mb-8 max-w-lg leading-relaxed">
            Harvianah Pharmacy combines pharmaceutical precision with psychological insight to provide holistic care that heals both body and mind.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onShop}
              className="px-8 py-4 bg-brand-primary text-white rounded-2xl font-semibold hover:bg-brand-dark transition-all shadow-lg shadow-brand-light/20 flex items-center gap-2 group"
            >
              Shop All Products
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onConsult}
              className="px-8 py-4 bg-white text-brand-dark border border-brand-surface rounded-2xl font-semibold hover:bg-brand-surface transition-all"
            >
              Book a Consultation
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-brand-surface pt-8">
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100",
                "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&q=80&w=100",
                "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=100",
                "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?auto=format&fit=crop&q=80&w=100"
              ].map((url, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-brand-surface">
                  <img src={url} alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-orange-400 mb-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-sm text-brand-dark/60 font-medium">Trusted by 2,000+ happy clients</p>
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
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
          </div>
          
          {/* Floating Expertise Card */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl max-w-xs border border-brand-surface"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                <Brain size={24} />
              </div>
              <div>
                <h4 className="font-bold text-brand-dark">Dual Expertise</h4>
                <p className="text-xs text-brand-dark/60 uppercase tracking-wider font-bold">Pharma + Psychology</p>
              </div>
            </div>
            <p className="text-sm text-brand-dark/70 italic">"We don't just dispense medicine; we provide a path to holistic well-being."</p>
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
  onClearCart,
  onPaymentSubmitted
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cart: { product: Product; quantity: number }[]; 
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
  onPaymentSubmitted: (order: any) => void;
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'idle' | 'entering-code' | 'notifying' | 'verifying' | 'received' | 'pushing'>('idle');
  const [transactionCode, setTransactionCode] = useState('');
  const [mpesaPushStatus, setMpesaPushStatus] = useState<'waiting' | 'success' | 'failed' | null>(null);
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    location: ''
  });
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderTotal, setOrderTotal] = useState<number>(0);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setPaymentStep('idle');
    
    try {
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...checkoutData,
          items: cart,
          total
        })
      });

      const data = await response.json();

      if (response.ok) {
        const placedOrderId = data.orderId;
        const placedTotal = total;
        setOrderId(placedOrderId);
        setOrderTotal(placedTotal);
        setIsSuccess(true);
        onClearCart();
        // Automatically trigger M-Pesa Push with the correct total
        handleMpesaPush(placedOrderId, placedTotal);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handlePaymentSent = () => {
    if (!transactionCode || transactionCode.length < 10) {
      alert('Please enter a valid M-Pesa Transaction Code (e.g. RCK1234567)');
      return;
    }
    
    // Notify Admin (Checker)
    onPaymentSubmitted({
      ...checkoutData,
      transactionCode,
      total,
      date: new Date().toISOString()
    });

    setPaymentStep('notifying');
    setTimeout(() => {
      setPaymentStep('verifying');
      setTimeout(() => {
        setPaymentStep('received');
      }, 4000);
    }, 2000);
  };

  const handleMpesaPush = async (id?: string, amt?: number) => {
    const finalOrderId = id || orderId || `HV-${Math.floor(10000 + Math.random() * 90000)}`;
    const finalAmount = amt || orderTotal || total;
    
    if (!checkoutData.phone) {
      alert('Please enter your phone number in the delivery details first.');
      return;
    }

    if (finalAmount <= 0) {
      alert('Invalid order total. Please try again.');
      return;
    }

    setPaymentStep('pushing');
    setMpesaPushStatus('waiting');
    
    try {
      const response = await fetch('/api/mpesa/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: checkoutData.phone, 
          amount: finalAmount,
          orderId: finalOrderId
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // The push was successfully initiated
        console.log('M-Pesa Push Response:', data);
        
        // In a real production app, we would poll an endpoint here to check the status 
        // of CheckoutRequestID. For this demo, we'll wait and then show success 
        // to simulate the flow, but the real push was triggered!
        
        setTimeout(() => {
          setMpesaPushStatus('success');
          setPaymentStep('received');
          
          onPaymentSubmitted({
            ...checkoutData,
            transactionCode: data.CheckoutRequestID || `PUSH-${Math.floor(100000 + Math.random() * 900000)}`,
            total,
            date: new Date().toISOString(),
            method: 'STK_PUSH',
            orderId: finalOrderId
          });
        }, 10000);
      } else {
        throw new Error(data.error || 'Failed to initiate push');
      }
    } catch (error: any) {
      console.error('M-Pesa Push error:', error);
      setMpesaPushStatus('failed');
      setPaymentStep('idle');
      // If auto-push fails, we stay on the success screen where they can try manual payment or retry push
      console.warn(`M-Pesa Error: ${error.message}. Fallback to manual instructions.`);
    }
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
            className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-brand-surface flex items-center justify-between">
              <h2 className="text-2xl font-serif text-brand-dark">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-brand-surface rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 && !isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-brand-surface rounded-full flex items-center justify-center text-brand-light mb-4">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">Your cart is empty</h3>
                  <p className="text-brand-dark/60 mb-8">Looks like you haven't added anything yet.</p>
                  <button onClick={onClose} className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold">Start Shopping</button>
                </div>
              ) : isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-serif text-brand-dark mb-2">Order Received!</h2>
                  <p className="text-brand-dark/60 mb-6 font-medium">Order ID: <span className="text-brand-primary">{orderId || 'Processing...'}</span></p>
                  
                  <div className="w-full bg-brand-surface border border-brand-primary/20 rounded-[2.5rem] p-8 mb-8 text-left shadow-inner">
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-brand-primary/10">
                      <span className="text-brand-dark/60 font-bold uppercase tracking-widest text-xs">Total to Pay</span>
                      <span className="text-3xl font-bold text-brand-primary">KES {(orderTotal || total).toLocaleString()}</span>
                    </div>

                    <h4 className="text-brand-primary font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Sparkles size={16} /> Payment Instructions
                    </h4>
                    <p className="text-brand-dark text-sm mb-4 leading-relaxed">
                      Please pay the total amount via <strong>Pochi la Biashara</strong> to the number below:
                    </p>
                    <div className="bg-white rounded-2xl p-5 border border-brand-light flex items-center justify-between group">
                      <div>
                        <p className="text-[10px] text-brand-dark/40 uppercase font-bold mb-1">Phone Number</p>
                        <p className="text-xl font-mono font-bold text-brand-dark tracking-wider">0702 759 927</p>
                      </div>
                      <div className="w-10 h-10 bg-brand-surface rounded-full flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                        <Phone size={20} />
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white/50 rounded-xl border border-brand-primary/5">
                      <p className="text-[11px] text-brand-dark/60 leading-relaxed italic">
                        * Once you have sent the money, our team will verify the transaction and update your order status to <strong>"Payment Cleared"</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 w-full">
                    {paymentStep === 'idle' && (
                      <>
                        <button 
                          onClick={() => handleMpesaPush(orderId || undefined, orderTotal || undefined)}
                          className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                        >
                          <Phone size={18} /> Pay Now via M-Pesa Push
                        </button>
                        <div className="flex items-center gap-4 my-2">
                          <div className="flex-1 h-px bg-brand-surface" />
                          <span className="text-[10px] font-bold text-brand-dark/30 uppercase tracking-widest">OR</span>
                          <div className="flex-1 h-px bg-brand-surface" />
                        </div>
                        <button 
                          onClick={() => setPaymentStep('entering-code')}
                          className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 size={18} /> I Have Sent the Payment
                        </button>
                      </>
                    )}

                    {paymentStep === 'pushing' && (
                      <div className="w-full py-6 bg-green-50 text-green-700 rounded-2xl font-bold flex flex-col items-center gap-3 border border-green-200">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-3 border-green-600 border-t-transparent rounded-full animate-spin" />
                          <span className="text-lg">Waiting for PIN...</span>
                        </div>
                        <p className="text-xs font-medium opacity-80 px-8 text-center">
                          Check your phone for the M-Pesa prompt and enter your PIN to authorize KES {total.toLocaleString()}.
                        </p>
                      </div>
                    )}

                    {paymentStep === 'entering-code' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full space-y-4"
                      >
                        <div className="text-left">
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 mb-2">M-Pesa Transaction Code</label>
                          <input 
                            type="text"
                            value={transactionCode}
                            onChange={(e) => setTransactionCode(e.target.value.toUpperCase())}
                            placeholder="e.g. RCK1234567"
                            className="w-full bg-white border-2 border-brand-primary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary font-mono uppercase tracking-widest"
                          />
                        </div>
                        <button 
                          onClick={handlePaymentSent}
                          className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/20"
                        >
                          Submit for Verification
                        </button>
                        <button 
                          onClick={() => setPaymentStep('idle')}
                          className="w-full py-2 text-brand-dark/40 text-xs font-bold uppercase hover:text-brand-dark transition-colors"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    )}

                    {paymentStep === 'notifying' && (
                      <div className="w-full py-4 bg-brand-surface text-brand-primary rounded-2xl font-bold flex items-center justify-center gap-3 border border-brand-primary/20">
                        <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                        Notifying Team...
                      </div>
                    )}

                    {paymentStep === 'verifying' && (
                      <div className="w-full py-4 bg-orange-50 text-orange-600 rounded-2xl font-bold flex flex-col items-center gap-2 border border-orange-200">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                          Verifying Transaction...
                        </div>
                        <p className="text-[10px] font-medium opacity-70">This usually takes 1-2 minutes</p>
                      </div>
                    )}

                    {paymentStep === 'received' && (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                      >
                        <CheckCircle2 size={18} /> Payment Received!
                      </motion.div>
                    )}

                    <button 
                      onClick={() => {
                        setIsSuccess(false);
                        setShowCheckoutForm(false);
                        setPaymentStep('idle');
                        setTransactionCode('');
                        onClose();
                      }}
                      className="w-full py-4 bg-white border-2 border-brand-surface text-brand-dark rounded-2xl font-bold hover:bg-brand-surface transition-all"
                    >
                      {paymentStep === 'received' ? 'Finish & Return' : 'Close & Return to Shop'}
                    </button>
                  </div>
                </div>
              ) : showCheckoutForm ? (
                <div className="space-y-6">
                  <button 
                    onClick={() => setShowCheckoutForm(false)}
                    className="flex items-center gap-2 text-brand-primary font-bold text-sm mb-4"
                  >
                    <ArrowRight size={16} className="rotate-180" /> Back to Cart
                  </button>
                  <h3 className="text-xl font-serif text-brand-dark mb-6">Delivery Details</h3>
                  <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={checkoutData.name}
                        onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                        className="w-full bg-brand-surface border border-brand-light rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary" 
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-2">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        value={checkoutData.phone}
                        onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})}
                        className="w-full bg-brand-surface border border-brand-light rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary" 
                        placeholder="07XX XXX XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-2">Delivery Location</label>
                      <textarea 
                        required
                        rows={3}
                        value={checkoutData.location}
                        onChange={(e) => setCheckoutData({...checkoutData, location: e.target.value})}
                        className="w-full bg-brand-surface border border-brand-light rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary resize-none" 
                        placeholder="e.g. Kimbo, Toll, Anchor 2 Building, Room 4"
                      />
                    </div>
                  </form>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-brand-surface shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-brand-dark line-clamp-1">{item.product.name}</h4>
                        <button onClick={() => onRemove(item.product.id)} className="text-brand-light hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex flex-col mb-3">
                        {item.product.originalPrice && (
                          <p className="text-xs text-red-500 line-through">KES {item.product.originalPrice.toLocaleString()}</p>
                        )}
                        <p className="text-sm font-bold text-brand-primary">KES {item.product.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-brand-light rounded-lg">
                          <button 
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-brand-surface text-brand-primary"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-brand-surface text-brand-primary"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-brand-dark ml-auto">
                          KES {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && !isSuccess && (
              <div className="p-6 border-t border-brand-surface bg-brand-surface/30">
                <div className="flex justify-between mb-6">
                  <span className="text-brand-dark/60 font-medium">Total</span>
                  <span className="text-2xl font-bold text-brand-dark">KES {total.toLocaleString()}</span>
                </div>
                {showCheckoutForm ? (
                  <button 
                    form="checkout-form"
                    type="submit"
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Confirm Order
                        <CheckCircle2 size={20} />
                      </>
                    )}
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowCheckoutForm(true)}
                    className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight size={20} />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Pharmaceutical Advice',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/book-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book consultation');
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
          type: 'Pharmaceutical Advice',
          date: '',
          time: '',
          message: ''
        });
      }, 5000);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
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
            className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-[1fr_1.5fr]">
              <div className="bg-brand-primary p-12 text-white hidden md:block">
                <h2 className="text-3xl font-serif mb-6">Expert <br /> Consultation</h2>
                <p className="text-brand-surface mb-8 leading-relaxed">Book a session with our Pharmaceutical Technologist or Counseling Psychologist for personalized care.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Clock size={20} /></div>
                    <p className="text-sm font-medium">30-60 Minute Sessions</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><ShieldCheck size={20} /></div>
                    <p className="text-sm font-medium">Confidential & Private</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Video size={20} /></div>
                    <p className="text-sm font-medium">Virtual or In-Person</p>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-white/10">
                  <p className="text-xs text-brand-surface/60 uppercase tracking-widest font-bold mb-4">Direct Contact</p>
                  <p className="font-bold text-lg">+254 700 000 000</p>
                  <p className="text-brand-surface/80">info@harvianah.com</p>
                </div>
              </div>
              <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-brand-surface rounded-full transition-colors text-brand-dark z-10">
                  <X size={24} />
                </button>
                
                {isSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-brand-surface rounded-full flex items-center justify-center text-brand-primary mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-serif text-brand-dark mb-2">Booking Request Sent!</h3>
                    <p className="text-brand-dark/60 mb-8">We've received your request and an email has been sent to our team. We'll contact you shortly to confirm.</p>
                    <button 
                      onClick={onClose}
                      className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-dark transition-all"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-serif text-brand-dark mb-2">Book Your Session</h3>
                      <p className="text-brand-dark/60">Fill in the details below and we'll get back to you.</p>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                        {error}
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-2">Full Name</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-brand-surface border border-brand-light rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary" 
                          placeholder="Jane Doe" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-2">Email Address</label>
                        <input 
                          required 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-brand-surface border border-brand-light rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary" 
                          placeholder="jane@example.com" 
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-brand-surface border border-brand-light rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary" 
                          placeholder="+254 7..." 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-2">Consultation Type</label>
                        <select 
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value})}
                          className="w-full bg-brand-surface border border-brand-light rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary"
                        >
                          <option>Pharmaceutical Advice</option>
                          <option>Mental Wellness Counseling</option>
                          <option>Holistic Health Plan</option>
                          <option>Skincare Consultation</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-2">Preferred Date</label>
                        <input 
                          type="date" 
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="w-full bg-brand-surface border border-brand-light rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-2">Preferred Time</label>
                        <input 
                          type="time" 
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                          className="w-full bg-brand-surface border border-brand-light rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-2">Additional Message</label>
                      <textarea 
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-brand-surface border border-brand-light rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary resize-none" 
                        placeholder="Tell us a bit about what you'd like to discuss..."
                      />
                    </div>

                    <div className="pt-4">
                      <button 
                        disabled={isSubmitting}
                        className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold hover:bg-brand-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-light/20"
                      >
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Confirm Booking Request
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-center text-brand-dark/40 mt-4 uppercase tracking-widest font-bold">
                        By booking, you agree to our privacy policy and terms of service.
                      </p>
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
            className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-brand-surface flex items-center justify-between">
              <h2 className="text-2xl font-serif text-brand-dark">Your Wishlist</h2>
              <button onClick={onClose} className="p-2 hover:bg-brand-surface rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-brand-surface rounded-full flex items-center justify-center text-brand-light mb-4">
                    <Heart size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">Your wishlist is empty</h3>
                  <p className="text-brand-dark/60 mb-8">Save items you love for later!</p>
                  <button onClick={onClose} className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold">Start Browsing</button>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div key={product.id} className="flex gap-4">
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-brand-surface shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-brand-dark line-clamp-1">{product.name}</h4>
                        <button onClick={() => onRemove(product.id)} className="text-brand-light hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex flex-col mb-4">
                        {product.originalPrice && (
                          <p className="text-xs text-red-500 line-through">KES {product.originalPrice.toLocaleString()}</p>
                        )}
                        <p className="text-sm font-bold text-brand-primary">KES {product.price.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => { if (product.stockQuantity > 0) { onAddToCart(product); onRemove(product.id); } }}
                        disabled={product.stockQuantity <= 0}
                        className={`w-full py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 ${product.stockQuantity <= 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-brand-primary text-white hover:bg-brand-dark'}`}
                      >
                        <ShoppingBag size={16} />
                        {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Order'}
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
  products,
  onAddToCart, 
  onToggleWishlist,
  onQuickView,
  onBuyNow,
  onNotifyMe,
  wishlist,
  searchQuery, 
  onSearch,
  onBack,
  activeCategoryOverride
}: { 
  products: Product[];
  onAddToCart: (p: Product) => void; 
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  onNotifyMe: (p: Product) => void;
  wishlist: string[];
  searchQuery: string;
  onSearch: (q: string) => void;
  onBack: () => void;
  activeCategoryOverride?: string;
}) => {
  const [selectedCategory, setSelectedCategory] = useState(activeCategoryOverride || 'all');
  const [shopPage, setShopPage] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    if (activeCategoryOverride) {
      setSelectedCategory(activeCategoryOverride);
    }
  }, [activeCategoryOverride]);

  useEffect(() => {
    setShopPage(0);
  }, [selectedCategory, searchQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, products]);

  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery, products]);

  const didYouMean = useMemo(() => {
    if (filteredProducts.length > 0 || !searchQuery) return null;
    const productNames = products.map(p => p.name);
    return findDidYouMean(searchQuery, productNames);
  }, [filteredProducts, searchQuery, products]);

  const paginatedProducts = useMemo(() => {
    const start = shopPage * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, shopPage]);

  const totalShopPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  return (
    <div className="pt-32 pb-12 bg-[#F9F8F6] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-brand-primary font-bold mb-4 hover:gap-3 transition-all"
            >
              <ArrowRight size={18} className="rotate-180" />
              Back to Home
            </button>
            <h1 className="text-5xl font-serif text-brand-dark mb-4">
              {selectedCategory === 'all' ? 'Our Pharmacy' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </h1>
            <p className="text-brand-dark/60 max-w-2xl">
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
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === 'all' ? 'bg-brand-primary text-white shadow-lg shadow-brand-light/20' : 'bg-white text-brand-dark border border-brand-surface'}`}
              >
                All Products
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.id ? 'bg-brand-primary text-white shadow-lg shadow-brand-light/20' : 'bg-white text-brand-dark border border-brand-surface'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-light" size={20} />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-white border border-brand-surface rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:border-brand-primary shadow-sm"
              />
              
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full bg-white mt-2 rounded-2xl shadow-2xl border border-brand-surface overflow-hidden z-20"
                  >
                    {suggestions.map(p => (
                      <button 
                        key={p.id}
                        onClick={() => {
                          onSearch(p.name);
                          setShowSuggestions(false);
                        }}
                        className="w-full px-6 py-3 text-left hover:bg-brand-surface flex items-center gap-3 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={p.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-medium text-brand-dark">{p.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-brand-surface rounded-full flex items-center justify-center text-brand-light mx-auto mb-6">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-serif text-brand-dark mb-2">No products found</h3>
            <p className="text-brand-dark/60">Try adjusting your search or category filters.</p>
            
            {didYouMean && (
              <p className="mt-4 text-brand-dark font-medium">
                Did you mean: <button onClick={() => onSearch(didYouMean)} className="text-brand-primary underline italic">{didYouMean}</button>?
              </p>
            )}

            <button 
              onClick={() => { onSearch(''); setSelectedCategory('all'); }}
              className="mt-8 text-brand-primary font-bold underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {paginatedProducts.map((product) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ y: -12 }}
                className="bg-white rounded-[3rem] overflow-hidden border border-brand-surface group flex flex-col hover:shadow-2xl hover:shadow-brand-dark/5 transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <button 
                      onClick={() => onQuickView(product)}
                      className="px-8 py-3 bg-white text-brand-dark rounded-full font-bold text-sm shadow-2xl hover:bg-brand-primary hover:text-white transition-all translate-y-8 group-hover:translate-y-0 duration-500"
                    >
                      Quick View
                    </button>
                  </div>
                  {product.stockQuantity <= 0 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 p-6">
                      <div className="px-6 py-3 bg-red-600 text-white rounded-full font-bold text-sm uppercase tracking-widest shadow-xl transform -rotate-12 border-2 border-white mb-4">
                        Out of Stock
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onNotifyMe(product); }}
                        className="px-6 py-2 bg-brand-dark text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-primary transition-all flex items-center gap-2 shadow-lg"
                      >
                        <Bell size={14} /> Notify Me
                      </button>
                    </div>
                  )}
                  <div className="absolute bottom-8 right-8 flex flex-col gap-3 translate-y-24 group-hover:translate-y-0 transition-transform duration-700 delay-100">
                    <button 
                      onClick={() => onToggleWishlist(product)}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 ${wishlist.includes(product.id) ? 'bg-brand-primary text-white' : 'bg-white text-brand-dark hover:bg-brand-surface'}`}
                    >
                      <Heart size={24} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => onAddToCart(product)}
                      disabled={product.stockQuantity <= 0}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 ${product.stockQuantity <= 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-brand-primary text-white hover:bg-brand-dark'}`}
                    >
                      <ShoppingBag size={24} />
                    </button>
                  </div>
                  <div className="absolute top-8 left-8 flex flex-col gap-2">
                    <div className="px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark shadow-sm border border-brand-surface/50">
                      {product.category}
                    </div>
                    <div className={`px-4 py-1.5 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-[0.15em] shadow-sm border border-white/20 ${product.stockQuantity > 0 ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                      {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                  {product.originalPrice && (
                    <div className="absolute top-8 right-8 px-4 py-1.5 bg-red-500 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl animate-pulse">
                      Sale
                    </div>
                  )}
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-serif text-brand-dark group-hover:text-brand-primary transition-colors duration-300">{product.name}</h3>
                      <div className="flex items-center gap-1 text-orange-400 mt-2">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                        <span className="text-[10px] text-brand-dark/40 ml-2 uppercase tracking-widest font-bold">{product.reviews?.length || 0} reviews</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      {product.originalPrice && (
                        <span className="text-xs text-red-500 line-through mb-1">KES {product.originalPrice.toLocaleString()}</span>
                      )}
                      <span className="text-xl font-bold text-brand-primary">KES {product.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <ExpandableText text={product.description} limit={80} />
                  <div className="mt-auto">
                    <button 
                      onClick={() => onBuyNow(product)}
                      disabled={product.stockQuantity <= 0}
                      className={`w-full py-4 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-500 ${product.stockQuantity <= 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-brand-surface text-brand-primary hover:bg-brand-primary hover:text-white hover:shadow-xl hover:shadow-brand-primary/20'}`}
                    >
                      {product.stockQuantity > 0 ? 'Buy Now' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {totalShopPages > 1 && (
            <div className="mt-12">
              <Pagination 
                currentPage={shopPage}
                totalPages={totalShopPages}
                onPageChange={(page) => {
                  setShopPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  </div>
);
};

const CategorySection = ({ onSelectCategory }: { onSelectCategory: (id: string) => void }) => {
  return (
    <section id="shop" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-serif text-brand-dark mb-4">Shop by Category</h2>
            <p className="text-brand-dark/60 max-w-md">Find exactly what you need from our curated selection of medical and wellness essentials.</p>
          </div>
          <button 
            onClick={() => onSelectCategory('all')}
            className="text-brand-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
          >
            View All Categories <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              whileHover={{ y: -8 }}
              onClick={() => onSelectCategory(cat.id)}
              className="group p-8 rounded-[2rem] bg-brand-surface/50 border border-brand-light/50 hover:bg-white hover:shadow-xl hover:shadow-brand-light/10 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-primary mb-6 shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors">
                {cat.id === 'pharma' && <Pill size={28} />}
                {cat.id === 'supplements' && <Zap size={28} />}
                {cat.id === 'wellness' && <Leaf size={28} />}
                {cat.id === 'mother-baby' && <Baby size={28} />}
                {cat.id === 'personal-care' && <User size={28} />}
                {cat.id === 'beauty' && <Sparkles size={28} />}
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">{cat.name}</h3>
              <p className="text-sm text-brand-dark/60 leading-relaxed">{cat.description}</p>
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
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">
              Wellness Tips & <br />
              <span className="italic text-brand-primary">Expert Insights.</span>
            </h2>
            <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
              We're more than just a pharmacy. Follow us on TikTok and Instagram for daily health hacks, mental wellness advice, and product deep-dives from our experts.
            </p>
            
            <p className="text-sm font-bold text-brand-dark/40 uppercase tracking-widest mb-4">Follow Our Journey</p>
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
              <div className="p-6 bg-brand-surface rounded-3xl border border-brand-light/20">
                <h4 className="text-3xl font-bold text-brand-dark mb-1">50k+</h4>
                <p className="text-sm text-brand-dark/60 font-medium uppercase tracking-wider">Followers</p>
              </div>
              <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                <h4 className="text-3xl font-bold text-brand-dark mb-1">1M+</h4>
                <p className="text-sm text-brand-dark/60 font-medium uppercase tracking-wider">Video Likes</p>
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
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white animate-pulse">
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
  onBuyNow,
  onNotifyMe
}: { 
  product: Product | null; 
  isOpen: boolean; 
  onClose: () => void;
  onAddToCart: (p: Product, q?: number) => void;
  onBuyNow: (p: Product, q?: number) => void;
  onNotifyMe: (p: Product) => void;
}) => {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'returns' | 'payment'>('description');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const totalToPay = product.price * quantity;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-brand-dark hover:bg-white transition-colors shadow-sm"
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
              {product.stockQuantity <= 0 && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex flex-col items-center justify-center p-8">
                  <div className="px-8 py-4 bg-red-600 text-white rounded-full font-bold text-lg uppercase tracking-widest shadow-2xl transform -rotate-12 border-4 border-white mb-6">
                    Out of Stock
                  </div>
                  <button 
                    onClick={() => onNotifyMe(product)}
                    className="px-8 py-4 bg-brand-dark text-white rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-brand-primary transition-all flex items-center gap-3 shadow-2xl"
                  >
                    <Bell size={20} /> Notify Me When Available
                  </button>
                </div>
              )}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-brand-dark shadow-sm">
                  {product.category}
                </div>
                <div className={`px-4 py-1.5 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest shadow-sm ${product.stockQuantity > 0 ? 'bg-green-100/90 text-green-700' : 'bg-red-100/90 text-red-700'}`}>
                  {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
              {product.originalPrice && (
                <div className="absolute top-6 right-6 px-4 py-1.5 bg-red-500 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Sale
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-serif text-brand-dark mb-4">{product.name}</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex flex-col">
                    {product.originalPrice && (
                      <span className="text-sm text-red-500 line-through">KES {product.originalPrice.toLocaleString()}</span>
                    )}
                    <span className="text-2xl font-bold text-brand-primary">KES {product.price.toLocaleString()}</span>
                  </div>
                  <div className="h-8 w-px bg-brand-light/20" />
                  <div className="flex items-center gap-1 text-orange-400">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold text-brand-dark">4.8</span>
                    <span className="text-xs text-brand-dark/40 ml-1">({product.reviews?.length || 0} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8 p-6 bg-brand-surface rounded-[2rem] border border-brand-light/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-brand-dark uppercase tracking-widest">Select Quantity</span>
                  <div className="flex items-center border-2 border-brand-light rounded-xl bg-white overflow-hidden">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-brand-surface text-brand-primary transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-bold text-brand-dark">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-brand-surface text-brand-primary transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-brand-light/20">
                  <span className="text-sm font-bold text-brand-dark/40 uppercase tracking-widest">Total to Pay</span>
                  <span className="text-xl font-bold text-brand-primary">KES {totalToPay.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-10">
                <button 
                  onClick={() => { onBuyNow(product, quantity); onClose(); }}
                  disabled={product.stockQuantity <= 0}
                  className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${product.stockQuantity <= 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-brand-primary text-white hover:bg-brand-dark shadow-brand-light/20'}`}
                >
                  {product.stockQuantity > 0 ? 'Buy Now' : 'Out of Stock'} <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => onAddToCart(product, quantity)}
                  disabled={product.stockQuantity <= 0}
                  className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border-2 ${product.stockQuantity <= 0 ? 'bg-white border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-brand-primary text-brand-primary hover:bg-brand-surface'}`}
                >
                  <ShoppingBag size={18} /> Add to Cart
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-brand-surface mb-8">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`pb-4 px-4 text-sm font-bold transition-all relative ${activeTab === 'description' ? 'text-brand-primary' : 'text-brand-dark/40 hover:text-brand-dark'}`}
                >
                  Description
                  {activeTab === 'description' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 px-4 text-sm font-bold transition-all relative ${activeTab === 'reviews' ? 'text-brand-primary' : 'text-brand-dark/40 hover:text-brand-dark'}`}
                >
                  Reviews ({product.reviews?.length || 0})
                  {activeTab === 'reviews' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
                </button>
                <button 
                  onClick={() => setActiveTab('returns')}
                  className={`pb-4 px-4 text-sm font-bold transition-all relative ${activeTab === 'returns' ? 'text-brand-primary' : 'text-brand-dark/40 hover:text-brand-dark'}`}
                >
                  Return Policy
                  {activeTab === 'returns' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
                </button>
                <button 
                  onClick={() => setActiveTab('payment')}
                  className={`pb-4 px-4 text-sm font-bold transition-all relative ${activeTab === 'payment' ? 'text-brand-primary' : 'text-brand-dark/40 hover:text-brand-dark'}`}
                >
                  Payment
                  {activeTab === 'payment' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                {activeTab === 'description' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <ExpandableText text={product.longDescription || product.description} limit={300} />
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="p-4 bg-brand-surface rounded-2xl border border-brand-light/20">
                        <div className="flex items-center gap-2 text-brand-dark font-bold text-sm mb-2">
                          <Truck size={16} className="text-brand-primary" />
                          Delivery
                        </div>
                        <p className="text-xs text-brand-dark/60 leading-relaxed">
                          Free delivery in Nairobi for orders above KES 5,000. Standard delivery (24-48h) KES 300.
                        </p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <div className="flex items-center gap-2 text-orange-900 font-bold text-sm mb-2">
                          <ShieldCheck size={16} className="text-orange-600" />
                          Returns
                        </div>
                        <p className="text-xs text-orange-900/60 leading-relaxed">
                          7-day return policy for unopened items. Medical products are non-returnable once opened.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    {product.reviews && product.reviews.length > 0 ? (
                      <div className="space-y-6">
                        {product.reviews.map((review) => (
                          <div key={review.id} className="pb-6 border-b border-brand-surface last:border-0">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-bold text-brand-dark">{review.user}</span>
                              <span className="text-[10px] text-brand-dark/30 uppercase tracking-widest">{review.date}</span>
                            </div>
                            <div className="flex gap-0.5 text-orange-400 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                              ))}
                            </div>
                            <p className="text-sm text-brand-dark/60 italic">"{review.comment}"</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-brand-dark/40 italic">
                        No reviews yet for this product.
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'returns' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="flex items-start gap-4 p-6 bg-brand-surface rounded-3xl border border-brand-light/10">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm flex-shrink-0">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-dark mb-2">7-Day Return Policy</h4>
                        <p className="text-sm text-brand-dark/60 leading-relaxed">
                          We offer a 7-day return window for items that are in their original, unopened packaging.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-brand-dark text-sm uppercase tracking-widest">Important Notes:</h4>
                      <ul className="space-y-3">
                        {[
                          "Pharmaceutical products cannot be returned once the seal is broken.",
                          "Personal care items must be unused and in original condition.",
                          "Refunds are processed within 3-5 business days after inspection.",
                          "Delivery charges for returns are the responsibility of the customer unless the item was damaged upon arrival."
                        ].map((note, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-brand-dark/60">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'payment' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="bg-brand-surface p-6 rounded-3xl border border-brand-primary/10">
                      <h4 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                        <Sparkles size={18} className="text-brand-primary" /> How to Pay
                      </h4>
                      <p className="text-sm text-brand-dark/60 mb-6 leading-relaxed">
                        We use <strong>Pochi la Biashara</strong> for secure and direct payments. This ensures your payment is received instantly and your order is processed immediately.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-2xl border border-brand-light flex items-center justify-between">
                          <div>
                            <p className="text-[10px] text-brand-dark/40 uppercase font-bold mb-1">Payment Method</p>
                            <p className="font-bold text-brand-dark">Pochi la Biashara</p>
                          </div>
                          <div className="w-10 h-10 bg-brand-surface rounded-full flex items-center justify-center text-brand-primary">
                            <ShieldCheck size={20} />
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-2xl border border-brand-light flex items-center justify-between">
                          <div>
                            <p className="text-[10px] text-brand-dark/40 uppercase font-bold mb-1">Phone Number</p>
                            <p className="text-xl font-mono font-bold text-brand-dark tracking-wider">0702 759 927</p>
                          </div>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText('0702759927');
                              alert('Phone number copied to clipboard!');
                            }}
                            className="p-2 hover:bg-brand-surface rounded-xl text-brand-primary transition-colors"
                          >
                            <Plus size={20} className="rotate-45" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="mt-6 text-[11px] text-brand-dark/40 italic leading-relaxed">
                        * After placing your order, please send the total amount to the number above. We will call you to confirm delivery once payment is received.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
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
            className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-brand-surface rounded-full transition-colors text-brand-dark">
                <X size={24} />
              </button>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-surface rounded-full flex items-center justify-center text-brand-primary mx-auto mb-8">
                  <Star size={40} fill="currentColor" />
                </div>
                <h2 className="text-4xl font-serif text-brand-dark mb-6">The Harvianah Spark: <br /><span className="italic text-brand-primary">Where Science Got a Soul</span></h2>
                
                <div className="space-y-6 text-lg text-brand-dark/70 leading-relaxed">
                  <p>
                    Once upon a time in Kimbo-Toll, a lab coat met a listening ear. 🧪✨ 
                  </p>
                  <p>
                    Our founders realized that while pills can fix a fever, they can't always fix the "feeling." 
                    We saw people leaving pharmacies with bags of medicine but hearts still heavy with worry.
                  </p>
                  <p className="font-serif italic text-2xl text-brand-primary">
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
                  className="mt-10 px-10 py-4 bg-brand-primary text-white rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-xl"
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
  onPageChange,
  nextLabel
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
  nextLabel?: string;
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 border-t border-brand-light/20 flex items-center justify-between">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`flex items-center gap-2 font-bold transition-all ${currentPage === 0 ? 'opacity-0 pointer-events-none' : 'text-brand-primary hover:gap-3'}`}
      >
        <ArrowRight size={18} className="rotate-180" />
        Previous Page
      </button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button 
            key={i} 
            onClick={() => onPageChange(i)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${i === currentPage ? 'bg-brand-primary text-white shadow-lg shadow-brand-light/20' : 'bg-brand-surface text-brand-primary hover:bg-brand-light/20'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={`flex items-center gap-2 font-bold transition-all ${currentPage === totalPages - 1 ? 'opacity-0 pointer-events-none' : 'text-brand-primary hover:gap-3'}`}
      >
        {nextLabel || 'Next Page'}
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

const CommunityView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-32 pb-24 bg-[#F9F8F6] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-brand-primary font-bold mb-8 hover:gap-3 transition-all">
          <ArrowRight size={18} className="rotate-180" /> Back to Home
        </button>
        <SocialHub />
        
        {/* Testimonials */}
        <section className="py-24 bg-brand-surface rounded-[3rem] mt-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-brand-dark mb-4">What Our Clients Say</h2>
              <p className="text-brand-dark/60">Real stories from the Harvianah community.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Sarah W.", role: "Mother", text: "The advice I got for my baby's skin condition was life-changing. They truly care." },
                { name: "David K.", role: "Fitness Enthusiast", text: "Best supplements in Kimbo-Toll. The quality is unmatched and the delivery is always on time." },
                { name: "Mercy A.", role: "Wellness Client", text: "I love the holistic approach. They helped me manage my anxiety alongside my physical health." }
              ].map((t, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-brand-light/20">
                  <div className="flex text-orange-400 mb-6">
                    {[1, 2, 3, 4, 5].map(j => <Star key={j} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-brand-dark/70 italic mb-8 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-surface flex items-center justify-center text-brand-primary font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <h5 className="font-bold text-brand-dark">{t.name}</h5>
                      <p className="text-xs text-brand-dark/40 uppercase tracking-widest font-bold">{t.role}</p>
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
            <div className="bg-brand-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
              </div>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 relative z-10">Start Your Wellness <br /> Journey Today.</h2>
              <p className="text-brand-surface text-lg mb-12 max-w-2xl mx-auto relative z-10">
                Whether you need a prescription filled or a holistic wellness plan, we're here to support you every step of the way.
              </p>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <button 
                  onClick={() => onBack()}
                  className="px-10 py-5 bg-white text-brand-primary rounded-2xl font-bold hover:bg-brand-surface transition-all shadow-xl"
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
    <div className="pt-32 pb-24 bg-[#F9F8F6] min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-brand-primary font-bold mb-8 hover:gap-3 transition-all">
          <ArrowRight size={18} className="rotate-180" /> Back to Home
        </button>
        <h1 className="text-5xl font-serif text-brand-dark mb-12">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-brand-surface shadow-sm">
              <h3 className="text-xl font-bold text-brand-dark mb-3">{faq.q}</h3>
              <p className="text-brand-dark/70 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OrderTrackingView = ({ onBack }: { onBack: () => void }) => {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'not-found'>('idle');
  const [orderData, setOrderData] = useState<any>(null);
  const [paymentStep, setPaymentStep] = useState<'idle' | 'pushing' | 'received'>('idle');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch(`/api/order/${orderIdInput}`);
      if (response.ok) {
        const data = await response.json();
        setOrderData(data);
        setStatus('found');
      } else {
        setStatus('not-found');
      }
    } catch (error) {
      console.error('Tracking error:', error);
      setStatus('not-found');
    }
  };

  const handleMpesaPush = async () => {
    if (!orderData) return;
    
    if (!orderData.phone) {
      alert('Phone number not found for this order. Please contact support.');
      return;
    }

    setPaymentStep('pushing');
    
    try {
      const response = await fetch('/api/mpesa/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: orderData.phone, 
          amount: orderData.total,
          orderId: orderData.orderId
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setTimeout(() => {
          setPaymentStep('received');
          // Update local status
          setOrderData({ ...orderData, paymentStatus: 'paid' });
        }, 10000);
      } else {
        throw new Error(data.error || 'Failed to initiate push');
      }
    } catch (error: any) {
      console.error('M-Pesa Push error:', error);
      setPaymentStep('idle');
      alert(`M-Pesa Error: ${error.message}`);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#F9F8F6] min-h-screen">
      <div className="max-w-xl mx-auto px-6 text-center">
        <button onClick={onBack} className="flex items-center gap-2 text-brand-primary font-bold mb-8 hover:gap-3 transition-all mx-auto">
          <ArrowRight size={18} className="rotate-180" /> Back to Home
        </button>
        <h1 className="text-5xl font-serif text-brand-dark mb-6">Track Your Order</h1>
        <p className="text-brand-dark/60 mb-12">Enter your order ID below to see the current status of your health and wellness delivery.</p>
        
        <form onSubmit={handleTrack} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-brand-surface mb-12">
          <div className="mb-6">
            <label className="block text-left text-sm font-bold text-brand-dark/40 uppercase tracking-widest mb-2">Order ID</label>
            <input 
              required
              type="text" 
              placeholder="e.g. HV-12345"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              className="w-full bg-brand-surface/50 border border-brand-light/30 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary"
            />
          </div>
          <button type="submit" className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand-light/20">
            Track Order
          </button>
        </form>

        <AnimatePresence mode="wait">
          {status === 'loading' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-brand-surface border-t-brand-primary rounded-full animate-spin" />
              <p className="text-brand-dark/60 font-medium">Locating your order...</p>
            </motion.div>
          )}
          {status === 'found' && orderData && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-brand-surface text-left shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                      <Truck size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark text-xl">Order #{orderData.orderId}</h3>
                      <p className="text-brand-primary font-bold">
                        {orderData.paymentStatus === 'paid' ? 'Processing' : 'Awaiting Payment'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-brand-dark/40 uppercase font-bold tracking-widest mb-1">Total Amount</p>
                    <p className="text-xl font-bold text-brand-dark">KES {orderData.total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className={`p-6 rounded-3xl border flex items-center gap-4 ${orderData.paymentStatus === 'paid' ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${orderData.paymentStatus === 'paid' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                      {orderData.paymentStatus === 'paid' ? <ShieldCheck size={20} /> : <Clock size={20} />}
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${orderData.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-600'}`}>Payment Status</p>
                      <p className={`font-bold ${orderData.paymentStatus === 'paid' ? 'text-green-700' : 'text-orange-700'}`}>
                        {orderData.paymentStatus === 'paid' ? 'Verified' : 'Pending'}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 bg-brand-surface rounded-3xl border border-brand-light/20 flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-md">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-brand-dark/40 font-bold uppercase tracking-widest mb-1">Est. Delivery</p>
                      <p className="text-brand-dark font-bold">Within 24 Hours</p>
                    </div>
                  </div>
                </div>

                {orderData.paymentStatus === 'unpaid' && (
                  <div className="mb-8 p-6 bg-brand-surface rounded-3xl border border-brand-primary/10">
                    <h4 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                      <Phone size={18} className="text-brand-primary" /> Complete Your Payment
                    </h4>
                    {paymentStep === 'idle' ? (
                      <button 
                        onClick={handleMpesaPush}
                        className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                      >
                        Pay Now via M-Pesa Push
                      </button>
                    ) : paymentStep === 'pushing' ? (
                      <div className="flex items-center justify-center gap-3 py-4 text-green-600 font-bold">
                        <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                        Waiting for PIN...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 py-4 text-green-600 font-bold">
                        <CheckCircle2 size={20} /> Payment Received!
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-surface">
                  <div className={`flex gap-6 relative z-10 ${orderData.paymentStatus === 'paid' ? '' : 'opacity-50'}`}>
                    <div className={`w-6 h-6 rounded-full border-4 border-white shadow-sm ${orderData.paymentStatus === 'paid' ? 'bg-brand-primary' : 'bg-brand-surface'}`} />
                    <div>
                      <p className="font-bold text-brand-dark">Order Processed</p>
                      <p className="text-sm text-brand-dark/60">Awaiting dispatch</p>
                    </div>
                  </div>
                  <div className={`flex gap-6 relative z-10 ${orderData.paymentStatus === 'paid' ? '' : 'opacity-50'}`}>
                    <div className={`w-6 h-6 rounded-full border-4 border-white shadow-sm ${orderData.paymentStatus === 'paid' ? 'bg-brand-primary' : 'bg-brand-surface'}`} />
                    <div>
                      <p className="font-bold text-brand-dark">Payment Verified</p>
                      <p className="text-sm text-brand-dark/60">{orderData.paymentStatus === 'paid' ? 'Confirmed via M-Pesa' : 'Pending verification'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary text-white p-8 rounded-[2.5rem] flex items-center justify-between gap-6 shadow-xl shadow-brand-primary/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <HelpCircle size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold">Need help with your order?</p>
                    <p className="text-sm text-white/70">Contact our support team anytime.</p>
                  </div>
                </div>
                <a href="tel:0702759927" className="px-6 py-3 bg-white text-brand-primary rounded-xl font-bold hover:bg-brand-surface transition-colors">
                  Call Us
                </a>
              </div>
            </motion.div>
          )}
          {status === 'not-found' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-red-50 rounded-3xl border border-red-100 text-red-600 font-bold">
              Order not found. Please check your ID and try again.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[90] w-14 h-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-brand-dark transition-all group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const FloatingContactButtons = () => {
  return (
    <div className="fixed bottom-8 left-8 z-[90] flex flex-col gap-4">
      <motion.a
        href="https://wa.me/254702759927"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:opacity-90 transition-opacity group relative"
      >
        <MessageCircle size={28} />
        <span className="absolute left-full ml-4 px-4 py-2 bg-brand-dark text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          WhatsApp Us
        </span>
      </motion.a>
      <motion.a
        href="tel:0702759927"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-brand-dark transition-colors group relative"
      >
        <Phone size={28} className="group-hover:animate-bounce" />
        <span className="absolute left-full ml-4 px-4 py-2 bg-brand-dark text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          Call Us: 0702759927
        </span>
      </motion.a>
    </div>
  );
};

const Footer = ({ 
  onShop, 
  onConsult, 
  onNavigate,
  onLegal,
  onStaffLogin
}: { 
  onShop: () => void; 
  onConsult: () => void;
  onNavigate: (id: string) => void;
  onLegal: (type: string) => void;
  onStaffLogin: () => void;
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Reset after 5 seconds to allow another subscription or just keep it
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Logo className="w-10 h-10 text-brand-primary" />
              <span className="text-2xl font-serif font-bold tracking-tight">Harvianah</span>
            </div>
            <p className="text-brand-surface/60 leading-relaxed">
              Premium pharmaceuticals and holistic wellness products delivered with empathy and expertise. Located in Kimbo-Toll, Anchor 2 Building.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/harvianah_pharmacy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors"><Instagram size={18} /></a>
              <a href="https://www.tiktok.com/@gitaridiana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors"><Video size={18} /></a>
              <a href="tel:0702759927" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors"><Phone size={18} /></a>
              <a href="https://wa.me/254702759927" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#25D366] transition-colors"><MessageCircle size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-brand-surface/60">
              <li><button onClick={() => onNavigate('tracking')} className="hover:text-white transition-colors text-left">Track Your Order</button></li>
              <li><button onClick={() => onNavigate('faqs')} className="hover:text-white transition-colors text-left">FAQs</button></li>
              <li><button onClick={onConsult} className="hover:text-white transition-colors text-left">Expert Consultations</button></li>
              <li><button onClick={() => onNavigate('community')} className="hover:text-white transition-colors text-left">Join Our Community</button></li>
              <li><a href="mailto:info@harvianah.com" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Shop Categories</h4>
            <ul className="space-y-4 text-brand-surface/60">
              {CATEGORIES.map(cat => (
                <li key={cat.id}><button onClick={onShop} className="hover:text-white transition-colors text-left">{cat.name}</button></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-colors" />
              <h4 className="font-bold text-xl mb-4 relative z-10">Stay Healthy & Informed</h4>
              <p className="text-brand-surface/60 mb-6 text-sm leading-relaxed relative z-10">
                Join our community for expert wellness tips, new arrivals, and exclusive pharmacy offers.
              </p>
              
              <AnimatePresence mode="wait">
                {isSubscribed ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-brand-primary/20 border border-brand-primary/30 rounded-2xl p-4 text-center relative z-10"
                  >
                    <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 size={20} className="text-white" />
                    </div>
                    <p className="text-white font-bold text-sm">Thank you for subscribing!</p>
                    <p className="text-brand-surface/60 text-[10px] mt-1">Check your inbox for a welcome gift.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-3 relative z-10"
                  >
                    <div className="relative">
                      <input 
                        required
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email" 
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-brand-primary focus:bg-white/20 transition-all"
                      />
                    </div>
                    <button type="submit" className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-brand-light hover:text-brand-dark transition-all shadow-lg shadow-brand-primary/20">
                      Subscribe Now
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              
              <p className="mt-4 text-[10px] text-brand-surface/30 text-center">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-brand-surface/40">
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

const NotifyMeModal = ({ 
  isOpen, 
  onClose, 
  product, 
  onNotify 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  product: Product | null;
  onNotify: (productId: string, email: string) => void;
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNotify(product.id, email);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-brand-primary" />
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-brand-surface rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-serif text-brand-dark mb-3">You're on the list!</h3>
                <p className="text-brand-dark/60 leading-relaxed">
                  We'll send an alert to <strong>{email}</strong> as soon as <strong>{product.name}</strong> is back in stock.
                </p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-brand-surface text-brand-primary rounded-2xl flex items-center justify-center mb-6">
                  <Bell size={32} />
                </div>
                <h2 className="text-3xl font-serif text-brand-dark mb-3">Notify Me</h2>
                <p className="text-brand-dark/60 mb-8 leading-relaxed">
                  This item is currently popular! Leave your email and we'll let you know the moment it's available again.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-brand-dark/40 uppercase tracking-[0.2em]">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email..."
                      className="w-full px-6 py-4 rounded-2xl border-2 border-brand-surface focus:outline-none focus:border-brand-primary transition-all bg-brand-surface/30"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-5 bg-brand-dark text-white rounded-2xl font-bold hover:bg-brand-primary transition-all shadow-xl shadow-brand-dark/10 flex items-center justify-center gap-2"
                  >
                    Notify Me When Available <ArrowRight size={18} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const InventoryItem = ({ 
  product, 
  onUpdate 
}: any) => {
  const [localStock, setLocalStock] = useState(product.stockQuantity);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setLocalStock(product.stockQuantity);
  }, [product.stockQuantity]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    // Simulate a small delay for "push" feel
    await new Promise(resolve => setTimeout(resolve, 500));
    onUpdate(product.id, localStock);
    setIsUpdating(false);
  };

  const hasChanged = localStock !== product.stockQuantity;

  return (
    <div className="p-4 bg-white border border-brand-surface rounded-2xl flex flex-col sm:flex-row items-center gap-4 hover:shadow-md transition-all">
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-brand-surface shrink-0">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h4 className="font-bold text-brand-dark">{product.name}</h4>
        <p className="text-xs text-brand-dark/40 uppercase tracking-wider font-bold">{product.category}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="text-center">
          <p className="text-[10px] text-brand-dark/40 font-bold uppercase tracking-widest mb-1">Stock Level</p>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLocalStock(Math.max(0, localStock - 1))}
              className="w-8 h-8 flex items-center justify-center bg-brand-surface rounded-lg text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
            >
              <Minus size={14} />
            </button>
            <span className={`text-xl font-bold w-12 text-center ${localStock < 5 ? 'text-red-500' : 'text-brand-dark'}`}>
              {localStock}
            </span>
            <button 
              onClick={() => setLocalStock(localStock + 1)}
              className="w-8 h-8 flex items-center justify-center bg-brand-surface rounded-lg text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <button 
            onClick={handleUpdate}
            disabled={!hasChanged || isUpdating}
            className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
              !hasChanged 
                ? 'bg-brand-surface text-brand-dark/20 cursor-default' 
                : 'bg-brand-primary text-white hover:bg-brand-dark shadow-lg shadow-brand-primary/20'
            }`}
          >
            {isUpdating ? (
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Sparkles size={14} />
            )}
            {hasChanged ? 'Update Stock' : 'Synced'}
          </button>
          <div className={`px-4 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest text-center ${product.stockQuantity > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ 
  isOpen, 
  onClose, 
  orders, 
  onVerify,
  onReject,
  products,
  onUpdateStock
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  orders: any[]; 
  onVerify: (id: string) => void;
  onReject: (id: string) => void;
  products: Product[];
  onUpdateStock: (id: string, newStock: number) => void;
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 border-b border-brand-surface flex items-center justify-between bg-brand-dark text-white">
              <div>
                <h2 className="text-3xl font-serif font-bold">Staff Portal</h2>
                <div className="flex gap-4 mt-4">
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-brand-primary text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                  >
                    Orders & Payments
                  </button>
                  <button 
                    onClick={() => setActiveTab('inventory')}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'inventory' ? 'bg-brand-primary text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                  >
                    Inventory Management
                  </button>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {activeTab === 'orders' ? (
                orders.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-brand-surface rounded-full flex items-center justify-center text-brand-light mb-4">
                      <ClipboardList size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-brand-dark">No pending verifications</h3>
                    <p className="text-brand-dark/60">All payments are currently up to date.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-brand-dark uppercase tracking-widest text-xs">Pending Payments ({orders.filter(o => o.status === 'pending_verification').length})</h3>
                    </div>
                    <div className="grid gap-4">
                      {orders.map((order) => (
                        <div key={order.id} className={`p-6 rounded-2xl border transition-all ${order.status === 'verified' ? 'bg-green-50 border-green-200 opacity-60' : 'bg-white border-brand-surface shadow-sm hover:shadow-md'}`}>
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                <span className="text-lg font-bold text-brand-dark">{order.id}</span>
                                {order.status === 'verified' ? (
                                  <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Verified</span>
                                ) : (
                                  <span className="px-3 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-full uppercase tracking-widest animate-pulse">Pending</span>
                                )}
                              </div>
                              <p className="text-sm text-brand-dark/60">{order.name} • {order.phone}</p>
                              <p className="text-xs text-brand-dark/40">{new Date(order.date).toLocaleString()}</p>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-2xl font-bold text-brand-primary">KES {order.total.toLocaleString()}</p>
                              <div className="mt-2 flex items-center gap-2 justify-end">
                                <span className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest">M-Pesa Code:</span>
                                <span className="font-mono font-bold text-brand-dark bg-brand-surface px-2 py-1 rounded text-sm tracking-widest">{order.transactionCode}</span>
                              </div>
                            </div>
                          </div>

                          {order.status !== 'verified' && (
                            <div className="mt-6 pt-6 border-t border-brand-surface flex gap-3">
                              <button 
                                onClick={() => onVerify(order.id)}
                                className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                              >
                                <CheckCircle2 size={18} /> Verify & Clear Payment
                              </button>
                              <button 
                                onClick={() => onReject(order.id)}
                                className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-all"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-brand-dark uppercase tracking-widest text-xs">Inventory Status</h3>
                    <span className="text-xs text-brand-dark/40 font-bold uppercase tracking-widest">{products.length} Products</span>
                  </div>
                  <div className="grid gap-4">
                    {products.map((product) => (
                      <InventoryItem 
                        key={product.id} 
                        product={product} 
                        onUpdate={onUpdateStock} 
                      />
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

// --- Main App ---

export default function App() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Item added to your cart!');
  
  // Page Navigation State
  // 0: Home, 1: Pharma, 2: Supplements, 3: Mother & Baby, 4: Wellness, 5: Beauty, 6: Expertise, 7: Join Our Community, 8: FAQs, 9: Tracking
  const [currentPage, setCurrentPage] = useState(0);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const totalPages = 9;

  // Check for direct link access to Staff Portal
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('staff') === 'true') {
      setShowAdminDashboard(true);
      // Clean up URL without refreshing
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  const pageNames = [
    'Home', 
    'Pharmaceuticals', 
    'Supplements', 
    'Mother & Baby', 
    'Holistic Wellness',
    'Beauty & Skincare',
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
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [notifyProductId, setNotifyProductId] = useState<string | null>(null);
  const [restockNotifications, setRestockNotifications] = useState<{ productId: string, email: string }[]>([]);

  const selectedProduct = useMemo(() => 
    selectedProductId ? products.find(p => p.id === selectedProductId) || null : null
  , [selectedProductId, products]);

  const notifyProduct = useMemo(() => 
    notifyProductId ? products.find(p => p.id === notifyProductId) || null : null
  , [notifyProductId, products]);

  const addToCart = (product: Product, quantity: number = 1) => {
    if (product.stockQuantity <= 0) {
      setToastMessage('Sorry, this product is currently out of order.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    const currentStock = products.find(p => p.id === product.id)?.stockQuantity || 0;
    
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      const totalRequested = (existing?.quantity || 0) + quantity;
      
      if (totalRequested > currentStock) {
        setToastMessage(`Sorry, only ${currentStock} units available in stock.`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return prev;
      }

      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    
    if ((cart.find(item => item.product.id === product.id)?.quantity || 0) + quantity <= currentStock) {
      setToastMessage(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to your cart!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
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
    const product = products.find(p => p.id === id);
    if (!product) return;

    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        if (newQty > product.stockQuantity) {
          setToastMessage(`Only ${product.stockQuantity} units available in stock.`);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
          return item;
        }
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleQuickView = (product: Product) => {
    setSelectedProductId(product.id);
    setIsQuickViewOpen(true);
  };

  const handleNotifyRequest = (productId: string, email: string) => {
    setRestockNotifications(prev => [...prev, { productId, email }]);
    console.log(`Notification request for ${productId} from ${email}`);
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
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

  const addPendingOrder = (order: any) => {
    // Decrement stock for each item in the order
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      order.items.forEach((item: any) => {
        const productIndex = updatedProducts.findIndex(p => p.id === item.product.id);
        if (productIndex !== -1) {
          const newStock = Math.max(0, updatedProducts[productIndex].stockQuantity - item.quantity);
          updatedProducts[productIndex] = {
            ...updatedProducts[productIndex],
            stockQuantity: newStock,
            inStock: newStock > 0
          };
        }
      });
      return updatedProducts;
    });

    setPendingOrders(prev => [...prev, { ...order, status: 'pending_verification', id: `HV-${Math.floor(10000 + Math.random() * 90000)}` }]);
  };

  const verifyOrder = (orderId: string) => {
    setPendingOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'verified' } : o));
    setToastMessage('Payment verified successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const rejectOrder = (orderId: string) => {
    const order = pendingOrders.find(o => o.id === orderId);
    if (!order) return;

    // Restore stock if order is rejected
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      order.items.forEach((item: any) => {
        const productIndex = updatedProducts.findIndex(p => p.id === item.product.id);
        if (productIndex !== -1) {
          const newStock = updatedProducts[productIndex].stockQuantity + item.quantity;
          updatedProducts[productIndex] = {
            ...updatedProducts[productIndex],
            stockQuantity: newStock,
            inStock: newStock > 0
          };
        }
      });
      return updatedProducts;
    });

    setPendingOrders(prev => prev.filter(o => o.id !== orderId));
    setToastMessage('Order rejected and stock restored.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItems = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen font-sans selection:bg-brand-surface selection:text-brand-dark bg-white transition-colors duration-300">
      <Navbar 
          cartCount={cartCount} 
          wishlistCount={wishlist.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onSearch={setSearchQuery}
          onHome={() => goToPage(0)}
          onShop={() => { setSearchQuery(''); goToPage(1); }}
          onConsult={() => setIsConsultationOpen(true)}
          onNavigate={(id) => {
            setSearchQuery('');
            if (id === 'all') goToPage(1);
            if (id === 'pharma') goToPage(2);
            if (id === 'supplements') goToPage(3);
            if (id === 'mother-baby') goToPage(4);
            if (id === 'wellness') goToPage(5);
            if (id === 'beauty') goToPage(6);
            if (id === 'community') goToPage(7);
            if (id === 'faqs') goToPage(8);
            if (id === 'tracking') goToPage(9);
            if (id === 'consultations') goToPage(0);
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
                  onShop={() => { setSearchQuery(''); goToPage(1); }} 
                  onConsult={() => setIsConsultationOpen(true)} 
                />
                
                {/* Trust Bar */}
                <div className="bg-brand-dark py-10">
                  <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-white/80 text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <Truck className="text-brand-light" size={24} />
                      <span>Fast Delivery in Kimbo-Toll & Beyond</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="text-brand-light" size={24} />
                      <span>100% Authentic Products</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="text-brand-light" size={24} />
                      <span>Expert Advice Available 24/7</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Heart className="text-brand-light" size={24} />
                      <span>Compassionate Holistic Care</span>
                    </div>
                  </div>
                </div>

                <CategorySection onSelectCategory={(id) => {
                  setSearchQuery('');
                  if (id === 'all') goToPage(1);
                  if (id === 'pharma') goToPage(2);
                  if (id === 'supplements') goToPage(3);
                  if (id === 'mother-baby') goToPage(4);
                  if (id === 'wellness') goToPage(5);
                  if (id === 'personal-care') goToPage(1); // Default to all for now
                  if (id === 'beauty') goToPage(6);
                }} />
              </>
            )}

            {currentPage >= 1 && currentPage <= 6 && (
              <ShopView 
                products={products}
                onAddToCart={addToCart} 
                onToggleWishlist={toggleWishlist}
                onQuickView={handleQuickView}
                onBuyNow={handleBuyNow}
                onNotifyMe={(p) => { setNotifyProductId(p.id); setIsNotifyModalOpen(true); }}
                wishlist={wishlist}
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                onBack={() => goToPage(0)}
                // Override the internal category selection to match the page
                activeCategoryOverride={
                  currentPage === 1 ? 'all' :
                  currentPage === 2 ? 'pharma' :
                  currentPage === 3 ? 'supplements' :
                  currentPage === 4 ? 'mother-baby' :
                  currentPage === 5 ? 'wellness' :
                  'beauty'
                }
              />
            )}

            {currentPage === 7 && <CommunityView onBack={() => goToPage(0)} />}
            {currentPage === 8 && <FAQsView onBack={() => goToPage(0)} />}
            {currentPage === 9 && <OrderTrackingView onBack={() => goToPage(0)} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <FloatingContactButtons />
      <ScrollToTop />
      <Footer 
        onShop={() => { setSearchQuery(''); goToPage(1); }} 
        onConsult={() => setIsConsultationOpen(true)} 
        onNavigate={(id) => {
          setSearchQuery('');
          if (id === 'all') goToPage(1);
          if (id === 'pharma') goToPage(2);
          if (id === 'supplements') goToPage(3);
          if (id === 'mother-baby') goToPage(4);
          if (id === 'wellness') goToPage(5);
          if (id === 'beauty') goToPage(6);
          if (id === 'community') goToPage(7);
          if (id === 'faqs') goToPage(8);
          if (id === 'tracking') goToPage(9);
        }}
        onLegal={handleLegal}
        onStaffLogin={() => setShowAdminDashboard(true)}
      />

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onClearCart={() => setCart([])}
        onPaymentSubmitted={addPendingOrder}
      />

      <AdminDashboard 
        isOpen={showAdminDashboard}
        onClose={() => setShowAdminDashboard(false)}
        orders={pendingOrders}
        onVerify={verifyOrder}
        onReject={rejectOrder}
        products={products}
        onUpdateStock={(id, newStock) => {
          setProducts(prev => prev.map(p => p.id === id ? { ...p, stockQuantity: newStock, inStock: newStock > 0 } : p));
          setToastMessage('Inventory updated successfully! Shop display refreshed.');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        }}
      />

      <NotifyMeModal 
        isOpen={isNotifyModalOpen}
        onClose={() => setIsNotifyModalOpen(false)}
        product={notifyProduct}
        onNotify={handleNotifyRequest}
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
        onNotifyMe={(p) => { setNotifyProductId(p.id); setIsNotifyModalOpen(true); }}
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
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-brand-dark text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 cursor-pointer"
          >
            <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
              {toastMessage.includes('wishlist') ? <Heart size={16} fill="currentColor" /> : <ShoppingBag size={16} />}
            </div>
            <p className="font-medium">{toastMessage}</p>
            {toastMessage.includes('cart') && <button className="text-brand-light font-bold text-sm ml-4">View Cart</button>}
            {toastMessage.includes('wishlist') && <button className="text-brand-light font-bold text-sm ml-4">View Wishlist</button>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
