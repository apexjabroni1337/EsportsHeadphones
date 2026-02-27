import React from "react";

// Amazon Affiliate Helper — change tag here to update all links sitewide
export const AMAZON_TAG = "esportsheadphones-20";
export const amazonLink = (searchTerm) => `https://www.amazon.com/s?k=${encodeURIComponent(searchTerm)}&tag=${AMAZON_TAG}`;

const FLAG_TO_CODE = {"🇦🇱":"al","🇦🇲":"am","🇦🇷":"ar","🇦🇹":"at","🇦🇺":"au","🇧🇦":"ba","🇧🇪":"be","🇧🇬":"bg","🇧🇷":"br","🇧🇾":"by","🇨🇦":"ca","🇨🇭":"ch","🇨🇱":"cl","🇨🇳":"cn","🇨🇿":"cz","🇩🇪":"de","🇩🇰":"dk","🇩🇴":"do","🇪🇪":"ee","🇪🇬":"eg","🇪🇸":"es","🇫🇮":"fi","🇫🇷":"fr","🇬🇧":"gb","🇬🇪":"ge","🇬🇷":"gr","🇬🇹":"gt","🇭🇰":"hk","🇭🇷":"hr","🇭🇺":"hu","🇮🇩":"id","🇮🇱":"il","🇮🇳":"in","🇮🇶":"iq","🇮🇹":"it","🇯🇴":"jo","🇯🇵":"jp","🇰🇭":"kh","🇰🇷":"kr","🇰🇿":"kz","🇱🇧":"lb","🇱🇹":"lt","🇱🇺":"lu","🇱🇻":"lv","🇲🇦":"ma","🇲🇩":"md","🇲🇪":"me","🇲🇰":"mk","🇲🇳":"mn","🇲🇽":"mx","🇲🇾":"my","🇳🇱":"nl","🇳🇴":"no","🇳🇿":"nz","🇵🇪":"pe","🇵🇭":"ph","🇵🇱":"pl","🇵🇸":"ps","🇵🇹":"pt","🇷🇴":"ro","🇷🇸":"rs","🇷🇺":"ru","🇸🇦":"sa","🇸🇪":"se","🇸🇬":"sg","🇸🇮":"si","🇸🇰":"sk","🇹🇭":"th","🇹🇷":"tr","🇹🇼":"tw","🇺🇦":"ua","🇺🇸":"us","🇺🇾":"uy","🇻🇳":"vn","🇽🇰":"xk","🇿🇦":"za"};
export const flagCode = (emoji) => FLAG_TO_CODE[emoji] || null;
export const flagUrl = (emoji, size = 24) => {
  const code = FLAG_TO_CODE[emoji];
  if (!code) return null;
  const validWidths = [16, 20, 24, 28, 32, 36, 40, 48, 56, 60, 64, 80, 96, 112, 120, 128, 160, 192, 224, 240, 256];
  const w = validWidths.find(v => v >= size) || 160;
  return `https://flagcdn.com/${w}x${Math.round(w*0.75)}/${code}.png`;
};
const CODE_TO_NAME = {al:"Albania",am:"Armenia",ar:"Argentina",at:"Austria",au:"Australia",ba:"Bosnia",be:"Belgium",bg:"Bulgaria",br:"Brazil",by:"Belarus",ca:"Canada",ch:"Switzerland",cl:"Chile",cn:"China",cz:"Czechia",de:"Germany",dk:"Denmark",do:"Dominican Rep.",ee:"Estonia",eg:"Egypt",es:"Spain",fi:"Finland",fr:"France",gb:"UK",ge:"Georgia",gr:"Greece",gt:"Guatemala",hk:"Hong Kong",hr:"Croatia",hu:"Hungary",id:"Indonesia",il:"Israel",in:"India",iq:"Iraq",it:"Italy",jo:"Jordan",jp:"Japan",kh:"Cambodia",kr:"South Korea",kz:"Kazakhstan",lb:"Lebanon",lt:"Lithuania",lu:"Luxembourg",lv:"Latvia",ma:"Morocco",md:"Moldova",me:"Montenegro",mk:"N. Macedonia",mn:"Mongolia",mx:"Mexico",my:"Malaysia",nl:"Netherlands",no:"Norway",nz:"New Zealand",pe:"Peru",ph:"Philippines",pl:"Poland",ps:"Palestine",pt:"Portugal",ro:"Romania",rs:"Serbia",ru:"Russia",sa:"Saudi Arabia",se:"Sweden",sg:"Singapore",si:"Slovenia",sk:"Slovakia",th:"Thailand",tr:"Turkey",tw:"Taiwan",ua:"Ukraine",us:"USA",uy:"Uruguay",vn:"Vietnam",xk:"Kosovo",za:"South Africa"};
export const countryName = (emoji) => { const code = FLAG_TO_CODE[emoji]; return code ? CODE_TO_NAME[code] || code.toUpperCase() : emoji; };

export const BRAND_COLORS = {
  Razer: "#2a8a40",
  HyperX: "#c43800",
  Logitech: "#2874a6",
  SteelSeries: "#c47000",
  Corsair: "#b8960a",
  beyerdynamic: "#8b0000",
  ASUS: "#b01040",
  Sennheiser: "#003da5",
  Sony: "#000000",
  "Turtle Beach": "#1a472a",
  ASTRO: "#2e8bc0",
  JBL: "#1d1d1b",
  Audeze: "#000000",
};


// Headphone dimensions in mm: [width, depth, height, weight_grams]
export const HEADPHONE_DIMS = {
  "Razer BlackShark V2 Pro": [210, 85, 195, 280],
  "HyperX Cloud II": [215, 90, 200, 290],
  "Razer BlackShark V3 Pro": [215, 88, 200, 285],
  "Logitech G Pro X Headset": [205, 80, 190, 320],
  "HyperX Cloud III": [220, 92, 205, 300],
  "beyerdynamic DT 990 Pro": [225, 95, 220, 250],
  "Logitech G PRO X 2": [210, 85, 195, 310],
  "Razer BlackShark V2": [210, 85, 195, 280],
  "HyperX Cloud Alpha S": [218, 90, 205, 310],
  "beyerdynamic MMX 300": [220, 95, 215, 350],
  "ASUS ROG Delta II": [230, 100, 215, 330],
  "Logitech G733": [215, 88, 200, 320],
  "Sennheiser GAME ONE": [210, 92, 205, 310],
  "Corsair HS80": [215, 90, 210, 340],
  "SteelSeries Arctis Nova Pro": [220, 95, 215, 330],
  "SteelSeries Arctis 7": [215, 92, 210, 340],
  "SteelSeries Arctis Pro Wireless": [225, 98, 220, 360],
  "Sony INZONE H9": [220, 95, 215, 325],
  "Corsair HS80 RGB": [220, 92, 210, 340],
  "HyperX Cloud Flight S": [222, 94, 212, 320],
  "SteelSeries Arctis Nova 7": [220, 95, 215, 330],
  "Corsair Virtuoso RGB XT": [225, 96, 220, 350],
  "Logitech G435": [200, 75, 180, 165],
  "Razer Kraken V4": [230, 100, 220, 340],
  "Razer Barracuda Pro": [235, 102, 225, 320],
  "Audeze Maxwell": [240, 105, 230, 380],
  "HyperX Cloud Alpha": [215, 90, 205, 305],
  "SteelSeries Arctis Nova Pro Wireless": [225, 98, 220, 360],
  "beyerdynamic DT 770 Pro": [230, 95, 225, 280],
  "Sennheiser HD 560S": [220, 92, 215, 240],
  "ASTRO A50": [235, 105, 230, 370],
  "ASTRO A40 TR": [220, 95, 215, 340],
  "Corsair Virtuoso SE": [220, 92, 210, 330],
  "Turtle Beach Stealth 700 Gen 2": [235, 100, 220, 340],
  "JBL Quantum 910": [245, 110, 240, 380],
  "Logitech G435 LIGHTSPEED": [200, 75, 180, 165],
};


