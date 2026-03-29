// Buck Stop Lure Company - Static Content Data

import type {
  FAQ,
  Testimonial,
  CompanyInfo,
  NavItem,
  FooterSection,
  Category,
  TimelineMilestone,
} from './types';

// ── Company Information ──────────────────────────────────────────

export const companyInfo: CompanyInfo = {
  name: 'Buck Stop Lure Company, Inc.',
  address: '3600 Grow Road, PO Box 636',
  city: 'Stanton',
  state: 'MI',
  zip: '48888',
  phoneOrders: '(800) 477-2368',
  phoneService: '(989) 762-5091',
  email: 'info@buckstopscents.com',
  social: {
    facebook: 'https://www.facebook.com/BuckStopLureCompany',
    twitter: 'https://twitter.com/buck_stop_lure',
    youtube: 'https://www.youtube.com/channel/UCPdiYUD0f8ZkfMvC2vY4z9Q',
  },
};

// ── Navigation ───────────────────────────────────────────────────

export const navigation: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Products',
    href: '/products',
  },
  { label: 'Scent Guide', href: '/scent-guide' },
  { label: 'Find A Dealer', href: '/find-a-dealer' },
  { label: 'Hunting Tips', href: '/hunting-tips' },
  { label: 'Contact', href: '/contact' },
];

