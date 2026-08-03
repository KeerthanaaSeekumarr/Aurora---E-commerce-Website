import { Product } from "./types";

export const CATEGORIES = ["All", "Audio", "Wearables", "Electronics", "Lifestyle"];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Aether Sound Pro",
    description: "Experience acoustic perfection with industry-leading hybrid active noise canceling, custom-engineered 40mm dynamic drivers, and up to 60 hours of high-fidelity playback. Crafted with premium memory foam earcups and a lightweight reinforced headband.",
    price: 299,
    category: "Audio",
    rating: 4.8,
    reviewCount: 124,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop"
    ],
    specs: {
      "Driver Size": "40mm Dynamic",
      "Frequency Response": "4Hz - 40kHz",
      "Connectivity": "Bluetooth 5.2 / 3.5mm Aux",
      "Battery Life": "Up to 60 Hours (ANC Off)",
      "Charging": "USB-C Fast Charge (10 min = 5 hours)"
    },
    colors: ["Nordic Black", "Platinum Silver", "Midnight Blue"],
    sizes: ["Standard"],
    inStock: true,
    badge: "Best Seller",
    featured: true,
    reviews: [
      {
        id: "rev-1-1",
        author: "Sarah Jenkins",
        rating: 5,
        comment: "Absolutely outstanding sound quality. The active noise canceling blocks out everything on my daily train commute.",
        date: "2026-07-15"
      },
      {
        id: "rev-1-2",
        author: "Marcus Chen",
        rating: 4,
        comment: "Very comfortable for long hours. Battery lasts forever. Sound stage is slightly warm, which I love.",
        date: "2026-07-28"
      }
    ]
  },
  {
    id: "prod-2",
    name: "Nova Smart Band v4",
    description: "Track your health with unmatched precision. Features a stunning 1.62\" curved AMOLED display, continuous blood oxygen monitoring, 120+ workout modes, and automatic sleep phase analysis. Rated 5ATM waterproof for swimmers.",
    price: 79,
    category: "Wearables",
    rating: 4.5,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop"
    ],
    specs: {
      "Display": "1.62\" AMOLED (192 x 490 px)",
      "Sensors": "PPG Heart Rate, 3-axis Accelerometer, Gyroscope",
      "Water Resistance": "5 ATM (Up to 50 meters)",
      "Battery Life": "Up to 14 Days",
      "Compatibility": "iOS 12.0+ / Android 6.0+"
    },
    colors: ["Obsidian Black", "Sage Green", "Coral Pink"],
    sizes: ["Regular", "Large"],
    inStock: true,
    badge: "New",
    featured: true,
    reviews: [
      {
        id: "rev-2-1",
        author: "Emma Watson",
        rating: 5,
        comment: "Lightweight and packs so many features for the price! Sleep tracking is incredibly accurate.",
        date: "2026-07-20"
      }
    ]
  },
  {
    id: "prod-3",
    name: "Helix Mechanical Keyboard",
    description: "The keyboard enthusiast's dream. Features a gasket-mounted design, hot-swappable custom linear switches, and pre-lubed stabilizers. Encased in a CNC-milled anodized aluminum frame with sleek RGB underglow and double-shot PBT keycaps.",
    price: 189,
    category: "Electronics",
    rating: 4.9,
    reviewCount: 56,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop"
    ],
    specs: {
      "Layout": "75% Form Factor (82 Keys)",
      "Switches": "Helix Linear Cream (45g actuation)",
      "Hot-swap": "3-pin/5-pin Support",
      "Mounting Style": "Gasket Mounted",
      "Interface": "Detachable USB-C / 2.4GHz Wireless"
    },
    colors: ["Carbon Grey", "Arctic White"],
    sizes: ["Linear Switches", "Tactile Switches"],
    inStock: true,
    badge: "Trending",
    featured: true,
    reviews: [
      {
        id: "rev-3-1",
        author: "David Miller",
        rating: 5,
        comment: "The typing sound is absolute heaven. Like raindrops. Best keyboard I have ever owned out of the box.",
        date: "2026-07-02"
      }
    ]
  },
  {
    id: "prod-4",
    name: "Horizon Desk Mat",
    description: "Bring organization and texture to your desk setup. Made from premium, water-resistant merino wool felt with a non-slip natural cork backing. Provides a soft, warm surface for your hands and optimal tracking for optical mice.",
    price: 49,
    category: "Lifestyle",
    rating: 4.6,
    reviewCount: 213,
    images: [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=600&auto=format&fit=crop"
    ],
    specs: {
      "Material": "80% Merino Wool Felt / 20% Cork",
      "Dimensions": "900mm x 400mm (Medium)",
      "Thickness": "4mm",
      "Care": "Spot clean only"
    },
    colors: ["Minimal Grey", "Charcoal Black", "Oatmeal Beige"],
    sizes: ["Medium (90x40cm)", "Large (120x60cm)"],
    inStock: true,
    reviews: [
      {
        id: "rev-4-1",
        author: "Liam Neeson",
        rating: 4,
        comment: "Excellent quality. Mouse slides smoothly, and it makes my desk setup look so professional.",
        date: "2026-07-10"
      }
    ]
  },
  {
    id: "prod-5",
    name: "Lumina Ambient Lamp",
    description: "An elegant sculptural lamp that delivers customizable ambient illumination. Seamlessly control color temperatures, brightness levels, and dynamic gradients via touch controls or our companion app. Supports Apple HomeKit and Google Home.",
    price: 129,
    category: "Electronics",
    rating: 4.4,
    reviewCount: 42,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop"
    ],
    specs: {
      "Light Output": "800 Lumens Max",
      "Color Temp": "2000K - 6500K + RGB",
      "Power Consump": "12W",
      "Smart Integrations": "Apple HomeKit, Google Home, Alexa",
      "Dimensions": "35cm Height x 12cm Base"
    },
    colors: ["Alabaster White", "Midnight Onyx"],
    sizes: ["Standard"],
    inStock: true,
    reviews: [
      {
        id: "rev-5-1",
        author: "Sophie Turner",
        rating: 5,
        comment: "The sunrise alarm feature has completely changed how I wake up. Extremely sleek design.",
        date: "2026-06-18"
      }
    ]
  },
  {
    id: "prod-6",
    name: "Vortex Wireless Mouse",
    description: "Ultimate ergonomic performance. Engineered with an ultra-lightweight shell, zero-latency 2.4GHz wireless connection, and a state-of-the-art 26,000 DPI optical sensor. Includes side programmable macros and ergonomic thumb rest.",
    price: 99,
    category: "Electronics",
    rating: 4.7,
    reviewCount: 74,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop"
    ],
    specs: {
      "Sensor": "Vortex Gen-V Optical (26k DPI)",
      "Weight": "63 grams",
      "Battery Life": "Up to 90 Hours (Continuous)",
      "Polling Rate": "1000Hz (1ms)",
      "Switches": "Optical Mouse Switches (100M click rating)"
    },
    colors: ["Ghost White", "Stealth Black"],
    sizes: ["Right Handed"],
    inStock: true,
    reviews: []
  },
  {
    id: "prod-7",
    name: "Elysian Leather Wallet",
    description: "Meticulously crafted from full-grain vegetable-tanned Italian leather. Slim profile holds up to 8 cards and folded cash. Features integrated RFID protection to guard your credentials against unauthorized scanning.",
    price: 59,
    category: "Lifestyle",
    rating: 4.8,
    reviewCount: 145,
    images: [
      "https://images.unsplash.com/photo-1627124118123-2d6b9e31ffed?q=80&w=600&auto=format&fit=crop"
    ],
    specs: {
      "Material": "Full-Grain Italian Calfskin",
      "Capacity": "6-8 Cards + Cash",
      "Dimensions": "10.2cm x 7.4cm x 0.6cm",
      "Weight": "28 grams",
      "Security": "RFID Blocking Layer"
    },
    colors: ["Tan Brown", "Cognac Gold", "Stealth Black"],
    sizes: ["Slim Cardholder"],
    inStock: true,
    badge: "Sale",
    reviews: [
      {
        id: "rev-7-1",
        author: "Oliver Queen",
        rating: 5,
        comment: "The leather smells amazing and patinas beautifully. It holds all my cards and is super slim.",
        date: "2026-05-30"
      }
    ]
  },
  {
    id: "prod-8",
    name: "Chronos smartwatch",
    description: "A timeless masterpiece meets modern tech. Encased in grade-5 aerospace titanium, with a sapphire crystal display. Tracks advanced cardiovascular health metrics, features dual-frequency GPS, and has an elegant leather band.",
    price: 450,
    category: "Wearables",
    rating: 4.9,
    reviewCount: 38,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"
    ],
    specs: {
      "Case Material": "Grade 5 Titanium",
      "Glass": "Sapphire Crystal",
      "Battery": "Up to 5 Days (Smart Mode) / 21 Days (Watch Mode)",
      "Sensors": "ECG, SpO2, Skin Temp, Altimeter, Compass",
      "Band": "Handcrafted Italian Leather"
    },
    colors: ["Titanium Silver", "Space Black"],
    sizes: ["42mm", "46mm"],
    inStock: true,
    badge: "Trending",
    featured: true,
    reviews: []
  },
  {
    id: "prod-9",
    name: "Apex Commuter Backpack",
    description: "Designed for the modern professional. Featuring a water-repellent shell, structured lay-flat main compartment for TSA ease, a dedicated 16\" padded laptop sleeve, and hidden pocket panels for passport and wallet.",
    price: 135,
    category: "Lifestyle",
    rating: 4.6,
    reviewCount: 92,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop"
    ],
    specs: {
      "Capacity": "22 Liters",
      "Material": "900D Cordura Ballistic Nylon",
      "Laptop Pocket": "Fits up to 16\" MacBook Pro",
      "Dimensions": "48cm x 30cm x 15cm",
      "Weight": "1.1 kg"
    },
    colors: ["Matte Black", "Stone Grey", "Olive Green"],
    sizes: ["Standard"],
    inStock: false,
    reviews: []
  },
  {
    id: "prod-10",
    name: "Aura Walnut Wireless Charger",
    description: "Fast-charge your devices in style. This MagSafe-compatible 15W Qi wireless charger is machined from a single piece of solid American walnut and weighted with a heavy steel base so it stays firmly on your desk.",
    price: 65,
    category: "Electronics",
    rating: 4.7,
    reviewCount: 67,
    images: [
      "https://images.unsplash.com/photo-1622445262465-2481c4574875?q=80&w=600&auto=format&fit=crop"
    ],
    specs: {
      "Material": "Solid American Walnut Wood / Anodized Aluminum",
      "Charging Standard": "Qi / MagSafe Compatible",
      "Max Output": "15W Fast Wireless Charging",
      "Cable": "Integrated 1.5m Braided Nylon USB-C Cable",
      "Base": "Non-slip Weighted Steel Pad"
    },
    colors: ["Natural Walnut", "Dark Oak"],
    sizes: ["Single Charger", "Dual Charger (Phone + Buds)"],
    inStock: true,
    reviews: [
      {
        id: "rev-10-1",
        author: "Jack Dorsey",
        rating: 5,
        comment: "Excellent craftsmanship. The wood grain is gorgeous. Weights down so it doesn't slide around.",
        date: "2026-07-22"
      }
    ]
  }
];