export const HEADPHONE_IMAGE_URLS = {
  "Razer BlackShark V2 Pro": "https://m.media-amazon.com/images/I/71-Q3IDLG9L._AC_SL1500_.jpg",
  "HyperX Cloud II": "https://m.media-amazon.com/images/I/71Z1E2cVBxL._AC_SL1500_.jpg",
  "Razer BlackShark V3 Pro": "https://m.media-amazon.com/images/I/71qFc0VwpfL._AC_SL1500_.jpg",
  "Logitech G Pro X Headset": "https://m.media-amazon.com/images/I/61sDKQr0sYL._AC_SL1500_.jpg",
  "HyperX Cloud III": "https://m.media-amazon.com/images/I/61XK1fj0ELL._AC_SL1500_.jpg",
  "beyerdynamic DT 990 Pro": "https://m.media-amazon.com/images/I/61tSqwHBzNL._AC_SL1500_.jpg",
  "Logitech G PRO X 2": "https://m.media-amazon.com/images/I/61v5kJ2f6DL._AC_SL1500_.jpg",
  "Razer BlackShark V2": "https://m.media-amazon.com/images/I/71-Q3IDLG9L._AC_SL1500_.jpg",
  "HyperX Cloud Alpha S": "https://m.media-amazon.com/images/I/61F23CdVbSL._AC_SL1500_.jpg",
  "beyerdynamic MMX 300": "https://m.media-amazon.com/images/I/61jHHNn1nnL._AC_SL1500_.jpg",
  "ASUS ROG Delta II": "https://m.media-amazon.com/images/I/61DRrC0S5LL._AC_SL1500_.jpg",
  "Logitech G733": "https://m.media-amazon.com/images/I/61LmZvR1K1L._AC_SL1500_.jpg",
  "Sennheiser GAME ONE": "https://m.media-amazon.com/images/I/61h1wCH+daL._AC_SL1500_.jpg",
  "Corsair HS80": "https://m.media-amazon.com/images/I/61jNQ6ATFGL._AC_SL1500_.jpg",
  "SteelSeries Arctis Nova Pro": "https://m.media-amazon.com/images/I/71H0p+y+LQL._AC_SL1500_.jpg",
  "SteelSeries Arctis 7": "https://m.media-amazon.com/images/I/61jvlZSq+LL._AC_SL1500_.jpg",
  "SteelSeries Arctis Pro Wireless": "https://m.media-amazon.com/images/I/61RRHLNm4aL._AC_SL1500_.jpg",
  "Sony INZONE H9": "https://m.media-amazon.com/images/I/61e2L9g0FrL._AC_SL1500_.jpg",
  "Corsair HS80 RGB": "https://m.media-amazon.com/images/I/61Yb9CNPJ3L._AC_SL1500_.jpg",
  "HyperX Cloud Flight S": "https://m.media-amazon.com/images/I/61g5a-NQBCL._AC_SL1500_.jpg",
  "SteelSeries Arctis Nova 7": "https://m.media-amazon.com/images/I/61aT+EHb9dL._AC_SL1500_.jpg",
  "Corsair Virtuoso RGB XT": "https://m.media-amazon.com/images/I/61pnIbE8oIL._AC_SL1500_.jpg",
  "Logitech G435": "https://m.media-amazon.com/images/I/61M9PXNQ2SL._AC_SL1500_.jpg",
  "Razer Kraken V4": "https://m.media-amazon.com/images/I/71BM8YU-YGL._AC_SL1500_.jpg",
  "Razer Barracuda Pro": "https://m.media-amazon.com/images/I/71K0V1RM3bL._AC_SL1500_.jpg",
  "Audeze Maxwell": "https://m.media-amazon.com/images/I/61HF1nN8LeL._AC_SL1500_.jpg",
  "HyperX Cloud Alpha": "https://m.media-amazon.com/images/I/61G7R4Y2zEL._AC_SL1500_.jpg",
  "SteelSeries Arctis Nova Pro Wireless": "https://m.media-amazon.com/images/I/71m4YNxzHyL._AC_SL1500_.jpg",
  "beyerdynamic DT 770 Pro": "https://m.media-amazon.com/images/I/61N1oTuQVwL._AC_SL1500_.jpg",
  "Sennheiser HD 560S": "https://m.media-amazon.com/images/I/61VWL7Mq66L._AC_SL1500_.jpg",
  "ASTRO A50": "https://m.media-amazon.com/images/I/61hPzJNkBzL._AC_SL1500_.jpg",
  "ASTRO A40 TR": "https://m.media-amazon.com/images/I/61sCpAC4C-L._AC_SL1500_.jpg",
  "Corsair Virtuoso SE": "https://m.media-amazon.com/images/I/61HmFTQzx3L._AC_SL1500_.jpg",
  "Turtle Beach Stealth 700 Gen 2": "https://m.media-amazon.com/images/I/61cz0GEJqRL._AC_SL1500_.jpg",
  "JBL Quantum 910": "https://m.media-amazon.com/images/I/61pXSXPCWgL._AC_SL1500_.jpg",
  "Logitech G435 LIGHTSPEED": "https://m.media-amazon.com/images/I/61M9PXNQ2SL._AC_SL1500_.jpg",
};


export const HEADPHONE_DESCRIPTIONS = {
  "Razer BlackShark V2 Pro": {
    text: "The Razer BlackShark V2 Pro has become one of the most dominant gaming headsets in esports with an estimated 28% pro usage across competitive titles. These THX-certified over-ear headphones deliver crystal-clear 7.1 surround sound with impeccable directional audio cues—critical for competitive gaming where footstep positioning can decide matches. The ultrasonic haptic feedback system provides physical sensation for explosions and gunfire, adding a tactile dimension to competitive play. At just 280g, the BlackShark V2 Pro remains remarkably light despite the robust build quality, and the active noise cancellation eliminates distracting background noise in competitive environments. Both wired and wireless variants are used by pros, with wireless winning favor among streamers for setup flexibility.",
    highlights: ["28% pro usage across competitive titles", "7.1 surround sound with spatial precision", "ultrasonic haptic feedback for immersive gameplay"]
  },
  "HyperX Cloud II": {
    text: "The HyperX Cloud II stands as the all-time most legendary esports headset, having defined the gold standard for competitive gaming audio for over a decade. Built on a foundation of legendary reliability and neutral tuning, the Cloud II delivers exceptional clarity and consistency that has made it the choice of tier-1 pros across Counter-Strike, Valorant, and other tactical shooters. The 53mm drivers and memory-foam ear cushions provide all-day comfort at LANs, while the detachable microphone ensures clear communication in team scenarios. Its wired connection guarantees zero latency, and the legendary build quality means headsets from 2014 are still being used competitively in 2025. A cultural icon in esports peripherals.",
    highlights: ["most legendary esports headset in history", "53mm drivers with legendary clarity", "used competitively since 2014"]
  },
  "Razer BlackShark V3 Pro": {
    text: "The Razer BlackShark V3 Pro takes the legacy of the V2 Pro and refines every element for next-generation esports competition. With improved driver technology and enhanced surround sound algorithms, the V3 Pro delivers even sharper directional audio with minimized latency. The hypersonic technology provides more nuanced haptic feedback, and the improved active noise cancellation technology better isolates competitive audio cues from environmental noise. At 285g, it's slightly lighter than its predecessor while maintaining superior build quality. Tournament organizers have increasingly featured BlackShark V3 Pro at major LANs, and pro adoption continues to grow as players discover the generational leap in spatial audio precision.",
    highlights: ["refined next-generation audio technology", "enhanced surround sound algorithms", "improved active noise cancellation"]
  },
  "Logitech G Pro X Headset": {
    text: "The Logitech G Pro X Headset represents Logitech's flagship push into esports audio with PRO-Grade 50mm drivers and a modular ear cup system. The unique swappable ear pads allow players to customize sound signature—choosing between competing-focused sound or comfort-focused tuning depending on the game and environment. The Blue VO!CE microphone technology provides industry-leading mic clarity, essential for competitive team communications. At 320g, it carries more weight than competitors but translates that into premium materials and superior driver engineering. Twenty-one pro players rely on the G Pro X, appreciating Logitech's deep esports ecosystem integration.",
    highlights: ["PRO-Grade 50mm drivers", "modular swappable ear cup system", "Blue VO!CE microphone clarity"]
  },
  "HyperX Cloud III": {
    text: "The HyperX Cloud III is the modern successor to the legendary Cloud II, delivering the same neutral tuning philosophy that made its predecessor iconic while incorporating contemporary driver technology and wireless capabilities. The latest variant features improved 53mm drivers with extended frequency response for better detail retrieval in competitive soundscapes. The wireless transmission is tournament-proven stable, and the battery lasts a full LAN day on a single charge. HyperX's commitment to consistency means the Cloud III maintains the tonal character that Cloud II users know and love, making the transition seamless for veteran esports players. A natural evolution of an enduring legend.",
    highlights: ["modern successor to legendary Cloud II", "improved 53mm drivers with extended frequency", "tournament-proven wireless stability"]
  },
  "beyerdynamic DT 990 Pro": {
    text: "The beyerdynamic DT 990 Pro is a professional studio headphone that has found a cult following in esports due to its exceptional clarity and revealing nature. The 250g construction and open-back design create an incredibly spacious soundstage—perfect for competitive players who demand maximum positional accuracy. The 250-ohm impedance variant (beloved by pros) requires a quality amplifier but rewards with audiophile-grade detail retrieval that reveals subtle competitive audio cues other headphones miss. Seven pro players have adopted the DT 990 Pro, typically those from regions with deep hi-fi cultures where professional audio equipment is the norm.",
    highlights: ["open-back design for spacious soundstage", "exceptional clarity and detail retrieval", "250-ohm variant reveals subtle audio cues"]
  },
  "Logitech G PRO X 2": {
    text: "The Logitech G PRO X 2 Headset is Logitech's refined flagship that incorporates three years of pro feedback from the original G PRO X. The new PRO-Grade 50mm drivers feature improved transient response for snappier impact sounds, and the redesigned headband distributes weight more evenly across the head for improved comfort during marathon gaming sessions. The LIGHTSPEED wireless protocol offers tournament-legal 2.4GHz connectivity, and the battery now lasts 30 hours—essential for competitive bootcamp preparation. Logitech's updated BLUE VO!CE software provides real-time voice enhancement, and the improved surround sound implementation offers better directional accuracy.",
    highlights: ["refined PRO-Grade 50mm drivers", "improved transient response", "30-hour battery for bootcamp prep"]
  },
  "Razer BlackShark V2": {
    text: "The Razer BlackShark V2 is the wired-only original that established Razer's competitive audio dominance before the wireless Pro variant emerged. Using THX-certified 50mm drivers, the V2 delivers the same legendary clarity that the Pro version offers but in an entirely wired configuration. The zero-latency guarantee and simplified setup made it the go-to choice for tournament installations before the Pro model's wireless option proved viable. Six pro players still use the BlackShark V2, particularly in regions where tournament infrastructure remains strictly wired and reliability is paramount.",
    highlights: ["THX-certified 50mm drivers", "zero-latency wired configuration", "legendary tournament reliability"]
  },
  "HyperX Cloud Alpha S": {
    text: "The HyperX Cloud Alpha S builds on the Alpha line's reputation for dependable, balanced sound with dual-chamber driver technology for improved bass separation without sacrificing directional accuracy. The improved 50mm drivers and updated ear cushion materials enhance all-day comfort, and the longer 2-meter cable (with 3.5mm option) accommodates varied tournament setups. At 310g, it maintains the legendary durability HyperX is known for, and the modular microphone remains industry-standard for clarity. Five pro players have adopted the Alpha S variant, appreciating the subtle improvements over the standard Alpha.",
    highlights: ["dual-chamber driver technology", "improved 50mm drivers", "legendary durability and consistency"]
  },
  "beyerdynamic MMX 300": {
    text: "The beyerdynamic MMX 300 is a hybrid audio/gaming headset from beyerdynamic that combines professional studio-grade driver technology with an integrated gaming microphone. The closed-back 40-ohm design provides better isolation than open-back alternatives, and the 350g weight reflects premium construction using materials used in professional studios. The integrated cardioid microphone offers exceptional noise rejection for team communications, and the sealed design prevents audio leakage in shared LAN environments. Four pro players rely on the MMX 300, primarily those who stream or participate in mixed audio environments.",
    highlights: ["professional studio-grade drivers", "integrated cardioid microphone", "sealed design for noise isolation"]
  },
  "ASUS ROG Delta II": {
    text: "The ASUS ROG Delta II represents ASUS' entry into flagship esports audio with quad-DAC technology and an ambitious driver array. The 50mm driver array delivers detailed soundstage information with particular emphasis on high-frequency precision for competitive advantage. The USB-C DAC provides built-in audio enhancement for gaming specifically, and the modular design allows ear cup customization. Three pro players use the Delta II, appreciating ASUS' integration with gaming PC ecosystems and the premium audio technology.",
    highlights: ["quad-DAC technology", "50mm driver array", "built-in audio enhancement for gaming"]
  },
  "Logitech G733": {
    text: "The Logitech G733 LIGHTSPEED is Logitech's wireless-first esports headset designed for the modern streaming and content creation era. At just 320g despite wireless capabilities, the G733 offers excellent comfort for extended broadcast sessions. The LIGHTSPEED 2.4GHz protocol provides sub-1ms latency suitable for competitive play, and the 29-hour battery lasts through entire tournament days. Three pro players rely on G733, primarily those balancing competitive play with content creation where wireless freedom is essential.",
    highlights: ["LIGHTSPEED wireless with sub-1ms latency", "just 320g despite wireless", "29-hour battery for tournament endurance"]
  },
  "Sennheiser GAME ONE": {
    text: "The Sennheiser GAME ONE is Sennheiser's gaming-focused variant of their professional studio headphones, combining legendary European audio engineering with gaming-specific tuning. The open-back design provides exceptional soundstage width, and the 310g weight with generous headband padding enables marathon competitive sessions. The integrated microphone uses Sennheiser's professional audio quality standards for crystal-clear team communications. Two pro players use the GAME ONE, appreciating Sennheiser's heritage in professional audio and the distinctive open-back soundstage that differentiates it from closed-back competitors.",
    highlights: ["Sennheiser professional audio engineering", "open-back design for soundstage", "professional-grade microphone clarity"]
  },
  "Corsair HS80": {
    text: "The Corsair HS80 is Corsair's premium wired esports headset featuring 50mm neodymium drivers and custom audio tuning for gaming. The 340g build uses premium materials and the dynamic transducer provides clear impact sound for competitive advantage. The VOID microphone technology offers advanced noise suppression for team communications, and the reinforced headband provides tournament-level durability. Two pro players use the HS80, valuing Corsair's reputation for peripheral quality and the reliable audio signature.",
    highlights: ["50mm neodymium drivers", "dynamic transducer for impact clarity", "VOID microphone with noise suppression"]
  },
  "SteelSeries Arctis Nova Pro": {
    text: "The SteelSeries Arctis Nova Pro combines SteelSeries' legendary Arctis line with next-generation features including a removable mic unit and independent 2.4GHz wireless. The Nova drivers represent SteelSeries' most advanced audio technology, and the parametric EQ allows players to fine-tune sound signature for specific game audio profiles. The 330g weight and premium build quality reflect SteelSeries' tournament heritage, and pro adoption continues to grow as players discover the customization possibilities.",
    highlights: ["next-generation Nova drivers", "parametric EQ for tuning", "removable mic unit and independent wireless"]
  },
  "SteelSeries Arctis 7": {
    text: "The SteelSeries Arctis 7 is the wired-or-wireless flexible solution from SteelSeries' Arctis line that appeals to players who value versatility. The 340g build and legendary Arctis comfort band remain consistent with the line, while the dual-connection capability allows switching between wired and wireless configurations seamlessly. One pro player relies on the Arctis 7, appreciating the flexibility for both competitive play and content creation.",
    highlights: ["dual-connection wired and wireless", "legendary Arctis comfort band", "seamless configuration switching"]
  },
  "SteelSeries Arctis Pro Wireless": {
    text: "The SteelSeries Arctis Pro Wireless is the flagship wireless solution from SteelSeries, featuring the legendary Arctis design with their most advanced wireless technology. The 360g weight reflects premium construction, and the independent 2.4GHz wireless protocol provides zero-latency transmission. The dual-mic system offers flexibility for both competitive and broadcast applications, and the parametric EQ allows complete sound signature customization. One pro player uses the Arctis Pro Wireless, valuing SteelSeries' tournament heritage and advanced wireless technology.",
    highlights: ["flagship wireless technology", "parametric EQ for tuning", "dual-mic system for flexibility"]
  },
  "Sony INZONE H9": {
    text: "The Sony INZONE H9 represents Sony's first major push into dedicated gaming audio with premium hardware and spatial audio processing. The 325g build uses advanced noise cancellation technology and Sony's signature sound signature tuning. The active noise cancellation is particularly effective for isolating competitive audio cues, and the LDAC audio codec provides premium audio quality. One pro player uses the INZONE H9, appreciating Sony's audio engineering heritage and the advanced noise cancellation.",
    highlights: ["Sony's first dedicated gaming headset", "advanced noise cancellation", "LDAC audio codec for quality"]
  },
  "Corsair Virtuoso RGB XT": {
    text: "The Corsair Virtuoso RGB XT is Corsair's wireless esports headset with integrated RGB lighting and premium audio engineering. The 350g build features 50mm drivers and custom gaming tuning, while the SLIPSTREAM wireless protocol offers 2.4GHz connectivity. The RGB lighting integrates with Corsair's ecosystem, and the modular design allows customization. Pro adoption is growing as players recognize the audio quality and the tournament viability of Corsair's wireless implementation.",
    highlights: ["SLIPSTREAM wireless protocol", "integrated RGB ecosystem", "50mm drivers with gaming tuning"]
  },
  "Logitech G435": {
    text: "The Logitech G435 LIGHTSPEED is Logitech's ultra-lightweight gaming headset at just 165g—the lightest on the market. Designed for maximum portability and competitive agility, the G435 sacrifices nothing in audio quality despite the minimal weight. The LIGHTSPEED wireless provides zero-latency connectivity, and the 30-hour battery lasts full tournament runs. The simplicity and lightness appeal to players who value minimal head fatigue and maximum mobility.",
    highlights: ["lightest gaming headset at 165g", "LIGHTSPEED wireless zero-latency", "30-hour battery for tournaments"]
  },
};


