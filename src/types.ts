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
  },
  {
    id: '6',
    name: 'Organic Turmeric Curcumin',
    category: 'wellness',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1615485242231-82869a81d3ac?auto=format&fit=crop&q=80&w=800',
    description: 'High-potency organic turmeric with black pepper for maximum absorption. Supports joint health and healthy inflammatory response.',
    isFeatured: false
  },
  {
    id: '7',
    name: 'Apple Watch Series 9',
    category: 'wellness',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1434493907317-a46b53b81882?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced health features, including blood oxygen and ECG apps. Track your daily activity and mental well-being.',
    isFeatured: false
  },
  {
    id: '8',
    name: 'Oura Ring Gen3',
    category: 'wellness',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?auto=format&fit=crop&q=80&w=800',
    description: 'Sleek, accurate health tracker that monitors your sleep, readiness, and activity levels from your finger.',
    isFeatured: false
  },
  {
    id: '9',
    name: 'Pure Eucalyptus Essential Oil',
    category: 'wellness',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
    description: '100% pure eucalyptus oil for aromatherapy and respiratory support. Refreshing and invigorating scent.',
    isFeatured: false
  },
  {
    id: '10',
    name: 'Pregnacare Plus Omega-3',
    category: 'mother-baby',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'Comprehensive nutritional support for pregnancy, including folic acid and high-purity Omega-3 capsules.',
    isFeatured: true
  },
  {
    id: '11',
    name: 'Folic Acid Tablets 5mg',
    category: 'mother-baby',
    price: 850,
    image: 'https://images.unsplash.com/photo-1550573105-4584e7d7e674?auto=format&fit=crop&q=80&w=800',
    description: 'Essential prenatal vitamin to support healthy fetal development and prevent neural tube defects.',
    isFeatured: false
  },
  {
    id: '12',
    name: 'Ferrous Sulphate 200mg',
    category: 'mother-baby',
    price: 950,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3072467a?auto=format&fit=crop&q=80&w=800',
    description: 'Iron supplement to help prevent and treat iron-deficiency anemia during and after pregnancy.',
    isFeatured: false
  },
  {
    id: '13',
    name: 'NAN Optipro 1 Formula (400g)',
    category: 'mother-baby',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    description: 'Premium starter infant formula for healthy babies from birth when breastfeeding is not possible.',
    isFeatured: false
  },
  {
    id: '14',
    name: 'Liptomil Plus 1 Formula (400g)',
    category: 'mother-baby',
    price: 1650,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    description: 'High-quality infant formula enriched with essential nutrients for your baby\'s growth and development.',
    isFeatured: false
  },
  {
    id: '15',
    name: 'Premium Soft Diapers (Pack of 44)',
    category: 'mother-baby',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1544126592-807daa2b565b?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-absorbent and soft diapers designed to keep your baby dry and comfortable for up to 12 hours.',
    isFeatured: false
  },
  {
    id: '16',
    name: 'Epimax Baby & Junior Cream',
    category: 'mother-baby',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=800',
    description: 'Gentle emollient cream for dry skin conditions, suitable for babies and children. Fragrance and color-free.',
    isFeatured: false
  },
  {
    id: '17',
    name: 'Dove Baby Rich Moisture Soap',
    category: 'mother-baby',
    price: 450,
    image: 'https://images.unsplash.com/photo-1600857062241-99e5daee621d?auto=format&fit=crop&q=80&w=800',
    description: 'Hypoallergenic and pH-neutral baby bar that goes beyond mildness to help replenish essential moisture.',
    isFeatured: false
  },
  {
    id: '18',
    name: 'No Rash Baby Barrier Cream',
    category: 'mother-baby',
    price: 750,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
    description: 'Protective barrier cream to prevent and treat diaper rash, keeping baby\'s skin soft and protected.',
    isFeatured: false
  },
  {
    id: '19',
    name: 'Advanced Cold & Flu Relief',
    category: 'pharma',
    price: 650,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'Effective relief from fever, aches, pains, and nasal congestion associated with cold and flu.',
    isFeatured: false
  },
  {
    id: '20',
    name: 'Expert Cough Relief Syrup',
    category: 'pharma',
    price: 550,
    image: 'https://images.unsplash.com/photo-1550573105-4584e7d7e674?auto=format&fit=crop&q=80&w=800',
    description: 'Soothing relief for both dry and chesty coughs. Helps clear congestion and ease throat irritation.',
    isFeatured: false
  },
  {
    id: '21',
    name: 'Seven Seas Omega-3 Syrup (200ml)',
    category: 'pharma',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3072467a?auto=format&fit=crop&q=80&w=800',
    description: 'Rich in Omega-3 and Vitamin D to support healthy brain function, vision, and heart health in children and adults.',
    isFeatured: true
  },
  {
    id: '22',
    name: 'Seven Seas Omega-3 Capsules (60s)',
    category: 'pharma',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=800',
    description: 'High-purity fish oil capsules providing essential EPA and DHA for heart, brain, and eye health.',
    isFeatured: false
  },
  {
    id: '23',
    name: 'Comprehensive Multivitamin Syrup',
    category: 'pharma',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    description: 'A balanced blend of essential vitamins to support growth, immunity, and overall well-being in children.',
    isFeatured: false
  },
  {
    id: '24',
    name: 'Vitamin C 500mg Dispensible (30s)',
    category: 'pharma',
    price: 450,
    image: 'https://images.unsplash.com/photo-1615485242231-82869a81d3ac?auto=format&fit=crop&q=80&w=800',
    description: 'Easy-to-take dispensible Vitamin C tablets to boost immunity and support healthy skin and tissues.',
    isFeatured: false
  },
  {
    id: '25',
    name: 'Gaviscon Double Action Liquid (200ml)',
    category: 'pharma',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'Dual-action relief from heartburn and indigestion by neutralizing acid and forming a protective barrier.',
    isFeatured: true
  },
  {
    id: '26',
    name: 'Calpol Infant Suspension (100ml)',
    category: 'pharma',
    price: 850,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    description: 'Gentle pain and fever relief for infants and children. Sugar-free and strawberry flavored.',
    isFeatured: false
  }
];