export const footerSections: FooterSection[] = [
  {
    title: 'Products',
    links: [
      { label: 'Estrus Scents', href: '/products' },
      { label: 'Buck Scents', href: '/products' },
      { label: 'Blends & Combos', href: '/products' },
      { label: 'Buck Beads', href: '/products' },
      { label: 'Cover Scents', href: '/products' },
      { label: 'All Products', href: '/products' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Find A Dealer', href: '/find-a-dealer' },
      { label: 'Hunting Tips', href: '/hunting-tips' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Scent Guide & FAQ', href: '/scent-guide' },
    ],
  },
];

// ── Categories ───────────────────────────────────────────────────

export const categories: Category[] = [
  {
    id: 1,
    name: 'Estrus Scents',
    slug: 'estrus-scents',
    description:
      'Doe-in-heat estrus scents collected from live whitetail does during peak estrus. The most effective rut-phase attractants available.',
    image: '',
    productCount: 7,
  },
  {
    id: 2,
    name: 'Buck Scents',
    slug: 'buck-scents',
    description:
      'Dominant buck urine and territorial scents designed to challenge and attract mature bucks through their natural competitive instincts.',
    image: '',
    productCount: 2,
  },
  {
    id: 3,
    name: 'Blends & Combos',
    slug: 'blend-combos',
    description:
      'Multi-scent blends and complete kits combining estrus, glandular, and curiosity lures for maximum effectiveness in the field.',
    image: '',
    productCount: 4,
  },
  {
    id: 4,
    name: 'Buck Beads',
    slug: 'buck-beads',
    description:
      'Biodegradable scent-infused beads with slow-release technology that keep scrapes and trails active for days without reapplication.',
    image: '',
    productCount: 4,
  },
  {
    id: 5,
    name: 'Cover Scents',
    slug: 'cover-scents',
    description:
      'Natural glandular lures and masking scents that eliminate human odor and trigger curiosity responses in whitetail deer.',
    image: '',
    productCount: 3,
  },
  {
    id: 6,
    name: 'Training',
    slug: 'training',
    description:
      'Scent training kits for dog handlers and hunting dog conditioning. Build reliable scent-tracking skills in your hunting dogs.',
    image: '',
    productCount: 0,
  },
  {
    id: 7,
    name: 'Odor Elimination',
    slug: 'odor-elimination',
    description:
      'Scent Stop line of body wash, laundry soap, and field sprays designed to eliminate human scent from head to toe and all your gear.',
    image: '',
    productCount: 0,
  },
  {
    id: 8,
    name: 'Trapping',
    slug: 'trapping',
    description:
      'Professional-grade trapping lures and scents effective on coyote, fox, and other furbearers. Trusted by professional trappers.',
    image: '',
    productCount: 1,
  },
];

// ── FAQ Data ─────────────────────────────────────────────────────

export const faqs: FAQ[] = [
  {
    question: 'When is the best time to use estrus type scents?',
    answer:
      'Estrus scents like Mate-Triks Doe-In-Heat, 200 PROOF, and Guide Grade Scents Doe-In-Heat can be used any time the bucks in your area have shed their velvet. The prime time would be the 4 weeks prior to the peak of the rut in your area. The second best time is the post-rut period.',
  },
  {
    question: 'What scent should I use in a mock-scrape?',
    answer:
      "Any kind of buck urine works well. Buck Stop's Ruck'n Buck or Guide Grade Scents Rutting Buck urine work extremely well during the peak of the rut. Supreme Buck Urine or Guide Grade Scents Non-Rutting Buck urine work well for opening scrapes or playing the role of a young buck infringing on a dominant buck's scrape.",
  },
  {
    question: 'What is the best scent to use when sitting in a tree stand?',
    answer:
      "The hunting pros here at Buck Stop recommend Buck Stop's Rack-koon scent, or one of Buck Stop's masking scents. You don't want a buck looking up at you when you are sitting in a tree stand. If you place a deer attractant at your sitting height you invite the deer to look right up at you. Always use a scent eliminator when hunting out of a tree.",
  },
  {
    question: 'What is the most powerful cover/masking scent?',
    answer:
      "Buck Stop's Skunk scent is by far the most powerful cover/masking scent -- just a drop or two will do. There is a big misconception concerning skunk scent being a warning odor. True skunks spray when threatened, however a small amount of skunk scent is very attractive to many animal species. Tip: Trappers have known this for years and rely on skunk scent to attract furbearers to trap sets. A couple drops added to a scrape will drive bucks crazy.",
  },
  {
    question: 'How is the best way to use food lures?',
    answer:
      "Food lures work by appealing to the deer's instinct to feed. They are continuously looking for new food sources. Food lures often arouse curiosity to find the source of the appealing smell even if it is not native to the area. Apple, acorn, and sweet corn scents are best placed exactly where you would like the deer's nose to be. The back side of a tree is a good location as the tree blocks the deer's ability to see any movement from you the hunter.",
  },
  {
    question: 'How is the best way to lay a scent trail?',
    answer:
      "Scent trails are a prime way to use buck and doe urines. The scent trail gives a strong scent for deer to follow while masking any unwanted human scent. The Buck Stop pros recommend that you use a drag rag over just applying to boots. Scent trails can be as long or as short as you want. We recommend that you reapply scent the last 50 yards to stand. Then hang the drag rag in a tree near your stand. Store the drag rag in a plastic bag when not in use.",
  },
  {
    question: 'What is the best scent elimination system to use?',
    answer:
      "The system needs to start with the body. Wash with Scent Stop Body Wash before hunting. Wash hunting clothes in Scent Stop Laundry Soap and store them in a sealed container. Buck Stop's Scent Stop Laundry Soap is safe to use on all styles of hunting gear including carbon clothing. Spray Scent Stop Human Scent Eliminator on a rag and wipe down hunting equipment like bows, quivers, and tree stands. Spray hunting clothing prior to walking to stand and again when ready to hunt from stand.",
  },
  {
    question: "What makes Buck Stop's estrus scents better?",
    answer:
      "Buck Stop has been collecting and perfecting estrus scents since 1953. Our scents are collected from live whitetail does during their peak estrus cycle under controlled conditions. Every batch is quality-tested for potency and freshness. With over 70 years of heritage, we've refined our collection and preservation methods to deliver the most effective deer scents on the market.",
  },
  {
    question: 'Why should I pay more for 200 PROOF when MATE-TRIKS is half the price?',
    answer:
      "MATE-TRIKS is collected from multiple does during their estrus cycle and blended into a proven, effective formula -- it is our best seller for good reason. 200 PROOF is a single-doe collection taken at the absolute peak of one doe's estrus, which produces a more concentrated, more potent scent signature. Think of it this way: MATE-TRIKS is the reliable workhorse that fills tags year after year. 200 PROOF is what you reach for during lock-down when a mature buck is already tending a doe and you need something strong enough to pull him off her. Both work. The difference is concentration and the hunting scenario you are facing.",
  },
  {
    question: 'How long does deer scent last once opened?',
    answer:
      "Sealed and stored in a cool, dark place, Buck Stop deer scents have a shelf life of 2 to 3 years. Once you open a bottle, plan to use it within that hunting season for best results. Exposure to heat, sunlight, and air breaks down the natural compounds that make the scent effective. Between hunts, keep opened bottles tightly capped and stored in a refrigerator or a cool garage -- never in a hot truck or on a windowsill. If the scent has changed color significantly or smells off compared to a fresh bottle, it is time to replace it.",
  },
  {
    question: 'Does deer scent really work?',
    answer:
      "Yes -- and we have 70 years of filled tags to back that up. A whitetail deer has roughly 297 million olfactory receptors compared to a human's 5 million, giving them a sense of smell approximately 100 times more powerful than ours. They use scent to find mates, identify rivals, detect danger, and locate food. When you place a properly collected estrus scent in a scrape or on a drag rag, you are speaking the language a buck's nose is hardwired to respond to. Our hunters consistently report bucks changing direction, breaking from travel routes, and committing to shooting lanes because of scent placement. Combine quality scent with good wind strategy and the right timing, and you are stacking the odds in your favor the way hunters have with Buck Stop since 1953.",
  },
  {
    question: 'When should I start using doe estrus scent?',
    answer:
      "Start using doe estrus scent about 4 weeks before the peak rut in your area. Bucks shed their velvet and begin responding to estrus odor as early as late September in many regions. The prime window is the 2 to 3 weeks before does actually come into heat -- bucks are actively seeking and will investigate any estrus scent they encounter. Beginning early also helps you establish scent at mock scrapes and along travel corridors so bucks incorporate those locations into their daily routine before breeding activity peaks.",
  },
  {
    question: 'What is the difference between estrus and regular doe urine?',
    answer:
      "Regular doe urine, like the urine component in Gland-U-Lure, is collected year-round and carries a calming, familiar scent that signals the presence of does in an area. It works well for attracting deer to mock scrapes, feeders, and trail camera sites during any part of the season. Estrus urine, like Mate-Triks Doe-In-Heat and 200 PROOF, is collected only during a doe's heat cycle and contains the specific pheromones that trigger a buck's breeding instinct. Estrus scent is most effective from the pre-rut through peak rut when bucks are actively seeking does to breed.",
  },
  {
    question: 'How long does deer scent last in the field?',
    answer:
      "Liquid scents applied to wicks or drag rags typically last 4 to 8 hours in the field depending on temperature, humidity, and wind. Higher humidity and cooler temperatures help scent linger longer, while hot or windy conditions cause it to dissipate faster. Buck Beads use a moisture-activated formula that lasts for days, reactivating with dew, rain, and morning moisture to keep scrapes active without daily visits. Sealed bottles stored in a cool, dark place have a shelf life of 2 to 3 years.",
  },
  {
    question: 'Should I use synthetic or natural deer scent?',
    answer:
      "Natural deer scents collected from real whitetail deer are proven more effective than synthetic alternatives. Buck Stop uses only real urine and glandular secretions collected from live whitetails under controlled conditions. Natural scents contain the full spectrum of pheromones, hormones, and chemical compounds that deer recognize and respond to instinctively. Synthetic scents attempt to replicate these compounds but often lack the complexity of the real thing, and educated deer on pressured land may avoid artificial scent signatures entirely.",
  },
  {
    question: 'What is the best cover scent for deer hunting?',
    answer:
      "Buck Stop's Natural Skunk Scent is the most powerful cover scent available -- just a drop or two masks human odor completely. Despite the common misconception that skunk odor is purely a warning signal, small amounts of skunk scent are actually attractive to many wildlife species. Professional trappers have relied on skunk scent for decades. Cedar and earth cover scents also blend naturally into woodland environments. For a complete system, pair a cover scent with Scent Stop body wash and laundry soap to eliminate human odor at the source before masking what remains.",
  },
  {
    question: 'How do you use a drag rag for deer hunting?',
    answer:
      "Soak a cloth drag rag thoroughly with estrus scent such as Mate-Triks Doe-In-Heat. Attach it to your boot or drag it behind you on a string for the last 150 yards of your walk to the stand, making two sweeping loops through likely travel corridors. Reapply scent generously for the last 50 yards to create the strongest concentration near your setup. When you reach your stand, hang the drag rag in a nearby tree at 3 to 4 feet high so it continues dispensing scent at nose level. Store the rag in a sealed plastic bag between hunts to preserve freshness.",
  },
];

// ── Testimonials ─────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    id: 1,
    author: 'Brian',
    date: '2013-03',
    title: '8-Point Buck, 18" Spread, 190 lbs',
    quote:
      'Took an 8-point buck with an 18-inch spread weighing 190 pounds using 200 Proof and Scent Stop products. The combination of a quality attractant and scent elimination was unbeatable.',
    image: undefined,
  },
  {
    id: 2,
    author: 'Eric Christensen',
    date: '2011-02',
    title: 'Michigan Buck Scored 143 5/8 Points',
    quote:
      'My Michigan buck scored 143 5/8 points. I used HYPER synthetic scrape to create a mock-scrape line that brought him right into range. Buck Stop scents are the real deal.',
    image: undefined,
  },
  {
    id: 3,
    author: 'Eric C.',
    date: '2010-11',
    title: '10-Pointer with 200 Proof',
    quote:
      'Tagged a beautiful 10-pointer using 200 Proof combined with rattling and bleating. The buck came in aggressively looking for the source of the scent. 200 Proof is my go-to every rut season.',
  },
  {
    id: 4,
    author: 'Rob Putnam, TOG Outdoors',
    date: '2010-10',
    title: '136 2/8 Buck with Guide Series',
    quote:
      'Harvested a 136 2/8 buck using Guide Series doe-in-heat. The quality of Buck Stop scents is unmatched. As an outfitter, I trust them to deliver results for my clients season after season.',
    image: undefined,
  },
  {
    id: 5,
    author: 'Brian Johansen, Owner',
    date: '2010-10',
    title: '8-Point with Guide Grade',
    quote:
      'Took a solid 8-point using Guide Grade combined with rattling techniques. Even after decades in this business, our scents continue to impress me in the field.',
  },
  {
    id: 6,
    author: 'Brian & Curtis Cook',
    date: '2010-07',
    title: 'Canadian Black Bear',
    quote:
      'Used the Scent Stop line on a Canadian black bear hunt. The scent elimination products kept us completely undetected. Proof that Buck Stop products work on more than just whitetail.',
    image: undefined,
  },
  {
    id: 7,
    author: 'Kelly Wilson, Pro-Staff',
    date: '2010-07',
    title: 'Long-Time User Since 2000',
    quote:
      "I've been using Buck Stop scents since 2000 and the mock-scrape technique has been incredibly effective year after year. The consistency of quality is what keeps me coming back.",
  },
  {
    id: 8,
    author: 'Eric C.',
    date: '2010-06',
    title: 'Trophy Buck at Mock-Scrape',
    quote:
      'Took a trophy buck right at my mock-scrape using 200 Proof. Set up the scrape two weeks before the rut and the bucks were hitting it daily. Buck Stop scents outperform everything else I have tried.',
  },
];

