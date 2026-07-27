// ──────────────────────────────────────────────────────────────────────────────
//  MathX Club — Member Data
//  Edit this file to add, remove, or update members.
//
//  Fields:
//    id           → unique URL-safe slug (used in QR code URL)
//    name         → full name
//    designation  → role in the club
//    initials     → 2–3 letters shown in avatar (if no photo)
//    avatarColor  → hex color for the avatar gradient
//    bio          → short tagline / description
//    instagram    → Instagram handle (without @)
//    linkedin     → LinkedIn profile slug (the part after /in/)
//    github       → GitHub username
//    email        → email address
//    twitter      → Twitter/X handle (without @)
//    whatsapp     → phone number with country code (e.g. +919876543210)
//
//  Any field except id, name, designation, and initials is optional.
//  If a field is missing or empty (""), its social button will be hidden.
// ──────────────────────────────────────────────────────────────────────────────

const MEMBERS = [
  {
    id: "krushna-pawar",
    name: "Krushna Pawar",
    designation: "President",
    initials: "KP",
    avatarColor: "#7c3aed",
    bio: "Driving MathX to new heights with a passion for pure mathematics 🎯",
    instagram: "https://www.instagram.com/krushn._.pawar?igsh=dHN3MmE2b2d4aDZk",
    linkedin: "",
    github: "",
    email: "",
    twitter: "",
    whatsapp: ""
  },
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    designation: "Vice President",
    initials: "AM",
    avatarColor: "#0891b2",
    bio: "Bridging theory and application in competitive mathematics 📐",
    instagram: "arjunmehta_",
    linkedin: "arjun-mehta",
    github: "arjunmehta",
    email: "arjun@mathx.club",
    twitter: "arjun_mehta",
    whatsapp: "+919876543211"
  },
  {
    id: "sneha-rao",
    name: "Sneha Rao",
    designation: "Technical Head",
    initials: "SR",
    avatarColor: "#059669",
    bio: "Building the digital backbone of MathX, one commit at a time ⚙️",
    instagram: "sneharao.tech",
    linkedin: "sneha-rao-tech",
    github: "sneharao",
    email: "sneha@mathx.club",
    twitter: "sneha_rao",
    whatsapp: "+919876543212"
  },
  {
    id: "karan-verma",
    name: "Karan Verma",
    designation: "Design Head",
    initials: "KV",
    avatarColor: "#db2777",
    bio: "Crafting aesthetics that make mathematics beautiful ✨",
    instagram: "karanverma.design",
    linkedin: "karan-verma-design",
    github: "karanverma",
    email: "karan@mathx.club",
    twitter: "karan_designs",
    whatsapp: "+919876543213"
  },
  {
    id: "riya-patel",
    name: "Riya Patel",
    designation: "Events Head",
    initials: "RP",
    avatarColor: "#d97706",
    bio: "Organizing the most exciting math events on campus 🎉",
    instagram: "riya_events",
    linkedin: "riya-patel-events",
    github: "riyapatel",
    email: "riya@mathx.club",
    twitter: "riya_patel",
    whatsapp: "+919876543214"
  },
  {
    id: "dev-singhania",
    name: "Dev Singhania",
    designation: "Marketing Head",
    initials: "DS",
    avatarColor: "#c026d3",
    bio: "Spreading the love of mathematics far and wide 📢",
    instagram: "devsinghania",
    linkedin: "dev-singhania",
    github: "devsinghania",
    email: "dev@mathx.club",
    twitter: "dev_singhania",
    whatsapp: "+919876543215"
  },
  {
    id: "ananya-gupta",
    name: "Ananya Gupta",
    designation: "Treasurer",
    initials: "AG",
    avatarColor: "#0284c7",
    bio: "Keeping MathX's finances in perfect order 💰",
    instagram: "ananya_gupta",
    linkedin: "ananya-gupta",
    github: "ananyagupta",
    email: "ananya@mathx.club",
    twitter: "ananya_gupta",
    whatsapp: "+919876543216"
  },
  {
    id: "rohan-iyer",
    name: "Rohan Iyer",
    designation: "Secretary",
    initials: "RI",
    avatarColor: "#16a34a",
    bio: "The organizational backbone keeping MathX running smoothly 📋",
    instagram: "rohan_iyer",
    linkedin: "rohan-iyer",
    github: "rohaniyer",
    email: "rohan@mathx.club",
    twitter: "rohan_iyer",
    whatsapp: "+919876543217"
  }
];
