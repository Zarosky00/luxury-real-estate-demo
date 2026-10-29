// Strictly local, frontend-only property dataset for the DEMO pitch presentation.
// Zero backend, database, or external API dependencies.

export type PropertyType =
  | 'Heritage Bungalow'
  | 'Sky Villa'
  | 'Courtyard Estate'
  | 'Coastal Pavilion'
  | 'Penthouse'
  | 'Modernist Residence'

export type IndianCity =
  | 'Mumbai'
  | 'New Delhi'
  | 'North Goa'
  | 'Bengaluru'
  | 'Udaipur'
  | 'Alibaug'
  | 'Hyderabad'
  | 'Chennai'

export interface PropertyListing {
  id: string
  slug: string
  title: string
  subtitle: string
  city: IndianCity
  neighborhood: string
  state: string
  propertyType: PropertyType
  priceCrores: number // Price in INR Crores (e.g., 42.5 = ₹42.5 Cr)
  priceFormatted: string
  bedrooms: number
  bathrooms: number
  areaSqFt: number
  plotSizeSqFt?: number
  yearCompleted: number
  architectStudio: string
  orientation: string
  possessionStatus: 'Ready for Handover' | 'By Private Commission' | 'Limited Curated Release'
  featured: boolean
  reraRef: string
  heroImage: string
  gallery: {
    url: string
    caption: string
  }[]
  summary: string
  editorialDescription: string[]
  architecturalHighlights: string[]
  amenities: string[]
  locationContext: {
    overview: string
    connectivity: string[]
    coordinatesLabel: string
  }
  advisor: {
    name: string
    title: string
    desk: string
  }
}

export const IMAGE_BASE = 'https://files.monstarx.app/xwsaax0czr/public/images'

export const HERO_IMAGE_URL = `${IMAGE_BASE}/hero-mumbai-atelier.webp`
export const STUDIO_IMAGE_URL = `${IMAGE_BASE}/atelier-studio-interior.webp`
export const DETAIL_COURTYARD_URL = `${IMAGE_BASE}/detail-interior-courtyard.webp`
export const DETAIL_DINING_URL = `${IMAGE_BASE}/detail-terrace-dining.webp`

