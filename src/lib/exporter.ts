export const images = {
  logo: "/kelalmenu_logo.jpg",
  about_side: "/about_side.png",
  loading_gif: "/loading.gif",
};

export const links = {
  home: "/",
  base_url: "https://www.kelalmenu.com",
  about: "/#about",
  pricing: "/pricing",
  contact_us: "/#contact_us",
  login: "/auth/login",
  register: "/auth/register",
  hotel_dashboard: "/kelalmenu/hotels/dashboard",
  hotel_home: "/kelalmenu/hotels",
  public_menu: "public-menu",
};

export const hotel_links = [
  {
    label: "Profile",
    isActive: true,
    link: "profile",
    desc: "update your hotel information",
  },
  {
    label: "Menu",
    isActive: true,
    link: "menu",
    desc: "update and add new Menu item",
  },
  {
    label: "My QR Code",
    isActive: true,
    link: "my-qr-code",
    desc: "Generate -> Print your QR code",
  },
  {
    label: "My Ad Campaigns",
    isActive: true,
    link: "my-ad-campaigns",
    desc: "Create -> update your Ad",
  },
  {
    label: "Upgrade",
    isActive: true,
    link: "upgrade",
    desc: "Upgrade your subscription level",
  },
  {
    label: "Orders",
    isActive: false,
    link: "orders",
    desc: "Check and see your orders",
  },
  {
    label: "Analytics",
    isActive: false,
    link: "analytics",
    desc: "see your menu analytics",
  },
  {
    label: "Settings",
    isActive: false,
    link: "settings",
    desc: "update your setting",
  },
];
export const constants = {
  name: "kelalmenu",
  syllable: ": Transform Your Restaurant Menu into a Digital QR Code",
};

export const errors = {
  somethingWentWrong: {
    error: true,
    success: false,
    data: null,
    message: "Something went wrong please try again",
  },
};

export const metadataKeywordsList = {
  geographic: [
    "Ethiopia digital menu",
    "Addis Ababa QR code menu",
    "Ethiopian restaurant app",
    "Africa contactless menu",
    "East Africa menu digitization",
  ],
  foodBased: [
    "Ethiopian cuisine QR menu",
    "Injera digital ordering",
    "Tibs restaurant menu app",
    "Kitfo contactless menu",
    "Doro wat online menu",
    "Coffee ceremony digital menu",
    "Shiro food QR code",
    "Ethiopian injera app",
  ],
  general: [
    "digital menu",
    "QR code menu",
    "restaurant menu app",
    "contactless menu",
    "menu digitization",
    "online menu system",
    "mobile restaurant menu",
    "real-time menu updates",
    "QR ordering system",
    "restaurant tech solution",
  ],
};

const metadataKeywords = [
  ...metadataKeywordsList.geographic,
  ...metadataKeywordsList.foodBased,
  ...metadataKeywordsList.general,
].join(", ");

export const basic_metadata = {
  title: `${constants.name} ${constants.syllable}`,
  description: `Revolutionize your dining experience with ${constants.name}. Easily convert traditional menus to interactive digital QR code menus. Boost efficiency, reduce printing costs, and engage customers with real-time updates. Start free today!`,
  keywords: metadataKeywords,
  openGraph: {
    title: `${constants.name} ${constants.syllable}`,
    description: `Revolutionize your dining experience with ${constants.name}. Easily convert traditional menus to interactive digital QR code menus. Boost efficiency, reduce printing costs, and engage customers with real-time updates. Start free today!`,
    url: `${constants.name}`,
    siteName: constants.name,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${constants.name} ${constants.syllable}`,
    description: `Revolutionize your dining experience with ${constants.name}. Easily convert traditional menus to interactive digital QR code menus. Boost efficiency, reduce printing costs, and engage customers with real-time updates. Start free today!`,
    images: ["/twitter-image.jpg"],
  },
};

export const navLinks = [
  {
    url: links.home,
    label: "Home",
    isActive: true,
  },
  {
    url: links.about,
    label: "About",
    isActive: true,
  },
  {
    url: links.contact_us,
    label: "Contact us",
    isActive: true,
  },
  {
    url: links.pricing,
    label: "Pricing",
    isActive: true,
  },
];

export const basic_info = {
  email: "contact@agelgl.com",
  phoneCTA: "tel: +251986190354",
  phone: "+251986190354",
};
