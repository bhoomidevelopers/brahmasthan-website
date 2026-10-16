/**
 * BHOOMI DEVELOPERS — PROJECT DATA STORE
 * =========================================
 * Add new projects to this array.
 * Each project will automatically appear on:
 *   - Homepage featured projects (if featured: true)
 *   - Projects listing page
 *   - Its own detail page at /projects/[slug].html
 *
 * PROJECT DATA STRUCTURE:
 * -----------------------
 * name         string   — Display name of the project
 * slug         string   — URL slug (no spaces, lowercase), e.g. "brahmasthan"
 * status       string   — "Active" | "Upcoming" | "Completed"
 * featured     boolean  — Show on homepage featured section
 * tagline      string   — Short one-liner for cards
 * shortDesc    string   — 2–3 sentence description for cards
 * heroImage    string   — Path to full-width hero image
 * thumbnail    string   — Path to card thumbnail image
 * location     object   — Location details (see structure below)
 * statistics   array    — Key stats (value + label)
 * features     array    — Project features/highlights
 * gallery      array    — Paths to gallery images
 * mapEmbed     string   — Google Maps iframe src URL (or null)
 */

const PROJECTS = [
  {
    name: "Brahmasthan",
    slug: "brahmasthan",
    url: "projects/brahmasthan.html",   // path relative to site root
    status: "Active",
    featured: true,
    tagline: "A thoughtfully planned community spread across 10 acres.",
    shortDesc: "Brahmasthan offers 81 premium plots across a thoughtfully planned 10-acre development. Designed for those who value space, community, and long-term value.",
    heroImage: "assets/images/brahmasthan/thumb.png",
    thumbnail: "assets/images/brahmasthan/thumb.png",
    location: {
      area: "Kothapet road, NSR International High School, Warangal",         // ← FILL IN
      city: "Warangal",                     // ← FILL IN
      advantages: [
        "[Location Advantage 1 — Placeholder]",         // ← FILL IN
        "[Location Advantage 2 — Placeholder]",         // ← FILL IN
        "[Location Advantage 3 — Placeholder]",         // ← FILL IN
      ],
      landmarks: [
        { name: "[Landmark 1 — Placeholder]", distance: "[X km — Placeholder]" },
        { name: "[Landmark 2 — Placeholder]", distance: "[X km — Placeholder]" },
        { name: "[Landmark 3 — Placeholder]", distance: "[X km — Placeholder]" },
        { name: "[Landmark 4 — Placeholder]", distance: "[X km — Placeholder]" },
      ],
      connectivity: [
        "[Connectivity Point 1 — Placeholder]",         // ← FILL IN
        "[Connectivity Point 2 — Placeholder]",         // ← FILL IN
      ],
    },
    statistics: [
      { value: "81", label: "Premium Plots" },
      { value: "10", label: "Acres" },
      { value: "78", label: "Residentials" },
      { value: "3", label: "Commercials" },
      // Add more stats here: { value: "X", label: "Label" }
    ],
    Ammenities: [
      {
        icon: "layout",
        title: "[Feature Title — Placeholder]",
        description: "[Feature description placeholder. Describe this project feature here.]",
      },
      {
        icon: "shield",
        title: "[Feature Title — Placeholder]",
        description: "[Feature description placeholder. Describe this project feature here.]",
      },
      {
        icon: "tree",
        title: "[Feature Title — Placeholder]",
        description: "[Feature description placeholder. Describe this project feature here.]",
      },
      {
        icon: "road",
        title: "[Feature Title — Placeholder]",
        description: "[Feature description placeholder. Describe this project feature here.]",
      },
      {
        icon: "drop",
        title: "[Feature Title — Placeholder]",
        description: "[Feature description placeholder. Describe this project feature here.]",
      },
      {
        icon: "sun",
        title: "[Feature Title — Placeholder]",
        description: "[Feature description placeholder. Describe this project feature here.]",
      },
    ],
    gallery: [
      // Add gallery image paths here:
      // "assets/images/brahmasthan/gallery-01.jpg",
      // "assets/images/brahmasthan/gallery-02.jpg",
    ],
    mapEmbed: "https://www.google.com/maps?q=Brahmasthan,+Kothapet+Rd,+beside+NSR+International+School,+Warangal,+Telangana+506006&output=embed", // ← Replace with Google Maps embed src URL
    whatsappMessage: (name, phone) =>
      `Hi Bhoomi Developers, I'm interested in Brahmasthan. My name is ${name} and my contact number is ${phone}. Please share the project details.`,
  },

  // ─── ADD FUTURE PROJECTS BELOW ────────────────────────────────────────────
  // {
  //   name: "Project Two",
  //   slug: "project-two",
  //   featured: true,
  //   ...
  // },
];
