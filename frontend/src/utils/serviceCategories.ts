export const SERVICE_CATEGORIES = [
  { key: "web-development", title: "WEB DEVELOPMENT", tagline: "Innovative Solutions, Cutting-Edge Tech", icon: "bi-globe2" },
  { key: "online-marketing", title: "ONLINE MARKETING", tagline: "Strategies That Drive Results", icon: "bi-megaphone-fill" },
  { key: "brand-identity", title: "BRAND IDENTITY", tagline: "Crafting Unique, Memorable Brands", icon: "bi-brush" },
] as const;

export type CategoryKey = (typeof SERVICE_CATEGORIES)[number]["key"];