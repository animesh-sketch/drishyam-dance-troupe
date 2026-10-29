/* =====================================================================
   DRISHYAM — EDITABLE SITE CONTENT
   ---------------------------------------------------------------------
   Edit everything here. No build step needed — save and refresh.
   Images: drop files into /assets/images/ using the filenames below.
   If an image is missing, an elegant placeholder is shown instead.
   RULE: only publish verified information (no invented awards,
   schedules, phone numbers, addresses or testimonials).
   ===================================================================== */

window.DRISHYAM = {
  brand: {
    name: "Drishyam Dance Troupe",
    short: "DRISHYAM",
    bengali: "দৃশ্যম",
    handle: "@drishyamddt",
    director: "Debapriya Sarkar & Oindrila Nath",
    instagram: "https://www.instagram.com/drishyamddt/",
    youtube: "https://www.youtube.com/channel/UCsG8gJfGTm0joV1t9Bqcl1A",
    // Leave empty until verified. When filled, it appears in Contact.
    email: "",
    phone: "+91 98744 99390",
    whatsapp: "919874499390", // digits only, with country code. Enquiry form sends here.
    location: "18/22 Fern Road, Kolkata 700019"
  },

  // Show small "add photo" hints on placeholders (set false before launch)
  showImageHints: false,

  images: {
    hero: "assets/images/hero.jpg",
    about1: "assets/images/about-1.jpg",
    about2: "assets/images/about-2.jpg",
    director: "assets/images/director.jpg",
    join: "assets/images/join.jpg"
  },

  hero: {
    title: "DRISHYAM",
    tagline: "Where Movement Becomes Expression.",
    text: "Celebrating the art of dance through culture, creativity, rhythm, and powerful performances."
  },

  about: {
    eyebrow: "About the Troupe",
    heading: "A collective shaped by <em>rhythm</em> and <em>story</em>.",
    body: [
      "Drishyam is a creative dance collective brought together by rhythm, expression, and a passion for performance. Through diverse choreography and cultural storytelling, the troupe celebrates the beauty of movement and the power of dance to connect people.",
      "From Bengali songs to stage productions and playful group content, every piece is built as a shared act of expression, where many bodies move as one."
    ],
    pillars: ["Group Choreography", "Cultural Performance", "Contemporary Presentation"]
  },

  founders: {
    heading: "The people behind <em>Drishyam</em>.",
    intro: "Drishyam is directed by Debapriya Sarkar and Oindrila Nath, who shape its choreography, performances and creative direction together.",
    bioPending: true, // shows a discreet "full biographies coming soon" note
    // Keep bios to verified facts only. `quote` is optional (empty = hidden).
    people: [
      {
        name: "Debapriya Sarkar",
        role: "Director",
        image: "assets/images/director.jpg",
        instagram: "https://www.instagram.com/debapriya_______sarkar/",
        bio: "Debapriya Sarkar co-directs Drishyam Dance Troupe, guiding its choreography and stage work.",
        quote: ""
      },
      {
        name: "Oindrila Nath",
        role: "Director",
        image: "assets/images/director-oindrila.jpg",
        instagram: "https://www.instagram.com/oindrila_nath/",
        bio: "Oindrila Nath co-directs Drishyam Dance Troupe, shaping its performances and creative vision.",
        quote: ""
      }
    ]
  },

  classes: {
    // Set to false and mark individual items `confirmed: true` once verified.
    allProposed: true,
    note: "These programmes are proposed and not yet confirmed. Send an enquiry to register your interest. We'll share details once sessions are announced.",
    items: [
      { no: "01", title: "Indian Classical Dance", bn: "শাস্ত্রীয় নৃত্য", text: "Grace, posture, mudra and rhythm: the grammar of classical movement, taught with care for tradition.", confirmed: false },
      { no: "02", title: "Contemporary Dance", bn: "সমকালীন", text: "Floor work, release and improvisation to discover a personal, expressive movement language.", confirmed: false },
      { no: "03", title: "Bollywood & Fusion", bn: "ফিউশন", text: "High-energy choreography blending film dance, folk and modern styles into joyful routines.", confirmed: false },
      { no: "04", title: "Group Choreography", bn: "দলগত নৃত্য", text: "Formations, timing and ensemble awareness: learning to move as one body on stage.", confirmed: false },
      { no: "05", title: "Performance Preparation", bn: "মঞ্চ প্রস্তুতি", text: "Stage presence, expression and rehearsal discipline for dancers preparing for live shows.", confirmed: false }
    ]
  },

  // Known performances & content. Add `youtubeId` (e.g. "dQw4w9WgXcQ")
  // or `link` to make a card playable/linkable. `image` is optional.
  performances: [
    { title: "বসন্ত জাগিল রে", latin: "Basanta Jagilo Re", type: "Bengali Performance", text: "A celebration of spring in movement: colour, devotion and joy carried through a Bengali song.", image: "assets/images/perf-basanta.jpg", youtubeId: "", link: "" },
    { title: "Pinga", latin: "Pinga", type: "Group Choreography", text: "A vibrant ensemble piece of synchronised energy, festive spirit and bold formations.", image: "assets/images/perf-pinga.jpg", youtubeId: "", link: "" },
    { title: "Utkontha 2.0", latin: "Live on Stage", type: "Stage Performance", text: "A full stage presentation by the troupe, performed live before an audience.", image: "assets/images/perf-utkontha.jpg", youtubeId: "", link: "" },
    { title: "Tongue Twister Pt. 2", latin: "Bengali Group Content", type: "Group Content", text: "Playful, rhythmic Bengali group content: wit and timing set in motion.", image: "assets/images/perf-tongue-twister.jpg", youtubeId: "", link: "" }
  ],

  // Gallery: add as many as you like. `size` = "tall" | "wide" | "" (normal)
  gallery: [
    { src: "assets/images/gallery-1.jpg", caption: "On stage", size: "tall" },
    { src: "assets/images/gallery-2.jpg", caption: "Rehearsal", size: "" },
    { src: "assets/images/gallery-3.jpg", caption: "Ensemble", size: "wide" },
    { src: "assets/images/gallery-4.jpg", caption: "Expression", size: "" },
    { src: "assets/images/gallery-5.jpg", caption: "Backstage", size: "tall" },
    { src: "assets/images/gallery-6.jpg", caption: "Formation", size: "" },
    { src: "assets/images/gallery-7.jpg", caption: "Celebration", size: "wide" }
  ]
};
