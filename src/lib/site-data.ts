import benneDosa from "@/assets/benne-dosa.webp";
import biryani from "@/assets/biryani.webp";
import thali from "@/assets/thali.webp";
import filterCoffee from "@/assets/filter-coffee.webp";
import heroDosa from "@/assets/hero-dosa.webp";
import interior from "@/assets/interior.webp";
import spices from "@/assets/spices.webp";
import idliVada from "@/assets/idli-vada.webp";
import coffeePour from "@/assets/coffee-pour.webp";
import dosaTawa from "@/assets/dosa-tawa.webp";

export type CategoryId = "tiffin" | "meals" | "coffee";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
  alt: string;
  /** Only facts that follow directly from the dish name/description. */
  marker?: string;
}

export const SIGNATURE_DISHES: Dish[] = [
  {
    id: "benne-masala-dosa",
    name: "Benne Masala Dosa",
    description: "Butter-dripping, crispy golden dosa stuffed with spiced potato mash.",
    price: 9.5,
    category: "tiffin",
    image: benneDosa,
    alt: "Golden benne masala dosa topped with melting butter, folded over spiced potato on a banana leaf",
  },
  {
    id: "chettinad-chicken-biryani",
    name: "Chettinad Chicken Biryani",
    description:
      "Fragrant seeraga samba rice cooked with tender chicken and aromatic spices.",
    price: 14.0,
    category: "meals",
    image: biryani,
    alt: "Chettinad chicken biryani served in a hammered brass pot with whole spices around it",
    marker: "Contains chicken",
  },
  {
    id: "traditional-thali-meal",
    name: "Traditional Thali Meal",
    description: "Rice, sambar, rasam, kootu, poriyal, papad, payasam on a banana leaf.",
    price: 16.5,
    category: "meals",
    image: thali,
    alt: "Traditional South Indian meal of rice, sambar, rasam, kootu, poriyal, papad and payasam on a banana leaf",
    marker: "Served on a banana leaf",
  },
  {
    id: "madras-filter-coffee",
    name: "Madras Filter Coffee",
    description:
      "Strong, frothy, authentic South Indian decoction coffee served in a brass davarah.",
    price: 4.5,
    category: "coffee",
    image: filterCoffee,
    alt: "Frothy Madras filter coffee in a brass tumbler and davarah beside a brass coffee filter",
  },
];

export const MENU_CATEGORIES: { id: "all" | CategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tiffin", label: "Tiffin" },
  { id: "meals", label: "Rice & Meals" },
  { id: "coffee", label: "Coffee" },
];

export const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "story", label: "Our Story" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "visit", label: "Visit Us" },
] as const;

export const CONTACT = {
  address:
    "452, Spice Garden Road, Near Heritage Square, Sector 4, Bangalore - 560038",
  addressNote: "fictional demo address",
  phone: "+1 (555) 382-9104",
  phoneHref: "tel:+15553829104",
  phoneNote: "fictional placeholder",
  email: "hello@mavalliheritage.com",
  emailHref: "mailto:hello@mavalliheritage.com",
  emailNote: "fictional placeholder",
  hours: "Monday – Sunday, 7:00 AM – 10:30 PM",
};

export const ESTABLISHED = 1985;

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export const GALLERY: GalleryImage[] = [
  { src: heroDosa, alt: "Crisp ghee roast dosa on a brass plate with chutney and sambar", caption: "Ghee roast, straight off the tawa", width: 1536, height: 1024 },
  { src: dosaTawa, alt: "A cook spreading dosa batter in a spiral on a wood-fired iron tawa", caption: "The spiral that starts every dosa", width: 1024, height: 1536 },
  { src: interior, alt: "Heritage dining room with carved teak pillars, stone jali screens and brass lamps", caption: "The dining room at dusk", width: 1536, height: 1024 },
  { src: idliVada, alt: "Steaming idlis and a medu vada with three chutneys and sambar on a banana leaf", caption: "Idli, vada and the morning chutneys", width: 1024, height: 1536 },
  { src: spices, alt: "Whole dried chillies, curry leaves, turmeric and spices around a stone grinder", caption: "Spices, waiting for the stone", width: 1024, height: 1024 },
  { src: coffeePour, alt: "Filter coffee poured from a height between brass tumbler and davarah", caption: "The pour that makes the froth", width: 1024, height: 1536 },
  { src: thali, alt: "Banana leaf meal with rice, sambar, rasam, kootu, poriyal, papad and payasam", caption: "A meal on a banana leaf", width: 1536, height: 1024 },
  { src: biryani, alt: "Chettinad chicken biryani in a hammered brass pot", caption: "Chettinad biryani in brass", width: 1024, height: 1024 },
];

export const IMAGES = { heroDosa, dosaTawa, filterCoffee, thali, coffeePour, interior, benneDosa };