export const TEAM_DESCRIPTIONS = {
  "BC.Game": "BC.Game sponsors top-tier CS2 esports talent with championship-caliber rosters.",
  "Team Vitality": "Team Vitality is Europe's premier CS2 organization with legendary rosters and international championship success.",
  "Falcons Esports": "Falcons Esports represents the modern esports frontier with championship-caliber rosters and significant investment in player development.",
  "T1": "T1 is the most decorated League of Legends organization in history, winning six World Championships.",
  "Sentinels": "The Sentinels are one of Valorant's most dominant organizations with sponsored players using premium equipment.",
  "LOUD": "LOUD is Brazil's most prestigious esports organization, dominating Valorant's Americas region.",
  "Gen.G": "Gen.G is the global esports powerhouse with championship rosters across multiple regions and titles.",
  "Fnatic": "Fnatic is one of esports' most storied organizations with championship legacy across multiple titles.",
  "Edward Gaming": "Edward Gaming is China's dominant esports organization with consistent international success.",
  "Evil Geniuses": "Evil Geniuses is one of esports' legendary brands with iconic rosters and championship heritage.",
};


export const PLAYER_IMAGES = {
  "s1mple": "https://pbs.twimg.com/profile_images/1234567890/s1mple_400x400.jpg",
  "ZywOo": "https://pbs.twimg.com/profile_images/1234567891/zywoo_400x400.jpg",
  "NiKo": "https://pbs.twimg.com/profile_images/1234567892/niko_400x400.jpg",
  "Faker": "https://pbs.twimg.com/profile_images/1234567893/faker_400x400.jpg",
  "TenZ": "https://pbs.twimg.com/profile_images/1234567894/tenz_400x400.jpg",
  "aspas": "https://pbs.twimg.com/profile_images/1234567895/aspas_400x400.jpg",
  "Derke": "https://pbs.twimg.com/profile_images/1234567896/derke_400x400.jpg",
  "Bugha": "https://pbs.twimg.com/profile_images/1234567897/bugha_400x400.jpg",
  "ImperialHal": "https://pbs.twimg.com/profile_images/1234567898/imperialhal_400x400.jpg",
  "ShowMaker": "https://pbs.twimg.com/profile_images/1234567899/showmaker_400x400.jpg",
};


export const TEAM_LOGOS = {
  "BC.Game": "https://pbs.twimg.com/profile_images/1234567800/bcgame_400x400.png",
  "Team Vitality": "https://pbs.twimg.com/profile_images/1234567801/vitality_400x400.png",
  "Falcons Esports": "https://pbs.twimg.com/profile_images/1234567802/falcons_400x400.png",
  "T1": "https://pbs.twimg.com/profile_images/1234567803/t1_400x400.png",
  "Sentinels": "https://pbs.twimg.com/profile_images/1234567804/sentinels_400x400.png",
  "LOUD": "https://pbs.twimg.com/profile_images/1234567805/loud_400x400.png",
  "Gen.G": "https://pbs.twimg.com/profile_images/1234567806/geng_400x400.png",
  "Edward Gaming": "https://pbs.twimg.com/profile_images/1234567807/edg_400x400.png",
};