export const PROPERTIES: PropertyListing[] = [
  {
    id: 'malabar-sky-villa',
    slug: 'malabar-sky-villa',
    title: 'The Malabar Crest Sky Villa',
    subtitle: 'Full-floor sea-facing residence with double-height travertine salon and Hanging Gardens canopy views',
    city: 'Mumbai',
    neighborhood: 'Malabar Hill',
    state: 'Maharashtra',
    propertyType: 'Sky Villa',
    priceCrores: 68.0,
    priceFormatted: '₹68.00 Cr',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 7450,
    yearCompleted: 2024,
    architectStudio: 'Studio Khosla & Associates',
    orientation: 'West-Southwest (Arabian Sea Frontage)',
    possessionStatus: 'Ready for Handover',
    featured: true,
    reraRef: 'DEMO-MH-2024-00192',
    heroImage: `${IMAGE_BASE}/prop-malabar-sky-villa.webp`,
    gallery: [
      {
        url: `${IMAGE_BASE}/prop-malabar-sky-villa.webp`,
        caption: 'Double-height main salon with honed Italian travertine and Burmese teak ceiling louvers.',
      },
      {
        url: HERO_IMAGE_URL,
        caption: 'West-facing sunset veranda overlooking the Arabian Sea and Backbay.',
      },
      {
        url: DETAIL_COURTYARD_URL,
        caption: 'Private east-wing reading gallery bathed in filtered morning light.',
      },
      {
        url: DETAIL_DINING_URL,
        caption: 'Loggia dining terrace crafted for twelve guests with bespoke terracotta lighting.',
      },
    ],
    summary:
      'Occupying the entire 24th level of a six-residence boutique tower on Walkeshwar Ridge, this sky villa merges bungalow-scale volumes with uninterrupted horizons across the Arabian Sea.',
    editorialDescription: [
      'Conceived as a vertical courtyard house suspended above Malabar Hill, The Malabar Crest Sky Villa offers 7,450 square feet of single-plate architectural calm. A private high-speed lift opens into an ivory lime-plastered foyer framed by hand-carved Dholpur stone thresholds.',
      'The 22-foot-high primary living pavilion spans 65 linear feet of acoustic bronze-framed glazing, sliding completely into pocket walls to unite the interior salon with a deep cantilevered sandstone deck.',
      'Materials were selected for their tactile longevity in Mumbai’s coastal climate: reclaimed Burmese teak louvers, unpolished Kota and travertine slabs, and hand-patinated brass hardware cast by artisans in Moradabad.',
    ],
    architecturalHighlights: [
      '65-foot continuous sea-facing loggia with operable teak monsoon shutters',
      'Private temperature-controlled wine & cigar vault for 900 bottles',
      'Dual service kitchens (wet gourmet spice kitchen + dry Dada show kitchen)',
      'Dedicated staff quarters for three with independent service elevator core',
    ],
    amenities: [
      'Private Lift Lobby',
      '24-Foot Ceiling Salon',
      'Sea-View Plunge Deck',
      'Climate Wine Vault',
      '4 Covered Parking Bays',
      '24/7 Concierge & Security',
      'Acoustic Double Glazing',
      'Home Automation Suite',
    ],
    locationContext: {
      overview:
        'Positioned along the quiet crest of Malabar Hill, moments from the Hanging Gardens and the Willingdon Sports Club, offering rare tranquility above South Mumbai.',
      connectivity: [
        '4 mins to Priyadarshini Park & Sea Face Promenade',
        '8 mins to Mumbai Coastal Road North-South Interchange',
        '18 mins to Nariman Point & Fort Financial District',
        '32 mins to Chhatrapati Shivaji Maharaj International Airport via Coastal Road',
      ],
      coordinatesLabel: '18.9548° N, 72.7985° E — Walkeshwar Ridge, Mumbai',
    },
    advisor: {
      name: 'Arundhati Mehta',
      title: 'Senior Partner — South Mumbai Private Estates',
      desk: 'Mumbai Atelier, Kala Ghoda',
    },
  },
  {
    id: 'lutyens-sandstone-estate',
    slug: 'lutyens-sandstone-estate',
    title: 'Amrita Shergill Marg Colonnade',
    subtitle: 'Restored 0.6-acre Lutyens’ bungalow Zone residence with Dholpur stone verandas and private orchard',
    city: 'New Delhi',
    neighborhood: 'Lutyens’ Bungalow Zone',
    state: 'Delhi NCR',
    propertyType: 'Heritage Bungalow',
    priceCrores: 145.0,
    priceFormatted: '₹145.00 Cr',
    bedrooms: 6,
    bathrooms: 8,
    areaSqFt: 12800,
    plotSizeSqFt: 26136,
    yearCompleted: 2023,
    architectStudio: 'Vastu Shilpa & Matharoo Atelier',
    orientation: 'North-East Garden Axis',
    possessionStatus: 'By Private Commission',
    featured: true,
    reraRef: 'DEMO-DL-2023-00418',
    heroImage: `${IMAGE_BASE}/prop-lutyens-bungalow.webp`,
    gallery: [
      {
        url: `${IMAGE_BASE}/prop-lutyens-bungalow.webp`,
        caption: 'South garden elevation featuring hand-dressed buff Dholpur sandstone colonnades.',
      },
      {
        url: DETAIL_DINING_URL,
        caption: 'Winter garden dining veranda overlooking sixty-year-old neem and jamun trees.',
      },
      {
        url: DETAIL_COURTYARD_URL,
        caption: 'Central gallery spine linking the formal drawing room and private library.',
      },
      {
        url: STUDIO_IMAGE_URL,
        caption: 'Private study and rare book conservatory with custom walnut millwork.',
      },
    ],
    summary:
      'Set within New Delhi’s most storied tree-lined avenue alongside Lodhi Gardens, this generational freehold residence pairs classical Lutyens proportions with museum-grade climate and air engineering.',
    editorialDescription: [
      'Few addresses in the world command the quiet gravitas of Amrita Shergill Marg. Behind high stone boundary walls and mature Ashoka trees sits this sensitively reconstructed residence spanning 12,800 square feet across two stately levels and a sunlit subterranean wellness gallery.',
      'Deep perimeter verandas wrap the main house, shielding the tall drawing and banquet rooms from the summer sun while framing serene axial views across manicured lawns and a sunken lotus reflection court.',
      'The residence integrates hospital-grade MERV-16 positive-pressure air filtration, geothermal radiant floor conditioning, and a detached guest pavilion ideal for visiting dignitaries or private art collections.',
    ],
    architecturalHighlights: [
      'Freehold 2,900 sq. yd. plot within the protected Lutyens’ Bungalow Zone',
      'Hospital-grade whole-estate HEPA & carbon air purification architecture',
      'Subterranean 20-meter heated lap pool, hammam, and private screening room',
      'Detached two-suite guest pavilion and 8-car conditioned subterranean motor court',
    ],
    amenities: [
      '0.6-Acre Private Lawn',
      'Heated Indoor Lap Pool',
      'Whole-Home Air Filtration',
      'Detached Guest Pavilion',
      '8-Car Motor Court',
      'Private Guardhouse',
      'Wood-Panelled Library',
      'Geothermal Climate Control',
    ],
    locationContext: {
      overview:
        'Directly adjacent to the 90-acre expanse of Lodhi Gardens in central New Delhi, surrounded by diplomatic residences, cultural foundations, and mature forest canopy.',
      connectivity: [
        '2 mins walk to Lodhi Gardens West Gate',
        '5 mins to Khan Market & The Lodhi Club',
        '10 mins to Rashtrapati Bhavan & Diplomatic Enclave (Chanakyapuri)',
        '25 mins to Indira Gandhi International Airport (Terminal 3)',
      ],
      coordinatesLabel: '28.5961° N, 77.2167° E — Amrita Shergill Marg, New Delhi',
    },
    advisor: {
      name: 'Vikramaditya Singhania',
      title: 'Managing Director — North India Heritage & Diplomatic Estates',
      desk: 'New Delhi Atelier, Sunder Nagar',
    },
  },
  {
    id: 'assagao-laterite-courtyard',
    slug: 'assagao-laterite-courtyard',
    title: 'Casa de Laterite, Assagao',
    subtitle: 'Indo-Portuguese sanctuary wrapped around a monsoon courtyard pool and forested hill slope',
    city: 'North Goa',
    neighborhood: 'Assagao — Bouta Waddo',
    state: 'Goa',
    propertyType: 'Courtyard Estate',
    priceCrores: 19.5,
    priceFormatted: '₹19.50 Cr',
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 6200,
    plotSizeSqFt: 18500,
    yearCompleted: 2024,
    architectStudio: 'Atelier Goa & Studio Mumbai Alumni',
    orientation: 'East Valley & Forest Facing',
    possessionStatus: 'Ready for Handover',
    featured: true,
    reraRef: 'DEMO-GA-2024-00811',
    heroImage: `${IMAGE_BASE}/prop-assagao-courtyard.webp`,
    gallery: [
      {
        url: `${IMAGE_BASE}/prop-assagao-courtyard.webp`,
        caption: 'Central laterite courtyard and natural Sukabumi stone lap pool.',
      },
      {
        url: DETAIL_COURTYARD_URL,
        caption: 'Arched balcão gallery finished in breathable slaked-lime plaster.',
      },
      {
        url: DETAIL_DINING_URL,
        caption: 'Open-sided monsoon pavilion for long afternoon gatherings.',
      },
    ],
    summary:
      'Carved gently into a forested slope in Assagao’s quietest lane, Casa de Laterite reinterprets the traditional Goan courtyard house through exposed quarry stone, lime plaster, and salvaged Nilambur teak.',
    editorialDescription: [
      'Designed around the rhythm of the Konkan seasons, Casa de Laterite invites both winter sunshine and dramatic monsoon rains into its open central court. Hand-dressed red laterite blocks quarried locally anchor the ground floor, aging gracefully with moss and tropical ferns.',
      'Four generous bedroom suites occupy private corners of the estate, each opening onto shaded private verandas and outdoor rain showers enclosed by weathered stone walls.',
      'A 16-meter chemical-free ozone lap pool bisects the courtyard, bordered by a sunken reading pavilion and an outdoor wood-fired bread and seafood kitchen.',
    ],
    architecturalHighlights: [
      'Hand-built with breathable lime-pozzolana plaster and reclaimed Portuguese Mangalore tiles',
      'Private gravity-fed rainwater harvesting cistern with 80,000-liter capacity',
      '15 kW solar roof array with full lithium battery backup',
      'Turnkey curation of bespoke teak, cane, and brass furniture included in dossier',
    ],
    amenities: [
      '16m Courtyard Pool',
      'Forest Reserve Boundary',
      'Solar & Rainwater Autonomy',
      'Outdoor Wood-Fired Kitchen',
      'Bespoke Furniture Included',
      'Outdoor Rain Showers',
      'Staff Cottage',
      'Private Borewell',
    ],
    locationContext: {
      overview:
        'Tucked away in the lush valley of Assagao—known as the village of flowers—surrounded by protected cashew groves, artisanal bakeries, and design studios.',
      connectivity: [
        '4 mins to Gunpowder, Jamun & Bawri dining enclave in Assagao',
        '14 mins to Mandrem & Morjim quiet northern beaches',
        '22 mins to Panjim Fontainhas Latin Quarter',
        '35 mins to Manohar International Airport (Mopa)',
      ],
      coordinatesLabel: '15.5939° N, 73.7862° E — Bouta Waddo, Assagao, Goa',
    },
    advisor: {
      name: 'Rohan Mascarenhas',
      title: 'Principal Advisor — Coastal & Western Ghats Estates',
      desk: 'Goa & Mumbai Advisory',
    },
  },
  {
    id: 'indiranagar-concrete-atelier',
    slug: 'indiranagar-concrete-atelier',
    title: 'The 100-Foot Canopy Pavilion',
    subtitle: 'Board-formed concrete and warm teak courtyard residence beneath mature rain trees',
    city: 'Bengaluru',
    neighborhood: 'Indiranagar — Defence Colony',
    state: 'Karnataka',
    propertyType: 'Modernist Residence',
    priceCrores: 28.5,
    priceFormatted: '₹28.50 Cr',
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 6850,
    plotSizeSqFt: 6000,
    yearCompleted: 2024,
    architectStudio: 'Collective Project & Hundredhands Collaboration',
    orientation: 'North-South Cross-Ventilated',
    possessionStatus: 'Ready for Handover',
    featured: true,
    reraRef: 'DEMO-KA-2024-00509',
    heroImage: `${IMAGE_BASE}/prop-indiranagar-atelier.webp`,
    gallery: [
      {
        url: `${IMAGE_BASE}/prop-indiranagar-atelier.webp`,
        caption: 'Board-formed architectural concrete cantilevers and operable teak screens.',
      },
      {
        url: DETAIL_COURTYARD_URL,
        caption: 'Double-height library corridor overlooking the central bamboo court.',
      },
      {
        url: DETAIL_DINING_URL,
        caption: 'Garden-level dining room that opens completely to Bengaluru’s year-round breeze.',
      },
    ],
    summary:
      'Located on a quiet cul-de-sac in Defence Colony, Indiranagar, this architectural tour de force celebrates Bengaluru’s temperate climate with perforated terracotta jaali screens and seamless indoor-outdoor rooms.',
    editorialDescription: [
      'Crafted for a collector of contemporary South Asian art, The 100-Foot Canopy Pavilion balances sculptural board-formed concrete with the warmth of hand-oiled teak and custom wire-cut terracotta screens.',
      'The house wraps around a three-story vertical lightwell planted with mature black bamboo and frangipani, allowing natural cross-ventilation that eliminates the need for mechanical cooling for ten months of the year.',
      'A rooftop conservatory and acoustic listening room sit at canopy level with the neighborhood’s seventy-year-old rain trees.',
    ],
    architecturalHighlights: [
      'Architectural board-formed concrete cast with seasoned pine planks',
      'Double-height art gallery wall with museum-grade 98-CRI directional lighting',
      'Rooftop acoustic vinyl listening lounge and botanical terrace',
      'Four-car basement gallery with dual 22 kW EV chargers',
    ],
    amenities: [
      'Central Bamboo Courtyard',
      'Rooftop Listening Lounge',
      'Hydraulic Glass Lift',
      '4-Car EV Basement',
      'Terracotta Jaali Facade',
      'Solar Water & Power',
      'Art Gallery Lighting',
      'Chef’s Island Kitchen',
    ],
    locationContext: {
      overview:
        'Defence Colony is Indiranagar’s premier residential pocket—celebrated for its wide tree-canopied avenues, low-density parks, and proximity to Bengaluru’s finest dining and design galleries.',
      connectivity: [
        '3 mins walk to Defence Colony Park & 12th Main boutiques',
        '10 mins to MG Road, Cubbon Park & Bangalore Club',
        '18 mins to Koramangala & Outer Ring Road tech corridors',
        '45 mins to Kempegowda International Airport via Hebbal Expressway',
      ],
      coordinatesLabel: '12.9719° N, 77.6412° E — Defence Colony, Indiranagar, Bengaluru',
    },
    advisor: {
      name: 'Kaveri Cariappa',
      title: 'Director — Bengaluru & Deccan Architectural Homes',
      desk: 'Bengaluru Atelier, Lavelle Road',
    },
  },
  {
    id: 'worli-seaface-triplex',
    slug: 'worli-seaface-triplex',
    title: 'The Worli Seaface Triplex Crown',
    subtitle: 'Crowning three-story penthouse with private rooftop observatory pool and 270-degree ocean panorama',
    city: 'Mumbai',
    neighborhood: 'Worli Sea Face',
    state: 'Maharashtra',
    propertyType: 'Penthouse',
    priceCrores: 92.0,
    priceFormatted: '₹92.00 Cr',
    bedrooms: 5,
    bathrooms: 7,
    areaSqFt: 9600,
    yearCompleted: 2024,
    architectStudio: 'Foster + Local Heritage Studio Mumbai',
    orientation: '270° West, North & South Panorama',
    possessionStatus: 'Limited Curated Release',
    featured: true,
    reraRef: 'DEMO-MH-2024-00741',
    heroImage: `${IMAGE_BASE}/prop-worli-penthouse.webp`,
    gallery: [
      {
        url: `${IMAGE_BASE}/prop-worli-penthouse.webp`,
        caption: 'Sunset reception salon overlooking the Bandra-Worli Sea Link and Arabian Sea.',
      },
      {
        url: HERO_IMAGE_URL,
        caption: 'Top-level private sky deck with cantilevered infinity lap pool.',
      },
      {
        url: DETAIL_COURTYARD_URL,
        caption: 'Sculptural travertine staircase connecting all three residential levels.',
      },
    ],
    summary:
      'Commanding levels 48, 49, and 50 directly on Worli Sea Face, this 9,600-square-foot triplex penthouse offers an unmatched vantage point over Mumbai’s coastline and the Bandra-Worli Sea Link.',
    editorialDescription: [
      'Designed as a serene sanctuary above the energy of Mumbai, The Worli Seaface Triplex Crown is finished in warm Venetian plaster, smoked oak parquetry, and book-matched Roman travertine.',
      'The entry level houses grand entertaining salons, a formal 14-seat dining room, and a glass-enclosed culinary studio. The middle floor is dedicated to four bedroom suites and a 1,600-square-foot primary wing with dual dressing rooms and a sea-facing volcanic stone soaking tub.',
      'The upper observatory deck features a private 15-meter heated sky pool, outdoor pergola kitchen, and private wellness sauna.',
    ],
    architecturalHighlights: [
      'Private internal glass elevator plus sculptural cantilevered stone stair',
      'Rooftop 15-meter infinity pool facing the Bandra-Worli Sea Link',
      '1,600 sq. ft. primary suite with his-and-hers cedar dressing galleries',
      'Six reserved podium parking bays and private chauffeur lounge',
    ],
    amenities: [
      'Private Rooftop Sky Pool',
      'Internal Private Elevator',
      '270° Ocean Panorama',
      'Private Sauna & Steam',
      '6 Podium Parking Bays',
      'Helipad Access Tower',
      'Bespoke Italian Millwork',
      'White-Glove Butler Desk',
    ],
    locationContext: {
      overview:
        'Situated on the coveted Worli Sea Face promenade with direct access to the Coastal Road and Sea Link, bridging South Mumbai heritage and BKC business districts.',
      connectivity: [
        '1 min to Worli Sea Face Promenade & Coastal Road North/South ramps',
        '8 mins to Bandra-Kurla Complex (BKC) via Sea Link',
        '12 mins to Mahalaxmi Racecourse & Willingdon Club',
        '22 mins to Mumbai International Airport & Private Aviation Terminal',
      ],
      coordinatesLabel: '19.0096° N, 72.8154° E — Worli Sea Face, Mumbai',
    },
    advisor: {
      name: 'Arundhati Mehta',
      title: 'Senior Partner — South Mumbai Private Estates',
      desk: 'Mumbai Atelier, Kala Ghoda',
    },
  },
  {
    id: 'pichola-sandstone-haveli',
    slug: 'pichola-sandstone-haveli',
    title: 'Baghore Ghat Lakeside Haveli',
    subtitle: 'Restored 19th-century Mewar courtyard mansion overlooking Lake Pichola and the Aravalli hills',
    city: 'Udaipur',
    neighborhood: 'Lake Pichola Eastern Bank',
    state: 'Rajasthan',
    propertyType: 'Courtyard Estate',
    priceCrores: 36.0,
    priceFormatted: '₹36.00 Cr',
    bedrooms: 6,
    bathrooms: 7,
    areaSqFt: 8900,
    plotSizeSqFt: 11200,
    yearCompleted: 2023,
    architectStudio: 'Abhikram Heritage Conservation Studio',
    orientation: 'West Lakefront & Sunset Facing',
    possessionStatus: 'Ready for Handover',
    featured: true,
    reraRef: 'DEMO-RJ-2023-00294',
    heroImage: `${IMAGE_BASE}/prop-pichola-haveli.webp`,
    gallery: [
      {
        url: `${IMAGE_BASE}/prop-pichola-haveli.webp`,
        caption: 'Central Mor-Chowk courtyard with carved yellow sandstone arches and reflection pool.',
      },
      {
        url: DETAIL_COURTYARD_URL,
        caption: 'Traditional lime-burnished Araish plaster arcade on the upper gallery.',
      },
      {
        url: DETAIL_DINING_URL,
        caption: 'Rooftop chhatri terrace looking toward Jag Mandir and the Aravalli ridge.',
      },
    ],
    summary:
      'Painstakingly restored over four years by fourth-generation Rajasthani master stone carvers and lime craftsmen, this private lakeside haveli offers royal Mewari architecture adapted for contemporary living.',
    editorialDescription: [
      'Originally built in 1884 for a noble family of the Mewar court, the Baghore Ghat Lakeside Haveli rises three stories around two tranquil internal courtyards. Every cusped sandstone arch (jharokha) and pierced stone screen (jaali) has been conserved using traditional lime mortar and marble dust Araish plaster.',
      'Beneath the historic surfaces lies completely modernized infrastructure: concealed VRF climate systems, underfloor heating in the winter suites, an internal passenger lift, and a rooftop heated plunge pool overlooking the shimmering waters of Lake Pichola.',
    ],
    architecturalHighlights: [
      'Authentic hand-burnished Araish lime plaster and Banswara marble flooring',
      'Private boat jetty access on Lake Pichola for arrival by wooden shikara',
      'Rooftop sunset terrace with heated marble plunge pool and dining chhatri',
      'Six palatial suites, each with carved stone window alcoves',
    ],
    amenities: [
      'Lake Pichola Views',
      'Private Boat Jetty Access',
      'Dual Internal Courtyards',
      'Rooftop Marble Plunge Pool',
      'Passenger Elevator',
      'Underfloor Winter Heating',
      'Heritage Araish Craftwork',
      'Private Concierge Suite',
    ],
    locationContext: {
      overview:
        'Set in a serene heritage enclave on the banks of Lake Pichola, accessible by both private motor lane and lakeside boat transfer.',
      connectivity: [
        '3 mins by boat to The Oberoi Udaivilas & Taj Lake Palace',
        '6 mins walk to City Palace Museum Complex',
        '35 mins to Maharana Pratap Airport, Udaipur',
      ],
      coordinatesLabel: '24.5764° N, 73.6805° E — Lake Pichola, Udaipur',
    },
    advisor: {
      name: 'Vikramaditya Singhania',
      title: 'Managing Director — North India Heritage & Diplomatic Estates',
      desk: 'New Delhi Atelier, Sunder Nagar',
    },
  },
  {
    id: 'alibaug-mandwa-pavilion',
    slug: 'alibaug-mandwa-pavilion',
    title: 'Mandwa Basalt & Timber Sanctuary',
    subtitle: 'Two-acre coastal estate with cantilevered teak pavilions, basalt lap pool, and coconut orchard',
    city: 'Alibaug',
    neighborhood: 'Awash & Sasawane Coastal Belt',
    state: 'Maharashtra',
    propertyType: 'Coastal Pavilion',
    priceCrores: 32.0,
    priceFormatted: '₹32.00 Cr',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 8100,
    plotSizeSqFt: 87120,
    yearCompleted: 2024,
    architectStudio: 'Pinakin & Architectural Atelier Mumbai',
    orientation: 'West Coastal Breeze Axis',
    possessionStatus: 'Ready for Handover',
    featured: false,
    reraRef: 'DEMO-MH-2024-00612',
    heroImage: `${IMAGE_BASE}/prop-ali-baug-pavilion.webp`,
    gallery: [
      {
        url: `${IMAGE_BASE}/prop-ali-baug-pavilion.webp`,
        caption: 'Low-slung teak roof pavilion and 25-meter black basalt infinity pool.',
      },
      {
        url: DETAIL_DINING_URL,
        caption: 'Breezy outdoor entertaining veranda surrounded by 140 mature coconut palms.',
      },
      {
        url: DETAIL_COURTYARD_URL,
        caption: 'Guest suite gallery with hand-split Deccan basalt walls and cane screens.',
      },
    ],
    summary:
      'Just twenty minutes by private speedboat from South Mumbai’s Gateway of India, this two-acre Alibaug compound comprises three interconnected timber and basalt pavilions set inside a mature orchard.',
    editorialDescription: [
      'Designed as an effortless weekend and work-from-coast sanctuary for a Mumbai family, the Mandwa Basalt & Timber Sanctuary dissolves the boundary between architecture and landscape.',
      'The main living pavilion is completely column-free along its 50-foot garden edge, sheltered by deep cantilevered Burmese teak eaves that keep the interiors cool even at midday. A 25-meter black basalt lap pool mirrors the surrounding palms.',
    ],
    architecturalHighlights: [
      '2.0 acres of titled non-agricultural (NA) landscaped coastal orchard',
      '25-meter heated black basalt lap pool and sunken fire-pit lounge',
      'Dedicated tennis/padel court and private wellness spa pavilion',
      '12 minutes from Mandwa Jetty private speedboat moorings',
    ],
    amenities: [
      '2-Acre Private Orchard',
      '25m Basalt Lap Pool',
      'Private Padel Court',
      'Detached Spa Pavilion',
      'Speedboat Transfer Proximity',
      'Organic Kitchen Garden',
      'Generator & Solar Grid',
      '6-Car Covered Parking',
    ],
    locationContext: {
      overview:
        'Positioned in the coveted Awash-Sasawane corridor of North Alibaug, prized for its proximity to Mandwa Jetty and quiet rural canopy.',
      connectivity: [
        '10 mins to Mandwa Jetty & Ro-Ro Ferry Terminal',
        '20 mins by private speedboat to Gateway of India / Taj Mahal Palace, Mumbai',
        '8 mins to The Boardwalk & Kihim Beach',
      ],
      coordinatesLabel: '18.7862° N, 72.8819° E — Awash, Alibaug, Maharashtra',
    },
    advisor: {
      name: 'Rohan Mascarenhas',
      title: 'Principal Advisor — Coastal & Western Ghats Estates',
      desk: 'Goa & Mumbai Advisory',
    },
  },
  {
    id: 'jubilee-boulder-villa',
    slug: 'jubilee-boulder-villa',
    title: 'The Deccan Granite Ridge House',
    subtitle: 'Architectural villa sculpted around ancient granite boulders in Jubilee Hills',
    city: 'Hyderabad',
    neighborhood: 'Jubilee Hills — Road No. 45 Ridge',
    state: 'Telangana',
    propertyType: 'Modernist Residence',
    priceCrores: 38.5,
    priceFormatted: '₹38.50 Cr',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 9200,
    plotSizeSqFt: 10800,
    yearCompleted: 2024,
    architectStudio: 'MORIQ & Deccan Tectonics Studio',
    orientation: 'East Ridge Panorama',
    possessionStatus: 'Ready for Handover',
    featured: false,
    reraRef: 'DEMO-TS-2024-00337',
    heroImage: `${IMAGE_BASE}/prop-jubilee-ridge-villa.webp`,
    gallery: [
      {
        url: `${IMAGE_BASE}/prop-jubilee-ridge-villa.webp`,
        caption: 'Corten steel and bronze louvers cantilevered over natural Deccan granite formations.',
      },
      {
        url: DETAIL_COURTYARD_URL,
        caption: 'Interior bridge crossing a natural rock water court inside the home.',
      },
      {
        url: DETAIL_DINING_URL,
        caption: 'Double-height formal dining hall with custom tandur stone floors.',
      },
    ],
    summary:
      'Preserving the dramatic 2.5-billion-year-old granite boulders native to the Deccan plateau, this Jubilee Hills residence weaves steel, glass, and honed Tandur stone around living rock.',
    editorialDescription: [
      'Rather than blasting the site’s monolithic granite outcrop, the architects suspended three terraced living levels lightly above and around the natural stone. Inside the main gallery, a sculpted boulder forms the dramatic backdrop to a quiet reflection pond.',
      'Operable anodized bronze louvers along the western facade filter Hyderabad’s strong afternoon sun into delicate geometric patterns across honed grey Tandur limestone floors.',
    ],
    architecturalHighlights: [
      'Integrated natural Deccan granite boulder formations within the interior courtyard',
      'Private Dolby Atmos cinema lounge and subterranean wine cellar',
      'Rooftop infinity plunge pool overlooking the KBR National Park canopy',
      'Six-car subterranean garage with turntable',
    ],
    amenities: [
      'Natural Boulder Courtyard',
      'KBR Park Canopy Views',
      'Private Atmos Cinema',
      'Rooftop Infinity Pool',
      'Commercial-Grade Lift',
      '6-Car Garage + Turntable',
      'Operable Bronze Louvers',
      'Smart Climate Zoning',
    ],
    locationContext: {
      overview:
        'Perched on a quiet crest in Jubilee Hills near KBR National Park, offering commanding views and rapid access to both Banjara Hills and the Financial District.',
      connectivity: [
        '4 mins to KBR National Park Morning Walk Track',
        '8 mins to Jubilee Hills Club & Film Nagar',
        '20 mins to HITEC City & Gachibowli Financial District',
        '38 mins to Rajiv Gandhi International Airport via PVNR Expressway',
      ],
      coordinatesLabel: '17.4319° N, 78.4071° E — Jubilee Hills, Hyderabad',
    },
    advisor: {
      name: 'Kaveri Cariappa',
      title: 'Director — Bengaluru & Deccan Architectural Homes',
      desk: 'Bengaluru Atelier, Lavelle Road',
    },
  },
  {
    id: 'ecr-athangudi-retreat',
    slug: 'ecr-athangudi-retreat',
    title: 'Neelankarai Coastal Veranda House',
    subtitle: 'Chettinad-inspired modernist sea sanctuary with Athangudi tiles and Madras terrace roofs',
    city: 'Chennai',
    neighborhood: 'Neelankarai — East Coast Road',
    state: 'Tamil Nadu',
    propertyType: 'Coastal Pavilion',
    priceCrores: 22.0,
    priceFormatted: '₹22.00 Cr',
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 6400,
    plotSizeSqFt: 14400,
    yearCompleted: 2024,
    architectStudio: 'Tropical Modernism Studio Chennai',
    orientation: 'East — Bay of Bengal Sea Breeze',
    possessionStatus: 'Ready for Handover',
    featured: false,
    reraRef: 'DEMO-TN-2024-00188',
    heroImage: `${IMAGE_BASE}/prop-cheval-ecr-retreat.webp`,
    gallery: [
      {
        url: `${IMAGE_BASE}/prop-cheval-ecr-retreat.webp`,
        caption: 'Central thinnai veranda with handcrafted terracotta Athangudi tiles and Burma teak columns.',
      },
      {
        url: DETAIL_COURTYARD_URL,
        caption: 'Open-to-sky Mutram courtyard bringing coastal breezes into every room.',
      },
      {
        url: DETAIL_DINING_URL,
        caption: 'Garden loggia overlooking the Bay of Bengal dune garden.',
      },
    ],
    summary:
      'Set 150 meters from the quiet shoreline of Neelankarai in South Chennai, this residence marries Tamil vernacular craft—Madras terrace timber ceilings and handmade Athangudi tiles—with crisp coastal modernism.',
    editorialDescription: [
      'Organized around a traditional Tamil Mutram (open central court), the Neelankarai Coastal Veranda House is engineered to capture the cooling afternoon sea breeze off the Bay of Bengal.',
      'Master craftsmen from Karaikudi laid custom terracotta-and-oxide Athangudi tiles across the verandas, while turned Burma teak pillars support deep overhanging eaves.',
    ],
    architecturalHighlights: [
      'Bespoke handmade Chettinad Athangudi tiles and lime-oxide walls',
      'Private gated pedestrian path directly to quiet Neelankarai beach',
      'Saltwater-chlorinated 18-meter garden lap pool',
      'Marine-grade SS-316 hardware and coastal weatherproofing throughout',
    ],
    amenities: [
      'Direct Beach Path Access',
      '18m Saltwater Lap Pool',
      'Central Mutram Courtyard',
      'Handcrafted Athangudi Tiles',
      'Burma Teak Colonnade',
      'Solar Desalination & RO',
      '4-Car Covered Portico',
      'Separate Guest Suite',
    ],
    locationContext: {
      overview:
        'Neelankarai is Chennai’s most prestigious coastal residential enclave along East Coast Road, home to industrialists, artists, and serene private estates.',
      connectivity: [
        '2 mins walk to Neelankarai Private Beach Stretch',
        '12 mins to Adyar, Besant Nagar & Madras Boat Club',
        '20 mins to Alwarpet & R.A. Puram cultural center',
        '32 mins to Chennai International Airport',
      ],
      coordinatesLabel: '12.9482° N, 80.2594° E — Neelankarai, Chennai',
    },
    advisor: {
      name: 'Kaveri Cariappa',
      title: 'Director — Bengaluru & Deccan Architectural Homes',
      desk: 'Bengaluru Atelier, Lavelle Road',
    },
  },
  {
    id: 'sankey-terracotta-house',
    slug: 'sankey-terracotta-house',
    title: 'Sankey Tank Conservatory Residence',
    subtitle: 'Handcrafted wire-cut brick and timber residence overlooking Sankey Tank lake gardens',
    city: 'Bengaluru',
    neighborhood: 'Sadashivanagar',
    state: 'Karnataka',
    propertyType: 'Heritage Bungalow',
    priceCrores: 34.0,
    priceFormatted: '₹34.00 Cr',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 7800,
    plotSizeSqFt: 7200,
    yearCompleted: 2023,
    architectStudio: 'Biome & Studio Terracotta Bengaluru',
    orientation: 'West Lake & Canopy Facing',
    possessionStatus: 'Limited Curated Release',
    featured: false,
    reraRef: 'DEMO-KA-2023-00944',
    heroImage: `${IMAGE_BASE}/prop-koramangala-townhouse.webp`,
    gallery: [
      {
        url: `${IMAGE_BASE}/prop-koramangala-townhouse.webp`,
        caption: 'Street and garden facade crafted from custom wire-cut terracotta brick and seasoned teak.',
      },
      {
        url: DETAIL_COURTYARD_URL,
        caption: 'Sunlit conservatory atrium connecting the living rooms and upper bedroom suites.',
      },
      {
        url: DETAIL_DINING_URL,
        caption: 'Terrace dining veranda overlooking the tree canopy of Sadashivanagar.',
      },
    ],
    summary:
      'In the heart of Old Bengaluru’s aristocratic Sadashivanagar neighborhood near Sankey Tank, this five-bedroom brick-and-timber home celebrates earthy materiality and serene garden living.',
    editorialDescription: [
      'Sadashivanagar represents the timeless garden-city spirit of Bengaluru. The Sankey Tank Conservatory Residence honors that legacy with load-bearing walls of custom high-density terracotta bricks, yellow Jaisalmer and grey Kota stone floors, and deep cantilevered timber balconies.',
      'A triple-height glass-and-steel botanical conservatory sits at the center of the plan, filling every level with dappled sunlight and the scent of indoor jasmine and ferns.',
    ],
    architecturalHighlights: [
      'Prime tree-lined avenue steps from Sankey Tank promenade in Sadashivanagar',
      'Triple-height internal botanical conservatory with automated skylight louvers',
      'Heated hydrotherapy courtyard plunge pool and private yoga deck',
      'Zero-discharge rainwater recharge wells and solar thermal integration',
    ],
    amenities: [
      'Botanical Glass Atrium',
      'Heated Plunge Pool',
      'Sankey Tank Proximity',
      'Custom Terracotta Masonry',
      'Private Elevator',
      '4-Car Basement Parking',
      'Acoustic Home Study',
      'Rainwater Autonomy',
    ],
    locationContext: {
      overview:
        'Sadashivanagar is widely regarded as Bengaluru’s most prestigious residential address, bordered by the Palace Grounds, Indian Institute of Science forest, and Sankey Tank lake.',
      connectivity: [
        '3 mins walk to Sankey Tank Boat Club & Promenade',
        '6 mins to Bangalore Golf Club, Windsor Manor & Palace Grounds',
        '15 mins to UB City, Lavelle Road & Vidhana Soudha',
        '32 mins to Kempegowda International Airport (fastest north corridor)',
      ],
      coordinatesLabel: '13.0068° N, 77.5761° E — Sadashivanagar, Bengaluru',
    },
    advisor: {
      name: 'Kaveri Cariappa',
      title: 'Director — Bengaluru & Deccan Architectural Homes',
      desk: 'Bengaluru Atelier, Lavelle Road',
    },
  },
]

