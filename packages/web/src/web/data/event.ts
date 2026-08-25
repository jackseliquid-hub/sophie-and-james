/**
 * Single source of truth for every piece of event content on the site.
 *
 * Nothing in `components/site/*` hard-codes copy, names, times or images — it all comes from the
 * `event` object below. In the production Jacks Studio product this object is what the host
 * dashboard / CMS writes, so the same components can render a birthday, christening, anniversary
 * or corporate event without touching the UI layer.
 */

export type EventType =
  | "wedding"
  | "birthday"
  | "christening"
  | "anniversary"
  | "baby-shower"
  | "engagement"
  | "corporate"
  | "other";

export type EventStage = "before" | "day" | "after";

export interface Host {
  firstName: string;
  role?: string;
}

export interface ScheduleItem {
  time: string;
  /** 24h "HH:mm" — used for ordering and for the day-of "happening now" logic. */
  time24: string;
  title: string;
  note?: string;
}

export interface KeyMoment {
  label: string;
  time: string;
}

export interface StoryChapter {
  year: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  /** Rough aspect for the masonry layout. */
  shape: "tall" | "wide" | "square";
}

export interface GuestPhoto {
  id: string;
  src: string;
  alt: string;
  guest: string;
  caption?: string;
  moment: GuestPhotoMoment;
  /** Object URLs created in-session by the demo uploader. */
  local?: boolean;
}

export type GuestPhotoMoment = "before" | "ceremony" | "reception" | "evening";

export interface Accommodation {
  name: string;
  kind: string;
  image: string;
  distance: string;
  price: string;
  note: string;
}

export interface GiftItem {
  id: string;
  name: string;
  note: string;
  price: number;
  /** Shop or maker the couple picked it from. Fictional for this showcase. */
  from: string;
  category: "The kitchen" | "The table" | "The home" | "The garden";
  /** Already claimed by another guest before the demo starts. */
  reserved?: boolean;
}

export interface GiftListPage {
  eyebrow: string;
  heading: string;
  intro: string;
  image: string;
  imageAlt: string;
  categories: GiftItem["category"][];
  items: GiftItem[];
  /** Shown in place of the "buy" step, because this prototype takes no payments. */
  demoNote: string;
  closing: { heading: string; copy: string };
}

export interface FundTier {
  id: string;
  amount: number;
  title: string;
  copy: string;
}

export interface HoneymoonFundPage {
  eyebrow: string;
  heading: string;
  intro: string;
  image: string;
  imageAlt: string;
  destination: string;
  /** Fictional target in GBP, used for the progress indicator. */
  target: number;
  /** Fictional amount already pledged before the demo starts. */
  raised: number;
  tiers: FundTier[];
  itinerary: { day: string; title: string; copy: string }[];
  demoNote: string;
  closing: { heading: string; copy: string };
}