export const BRAND_IMAGE_URLS = {
  "Razer": "https://m.media-amazon.com/images/I/41-3jdO1oCL._AC_.png",
  "HyperX": "https://m.media-amazon.com/images/I/41y3AKxERjL._AC_.png",
  "Logitech": "https://m.media-amazon.com/images/I/315rwvQwSEL._AC_.png",
  "SteelSeries": "https://m.media-amazon.com/images/I/41YVSdEDhML._AC_.png",
  "Corsair": "https://m.media-amazon.com/images/I/41TqWL-TYIL._AC_.png",
  "beyerdynamic": "https://m.media-amazon.com/images/I/41r2VIFLzEL._AC_.png",
};


export const GAME_IMAGE_URLS = {
  "CS2": "https://m.media-amazon.com/images/I/51K1l8dNCdL._AC_.png",
  "Valorant": "https://m.media-amazon.com/images/I/51UknbgBkML._AC_.png",
  "LoL": "https://m.media-amazon.com/images/I/51q4C6rqzvL._AC_.png",
  "Fortnite": "https://m.media-amazon.com/images/I/51-0rCpVvJL._AC_.png",
  "Apex": "https://m.media-amazon.com/images/I/41cG5xZqNJL._AC_.png",
};


export const GAME_DESCRIPTIONS = {
  "CS2": "Counter-Strike 2 is the dominant competitive FPS where directional audio and positional accuracy are paramount to pro success.",
  "Valorant": "Valorant is Riot's tactical 5v5 shooter with emphasis on economy and strategy, where communication and audio clarity are essential.",
  "LoL": "League of Legends is Riot's flagship MOBA and the world's most-played competitive esport with massive player base.",
  "Fortnite": "Fortnite represents battle royale esports with unique building mechanics and unpredictable match dynamics.",
  "Apex": "Apex Legends is Respawn's squad-based battle royale with legends meta and team-coordinated gameplay.",
};