export const CITIES: IndianCity[] = [
  'Mumbai',
  'New Delhi',
  'North Goa',
  'Bengaluru',
  'Udaipur',
  'Alibaug',
  'Hyderabad',
  'Chennai',
]

export const PROPERTY_TYPES: PropertyType[] = [
  'Sky Villa',
  'Heritage Bungalow',
  'Courtyard Estate',
  'Penthouse',
  'Coastal Pavilion',
  'Modernist Residence',
]

export interface BudgetBracket {
  id: string
  label: string
  minCrores: number
  maxCrores: number
}

export const BUDGET_BRACKETS: BudgetBracket[] = [
  { id: 'all', label: 'All Budgets', minCrores: 0, maxCrores: 999 },
  { id: 'under-25', label: 'Up to ₹25 Cr', minCrores: 0, maxCrores: 25 },
  { id: '25-50', label: '₹25 Cr – ₹50 Cr', minCrores: 25, maxCrores: 50 },
  { id: '50-100', label: '₹50 Cr – ₹100 Cr', minCrores: 50, maxCrores: 100 },
  { id: 'above-100', label: 'Above ₹100 Cr', minCrores: 100, maxCrores: 999 },
]

export const ARCHITECTURAL_CATEGORIES = [
  {
    propertyType: 'Heritage Bungalow' as PropertyType,
    title: 'Heritage & Lutyens Bungalows',
    description:
      'Generational freehold estates in New Delhi, Bengaluru, and Udaipur featuring classic colonnades and private half-acre gardens.',
    image: `${IMAGE_BASE}/prop-lutyens-bungalow.webp`,
    countLabel: '2 Curated Estates',
  },
  {
    propertyType: 'Sky Villa' as PropertyType,
    title: 'Sea-Facing Sky Villas & Penthouses',
    description:
      'Single-floor and triplex residences along Malabar Hill and Worli Sea Face with 22-foot ceilings and uninterrupted ocean horizons.',
    image: `${IMAGE_BASE}/prop-malabar-sky-villa.webp`,
    countLabel: '2 Curated Estates',
  },
  {
    propertyType: 'Courtyard Estate' as PropertyType,
    title: 'Laterite & Haveli Courtyards',
    description:
      'Architectural sanctuaries in North Goa and Rajasthan organized around tranquil reflection pools, lime plaster, and carved stone.',
    image: `${IMAGE_BASE}/prop-assagao-courtyard.webp`,
    countLabel: '2 Curated Estates',
  },
  {
    propertyType: 'Coastal Pavilion' as PropertyType,
    title: 'Coastal & Modernist Pavilions',
    description:
      'Tactile concrete, basalt, and Burmese teak homes in Alibaug, Indiranagar, Jubilee Hills, and Chennai’s East Coast Road.',
    image: `${IMAGE_BASE}/prop-ali-baug-pavilion.webp`,
    countLabel: '4 Curated Estates',
  },
]

