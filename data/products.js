// data/products.js
export const PRODUCTS = [
  // Original Products (8)
  { 
    id: 1, 
    name: "Smart Feeder Pro", 
    description: "AI-powered automatic feeder with portion control", 
    price: 149, 
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80",
    badge: "BEST SELLER", 
    features: ["AI Powered", "Schedule", "Portion Control"], 
    reviews: 2847, 
    category: "feeding" 
  },
  { 
    id: 2, 
    name: "GPS Pet Tracker", 
    description: "Real-time location tracking with geo-fencing", 
    price: 99, 
    image: "https://images.unsplash.com/photo-1588943211346-0908e1fd9794?w=500&q=80",
    badge: "NEW ARRIVAL", 
    features: ["GPS", "Long Battery", "Geo-Fencing"], 
    reviews: 1562, 
    category: "tracking" 
  },
  { 
    id: 3, 
    name: "PetPace Smart Collar", 
    description: "Health monitoring collar with vital signs tracking", 
    price: 199, 
    image: "https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=500&q=80",
    badge: "TOP RATED", 
    features: ["Heart Rate", "Activity", "Temperature"], 
    reviews: 2103, 
    category: "health" 
  },
  { 
    id: 4, 
    name: "Self-Cleaning Litter Box", 
    description: "Automatic litter box with odor control", 
    price: 249, 
    image: "https://images.unsplash.com/photo-1568049166823-286d562bc3e4?w=500&q=80",
    badge: "PREMIUM", 
    features: ["Auto Clean", "App Control", "Odor Control"], 
    reviews: 1789, 
    category: "hygiene" 
  },
  { 
    id: 5, 
    name: "Interactive Ball Launcher", 
    description: "Automatic ball thrower for endless play", 
    price: 129, 
    image: "https://images.unsplash.com/photo-1623384646149-7f4c9ab3deb9?w=500&q=80",
    badge: "FUN PICK", 
    features: ["Auto Launch", "Remote", "Adjustable"], 
    reviews: 1345, 
    category: "toys" 
  },
  { 
    id: 6, 
    name: "Fi Smart Dog Collar", 
    description: "Advanced GPS and activity tracking collar", 
    price: 149, 
    image: "https://images.unsplash.com/photo-1517849845537-4d2579024544?w=500&q=80",
    badge: "BEST VALUE", 
    features: ["GPS", "Fitness", "Long Battery"], 
    reviews: 2456, 
    category: "tracking" 
  },
  { 
    id: 7, 
    name: "Smart Pet Camera", 
    description: "HD camera with two-way audio and treat dispenser", 
    price: 89, 
    image: "https://images.unsplash.com/photo-1570549717489-6ca8188b3f20?w=500&q=80",
    badge: "MUST HAVE", 
    features: ["HD Video", "Treats", "2-Way Audio"], 
    reviews: 3124, 
    category: "monitoring" 
  },
  { 
    id: 8, 
    name: "Tractive GPS Tracker", 
    description: "Waterproof GPS tracker for pets", 
    price: 59, 
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80",
    badge: "BUDGET PICK", 
    features: ["Waterproof", "Live Tracking", "Affordable"], 
    reviews: 1987, 
    category: "tracking" 
  },

  // Additional Products (5)
  {
    id: 9,
    name: 'Smart Water Fountain',
    price: 89,
    category: 'feeding',
    image: 'https://images.unsplash.com/photo-1584201637011-12b9f3e9455b?w=500&q=80',
    description: 'Filtered water fountain with circulation and UV sterilization.',
    features: ['UV Filter', 'Quiet Pump', '2L Capacity'],
    badge: 'ECO FRIENDLY',
    reviews: 895
  },
  {
    id: 10,
    name: 'Smart Pet Door',
    price: 249,
    category: 'access',
    image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=500&q=80',
    description: 'Microchip-activated door with app control and scheduling.',
    features: ['Chip Reader', 'Weather Seal', 'App Lock'],
    badge: 'SMART HOME',
    reviews: 678
  },
  {
    id: 11,
    name: 'Pet Fitness Tracker',
    price: 69,
    category: 'health',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80',
    description: 'Activity and sleep tracker with health insights.',
    features: ['Steps', 'Calories', 'Sleep Track'],
    badge: 'NEW',
    reviews: 542
  },
  {
    id: 12,
    name: 'Heating Pet Bed',
    price: 119,
    category: 'comfort',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80',
    description: 'Temperature-controlled bed with memory foam.',
    features: ['Temp Control', 'Memory Foam', 'Washable'],
    badge: 'COMFORT',
    reviews: 1267
  },
  {
    id: 13,
    name: 'DNA Test Kit',
    price: 159,
    category: 'health',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&q=80',
    description: 'Comprehensive DNA testing for breed and health insights.',
    features: ['Breed ID', 'Health Risks', 'Traits'],
    badge: 'SCIENCE',
    reviews: 398
  }
];

export default PRODUCTS;