// ═══════════ CUSTOM SVG ICONS ═══════════
export const I = {
  headphone: (s=20) => { const uid = "em" + Math.random().toString(36).slice(2,8); return <svg width={s} height={s} viewBox="0 0 200 200" fill="none"><defs><linearGradient id={`${uid}a`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#b8956a"/><stop offset="100%" stopColor="#8a7460"/></linearGradient><linearGradient id={`${uid}b`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#b8956a" stopOpacity="0.12"/><stop offset="100%" stopColor="#8a7460" stopOpacity="0.06"/></linearGradient></defs><path d="M100 30c-38.66 0-70 31.34-70 70v30c0 11 9 20 20 20h10c5.5 0 10-4.5 10-10v-40c0-5.5-4.5-10-10-10H50v-10c0-27.6 22.4-50 50-50s50 22.4 50 50v10h-10c-5.5 0-10 4.5-10 10v40c0 5.5 4.5 10 10 10h10c11 0 20-9 20-20v-30c0-38.66-31.34-70-70-70z" fill={`url(#${uid}b)`} stroke={`url(#${uid}a)`} strokeWidth="6"/></svg>; },
  trophy: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M8 21h8M12 17v4M17 4V2H7v2" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/><path d="M7 4h10v4a5 5 0 01-10 0V4z" fill="url(#tg1)"/><path d="M17 5h2a2 2 0 012 2v1a3 3 0 01-3 3h-1M7 5H5a2 2 0 00-2 2v1a3 3 0 003 3h1" stroke="#b8956a" strokeWidth="1.5"/><defs><linearGradient id="tg1" x1="7" y1="4" x2="17" y2="12"><stop stopColor="#d4b896"/><stop offset="1" stopColor="#b8956a"/></linearGradient></defs></svg>,
  bolt: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2z" fill="url(#bg1)" stroke="#facc15" strokeWidth="1" strokeLinejoin="round"/><defs><linearGradient id="bg1" x1="4" y1="2" x2="20" y2="22"><stop stopColor="#d4b896"/><stop offset=".5" stopColor="#b8956a"/><stop offset="1" stopColor="#8a7460"/></linearGradient></defs></svg>,
  crosshair: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="url(#cg1)" strokeWidth="2"/><circle cx="12" cy="12" r="3" fill="url(#cg1)" opacity=".6"/><line x1="12" y1="2" x2="12" y2="6" stroke="#c44040" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="18" x2="12" y2="22" stroke="#c44040" strokeWidth="2" strokeLinecap="round"/><line x1="2" y1="12" x2="6" y2="12" stroke="#c44040" strokeWidth="2" strokeLinecap="round"/><line x1="18" y1="12" x2="22" y2="12" stroke="#c44040" strokeWidth="2" strokeLinecap="round"/><defs><linearGradient id="cg1" x1="4" y1="4" x2="20" y2="20"><stop stopColor="#c47373"/><stop offset="1" stopColor="#a04040"/></linearGradient></defs></svg>,
  chart: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="12" width="4" height="9" rx="1" fill="#3b82f6"/><rect x="10" y="7" width="4" height="14" rx="1" fill="#8b5cf6"/><rect x="17" y="3" width="4" height="18" rx="1" fill="#ec4899"/></svg>,
  star: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2l2.9 6.26L22 9.27l-5 5.14L18.18 22 12 18.27 5.82 22 7 14.41 2 9.27l7.1-1.01L12 2z" fill="url(#sg1)" stroke="#b8956a" strokeWidth=".5"/><defs><linearGradient id="sg1" x1="2" y1="2" x2="22" y2="22"><stop stopColor="#d4b896"/><stop offset=".5" stopColor="#b8956a"/><stop offset="1" stopColor="#d97706"/></linearGradient></defs></svg>,
  cart: (s=20, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke={c || "url(#ctg1)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="21" r="1.5" fill={c || "#34d399"}/><circle cx="20" cy="21" r="1.5" fill={c || "#34d399"}/>{!c && <defs><linearGradient id="ctg1" x1="1" y1="1" x2="23" y2="21"><stop stopColor="#34d399"/><stop offset="1" stopColor="#0890a8"/></linearGradient></defs>}</svg>,
  crown: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M2 8l4 12h12l4-12-5 4-5-8-5 8-5-4z" fill="url(#crg1)" stroke="#fbbf24" strokeWidth="1"/><circle cx="12" cy="4" r="1.5" fill="#fbbf24"/><circle cx="2" cy="8" r="1.5" fill="#b8956a"/><circle cx="22" cy="8" r="1.5" fill="#b8956a"/><defs><linearGradient id="crg1" x1="2" y1="4" x2="22" y2="20"><stop stopColor="#d4b896"/><stop offset="1" stopColor="#b8956a"/></linearGradient></defs></svg>,
  gamepad: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M6 11h4M8 9v4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/><circle cx="15" cy="10" r="1" fill="#f472b6"/><circle cx="17" cy="12" r="1" fill="#34d399"/><rect x="3" y="7" width="18" height="12" rx="4" stroke="#a78bfa" strokeWidth="1.5"/><path d="M7 19l-1.5 2M17 19l1.5 2" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  trending: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" stroke="url(#trg1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="17,6 23,6 23,12" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="trg1" x1="1" y1="18" x2="23" y2="6"><stop stopColor="#0890a8"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs></svg>,
  signal: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12.55a11 11 0 0114.08 0" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round"/><path d="M1.42 9a16 16 0 0121.16 0" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/><path d="M8.53 16.11a6 6 0 016.95 0" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="20" r="1.5" fill="#06b6d4"/></svg>,
  gear: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="url(#geg1)" strokeWidth="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="url(#geg1)" strokeWidth="2" strokeLinecap="round"/><defs><linearGradient id="geg1" x1="1" y1="1" x2="23" y2="23"><stop stopColor="#c4508a"/><stop offset="1" stopColor="#8060c4"/></linearGradient></defs></svg>,
  refresh: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M23 4v6h-6" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 20v-6h6" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="url(#rfg1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="rfg1" x1="1" y1="9" x2="23" y2="15"><stop stopColor="#0890a8"/><stop offset="1" stopColor="#8b5cf6"/></linearGradient></defs></svg>,
  lab: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M9 3h6M10 3v7.4L4.2 19.11A1.5 1.5 0 005.46 21h13.08a1.5 1.5 0 001.26-1.89L14 10.4V3" stroke="url(#lbg1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 15h10" stroke="#a78bfa" strokeWidth="1.5" opacity=".5"/><circle cx="10" cy="17" r="1" fill="#f472b6"/><circle cx="14" cy="17" r="1" fill="#06b6d4"/><defs><linearGradient id="lbg1" x1="4" y1="3" x2="20" y2="21"><stop stopColor="#0890a8"/><stop offset=".5" stopColor="#8060c4"/><stop offset="1" stopColor="#c4508a"/></linearGradient></defs></svg>,
  user: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="url(#usg1)" strokeWidth="2"/><path d="M20 21a8 8 0 10-16 0" stroke="url(#usg1)" strokeWidth="2" strokeLinecap="round"/><defs><linearGradient id="usg1" x1="4" y1="4" x2="20" y2="21"><stop stopColor="#60a5fa"/><stop offset="1" stopColor="#8060c4"/></linearGradient></defs></svg>,
  globe: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="url(#glg1)" strokeWidth="2"/><ellipse cx="12" cy="12" rx="4" ry="10" stroke="url(#glg1)" strokeWidth="1.5"/><line x1="2" y1="12" x2="22" y2="12" stroke="url(#glg1)" strokeWidth="1.5"/><defs><linearGradient id="glg1" x1="2" y1="2" x2="22" y2="22"><stop stopColor="#34d399"/><stop offset=".5" stopColor="#0890a8"/><stop offset="1" stopColor="#3b82f6"/></linearGradient></defs></svg>,
  medal: (c, s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="15" r="6" fill={c} opacity=".2" stroke={c} strokeWidth="2"/><path d="M9 2h6l-1.5 6h-3L9 2z" fill={c} opacity=".5"/><text x="12" y="18" textAnchor="middle" fill={c} fontSize="8" fontWeight="bold">{c==="#fbbf24"?"1":c==="#94a3b8"?"2":"3"}</text></svg>,
  fire: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2c.5 4-3 6-3 10a6 6 0 0012 0c0-4-3.5-7-4-10-1 3-3 4-5 0z" fill="url(#firg1)" stroke="#c44040" strokeWidth="1"/><defs><linearGradient id="firg1" x1="9" y1="2" x2="15" y2="22"><stop stopColor="#d4b896"/><stop offset=".4" stopColor="#fb923c"/><stop offset="1" stopColor="#ef4444"/></linearGradient></defs></svg>,
  viper: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M4 8c0 0 2-4 8-4s8 4 8 4" stroke="#b8956a" strokeWidth="2" strokeLinecap="round"/><path d="M12 4v5" stroke="#b8956a" strokeWidth="2"/><path d="M10 9l2 4 2-4" stroke="#b8956a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 12c-2 3-2 6 0 8 1 1 3 2 6 2s5-1 6-2c2-2 2-5 0-8" stroke="url(#vpg1)" strokeWidth="2"/><defs><linearGradient id="vpg1" x1="4" y1="12" x2="20" y2="22"><stop stopColor="#b8956a"/><stop offset="1" stopColor="#059669"/></linearGradient></defs></svg>,
  skull: (s=20, c="#b8956a") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="10" r="8" stroke={c} strokeWidth="2"/><circle cx="9" cy="9" r="2" fill={c} opacity=".6"/><circle cx="15" cy="9" r="2" fill={c} opacity=".6"/><path d="M9 16h6" stroke={c} strokeWidth="1.5"/><path d="M10 16v3M12 16v3M14 16v3" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  fang: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2C6.5 2 2 6 2 11c0 3 1.5 5.5 4 7v4l3-2.5c1 .3 2 .5 3 .5s2-.2 3-.5l3 2.5v-4c2.5-1.5 4-4 4-7 0-5-4.5-9-10-9z" fill="url(#fng1)" stroke="#d4af37" strokeWidth="1.5"/><circle cx="8.5" cy="10" r="2" fill="#fff" opacity=".8"/><circle cx="15.5" cy="10" r="2" fill="#fff" opacity=".8"/><circle cx="8.5" cy="10" r="1" fill="#1a1a2e"/><circle cx="15.5" cy="10" r="1" fill="#1a1a2e"/><defs><linearGradient id="fng1" x1="2" y1="2" x2="22" y2="22"><stop stopColor="#d4b896"/><stop offset="1" stopColor="#d4af37"/></linearGradient></defs></svg>,
  moon: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="url(#mng1)" stroke="#c084fc" strokeWidth="1.5"/><circle cx="10" cy="8" r="1" fill="#e9d5ff" opacity=".5"/><circle cx="14" cy="14" r="1.5" fill="#e9d5ff" opacity=".4"/><defs><linearGradient id="mng1" x1="8" y1="3" x2="21" y2="21"><stop stopColor="#e9d5ff"/><stop offset="1" stopColor="#a855f7"/></linearGradient></defs></svg>,
  wave: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M2 12c2-3 4-4 6-2s4 1 6-2 4-1 6 2" stroke="url(#wvg1)" strokeWidth="2.5" strokeLinecap="round"/><path d="M2 17c2-3 4-4 6-2s4 1 6-2 4-1 6 2" stroke="url(#wvg1)" strokeWidth="2" strokeLinecap="round" opacity=".5"/><path d="M2 7c2-3 4-4 6-2s4 1 6-2 4-1 6 2" stroke="url(#wvg1)" strokeWidth="2" strokeLinecap="round" opacity=".3"/><defs><linearGradient id="wvg1" x1="2" y1="7" x2="22" y2="17"><stop stopColor="#c084fc"/><stop offset="1" stopColor="#6366f1"/></linearGradient></defs></svg>,
  pulse: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="url(#plg1)"/><circle cx="12" cy="12" r="6" stroke="#f472b6" strokeWidth="1.5" opacity=".5"/><circle cx="12" cy="12" r="9" stroke="#f472b6" strokeWidth="1" opacity=".3"/><path d="M2 12h4l2-5 2 10 2-7 2 4h6" stroke="url(#plg1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="plg1" x1="2" y1="7" x2="22" y2="17"><stop stopColor="#c4508a"/><stop offset="1" stopColor="#ec4899"/></linearGradient></defs></svg>,
  wing: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M2 12c3-8 10-10 14-8-2 1-6 4-6 8h12c-4 6-10 8-14 8-4 0-8-2-6-8z" fill="url(#wng1)" stroke="#ff8c00" strokeWidth="1"/><defs><linearGradient id="wng1" x1="2" y1="4" x2="22" y2="20"><stop stopColor="#d4b896"/><stop offset=".5" stopColor="#fb923c"/><stop offset="1" stopColor="#ff8c00"/></linearGradient></defs></svg>,
  rdot: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="url(#rdg1)" opacity=".2"/><circle cx="12" cy="12" r="5" fill="url(#rdg1)"/><circle cx="12" cy="12" r="8" stroke="url(#rdg1)" strokeWidth="2"/><defs><linearGradient id="rdg1" x1="4" y1="4" x2="20" y2="20"><stop stopColor="#ff5555"/><stop offset="1" stopColor="#a04040"/></linearGradient></defs></svg>,
  dragon: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2L8 8l-6 2 4 5-2 7 8-3 8 3-2-7 4-5-6-2-4-6z" fill="url(#drg1)" stroke="#b8956a" strokeWidth="1"/><circle cx="10" cy="10" r="1" fill="#fef3c7"/><circle cx="14" cy="10" r="1" fill="#fef3c7"/><defs><linearGradient id="drg1" x1="2" y1="2" x2="22" y2="22"><stop stopColor="#d4b896"/><stop offset=".5" stopColor="#b8956a"/><stop offset="1" stopColor="#a04040"/></linearGradient></defs></svg>,
  wolf: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M4 4l4 8-6 8h8l2-4 2 4h8l-6-8 4-8-6 4-4-4-4 4-6-4z" fill="url(#wfg1)" stroke="#a78bfa" strokeWidth="1"/><circle cx="10" cy="12" r="1" fill="#fff"/><circle cx="14" cy="12" r="1" fill="#fff"/><defs><linearGradient id="wfg1" x1="2" y1="4" x2="22" y2="20"><stop stopColor="#c4b5fd"/><stop offset="1" stopColor="#7c3aed"/></linearGradient></defs></svg>,
  wind: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M9.59 4.59A2 2 0 1111 8H2" stroke="#ffd700" strokeWidth="2" strokeLinecap="round"/><path d="M12.59 19.41A2 2 0 1014 16H2" stroke="#b8956a" strokeWidth="2" strokeLinecap="round"/><path d="M17.73 7.73A2.5 2.5 0 1119.5 12H2" stroke="url(#wdg1)" strokeWidth="2" strokeLinecap="round"/><defs><linearGradient id="wdg1" x1="2" y1="10" x2="20" y2="10"><stop stopColor="#ffd700"/><stop offset="1" stopColor="#b8956a"/></linearGradient></defs></svg>,
  anchor: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="3" stroke="#ffd700" strokeWidth="2"/><line x1="12" y1="8" x2="12" y2="21" stroke="#ffd700" strokeWidth="2"/><path d="M5 12H2a10 10 0 0020 0h-3" stroke="url(#acg1)" strokeWidth="2" strokeLinecap="round"/><defs><linearGradient id="acg1" x1="2" y1="12" x2="22" y2="21"><stop stopColor="#ffd700"/><stop offset="1" stopColor="#b8956a"/></linearGradient></defs></svg>,
  ninja: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" fill="url(#njg1)" stroke="#10b981" strokeWidth="1"/><circle cx="12" cy="12" r="2" fill="#064e3b"/><defs><linearGradient id="njg1" x1="2" y1="2" x2="22" y2="22"><stop stopColor="#6ee7b7"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs></svg>,
  shield: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.25 3.83 10.07 9 11.25C17.17 22.07 21 17.25 21 12V7L12 2z" fill="url(#shg1)" stroke="#e11d48" strokeWidth="1.5"/><path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="shg1" x1="3" y1="2" x2="21" y2="23"><stop stopColor="#fb7185"/><stop offset="1" stopColor="#e11d48"/></linearGradient></defs></svg>,
};

export const icon = (key, size) => {
  const map = { headphone: I.headphone, trophy: I.trophy, bolt: I.bolt, crosshair: I.crosshair, chart: I.chart, star: I.star, cart: I.cart, crown: I.crown, gamepad: I.gamepad, trending: I.trending, signal: I.signal, gear: I.gear, refresh: I.refresh, lab: I.lab, user: I.user, globe: I.globe, fire: I.fire, viper: I.viper, skull: I.skull, skullr: (s) => I.skull(s, "#ef4444"), fang: I.fang, moon: I.moon, wave: I.wave, pulse: I.pulse, wing: I.wing, rdot: I.rdot, dragon: I.dragon, wolf: I.wolf, wind: I.wind, anchor: I.anchor, ninja: I.ninja, shield: I.shield };
  const fn = map[key];
  return fn ? fn(size || 20) : key;
};


export const headphones = [
  { id: 1, name: "Razer BlackShark V2 Pro", brand: "Razer", weight: 280, driverType: "50mm Dynamic", impedance: 32, anc: true, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Memory Foam", detachableCable: true, cable: "USB-C (Wireless)", connectivity: "Wireless", releaseYear: 2021, planarMagnetic: false, wirelessCharging: true, price: 180, proUsage: 28.0, rating: 9.7, image: "viper", color: "#2a8a40" },
  { id: 2, name: "HyperX Cloud II", brand: "HyperX", weight: 290, driverType: "53mm Dynamic", impedance: 64, anc: false, frequencyResponse: 15, formFactor: "Over-ear", earPadMaterial: "Memory Foam", detachableCable: true, cable: "3.5mm Jack", connectivity: "Wired", releaseYear: 2015, planarMagnetic: false, wirelessCharging: false, price: 100, proUsage: 34.0, rating: 9.5, image: "bolt", color: "#c43800" },
  { id: 3, name: "Razer BlackShark V3 Pro", brand: "Razer", weight: 285, driverType: "50mm Dynamic", impedance: 32, anc: true, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Memory Foam", detachableCable: true, cable: "USB-C (Wireless)", connectivity: "Wireless", releaseYear: 2023, planarMagnetic: false, wirelessCharging: true, price: 200, proUsage: 5.2, rating: 9.8, image: "viper", color: "#2a8a40" },
  { id: 4, name: "Logitech G Pro X Headset", brand: "Logitech", weight: 320, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Velour", detachableCable: true, cable: "USB-C", connectivity: "Wired", releaseYear: 2020, planarMagnetic: false, wirelessCharging: false, price: 130, proUsage: 21.0, rating: 9.4, image: "crosshair", color: "#2874a6" },
  { id: 5, name: "HyperX Cloud III", brand: "HyperX", weight: 300, driverType: "53mm Dynamic", impedance: 64, anc: false, frequencyResponse: 15, formFactor: "Over-ear", earPadMaterial: "Memory Foam", detachableCable: true, cable: "3.5mm Jack", connectivity: "Wired", releaseYear: 2023, planarMagnetic: false, wirelessCharging: false, price: 130, proUsage: 1.6, rating: 9.6, image: "bolt", color: "#c43800" },
  { id: 6, name: "beyerdynamic DT 990 Pro", brand: "beyerdynamic", weight: 250, driverType: "40mm Dynamic", impedance: 250, anc: false, frequencyResponse: 5, formFactor: "Over-ear", earPadMaterial: "Velour", detachableCable: true, cable: "6.35mm Jack", connectivity: "Wired", releaseYear: 2005, planarMagnetic: false, wirelessCharging: false, price: 150, proUsage: 0.7, rating: 9.2, image: "wing", color: "#8b0000" },
  { id: 7, name: "Logitech G PRO X 2 Headset", brand: "Logitech", weight: 310, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Velour", detachableCable: true, cable: "USB-C (Wireless)", connectivity: "Wireless", releaseYear: 2023, planarMagnetic: false, wirelessCharging: false, price: 150, proUsage: 0.9, rating: 9.5, image: "crosshair", color: "#2874a6" },
  { id: 8, name: "Razer BlackShark V2", brand: "Razer", weight: 280, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Memory Foam", detachableCable: true, cable: "3.5mm Jack", connectivity: "Wired", releaseYear: 2019, planarMagnetic: false, wirelessCharging: false, price: 130, proUsage: 0.6, rating: 9.3, image: "viper", color: "#2a8a40" },
  { id: 9, name: "HyperX Cloud Alpha S", brand: "HyperX", weight: 310, driverType: "50mm Dynamic", impedance: 64, anc: false, frequencyResponse: 15, formFactor: "Over-ear", earPadMaterial: "Memory Foam", detachableCable: true, cable: "3.5mm Jack", connectivity: "Wired", releaseYear: 2019, planarMagnetic: false, wirelessCharging: false, price: 130, proUsage: 0.5, rating: 9.1, image: "bolt", color: "#c43800" },
  { id: 10, name: "beyerdynamic MMX 300", brand: "beyerdynamic", weight: 350, driverType: "40mm Dynamic", impedance: 32, anc: false, frequencyResponse: 5, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: true, cable: "6.35mm Jack", connectivity: "Wired", releaseYear: 2018, planarMagnetic: false, wirelessCharging: false, price: 280, proUsage: 0.4, rating: 9.4, image: "wing", color: "#8b0000" },
  { id: 11, name: "ASUS ROG Delta II", brand: "ASUS", weight: 330, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: true, cable: "USB-C", connectivity: "Wired", releaseYear: 2022, planarMagnetic: false, wirelessCharging: false, price: 160, proUsage: 0.3, rating: 9.2, image: "wing", color: "#b01040" },
  { id: 12, name: "Logitech G733", brand: "Logitech", weight: 320, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: false, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2020, planarMagnetic: false, wirelessCharging: false, price: 150, proUsage: 0.3, rating: 8.9, image: "crosshair", color: "#2874a6" },
  { id: 13, name: "Sennheiser GAME ONE", brand: "Sennheiser", weight: 310, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 15, formFactor: "Over-ear", earPadMaterial: "Velour", detachableCable: true, cable: "3.5mm Jack", connectivity: "Wired", releaseYear: 2014, planarMagnetic: false, wirelessCharging: false, price: 140, proUsage: 0.2, rating: 8.8, image: "wing", color: "#003da5" },
  { id: 14, name: "Corsair HS80", brand: "Corsair", weight: 340, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: true, cable: "USB-C", connectivity: "Wired", releaseYear: 2021, planarMagnetic: false, wirelessCharging: false, price: 130, proUsage: 0.2, rating: 9.0, image: "wing", color: "#b8960a" },
  { id: 15, name: "SteelSeries Arctis Nova Pro", brand: "SteelSeries", weight: 330, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: false, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2022, planarMagnetic: false, wirelessCharging: false, price: 350, proUsage: 0.2, rating: 9.3, image: "wing", color: "#c47000" },
  { id: 16, name: "SteelSeries Arctis 7", brand: "SteelSeries", weight: 340, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: false, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2019, planarMagnetic: false, wirelessCharging: false, price: 180, proUsage: 0.1, rating: 9.1, image: "wing", color: "#c47000" },
  { id: 17, name: "SteelSeries Arctis Pro Wireless", brand: "SteelSeries", weight: 360, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: false, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2017, planarMagnetic: false, wirelessCharging: false, price: 330, proUsage: 0.1, rating: 9.2, image: "wing", color: "#c47000" },
  { id: 18, name: "Sony INZONE H9", brand: "Sony", weight: 325, driverType: "40mm Dynamic", impedance: 32, anc: true, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: true, cable: "USB-C (Wireless)", connectivity: "Wireless", releaseYear: 2023, planarMagnetic: false, wirelessCharging: false, price: 200, proUsage: 0.1, rating: 9.1, image: "wing", color: "#000000" },
  { id: 19, name: "Corsair HS80 MAX", brand: "Corsair", weight: 340, driverType: "50mm Dynamic", impedance: 32, anc: true, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: true, cable: "USB-C (Wireless)", connectivity: "Wireless", releaseYear: 2023, planarMagnetic: false, wirelessCharging: true, price: 200, proUsage: 0.1, rating: 9.2, image: "wing", color: "#b8960a" },
  { id: 20, name: "HyperX Cloud Flight S", brand: "HyperX", weight: 320, driverType: "53mm Dynamic", impedance: 64, anc: false, frequencyResponse: 15, formFactor: "Over-ear", earPadMaterial: "Memory Foam", detachableCable: true, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2020, planarMagnetic: false, wirelessCharging: false, price: 150, proUsage: 0.1, rating: 8.9, image: "bolt", color: "#c43800" },
  { id: 21, name: "SteelSeries Arctis Nova 7", brand: "SteelSeries", weight: 330, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: false, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2023, planarMagnetic: false, wirelessCharging: false, price: 280, proUsage: 0.0, rating: 9.2, image: "wing", color: "#c47000" },
  { id: 22, name: "Corsair Virtuoso RGB XT", brand: "Corsair", weight: 350, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: false, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2021, planarMagnetic: false, wirelessCharging: false, price: 180, proUsage: 0.0, rating: 9.0, image: "wing", color: "#b8960a" },
  { id: 23, name: "Logitech G435", brand: "Logitech", weight: 165, driverType: "40mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "On-ear", earPadMaterial: "Mesh", detachableCable: false, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2021, planarMagnetic: false, wirelessCharging: false, price: 85, proUsage: 0.0, rating: 8.4, image: "crosshair", color: "#2874a6" },
  { id: 24, name: "Razer Kraken V4", brand: "Razer", weight: 340, driverType: "50mm Dynamic", impedance: 32, anc: true, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: false, cable: "3.5mm Jack", connectivity: "Wired", releaseYear: 2023, planarMagnetic: false, wirelessCharging: false, price: 80, proUsage: 0.0, rating: 8.5, image: "viper", color: "#2a8a40" },
  { id: 25, name: "Razer Barracuda Pro", brand: "Razer", weight: 320, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Memory Foam", detachableCable: true, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2023, planarMagnetic: false, wirelessCharging: true, price: 200, proUsage: 0.0, rating: 9.0, image: "viper", color: "#2a8a40" },
  { id: 26, name: "Audeze Maxwell", brand: "Audeze", weight: 380, driverType: "Planar Magnetic", impedance: 64, anc: false, frequencyResponse: 10, formFactor: "Over-ear", earPadMaterial: "Leather", detachableCable: true, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2023, planarMagnetic: true, wirelessCharging: false, price: 300, proUsage: 0.0, rating: 9.4, image: "wing", color: "#000000" },
  { id: 27, name: "HyperX Cloud Alpha", brand: "HyperX", weight: 305, driverType: "50mm Dynamic", impedance: 64, anc: false, frequencyResponse: 15, formFactor: "Over-ear", earPadMaterial: "Memory Foam", detachableCable: true, cable: "3.5mm Jack", connectivity: "Wired", releaseYear: 2017, planarMagnetic: false, wirelessCharging: false, price: 100, proUsage: 0.0, rating: 9.0, image: "bolt", color: "#c43800" },
  { id: 28, name: "SteelSeries Arctis Nova Pro Wireless", brand: "SteelSeries", weight: 360, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: false, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2023, planarMagnetic: false, wirelessCharging: true, price: 350, proUsage: 0.0, rating: 9.4, image: "wing", color: "#c47000" },
  { id: 29, name: "beyerdynamic DT 770 Pro", brand: "beyerdynamic", weight: 280, driverType: "40mm Dynamic", impedance: 250, anc: false, frequencyResponse: 5, formFactor: "Over-ear", earPadMaterial: "Velour", detachableCable: true, cable: "6.35mm Jack", connectivity: "Wired", releaseYear: 2003, planarMagnetic: false, wirelessCharging: false, price: 180, proUsage: 0.0, rating: 9.3, image: "wing", color: "#8b0000" },
  { id: 30, name: "Sennheiser HD 560S", brand: "Sennheiser", weight: 240, driverType: "40mm Dynamic", impedance: 120, anc: false, frequencyResponse: 6, formFactor: "Over-ear", earPadMaterial: "Velour", detachableCable: true, cable: "6.35mm Jack", connectivity: "Wired", releaseYear: 2021, planarMagnetic: false, wirelessCharging: false, price: 250, proUsage: 0.0, rating: 9.2, image: "wing", color: "#003da5" },
  { id: 31, name: "ASTRO A50", brand: "ASTRO", weight: 370, driverType: "40mm Drivers", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: false, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2021, planarMagnetic: false, wirelessCharging: false, price: 300, proUsage: 0.0, rating: 9.0, image: "wing", color: "#2e8bc0" },
  { id: 32, name: "ASTRO A40 TR", brand: "ASTRO", weight: 340, driverType: "40mm Drivers", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: true, cable: "3.5mm Jack", connectivity: "Wired", releaseYear: 2018, planarMagnetic: false, wirelessCharging: false, price: 250, proUsage: 0.0, rating: 8.8, image: "wing", color: "#2e8bc0" },
  { id: 33, name: "Corsair Virtuoso SE", brand: "Corsair", weight: 330, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: false, cable: "3.5mm Jack", connectivity: "Wired", releaseYear: 2022, planarMagnetic: false, wirelessCharging: false, price: 90, proUsage: 0.0, rating: 8.7, image: "wing", color: "#b8960a" },
  { id: 34, name: "Turtle Beach Stealth 700 Gen 2", brand: "Turtle Beach", weight: 340, driverType: "50mm Drivers", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: false, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2021, planarMagnetic: false, wirelessCharging: false, price: 150, proUsage: 0.0, rating: 8.6, image: "wing", color: "#1a472a" },
  { id: 35, name: "JBL Quantum 910", brand: "JBL", weight: 380, driverType: "50mm Dynamic", impedance: 32, anc: false, frequencyResponse: 20, formFactor: "Over-ear", earPadMaterial: "Leatherette", detachableCable: false, cable: "2.4GHz Wireless", connectivity: "Wireless", releaseYear: 2021, planarMagnetic: false, wirelessCharging: false, price: 200, proUsage: 0.0, rating: 8.8, image: "wing", color: "#1d1d1b" },
];


export const proPlayers = [
  { name: "s1mple", game: "CS2", team: "BC.Game", headphone: "HyperX Cloud II", dpi: 400, sens: 3.09, edpi: 1236, role: "AWPer", country: "🇺🇦", age: 27, fullName: "Oleksandr Kostyliev",
    achievements: ["HLTV #1 Player 2018", "HLTV #1 Player 2021", "HLTV #1 Player 2022", "PGL Major Antwerp 2022 Champion", "PGL Major Antwerp 2022 MVP", "Intel Grand Slam Season 4", "BLAST Premier World Final 2021 MVP", "IEM Katowice 2020 MVP", "ESL One Cologne 2021 Champion", "20+ HLTV MVP Awards"],
    headphoneHistory: [{ headphone: "HyperX Cloud II", period: "2024-Present" }, { headphone: "Razer BlackShark V2", period: "2021-2024" }, { headphone: "Corsair HS50", period: "2019-2021" }, { headphone: "HyperX Cloud Stinger", period: "2016-2019" }] },
  { name: "ZywOo", game: "CS2", team: "Team Vitality", headphone: "Razer BlackShark V2 Pro", dpi: 400, sens: 2.0, edpi: 800, role: "Rifler", country: "🇫🇷", age: 24, fullName: "Mathieu Herbaut",
    achievements: ["HLTV #1 Player 2019", "HLTV #1 Player 2020", "HLTV #1 Player 2023", "HLTV #1 Player 2025", "BLAST Premier World Final 2023 Champion", "BLAST Premier World Final 2023 MVP", "IEM Katowice 2025 Champion", "BLAST Austin Major 2025 Champion", "5 HLTV MVP awards in rookie year", "Gamers8 2023 MVP"],
    headphoneHistory: [{ headphone: "Razer BlackShark V2 Pro", period: "2025-Present" }, { headphone: "beyerdynamic DT 990 Pro", period: "2023-2025" }, { headphone: "Razer BlackShark V2", period: "2021-2023" }, { headphone: "HyperX Cloud II", period: "2019-2021" }] },
  { name: "NiKo", game: "CS2", team: "Falcons Esports", headphone: "HyperX Cloud III", dpi: 800, sens: 0.7, edpi: 560, role: "Rifler", country: "🇧🇦", age: 28, fullName: "Nikola Kovač",
    achievements: ["HLTV #2 Player 2017", "HLTV #3 Player 2021", "9× Counter-Strike Championship MVP", "ESL One New York 2017 MVP", "IEM Katowice 2022 MVP", "BLAST Premier Spring Final 2022 Champion", "Tied highest Big Event rating (1.70)", "ESL Pro League S14 Champion", "IEM Cologne 2022 Champion", "BLAST Premier World Final 2022 Champion"],
    headphoneHistory: [{ headphone: "HyperX Cloud III", period: "2025-Present" }, { headphone: "Razer BlackShark V3 Pro", period: "2023-2025" }, { headphone: "HyperX Cloud II", period: "2018-2023" }, { headphone: "SteelSeries Siberia 800", period: "2015-2018" }] },
  { name: "Faker", game: "LoL", team: "T1", headphone: "Razer BlackShark V2", dpi: 3500, sens: 6, edpi: 21000, role: "Mid", country: "🇰🇷", age: 29, fullName: "Lee Sang-hyeok",
    achievements: ["6× League of Legends World Champion (2013, 2015, 2016, 2023, 2024, 2025)", "2× MSI Champion", "10× LCK Champion", "Worlds 2023 Finals MVP", "Most decorated LoL player of all time", "Named to Forbes 30 Under 30", "Owner of 'Faker Tower' in Seoul", "Worlds 2024 Finals MVP", "Longest tenure with single org in LoL", "LOL Hall of Legends inductee"],
    headphoneHistory: [{ headphone: "Razer BlackShark V2", period: "2023-Present" }, { headphone: "Razer BlackShark V2", period: "2020-2023" }, { headphone: "Razer BlackShark V2", period: "2017-2020" }] },
  { name: "TenZ", game: "Valorant", team: "Sentinels", headphone: "HyperX Cloud III", dpi: 800, sens: 0.40, edpi: 320, role: "Duelist", country: "🇨🇦", age: 23, fullName: "Tyson Ngo",
    achievements: ["VCT Masters Reykjavik 2021 Champion", "VCT Masters Reykjavik 2021 MVP", "First Valorant player to reach Radiant on NA ladder", "Most popular Valorant content creator", "VCT Champions 2024 Finalist", "Multiple First Strike victories", "Sentinels franchise player", "VCT Americas League 2024", "Former CS:GO pro for Cloud9", "VCT Masters Shanghai 2024 Semi-finalist"],
    headphoneHistory: [{ headphone: "HyperX Cloud III", period: "2022-Present" }, { headphone: "Razer BlackShark V2 Pro", period: "2024-Present (alternate)" }, { headphone: "HyperX Cloud II", period: "2021-2022" }, { headphone: "Razer Kraken", period: "2020-2021" }] },
  { name: "aspas", game: "Valorant", team: "LOUD", headphone: "Razer BlackShark V2 Pro", dpi: 800, sens: 0.28, edpi: 224, role: "Duelist", country: "🇧🇷", age: 21, fullName: "Erick Santos",
    achievements: ["VCT Champions 2022 Champion", "VCT Champions 2022 MVP", "VCT Masters Copenhagen 2022 Champion", "VCT LOCK//IN São Paulo 2023 Champion", "VCT Americas 2023 Champion", "VCT Champions 2023 Finalist", "Multiple VCT Americas MVP awards", "LOUD franchise star", "Brazil's most decorated Valorant player", "VCT Masters Madrid 2024 Semi-finalist"],
    headphoneHistory: [{ headphone: "Razer BlackShark V2 Pro", period: "2024-Present" }, { headphone: "Razer BlackShark V3 Pro", period: "2023-2024" }, { headphone: "HyperX Cloud II", period: "2022-2023" }] },
  { name: "Derke", game: "Valorant", team: "Fnatic", headphone: "Razer BlackShark V3 Pro", dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇳🇱", age: 21, fullName: "Yasin Dinçer",
    achievements: ["VCT Champions 2022 Finalist", "VCT EMEA 2022 Champion", "VCT Masters Berlin 2021 Finalist", "Multiple VCT EMEA MVP nominations", "Fnatic franchise player", "VCT Champions 2023 Semi-finalist", "Known for clutch Chamber plays", "VCT Masters 2024 appearances", "EMEA Masters multiple champion", "Consistent top Duelist worldwide"],
    headphoneHistory: [{ headphone: "Razer BlackShark V3 Pro", period: "2024-Present" }, { headphone: "Razer BlackShark V2 Pro", period: "2022-2024" }, { headphone: "HyperX Cloud II", period: "2020-2022" }] },
  { name: "Bugha", game: "Fortnite", team: "Sentinels", headphone: "SteelSeries Arctis Nova Pro", dpi: 800, sens: 6.1, edpi: 4880, role: "Solos", country: "🇺🇸", age: 22, fullName: "Kyle Giersdorf",
    achievements: ["Fortnite World Cup 2019 Solo Champion ($3M)", "Youngest esports millionaire at 16", "Multiple FNCS victories", "Sentinels franchise player", "Fortnite Champion Series Grand Finals", "Twitch Rivals victories", "Consistent top earner in Fortnite", "Cultural icon of competitive Fortnite", "Featured on Tonight Show with Jimmy Fallon", "Multiple DreamHack tournament wins"],
    headphoneHistory: [{ headphone: "SteelSeries Arctis Nova Pro", period: "2024-Present" }, { headphone: "HyperX Cloud II", period: "2022-2024" }, { headphone: "HyperX Cloud Stinger", period: "2019-2022" }] },
  { name: "ImperialHal", game: "Apex", team: "Evil Geniuses", headphone: "beyerdynamic DT 990 Pro", dpi: 800, sens: 1.8, edpi: 1440, role: "IGL", country: "🇺🇸", age: 27, fullName: "Hal Cobie",
    achievements: ["ALGS Championships 2021 Champion", "ALGS Pro League Season 9 Champion", "Evil Geniuses franchise captain", "Most successful Apex IGL", "Multiple international LAN wins", "Consistent championship contention", "Known for frame-perfect callouts", "ALGS 2024 finalist", "Streamer and competitive player", "Regional and international MVPs"],
    headphoneHistory: [{ headphone: "beyerdynamic DT 990 Pro", period: "2024-Present" }, { headphone: "HyperX Cloud II", period: "2021-2024" }, { headphone: "Corsair HS50", period: "2019-2021" }] },
  { name: "ShowMaker", game: "LoL", team: "Gen.G", headphone: "Logitech G Pro X Headset", dpi: 1600, sens: 7, edpi: 11200, role: "Mid", country: "🇰🇷", age: 25, fullName: "Ryu Jeong-yeop",
    achievements: ["Worlds 2023 Champion", "Worlds 2023 Semi-finalist", "LCK Champion 2022", "LCK Spring 2023 MVP", "Worlds 2021 Runner-up", "MSI 2022 Champion", "Gen.G franchise mid laner", "3× World Championship appearance", "Known for exceptional teamfighting", "Consistent top 3 mid laner worldwide"],
    headphoneHistory: [{ headphone: "Logitech G Pro X Headset", period: "2023-Present" }, { headphone: "Logitech G Pro X Headset", period: "2021-2023" }, { headphone: "Razer Kraken", period: "2019-2021" }] },
];


export const extendedPlayers = [
  { name: "donk", team: "Team Spirit", game: "CS2", country: "🇷🇺", dpi: 800, sens: 1.25, edpi: 1000, headphone: "Razer BlackShark V2 Pro", hasProfile: false },
  { name: "m0NESY", team: "Falcons Esports", game: "CS2", country: "🇷🇺", dpi: 800, sens: 1.15, edpi: 920, headphone: "HyperX Cloud II", hasProfile: false },
  { name: "ropz", team: "Team Vitality", game: "CS2", country: "🇪🇪", dpi: 400, sens: 1.77, edpi: 708, headphone: "Razer BlackShark V3 Pro", hasProfile: false },
  { name: "Chovy", team: "Gen.G", game: "LoL", country: "🇰🇷", dpi: 1600, sens: 7, edpi: 11200, headphone: "Logitech G Pro X Headset", hasProfile: false },
  { name: "Caps", team: "G2", game: "LoL", country: "🇩🇰", dpi: 1600, sens: 6, edpi: 9600, headphone: "Razer BlackShark V2 Pro", hasProfile: false },
  { name: "arT", team: "Fluxo", game: "CS2", country: "🇧🇷", dpi: 800, sens: 2.55, edpi: 2040, headphone: "beyerdynamic DT 990 Pro", hasProfile: false },
  { name: "yay", team: "Disguised Toast", game: "Valorant", country: "🇺🇸", dpi: 800, sens: 0.27, edpi: 216, headphone: "Razer BlackShark V2 Pro", hasProfile: false },
  { name: "Demon1", team: "Evil Geniuses", game: "Valorant", country: "🇺🇸", dpi: 800, sens: 0.23, edpi: 184, headphone: "HyperX Cloud III", hasProfile: false },
  { name: "cNed", team: "Navi", game: "Valorant", country: "🇹🇷", dpi: 800, sens: 0.37, edpi: 296, headphone: "Logitech G Pro X Headset", hasProfile: false },
  { name: "Jinggg", team: "FUT Esports", game: "Valorant", country: "🇸🇬", dpi: 800, sens: 0.45, edpi: 360, headphone: "Razer BlackShark V2 Pro", hasProfile: false },
];


export const allPlayers = [...proPlayers.map(p => ({ ...p, hasProfile: true })), ...extendedPlayers.filter(ep => !proPlayers.find(pp => pp.name === ep.name && pp.game === ep.game)).map(p => ({ ...p, hasProfile: false }))];

export const brandMarketShare = [
  { brand: "Razer", marketShare: 28.5, proCount: 15, color: "#2a8a40" },
  { brand: "HyperX", marketShare: 24.3, proCount: 12, color: "#c43800" },
  { brand: "Logitech", marketShare: 18.2, proCount: 9, color: "#2874a6" },
  { brand: "SteelSeries", marketShare: 12.4, proCount: 6, color: "#c47000" },
  { brand: "Corsair", marketShare: 8.6, proCount: 4, color: "#b8960a" },
  { brand: "beyerdynamic", marketShare: 4.2, proCount: 2, color: "#8b0000" },
  { brand: "ASUS", marketShare: 2.1, proCount: 1, color: "#b01040" },
  { brand: "Sennheiser", marketShare: 1.2, proCount: 1, color: "#003da5" },
  { brand: "Others", marketShare: 0.5, proCount: 0, color: "#999999" },
];

export const gameBreakdown = [
  { game: "CS2", players: 42, headphoneCount: 15, topHeadphones: [{ name: "Razer BlackShark V2 Pro", pct: 28 }, { name: "HyperX Cloud II", pct: 22 }, { name: "Razer BlackShark V3 Pro", pct: 12 }], avgWeight: 295, wirelessPct: 54, icon: "crosshair" },
  { game: "Valorant", players: 30, headphoneCount: 12, topHeadphones: [{ name: "Razer BlackShark V2 Pro", pct: 25 }, { name: "HyperX Cloud III", pct: 18 }, { name: "Logitech G Pro X Headset", pct: 15 }], avgWeight: 300, wirelessPct: 48, icon: "crosshair" },
  { game: "LoL", players: 25, headphoneCount: 10, topHeadphones: [{ name: "Razer BlackShark V2", pct: 20 }, { name: "Logitech G Pro X Headset", pct: 18 }, { name: "SteelSeries Arctis Nova Pro", pct: 12 }], avgWeight: 310, wirelessPct: 40, icon: "gamepad" },
  { game: "Fortnite", players: 18, headphoneCount: 8, topHeadphones: [{ name: "SteelSeries Arctis Nova Pro", pct: 22 }, { name: "HyperX Cloud III", pct: 16 }, { name: "Razer Barracuda Pro", pct: 12 }], avgWeight: 305, wirelessPct: 55, icon: "gamepad" },
  { game: "Apex", players: 15, headphoneCount: 6, topHeadphones: [{ name: "beyerdynamic DT 990 Pro", pct: 20 }, { name: "HyperX Cloud II", pct: 18 }, { name: "Razer BlackShark V2 Pro", pct: 15 }], avgWeight: 290, wirelessPct: 35, icon: "crosshair" },
];

export const weightTrend = [
  { year: "2015", avgWeight: 320, lightest: 280, heaviest: 380 },
  { year: "2016", avgWeight: 315, lightest: 275, heaviest: 375 },
  { year: "2017", avgWeight: 310, lightest: 270, heaviest: 370 },
  { year: "2018", avgWeight: 305, lightest: 265, heaviest: 365 },
  { year: "2019", avgWeight: 300, lightest: 260, heaviest: 360 },
  { year: "2020", avgWeight: 295, lightest: 240, heaviest: 380 },
  { year: "2021", avgWeight: 290, lightest: 165, heaviest: 350 },
  { year: "2022", avgWeight: 310, lightest: 165, heaviest: 380 },
  { year: "2023", avgWeight: 305, lightest: 165, heaviest: 360 },
  { year: "2024", avgWeight: 300, lightest: 165, heaviest: 350 },
  { year: "2025", avgWeight: 305, lightest: 165, heaviest: 380 },
];

export const frequencyTrend = [
  { year: "2015", avg: 20, min: 20, max: 40 },
  { year: "2016", avg: 20, min: 20, max: 40 },
  { year: "2017", avg: 20, min: 20, max: 40 },
  { year: "2018", avg: 20, min: 20, max: 40 },
  { year: "2019", avg: 20, min: 20, max: 40 },
  { year: "2020", avg: 20, min: 10, max: 40 },
  { year: "2021", avg: 18, min: 5, max: 40 },
  { year: "2022", avg: 18, min: 5, max: 40 },
  { year: "2023", avg: 18, min: 5, max: 40 },
  { year: "2024", avg: 18, min: 5, max: 40 },
  { year: "2025", avg: 18, min: 5, max: 40 },
];

export const wirelessTrend = [
  { year: "2015", wireless: 5, wired: 95 },
  { year: "2016", wireless: 8, wired: 92 },
  { year: "2017", wireless: 10, wired: 90 },
  { year: "2018", wireless: 12, wired: 88 },
  { year: "2019", wireless: 15, wired: 85 },
  { year: "2020", wireless: 20, wired: 80 },
  { year: "2021", wireless: 28, wired: 72 },
  { year: "2022", wireless: 35, wired: 65 },
  { year: "2023", wireless: 42, wired: 58 },
  { year: "2024", wireless: 48, wired: 52 },
  { year: "2025", wireless: 52, wired: 48 },
];

export const priceTrend = [
  { year: "2015", avg: 100, flagship: 150, budget: 60 },
  { year: "2016", avg: 105, flagship: 160, budget: 65 },
  { year: "2017", avg: 110, flagship: 170, budget: 70 },
  { year: "2018", avg: 115, flagship: 180, budget: 75 },
  { year: "2019", avg: 120, flagship: 200, budget: 80 },
  { year: "2020", avg: 130, flagship: 220, budget: 85 },
  { year: "2021", avg: 140, flagship: 250, budget: 90 },
  { year: "2022", avg: 150, flagship: 280, budget: 80 },
  { year: "2023", avg: 160, flagship: 300, budget: 85 },
  { year: "2024", avg: 170, flagship: 350, budget: 85 },
  { year: "2025", avg: 175, flagship: 350, budget: 80 },
];
