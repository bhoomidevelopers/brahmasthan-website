/**
 * BHOOMI DEVELOPERS — SITE CONFIGURATION
 * ========================================
 * All editable configuration values are stored here.
 * Change the WhatsApp number ONLY in this file — it applies to all forms automatically.
 */

const BHOOMI_CONFIG = {
  // WhatsApp number in international format (no + or spaces)
  // e.g. 919876543210 for +91 98765 43210
  whatsappNumber: "918374835533", // ← CHANGE THIS to your WhatsApp number

  // Company contact details
  companyPhone: "+91 83748 35533",         // ← CHANGE THIS
  companyEmail: "bhoomidevelopers.brahmasthan@gmail.com", // ← CHANGE THIS
  companyAddress: "Kothapet road, NSR International High School, Warangal", // ← CHANGE THIS
  companyTagline: "Building Spaces. Creating Possibilities.",

  // Social media (set to null to hide)
  socialInstagram: null,  // e.g. "https://instagram.com/bhoomidevelopers"
  socialFacebook: null,
  socialYoutube: null,
  socialLinkedin: null,
};

// Freeze config to prevent accidental mutation
Object.freeze(BHOOMI_CONFIG);