// ── Heritage Timeline ────────────────────────────────────────────

export const heritageMilestones: TimelineMilestone[] = [
  {
    year: 1953,
    title: 'Buck Stop Founded',
    description:
      'Buck Stop Lure Company established in Stanton, Michigan, beginning a legacy of premium deer scent production rooted in real-world hunting expertise.',
  },
  {
    year: 1972,
    title: 'First Doe-In-Heat Scent',
    description:
      'Introduced the original Doe-In-Heat estrus scent, pioneering a category that would become the most important tool in a rut hunter\'s arsenal.',
  },
  {
    year: 1985,
    title: 'First to Reach $1 Million',
    description:
      'Became the first deer scent company to surpass $1 million in annual sales, proving the market demand for high-quality, scientifically collected deer lures.',
  },
  {
    year: 2009,
    title: 'Family Transition',
    description:
      'Ownership transitioned within the family, ensuring the continuation of Buck Stop\'s heritage, quality standards, and commitment to American-made products.',
  },
  {
    year: 2012,
    title: 'Scent Stop Line Launched',
    description:
      'Introduced the Scent Stop odor elimination product line including body wash, laundry soap, and field spray, giving hunters a complete scent management system.',
  },
];

// ── Hero Slider Content ─────────────────────────────────────────

export const heroSlides = [
  {
    headline: 'Innovation is our heritage!',
    subtext: 'Premium deer scents since 1953',
    cta: { label: 'Shop Now', href: '/products' },
  },
  {
    headline: 'Successful hunts... Our legacy',
    subtext: '70+ years of proven results in the field',
    cta: { label: 'Our Story', href: '/about' },
  },
  {
    headline: 'His nose... Knows the Difference.',
    subtext: 'Collected from live whitetail does at peak estrus',
    cta: { label: 'Estrus Scents', href: '/products' },
  },
];
