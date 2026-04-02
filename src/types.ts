import { Type } from "@google/genai";

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  longDescription?: string;
  isFeatured?: boolean;
  inStock: boolean;
  stockQuantity: number;
  reviews?: Review[];
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
  { id: 'personal-care', name: 'Personal Care', icon: 'User', description: 'Hygiene and grooming essentials.' },
  { id: 'beauty', name: 'Beauty & Skincare', icon: 'Sparkles', description: 'Premium skincare and beauty products.' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'b1',
    name: 'Harvianah Glow Serum',
    category: 'beauty',
    price: 4500,
    originalPrice: 5200,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced brightening serum with Vitamin C and Hyaluronic Acid for a radiant complexion.',
    longDescription: 'Our Glow Serum is a powerhouse of antioxidants and hydrating ingredients. It combines 15% pure Vitamin C with Hyaluronic Acid and Ferulic Acid to brighten skin tone, reduce the appearance of dark spots, and provide intense hydration. Suitable for all skin types, it helps protect against environmental stressors and promotes a youthful, glowing look.',
    isFeatured: true,
    inStock: true,
    stockQuantity: 25
  },
  {
    id: 'b2',
    name: 'Harvianah Night Repair Cream',
    category: 'beauty',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
    description: 'Rich, nourishing night cream that repairs and rejuvenates your skin while you sleep.',
    longDescription: 'Wake up to smoother, firmer skin with our Night Repair Cream. Infused with Retinol, Peptides, and Ceramides, this rich formula works overnight to stimulate collagen production and strengthen the skin barrier. It deeply hydrates and targets fine lines and wrinkles, leaving your skin feeling soft and revitalized by morning.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 15
  },
  {
    id: '1',
    name: 'Harvianah Marine Collagen (Strawberry Raspberry)',
    category: 'supplements',
    price: 5800,
    originalPrice: 6500,
    image: 'https://images.unsplash.com/photo-1550573105-4584e7d7e674?auto=format&fit=crop&q=80&w=800',
    description: 'Premium wild-caught marine collagen with a delicious strawberry raspberry flavor. Supports youthful skin, hair, and nail health.',
    longDescription: 'Our Marine Collagen is sourced from wild-caught fish in the deep, cold waters of the North Atlantic. It is hydrolyzed for maximum absorption and blended with natural strawberry and raspberry extracts for a refreshing taste. Regular consumption helps replenish the body\'s collagen levels, which naturally decline with age, leading to improved skin elasticity, reduced fine lines, and stronger hair and nails. It also contains Vitamin C to further stimulate natural collagen synthesis.',
    isFeatured: true,
    inStock: true,
    stockQuantity: 40,
    reviews: [
      { id: 'r1', user: 'Sarah M.', rating: 5, comment: 'I\'ve been using this for 3 weeks and my skin is already glowing! The taste is amazing too.', date: '2024-02-15' },
      { id: 'r2', user: 'James K.', rating: 4, comment: 'Good product, dissolves easily. A bit pricey but worth the quality.', date: '2024-02-10' }
    ]
  },
  {
    id: '2',
    name: 'Harvianah Pure Creatine Monohydrate',
    category: 'supplements',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1593094478221-917379638652?auto=format&fit=crop&q=80&w=800',
    description: '100% micronized creatine monohydrate for improved muscle recovery and explosive power during workouts.',
    longDescription: 'Harvianah Pure Creatine Monohydrate is the gold standard for athletes looking to increase strength, power, and muscle mass. Our creatine is micronized to ensure it mixes easily and absorbs quickly without causing bloating. It works by increasing the body\'s phosphocreatine stores, allowing for more ATP production during high-intensity exercise. This leads to better performance, more reps, and faster recovery between sets.',
    isFeatured: true,
    inStock: false,
    stockQuantity: 0,
    reviews: [
      { id: 'r3', user: 'Mike T.', rating: 5, comment: 'Best creatine I\'ve used. No stomach issues and definitely seeing strength gains.', date: '2024-02-20' }
    ]
  },
  {
    id: '3',
    name: 'Harvianah "Enjoy The Dream" Melatonin Gummies',
    category: 'wellness',
    price: 2500,
    originalPrice: 3000,
    image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=800',
    description: 'Delicious berry-flavored gummies designed to help you fall asleep faster and wake up refreshed.',
    longDescription: 'Struggling with restless nights? Our "Enjoy The Dream" gummies are formulated with 5mg of high-purity melatonin per serving to help regulate your sleep-wake cycle. These pectin-based gummies are vegan-friendly and free from artificial colors or flavors. They help you drift off naturally without the morning grogginess associated with traditional sleep aids. Perfect for jet lag or occasional sleeplessness.',
    isFeatured: true,
    inStock: true,
    stockQuantity: 50,
    reviews: [
      { id: 'r4', user: 'Emily R.', rating: 5, comment: 'These are a lifesaver! I fall asleep within 20 minutes now.', date: '2024-02-18' }
    ]
  },
  {
    id: '4',
    name: 'Harvianah Super Stress B-Complex',
    category: 'wellness',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3072467a?auto=format&fit=crop&q=80&w=800',
    description: 'A potent blend of B-vitamins with Vitamin C to support energy metabolism and help the body manage daily stress.',
    longDescription: 'Modern life can be demanding. Our Super Stress B-Complex provides a comprehensive range of B-vitamins (B1, B2, B3, B5, B6, B7, B9, B12) which are essential for converting food into energy and maintaining a healthy nervous system. We\'ve added 500mg of Vitamin C to support immune function during times of high stress. This formula is designed to keep you energized and focused throughout the day.',
    isFeatured: true,
    inStock: true,
    stockQuantity: 30,
    reviews: [
      { id: 'r5', user: 'David L.', rating: 4, comment: 'Noticeable difference in my energy levels during work.', date: '2024-02-12' }
    ]
  },
  {
    id: '5',
    name: 'Harvianah Daily Probiotic',
    category: 'wellness',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1615485242231-82869a81d3ac?auto=format&fit=crop&q=80&w=800',
    description: 'Essential digestive support with high-quality probiotic strains for a healthy gut microbiome.',
    longDescription: 'A healthy gut is the foundation of overall wellness. Our Daily Probiotic features 10 billion CFUs of clinically studied strains, including Lactobacillus acidophilus and Bifidobacterium lactis. These "good bacteria" help balance your digestive system, improve nutrient absorption, and support a strong immune response. Our delayed-release capsules ensure the probiotics survive stomach acid to reach your intestines where they are needed most.',
    isFeatured: true,
    inStock: true,
    stockQuantity: 20,
    reviews: [
      { id: 'r6', user: 'Linda W.', rating: 5, comment: 'Finally found a probiotic that actually works for my bloating.', date: '2024-02-22' }
    ]
  },
  {
    id: '6',
    name: 'Organic Turmeric Curcumin',
    category: 'wellness',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=800',
    description: 'High-potency organic turmeric with black pepper for maximum absorption. Supports joint health and healthy inflammatory response.',
    longDescription: 'Experience the natural power of Turmeric. Our supplement contains 1500mg of organic turmeric root powder and 150mg of turmeric extract standardized to 95% curcuminoids. To ensure you get the full benefits, we\'ve included BioPerine (black pepper extract), which has been shown to increase curcumin absorption by up to 2000%. Ideal for supporting joint comfort, mobility, and overall cardiovascular health.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 35,
    reviews: [
      { id: 'r7', user: 'Robert G.', rating: 5, comment: 'Helped significantly with my knee pain after running.', date: '2024-02-05' }
    ]
  },
  {
    id: '7',
    name: 'Apple Watch Series 9',
    category: 'wellness',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced health features, including blood oxygen and ECG apps. Track your daily activity and mental well-being.',
    longDescription: 'The Apple Watch Series 9 is more capable, more intuitive, and faster. With the new S9 SiP, the display is twice as bright, and you can interact with your watch without touching the screen using the new double tap gesture. It features advanced health sensors that provide deep insights into your physical and mental health, including heart rate notifications, sleep stage tracking, and temperature sensing for retrospective ovulation estimates.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 5,
    reviews: [
      { id: 'r9', user: 'Kevin P.', rating: 5, comment: 'The health tracking is incredibly accurate. Best investment for my fitness.', date: '2024-02-25' }
    ]
  },
  {
    id: '8',
    name: 'Oura Ring Gen3',
    category: 'wellness',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?auto=format&fit=crop&q=80&w=800',
    description: 'Sleek, accurate health tracker that monitors your sleep, readiness, and activity levels from your finger.',
    longDescription: 'Oura Ring Gen3 is a revolutionary health tracker that delivers personalized health data, insights, and daily guidance. It monitors your sleep, activity, recovery, temperature, heart rate, and more with research-grade accuracy. By understanding how your body responds to your lifestyle, Oura helps you make better decisions for your health and performance. The sleek titanium design is water-resistant and has a battery life of up to 7 days.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 8
  },
  {
    id: '9',
    name: 'Pure Eucalyptus Essential Oil',
    category: 'wellness',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
    description: '100% pure eucalyptus oil for aromatherapy and respiratory support. Refreshing and invigorating scent.',
    longDescription: 'Our Eucalyptus Essential Oil is steam-distilled from the leaves of the Eucalyptus globulus tree. Known for its powerful, refreshing aroma, it is a staple in aromatherapy for clearing the mind and supporting healthy respiration. It can be used in a diffuser to purify the air, added to a warm bath for a spa-like experience, or diluted with a carrier oil for a cooling chest rub. 100% pure and therapeutic grade.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 60
  },
  {
    id: '10',
    name: 'Pregnacare Plus Omega-3',
    category: 'mother-baby',
    price: 3500,
    originalPrice: 4200,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'Comprehensive nutritional support for pregnancy, including folic acid and high-purity Omega-3 capsules.',
    longDescription: 'Pregnacare Plus is the ideal formula for every stage of pregnancy - from before conception, throughout all of pregnancy and whilst breast-feeding. The dual pack provides 19 essential nutrients including 400mcg folic acid and 10mcg vitamin D, plus a high purity Omega-3 capsule providing 300mg DHA. DHA intake contributes to the normal brain and eye development of the foetus.',
    isFeatured: true,
    inStock: true,
    stockQuantity: 25,
    reviews: [
      { id: 'r8', user: 'Grace O.', rating: 5, comment: 'My doctor recommended this and I feel great taking it.', date: '2024-01-30' }
    ]
  },
  {
    id: '11',
    name: 'Folic Acid Tablets 5mg',
    category: 'mother-baby',
    price: 850,
    image: 'https://images.unsplash.com/photo-1550573105-4584e7d7e674?auto=format&fit=crop&q=80&w=800',
    description: 'Essential prenatal vitamin to support healthy fetal development and prevent neural tube defects.',
    longDescription: 'Folic Acid (Vitamin B9) is crucial for the healthy development of a baby\'s neural tube, which eventually becomes the brain and spinal cord. Taking a folic acid supplement before and during early pregnancy is strongly recommended by health professionals worldwide. Our 5mg tablets provide a high-potency dose for those who require additional support as advised by their healthcare provider.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: '12',
    name: 'Ferrous Sulphate 200mg',
    category: 'mother-baby',
    price: 950,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3072467a?auto=format&fit=crop&q=80&w=800',
    description: 'Iron supplement to help prevent and treat iron-deficiency anemia during and after pregnancy.',
    longDescription: 'Iron is essential for the production of hemoglobin, the protein in red blood cells that carries oxygen to tissues. During pregnancy, your blood volume increases, and your body needs more iron for both you and your growing baby. Ferrous Sulphate is a well-established and effective form of iron supplement to help maintain healthy iron levels and prevent fatigue and anemia.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 80
  },
  {
    id: '13',
    name: 'NAN Optipro 1 Formula (400g)',
    category: 'mother-baby',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    description: 'Premium starter infant formula for healthy babies from birth when breastfeeding is not possible.',
    longDescription: 'NAN OPTIPRO 1 is a premium starter infant formula that is specially designed to help ensure your formula-fed infant receives balanced, high-quality nutrition. It contains OPTIPRO, an optimized protein blend that supplies the right amount of proteins which is gentle on your baby\'s developing organs. It also contains Bifidobacterium lactis, a probiotic that helps support your baby\'s healthy digestive system.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 45,
    reviews: [
      { id: 'r10', user: 'Alice J.', rating: 5, comment: 'My baby took to this formula immediately. No colic issues!', date: '2024-03-01' }
    ]
  },
  {
    id: '14',
    name: 'Liptomil Plus 1 Formula (400g)',
    category: 'mother-baby',
    price: 1650,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'High-quality infant formula enriched with essential nutrients for your baby\'s growth and development.',
    longDescription: 'Liptomil Plus 1 is a premium infant formula made in Switzerland. It is specifically formulated to provide all the vitamins, minerals, and trace elements your baby needs from birth to 6 months. It contains Omega-3 and Omega-6 fatty acids for brain and eye development, as well as prebiotics to support a healthy gut and immune system.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 40
  },
  {
    id: '15',
    name: 'Premium Soft Diapers (Pack of 44)',
    category: 'mother-baby',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1544126592-807daa2b565b?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-absorbent and soft diapers designed to keep your baby dry and comfortable for up to 12 hours.',
    longDescription: 'Our Premium Soft Diapers are engineered for maximum comfort and protection. Featuring a 3D absorbent core, they quickly lock away moisture to keep your baby\'s skin dry and prevent irritation. The soft, breathable outer cover allows air to circulate, while the stretchy waistbands and leg cuffs ensure a snug, leak-proof fit. Hypoallergenic and free from harsh chemicals.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 120
  },
  {
    id: '16',
    name: 'Epimax Baby & Junior Cream',
    category: 'mother-baby',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=800',
    description: 'Gentle emollient cream for dry skin conditions, suitable for babies and children. Fragrance and color-free.',
    longDescription: 'Epimax Baby & Junior is an all-purpose emollient cream that is gentle enough for daily use on sensitive young skin. It helps to soothe, hydrate, and protect the skin barrier, making it ideal for managing dry skin conditions like eczema. It is free from fragrances, colorants, and SLS, minimizing the risk of irritation. Can be used as a soap substitute or a leave-on moisturizer.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 55
  },
  {
    id: '17',
    name: 'Dove Baby Rich Moisture Soap',
    category: 'mother-baby',
    price: 450,
    image: 'https://images.unsplash.com/photo-1600857062241-99e5daee621d?auto=format&fit=crop&q=80&w=800',
    description: 'Hypoallergenic and pH-neutral baby bar that goes beyond mildness to help replenish essential moisture.',
    longDescription: 'Baby Dove Rich Moisture Baby Bar has a hypoallergenic and pH-neutral formula that\'s ophthalmologist, dermatologist, and pediatrician tested. Our baby bar is enriched with our 1/4 moisturizing cream, keeping your baby\'s skin feeling touchably soft and helping it retain its natural moisture. It\'s so gentle that you can use it on your newborn\'s sensitive skin.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 150
  },
  {
    id: '18',
    name: 'No Rash Baby Barrier Cream',
    category: 'mother-baby',
    price: 750,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'Protective barrier cream to prevent and treat diaper rash, keeping baby\'s skin soft and protected.',
    longDescription: 'No Rash Barrier Cream provides a protective layer on your baby\'s skin to shield it from the irritating effects of wetness and friction. Formulated with zinc oxide and soothing natural oils, it helps to calm existing redness and prevent new rashes from forming. It\'s easy to apply and gentle enough for every diaper change.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 65
  },
  {
    id: '19',
    name: 'Benylin Pediatric Cough Syrup',
    category: 'pharma',
    price: 650,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'Gentle and effective cough relief specifically formulated for children.',
    longDescription: 'Benylin Pediatric Cough Syrup is a trusted choice for parents seeking gentle yet effective relief for their children\'s coughs. Specifically formulated for young systems, it helps soothe throat irritation and reduce coughing, allowing your little one to rest and recover more comfortably. Always follow the age-appropriate dosage instructions.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 200
  },
  {
    id: '20',
    name: 'Benylin Dry Cough Syrup',
    category: 'pharma',
    price: 550,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'Targeted relief for dry, tickly, and non-productive coughs.',
    longDescription: 'Benylin Dry Cough Syrup is designed to provide rapid relief from the irritation of a dry, tickly cough. Its soothing formula works by suppressing the cough reflex and coating the throat to reduce the urge to cough. Ideal for use during the day or before bed to ensure a more restful night\'s sleep.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 180
  },
  {
    id: '21',
    name: 'Seven Seas Omega-3 Syrup (200ml)',
    category: 'pharma',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'Rich in Omega-3 and Vitamin D to support healthy brain function, vision, and heart health in children and adults.',
    longDescription: 'Seven Seas Omega-3 with Vitamins A, D, E and C provides a rich source of Omega-3 fish oil and essential vitamins. It is specially formulated to support the health of your heart, brain, and vision. The added Vitamin D supports a healthy immune system and the maintenance of normal bones and teeth. The orange flavor makes it a favorite for the whole family.',
    isFeatured: true,
    inStock: true,
    stockQuantity: 90
  },
  {
    id: '22',
    name: 'Seven Seas Omega-3 Capsules (60s)',
    category: 'pharma',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1550573105-4584e7d7e674?auto=format&fit=crop&q=80&w=800',
    description: 'High-purity fish oil capsules providing essential EPA and DHA for heart, brain, and eye health.',
    longDescription: 'Our Seven Seas Omega-3 capsules contain 1000mg of high-purity fish oil, providing a concentrated source of EPA and DHA. These essential fatty acids are vital for maintaining a healthy heart, supporting cognitive function, and preserving good vision. Our "Ocean Gold" purification process ensures the highest quality and purity, free from heavy metals and contaminants.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 75
  },
  {
    id: '23',
    name: 'Comprehensive Multivitamin Syrup',
    category: 'pharma',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'A balanced blend of essential vitamins to support growth, immunity, and overall well-being in children.',
    longDescription: 'Our Comprehensive Multivitamin Syrup is designed to fill nutritional gaps in children\'s diets. It provides a full spectrum of vitamins, including A, C, D, and E, as well as the B-complex group. This balanced formula supports healthy growth and development, boosts the immune system, and helps maintain energy levels. The delicious fruit flavor ensures children enjoy taking their daily vitamins.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 110
  },
  {
    id: '24',
    name: 'Vitamin C 500mg Dispensible (30s)',
    category: 'pharma',
    price: 450,
    image: 'https://images.unsplash.com/photo-1615485242231-82869a81d3ac?auto=format&fit=crop&q=80&w=800',
    description: 'Easy-to-take dispensible Vitamin C tablets to boost immunity and support healthy skin and tissues.',
    longDescription: 'Vitamin C is a powerful antioxidant that plays a key role in supporting the immune system. Our 500mg dispensible tablets are designed for convenience - they dissolve quickly in the mouth or can be chewed, making them ideal for those who have difficulty swallowing pills. Regular intake helps protect cells from oxidative stress and supports the formation of collagen for healthy skin, bones, and gums.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 300
  },
  {
    id: '25',
    name: 'Gaviscon Double Action Liquid (200ml)',
    category: 'pharma',
    price: 1450,
    originalPrice: 1800,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'Dual-action relief from heartburn and indigestion by neutralizing acid and forming a protective barrier.',
    longDescription: 'Gaviscon Double Action works in two ways to provide effective relief. First, it neutralizes excess stomach acid to relieve pain and discomfort. Second, it forms a protective "raft" over the stomach contents to prevent acid from rising back into the esophagus (reflux). This liquid formula provides fast-acting and long-lasting relief, especially after meals or at bedtime.',
    isFeatured: true,
    inStock: true,
    stockQuantity: 85,
    reviews: [
      { id: 'r11', user: 'Tom H.', rating: 5, comment: 'Instant relief from heartburn. I always keep this in my cabinet.', date: '2024-03-05' }
    ]
  },
  {
    id: '26',
    name: 'Calpol Infant Suspension (100ml)',
    category: 'pharma',
    price: 850,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'Gentle pain and fever relief for infants and children. Sugar-free and strawberry flavored.',
    longDescription: 'Calpol Infant Suspension contains paracetamol, a trusted ingredient for relieving pain and reducing fever in babies and children. It starts to work on fever in just 15 minutes and is gentle on delicate tummies. Our sugar-free, strawberry-flavored suspension is easy to administer with the included measuring syringe, providing comfort for your little one when they need it most.',
    isFeatured: false,
    inStock: true,
    stockQuantity: 95
  },
  {
    id: '27',
    name: 'Vitamin D3 + K2',
    category: 'supplements',
    price: 2500,
    image: 'https://picsum.photos/seed/vitamin-d3-k2/800/800',
    description: 'Essential combination for bone health and calcium absorption.',
    longDescription: 'Our Vitamin D3 + K2 supplement provides the perfect synergy for bone and cardiovascular health. Vitamin D3 helps your body absorb calcium, while Vitamin K2 ensures that calcium is directed to your bones and teeth where it belongs, rather than accumulating in your arteries. This high-potency formula supports immune function and overall vitality.',
    inStock: true,
    stockQuantity: 50
  },
  {
    id: '28',
    name: 'Swanson Super Stress B-Complex',
    category: 'supplements',
    price: 2200,
    image: 'https://picsum.photos/seed/swanson-b-complex/800/800',
    description: 'Potent B-vitamin blend to support energy and stress management.',
    longDescription: 'Specifically formulated to help replenish nutrients lost during high-stress times, Swanson Super Stress B-Complex combines a full spectrum of B vitamins with a high dose of Vitamin C. This combination supports nervous system health, energy metabolism, and immune function, helping you stay resilient and focused when life gets demanding.',
    inStock: true,
    stockQuantity: 40
  },
  {
    id: '29',
    name: 'Enjoy The Dream Melatonin Gummies',
    category: 'supplements',
    price: 2800,
    image: 'https://picsum.photos/seed/melatonin-gummies-dream/800/800',
    description: 'Delicious berry-flavored gummies for better sleep quality.',
    longDescription: 'Drift off into a peaceful slumber with our "Enjoy The Dream" Melatonin Gummies. Each gummy delivers a precise dose of melatonin to help regulate your sleep cycle, combined with soothing botanicals. They are vegan-friendly, pectin-based, and free from artificial colors, making them a delicious and natural way to improve your sleep quality and wake up feeling refreshed.',
    inStock: true,
    stockQuantity: 60
  },
  {
    id: '30',
    name: 'Swanson Probiotics',
    category: 'supplements',
    price: 2400,
    image: 'https://picsum.photos/seed/swanson-probiotics/800/800',
    description: 'High-quality probiotic strains for digestive and immune health.',
    longDescription: 'Swanson Probiotics deliver a diverse range of beneficial bacteria to support a healthy gut microbiome. This formula features clinically studied strains that help balance digestion, reduce occasional bloating, and strengthen the immune system. Our acid-resistant capsules ensure that the live cultures reach your intestines for maximum effectiveness.',
    inStock: true,
    stockQuantity: 35
  },
  {
    id: '31',
    name: 'Joint Fix',
    category: 'supplements',
    price: 3500,
    image: 'https://picsum.photos/seed/joint-fix-supplement/800/800',
    description: 'Advanced formula for joint mobility and comfort.',
    longDescription: 'Joint Fix is a comprehensive supplement designed to support joint health and flexibility. It combines Glucosamine, Chondroitin, and MSM with natural anti-inflammatory extracts like Turmeric and Boswellia. This synergistic blend helps maintain cartilage integrity, reduces joint discomfort, and supports an active lifestyle.',
    inStock: true,
    stockQuantity: 25
  },
  {
    id: '32',
    name: 'Quamtrax Pure Creatine (300g)',
    category: 'supplements',
    price: 3800,
    image: 'https://picsum.photos/seed/quamtrax-creatine/800/800',
    description: 'High-purity micronized creatine for strength and performance.',
    longDescription: 'Quamtrax Pure Creatine provides 100% pure micronized creatine monohydrate of the highest quality. Creatine is one of the most researched supplements for increasing muscle strength, power, and size. Our micronized formula ensures superior solubility and absorption, helping you push harder in your workouts and recover faster.',
    inStock: true,
    stockQuantity: 30
  },
  {
    id: '33',
    name: 'Saracal M',
    category: 'supplements',
    price: 1500,
    image: 'https://picsum.photos/seed/saracal-m/800/800',
    description: 'Calcium and mineral supplement for bone strength.',
    longDescription: 'Saracal M is a balanced calcium supplement enriched with essential minerals like Magnesium and Zinc. It is designed to support bone density and strength, especially for those with increased nutritional needs. Regular use helps maintain skeletal health and prevents mineral deficiencies.',
    inStock: true,
    stockQuantity: 100
  },
  {
    id: '34',
    name: 'Osteocare Tablets',
    category: 'supplements',
    price: 1800,
    image: 'https://picsum.photos/seed/osteocare-tabs/800/800',
    description: 'Comprehensive bone health support with calcium, magnesium, and vitamin D.',
    longDescription: 'Osteocare is the UK\'s No.1 bone health formula and has been scientifically developed based on the very latest research to provide a rich source of calcium and co-factors including vitamin D which helps with the normal absorption of calcium by the body. It also contains magnesium and zinc which contribute to the maintenance of normal bones.',
    inStock: true,
    stockQuantity: 80
  },
  {
    id: '36',
    name: 'Ashwagandha Powder (40g)',
    category: 'supplements',
    price: 1200,
    image: 'https://picsum.photos/seed/ashwagandha-40g/800/800',
    description: 'Pure organic Ashwagandha root powder for stress relief and vitality.',
    longDescription: 'Our Ashwagandha powder is sourced from organic farms and processed at low temperatures to preserve its potent bioactive compounds. Ashwagandha is a renowned adaptogen that helps the body manage stress, improves energy levels, and supports cognitive function. This 40g pack is perfect for adding to smoothies, teas, or warm milk.',
    inStock: true,
    stockQuantity: 45
  },
  {
    id: '37',
    name: 'Ashwagandha Powder (80g)',
    category: 'supplements',
    price: 2200,
    image: 'https://picsum.photos/seed/ashwagandha-80g/800/800',
    description: 'Value pack of pure organic Ashwagandha root powder.',
    longDescription: 'Get more of the stress-relieving benefits of Ashwagandha with our 80g value pack. This pure adaptogenic powder supports hormonal balance, enhances physical performance, and promotes a sense of calm. Ideal for regular users looking to maintain their wellness routine with high-quality, science-backed herbal support.',
    inStock: true,
    stockQuantity: 30
  },
  {
    id: '38',
    name: 'Premium Honey Extract (500mg)',
    category: 'supplements',
    price: 1500,
    image: 'https://picsum.photos/seed/honey-extract-500mg/800/800',
    description: 'Concentrated honey extract capsules for natural energy and immunity.',
    longDescription: 'Our Honey Extract capsules provide the concentrated benefits of pure honey in a convenient 500mg dose. Rich in antioxidants and natural enzymes, this supplement supports immune health, provides a gentle energy boost, and promotes overall vitality without the sugar spike of liquid honey.',
    inStock: true,
    stockQuantity: 55
  },
  {
    id: '39',
    name: 'Premium Honey Extract (1000mg)',
    category: 'supplements',
    price: 2800,
    image: 'https://picsum.photos/seed/honey-extract-1000mg/800/800',
    description: 'High-potency honey extract for maximum antioxidant support.',
    longDescription: 'Experience the full power of nature with our 1000mg Honey Extract. This high-potency supplement is packed with polyphenols and flavonoids that help protect cells from oxidative stress. It supports respiratory health and provides a natural, sustained energy source for your daily activities.',
    inStock: true,
    stockQuantity: 40
  },
  {
    id: '40',
    name: 'Zefcolin Syrup (100ml)',
    category: 'pharma',
    price: 650,
    image: 'https://picsum.photos/seed/zefcolin-syrup/800/800',
    description: 'Effective relief for dry, irritating coughs.',
    longDescription: 'Zefcolin Syrup is specifically formulated to provide fast and effective relief from dry, non-productive coughs. It works by soothing the throat and suppressing the cough reflex, allowing you to rest and recover. Its gentle formula is suitable for adults and children as directed by a healthcare professional.',
    inStock: true,
    stockQuantity: 85
  },
  {
    id: '41',
    name: 'Ulgicid Suspension Mint Flavor (200ml)',
    category: 'pharma',
    price: 850,
    image: 'https://picsum.photos/seed/ulgicid-suspension/800/800',
    description: 'Fast-acting antacid for heartburn and indigestion relief with a refreshing mint flavor.',
    longDescription: 'Ulgicid Suspension provides rapid relief from the discomfort of heartburn, acid indigestion, and sour stomach. Its advanced formula neutralizes excess stomach acid on contact, while the refreshing mint flavor leaves your mouth feeling cool and clean. Perfect for post-meal relief or whenever symptoms occur.',
    inStock: true,
    stockQuantity: 60
  },
  {
    id: '42',
    name: 'Oxecon S Sugar-Free (200ml)',
    category: 'pharma',
    price: 1200,
    image: 'https://picsum.photos/seed/oxecon-s-syrup/800/800',
    description: 'Sugar-free digestive support for sensitive systems.',
    longDescription: 'Oxecon S is a high-quality, sugar-free digestive aid designed for those who need to manage their sugar intake while seeking relief from digestive discomfort. This 200ml suspension helps balance stomach acidity and supports healthy digestion, making it an excellent choice for diabetic patients or health-conscious individuals.',
    inStock: true,
    stockQuantity: 45
  },
  {
    id: '43',
    name: 'Acnesol Cream (20g)',
    category: 'pharma',
    price: 950,
    image: 'https://picsum.photos/seed/acnesol-cream/800/800',
    description: 'Targeted treatment for acne and skin blemishes.',
    longDescription: 'Acnesol Cream is a clinically proven treatment for mild to moderate acne. It works by reducing inflammation, unclogging pores, and killing acne-causing bacteria. Its non-greasy formula absorbs quickly into the skin, helping to clear existing blemishes and prevent new ones from forming for a smoother, clearer complexion.',
    inStock: true,
    stockQuantity: 70
  },
  {
    id: '44',
    name: 'Triple Magnesium Complex',
    category: 'supplements',
    price: 2400,
    image: 'https://picsum.photos/seed/triple-magnesium/800/800',
    description: 'Advanced magnesium blend for muscle, nerve, and sleep support.',
    longDescription: 'Our Triple Magnesium Complex combines three highly bioavailable forms of magnesium: Citrate, Glycinate, and Malate. This synergistic blend supports muscle relaxation, nervous system health, and restful sleep, while also contributing to energy production and bone strength.',
    inStock: true,
    stockQuantity: 50
  },
  {
    id: '45',
    name: 'Anabolic Creatine (300g)',
    category: 'supplements',
    price: 3800,
    image: 'https://picsum.photos/seed/anabolic-creatine/800/800',
    description: 'High-performance creatine for explosive power and muscle growth.',
    longDescription: 'Anabolic Creatine is designed for athletes who demand maximum performance. This pure micronized creatine monohydrate helps increase ATP production, allowing for greater strength, power, and muscle volume during high-intensity training.',
    inStock: true,
    stockQuantity: 30
  },
  {
    id: '46',
    name: 'Gold Creatine (500g)',
    category: 'supplements',
    price: 4500,
    image: 'https://picsum.photos/seed/gold-creatine/800/800',
    description: 'Premium gold-standard creatine for elite athletic performance.',
    longDescription: 'Gold Creatine offers 500g of ultra-pure creatine monohydrate. It is the perfect supplement for those looking to enhance their physical performance in successive bursts of short-term, high-intensity exercise. Clean, effective, and trusted by professionals.',
    inStock: true,
    stockQuantity: 25
  },
  {
    id: '47',
    name: 'Applied Nutrition Creatine Monohydrate (50 Servings)',
    category: 'supplements',
    price: 3200,
    image: 'https://picsum.photos/seed/applied-nutrition-creatine/800/800',
    description: 'Micronized creatine monohydrate for improved physical performance.',
    longDescription: 'Applied Nutrition Creatine Monohydrate is suitable for anyone participating in prolonged or high-intensity exercise. It helps increase physical performance in successive bursts of short-term, high-intensity exercise. Our formula is micronized for easy mixing.',
    inStock: true,
    stockQuantity: 40
  },
  {
    id: '48',
    name: 'GAT Sport Creatine (200 Servings)',
    category: 'supplements',
    price: 5500,
    image: 'https://picsum.photos/seed/gat-sport-creatine/800/800',
    description: 'Bulk value pack of pure creatine monohydrate for long-term results.',
    longDescription: 'GAT Sport Creatine provides 200 servings of pure, high-quality creatine monohydrate. This bulk pack is designed for dedicated athletes who want to maintain consistent performance, strength, and muscle recovery over a long period.',
    inStock: true,
    stockQuantity: 20
  },
  {
    id: '49',
    name: 'Creatine Gummies (3000mg Creatine Monohydrate - 80 Gummies)',
    category: 'supplements',
    price: 3500,
    image: 'https://picsum.photos/seed/creatine-gummies/800/800',
    description: 'Convenient and delicious creatine gummies for on-the-go performance.',
    longDescription: 'Get your daily dose of creatine in a tasty gummy form. Each serving provides 3000mg of pure creatine monohydrate to support muscle strength and recovery. Perfect for those who prefer an alternative to powders or capsules.',
    inStock: true,
    stockQuantity: 60
  },
  {
    id: '50',
    name: 'Essential Amino Energy (65 Servings)',
    category: 'supplements',
    price: 4800,
    image: 'https://picsum.photos/seed/essential-amino-energy/800/800',
    description: 'Amino acids and natural caffeine for energy and muscle recovery.',
    longDescription: 'Essential Amino Energy combines an optimal ratio of rapidly absorbed free-form amino acids with natural energizers. Use it anytime for a boost of energy, focus, and muscle recovery support.',
    inStock: true,
    stockQuantity: 35
  },
  {
    id: '51',
    name: 'Laperva Joint Support (90 Tabs)',
    category: 'supplements',
    price: 3200,
    image: 'https://picsum.photos/seed/laperva-joint-support/800/800',
    description: 'Comprehensive joint care formula for mobility and flexibility.',
    longDescription: 'Laperva Joint Support is formulated with Glucosamine, Chondroitin, and MSM to support healthy joints and connective tissues. It helps reduce joint discomfort and improves flexibility for an active lifestyle.',
    inStock: true,
    stockQuantity: 45
  },
  {
    id: '52',
    name: 'Weider Whey Amino',
    category: 'supplements',
    price: 3800,
    image: 'https://picsum.photos/seed/weider-whey-amino/800/800',
    description: 'High-quality whey amino acids for rapid muscle tissue repair.',
    longDescription: 'Weider Whey Amino provides a full spectrum of essential and non-essential amino acids derived from high-quality whey protein. It is designed to support muscle growth and accelerate recovery after intense training sessions.',
    inStock: true,
    stockQuantity: 30
  },
  {
    id: '53',
    name: 'Energized Amino (30 Servings)',
    category: 'supplements',
    price: 2800,
    image: 'https://picsum.photos/seed/energized-amino/800/800',
    description: 'Energy-boosting amino acid blend for pre-workout or daily focus.',
    longDescription: 'Energized Amino provides the perfect balance of amino acids for muscle support and natural caffeine for a clean energy boost. Ideal for pre-workout or as a mid-day pick-me-up.',
    inStock: true,
    stockQuantity: 50
  },
  {
    id: '54',
    name: 'Anabolic Amino (300 Tablets)',
    category: 'supplements',
    price: 4200,
    image: 'https://picsum.photos/seed/anabolic-amino/800/800',
    description: 'Potent amino acid tablets for muscle building and anti-catabolic support.',
    longDescription: 'Anabolic Amino is a high-potency amino acid supplement designed to promote protein synthesis and prevent muscle breakdown. These tablets provide a convenient way to ensure your body has the building blocks it needs for growth.',
    inStock: true,
    stockQuantity: 25
  },
  {
    id: '55',
    name: 'Applied Nutrition Critical Whey Advanced Proteins',
    category: 'supplements',
    price: 7500,
    image: 'https://picsum.photos/seed/critical-whey-protein/800/800',
    description: 'Premium whey protein blend with Isolate, Concentrate, and Hydrolyzed protein.',
    longDescription: 'Critical Whey has been developed using a unique blend of Whey Protein Concentrate, Whey Protein Isolate, and Hydrolyzed Whey Protein. It provides high levels of protein and BCAAs to support muscle growth and maintenance.',
    inStock: true,
    stockQuantity: 15
  }
];
