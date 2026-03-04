import { Type } from "@google/genai";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { id: 'pharma', name: 'Pharmaceuticals', icon: 'Pill', description: 'Essential medicines and prescriptions.' },
  { id: 'supplements', name: 'Premium Supplements', icon: 'Zap', description: 'High-quality vitamins and minerals.' },
  { id: 'wellness', name: 'Holistic Wellness', icon: 'Leaf', description: 'Natural products for mind and body.' },
  { id: 'mother-baby', name: 'Mother & Baby', icon: 'Baby', description: 'Care for the little ones and moms.' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Advanced Omega-3 Complex',
    category: 'supplements',
    price: 2450,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800',
    description: 'High-potency EPA/DHA for heart and brain health.',
    isFeatured: true
  },
  {
    id: '2',
    name: 'Ashwagandha KSM-66',
    category: 'wellness',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1611484712647-f5e08e8c8c24?auto=format&fit=crop&q=80&w=800',
    description: 'Premium adaptogen for stress management and focus.',
    isFeatured: true
  },
  {
    id: '3',
    name: 'Probiotic Multi-Strain',
    category: 'wellness',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3072467a?auto=format&fit=crop&q=80&w=800',
    description: 'Support your gut microbiome with 10 billion CFU.',
    isFeatured: true
  },
  {
    id: '4',
    name: 'Vitamin D3 + K2 Drops',
    category: 'supplements',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1550573105-4584e7d7e674?auto=format&fit=crop&q=80&w=800',
    description: 'Essential bone and immune support.',
    isFeatured: false
  }
];