export const ADVISORY_SERVICES = [
  {
    number: '01',
    title: 'Architectural Curation & Provenance',
    description:
      'Every residence represented by DEMO undergoes an independent architectural, structural, and material review alongside title verification in Mumbai, Delhi NCR, Goa, and South India.',
  },
  {
    number: '02',
    title: 'Discreet Off-Market Representation',
    description:
      'Over sixty percent of our transactions occur privately between family offices, industrialists, and architectural collectors without public syndication.',
  },
  {
    number: '03',
    title: 'Conservation & Turnkey Stewardship',
    description:
      'We pair buyers with India’s foremost conservation architects, landscape botanists, and lighting ateliers to restore or tailor residences prior to handover.',
  },
]

export const TEAM_MEMBERS = [
  {
    name: 'Arundhati Mehta',
    role: 'Founding Partner & Principal Curator',
    location: 'Mumbai Atelier — Kala Ghoda',
    bio: 'Trained at CEPT Ahmedabad and the AA in London, Arundhati spent fifteen years advising collector families on modernist and heritage residences across South Mumbai and Alibaug.',
    specialties: ['Malabar Hill & Worli Penthouses', 'Alibaug Coastal Estates', 'Art & Architectural Stewardship'],
  },
  {
    name: 'Vikramaditya Singhania',
    role: 'Managing Director — North India & Heritage',
    location: 'New Delhi Atelier — Sunder Nagar',
    bio: 'Specializing in Lutyens’ Bungalow Zone freehold properties and royal Mewari havelis in Rajasthan, Vikramaditya leads discreet acquisitions for diplomatic and family-office mandates.',
    specialties: ['Lutyens’ Bungalow Zone', 'Udaipur & Jaipur Restored Havelis', 'Family Office Structuring'],
  },
  {
    name: 'Kaveri Cariappa',
    role: 'Director — Deccan & Southern Ateliers',
    location: 'Bengaluru Atelier — Lavelle Road',
    bio: 'An architectural historian and private broker, Kaveri curates craft-led residences across Indiranagar, Sadashivanagar, Jubilee Hills, and Chennai’s coastal belt.',
    specialties: ['Bengaluru Courtyard Homes', 'Jubilee Hills Ridge Estates', 'ECR Coastal Modernism'],
  },
  {
    name: 'Rohan Mascarenhas',
    role: 'Partner — Konkan & Western Ghats',
    location: 'North Goa Atelier — Assagao',
    bio: 'Born in Panjim, Rohan oversees our portfolio of Indo-Portuguese conservation estates and contemporary laterite villas across Assagao, Siolim, and the Western Ghats.',
    specialties: ['Indo-Portuguese Conservation', 'Assagao & Siolim Villas', 'Sustainable Land Mandates'],
  },
]

export const ATELIER_OFFICES = [
  {
    city: 'Mumbai (Flagship Atelier)',
    address: 'Level 3, Commissariat Building, 231 D.N. Road, Kala Ghoda, Fort, Mumbai 400001',
    hours: 'Monday – Saturday · 10:00 AM – 7:00 PM IST (By Appointment)',
    phone: '+91 (22) 6100 4800 (Demo Line)',
    email: 'mumbai.atelier@demo-estates.example',
  },
  {
    city: 'New Delhi Salon',
    address: '14 Sunder Nagar Market, Near Lodhi Gardens, New Delhi 110003',
    hours: 'Monday – Saturday · 10:30 AM – 6:30 PM IST (By Appointment)',
    phone: '+91 (11) 4920 1900 (Demo Line)',
    email: 'delhi.salon@demo-estates.example',
  },
  {
    city: 'Bengaluru & Goa Desk',
    address: 'No. 8, Walton Road, Off Lavelle Road, Bengaluru 560001',
    hours: 'Monday – Saturday · 10:00 AM – 7:00 PM IST (By Appointment)',
    phone: '+91 (80) 4112 7300 (Demo Line)',
    email: 'south.atelier@demo-estates.example',
  },
]
