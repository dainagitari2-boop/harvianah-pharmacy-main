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
    isFeatured: true
  },
  {
    id: 'b2',
    name: 'Harvianah Night Repair Cream',
    category: 'beauty',
    price: 3800,
    originalPrice: 4500,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
    description: 'Rich, nourishing night cream that repairs and rejuvenates your skin while you sleep.',
    longDescription: 'Wake up to smoother, firmer skin with our Night Repair Cream. Infused with Retinol, Peptides, and Ceramides, this rich formula works overnight to stimulate collagen production and strengthen the skin barrier. It deeply hydrates and targets fine lines and wrinkles, leaving your skin feeling soft and revitalized by morning.',
    isFeatured: false
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
    originalPrice: 3800,
    image: 'https://images.unsplash.com/photo-1593094478221-917379638652?auto=format&fit=crop&q=80&w=800',
    description: '100% micronized creatine monohydrate for improved muscle recovery and explosive power during workouts.',
    longDescription: 'Harvianah Pure Creatine Monohydrate is the gold standard for athletes looking to increase strength, power, and muscle mass. Our creatine is micronized to ensure it mixes easily and absorbs quickly without causing bloating. It works by increasing the body\'s phosphocreatine stores, allowing for more ATP production during high-intensity exercise. This leads to better performance, more reps, and faster recovery between sets.',
    isFeatured: true,
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
    reviews: [
      { id: 'r4', user: 'Emily R.', rating: 5, comment: 'These are a lifesaver! I fall asleep within 20 minutes now.', date: '2024-02-18' }
    ]
  },
  {
    id: '4',
    name: 'Harvianah Super Stress B-Complex',
    category: 'wellness',
    price: 1800,
    originalPrice: 2200,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3072467a?auto=format&fit=crop&q=80&w=800',
    description: 'A potent blend of B-vitamins with Vitamin C to support energy metabolism and help the body manage daily stress.',
    longDescription: 'Modern life can be demanding. Our Super Stress B-Complex provides a comprehensive range of B-vitamins (B1, B2, B3, B5, B6, B7, B9, B12) which are essential for converting food into energy and maintaining a healthy nervous system. We\'ve added 500mg of Vitamin C to support immune function during times of high stress. This formula is designed to keep you energized and focused throughout the day.',
    isFeatured: true,
    reviews: [
      { id: 'r5', user: 'David L.', rating: 4, comment: 'Noticeable difference in my energy levels during work.', date: '2024-02-12' }
    ]
  },
  {
    id: '5',
    name: 'Harvianah Daily Probiotic',
    category: 'wellness',
    price: 2200,
    originalPrice: 2600,
    image: 'https://images.unsplash.com/photo-1615485242231-82869a81d3ac?auto=format&fit=crop&q=80&w=800',
    description: 'Essential digestive support with high-quality probiotic strains for a healthy gut microbiome.',
    longDescription: 'A healthy gut is the foundation of overall wellness. Our Daily Probiotic features 10 billion CFUs of clinically studied strains, including Lactobacillus acidophilus and Bifidobacterium lactis. These "good bacteria" help balance your digestive system, improve nutrient absorption, and support a strong immune response. Our delayed-release capsules ensure the probiotics survive stomach acid to reach your intestines where they are needed most.',
    isFeatured: true,
    reviews: [
      { id: 'r6', user: 'Linda W.', rating: 5, comment: 'Finally found a probiotic that actually works for my bloating.', date: '2024-02-22' }
    ]
  },
  {
    id: '6',
    name: 'Organic Turmeric Curcumin',
    category: 'wellness',
    price: 2800,
    originalPrice: 3400,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=800',
    description: 'High-potency organic turmeric with black pepper for maximum absorption. Supports joint health and healthy inflammatory response.',
    longDescription: 'Experience the natural power of Turmeric. Our supplement contains 1500mg of organic turmeric root powder and 150mg of turmeric extract standardized to 95% curcuminoids. To ensure you get the full benefits, we\'ve included BioPerine (black pepper extract), which has been shown to increase curcumin absorption by up to 2000%. Ideal for supporting joint comfort, mobility, and overall cardiovascular health.',
    isFeatured: false,
    reviews: [
      { id: 'r7', user: 'Robert G.', rating: 5, comment: 'Helped significantly with my knee pain after running.', date: '2024-02-05' }
    ]
  },
  {
    id: '7',
    name: 'Apple Watch Series 9',
    category: 'wellness',
    price: 65000,
    originalPrice: 72000,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced health features, including blood oxygen and ECG apps. Track your daily activity and mental well-being.',
    longDescription: 'The Apple Watch Series 9 is more capable, more intuitive, and faster. With the new S9 SiP, the display is twice as bright, and you can interact with your watch without touching the screen using the new double tap gesture. It features advanced health sensors that provide deep insights into your physical and mental health, including heart rate notifications, sleep stage tracking, and temperature sensing for retrospective ovulation estimates.',
    isFeatured: false,
    reviews: [
      { id: 'r9', user: 'Kevin P.', rating: 5, comment: 'The health tracking is incredibly accurate. Best investment for my fitness.', date: '2024-02-25' }
    ]
  },
  {
    id: '8',
    name: 'Oura Ring Gen3',
    category: 'wellness',
    price: 45000,
    originalPrice: 50000,
    image: 'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?auto=format&fit=crop&q=80&w=800',
    description: 'Sleek, accurate health tracker that monitors your sleep, readiness, and activity levels from your finger.',
    longDescription: 'Oura Ring Gen3 is a revolutionary health tracker that delivers personalized health data, insights, and daily guidance. It monitors your sleep, activity, recovery, temperature, heart rate, and more with research-grade accuracy. By understanding how your body responds to your lifestyle, Oura helps you make better decisions for your health and performance. The sleek titanium design is water-resistant and has a battery life of up to 7 days.',
    isFeatured: false
  },
  {
    id: '9',
    name: 'Pure Eucalyptus Essential Oil',
    category: 'wellness',
    price: 1200,
    originalPrice: 1500,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
    description: '100% pure eucalyptus oil for aromatherapy and respiratory support. Refreshing and invigorating scent.',
    longDescription: 'Our Eucalyptus Essential Oil is steam-distilled from the leaves of the Eucalyptus globulus tree. Known for its powerful, refreshing aroma, it is a staple in aromatherapy for clearing the mind and supporting healthy respiration. It can be used in a diffuser to purify the air, added to a warm bath for a spa-like experience, or diluted with a carrier oil for a cooling chest rub. 100% pure and therapeutic grade.',
    isFeatured: false
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
    reviews: [
      { id: 'r8', user: 'Grace O.', rating: 5, comment: 'My doctor recommended this and I feel great taking it.', date: '2024-01-30' }
    ]
  },
  {
    id: '11',
    name: 'Folic Acid Tablets 5mg',
    category: 'mother-baby',
    price: 850,
    originalPrice: 1100,
    image: 'https://images.unsplash.com/photo-1550573105-4584e7d7e674?auto=format&fit=crop&q=80&w=800',
    description: 'Essential prenatal vitamin to support healthy fetal development and prevent neural tube defects.',
    longDescription: 'Folic Acid (Vitamin B9) is crucial for the healthy development of a baby\'s neural tube, which eventually becomes the brain and spinal cord. Taking a folic acid supplement before and during early pregnancy is strongly recommended by health professionals worldwide. Our 5mg tablets provide a high-potency dose for those who require additional support as advised by their healthcare provider.',
    isFeatured: false
  },
  {
    id: '12',
    name: 'Ferrous Sulphate 200mg',
    category: 'mother-baby',
    price: 950,
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3072467a?auto=format&fit=crop&q=80&w=800',
    description: 'Iron supplement to help prevent and treat iron-deficiency anemia during and after pregnancy.',
    longDescription: 'Iron is essential for the production of hemoglobin, the protein in red blood cells that carries oxygen to tissues. During pregnancy, your blood volume increases, and your body needs more iron for both you and your growing baby. Ferrous Sulphate is a well-established and effective form of iron supplement to help maintain healthy iron levels and prevent fatigue and anemia.',
    isFeatured: false
  },
  {
    id: '13',
    name: 'NAN Optipro 1 Formula (400g)',
    category: 'mother-baby',
    price: 1800,
    originalPrice: 2100,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    description: 'Premium starter infant formula for healthy babies from birth when breastfeeding is not possible.',
    longDescription: 'NAN OPTIPRO 1 is a premium starter infant formula that is specially designed to help ensure your formula-fed infant receives balanced, high-quality nutrition. It contains OPTIPRO, an optimized protein blend that supplies the right amount of proteins which is gentle on your baby\'s developing organs. It also contains Bifidobacterium lactis, a probiotic that helps support your baby\'s healthy digestive system.',
    isFeatured: false,
    reviews: [
      { id: 'r10', user: 'Alice J.', rating: 5, comment: 'My baby took to this formula immediately. No colic issues!', date: '2024-03-01' }
    ]
  },
  {
    id: '14',
    name: 'Liptomil Plus 1 Formula (400g)',
    category: 'mother-baby',
    price: 1650,
    originalPrice: 1950,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    description: 'High-quality infant formula enriched with essential nutrients for your baby\'s growth and development.',
    longDescription: 'Liptomil Plus 1 is a premium infant formula made in Switzerland. It is specifically formulated to provide all the vitamins, minerals, and trace elements your baby needs from birth to 6 months. It contains Omega-3 and Omega-6 fatty acids for brain and eye development, as well as prebiotics to support a healthy gut and immune system.',
    isFeatured: false
  },
  {
    id: '15',
    name: 'Premium Soft Diapers (Pack of 44)',
    category: 'mother-baby',
    price: 1450,
    originalPrice: 1800,
    image: 'https://images.unsplash.com/photo-1544126592-807daa2b565b?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-absorbent and soft diapers designed to keep your baby dry and comfortable for up to 12 hours.',
    longDescription: 'Our Premium Soft Diapers are engineered for maximum comfort and protection. Featuring a 3D absorbent core, they quickly lock away moisture to keep your baby\'s skin dry and prevent irritation. The soft, breathable outer cover allows air to circulate, while the stretchy waistbands and leg cuffs ensure a snug, leak-proof fit. Hypoallergenic and free from harsh chemicals.',
    isFeatured: false
  },
  {
    id: '16',
    name: 'Epimax Baby & Junior Cream',
    category: 'mother-baby',
    price: 1200,
    originalPrice: 1500,
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=800',
    description: 'Gentle emollient cream for dry skin conditions, suitable for babies and children. Fragrance and color-free.',
    longDescription: 'Epimax Baby & Junior is an all-purpose emollient cream that is gentle enough for daily use on sensitive young skin. It helps to soothe, hydrate, and protect the skin barrier, making it ideal for managing dry skin conditions like eczema. It is free from fragrances, colorants, and SLS, minimizing the risk of irritation. Can be used as a soap substitute or a leave-on moisturizer.',
    isFeatured: false
  },
  {
    id: '17',
    name: 'Dove Baby Rich Moisture Soap',
    category: 'mother-baby',
    price: 450,
    originalPrice: 600,
    image: 'https://images.unsplash.com/photo-1600857062241-99e5daee621d?auto=format&fit=crop&q=80&w=800',
    description: 'Hypoallergenic and pH-neutral baby bar that goes beyond mildness to help replenish essential moisture.',
    longDescription: 'Baby Dove Rich Moisture Baby Bar has a hypoallergenic and pH-neutral formula that\'s ophthalmologist, dermatologist, and pediatrician tested. Our baby bar is enriched with our 1/4 moisturizing cream, keeping your baby\'s skin feeling touchably soft and helping it retain its natural moisture. It\'s so gentle that you can use it on your newborn\'s sensitive skin.',
    isFeatured: false
  },
  {
    id: '18',
    name: 'No Rash Baby Barrier Cream',
    category: 'mother-baby',
    price: 750,
    originalPrice: 950,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
    description: 'Protective barrier cream to prevent and treat diaper rash, keeping baby\'s skin soft and protected.',
    longDescription: 'No Rash Barrier Cream provides a protective layer on your baby\'s skin to shield it from the irritating effects of wetness and friction. Formulated with zinc oxide and soothing natural oils, it helps to calm existing redness and prevent new rashes from forming. It\'s easy to apply and gentle enough for every diaper change.',
    isFeatured: false
  },
  {
    id: '19',
    name: 'Advanced Cold & Flu Relief',
    category: 'pharma',
    price: 650,
    originalPrice: 850,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'Effective relief from fever, aches, pains, and nasal congestion associated with cold and flu.',
    longDescription: 'Our Advanced Cold & Flu Relief tablets are formulated to provide fast-acting multi-symptom relief. They contain a combination of an analgesic to reduce fever and pain, and a decongestant to clear blocked noses and sinuses. This non-drowsy formula allows you to get on with your day while your body recovers.',
    isFeatured: false
  },
  {
    id: '20',
    name: 'Expert Cough Relief Syrup',
    category: 'pharma',
    price: 550,
    originalPrice: 750,
    image: 'https://images.unsplash.com/photo-1550573105-4584e7d7e674?auto=format&fit=crop&q=80&w=800',
    description: 'Soothing relief for both dry and chesty coughs. Helps clear congestion and ease throat irritation.',
    longDescription: 'Expert Cough Relief Syrup is a versatile formula designed to tackle various types of coughs. It contains expectorants to help loosen mucus in chesty coughs and demulcents to soothe the tickly sensation of dry coughs. The pleasant honey and lemon flavor makes it easy to take, providing comfort and helping you breathe easier.',
    isFeatured: false
  },
  {
    id: '21',
    name: 'Seven Seas Omega-3 Syrup (200ml)',
    category: 'pharma',
    price: 1850,
    originalPrice: 2200,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3072467a?auto=format&fit=crop&q=80&w=800',
    description: 'Rich in Omega-3 and Vitamin D to support healthy brain function, vision, and heart health in children and adults.',
    longDescription: 'Seven Seas Omega-3 with Vitamins A, D, E and C provides a rich source of Omega-3 fish oil and essential vitamins. It is specially formulated to support the health of your heart, brain, and vision. The added Vitamin D supports a healthy immune system and the maintenance of normal bones and teeth. The orange flavor makes it a favorite for the whole family.',
    isFeatured: true
  },
  {
    id: '22',
    name: 'Seven Seas Omega-3 Capsules (60s)',
    category: 'pharma',
    price: 2200,
    originalPrice: 2600,
    image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=800',
    description: 'High-purity fish oil capsules providing essential EPA and DHA for heart, brain, and eye health.',
    longDescription: 'Our Seven Seas Omega-3 capsules contain 1000mg of high-purity fish oil, providing a concentrated source of EPA and DHA. These essential fatty acids are vital for maintaining a healthy heart, supporting cognitive function, and preserving good vision. Our "Ocean Gold" purification process ensures the highest quality and purity, free from heavy metals and contaminants.',
    isFeatured: false
  },
  {
    id: '23',
    name: 'Comprehensive Multivitamin Syrup',
    category: 'pharma',
    price: 1250,
    originalPrice: 1550,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    description: 'A balanced blend of essential vitamins to support growth, immunity, and overall well-being in children.',
    longDescription: 'Our Comprehensive Multivitamin Syrup is designed to fill nutritional gaps in children\'s diets. It provides a full spectrum of vitamins, including A, C, D, and E, as well as the B-complex group. This balanced formula supports healthy growth and development, boosts the immune system, and helps maintain energy levels. The delicious fruit flavor ensures children enjoy taking their daily vitamins.',
    isFeatured: false
  },
  {
    id: '24',
    name: 'Vitamin C 500mg Dispensible (30s)',
    category: 'pharma',
    price: 450,
    originalPrice: 600,
    image: 'https://images.unsplash.com/photo-1615485242231-82869a81d3ac?auto=format&fit=crop&q=80&w=800',
    description: 'Easy-to-take dispensible Vitamin C tablets to boost immunity and support healthy skin and tissues.',
    longDescription: 'Vitamin C is a powerful antioxidant that plays a key role in supporting the immune system. Our 500mg dispensible tablets are designed for convenience - they dissolve quickly in the mouth or can be chewed, making them ideal for those who have difficulty swallowing pills. Regular intake helps protect cells from oxidative stress and supports the formation of collagen for healthy skin, bones, and gums.',
    isFeatured: false
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
    reviews: [
      { id: 'r11', user: 'Tom H.', rating: 5, comment: 'Instant relief from heartburn. I always keep this in my cabinet.', date: '2024-03-05' }
    ]
  },
  {
    id: '26',
    name: 'Calpol Infant Suspension (100ml)',
    category: 'pharma',
    price: 850,
    originalPrice: 1100,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    description: 'Gentle pain and fever relief for infants and children. Sugar-free and strawberry flavored.',
    longDescription: 'Calpol Infant Suspension contains paracetamol, a trusted ingredient for relieving pain and reducing fever in babies and children. It starts to work on fever in just 15 minutes and is gentle on delicate tummies. Our sugar-free, strawberry-flavored suspension is easy to administer with the included measuring syringe, providing comfort for your little one when they need it most.',
    isFeatured: false
  }
];