export interface TravelBlock {
  icon: "car" | "parking" | "taxi" | "train" | "clock";
  title: string;
  lines: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface EventConfig {
  eventType: EventType;
  hosts: Host[];
  /** Display name, e.g. "Sophie & James". */
  title: string;
  monogram: string;
  /** ISO local datetime of the headline moment. */
  startsAt: string;
  dateLong: string;
  dateShort: string;
  region: string;
  hashtag?: string;
  url: string;

  invitation: {
    kicker: string;
    cta: string;
    heroImage: string;
    heroAlt: string;
  };

  intro: {
    heading: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
    signature: string;
  };

  countdown: {
    label: string;
    arrivedTitle: string;
    arrivedCopy: string;
    afterTitle: string;
    afterCopy: string;
  };

  keyMoments: KeyMoment[];

  venue: {
    name: string;
    region: string;
    addressLines: string[];
    what3words: string;
    blurb: string;
    image: string;
    imageAlt: string;
    detailImage: string;
    detailImageAlt: string;
    mapsQuery: string;
  };

  schedule: ScheduleItem[];
  story: StoryChapter[];

  dressCode: {
    heading: string;
    label: string;
    copy: string;
    notes: string[];
    image: string;
    imageAlt: string;
  };

  accommodation: Accommodation[];
  travel: TravelBlock[];

  gifts: {
    heading: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
  };

  giftList: GiftListPage;
  honeymoonFund: HoneymoonFundPage;

  gallery: GalleryImage[];

  guestPhotos: {
    heading: string;
    copy: string;
    privacyNote: string;
    seed: GuestPhoto[];
  };

  notices: { title: string; copy: string }[];
  faq: FaqItem[];

  rsvp: {
    heading: string;
    copy: string;
    deadline: string;
    dietaryOptions: string[];
    maxGuests: number;
  };
}

export const event: EventConfig = {
  eventType: "wedding",
  hosts: [{ firstName: "Sophie" }, { firstName: "James" }],
  title: "Sophie & James",
  monogram: "S & J",
  startsAt: "2026-09-12T14:00:00",
  dateLong: "Saturday 12 September 2026",
  dateShort: "12 September 2026",
  region: "Lancashire",
  hashtag: "#SophieAndJames2026",
  url: "https://sophie-and-james.jacksstudio.co.uk",

  invitation: {
    kicker: "We're getting married",
    cta: "Enter invitation",
    heroImage: "/images/hero.jpg",
    heroAlt:
      "Sophie and James walking hand in hand through a misty Lancashire woodland meadow at golden hour",
  },

  intro: {
    heading: "We're getting married!",
    paragraphs: [
      "After years of adventures, laughs, terrible dancing and far too many arguments about where to eat, we're finally getting married.",
      "We'd love you to join us as we celebrate with the people who mean the most to us.",
    ],
    image: "/images/couple-portrait.jpg",
    imageAlt: "Sophie and James laughing forehead to forehead in a sunlit country garden",
    signature: "Sophie & James",
  },

  countdown: {
    label: "Until we say I do",
    arrivedTitle: "The day we've been waiting for has arrived.",
    arrivedCopy: "Today we're getting married. Thank you for being here with us.",
    afterTitle: "What a day.",
    afterCopy:
      "Thank you for celebrating with us — and for every photograph, every speech and every terrible dance move.",
  },

  keyMoments: [
    { label: "Ceremony", time: "2:00 PM" },
    { label: "Reception", time: "4:00 PM" },
    { label: "Evening celebration", time: "7:00 PM" },
  ],

  venue: {
    name: "Woodland Hall",
    region: "Lancashire",
    addressLines: ["Woodland Hall", "Harrowby Lane, Ellerby Green", "Lancashire, LA9 4TQ"],
    what3words: "///hazel.copse.lantern",
    blurb:
      "A honey-stone hall at the end of a long beech avenue, with a walled garden, a woodland ceremony clearing and a candlelit dining room that looks out over the fells. We fell in love with it in about four minutes.",
    image: "/images/venue-exterior.jpg",
    imageAlt: "Woodland Hall, a honey-stone country manor framed by mature oak and beech trees",
    detailImage: "/images/ceremony-aisle.jpg",
    detailImageAlt: "A woodland ceremony aisle lined with wooden benches",
    mapsQuery: "Woodland Hall, Ellerby Green, Lancashire",
  },

  schedule: [
    {
      time: "1:30 PM",
      time24: "13:30",
      title: "Guests arrive",
      note: "Park, grab a drink and find a seat in the clearing.",
    },
    { time: "2:00 PM", time24: "14:00", title: "Ceremony", note: "Please be seated by 1:50 PM." },
    {
      time: "3:00 PM",
      time24: "15:00",
      title: "Drinks & photographs",
      note: "Fizz in the walled garden. Group photos will be quick, we promise.",
    },
    {
      time: "4:00 PM",
      time24: "16:00",
      title: "Wedding breakfast",
      note: "Long tables, candles, and speeches you can heckle politely.",
    },
    {
      time: "7:00 PM",
      time24: "19:00",
      title: "Evening celebration",
      note: "Band, dancing, and something greasy at half ten.",
    },
    { time: "12:00 AM", time24: "24:00", title: "Carriages", note: "Taxis from the front steps." },
  ],

  story: [
    {
      year: "2019",
      title: "We met",
      copy: "A friend's birthday in a crowded pub in Stockwell. James spilled most of a glass of red on Sophie's coat within eleven minutes. She stayed anyway.",
      image: "/images/story-2019.jpg",
      alt: "Sophie and James laughing at a small table in a warmly lit pub",
    },
    {
      year: "2021",
      title: "Our first adventure together",
      copy: "Four days walking the coast with one waterproof between us. It rained for three of them. We've been going back every year since.",
      image: "/images/story-2021.jpg",
      alt: "Sophie and James standing together on a windswept clifftop path above the sea",
    },
    {
      year: "2024",
      title: "We bought our first home",
      copy: "A slightly wonky terrace with good light and a terrible kitchen. We sat on the floor with tea and takeaway for the first two weeks.",
      image: "/images/story-2024.jpg",
      alt: "Sophie and James sitting on bare floorboards among moving boxes, drinking tea",
    },
    {
      year: "2025",
      title: "James finally asked the question",
      copy: "Sunrise on a jetty in the Lakes, with the ring in his coat pocket for two days beforehand because he kept losing his nerve.",
      image: "/images/story-2025.jpg",
      alt: "James proposing on one knee on a lakeside jetty at dawn",
    },
    {
      year: "2026",
      title: "We're getting married!",
      copy: "Woodland Hall, September, and everyone we love in one room. All that's missing is you.",
      image: "/images/garden-couple.jpg",
      alt: "Sophie and James standing in a rose-covered doorway",
    },
  ],

  dressCode: {
    heading: "What should I wear?",
    label: "Garden Party / Smart Casual",
    copy: "We're keeping things relaxed and elegant. Think garden party rather than black tie.",
    notes: [
      "Linen, light suits, summer dresses — all perfect.",
      "The ceremony is on grass, so maybe not your finest stilettos.",
      "September in Lancashire: bring a layer for the evening.",
      "No need for a tie unless you genuinely love one.",
    ],
    image: "/images/garden-drinks.jpg",
    imageAlt: "Wedding guests with drinks in an English country garden",
  },

  accommodation: [
    {
      name: "The Woodland Arms",
      kind: "Local boutique hotel",
      image: "/images/stay-woodland-arms.jpg",
      distance: "0.4 miles from the venue",
      price: "£120–£160 per night",
      note: "Twelve rooms above a very good pub. A five-minute walk down the lane — ask for the garden rooms.",
    },
    {
      name: "The Old Mill B&B",
      kind: "Cosy countryside accommodation",
      image: "/images/stay-old-mill.jpg",
      distance: "1.8 miles from the venue",
      price: "£85–£110 per night",
      note: "Six bedrooms in a converted mill by the river. Enormous breakfast, tiny doorways.",
    },
    {
      name: "The Garden Rooms",
      kind: "Self-contained accommodation",
      image: "/images/stay-garden-rooms.jpg",
      distance: "2.5 miles from the venue",
      price: "£140–£190 per night",
      note: "Four private garden lodges with kitchenettes — ideal if you're bringing children.",
    },
  ],

  travel: [
    {
      icon: "car",
      title: "By car",
      lines: [
        "Leave the M6 at junction 34 and follow signs for Ellerby Green.",
        "The entrance is a stone gateway on Harrowby Lane, easy to miss — look for the beech avenue.",
        "Around 50 minutes from Manchester, 25 from Preston.",
      ],
    },
    {
      icon: "parking",
      title: "Parking",
      lines: [
        "Free parking for around 90 cars in the paddock beside the hall.",
        "Cars may be left overnight and collected before 11 AM the following day.",
        "Accessible spaces are on the gravel forecourt by the main entrance.",
      ],
    },
    {
      icon: "taxi",
      title: "Taxis",
      lines: [
        "Please pre-book — rural signal is patchy and cars are scarce late on.",
        "Ellerby Cars · 01524 000 118",
        "Green Lane Taxis · 01524 000 244",
      ],
    },
    {
      icon: "train",
      title: "Public transport",
      lines: [
        "Nearest station is Ellerby Green (hourly from Preston and Lancaster).",
        "Roughly a 10-minute taxi from the station to the venue.",
        "We'll run a minibus from The Woodland Arms at 1:00 PM.",
      ],
    },
    {
      icon: "clock",
      title: "Arriving",
      lines: [
        "Doors and garden open from 1:30 PM.",
        "The ceremony begins promptly at 2:00 PM — please be seated by 1:50 PM.",
        "If you're running late, come in quietly at the back; you won't be in trouble.",
      ],
    },
  ],

  gifts: {
    heading: "Your presence is the greatest gift",
    copy: "Having you there to celebrate with us is more than enough. If you'd still like to give us something, we've put together a small wish list.",
    primaryCta: "Our gift list",
    secondaryCta: "Honeymoon fund",
  },

  giftList: {
    eyebrow: "Gift list",
    heading: "A few things for the new house",
    intro:
      "We moved into the cottage last spring with two mismatched mugs and a kettle that whistles at the wrong moments. Everything below is something we'd genuinely use. Reserve anything you like so nobody doubles up — and please don't feel you need to.",
    image: "/images/details-table.jpg",
    imageAlt: "A dressed table with linen, glassware and candles",
    categories: ["The kitchen", "The table", "The home", "The garden"],
    items: [
      {
        id: "gl-1",
        name: "Cast iron casserole, 24cm",
        note: "For the Sunday stews James insists he has perfected.",
        price: 95,
        from: "Hartley & Fold",
        category: "The kitchen",
      },
      {
        id: "gl-2",
        name: "Copper stovetop kettle",
        note: "To replace the whistler. It has served us, but its time has come.",
        price: 68,
        from: "Hartley & Fold",
        category: "The kitchen",
      },
      {
        id: "gl-3",
        name: "Walnut chopping board",
        note: "Big enough for a whole loaf and a wheel of something soft.",
        price: 42,
        from: "Bramble Works",
        category: "The kitchen",
        reserved: true,
      },
      {
        id: "gl-4",
        name: "Set of six stoneware bowls",
        note: "Speckled oatmeal glaze, thrown in Todmorden.",
        price: 78,
        from: "Clough Pottery",
        category: "The table",
      },
      {
        id: "gl-5",
        name: "Hand-blown wine glasses, pair",
        note: "We have four. We would like six. You can see the problem.",
        price: 54,
        from: "Clough Pottery",
        category: "The table",
      },
      {
        id: "gl-6",
        name: "Irish linen tablecloth",
        note: "Long enough for the table when both leaves are out.",
        price: 88,
        from: "Meadow & Flax",
        category: "The table",
        reserved: true,
      },
      {
        id: "gl-7",
        name: "Brass reading lamp",
        note: "For Sophie's corner of the sitting room.",
        price: 120,
        from: "Bramble Works",
        category: "The home",
      },
      {
        id: "gl-8",
        name: "Lambswool throw",
        note: "The cottage is beautiful and completely impossible to heat.",
        price: 110,
        from: "Meadow & Flax",
        category: "The home",
      },
      {
        id: "gl-9",
        name: "Framed print of the valley",
        note: "The view from the hill behind the house, in winter.",
        price: 65,
        from: "North Light Press",
        category: "The home",
      },
      {
        id: "gl-10",
        name: "Two apple trees",
        note: "A Katy and a Discovery, to go in along the back wall.",
        price: 74,
        from: "Ribble Valley Nursery",
        category: "The garden",
      },
      {
        id: "gl-11",
        name: "Galvanised watering can",
        note: "Unglamorous, deeply wanted.",
        price: 38,
        from: "Ribble Valley Nursery",
        category: "The garden",
      },
      {
        id: "gl-12",
        name: "Garden bench, two seat",
        note: "Something to sit on while we look at the apple trees.",
        price: 240,
        from: "Bramble Works",
        category: "The garden",
      },
    ],
    demoNote:
      "This is a showcase, so nothing is charged and nothing is sent. Reserving an item saves it in this browser only, to demonstrate how the live gift list behaves.",
    closing: {
      heading: "Rather not choose?",
      copy: "The honeymoon fund is just as welcome — and so is turning up, dancing badly and staying until the end.",
    },
  },

  honeymoonFund: {
    eyebrow: "Honeymoon fund",
    heading: "Two weeks on the west coast of Scotland",
    intro:
      "We're driving north the Tuesday after the wedding — a cottage on Mull, a week of ferries, and no fixed plan beyond finding somewhere that does a good breakfast. If you'd like to put something towards it, you can choose a moment rather than a number.",
    image: "/images/story-2021.jpg",
    imageAlt: "Sophie and James on a windswept coastal walk",
    destination: "Isle of Mull & the Ardnamurchan coast",
    target: 2400,
    raised: 1465,
    tiers: [
      {
        id: "hf-1",
        amount: 25,
        title: "A round at the harbour",
        copy: "Two pints and a packet of crisps in Tobermory, watching the boats come in.",
      },
      {
        id: "hf-2",
        amount: 50,
        title: "Dinner by the water",
        copy: "Langoustines, brown bread and whatever the boat brought in that morning.",
      },
      {
        id: "hf-3",
        amount: 90,
        title: "A day on the water",
        copy: "The boat out to Staffa and the Treshnish Isles, weather permitting.",
      },
      {
        id: "hf-4",
        amount: 150,
        title: "A night somewhere special",
        copy: "One night in the old inn at the end of the peninsula, with the fire lit.",
      },
    ],
    itinerary: [
      {
        day: "Days 1–3",
        title: "Driving north",
        copy: "Lancashire to Glencoe the slow way, stopping wherever looks worth stopping.",
      },
      {
        day: "Days 4–10",
        title: "The cottage on Mull",
        copy: "A whitewashed cottage above the sound, one shop, a lot of walking.",
      },
      {
        day: "Days 11–14",
        title: "Ardnamurchan",
        copy: "The last stretch of road west, and the lighthouse at the end of it.",
      },
    ],
    demoNote:
      "This is a showcase, so no payment is taken and no card details are collected. Pledges are stored in this browser only, to demonstrate how the live fund behaves.",
    closing: {
      heading: "Prefer something for the house?",
      copy: "The gift list has a handful of small things for the cottage, if you'd rather choose an object than a moment.",
    },
  },

  gallery: [
    {
      src: "/images/couple-portrait.jpg",
      alt: "Sophie and James laughing together in a garden",
      caption: "The engagement shoot, April 2026",
      shape: "tall",
    },
    {
      src: "/images/ceremony-circle.jpg",
      alt: "A woodland ceremony circle with wooden chairs",
      caption: "The clearing at Woodland Hall",
      shape: "wide",
    },
    {
      src: "/images/story-2021.jpg",
      alt: "Sophie and James on a coastal clifftop",
      caption: "The coast path, every summer since 2021",
      shape: "tall",
    },
    {
      src: "/images/details-table.jpg",
      alt: "An outdoor reception table with candles and olive branches",
      caption: "Table styling — olive, brass and ivory",
      shape: "wide",
    },
    {
      src: "/images/reception-lights.jpg",
      alt: "Long dining tables under strings of festoon lights",
      caption: "The dining room",
      shape: "wide",
    },
    {
      src: "/images/garden-couple.jpg",
      alt: "Sophie and James in a rose-covered doorway",
      caption: "Somewhere between the two of us",
      shape: "tall",
    },
    {
      src: "/images/reception-table.jpg",
      alt: "A candlelit table setting with ivory linen",
      caption: "Candles, and a lot of them",
      shape: "tall",
    },
    {
      src: "/images/venue-exterior.jpg",
      alt: "Woodland Hall in the late afternoon",
      caption: "Woodland Hall, Lancashire",
      shape: "wide",
    },
  ],

  guestPhotos: {
    heading: "Share your photos",
    copy: "The best moments aren't always the ones captured by the photographer. Share the photos you take throughout the day so everyone can relive the memories together.",
    privacyNote: "This is a private wedding gallery shared with invited guests.",
    seed: [
      {
        id: "g1",
        src: "/images/garden-drinks.jpg",
        alt: "Guests with drinks in the walled garden",
        guest: "Priya Raman",
        caption: "Everyone found the fizz within about four seconds",
        moment: "before",
      },
      {
        id: "g2",
        src: "/images/ceremony-aisle.jpg",
        alt: "The woodland aisle before the ceremony",
        guest: "Tom Ashworth",
        caption: "Got here early. Worth it for this.",
        moment: "before",
      },
      {
        id: "g3",
        src: "/images/sparkler-kiss.jpg",
        alt: "The couple kissing surrounded by sparklers",
        guest: "Hannah Doyle",
        caption: "Nobody told me to expect sparklers",
        moment: "evening",
      },
      {
        id: "g4",
        src: "/images/reception-hall.jpg",
        alt: "The dining room set for the wedding breakfast",
        guest: "Marcus Bell",
        caption: "Table nine, best table",
        moment: "reception",
      },
      {
        id: "g5",
        src: "/images/guest-dance-1.jpg",
        alt: "Guests dancing at the evening celebration",
        guest: "Ellie Marsh",
        caption: "Uncle Rob peaked at 10:40 PM",
        moment: "evening",
      },
      {
        id: "g6",
        src: "/images/ceremony-circle.jpg",
        alt: "Guests seated in the woodland ceremony circle",
        guest: "Dan Whitaker",
        caption: "Just before they walked in",
        moment: "ceremony",
      },
      {
        id: "g7",
        src: "/images/garden-cake.jpg",
        alt: "The wedding cake on a garden table",
        guest: "Sofia Lindqvist",
        caption: "Three tiers and a queue",
        moment: "reception",
      },
      {
        id: "g8",
        src: "/images/guest-sparklers.jpg",
        alt: "Guests holding sparklers in the evening",
        guest: "Jonny Pike",
        caption: "The whole gang",
        moment: "evening",
      },
      {
        id: "g9",
        src: "/images/garden-marquee.jpg",
        alt: "Tables set inside the marquee",
        guest: "Aisha Kamara",
        caption: "Before anyone sat down and ruined it",
        moment: "reception",
      },
      {
        id: "g10",
        src: "/images/first-dance.jpg",
        alt: "The first dance surrounded by guests",
        guest: "Rachel Owusu",
        caption: "First dance. Not a dry eye.",
        moment: "evening",
      },
      {
        id: "g11",
        src: "/images/guest-dance-2.jpg",
        alt: "Guests celebrating on the dance floor",
        guest: "Ben Halliwell",
        caption: "Band were unbelievable",
        moment: "evening",
      },
      {
        id: "g12",
        src: "/images/details-table.jpg",
        alt: "Close up of the table styling",
        guest: "Georgia Frost",
        caption: "Sophie made every single place card",
        moment: "before",
      },
    ],
  },

  notices: [
    {
      title: "Please arrive by 1:30 PM",
      copy: "It gives you time to park, walk down to the clearing and get a drink before we start.",
    },
    {
      title: "The ceremony begins promptly at 2:00 PM",
      copy: "Our registrar is lovely and extremely punctual. Please be seated by 1:50 PM.",
    },
    {
      title: "The drinks reception is outdoors if weather permits",
      copy: "If Lancashire does what Lancashire does, we'll move into the orangery instead.",
    },
    {
      title: "Tell us about dietary requirements when you RSVP",
      copy: "Our caterers need final numbers eight weeks before, so the earlier the better.",
    },
  ],

  faq: [
    {
      q: "Can children attend?",
      a: "Yes — we'd love to have them. There's a lawn to run around on, a children's menu at the wedding breakfast, and a quiet room upstairs if anyone needs a nap. Just let us know ages when you RSVP.",
    },
    {
      q: "Can I bring a plus one?",
      a: "Your invitation will say if it includes a guest. Woodland Hall has a firm limit on numbers, so if you're unsure just ask us directly — we'd rather you did than guess.",
    },
    {
      q: "Is there parking?",
      a: "There's free parking for around 90 cars in the paddock beside the hall, and you're welcome to leave your car overnight and collect it before 11 AM the next morning.",
    },
    {
      q: "What should I wear?",
      a: "Garden party or smart casual. The ceremony is on grass, so choose your shoes accordingly, and bring a layer for the evening.",
    },
    {
      q: "What time does the evening reception finish?",
      a: "The bar closes at 11:30 PM and carriages are at midnight. Taxis pick up from the front steps — please pre-book, as rural signal is patchy.",
    },
    {
      q: "Are there vegetarian and vegan options?",
      a: "Absolutely, and gluten-free too. Every course has an alternative — tell us what you need in your RSVP and the kitchen will take care of it.",
    },
    {
      q: "Can I upload photos from the day?",
      a: "Please do. There's a photo section on this site where you can add anything you take, and everything shared appears in the guest gallery for all our guests to enjoy.",
    },
    {
      q: "What happens if it rains?",
      a: "The ceremony moves into the hall's orangery, which is arguably prettier in the rain, and the drinks reception moves indoors with it. Nothing else changes.",
    },
  ],

  rsvp: {
    heading: "We'd love you to join us",
    copy: "Please let us know if you'll be celebrating with us.",
    deadline: "Please reply by Saturday 1 August 2026",
    dietaryOptions: ["Vegetarian", "Vegan", "Gluten free", "Dairy free", "Nut allergy", "Other"],
    maxGuests: 6,
  },
};

/** Section navigation, kept here so the eventual CMS can toggle sections per event. */
export const navSections = [
  { id: "story", label: "Our Story" },
  { id: "the-day", label: "The Day" },
  { id: "venue", label: "Venue" },
  { id: "rsvp", label: "RSVP" },
  { id: "photos", label: "Photos" },
] as const;
