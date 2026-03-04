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
    name: 'Harvianah Marine Collagen (Strawberry Raspberry)',
    category: 'supplements',
    price: 5800,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=800',
    description: 'Premium wild-caught marine collagen with a delicious strawberry raspberry flavor. Supports youthful skin, hair, and nail health.',
    isFeatured: true
  },
  {
    id: '2',
    name: 'Harvianah Pure Creatine Monohydrate',
    category: 'supplements',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1593094478221-917379638652?auto=format&fit=crop&q=80&w=800',
    description: '100% micronized creatine monohydrate for improved muscle recovery and explosive power during workouts.',
    isFeatured: true
  },
  {
    id: '3',
    name: 'Harvianah "Enjoy The Dream" Melatonin Gummies',
    category: 'wellness',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1550573105-4584e7d7e674?auto=format&fit=crop&q=80&w=800',
    description: 'Delicious berry-flavored gummies designed to help you fall asleep faster and wake up refreshed.',
    isFeatured: true
  },
  {
    id: '4',
    name: 'Harvianah Super Stress B-Complex',
    category: 'wellness',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3072467a?auto=format&fit=crop&q=80&w=800',
    description: 'A potent blend of B-vitamins with Vitamin C to support energy metabolism and help the body manage daily stress.',
    isFeatured: true
  },
  {
    id: '5',
    name: 'Harvianah Daily Probiotic',
    category: 'wellness',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=800',
    description: 'Essential digestive support with high-quality probiotic strains for a healthy gut microbiome.',
    isFeatured: true
  }
];
