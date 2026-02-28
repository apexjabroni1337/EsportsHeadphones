"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, CartesianGrid, Legend, AreaChart, Area } from "recharts";
import { Home, Headphones, Trophy, Cpu, Users, Gamepad2, Building2, TrendingUp, GitCompare, Search, X, FlaskConical, Crosshair, Layers, Shield, ChevronDown } from "lucide-react";
import { AMAZON_TAG, amazonLink, BRAND_COLORS, HEADPHONE_DIMS, HEADPHONE_IMAGE_URLS, HEADPHONE_DESCRIPTIONS, PLAYER_BIOS, BRAND_IMAGE_URLS, GAME_IMAGE_URLS, GAME_DESCRIPTIONS, TEAM_DESCRIPTIONS, TEAM_LOGOS, I, icon, headphones, proPlayers, extendedPlayers, allPlayers, brandMarketShare, gameBreakdown, weightTrend, frequencyTrend, wirelessTrend, priceTrend, countryName, getHeadphoneImage, getTeamLogo, getBrandLogo, getGameImage } from "@/data";
import { GlowText, StatBox, SectionTitle, HeadphoneCard, CustomTooltip, Flag } from "@/components/ui";

const TOP250 = new Set(["s1mple","ZywOo","NiKo","donk","m0NESY","TenZ","Scump","shroud","ImperialHal","Puppey","Faker","aspas","device","coldzera","Bugha","Shotzzy","Chovy","ropz","Proper","Beaulo","yay","Simp","electronic","Crimsix","N0tail","Twistzz","Demon1","Showmaker","EliGE","FalleN","Caps","MrSavage","rain","Profit","ScreaM","Karma","Shaiiko","olofmeister","Keria","f0rest","GeT_RiGhT","Yatoro","aceu","Clix","cNed","sh1ro","Clayster","Dendi","Zeus","TGLTN","broky","Alfajer","Jjonak","Cellium","b1t","Genburten","TaySon","gla1ve","Gumayusi","Paluh","karrigan","Derke","aBeZy","Mongraal","dupreeh","Collapse","Spoit","SP9RK1E","Oner","arT","crashies","Peterbot","KuroKy","huNter","Ras","Viper","Dashy","Fleta","Boaster","EpikWhale","jstn","Xyp9x","Magisk","Pengu","ana","Leave","f0rsakeN","Ax1Le","Jeemzz","Albralelie","Brollan","Deft","Formal","shox","Jinggg","Topson","Shrimzy","Hardecki","Kaydop","Canadian","Jimpphat","Less","Jankos","Ceb","HusKerrs","aqua","CTZN","blameF","stax","Rekkles","Carpe","Pred","Kickstart","stavn","Nisha","Queasy","Dropped","Super","njr","MaKo","NAF","Ruler","fer","nAts","Kenny","iNSaNiA","Squishy","Khanada","hwinn","YEKINDAR","SpiriTz","Nesk","Stewie2K","Zekken","CoreJJ","iceiceice","nyhrox","Vadeal","HisWattson","kscerato","SlasheR","something","Gustav","Kevster","Frozen","Arcitys","dafran","GarrettG","BrokenBlade","flameZ","Sacy","Envoy","Chapix","supr","tabseN","cr1t-","Mande","Elyoya","Fexx","Perfecto","Shao","Fairy Peak","Noahreyli","Doki","Hydra","nitr0","abed","Knight","Reps","Chronicle","Pio","woxic","Attach","Bucke","Alem4o","XANTARES","leaf","miCKe","Bin","xQc","Selly","Insight","iLLeY","jawgemo","Andilex","Brehze","cameram4n","Hans Sama","Kinstaar","Skyz","mxey","KRIMZ","saadhak","emongg","Stompy","Cyber","autimatic","Crylix","Ninja","Malibuca","cadiaN","sinatraa","Suygetsu","Upset","Larssen","TimTheTatman","ibiza","Muz","Yuzus","Jame","Lou","bogur","ZmjjKK","hampus","luke12","Tfue","soulz1","BuZz","HooXi","Hiko","9impulse","Japko","jabbi","Asuna","Aleksib","aLOW","BriD","Viol2t","Subroza","benjyfishy","Necros","Seagull","lyr1c","Boombl4","pollofn","Solotov","lionkk","mezii","Spinx","t3xture","kyxsan","n0thing","mL7","Kenzo","WARDELL","Veno","Primmie","Bestoloch","ShahZaM","YukaF","rapha","vengeurR","toxjq","k1llsen","cYpheR","RAISY","Cooller","clawz","DaHanG","Av3k","serious","Xron","maxter"]);
const GAME_COLORS = { CS2: "#c47000", Valorant: "#c43848", "League of Legends": "#c89b3c", LoL: "#c89b3c", Fortnite: "#3a60b0", "Dota 2": "#b83c30", "R6 Siege": "#3a6ca0", "Rocket League": "#1478c4", "Call of Duty": "#3a8a3a", "Overwatch 2": "#c48018", Apex: "#a82020", "Marvel Rivals": "#b81820", PUBG: "#c48a00", Deadlock: "#6d40c4", "Quake Champions": "#a83c00" };

const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = ((i * 2654435761) >>> 0) % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ─── Animated Counter: counts up from 0 when scrolled into view ─── */
function AnimatedCounter({ value, duration = 1800, color, suffix = "", prefix = "", className = "", style = {} }) {
  const [display, setDisplay] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || hasAnimated || !ref.current) return;
    // Check if already in view immediately
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setHasAnimated(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [mounted, hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    const raw = String(value).replace(/[^0-9.]/g, "");
    const target = parseFloat(raw) || 0;
    const isFloat = raw.includes(".");
    const steps = 60;
    const stepTime = duration / steps;
    let frame = 0;
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const timer = setInterval(() => {
      frame++;
      const progress = easeOutQuart(Math.min(frame / steps, 1));
      const current = progress * target;
      setDisplay(isFloat ? current.toFixed(1) : Math.round(current).toLocaleString());
      if (frame >= steps) { clearInterval(timer); setDisplay(isFloat ? target.toFixed(1) : target.toLocaleString()); }
    }, stepTime);
    return () => clearInterval(timer);
  }, [hasAnimated, value, duration]);

  // During SSR/before mount, render the final value to avoid hydration mismatch
  const raw = String(value).replace(/[^0-9.]/g, "");
  const target = parseFloat(raw) || 0;
  const isFloat = raw.includes(".");
  const staticDisplay = isFloat ? target.toFixed(1) : target.toLocaleString();

  return (
    <span ref={ref} className={className} style={{ color, ...style }}>
      {prefix}{!mounted ? staticDisplay : (hasAnimated ? display : "0")}{suffix}
    </span>
  );
}

// Tab-to-route mapping
const TAB_ROUTES = {
  overview: "/",
  headphones: "/headphones",
  rankings: "/headphones",
  sensors: "/sensors",
  players: "/players",
  games: "/games",
  brands: "/brands",
  trends: "/trends",
  compare: "/compare",
  lab: "/lab",
  shapes: "/shapes",
  headphoneDetail: "/headphones",
  teams: "/teams",
  teamDetail: "/teams",
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function EsportsHeadphones({ initialTab = "overview", initialHeadphoneSlug = null, initialPlayerSlug = null, initialGameSlug = null, initialTeam = null }) {
  const router = useRouter();
  const [selectedHeadphone, setSelectedHeadphone] = useState(() => {
    if (initialHeadphoneSlug) {
      const found = headphones.find(m => m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') === initialHeadphoneSlug);
      return found || headphones[0];
    }
    return headphones[0];
  });
  const [activeTab, setActiveTabRaw] = useState(initialTab);
  const [tabFade, setTabFade] = useState(true); // true = visible, false = fading out
  const [gameDetailSlug, setGameDetailSlug] = useState(initialGameSlug || null);  const setActiveTab = (tab) => {
    if (tab === activeTab) return;
    setTabFade(false); // fade out
    setTimeout(() => {
      setActiveTabRaw(tab);
      if (tab !== "headphoneDetail") setSelectedHeadphone(null);
      const route = TAB_ROUTES[tab];
      if (route && tab !== "headphoneDetail") {
        router.push(route, { scroll: false });
      }
      // Small delay before fade in so new content renders first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTabFade(true); // fade in
        });
      });
    }, 120); // matches CSS transition duration
  };
  const skipScrollOnTabChange = useRef(false);
  const playerListScrollPos = useRef(0);
  useEffect(() => {
    if (skipScrollOnTabChange.current) { skipScrollOnTabChange.current = false; return; }
    // Don't scroll to top if we're restoring list position (browser back)
    try {
      if (initialTab === "players" && !initialPlayerSlug) {
        const saved = sessionStorage.getItem("playerListScroll");
        if (saved && parseInt(saved, 10) > 0) return;
      }
      if (initialTab === "headphones" && !initialHeadphoneSlug) {
        const saved = sessionStorage.getItem("headphoneListScroll");
        if (saved && parseInt(saved, 10) > 0) return;
      }
    } catch {}
    window.scrollTo({ top: 0 });
  }, [activeTab]);
  const [selectedPlayer, setSelectedPlayer] = useState(() => {
    if (initialPlayerSlug) {
      const found = proPlayers.find(p => p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') === initialPlayerSlug);
      return found || null;
    }
    return null;
  });

  // Restore scroll position when returning to players/headphones list via browser back
  useEffect(() => {
    try {
      if (initialTab === "players" && !initialPlayerSlug) {
        const saved = sessionStorage.getItem("playerListScroll");
        if (saved) {
          const pos = parseInt(saved, 10);
          if (pos > 0) {
            setTimeout(() => { window.scrollTo({ top: pos, behavior: "instant" }); }, 50);
            sessionStorage.removeItem("playerListScroll");
          }
        }
      }
      if (initialTab === "headphones" && !initialHeadphoneSlug) {
        const saved = sessionStorage.getItem("headphoneListScroll");
        if (saved) {
          const pos = parseInt(saved, 10);
          if (pos > 0) {
            setTimeout(() => { window.scrollTo({ top: pos, behavior: "instant" }); }, 50);
            sessionStorage.removeItem("headphoneListScroll");
          }
        }
      }
    } catch {}
  }, []);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState("proUsage");
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterWeight, setFilterWeight] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterConn, setFilterConn] = useState("All");
  const [filterLayout, setFilterLayout] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [galleryTab, setGalleryTab] = useState("All");
  const [showComparison, setShowComparison] = useState(false);
  const [compareList, setCompareList] = useState([headphones[0], headphones[1]]);
  const [spotlightImgError, setSpotlightImgError] = useState(false);
  const [heroAnim, setHeroAnim] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [gameFilter, setGameFilter] = useState("All");
  const [playerSort, setPlayerSort] = useState({ key: null, dir: "asc" });
  const [roleFilter, setRoleFilter] = useState("All");
  const [headphoneFilter, setHeadphoneFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDrop, setShowSortDrop] = useState(false);
  const [profileOnly, setProfileOnly] = useState(false);
  const [playerPage, setPlayerPage] = useState(0);
  const PLAYERS_PER_PAGE = 50;
  const [rankingSort, setRankingSort] = useState({ key: "proUsage", dir: "desc" });
  const [sensorSort, setSensorSort] = useState({ key: "totalUsage", dir: "desc" });
  const [brandScoreSort, setBrandScoreSort] = useState({ key: "proShare", dir: "desc" });
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreDropdownRef = useRef(null);
  useEffect(() => {
    if (!moreDropdownOpen) return;
    const handler = (e) => { if (moreDropdownRef.current && !moreDropdownRef.current.contains(e.target)) setMoreDropdownOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [moreDropdownOpen]);
  const [sensorGameFilter, setSensorGameFilter] = useState("All");
  const [compareSensor1, setCompareSensor1] = useState(null);
  const [compareSensor2, setCompareSensor2] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const globalSearchRef = useRef(null);
  const globalSearchInputRef = useRef(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    handLength: "", handWidth: "", grip: "", games: [], priorities: [],
    weightPref: "", connectivity: "", budget: "", shape: "",
  });
  const [quizDone, setQuizDone] = useState(false);
  const [sensFromGame, setSensFromGame] = useState("cs2");
  const [sensFromDpi, setSensFromDpi] = useState(800);
  const [sensFromSens, setSensFromSens] = useState(1.0);
  const [sensShowPros, setSensShowPros] = useState(false);
  const [teamSearch, setTeamSearch] = useState("");
  const [teamGameFilter, setTeamGameFilter] = useState("All");
  const [teamSortBy, setTeamSortBy] = useState("playerCount");
  const [showTeamSortDrop, setShowTeamSortDrop] = useState(false);
  const [showTeamFilters, setShowTeamFilters] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(initialTeam);
  const [expandedRosters, setExpandedRosters] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [newsletterPopup, setNewsletterPopup] = useState(false);
  const [shapeHeadphoneA, setShapeKbdA] = useState(null);
  const [shapeHeadphoneB, setShapeKbdB] = useState(null);
  const [shapeView, setShapeView] = useState("overlay"); // overlay | side
  const [shapeAngle, setShapeAngle] = useState("top"); // top | profile

  useEffect(() => { setTimeout(() => setHeroAnim(true), 100); }, []);

  // Navigation helpers for Next.js routing
  const headphoneSlug = (kb) => kb.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
  const playerSlug = (player) => player.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');

  const navigateToHeadphone = (kbd) => {
    try { sessionStorage.setItem("headphoneListScroll", String(window.scrollY)); } catch {}
    // Save to recently viewed
    try {
      const recent = JSON.parse(sessionStorage.getItem("recentHeadphones") || "[]");
      const updated = [kbd.name, ...recent.filter(n => n !== kbd.name)].slice(0, 6);
      sessionStorage.setItem("recentHeadphones", JSON.stringify(updated));
    } catch {}
    setTabFade(false);
    setTimeout(() => {
      setSelectedHeadphone(kbd);
      setActiveTabRaw("headphoneDetail");
      router.push(`/headphones/${headphoneSlug(kbd)}`, { scroll: false });
      requestAnimationFrame(() => { requestAnimationFrame(() => { setTabFade(true); }); });
    }, 180);
  };

  const navigateToPlayer = (player) => {
    playerListScrollPos.current = window.scrollY;
    try { sessionStorage.setItem("playerListScroll", String(window.scrollY)); } catch {}
    setTabFade(false);
    setTimeout(() => {
      setSelectedPlayer(player);
      setActiveTabRaw("players");
      router.push(`/players/${playerSlug(player)}`, { scroll: false });
      requestAnimationFrame(() => { requestAnimationFrame(() => { setTabFade(true); }); });
    }, 180);
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── GLOBAL SEARCH: Cmd/Ctrl+K shortcut ───
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setGlobalSearchOpen(true);
        setTimeout(() => globalSearchInputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") {
        setGlobalSearchOpen(false);
        setGlobalSearch("");
        setMobileMenu(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ─── GLOBAL SEARCH: Click backdrop to close ───
  const handleSearchBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setGlobalSearchOpen(false);
      setGlobalSearch("");
    }
  };

  // ─── GLOBAL SEARCH: Compute results ───
  const globalSearchResults = (() => {
    const q = globalSearch.toLowerCase().trim();
    if (!q || q.length < 2) return { headphones: [], players: [], teams: [], games: [], brands: [] };

    const matchedKbds = headphones.filter(m =>
      m.name.toLowerCase().includes(q) || m.brand.toLowerCase().includes(q) || m.driverType.toLowerCase().includes(q)
    ).slice(0, 5);

    const matchedPlayers = allPlayers.filter(p =>
      p.name.toLowerCase().includes(q) || (p.team && p.team.toLowerCase().includes(q)) || (p.fullName && p.fullName.toLowerCase().includes(q))
    ).sort((a, b) => (b.hasProfile ? 1 : 0) - (a.hasProfile ? 1 : 0)).slice(0, 8);

    const teamSet = new Set();
    allPlayers.forEach(p => { if (p.team && p.team.toLowerCase().includes(q) && p.team !== "Content" && p.team !== "Free Agent" && p.team !== "Retired") teamSet.add(p.team); });
    const matchedTeams = [...teamSet].slice(0, 5).map(t => {
      const players = allPlayers.filter(p => p.team === t);
      const games = [...new Set(players.map(p => p.game))];
      return { name: t, playerCount: players.length, games };
    });

    const gameColors = GAME_COLORS;
    const gameNames = { CS2: "Counter-Strike 2", Valorant: "Valorant", LoL: "League of Legends", Fortnite: "Fortnite", "Overwatch 2": "Overwatch 2", Apex: "Apex Legends", "Dota 2": "Dota 2", "R6 Siege": "Rainbow Six Siege", "Rocket League": "Rocket League", "Call of Duty": "Call of Duty", "Marvel Rivals": "Marvel Rivals", PUBG: "PUBG", Deadlock: "Deadlock", "Quake Champions": "Quake Champions" };
    const matchedGames = Object.keys(gameColors).filter(g => {
      const gLower = g.toLowerCase();
      const fullName = (gameNames[g] || g).toLowerCase();
      return gLower.includes(q) || fullName.includes(q);
    }).slice(0, 4).map(g => ({ id: g, name: gameNames[g] || g, color: gameColors[g], playerCount: allPlayers.filter(p => p.game === g).length }));

    const matchedBrands = Object.keys(BRAND_COLORS).filter(b =>
      b.toLowerCase().includes(q)
    ).slice(0, 4).map(b => ({ name: b, color: BRAND_COLORS[b], headphoneCount: headphones.filter(m => m.brand === b).length }));

    return { headphones: matchedKbds, players: matchedPlayers, teams: matchedTeams, games: matchedGames, brands: matchedBrands };
  })();

  const globalSearchHasResults = globalSearch.length >= 2 && (globalSearchResults.headphones.length + globalSearchResults.players.length + globalSearchResults.teams.length + globalSearchResults.games.length + globalSearchResults.brands.length) > 0;
  const globalSearchNoResults = globalSearch.length >= 2 && !globalSearchHasResults;

  const handleSearchResultClick = (type, item) => {
    // Navigate first
    if (type === "headphone") {
      navigateToHeadphone(item);
    } else if (type === "player") {
      const pp = proPlayers.find(pp => pp.name === item.name && pp.game === item.game);
      if (pp) {
        navigateToPlayer(pp);
      } else {
        setSelectedPlayer(null);
        setGameFilter(item.game || "All");
        setActiveTab("players");
        router.push("/players");
      }
    } else if (type === "team") {
      setSelectedPlayer(null);
      setGameFilter("All");
      setSearchQuery(item.name);
      setActiveTab("players");
    } else if (type === "game") {
      skipScrollOnTabChange.current = true;
      setActiveTab("games");
      setTimeout(() => {
        const el = document.getElementById(`game-${item.id.replace(/\s+/g, '-').toLowerCase()}`);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 60;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else if (type === "brand") {
      skipScrollOnTabChange.current = true;
      setActiveTab("brands");
      setTimeout(() => {
        const el = document.getElementById(`brand-${item.name.replace(/\s+/g, '-').toLowerCase()}`);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 60;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
    // Close overlay after navigation state is set
    setGlobalSearch("");
    setGlobalSearchOpen(false);
  };

  const sortedKbds = [...headphones]
    .filter(m => filterBrand === "All" || m.brand === filterBrand)
    .filter(m => {
      if (filterWeight === "All") return true;
      if (filterWeight === "Ultralight") return m.weight < 250;
      if (filterWeight === "Light") return m.weight >= 250 && m.weight < 300;
      if (filterWeight === "Medium") return m.weight >= 300 && m.weight < 350;
      if (filterWeight === "Heavy") return m.weight >= 350;
      return true;
    })
    .filter(m => {
      if (filterPrice === "All") return true;
      if (filterPrice === "Budget") return m.price < 60;
      if (filterPrice === "Mid") return m.price >= 60 && m.price < 120;
      if (filterPrice === "Premium") return m.price >= 120;
      return true;
    })
    .filter(m => filterConn === "All" || m.connectivity === filterConn)
    .filter(m => filterLayout === "All" || m.formFactor === filterLayout)
    .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "proUsage") return b.proUsage - a.proUsage;
      if (sortBy === "weight") return a.weight - b.weight;
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "frequencyResponse") return b.frequencyResponse - a.frequencyResponse;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "releaseYear") return (b.releaseYear || 0) - (a.releaseYear || 0);
      return 0;
    });

  // Gallery-only filtered list (only used in the All Headphones tab)
  const galleryKbds = sortedKbds.filter(m => {
    if (galleryTab === "All") return true;
    if (galleryTab === "Wireless") return m.connectivity === "Wireless";
    if (galleryTab === "Wired") return m.connectivity === "Wired";
    if (galleryTab === "Budget") return m.price <= 100;
    if (galleryTab === "Pro Favorites") return m.proUsage >= 3;
    return true;
  });

  const radarData = selectedHeadphone ? [
    { stat: "Comfort", value: Math.max(0, 100 - Math.max(0, (selectedHeadphone.weight - 200) / 2)), fullMark: 100 },
    { stat: "Sound", value: Math.min(100, selectedHeadphone.planarMagnetic ? 95 : (selectedHeadphone.driverType === "Dynamic" ? 75 : 85)), fullMark: 100 },
    { stat: "Isolation", value: selectedHeadphone.anc ? 95 : (selectedHeadphone.formFactor === "Over-Ear" ? 70 : 50), fullMark: 100 },
    { stat: "Pro Pick", value: Math.min(100, selectedHeadphone.proUsage * 4), fullMark: 100 },
    { stat: "Rating", value: selectedHeadphone.rating * 10, fullMark: 100 },
    { stat: "Value", value: Math.max(0, 100 - (selectedHeadphone.price / 4)), fullMark: 100 },
  ] : [];

  const PRO_FAME = {
    // Tier S — GOATs / household names (100)
    s1mple:100, Faker:100, TenZ:100, NiKo:100, ZywOo:100, device:100, Shotzzy:100, Bugha:100, ImperialHal:100, Dendi:100,
    // Tier A — superstars (90)
    donk:90, "m0NESY":90, aspas:90, Demon1:90, ropz:90, Twistzz:90, rain:90, electronic:90, Showmaker:90, Puppey:90,
    dupreeh:90, "gla1ve":90, Xyp9x:90, Stewie2K:90, Clix:90, MrSavage:90, Proper:90, Profit:90, KuroKy:90, yay:90,
    // Tier B — star players (80)
    "sh1ro":80, b1t:80, huNter:80, Magisk:80, NAF:80, EliGE:80, ScreaM:80, YEKINDAR:80, Alfajer:80, Derke:80,
    Boaster:80, crashies:80, Marved:80, cNed:80, Chovy:80, Caps:80, Simp:80, aBeZy:80, Cellium:80,
    broky:80, blameF:80, XANTARES:80, woxic:80, Brollan:80, Aleksib:80, Gumayusi:80, Zeus:80, Keria:80,
    CoreJJ:80, Deft:80, BrokenBlade:80, Kevster:80, Peterbot:80, Genburten:80,
    // Tier C — well-known (70)
    "f0rsakeN":70, something:70, leaf:70, jawgemo:70, Chronicle:70, Less:70, MaKo:70, stax:70, BuZz:70,
    Jimpphat:70, Spinx:70, REZ:70, flameZ:70, frozen:70, ax1Le:70, cadiaN:70, nafany:70, hobbit:70,
    saadhak:70, FNS:70, Sacy:70, pancada:70, tuyz:70, Leo:70, Rb:70, Zest:70,
    Oner:70, Viper:70, "Hans Sama":70, Nisha:70, "cr1t-":70, TORONTOTOKYO:70, Ras:70,
    arT:70, Beaulo:70, Shaiiko:70, Paluh:70, Jstn:70, Yatoro:70, Collapse:70,
  };
  const usedByPros = shuffle(allPlayers.filter(p => {
    if (!selectedHeadphone?.name || !p.headphone) return false;
    if (!TOP250.has(p.name)) return false;
    const mn = selectedHeadphone.name.toLowerCase();
    const pm = p.headphone.toLowerCase();
    return pm === mn || pm.includes(mn) || mn.includes(pm);
  }));

  const topBrands = Object.entries(
    headphones.reduce((acc, m) => { acc[m.brand] = (acc[m.brand] || 0) + m.proUsage; return acc; }, {})
  ).sort((a, b) => b[1] - a[1]);

  const proUsageChart = (() => {
    const counts = {};
    allPlayers.forEach(p => { if (p.headphone) counts[p.headphone] = (counts[p.headphone] || 0) + 1; });
    return Object.entries(counts)
      .filter(([name]) => name && name !== "null" && name !== "undefined" && name !== "Unknown")
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([name, count]) => {
        const m = headphones.find(mm => mm.name === name || name.includes(mm.name) || mm.name.includes(name) || mm.name.toLowerCase() === name.toLowerCase());
        let fill = m ? (BRAND_COLORS[m.brand] || "#8a8460") : "#9e9578";
        let brand = m?.brand || "";
        if (!m) {
          const n = name.toLowerCase();
          if (n.includes("razer") || n.includes("kraken") || n.includes("blackshark")) { fill = BRAND_COLORS["Razer"]; brand = "Razer"; }
          else if (n.includes("logitech") || n.includes("g pro")) { fill = BRAND_COLORS["Logitech"]; brand = "Logitech"; }
          else if (n.includes("steelseries") || n.includes("arctis") || n.includes("nova")) { fill = BRAND_COLORS["SteelSeries"]; brand = "SteelSeries"; }
          else if (n.includes("corsair") || n.includes("virtuoso")) { fill = BRAND_COLORS["Corsair"]; brand = "Corsair"; }
          else if (n.includes("hyperx") || n.includes("cloud")) { fill = BRAND_COLORS["HyperX"]; brand = "HyperX"; }
          else if (n.includes("beyerdynamic")) { fill = BRAND_COLORS["beyerdynamic"]; brand = "beyerdynamic"; }
          else if (n.includes("sennheiser")) { fill = BRAND_COLORS["Sennheiser"]; brand = "Sennheiser"; }
          else if (n.includes("astro")) { fill = BRAND_COLORS["ASTRO"]; brand = "ASTRO"; }
          else if (n.includes("epos") || n.includes("gsp 500") || n.includes("h6pro")) { fill = BRAND_COLORS["EPOS"]; brand = "EPOS"; }
        }
        const shortName = name.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "");
        const price = m?.price;
        const weight = m?.weight;
        const connectivity = m?.connectivity;
        return { name: shortName, fullName: name, usage: parseFloat((count / allPlayers.length * 100).toFixed(1)), fill, brand, price, weight, connectivity, playerCount: count };
      });
  })();

  const pieData = brandMarketShare.filter(b => b.name !== "Other").map(b => ({
    name: b.name, value: b.share, fill: BRAND_COLORS[b.name] || "#8a8460"
  }));
  pieData.push({ name: "Other", value: (brandMarketShare.find(b => b.name === "Other") || { share: 3 }).share, fill: "#9e9578" });

  const tabs = [
    { id: "overview", label: "Overview", icon: Home, color: "#1a1614" },
    { id: "headphones", label: "All Headphones", icon: Headphones, color: "#2d2824" },
    { id: "rankings", label: "Rankings", icon: Trophy, color: "#c9a227" },
    { id: "sensors", label: "Drivers", icon: Cpu, color: "#7d6e1e" },
    { id: "players", label: "Pro Players", icon: Users, color: "#a68b1b" },
    { id: "lab", label: "Lab", icon: FlaskConical, color: "#c9a227" },
    { id: "games", label: "Games", icon: Gamepad2, color: "#2d2824" },
    { id: "brands", label: "Brands", icon: Building2, color: "#7d6e1e" },
    { id: "teams", label: "Teams", icon: Shield, color: "#a68b1b" },
    { id: "trends", label: "Trends", icon: TrendingUp, color: "#4a4340" },
    { id: "compare", label: "Compare", icon: GitCompare, color: "#c9a227" },
  ];

  const allBrands = ["All", ...new Set(headphones.map(m => m.brand))];

  return (
    <div className="min-h-screen text-stone-800" style={{ background: "#f5f2e6", fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
        @media (max-width: 640px) {
          table { font-size: 11px !important; }
          table th, table td { padding: 6px 8px !important; white-space: nowrap; }
          .recharts-wrapper { font-size: 12px; }
          .recharts-polar-angle-axis-tick text { font-size: 11px !important; }
        }
        img[src*="/images/headphones/"] {
          object-fit: contain;
          object-position: center;
        }
        * { -webkit-tap-highlight-color: transparent; }
        @keyframes float { 0% { transform: translateY(0px); } 100% { transform: translateY(-8px); } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: #c9a22740; border-radius: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        .ek-topnav-tabs { display: flex; gap: 2px; overflow: visible; scrollbar-width: none; -ms-overflow-style: none; }
        .ek-topnav-tabs::-webkit-scrollbar { display: none; }
        .ek-topnav-tab { white-space: nowrap; transition: all 0.2s ease; position: relative; }
        .ek-topnav-tab::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 0; height: 2px; border-radius: 1px; transition: width 0.2s ease; }
        .ek-topnav-tab.active::after { width: 60%; }
        .ek-topnav-tab:hover { background: rgba(0,0,0,0.04); }
      `}</style>

      {/* Skip to content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold" style={{ background: "#c9a227", color: "#1a1614" }}>Skip to content</a>

      {/* ─── GLOBAL SEARCH OVERLAY ─── */}
      {globalSearchOpen && (
        <div role="dialog" aria-label="Search" aria-modal="true" onClick={handleSearchBackdropClick} className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4" style={{ background: "rgba(30,26,22,0.25)", backdropFilter: "blur(8px)" }}>
          <div ref={globalSearchRef} role="search" className="w-full max-w-2xl rounded-2xl overflow-hidden glass-card" style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(6,182,212,0.15)", boxShadow: "0 25px 80px rgba(0,0,0,0.08), 0 0 40px rgba(6,182,212,0.06)" }}>
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "#c9a22710" }}>
              <Search size={18} style={{ color: "#c9a227", flexShrink: 0 }} />
              <input
                ref={globalSearchInputRef}
                type="text"
                aria-label="Search headphones, players, teams, games, and brands"
                role="searchbox"
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                placeholder="Search headphones, players, teams, games, brands..."
                autoFocus
                className="flex-1 bg-transparent outline-none text-stone-900 text-sm placeholder-stone-400"
                style={{ fontFamily: "'Fira Code', 'JetBrains Mono', monospace", fontSize: 15 }}
              />
              {globalSearch && (
                <button onClick={() => setGlobalSearch("")} className="p-1 rounded hover:bg-stone-100 transition-all">
                  <X size={14} style={{ color: "#9e9578" }} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded text-sm" style={{ background: "#00000008", color: "#9e9578", border: "1px solid #e6e3d6", fontSize: 11 }}>ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
              {globalSearch.length < 2 && (
                <div className="px-5 py-8 text-center">
                  <div className="text-sm opacity-20 mb-3">Quick Search</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["BlackShark V2 Pro", "s1mple", "Valorant", "Logitech G Pro X", "SteelSeries Arctis"].map(sug => (
                      <button key={sug} onClick={() => setGlobalSearch(sug)}
                        className="px-3 py-1.5 rounded-lg text-sm transition-all hover:bg-stone-100"
                        style={{ background: "#0000000a", color: "#8a8460", border: "1px solid #e6e3d6" }}>
                        {sug}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 text-sm opacity-15">
                    <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded mx-1" style={{ background: "#00000008", border: "1px solid #e6e3d6" }}>⌘K</kbd> anytime to search</span>
                  </div>
                </div>
              )}

              {globalSearchNoResults && (
                <div className="px-5 py-10 text-center">
                  <div className="text-sm opacity-30 mb-1">No results found</div>
                  <div className="text-sm opacity-15">Try a different search term</div>
                </div>
              )}

              {globalSearchHasResults && (
                <div className="py-2">
                  {/* Headphone Results */}
                  {globalSearchResults.headphones.length > 0 && (
                    <div className="mb-1">
                      <div className="px-5 py-2 text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: "#2d2824", opacity: 0.5, fontSize: 11 }}>
                        <Headphone size={11} /> Headphones
                      </div>
                      {globalSearchResults.headphones.map(m => {
                        const brandCol = BRAND_COLORS[m.brand] || "#8a8460";
                        return (
                          <button key={m.id} onClick={() => handleSearchResultClick("headphone", m)}
                            className="w-full flex items-center gap-3 px-5 py-2.5 text-left hover:bg-stone-100 transition-all group">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${brandCol}15`, border: `1px solid ${brandCol}20` }}>
                              <Headphone size={14} style={{ color: brandCol }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold truncate" style={{ color: brandCol }}>{m.name}</div>
                              <div className="text-xs truncate" style={{ color: "#9e9578" }}>{m.brand} · {m.weight}g · {m.driverType} · ${m.price}</div>
                            </div>
                            {m.proUsage > 0 && (
                              <div className="flex-shrink-0 px-2 py-0.5 rounded text-sm font-bold" style={{ background: "#c9a22718", color: "#c9a227", fontSize: 11 }}>
                                {m.proUsage}% pro
                              </div>
                            )}
                            <span className="text-sm opacity-0 group-hover:opacity-30 transition-opacity flex-shrink-0">↗</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Players Results */}
                  {globalSearchResults.players.length > 0 && (
                    <div className="mb-1">
                      <div className="px-5 py-2 text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: "#a68b1b", opacity: 0.5, fontSize: 11 }}>
                        <Users size={11} /> Players
                      </div>
                      {globalSearchResults.players.map((p, i) => {
                        const gameColors = GAME_COLORS;
                        const gCol = gameColors[p.game] || "#8a8460";
                        return (
                          <button key={`${p.name}-${p.game}-${i}`} onClick={() => handleSearchResultClick("player", p)}
                            className="w-full flex items-center gap-3 px-5 py-2.5 text-left hover:bg-stone-100 transition-all group">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm" style={{ background: `${gCol}15`, border: `1px solid ${gCol}20` }}>
                              {p.country ? <Flag country={p.country} size={14} /> : <Gamepad2 size={14} style={{ color: "#9e9578" }} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold truncate">{p.name} {p.fullName ? <span className="font-normal opacity-30 text-sm">({p.fullName})</span> : null}</div>
                              <div className="text-xs truncate" style={{ color: "#9e9578" }}>{p.team} · <span style={{ color: gCol }}>{p.game}</span> · {p.headphone}</div>
                            </div>
                            {p.hasProfile && (
                              <div className="flex-shrink-0 px-2 py-0.5 rounded text-sm font-bold" style={{ background: "#a68b1b18", color: "#a68b1b", fontSize: 11 }}>
                                Profile
                              </div>
                            )}
                            <span className="text-sm opacity-0 group-hover:opacity-30 transition-opacity flex-shrink-0">↗</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Teams Results */}
                  {globalSearchResults.teams.length > 0 && (
                    <div className="mb-1">
                      <div className="px-5 py-2 text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: "#c9a227", opacity: 0.5, fontSize: 11 }}>
                        <Building2 size={11} /> Teams
                      </div>
                      {globalSearchResults.teams.map((t, i) => (
                        <button key={`${t.name}-${i}`} onClick={() => handleSearchResultClick("team", t)}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-left hover:bg-stone-100 transition-all group">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: "#c9a22718", border: "1px solid #c9a22730" }}>
                            {getTeamLogo(t.name) ? <><img loading="lazy" src={getTeamLogo(t.name)} alt={t.name} className="w-5 h-5 object-contain" onError={e => { e.target.style.display = "none"; e.target.parentElement.querySelector('.team-fb') && (e.target.parentElement.querySelector('.team-fb').style.display = ""); }} /><Building2 size={14} className="team-fb" style={{ color: "#c9a227", display: "none" }} /></> : <Building2 size={14} style={{ color: "#c9a227" }} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold truncate">{t.name}</div>
                            <div className="text-xs truncate" style={{ color: "#9e9578" }}>{t.playerCount} players · {t.games.join(", ")}</div>
                          </div>
                          <span className="text-sm opacity-0 group-hover:opacity-30 transition-opacity flex-shrink-0">↗</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Games Results */}
                  {globalSearchResults.games.length > 0 && (
                    <div className="mb-1">
                      <div className="px-5 py-2 text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: "#2d2824", opacity: 0.5, fontSize: 11 }}>
                        <Gamepad2 size={11} /> Games
                      </div>
                      {globalSearchResults.games.map((g, i) => (
                        <button key={`${g.id}-${i}`} onClick={() => handleSearchResultClick("game", g)}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-left hover:bg-stone-100 transition-all group">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: `${g.color}15`, border: `1px solid ${g.color}20` }}>
                            {getGameImage(g.name) ? <img loading="lazy" src={getGameImage(g.name)} alt={g.name} className="w-5 h-5 object-contain" /> : <Gamepad2 size={14} style={{ color: g.color }} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold truncate" style={{ color: g.color }}>{g.name}</div>
                            <div className="text-xs truncate" style={{ color: "#9e9578" }}>{g.playerCount} pros tracked</div>
                          </div>
                          <span className="text-sm opacity-0 group-hover:opacity-30 transition-opacity flex-shrink-0">↗</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Brands Results */}
                  {globalSearchResults.brands.length > 0 && (
                    <div className="mb-1">
                      <div className="px-5 py-2 text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: "#c9a227", opacity: 0.5, fontSize: 11 }}>
                        <Building2 size={11} /> Brands
                      </div>
                      {globalSearchResults.brands.map((b, i) => (
                        <button key={`${b.name}-${i}`} onClick={() => handleSearchResultClick("brand", b)}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-left hover:bg-stone-100 transition-all group">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: `${b.color}15`, border: `1px solid ${b.color}20` }}>
                            {getBrandLogo(b.name) ? <img loading="lazy" src={getBrandLogo(b.name)} alt={b.name} className="w-5 h-5 object-contain" /> : <span className="text-sm font-black" style={{ color: b.color }}>{b.name[0]}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold truncate" style={{ color: b.color }}>{b.name}</div>
                            <div className="text-xs truncate" style={{ color: "#9e9578" }}>{b.headphoneCount} headphones in database</div>
                          </div>
                          <span className="text-sm opacity-0 group-hover:opacity-30 transition-opacity flex-shrink-0">↗</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {globalSearchHasResults && (
              <div className="px-5 py-2.5 border-t flex items-center justify-between text-sm" style={{ borderColor: "#00000008", color: "#00000015" }}>
                <span>
                  {globalSearchResults.headphones.length + globalSearchResults.players.length + globalSearchResults.teams.length + globalSearchResults.games.length + globalSearchResults.brands.length} results
                </span>
                <span className="hidden sm:inline">↑↓ navigate · ↵ select · esc close</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── NEWSLETTER MODAL ─── */}
      {newsletterPopup && newsletterStatus !== "success" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ background: "rgba(30,26,22,0.25)", backdropFilter: "blur(8px)" }} onClick={() => setNewsletterPopup(false)}>
          <div className="w-full max-w-md rounded-2xl p-8 text-center" style={{ background: "#f8f6f3", border: "1px solid #c9a22718", boxShadow: "0 25px 80px rgba(0,0,0,0.06), 0 0 40px rgba(184,149,106,0.08)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span style={{ color: "#c9a227", fontSize: 22 }}>📬</span>
              <span className="text-sm font-black uppercase tracking-widest" style={{ color: "#c9a227" }}>Newsletter</span>
            </div>
            <div className="text-xl font-black text-stone-900 mb-2">Stay ahead of the meta</div>
            <div className="text-sm mb-6" style={{ color: "#9e9578" }}>Pro gear changes, new headphone releases, and data-driven insights. No spam.</div>
            <form className="flex gap-2" onSubmit={async e => { e.preventDefault(); setNewsletterStatus("sending"); try { const res = await fetch("https://formspree.io/f/xvzbwrzv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: newsletterEmail }) }); setNewsletterStatus(res.ok ? "success" : "error"); setNewsletterPopup(false); } catch { setNewsletterStatus("error"); } }}>
              <input type="email" required placeholder="your@email.com" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} autoFocus
                className="flex-1 px-4 py-3 rounded-lg text-sm outline-none" style={{ background: "#ffffff", border: "1px solid #d4d0be", color: "#1a1614", minWidth: 0 }} />
              <button type="submit" disabled={newsletterStatus === "sending"} className="px-6 py-3 rounded-lg text-sm font-black transition-all hover:scale-105 disabled:opacity-50 whitespace-nowrap" style={{ background: "#c9a227", color: "#1a1614" }}>
                {newsletterStatus === "sending" ? "..." : "Subscribe"}
              </button>
            </form>
            {newsletterStatus === "error" && <div className="text-sm mt-3" style={{ color: "#c44040" }}>Something went wrong. Try again.</div>}
            <button onClick={() => setNewsletterPopup(false)} className="text-sm opacity-20 hover:opacity-50 mt-5 transition-all">Close</button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
           NAVIGATION — Gradient Top Bar + Vertical Sidebar
           ═══════════════════════════════════════════════════════ */}

      {/* ─── TOP NAVIGATION BAR ─── */}
      <header className="sticky top-0 z-50">
        {/* Gradient accent line */}
        <div style={{ height: 2, background: "linear-gradient(90deg, #d4d0be, #c9a227, #2d2824, #c9a227, #d4d0be)", backgroundSize: "200% 100%", animation: "gradient-shift 6s ease infinite" }} />
        {/* Main nav row */}
        <div style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center gap-4" style={{ height: 64 }}>
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group flex-shrink-0" onClick={() => { setActiveTab("overview"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <span className="inline-flex transition-transform duration-300 group-hover:scale-110">{I.headphone(26)}</span>
              <div className="hidden sm:flex flex-col">
                <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: 2.5, color: "#1a1614", lineHeight: 1 }}>ESPORTSHEADPHONES</span>
                <span style={{ fontSize: 10, letterSpacing: 2, color: "#9e9578", fontWeight: 600, textTransform: "uppercase" }}>Pro Headphone Data</span>
              </div>
            </div>

            {/* Separator */}
            <div className="hidden md:block" style={{ width: 1, height: 28, background: "rgba(0,0,0,0.08)" }} />

            {/* Desktop Tab Navigation */}
            <nav aria-label="Main navigation" className="hidden md:flex ek-topnav-tabs flex-1 items-center" style={{ minWidth: 0 }}>
              {tabs.filter(t => t.id !== "trends" && t.id !== "compare").map(t => {
                const isActive = activeTab === t.id;
                const Icon = t.icon;
                return (
                  <button key={t.id} onClick={() => { setActiveTab(t.id); if (t.id === "players") setSelectedPlayer(null); if (t.id === "lab") { setQuizStep(0); setQuizDone(false); } window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    role="tab" aria-selected={isActive} aria-controls="main-content"
                    className={`ek-topnav-tab flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold${isActive ? " active" : ""}`}
                    style={{
                      color: isActive ? t.color : "#3d3a30",
                      background: isActive ? `${t.color}10` : "transparent",
                    }}>
                    <Icon size={16} strokeWidth={2} style={{ color: isActive ? t.color : "#8a8470", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>{t.label === "All Headphones" ? "Headphones" : t.label}</span>
                    {isActive && <style>{`.ek-topnav-tab.active[aria-selected="true"]::after { background: ${t.color}; }`}</style>}
                  </button>
                );
              })}
              {/* More dropdown for Trends & Compare */}
              <div ref={moreDropdownRef} className="relative">
                <button onClick={() => setMoreDropdownOpen(prev => !prev)}
                  className={`ek-topnav-tab flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-semibold${activeTab === "trends" || activeTab === "compare" ? " active" : ""}`}
                  style={{
                    color: (activeTab === "trends" || activeTab === "compare") ? "#4a4340" : "#3d3a30",
                    background: (activeTab === "trends" || activeTab === "compare") ? "#4a434010" : "transparent",
                  }}>
                  <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>More</span>
                  <ChevronDown size={14} style={{ color: "#8a8470", transition: "transform 0.2s", transform: moreDropdownOpen ? "rotate(180deg)" : "rotate(0)" }} />
                  {(activeTab === "trends" || activeTab === "compare") && <style>{`.ek-topnav-tab.active[aria-selected="true"]::after { background: #4a4340; }`}</style>}
                </button>
                {moreDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 rounded-xl overflow-hidden z-50" style={{ background: "#ffffff", border: "1px solid #e6e3d6", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", minWidth: 180 }}>
                    {tabs.filter(t => t.id === "trends" || t.id === "compare").map(t => {
                      const isActive = activeTab === t.id;
                      const Icon = t.icon;
                      return (
                        <button key={t.id} onClick={() => { setActiveTab(t.id); setMoreDropdownOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="w-full flex items-center gap-2 px-4 py-3 text-left text-[14px] font-semibold transition-all hover:bg-stone-50"
                          style={{ color: isActive ? t.color : "#3d3a30", background: isActive ? `${t.color}08` : "transparent" }}>
                          <Icon size={16} strokeWidth={2} style={{ color: isActive ? t.color : "#8a8470" }} />
                          <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Right side: stats + search + subscribe */}
            <div className="flex items-center gap-2.5 ml-auto flex-shrink-0">
              {/* Search trigger */}
              <button onClick={() => { setGlobalSearchOpen(true); setTimeout(() => globalSearchInputRef.current?.focus(), 50); }}
                aria-label="Search" className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full text-xs transition-all duration-300 hover:shadow-md"
                style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(184,149,106,0.15)", color: "#8a8460", minWidth: 170 }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.95)"; e.currentTarget.style.borderColor = "rgba(184,149,106,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(184,149,106,0.15)"; }}>
                <Search size={16} style={{ color: "#c9a227" }} />
                <span style={{ fontSize: 14, color: "#9e9578" }}>Search...</span>
              </button>
              {/* Mobile search */}
              <button onClick={() => { setGlobalSearchOpen(true); setTimeout(() => globalSearchInputRef.current?.focus(), 50); }}
                aria-label="Search" className="sm:hidden p-2 rounded-full" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(184,149,106,0.15)" }}>
                <Search size={18} style={{ color: "#c9a227" }} />
              </button>
              {/* Subscribe */}
              {newsletterStatus === "success" ? (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-bold" style={{ background: "#c9a22715", color: "#c9a227", border: "1px solid #c9a22730" }}>✓ Subscribed</span>
              ) : (
                <button onClick={() => setNewsletterPopup(true)}
                  className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-[13px] transition-all duration-300 hover:shadow-lg hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #c9a227, #a88f1c)", color: "#ffffff", letterSpacing: 0.5, boxShadow: "0 2px 8px rgba(184,149,106,0.3)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Subscribe
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── MOBILE BOTTOM TAB BAR ─── */}
      <nav aria-label="Mobile navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderTop: "1px solid rgba(0,0,0,0.06)", height: 64 }}>
        <div className="flex items-center justify-around h-full px-2">
          {[
            tabs.find(t => t.id === "overview"),
            tabs.find(t => t.id === "headphones"),
            tabs.find(t => t.id === "players"),
            tabs.find(t => t.id === "lab"),
            tabs.find(t => t.id === "games"),
          ].filter(Boolean).map(t => {
            const isActive = activeTab === t.id;
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => {
                if (t.id === "players") setSelectedPlayer(null);
                if (t.id === "lab") { setQuizStep(0); setQuizDone(false); }
                const route = TAB_ROUTES[t.id] || "/";
                router.push(route, { scroll: false });
                setActiveTabRaw(t.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all"
                style={{ color: isActive ? t.color : "#9e9578" }}>
                <Icon size={20} strokeWidth={2} />
                <span style={{ fontSize: 9, fontWeight: 600, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>{t.label === "All Headphones" ? "Headphones" : t.label}</span>
                {isActive && <div className="w-1 h-1 rounded-full mt-0.5" style={{ background: t.color }} />}
              </button>
            );
          })}
          {/* More button for remaining tabs */}
          <button onClick={() => setMobileMenu(!mobileMenu)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all"
            style={{ color: mobileMenu ? "#2d2824" : "#9e9578" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
            </svg>
            <span style={{ fontSize: 9, fontWeight: 600, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>More</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile "More" Menu Overlay ── */}
      {mobileMenu && (
        <div className="md:hidden fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.3)" }} onClick={() => setMobileMenu(false)}>
          <div className="absolute bottom-16 left-2 right-2 rounded-2xl p-4 glass-card" onClick={e => e.stopPropagation()}
            style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 -8px 40px rgba(0,0,0,0.1)" }}>
            <div className="grid grid-cols-4 gap-2">
              {tabs.filter(t => !["overview","headphones","players","lab","games"].includes(t.id)).map(t => {
                const isActive = activeTab === t.id;
                const Icon = t.icon;
                return (
                  <button key={t.id} onClick={() => {
                    setMobileMenu(false);
                    const route = TAB_ROUTES[t.id] || "/";
                    router.push(route, { scroll: false });
                    setActiveTabRaw(t.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all"
                    style={{ background: isActive ? `${t.color}10` : "rgba(0,0,0,0.03)", border: isActive ? `1px solid ${t.color}25` : "1px solid transparent" }}>
                    <Icon size={18} strokeWidth={2} style={{ color: isActive ? t.color : "#9e9578" }} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: isActive ? t.color : "#7d6e1e" }}>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── Content wrapper ─── */}
      <div className="pb-20 md:pb-0">

      {/* ═══════════════════════════════════════════════════════
           HERO SECTION — Split Layout with Earpad Decorations
           ═══════════════════════════════════════════════════════ */}
      {activeTab === "overview" && (
      <header className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f5f2e6 0%, #ece9d8 100%)" }}>
        {/* Decorative sound wave pattern */}
        <div className="absolute inset-0 overflow-hidden" style={{ opacity: 0.035 }}>
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none" fill="none">
            {/* Sound wave lines */}
            <path d="M0 200 Q150 120 300 200 Q450 280 600 200 Q750 120 900 200 Q1050 280 1200 200" stroke="#c9a227" strokeWidth="2" opacity="0.6"/>
            <path d="M0 200 Q150 150 300 200 Q450 250 600 200 Q750 150 900 200 Q1050 250 1200 200" stroke="#c9a227" strokeWidth="1.5" opacity="0.4"/>
            <path d="M0 200 Q150 170 300 200 Q450 230 600 200 Q750 170 900 200 Q1050 230 1200 200" stroke="#c9a227" strokeWidth="1" opacity="0.3"/>
            {/* Frequency spectrum bars */}
            {Array.from({ length: 40 }).map((_, i) => {
              const x = 30 + i * 30;
              const h = 20 + Math.sin(i * 0.7) * 40 + Math.cos(i * 1.3) * 25;
              return <rect key={i} x={x} y={320 - h} width="4" height={h} rx="2" fill="#c9a227" opacity={0.15 + Math.sin(i * 0.5) * 0.1} />;
            })}
            {/* Driver circles */}
            <circle cx="100" cy="80" r="50" stroke="#2d2824" strokeWidth="1.5" opacity="0.3" fill="none"/>
            <circle cx="100" cy="80" r="35" stroke="#2d2824" strokeWidth="1" opacity="0.2" fill="none"/>
            <circle cx="100" cy="80" r="15" stroke="#c9a227" strokeWidth="1" opacity="0.3" fill="none"/>
            <circle cx="1100" cy="100" r="45" stroke="#2d2824" strokeWidth="1.5" opacity="0.25" fill="none"/>
            <circle cx="1100" cy="100" r="28" stroke="#2d2824" strokeWidth="1" opacity="0.15" fill="none"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left: Hero headphone showcase */}
            <div className="hidden md:flex justify-center items-center" style={{ transition: "all 1s ease 0.2s", opacity: heroAnim ? 1 : 0, transform: heroAnim ? "translateX(0)" : "translateX(-20px)" }}>
              <div className="relative" style={{ width: 380, height: 340 }}>
                {/* Glowing backdrop circle */}
                <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, #c9a22712 0%, #c9a22706 50%, transparent 70%)", filter: "blur(20px)" }} />
                {/* Main featured headphone - #1 most popular */}
                {(() => {
                  const topHP = [...headphones].sort((a, b) => b.proUsage - a.proUsage);
                  const mainImg = getHeadphoneImage(topHP[0]?.name);
                  const secondImg = getHeadphoneImage(topHP[1]?.name);
                  const thirdImg = getHeadphoneImage(topHP[2]?.name);
                  return (<>
                    {/* Background headphones - slightly faded */}
                    {secondImg && <div className="absolute" style={{ right: -10, top: 20, width: 160, height: 160, opacity: 0.3, transform: "rotate(8deg)", animation: "float 4s ease-in-out 600ms infinite alternate" }}>
                      <img src={secondImg} alt={topHP[1]?.name} className="w-full h-full object-contain" style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.1))" }} />
                    </div>}
                    {thirdImg && <div className="absolute" style={{ left: -10, bottom: 30, width: 140, height: 140, opacity: 0.25, transform: "rotate(-10deg)", animation: "float 4s ease-in-out 1200ms infinite alternate" }}>
                      <img src={thirdImg} alt={topHP[2]?.name} className="w-full h-full object-contain" style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.1))" }} />
                    </div>}
                    {/* Main headphone - large and centered */}
                    {mainImg && <div className="relative flex justify-center items-center" style={{ width: "100%", height: "100%", animation: "float 3s ease-in-out infinite alternate" }}>
                      <img src={mainImg} alt={topHP[0]?.name} className="object-contain" style={{ width: 260, height: 260, filter: "drop-shadow(0 12px 40px rgba(45,40,36,0.25)) drop-shadow(0 4px 12px rgba(184,149,106,0.2))" }} />
                    </div>}
                    {/* #1 badge */}
                    <div className="absolute px-3 py-1.5 rounded-xl text-xs font-black" style={{ top: 10, right: 30, background: "linear-gradient(135deg, #c9a227, #a88f1c)", color: "#fff", boxShadow: "0 4px 16px rgba(184,149,106,0.4)", animation: "float 3s ease-in-out 300ms infinite alternate" }}>
                      #1 in Esports
                    </div>
                    {/* Brand badges floating */}
                    {[
                      { name: topHP[0]?.brand, x: 15, y: 60, delay: 0 },
                      { name: topHP[1]?.brand, x: 280, y: 100, delay: 400 },
                      { name: topHP[2]?.brand, x: 260, y: 270, delay: 800 },
                    ].filter(b => b.name).map((b, i) => (
                      <div key={i} className="absolute px-2.5 py-1 rounded-full text-[11px] font-bold"
                        style={{
                          left: b.x, top: b.y,
                          background: `${BRAND_COLORS[b.name] || "#8a8460"}15`,
                          color: BRAND_COLORS[b.name] || "#8a8460",
                          border: `1px solid ${BRAND_COLORS[b.name] || "#8a8460"}30`,
                          backdropFilter: "blur(8px)",
                          animation: `float 3s ease-in-out ${b.delay}ms infinite alternate`,
                        }}>
                        {b.name}
                      </div>
                    ))}
                  </>);
                })()}
              </div>
            </div>

            {/* Right: Headline + stats */}
            <div style={{ transition: "all 1s ease", opacity: heroAnim ? 1 : 0, transform: heroAnim ? "translateY(0)" : "translateY(20px)" }}>
              {/* Eyebrow - earpad style */}
              <div className="mb-4 sm:mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold tracking-widest uppercase"
                  style={{
                    background: "linear-gradient(135deg, #c9a22710, #2d282410)",
                    color: "#c9a227",
                    border: "1px solid #c9a22718",
                    borderBottom: "2px solid #c9a22730",
                    boxShadow: "0 2px 0 rgba(6, 182, 212, 0.2)"
                  }}>
                  The Definitive Resource
                </span>
              </div>
              {/* Main heading - enhanced */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5, color: "#1a1614" }}>
                Pro Esports<br />
                <span style={{ background: "linear-gradient(135deg, #c9a227, #1a1614)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Headphones</span>
              </h1>
              {/* Dynamic tagline subtitle */}
              <p className="max-w-2xl text-base sm:text-lg leading-relaxed font-medium mb-3" style={{ color: "#c9a227" }}>
                The definitive database of {headphones.length} headphones used by {allPlayers.length.toLocaleString()} professional esports players
              </p>
              {/* Secondary description */}
              <p className="max-w-xl text-sm sm:text-base leading-relaxed" style={{ color: "#7d6e1e" }}>
                Rankings, specifications, comparisons, and pro settings across {new Set(allPlayers.map(p=>p.game)).size} major esports titles.
              </p>
            </div>
          </div>

          {/* Stats strip - redesigned with icons and gradients */}
          {(() => {
            const topBrand = [...headphones].sort((a, b) => b.proUsage - a.proUsage)[0];
            const statItems = [
              { val: allPlayers.length, label: "Pro Players", suffix: "", prefix: "", color: "#c9a227", icon: Users, sub: "tracked worldwide" },
              { val: headphones.length, label: "Headphones", suffix: "", prefix: "", color: "#2d2824", icon: Headphones, sub: "in database" },
              { val: new Set(allPlayers.map(p=>p.game)).size, label: "Games", suffix: "", prefix: "", color: "#d97706", icon: Gamepad2, sub: "esports titles" },
              { val: Math.max(...headphones.map(m => m.proUsage)), label: "Top Share", suffix: "%", prefix: "", color: "#a68b1b", icon: Trophy, sub: topBrand?.brand || "" },
            ];
            return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-14" style={{ transition: "all 0.8s ease 0.3s", opacity: heroAnim ? 1 : 0 }}>
              {statItems.map((s, i) => {
                const Icon = s.icon;
                return (
                <div key={i} className="relative group cursor-default overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: "1rem",
                    padding: "1.25rem 1rem",
                  }}>
                  {/* Colored accent bar at top */}
                  <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-300" style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}80)`, opacity: 0.7 }} />
                  {/* Background icon watermark */}
                  <div className="absolute -right-2 -top-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ opacity: 0.04 }}>
                    <Icon size={80} strokeWidth={1.5} />
                  </div>
                  {/* Icon circle */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.color}12` }}>
                      <Icon size={18} strokeWidth={2.5} style={{ color: s.color }} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9e9578" }}>{s.label}</span>
                  </div>
                  {/* Value */}
                  <div className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: s.color }}>
                    <AnimatedCounter value={s.val} suffix={s.suffix} prefix={s.prefix} color={s.color} duration={1600 + i * 200} />
                  </div>
                  {/* Sub label */}
                  <div className="text-xs mt-1.5 font-medium" style={{ color: "#b0a89e" }}>{s.sub}</div>
                </div>
              );})}
            </div>
            );
          })()}
        </div>

        {/* Bottom decorative line - cyan to violet gradient */}
        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, #c9a22730, #2d282430, transparent)" }} />
      </header>
      )}

      {/* ─── NAV TLeatherette ─── */}


      {/* ─── CONTENT ─── */}
      <main id="main-content" role="main" className="max-w-7xl mx-auto px-3 sm:px-6 pb-20" style={{ transition: "opacity 120ms ease, transform 120ms ease", opacity: tabFade ? 1 : 0, transform: tabFade ? "translateY(0)" : "translateY(6px)" }}>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div>
            <SectionTitle color="#c9a227" sub={`Based on data from ${allPlayers.length} professional esports players across ${new Set(allPlayers.map(p=>p.game)).size} major titles`}>Headphone Usage by Professional Players</SectionTitle>
            {/* ── Podium + Grid ── */}
            <div>
              {/* Top 3 Podium */}
              <div className="flex items-end justify-center gap-3 sm:gap-5 mb-6" style={{ minHeight: 260 }}>
                {[proUsageChart[1], proUsageChart[0], proUsageChart[2]].filter(Boolean).map((d, pi) => {
                  const rank = pi === 0 ? 2 : pi === 1 ? 1 : 3;
                  const heights = { 1: 180, 2: 140, 3: 110 };
                  const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
                  const img = getHeadphoneImage(d.fullName);
                  return (
                    <div key={d.name} className="flex flex-col items-center" style={{ width: rank === 1 ? 160 : 130 }}>
                      {img && <img loading="lazy" src={img} alt={d.fullName} className="mb-2 object-contain" style={{ height: rank === 1 ? 64 : 48, filter: `drop-shadow(0 4px 12px ${d.fill}30)` }} />}
                      <div className="text-center mb-2">
                        <div className="text-sm font-black leading-tight" style={{ color: "#1a1614", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>{d.name}</div>
                        <div style={{ fontSize: 10, color: d.fill, fontWeight: 700 }}>{d.brand}</div>
                      </div>
                      {/* Podium block */}
                      <div className="w-full rounded-t-xl flex flex-col items-center justify-start pt-3 relative overflow-hidden"
                        style={{ height: heights[rank], background: `linear-gradient(180deg, ${d.fill}18 0%, ${d.fill}08 100%)`, border: `1px solid ${d.fill}20`, borderBottom: "none" }}>
                        <div className="text-2xl mb-1">{medals[rank]}</div>
                        <div className="text-xl sm:text-2xl font-black" style={{ color: d.fill, fontFamily: "'Fira Code', monospace" }}>{d.usage}%</div>
                        <div style={{ fontSize: 10, color: "#9e9578", fontWeight: 600 }}>{d.playerCount} pros</div>
                        {d.price && (
                          <a href={amazonLink(d.fullName)} target="_blank" rel="noopener noreferrer"
                            className="mt-2 px-3 py-1 rounded-full text-xs font-bold no-underline hover:scale-105 transition-all"
                            style={{ background: `${d.fill}15`, color: d.fill, border: `1px solid ${d.fill}25`, textDecoration: "none", fontSize: 11 }}>
                            ${d.price}
                          </a>
                        )}
                        {/* Rank watermark */}
                        <div className="absolute bottom-1 right-2 font-black opacity-[0.06]" style={{ fontSize: 80, lineHeight: 1, color: d.fill }}>#{rank}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Remaining 4-15 as compact cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {proUsageChart.slice(3).map((d, i) => {
                  const img = getHeadphoneImage(d.fullName);
                  const maxUsage = proUsageChart[0]?.usage || 1;
                  return (
                    <div key={d.name} className="rounded-xl p-3 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer group"
                      style={{ background: "#fff", border: "1px solid #e6e3d6" }}
                      onClick={() => { const m = headphones.find(mm => mm.name === d.fullName); if (m) navigateToHeadphone(m); }}>
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-black flex-shrink-0 mt-0.5" style={{ color: "#c4bfb8", fontFamily: "'Fira Code', monospace", width: 18 }}>#{i + 4}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-black truncate" style={{ color: "#1a1614" }}>{d.name}</div>
                          <div style={{ fontSize: 10, color: d.fill, fontWeight: 700 }}>{d.brand}</div>
                        </div>
                        {img && <img loading="lazy" src={img} alt={d.name} className="h-8 object-contain flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />}
                      </div>
                      {/* Mini bar */}
                      <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(d.usage / maxUsage) * 100}%`, background: `${d.fill}70` }} />
                      </div>
                      <div className="flex justify-between items-center mt-1.5">
                        <span className="text-xs font-black" style={{ color: d.fill }}>{d.usage}%</span>
                        {d.price && <span className="text-[10px] opacity-40">${d.price}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── QUICK INSIGHTS — Horizontal Stat Strip ── */}
            {(() => {
              const headphoneCounts = {};
              allPlayers.forEach(p => { if (p.headphone) headphoneCounts[p.headphone] = (headphoneCounts[p.headphone] || 0) + 1; });
              const topHeadphoneEntry = Object.entries(headphoneCounts).filter(([k]) => k && k !== "null").sort((a,b) => b[1]-a[1])[0];
              const lightest = [...headphones].sort((a,b) => a.weight - b.weight)[0];
              const uniqueBrands = new Set(allPlayers.map(p => { const m = headphones.find(mm => mm.name === p.headphone || (p.headphone && p.headphone.includes(mm.name))); return m?.brand; }).filter(Boolean));
              const playerWeights = allPlayers.map(p => { const m = headphones.find(mm => mm.name === p.headphone || (p.headphone && p.headphone.includes(mm.name))); return m?.weight; }).filter(Boolean);
              const avgProWeight = playerWeights.length ? Math.round(playerWeights.reduce((a,b) => a+b, 0) / playerWeights.length) : 0;
              const rtCount = headphones.filter(m => m.anc).length;
              const rtPct = Math.round((rtCount / headphones.length) * 100);
              const topPct = Math.round(topHeadphoneEntry[1]/allPlayers.length*100);
              const topName = topHeadphoneEntry[0].replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "");
              const lightName = lightest.name.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "");
              const topImg = getHeadphoneImage(topHeadphoneEntry[0]);
              const lightImg = getHeadphoneImage(lightest.name);
              return (
              <div className="my-4 sm:my-6 rounded-2xl overflow-hidden" style={{ background: "#faf8f5", border: "1px solid #e8e4db" }}>
                {/* Top row — featured stat with image */}
                <div className="flex items-center gap-4 p-4 sm:p-5" style={{ borderBottom: "1px solid #e8e4db" }}>
                  <div className="flex items-center justify-center rounded-xl shrink-0" style={{ width: 64, height: 64, background: "#fff", border: "1px solid #e8e4db" }}>
                    {topImg ? <img src={topImg} alt={topHeadphoneEntry[0]} className="h-12 object-contain" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))" }} /> : <span style={{ opacity: 0.3 }}>{icon("headphone", 28)}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: "#c9a22715", color: "#a68b1b" }}>Most Used</span>
                    </div>
                    <div className="text-base sm:text-lg font-black truncate" style={{ color: "#1a1614" }}>{topName}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#e8e4db" }}>
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${topPct}%`, background: "linear-gradient(90deg, #c9a227, #e6c44a)" }} />
                      </div>
                      <span className="text-xs font-bold shrink-0" style={{ color: "#c9a227" }}>{topPct}% of pros</span>
                    </div>
                  </div>
                  <a href={amazonLink(topHeadphoneEntry[0])} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold no-underline hover:scale-105 transition-all" style={{ background: "linear-gradient(135deg, #c9a227, #a68b1b)", color: "#fff", textDecoration: "none", boxShadow: "0 2px 8px #c9a22730" }}>{I.cart(12)} Buy</a>
                </div>

                {/* Bottom row — 4 compact stat cells */}
                <div className="grid grid-cols-2 sm:grid-cols-4">
                  {[
                    { label: "Brands", value: uniqueBrands.size, suffix: "", sub: "competing for pros", color: "#a68b1b", pct: Math.min(100, uniqueBrands.size * 8), iconEl: icon("signal", 16) },
                    { label: "Lightest", value: lightest.weight, suffix: "g", sub: lightName, color: "#4a8c3f", pct: Math.round((1 - lightest.weight / 500) * 100), iconEl: icon("wind", 16), buyLink: amazonLink(lightest.name) },
                    { label: "Avg Weight", value: avgProWeight, suffix: "g", sub: "across all pros", color: "#c9a227", pct: Math.round(avgProWeight / 5), iconEl: icon("gear", 16) },
                    { label: "ANC Rate", value: rtPct, suffix: "%", sub: `${rtCount} of ${headphones.length}`, color: "#9060c4", pct: rtPct, iconEl: icon("bolt", 16) },
                  ].map((s, si) => (
                    <div key={si} className="flex items-center gap-3 p-3 sm:p-4 transition-colors duration-200 hover:bg-white" style={{ borderRight: si < 3 ? "1px solid #e8e4db" : "none", borderTop: "none" }}>
                      <div className="shrink-0 relative" style={{ width: 40, height: 40 }}>
                        {/* Mini circular progress */}
                        <svg width="40" height="40" viewBox="0 0 40 40">
                          <circle cx="20" cy="20" r="16" fill="none" stroke="#e8e4db" strokeWidth="3" />
                          <circle cx="20" cy="20" r="16" fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round"
                            strokeDasharray={`${s.pct * 1.005} 100.5`}
                            transform="rotate(-90 20 20)"
                            style={{ transition: "stroke-dasharray 1.2s ease" }} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center" style={{ color: s.color, opacity: 0.8 }}>{s.iconEl}</div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9e9578", fontSize: 10, letterSpacing: "0.08em" }}>{s.label}</div>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-lg sm:text-xl font-black" style={{ color: "#1a1614", lineHeight: 1.1 }}>
                            <AnimatedCounter value={s.value} suffix={s.suffix} color="#1a1614" duration={1200 + si * 200} />
                          </span>
                        </div>
                        <div className="truncate" style={{ fontSize: 10, color: "#b5ae9e", lineHeight: 1.3 }}>{s.sub}</div>
                      </div>
                      {s.buyLink && <a href={s.buyLink} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold no-underline hover:scale-105 transition-all" style={{ background: "#c9a22712", color: "#c9a227", textDecoration: "none" }}>{I.cart(9)} Buy</a>}
                    </div>
                  ))}
                </div>
              </div>
              );
            })()}

            <SectionTitle color="#c9a227" sub="Select any headphone to explore specs, pro users, and performance data">Featured Headphone Spotlight</SectionTitle>
              <div className="rounded-2xl p-3 sm:p-5 mb-6" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                {/* ── Headphone Picker: Top 20 headphones by pro usage ── */}
                <div className="grid gap-1.5 mb-4" style={{ gridTemplateColumns: "repeat(8, 1fr)" }}>
                  {[...headphones].sort((a, b) => b.proUsage - a.proUsage).slice(0, 16).map(m => {
                    const bc = BRAND_COLORS[m.brand] || "#8a8460";
                    const isSelected = selectedHeadphone?.id === m.id;
                    const imgUrl = getHeadphoneImage(m.name);
                    return (
                      <button key={m.id} onClick={() => { setSpotlightImgError(false); setSelectedHeadphone(m); }}
                        className="group relative flex flex-col items-center p-2 rounded-xl transition-all duration-200 cursor-pointer"
                        style={{
                          background: isSelected ? `${bc}12` : "#faf8f5",
                          border: isSelected ? `2px solid ${bc}` : "2px solid transparent",
                          boxShadow: isSelected ? `0 4px 12px ${bc}20` : "0 1px 3px rgba(0,0,0,0.04)",
                        }}>
                        <div className="w-full h-16 flex items-center justify-center mb-1.5 rounded-lg overflow-hidden"
                          style={{ background: isSelected ? "#ffffff" : "#f0ece6" }}>
                          {imgUrl ? (
                            <img loading="lazy" src={imgUrl} alt={m.name} className="h-14 object-contain transition-transform duration-200 group-hover:scale-110"
                              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))" }} />
                          ) : (
                            <span style={{ opacity: 0.2 }}>{icon("headphone", 28)}</span>
                          )}
                        </div>
                        <div className="text-center w-full">
                          <div className="text-[10px] font-black leading-tight truncate" style={{ color: isSelected ? bc : "#4a4340" }}>
                            {m.name.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |Sony |JBL |ASUS |Audio-Technica |Turtle Beach |Audeze |EPOS |Cooler Master )/, "")}
                          </div>
                          <div className="text-[9px] mt-0.5" style={{ color: "#9e9578" }}>{m.proUsage}% pro use</div>
                        </div>
                        {isSelected && <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full" style={{ background: bc, boxShadow: `0 0 0 2px #ffffff` }} />}
                      </button>
                    );
                  })}
                </div>

                {selectedHeadphone && (() => {
                  const brandCol = BRAND_COLORS[selectedHeadphone.brand];
                  const imgUrl = getHeadphoneImage(selectedHeadphone.name);
                  return (
                  <>
                  {/* Compact dark preview card */}
                  <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(160deg, #0f0e0c 0%, #1a1814 100%)", border: `1px solid ${brandCol}20` }}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      {/* Left: Image + name */}
                      <div className="flex flex-col items-center justify-center p-6 relative">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div style={{ width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${brandCol}20 0%, transparent 70%)`, filter: "blur(30px)" }} />
                        </div>
                        {imgUrl && !spotlightImgError ? (
                          <img loading="lazy" src={imgUrl} alt={`${selectedHeadphone.name}`} className="relative z-10 w-full max-h-40 object-contain object-center mb-3" style={{ filter: `drop-shadow(0 12px 24px ${brandCol}30)` }}
                            onError={() => setSpotlightImgError(true)} />
                        ) : (
                          <div className="relative z-10 flex items-center justify-center" style={{ width: 150, height: 130, background: `${brandCol}15`, borderRadius: 16 }}>
                            <span>{icon("headphone", 70)}</span>
                          </div>
                        )}
                        <div className="relative z-10 text-lg font-black mt-2 text-center cursor-pointer hover:opacity-80 transition-all" style={{ color: "#f5f2e6" }} onClick={() => navigateToHeadphone(selectedHeadphone)}>{selectedHeadphone.name}</div>
                        <div className="text-xs mt-1" style={{ color: "#9e9578" }}>{selectedHeadphone.brand} · {selectedHeadphone.formFactor} · {selectedHeadphone.connectivity}</div>
                      </div>

                      {/* Center: Performance bars */}
                      <div className="p-5" style={{ borderLeft: "1px solid #ffffff08", borderRight: "1px solid #ffffff08" }}>
                        <div className="text-[9px] uppercase tracking-[0.2em] font-bold mb-3" style={{ color: brandCol }}>Performance</div>
                        <div className="space-y-2.5">
                          {radarData.map((rd, ri) => {
                            const barColors = { Comfort: "#22c55e", Sound: "#3b82f6", Isolation: "#8b5cf6", "Pro Pick": "#f59e0b", Rating: "#ef4444", Value: "#06b6d4" };
                            const bc = barColors[rd.stat] || brandCol;
                            const pct = Math.round(rd.value);
                            return (
                              <div key={ri}>
                                <div className="flex items-center justify-between mb-0.5">
                                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#9e9578" }}>{rd.stat}</span>
                                  <span className="text-xs font-black tabular-nums" style={{ color: bc }}>{pct}</span>
                                </div>
                                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
                                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${bc}80, ${bc})` }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: "1px solid #ffffff08" }}>
                          <a href={amazonLink(selectedHeadphone.name)} target="_blank" rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all hover:scale-105 no-underline"
                            style={{ background: brandCol, color: "#0f0e0c", textDecoration: "none" }}>
                            {I.cart(14, "#0f0e0c")} ${selectedHeadphone.price}
                          </a>
                          <button onClick={() => navigateToHeadphone(selectedHeadphone)} className="px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105" style={{ background: "#ffffff08", border: "1px solid #ffffff15", color: "#f5f2e6" }}>Full Page →</button>
                        </div>
                      </div>

                      {/* Right: Pro users */}
                      <div className="p-5">
                        <div className="text-[9px] uppercase tracking-[0.2em] font-bold mb-3" style={{ color: brandCol }}>Notable Pros</div>
                        {usedByPros.length > 0 ? (
                          <div className="space-y-2">
                            {usedByPros.slice(0, 4).map((p, i) => {
                              const gameColors = GAME_COLORS;
                              const gc = gameColors[p.game] || "#8a8460";
                              return (
                                <button key={i} onClick={() => { const pp = proPlayers.find(pp => pp.name === p.name); if (pp) { navigateToPlayer(pp); } else { setActiveTab("players"); } }}
                                  className="w-full flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all hover:scale-[1.02] text-left"
                                  style={{ background: `${gc}08`, border: `1px solid ${gc}12` }}>
                                  <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0" style={{ background: `${gc}15` }}>
                                    <Flag country={p.country} size={12} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-black" style={{ color: "#f5f2e6" }}>{p.name}</div>
                                    <div className="text-[10px]" style={{ color: "#9e9578" }}>{p.team}</div>
                                  </div>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: `${gc}20`, color: gc }}>{p.game}</span>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-xs py-6 text-center" style={{ color: "#9e9578" }}>No tracked pros</div>
                        )}
                      </div>
                    </div>
                  </div>
                  </>
                  );
                })()}
              </div>


            {/* Gear Check Callout */}
            {(() => {
              const hotHeadphone = gameBreakdown[1]?.topHeadphones[0]?.name || "Razer BlackShark V2 Pro";
              const hotGame = gameBreakdown[1]?.game || "Valorant";
              const hotPct = gameBreakdown[1]?.topHeadphones[0]?.pct || 30;
              const hm = headphones.find(m => m.name === hotHeadphone);
              const hmBrand = hm ? BRAND_COLORS[hm.brand] || "#c9a227" : "#c9a227";
              const hmImg = getHeadphoneImage(hotHeadphone);
              return (
                <div className="rounded-2xl p-5 my-6 relative overflow-hidden" style={{ background: "#ffffff", border: `1px solid ${hmBrand}20`, boxShadow: `0 2px 12px ${hmBrand}08` }}>
                  {/* Accent stripe */}
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${hmBrand}, ${hmBrand}50, transparent)` }} />
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Headphone image */}
                    {hmImg && (
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: `${hmBrand}08` }}>
                        <img loading="lazy" src={hmImg} alt={hotHeadphone} className="h-12 w-12 object-contain" style={{ filter: `drop-shadow(0 2px 6px ${hmBrand}25)` }} />
                      </div>
                    )}
                    {/* Info */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                        <span className="text-sm">🔥</span>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold px-2 py-0.5 rounded-full" style={{ background: `${hmBrand}12`, color: hmBrand, border: `1px solid ${hmBrand}20` }}>Trending Now</span>
                      </div>
                      <div className="text-sm font-black" style={{ color: "#1a1614" }}>{hotHeadphone}</div>
                      <div className="text-xs mt-0.5" style={{ color: "#7d6e1e" }}>Used by <span className="font-bold" style={{ color: hmBrand }}>{hotPct}%</span> of {hotGame} pros{hm ? ` · ${hm.weight}g · ${hm.driverType} · ${hm.connectivity}` : ""}</div>
                    </div>
                    {/* Buy button */}
                    <a href={amazonLink(hotHeadphone)} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-all hover:scale-105 no-underline flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${hmBrand}, ${hmBrand}cc)`, color: "#fff", textDecoration: "none", boxShadow: `0 3px 12px ${hmBrand}30` }}>
                      {I.cart(14, "#fff")} {hm ? `$${hm.price}` : "Buy"} on Amazon
                    </a>
                  </div>
                </div>
              );
            })()}

            {/* ══ Popular Comparisons — light themed matchup cards ══ */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: "#c9a227" }}>Popular Comparisons</div>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #c9a22730, transparent)" }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { a: "Razer BlackShark V2 Pro", b: "SteelSeries Arctis Nova Pro Wireless" },
                  { a: "Logitech G Pro X 2 Lightspeed", b: "Razer BlackShark V2 Pro" },
                  { a: "HyperX Cloud III Wireless", b: "SteelSeries Arctis Nova 7" },
                  { a: "Corsair HS80 RGB Wireless", b: "Logitech G Pro X 2 Lightspeed" },
                  { a: "beyerdynamic DT 990 Pro", b: "Sennheiser HD 560S" },
                ].map((c, ci) => {
                  const sa = c.a.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
                  const sb = c.b.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
                  const brandA = c.a.split(" ")[0];
                  const brandB = c.b.split(" ")[0];
                  const colA = BRAND_COLORS[brandA] || "#c9a227";
                  const colB = BRAND_COLORS[brandB] || "#c9a227";
                  const nameA = c.a.replace(/(Razer |SteelSeries |Logitech |HyperX |Corsair |beyerdynamic |Sennheiser )/, "");
                  const nameB = c.b.replace(/(Razer |SteelSeries |Logitech |HyperX |Corsair |beyerdynamic |Sennheiser )/, "");
                  const imgA = getHeadphoneImage(c.a);
                  const imgB = getHeadphoneImage(c.b);
                  return (
                    <a key={sa+sb} href={`/compare/${sa}-vs-${sb}`} className="group rounded-xl p-4 no-underline block transition-all duration-300 hover:scale-[1.02]"
                      style={{ background: "#f9f7f2", border: "1px solid #e6e3d6", textDecoration: "none" }}>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 text-center">
                          {imgA && <img loading="lazy" src={imgA} alt={nameA} className="h-10 mx-auto object-contain mb-1.5" style={{ filter: `drop-shadow(0 2px 6px ${colA}30)` }} />}
                          <div className="text-[10px] font-bold truncate" style={{ color: colA }}>{nameA}</div>
                        </div>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#c9a22715", border: "1px solid #c9a22730" }}>
                          <span className="text-[9px] font-black" style={{ color: "#c9a227" }}>VS</span>
                        </div>
                        <div className="flex-1 text-center">
                          {imgB && <img loading="lazy" src={imgB} alt={nameB} className="h-10 mx-auto object-contain mb-1.5" style={{ filter: `drop-shadow(0 2px 6px ${colB}30)` }} />}
                          <div className="text-[10px] font-bold truncate" style={{ color: colB }}>{nameB}</div>
                        </div>
                      </div>
                      <div className="text-center mt-2 text-[9px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#c9a227" }}>Compare →</div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* ══ Curated Collections — light themed category cards ══ */}
            <div className="rounded-2xl p-6 sm:p-8 mb-8" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
              <div className="text-center mb-8">
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2" style={{ color: "#c9a227" }}>Curated Collections</div>
                <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#1a1614" }}>Hand-picked guides for competitive players</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Tournament Favorites", sub: "The headphones winning major championships", href: "/best/tournament-favorites", accent: "#c9a227", tag: "Most Popular", icon: "🏆" },
                  { title: "Best ANC Headsets", sub: "Active noise cancellation for noisy LAN events", href: "/best/anc", accent: "#c02870", tag: "Trending", icon: "🔇" },
                  { title: "Best for Valorant", sub: "Top picks from professional Valorant players", href: "/best/valorant", accent: "#c43848", tag: "FPS", icon: "🎯" },
                  { title: "Budget Champions", sub: "Pro-grade audio performance under $100", href: "/best/budget", accent: "#0a8060", tag: "Value", icon: "💰" },
                  { title: "Wireless Freedom", sub: "Cutting the cord without cutting performance", href: "/best/wireless", accent: "#2874a6", tag: "Wireless", icon: "📡" },
                  { title: "Audiophile Grade", sub: "Open-back headphones for pristine sound staging", href: "/best/audiophile", accent: "#6d40c4", tag: "Hi-Fi", icon: "🎵" },
                ].map((c, i) => (
                  <a key={i} href={c.href} className="group relative rounded-xl overflow-hidden no-underline block transition-all duration-300 hover:scale-[1.03]"
                    style={{ background: `${c.accent}06`, border: `1px solid ${c.accent}18`, textDecoration: "none" }}>
                    {/* Top accent bar */}
                    <div className="h-1" style={{ background: `linear-gradient(90deg, ${c.accent}, ${c.accent}60)` }} />
                    <div className="p-5 sm:p-6">
                      <div className="absolute -right-2 -bottom-2 text-5xl opacity-[0.04] pointer-events-none">{c.icon}</div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{c.icon}</span>
                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full" style={{ background: `${c.accent}12`, color: c.accent, border: `1px solid ${c.accent}20` }}>{c.tag}</span>
                        <span className="ml-auto text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 -translate-x-2" style={{ color: c.accent }}>→</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black mb-1.5" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#1a1614" }}>{c.title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: "#7d6e1e" }}>{c.sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* ══ Newsletter CTA — light themed ══ */}
            <div className="rounded-2xl overflow-hidden mb-2 relative" style={{ background: "#ffffff", border: "1px solid #c9a22725" }}>
              {/* Decorative glow */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, #c9a22708 0%, transparent 60%)" }} />
              {/* Top accent line */}
              <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #c9a227, transparent)" }} />
              <div className="relative z-10 p-6 sm:p-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ background: "#c9a22710", border: "1px solid #c9a22720" }}>
                  <span className="text-base">📬</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#c9a227" }}>Newsletter</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black mb-2" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#1a1614" }}>Stay ahead of the meta</h3>
                <p className="text-sm max-w-md mx-auto mb-6" style={{ color: "#7d6e1e" }}>Pro gear changes, new headphone releases, and data-driven insights delivered to your inbox. No spam.</p>
                {newsletterStatus === "success" ? (
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl" style={{ background: "#22c55e10", border: "1px solid #22c55e25" }}>
                    <span className="text-lg">✓</span>
                    <span className="text-sm font-black" style={{ color: "#22c55e" }}>You're subscribed!</span>
                  </div>
                ) : (
                  <form className="flex gap-2 max-w-md mx-auto" onSubmit={async e => { e.preventDefault(); setNewsletterStatus("sending"); try { const res = await fetch("https://formspree.io/f/xvzbwrzv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: newsletterEmail }) }); setNewsletterStatus(res.ok ? "success" : "error"); } catch { setNewsletterStatus("error"); } }}>
                    <input type="email" required placeholder="your@email.com" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#f5f2e6", border: "1px solid #e6e3d6", color: "#1a1614" }} />
                    <button type="submit" disabled={newsletterStatus === "sending"} className="px-6 py-3 rounded-xl text-sm font-black transition-all hover:scale-105 disabled:opacity-50" style={{ background: "linear-gradient(135deg, #c9a227, #a68b1b)", color: "#fff", boxShadow: "0 4px 20px #c9a22730" }}>
                      {newsletterStatus === "sending" ? "..." : "Subscribe →"}
                    </button>
                  </form>
                )}
                {newsletterStatus === "error" && <div className="text-sm mt-3" style={{ color: "#ef4444" }}>Something went wrong. Try again.</div>}
                <div className="flex items-center justify-center gap-4 mt-5">
                  {["No spam ever", "Unsubscribe anytime", "Weekly digest"].map((t, i) => (
                    <span key={i} className="text-[10px] flex items-center gap-1" style={{ color: "#7d6e1e" }}>
                      <span style={{ color: "#c9a227" }}>✓</span> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ── HEADPHONE DETAIL PAGE ── */}
        {activeTab === "headphoneDetail" && selectedHeadphone && (() => {
          const brandCol = BRAND_COLORS[selectedHeadphone.brand];
          const imgUrl = getHeadphoneImage(selectedHeadphone.name);
          return (
          <div>
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mt-8 mb-4 flex items-center gap-1.5 text-sm">
              <a href="/" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Home</a>
              <span style={{ color: "#d4d0be" }}>›</span>
              <a href="/headphones" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Headphones</a>
              <span style={{ color: "#d4d0be" }}>›</span>
              <span style={{ color: brandCol }} className="font-bold opacity-70">{selectedHeadphone.name}</span>
            </nav>

            {/* Share buttons */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#9e9578" }}>Share</span>
              <button onClick={() => { navigator.clipboard.writeText(`https://esportsheadphones.com/headphones/${selectedHeadphone.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`); }} className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105" style={{ background: "#00000008", border: "1px solid #d4d0be", color: "#1a1614" }}>📋 Copy Link</button>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedHeadphone.name + " — " + selectedHeadphone.weight + "g, " + selectedHeadphone.proUsage + "% pro usage")}&url=${encodeURIComponent("https://esportsheadphones.com/headphones/" + selectedHeadphone.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""))}`} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#1da1f220", border: "1px solid #a68b1b30", color: "#1da1f2", textDecoration: "none" }}>𝕏 Tweet</a>
              <a href={`https://reddit.com/submit?url=${encodeURIComponent("https://esportsheadphones.com/headphones/" + selectedHeadphone.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""))}&title=${encodeURIComponent(selectedHeadphone.name + " — Pro Usage, Specs & Review")}`} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#c4737320", border: "1px solid #c4737330", color: "#ff4499", textDecoration: "none" }}>Reddit</a>
              <a href={`/contact?subject=correction&headphone=${encodeURIComponent(selectedHeadphone.name)}`} className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline ml-auto" style={{ background: "#0000000a", border: "1px solid #d4d0be", color: "#8a8460", textDecoration: "none" }}>⚠️ Suggest Correction</a>
            </div>

            {/* ══ HERO: Dark Immersive Banner ══ */}
            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "linear-gradient(160deg, #0f0e0c 0%, #1a1814 40%, #1f1c16 100%)", border: `1px solid ${brandCol}20` }}>
              {/* Top: Headphone showcase + Performance gauges side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left: Large hero image with glow */}
                <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-8 pb-4" style={{ minHeight: 320 }}>
                  {/* Radial glow behind headphone */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div style={{ width: 280, height: 280, borderRadius: "50%", background: `radial-gradient(circle, ${brandCol}25 0%, transparent 70%)`, filter: "blur(40px)" }} />
                  </div>
                  {imgUrl && !spotlightImgError ? (
                    <img loading="lazy" src={imgUrl} alt={`${selectedHeadphone.name} by ${selectedHeadphone.brand}`} className="relative z-10 w-full max-h-56 sm:max-h-72 object-contain object-center" style={{ filter: `drop-shadow(0 20px 40px ${brandCol}40)` }}
                      onError={() => setSpotlightImgError(true)} />
                  ) : (
                    <div className="relative z-10 flex items-center justify-center" style={{ width: 200, height: 180, background: `${brandCol}15`, borderRadius: 16 }}>
                      <span>{icon("headphone", 100)}</span>
                    </div>
                  )}
                  <div className="relative z-10 mt-4 text-center">
                    <div className="text-2xl sm:text-3xl font-black" style={{ color: "#f5f2e6" }}>{selectedHeadphone.name}</div>
                    <div className="text-sm mt-1" style={{ color: "#9e9578" }}>{selectedHeadphone.brand} · {selectedHeadphone.formFactor} · {selectedHeadphone.connectivity}</div>
                  </div>
                  {/* Price + Buy */}
                  <div className="relative z-10 flex items-center gap-3 mt-5 w-full max-w-xs">
                    <div className="text-3xl font-black" style={{ color: brandCol }}>${selectedHeadphone.price}</div>
                    <a href={amazonLink(selectedHeadphone.name)} target="_blank" rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black transition-all hover:scale-105 no-underline"
                      style={{ background: brandCol, color: "#0f0e0c", textDecoration: "none", boxShadow: `0 4px 20px ${brandCol}50` }}>
                      {I.cart(16, "#0f0e0c")} Buy on Amazon
                    </a>
                  </div>
                </div>

                {/* Right: Performance Dashboard — animated horizontal gauges */}
                <div className="lg:col-span-7 p-6 sm:p-8">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-5" style={{ color: brandCol }}>Performance Analysis</div>
                  <div className="space-y-4">
                    {radarData.map((rd, ri) => {
                      const barIcons = { Comfort: "☁️", Sound: "🔊", Isolation: "🛡️", "Pro Pick": "🏆", Rating: "⭐", Value: "💎" };
                      const barColors = { Comfort: "#22c55e", Sound: "#3b82f6", Isolation: "#8b5cf6", "Pro Pick": "#f59e0b", Rating: "#ef4444", Value: "#06b6d4" };
                      const bc = barColors[rd.stat] || brandCol;
                      const pct = Math.round(rd.value);
                      return (
                        <div key={ri}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{barIcons[rd.stat] || "📊"}</span>
                              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#d4c47a" }}>{rd.stat}</span>
                            </div>
                            <span className="text-lg font-black tabular-nums" style={{ color: bc }}>{pct}</span>
                          </div>
                          <div className="relative h-3 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
                            {/* Track marks */}
                            {[25, 50, 75].map(m => (
                              <div key={m} className="absolute top-0 bottom-0 w-px" style={{ left: `${m}%`, background: "#ffffff10" }} />
                            ))}
                            {/* Fill bar */}
                            <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${bc}90, ${bc})`, boxShadow: `0 0 12px ${bc}60` }} />
                            {/* Glow dot at end */}
                            <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ left: `calc(${pct}% - 4px)`, background: bc, boxShadow: `0 0 8px ${bc}` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Overall Score ring */}
                  {(() => {
                    const overall = Math.round(radarData.reduce((s, d) => s + d.value, 0) / radarData.length);
                    return (
                      <div className="flex items-center gap-5 mt-6 pt-5" style={{ borderTop: "1px solid #ffffff10" }}>
                        <div className="relative flex-shrink-0" style={{ width: 72, height: 72 }}>
                          <svg viewBox="0 0 72 72" className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
                            <circle cx="36" cy="36" r="30" fill="none" stroke="#ffffff08" strokeWidth="5" />
                            <circle cx="36" cy="36" r="30" fill="none" stroke={brandCol} strokeWidth="5" strokeLinecap="round"
                              strokeDasharray={`${(overall / 100) * 188.5} 188.5`} style={{ filter: `drop-shadow(0 0 6px ${brandCol}80)` }} />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-black" style={{ color: brandCol }}>{overall}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-black" style={{ color: "#f5f2e6" }}>Overall Score</div>
                          <div className="text-xs mt-0.5" style={{ color: "#9e9578" }}>
                            {overall >= 80 ? "Elite tier — top-performing headphone" : overall >= 60 ? "Strong performer across key metrics" : "Solid choice with room for improvement"}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Bottom: Quick spec pills */}
              <div className="flex flex-wrap items-center gap-2 px-6 sm:px-8 pb-6">
                {[
                  { label: "Weight", val: `${selectedHeadphone.weight}g`, icon: "⚖️" },
                  { label: "Driver", val: selectedHeadphone.driverType, icon: "🔈" },
                  { label: "Freq", val: `${selectedHeadphone.frequencyResponse >= 1000 ? `${selectedHeadphone.frequencyResponse / 1000}K` : selectedHeadphone.frequencyResponse}Hz`, icon: "〰️" },
                  { label: "Impedance", val: `${selectedHeadphone.impedance || 32}Ω`, icon: "⚡" },
                  { label: "ANC", val: selectedHeadphone.anc ? "Yes" : "No", icon: "🔇" },
                  { label: "Rating", val: `${selectedHeadphone.rating}/10`, icon: "📊" },
                ].map((s, si) => (
                  <div key={si} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs" style={{ background: "#ffffff08", border: "1px solid #ffffff10" }}>
                    <span>{s.icon}</span>
                    <span style={{ color: "#9e9578" }}>{s.label}</span>
                    <span className="font-bold" style={{ color: "#f5f2e6" }}>{s.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ Notable Pro Users — horizontal scrolling cards ══ */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: "linear-gradient(160deg, #141210 0%, #1a1814 100%)", border: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: brandCol }}>Notable Pro Users</div>
                <div className="text-xs" style={{ color: "#9e9578" }}>{usedByPros.length} pros tracked</div>
              </div>
              {usedByPros.length > 0 ? (
                <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin", scrollbarColor: `${brandCol}30 transparent` }}>
                  {usedByPros.slice(0, 8).map((p, i) => {
                    const gameColors = GAME_COLORS;
                    const gc = gameColors[p.game] || "#8a8460";
                    return (
                      <button key={i} onClick={() => { const pp = proPlayers.find(pp => pp.name === p.name); if (pp) { navigateToPlayer(pp); } else { setActiveTab("players"); } }}
                        className="flex-shrink-0 w-44 rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.03] text-left"
                        style={{ background: `linear-gradient(145deg, ${gc}12, ${gc}06)`, border: `1px solid ${gc}20` }}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${gc}20` }}>
                            <Flag country={p.country} size={14} />
                          </div>
                          <div className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase" style={{ background: `${gc}25`, color: gc }}>{p.game}</div>
                        </div>
                        <div className="text-sm font-black" style={{ color: "#f5f2e6" }}>{p.name}</div>
                        <div className="text-[11px] mt-0.5" style={{ color: "#9e9578" }}>{p.team}</div>
                        <div className="text-[10px] mt-1" style={{ color: gc }}>{p.role}</div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-sm py-8 text-center" style={{ color: "#9e9578" }}>No tracked pros currently using this headphone</div>
              )}
            </div>

            {/* ── Headphone Description ── */}
            {HEADPHONE_DESCRIPTIONS[selectedHeadphone.name] && (() => {
              const desc = HEADPHONE_DESCRIPTIONS[selectedHeadphone.name];
              const parts = [];
              if (desc.highlights && desc.highlights.length > 0) {
                const sorted = [...desc.highlights]
                  .map(h => ({ h, idx: desc.text.indexOf(h) }))
                  .filter(x => x.idx !== -1)
                  .sort((a, b) => a.idx - b.idx);
                let cursor = 0;
                sorted.forEach(({ h, idx }) => {
                  if (idx > cursor) parts.push({ text: desc.text.slice(cursor, idx), highlight: false });
                  parts.push({ text: h, highlight: true });
                  cursor = idx + h.length;
                });
                if (cursor < desc.text.length) parts.push({ text: desc.text.slice(cursor), highlight: false });
              } else {
                parts.push({ text: desc.text, highlight: false });
              }
              return (
                <div className="rounded-2xl p-6 mb-6" style={{ background: "linear-gradient(160deg, #141210 0%, #1a1814 100%)", border: `1px solid ${brandCol}15` }}>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3" style={{ color: brandCol }}>About This Headphone</div>
                  <p className="text-sm leading-relaxed" style={{ color: "#b0a89e" }}>
                    {parts.map((p, i) => p.highlight ? (
                      <span key={i} className="font-bold" style={{ color: brandCol }}>{p.text}</span>
                    ) : (
                      <span key={i}>{p.text}</span>
                    ))}
                  </p>
                </div>
              );
            })()}

            {/* ── Full Specifications — dark grid with visual bars ── */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: "linear-gradient(160deg, #141210 0%, #1a1814 100%)", border: "1px solid #ffffff08" }}>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-5" style={{ color: brandCol }}>Full Specifications</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {[
                  { label: "Brand", value: selectedHeadphone.brand, icon: "🏷️" },
                  { label: "Form Factor", value: selectedHeadphone.formFactor, icon: "🎧" },
                  { label: "Connectivity", value: selectedHeadphone.connectivity, icon: "📡" },
                  { label: "Weight", value: `${selectedHeadphone.weight}g`, icon: "⚖️", bar: Math.min(100, (selectedHeadphone.weight / 400) * 100) },
                  { label: "Driver", value: selectedHeadphone.driverType, icon: "🔈" },
                  { label: "Impedance", value: `${selectedHeadphone.impedance || 32}Ω`, icon: "⚡", bar: Math.min(100, ((selectedHeadphone.impedance || 32) / 300) * 100) },
                  { label: "Freq. Response", value: `${selectedHeadphone.frequencyResponse >= 1000 ? `${selectedHeadphone.frequencyResponse / 1000}K` : selectedHeadphone.frequencyResponse}Hz`, icon: "〰️", bar: Math.min(100, (selectedHeadphone.frequencyResponse / 50000) * 100) },
                  { label: "Price", value: `$${selectedHeadphone.price}`, icon: "💲", bar: Math.min(100, (selectedHeadphone.price / 400) * 100) },
                  { label: "Pro Usage", value: `${selectedHeadphone.proUsage}%`, icon: "🏆", bar: selectedHeadphone.proUsage },
                  { label: "Rating", value: `${selectedHeadphone.rating}/10`, icon: "⭐", bar: selectedHeadphone.rating * 10 },
                ].map((spec, idx) => (
                  <div key={idx} className="rounded-xl p-3 relative overflow-hidden" style={{ background: "#ffffff06", border: "1px solid #ffffff08" }}>
                    <div className="text-base mb-1">{spec.icon}</div>
                    <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "#9e9578" }}>{spec.label}</div>
                    <div className="text-sm font-black" style={{ color: "#f5f2e6" }}>{spec.value}</div>
                    {spec.bar !== undefined && (
                      <div className="mt-2 h-1 rounded-full" style={{ background: "#ffffff08" }}>
                        <div className="h-full rounded-full" style={{ width: `${spec.bar}%`, background: `linear-gradient(90deg, ${brandCol}80, ${brandCol})` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Intelligence Report — dark themed dossier ── */}
            {(() => {
              const headphonePlayers = allPlayers.filter(p => p.headphone && (p.headphone === selectedHeadphone.name || p.headphone.includes(selectedHeadphone.name.split(" ").slice(-2).join(" "))));
              const totalTracked = allPlayers.length;
              const marketShare = totalTracked > 0 ? ((headphonePlayers.length / totalTracked) * 100).toFixed(1) : 0;
              const gameDistro = {};
              headphonePlayers.forEach(p => { gameDistro[p.game] = (gameDistro[p.game] || 0) + 1; });
              const topGames = Object.entries(gameDistro).sort((a, b) => b[1] - a[1]);
              const gcols = { CS2: "#c47000", Valorant: "#c43848", LoL: "#c89b3c", Fortnite: "#3a60b0", "Overwatch 2": "#c48018", Apex: "#a82020", "Dota 2": "#b83c30", "R6 Siege": "#3a6ca0", "Rocket League": "#1478c4", "Call of Duty": "#3a8a3a", "Marvel Rivals": "#b81820", PUBG: "#c48a00", Deadlock: "#6d40c4", "Quake Champions": "#a83c00" };
              const countryCounts = {};
              headphonePlayers.forEach(p => { if (p.country) countryCounts[p.country] = (countryCounts[p.country] || 0) + 1; });
              const topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);
              const teamCounts = {};
              headphonePlayers.forEach(p => { if (p.team && p.team !== "Content" && p.team !== "Inactive") teamCounts[p.team] = (teamCounts[p.team] || 0) + 1; });
              const topTeams = Object.entries(teamCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
              const allHeadphoneCounts = {};
              allPlayers.forEach(p => { if (p.headphone) allHeadphoneCounts[p.headphone] = (allHeadphoneCounts[p.headphone] || 0) + 1; });
              const ranked = Object.entries(allHeadphoneCounts).sort((a, b) => b[1] - a[1]);
              const rank = ranked.findIndex(([name]) => name === selectedHeadphone.name || name.includes(selectedHeadphone.name.split(" ").slice(-2).join(" "))) + 1;
              const competitors = headphones.filter(m => m.id !== selectedHeadphone.id && m.formFactor === selectedHeadphone.formFactor && m.connectivity === selectedHeadphone.connectivity)
                .sort((a, b) => b.proUsage - a.proUsage).slice(0, 4);

              if (headphonePlayers.length === 0) return <div className="rounded-2xl p-8 text-center text-sm mb-6" style={{ background: "#141210", color: "#9e9578", border: "1px solid #ffffff08" }}>No tracked players found for this headphone in our database</div>;

              return (
                <div className="space-y-4 mb-6">
                  {/* Hero Stats Banner */}
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "linear-gradient(160deg, #141210 0%, #1a1814 100%)", border: `1px solid ${brandCol}15` }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: brandCol }}>Intelligence Report</div>
                      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${brandCol}30, transparent)` }} />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black mb-2" style={{ color: "#f5f2e6" }}>
                      {selectedHeadphone.name.replace(selectedHeadphone.brand + " ", "")}
                    </h2>
                    <div className="text-sm mb-6" style={{ color: "#9e9578" }}>
                      A {selectedHeadphone.connectivity === "Wireless" ? "wireless" : "wired"} {selectedHeadphone.formFactor} with {selectedHeadphone.driverType} drivers. Chosen by {headphonePlayers.length} tracked esports professionals across {topGames.length} competitive titles.
                    </div>

                    {/* Big stat cards */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Pro Users", value: headphonePlayers.length, icon: "👥", color: "#22c55e" },
                        { label: "Market Share", value: `${marketShare}%`, icon: "📊", color: "#3b82f6" },
                        { label: "Popularity Rank", value: `#${rank}`, icon: "🏅", color: "#f59e0b" },
                      ].map((st, si) => (
                        <div key={si} className="rounded-xl p-4 text-center relative overflow-hidden" style={{ background: `${st.color}08`, border: `1px solid ${st.color}15` }}>
                          <div className="absolute top-2 right-3 text-2xl opacity-20">{st.icon}</div>
                          <div className="text-2xl sm:text-3xl font-black" style={{ color: st.color }}>{st.value}</div>
                          <div className="text-[10px] uppercase tracking-wider mt-1" style={{ color: "#9e9578" }}>{st.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Game Usage — visual bar breakdown */}
                  {topGames.length > 0 && (
                    <div className="rounded-2xl p-6" style={{ background: "linear-gradient(160deg, #141210 0%, #1a1814 100%)", border: "1px solid #ffffff08" }}>
                      <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-5" style={{ color: brandCol }}>Game Distribution</div>
                      <div className="space-y-3">
                        {topGames.slice(0, 6).map(([game, count]) => {
                          const gc = gcols[game] || "#8a8460";
                          const pct = ((count / headphonePlayers.length) * 100).toFixed(0);
                          return (
                            <div key={game}>
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  {GAME_IMAGE_URLS[game] && <img loading="lazy" src={GAME_IMAGE_URLS[game]} alt={game} className="w-5 h-5 rounded object-cover" />}
                                  <span className="text-xs font-bold" style={{ color: "#f5f2e6" }}>{game}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold tabular-nums" style={{ color: gc }}>{pct}%</span>
                                  <span className="text-[10px]" style={{ color: "#9e9578" }}>({count} pros)</span>
                                </div>
                              </div>
                              <div className="h-2 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
                                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${gc}80, ${gc})`, boxShadow: `0 0 8px ${gc}40` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Global Reach + Top Teams side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Global Reach */}
                    {topCountries.length > 0 && (
                      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(160deg, #141210 0%, #1a1814 100%)", border: "1px solid #ffffff08" }}>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4" style={{ color: brandCol }}>Global Reach</div>
                        <div className="space-y-2">
                          {topCountries.map(([flag, count]) => {
                            const pct = ((count / headphonePlayers.length) * 100).toFixed(0);
                            return (
                              <div key={flag} className="flex items-center gap-3">
                                <div className="w-8 h-6 flex items-center justify-center rounded" style={{ background: "#ffffff08" }}>
                                  <Flag country={flag} size={18} />
                                </div>
                                <div className="flex-1">
                                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
                                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: brandCol }} />
                                  </div>
                                </div>
                                <span className="text-xs font-bold tabular-nums" style={{ color: "#f5f2e6", minWidth: 24, textAlign: "right" }}>{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Top Teams */}
                    {topTeams.length > 0 && (
                      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(160deg, #141210 0%, #1a1814 100%)", border: "1px solid #ffffff08" }}>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4" style={{ color: brandCol }}>Top Teams</div>
                        <div className="space-y-2">
                          {topTeams.map(([team, count], ti) => {
                            const medals = ["🥇", "🥈", "🥉"];
                            return (
                              <div key={team} className="flex items-center gap-3 p-2.5 rounded-lg" style={{ background: "#ffffff06", border: "1px solid #ffffff08" }}>
                                <span className="text-lg">{medals[ti] || `${ti + 1}.`}</span>
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  {getTeamLogo(team) && <img loading="lazy" src={getTeamLogo(team)} alt={team} className="w-5 h-5 rounded object-contain" />}
                                  <span className="text-xs font-bold truncate" style={{ color: "#f5f2e6" }}>{team}</span>
                                </div>
                                <span className="text-xs font-bold" style={{ color: brandCol }}>{count} players</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rivals — head-to-head comparison cards */}
                  {competitors.length > 0 && (
                    <div className="rounded-2xl p-6" style={{ background: "linear-gradient(160deg, #141210 0%, #1a1814 100%)", border: "1px solid #ffffff08" }}>
                      <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-5" style={{ color: brandCol }}>Rivals & Alternatives</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {competitors.map(c => {
                          const cc = BRAND_COLORS[c.brand] || "#8a8460";
                          const cImg = getHeadphoneImage(c.name);
                          return (
                            <button key={c.id} onClick={() => { setSelectedHeadphone(c); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                              className="rounded-xl p-4 text-left transition-all hover:scale-[1.02] cursor-pointer"
                              style={{ background: `linear-gradient(145deg, ${cc}10, ${cc}05)`, border: `1px solid ${cc}20` }}>
                              <div className="flex items-center gap-3">
                                {cImg && <img loading="lazy" src={cImg} alt={c.name} className="h-12 w-12 object-contain flex-shrink-0" style={{ filter: `drop-shadow(0 4px 8px ${cc}30)` }} />}
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-black truncate" style={{ color: "#f5f2e6" }}>{c.name.replace(c.brand + " ", "")}</div>
                                  <div className="text-[10px] mt-0.5" style={{ color: cc }}>{c.brand}</div>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 mt-3">
                                <div className="text-center rounded-lg py-1" style={{ background: "#ffffff06" }}>
                                  <div className="text-xs font-bold" style={{ color: "#f5f2e6" }}>{c.weight}g</div>
                                  <div className="text-[9px]" style={{ color: "#9e9578" }}>Weight</div>
                                </div>
                                <div className="text-center rounded-lg py-1" style={{ background: "#ffffff06" }}>
                                  <div className="text-xs font-bold" style={{ color: "#f5f2e6" }}>${c.price}</div>
                                  <div className="text-[9px]" style={{ color: "#9e9578" }}>Price</div>
                                </div>
                                <div className="text-center rounded-lg py-1" style={{ background: "#ffffff06" }}>
                                  <div className="text-xs font-bold" style={{ color: "#f5f2e6" }}>{c.proUsage}%</div>
                                  <div className="text-[9px]" style={{ color: "#9e9578" }}>Pro Use</div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── All Pro Players Using This Headphone ── */}
            {usedByPros.length > 8 && (
              <div className="rounded-2xl p-6 mb-6" style={{ background: "linear-gradient(160deg, #141210 0%, #1a1814 100%)", border: "1px solid #ffffff08" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: brandCol }}>All Pro Players</div>
                  <div className="text-xs" style={{ color: "#9e9578" }}>{usedByPros.length} total</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {usedByPros.slice(8).map((p, i) => {
                    const gameColors = GAME_COLORS;
                    const gc = gameColors[p.game] || "#8a8460";
                    return (
                      <button key={i} onClick={() => { const pp = proPlayers.find(pp => pp.name === p.name); if (pp) { navigateToPlayer(pp); } }}
                        className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm transition-all hover:scale-[1.01] cursor-pointer"
                        style={{ background: `${gc}08`, border: `1px solid ${gc}12` }}>
                        <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ background: `${gc}15` }}>
                          <Flag country={p.country} size={12} />
                        </div>
                        <span className="font-bold truncate" style={{ color: "#f5f2e6" }}>{p.name}</span>
                        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: `${gc}20`, color: gc }}>{p.game}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Recently Viewed */}
          {(() => {
            try {
              const recent = JSON.parse(sessionStorage.getItem("recentHeadphones") || "[]").filter(n => n !== selectedHeadphone.name);
              if (recent.length === 0) return null;
              const recentHeadphones = recent.map(n => headphones.find(m => m.name === n)).filter(Boolean).slice(0, 4);
              if (recentHeadphones.length === 0) return null;
              return (
                <div className="rounded-2xl p-6 mb-6" style={{ background: "linear-gradient(160deg, #141210 0%, #1a1814 100%)", border: "1px solid #ffffff08" }}>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4" style={{ color: brandCol }}>Recently Viewed</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {recentHeadphones.map((m, i) => {
                      const bc = BRAND_COLORS[m.brand] || "#8a8460";
                      return (
                        <button key={i} onClick={() => navigateToHeadphone(m)} className="rounded-xl p-4 text-center transition-all hover:scale-[1.03] cursor-pointer" style={{ background: `${bc}08`, border: `1px solid ${bc}15` }}>
                          {getHeadphoneImage(m.name) && <img loading="lazy" src={getHeadphoneImage(m.name)} alt={m.name} className="h-12 mx-auto object-contain mb-2" style={{ filter: `drop-shadow(0 4px 8px ${bc}30)` }} />}
                          <div className="text-xs font-bold truncate" style={{ color: "#f5f2e6" }}>{m.name.replace(m.brand + " ", "")}</div>
                          <div className="mt-0.5" style={{ fontSize: 10, color: "#9e9578" }}>{m.weight}g · ${m.price}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            } catch { return null; }
          })()}

          {/* Sticky buy bar — dark theme */}
          <div className="fixed bottom-0 left-0 right-0 z-[80] md:hidden" style={{ background: "#0f0e0cf0", borderTop: `1px solid ${brandCol}30`, backdropFilter: "blur(20px)" }}>
            <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black truncate" style={{ color: "#f5f2e6" }}>{selectedHeadphone.name}</div>
                <div style={{ fontSize: 11, color: "#9e9578" }}>{selectedHeadphone.weight}g · {selectedHeadphone.driverType}</div>
              </div>
              <a href={amazonLink(selectedHeadphone.name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg font-black text-sm transition-all no-underline flex-shrink-0" style={{ background: brandCol, color: "#0f0e0c", textDecoration: "none", boxShadow: `0 2px 12px ${brandCol}50` }}>
                {I.cart(14, "#0f0e0c")} ${selectedHeadphone.price}
              </a>
            </div>

            {/* Suggest correction + best-of links */}
            <div className="flex flex-wrap items-center gap-3 px-4 mt-1 mb-2">
              <a href="/contact" className="text-xs hover:opacity-80 transition-all no-underline" style={{ color: "#9e9578", textDecoration: "none" }}>📝 Suggest a correction</a>
              <span style={{ color: "#ffffff10" }}>·</span>
              <a href="/best/cs2" className="text-xs hover:opacity-80 transition-all no-underline" style={{ color: "#c47000", textDecoration: "none" }}>Best for CS2</a>
              <a href="/best/valorant" className="text-xs hover:opacity-80 transition-all no-underline" style={{ color: "#c43848", textDecoration: "none" }}>Best for Valorant</a>
              <a href="/best/fortnite" className="text-xs hover:opacity-80 transition-all no-underline" style={{ color: "#4c7bd9", textDecoration: "none" }}>Best for Fortnite</a>
              <a href="/best/wireless" className="text-xs hover:opacity-80 transition-all no-underline" style={{ color: "#c9a227", textDecoration: "none" }}>Best Wireless</a>
              <a href="/best/lightweight" className="text-xs hover:opacity-80 transition-all no-underline" style={{ color: "#7d6e1e", textDecoration: "none" }}>Best Lightweight</a>
            </div>
          </div>
          </div>
          );
        })()}
        {/* ── GAMES TAB ── */}
        {activeTab === "games" && !gameDetailSlug && (
          <div>
            <SectionTitle color="#c44040" sub="Click any game to see full headphone usage data, player settings, brand splits, and sensitivity analysis">Game Profiles</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gameBreakdown.map((g, i) => {
                const gameColors = GAME_COLORS;
                const col = gameColors[g.game] || "#8a8460";
                const gSlug = g.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
                const topHpName = (g.topHeadphones[0]?.name || "").replace(/(Razer |HyperX |Logitech |SteelSeries |Corsair |beyerdynamic |ASUS |Sennheiser |Sony |Turtle Beach |ASTRO |JBL |Audeze |EPOS )/, "");
                const topHpImg = getHeadphoneImage(g.topHeadphones[0]?.name || "");
                const wiredPct = 100 - g.wirelessPct;
                return (
                  <div key={i}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                    style={{ background: "#ffffff", border: `1px solid ${col}18`, boxShadow: `0 2px 8px ${col}08` }}
                    onClick={() => { window.location.href = `/games/${gSlug}`; }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${col}18, 0 0 0 1px ${col}30`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 2px 8px ${col}08`; }}
                  >
                    {/* Top banner with game color gradient */}
                    <div className="relative h-28 overflow-hidden" style={{ background: `linear-gradient(135deg, ${col}20 0%, ${col}08 100%)` }}>
                      {/* Large faded game icon background */}
                      <div className="absolute -right-4 -top-4 opacity-[0.06]" style={{ transform: "rotate(12deg)" }}>
                        {GAME_IMAGE_URLS[g.game] ? <img loading="lazy" src={GAME_IMAGE_URLS[g.game]} alt="" className="w-32 h-32 object-contain" /> : null}
                      </div>
                      {/* Game logo + name */}
                      <div className="absolute top-4 left-4 flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.9)", boxShadow: `0 2px 8px ${col}20` }}>
                          {GAME_IMAGE_URLS[g.game] ? <img loading="lazy" src={GAME_IMAGE_URLS[g.game]} alt={g.game} className="h-6 w-6 object-contain" /> : <span>{icon(g.icon, 22)}</span>}
                        </div>
                        <div>
                          <div className="text-lg font-black leading-tight" style={{ color: col }}>{g.game}</div>
                          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: `${col}90` }}>{g.players} pros tracked</div>
                        </div>
                      </div>
                      {/* Top headphone image floating on right */}
                      {topHpImg && (
                        <div className="absolute right-3 bottom-1 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                          <img loading="lazy" src={topHpImg} alt={topHpName} className="h-20 object-contain drop-shadow-lg" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }} />
                        </div>
                      )}
                    </div>

                    {/* Stats section */}
                    <div className="px-4 py-3">
                      {/* Top 3 headphones bar chart */}
                      <div className="mb-3">
                        <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "#9e9578" }}>Top Headphones</div>
                        <div className="space-y-1.5">
                          {g.topHeadphones.slice(0, 3).map((hp, j) => {
                            const hpShort = hp.name.replace(/(Razer |HyperX |Logitech |SteelSeries |Corsair |beyerdynamic |ASUS |Sennheiser |Sony |Turtle Beach |ASTRO |JBL |Audeze |EPOS )/, "");
                            return (
                              <div key={j} className="flex items-center gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-black" style={{ color: j === 0 ? col : "#7d6e1e" }}>{hpShort}</span>
                                  </div>
                                  <div className="h-1.5 rounded-full overflow-hidden mt-0.5" style={{ background: `${col}10` }}>
                                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${hp.pct * 2.5}%`, background: j === 0 ? col : `${col}60` }} />
                                  </div>
                                </div>
                                <span className="text-[10px] font-black flex-shrink-0" style={{ color: j === 0 ? col : "#9e9578" }}>{hp.pct}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Bottom stats row */}
                      <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid #f0ece6" }}>
                        <div className="flex-1 text-center">
                          <div className="text-sm font-black" style={{ color: "#2d2824" }}>{g.avgWeight}g</div>
                          <div className="text-[9px] uppercase tracking-wider" style={{ color: "#9e9578" }}>Avg Weight</div>
                        </div>
                        <div className="w-px h-6" style={{ background: "#e6e3d6" }} />
                        <div className="flex-1 text-center">
                          <div className="text-sm font-black" style={{ color: col }}>{g.wirelessPct}%</div>
                          <div className="text-[9px] uppercase tracking-wider" style={{ color: "#9e9578" }}>Wireless</div>
                        </div>
                        <div className="w-px h-6" style={{ background: "#e6e3d6" }} />
                        <div className="flex-1 text-center">
                          <div className="text-sm font-black" style={{ color: "#2d2824" }}>{g.headphoneCount}</div>
                          <div className="text-[9px] uppercase tracking-wider" style={{ color: "#9e9578" }}>Models</div>
                        </div>
                      </div>
                    </div>

                    {/* Explore button footer */}
                    <div className="px-4 pb-3">
                      <div className="w-full py-2 rounded-lg text-center text-[11px] font-bold uppercase tracking-wider transition-all duration-200"
                        style={{ background: `${col}0a`, color: col, border: `1px solid ${col}15` }}>
                        Explore {g.game} →
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── GAME DETAIL VIEW ── */}
        {activeTab === "games" && gameDetailSlug && (() => {
          const gameColorMap = GAME_COLORS;
          const slugToGame = {};
          Object.keys(gameColorMap).forEach(g => { slugToGame[g.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")] = g; });
          const gameName = slugToGame[gameDetailSlug];
          if (!gameName) return <div className="text-center py-20 opacity-40">Game not found</div>;
          const col = gameColorMap[gameName];
          const gb = gameBreakdown.find(g => g.game === gameName);
          const gamePlayers = allPlayers.filter(p => p.game === gameName);
          const featuredPlayers = proPlayers.filter(p => p.game === gameName);

          // Headphone usage stats
          const headphoneCounts = {};
          gamePlayers.forEach(p => { if (p.headphone) { headphoneCounts[p.headphone] = (headphoneCounts[p.headphone] || 0) + 1; } });
          const headphoneRanking = Object.entries(headphoneCounts).sort((a, b) => b[1] - a[1]);
          const totalPlayers = gamePlayers.length;

          // Brand stats
          const brandCounts = {};
          gamePlayers.forEach(p => {
            const m = headphones.find(mm => mm.name === p.headphone || (p.headphone && p.headphone.includes(mm.name)));
            if (m) brandCounts[m.brand] = (brandCounts[m.brand] || 0) + 1;
          });
          const brandRanking = Object.entries(brandCounts).sort((a, b) => b[1] - a[1]);
          const totalBranded = brandRanking.reduce((a, b) => a + b[1], 0);


          // Weight stats
          const weights = gamePlayers.map(p => { const m = headphones.find(mm => mm.name === p.headphone || (p.headphone && p.headphone.includes(mm.name))); return m?.weight; }).filter(Boolean);
          const avgWeight = weights.length ? Math.round(weights.reduce((a, b) => a + b, 0) / weights.length) : 0;
          const lightPct = weights.length ? Math.round(weights.filter(w => w < 300).length / weights.length * 100) : 0;
          const midPct = weights.length ? Math.round(weights.filter(w => w >= 300 && w < 350).length / weights.length * 100) : 0;
          const heavyPct = weights.length ? Math.round(weights.filter(w => w >= 350).length / weights.length * 100) : 0;

          // Shape preference
          const shapes = gamePlayers.map(p => { const m = headphones.find(mm => mm.name === p.headphone || (p.headphone && p.headphone.includes(mm.name))); return m?.formFactor; }).filter(Boolean);
          const symPct = shapes.length ? Math.round(shapes.filter(s => s === "Symmetrical").length / shapes.length * 100) : 50;
          const ergoPct = 100 - symPct;

          // Wireless stats
          const connTypes = gamePlayers.map(p => { const m = headphones.find(mm => mm.name === p.headphone || (p.headphone && p.headphone.includes(mm.name))); return m?.connectivity; }).filter(Boolean);
          const wirelessPct = connTypes.length ? Math.round(connTypes.filter(c => c === "Wireless").length / connTypes.length * 100) : 0;

          // Frequency response distribution
          const hzGroups = {};
          gamePlayers.forEach(p => {
            const hz = p.hz;
            const label = hz >= 4000 ? "4K+" : hz >= 2000 ? "2K" : hz >= 1000 ? "1K" : `${hz}`;
            hzGroups[label] = (hzGroups[label] || 0) + 1;
          });
          const hzRanking = Object.entries(hzGroups).sort((a, b) => b[1] - a[1]);

          // Team stats
          const teamCounts = {};
          gamePlayers.forEach(p => { if (p.team && p.team !== "—") teamCounts[p.team] = (teamCounts[p.team] || 0) + 1; });
          const topTeams = Object.entries(teamCounts).sort((a, b) => b[1] - a[1]).slice(0, 12);


          // Headphone usage chart data
          const headphoneChartData = headphoneRanking.slice(0, 10).map(([name, count]) => ({
            name: name.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, ""),
            fullName: name,
            usage: Math.round(count / totalPlayers * 100),
            count,
          }));

          // Brand chart data
          const brandChartData = brandRanking.slice(0, 6).map(([name, count]) => ({
            name,
            usage: Math.round(count / totalBranded * 100),
            count,
            fill: BRAND_COLORS[name] || "#8a8460",
          }));

          // Role breakdown (if roles exist)
          const roleCounts = {};
          gamePlayers.forEach(p => { if (p.role && p.role !== "—") { let r = p.role; if (gameName === "CS2") { if (r === "Sniper") r = "AWPer"; else if (r === "AWPer/IGL" || r === "Rifler/IGL") r = "IGL"; else if (r === "Entry" || r === "Lurker" || r === "Support") r = "Rifler"; } roleCounts[r] = (roleCounts[r] || 0) + 1; } });
          const roleRanking = Object.entries(roleCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

          return (
          <div>
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mt-4 mb-4 flex items-center gap-1.5 text-sm">
              <a href="/" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Home</a>
              <span style={{ color: "#d4d0be" }}>›</span>
              <a href="/games" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Games</a>
              <span style={{ color: "#d4d0be" }}>›</span>
              <span style={{ color: col }} className="font-bold opacity-70">{gameName}</span>
            </nav>

            {/* ── HERO SECTION ── */}
            <div className="rounded-2xl p-6 sm:p-8 mb-6 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${col}12, ${col}04)`, border: `1px solid ${col}20` }}>
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5" style={{ background: `radial-gradient(circle, ${col}, transparent)`, transform: "translate(30%, -30%)" }} />
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
                {GAME_IMAGE_URLS[gameName] && <img loading="lazy" src={GAME_IMAGE_URLS[gameName]} alt={gameName} className="h-16 w-16 sm:h-20 sm:w-20 object-contain" />}
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-4xl tracking-tight mb-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, color: col }}>{gameName}</h1>
                  <div className="text-sm opacity-50">{totalPlayers} professional players tracked · Headphone & settings database</div>
                  <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-lg text-xs font-bold" style={{ background: `${col}08`, border: `1px solid ${col}15`, color: `${col}60`, cursor: "default" }}>📖 Best Headphone Guide — Coming Soon</span>
                </div>
                {headphoneRanking[0] && (() => { const topM = headphones.find(mm => mm.name === headphoneRanking[0][0] || headphoneRanking[0][0].includes(mm.name)); return (
                  <a href={amazonLink(headphoneRanking[0][0])} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all hover:scale-105 no-underline flex-shrink-0" style={{ background: "#c9a22714", border: "1px solid #c9a22725", textDecoration: "none" }}>
                    {getHeadphoneImage(headphoneRanking[0][0]) && <img loading="lazy" src={getHeadphoneImage(headphoneRanking[0][0])} alt="" className="h-8 object-contain" />}
                    <div>
                      <div className="text-xs font-bold" style={{ color: "#c9a227" }}>#1 Headphone</div>
                      <div className="text-xs font-black" style={{ color: "#1a1614" }}>{headphoneRanking[0][0].replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</div>
                    </div>
                    <span className="text-sm font-black px-2 py-1 rounded-lg" style={{ background: "#c9a227", color: "#1a1614" }}>{topM ? `$${topM.price}` : "Buy"}</span>
                  </a>
                ); })()}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                {[
                  { label: "Players", value: totalPlayers, icon: "player" },
                  { label: "Avg Weight", value: `${avgWeight}g`, icon: "wind" },
                  { label: "Wireless", value: `${wirelessPct}%`, icon: "signal" },
                  { label: "Avg Freq. Response", value: gb ? `${gb.avgPollRate >= 1000 ? `${(gb.avgPollRate/1000).toFixed(1)}K` : gb.avgPollRate}Hz` : "—", icon: "gear" },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl px-3 py-2.5 text-center" style={{ background: `${col}10`, border: `1px solid ${col}10` }}>
                    <div className="text-lg sm:text-xl font-black" style={{ color: col }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: "#9e9578", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── GAME DESCRIPTION ── */}
            {GAME_DESCRIPTIONS[gameName] && (
              <div className="rounded-2xl p-5 sm:p-6 mb-6" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: col }}>Game Analysis</div>
                <p className="text-sm leading-relaxed" style={{ color: "#3d3530" }}>{GAME_DESCRIPTIONS[gameName]}</p>
              </div>
            )}

            {/* ── HEADPHONE USAGE RANKINGS ── */}
            <SectionTitle color={col} sub={`Which headphones ${gameName} professionals trust to compete at the highest level`} style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>Headphone Usage Rankings</SectionTitle>
            {/* #1 Headphone highlight CTA */}
            {headphoneRanking[0] && (() => {
              const topName = headphoneRanking[0][0];
              const topPct = Math.round(headphoneRanking[0][1] / totalPlayers * 100);
              const topM = headphones.find(mm => mm.name === topName || topName.includes(mm.name));
              return (
                <div className="rounded-xl p-4 mb-4 flex flex-col sm:flex-row items-center gap-4" style={{ background: `${col}08`, border: `1px solid ${col}20` }}>
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <div className="text-xs uppercase tracking-widest font-bold" style={{ color: "#9e9578" }}>#1 Headphone in {gameName}</div>
                      <div className="text-base font-black" style={{ color: col }}>{topName}</div>
                      <div className="text-xs opacity-40">{topPct}% of pros{topM ? ` · ${topM.weight}g · ${topM.driverType}` : ""}</div>
                    </div>
                  </div>
                  <a href={amazonLink(topName)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all hover:scale-105 no-underline" style={{ background: "#c9a227", color: "#1a1614", textDecoration: "none", fontSize: 14 }}>
                    {I.cart(16, "#1a1614")} Buy on Amazon{topM ? ` — $${topM.price}` : ""}
                  </a>
                </div>
              );
            })()}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Bar chart */}
              <div className="rounded-2xl p-4 sm:p-6" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={headphoneChartData} margin={{ top: 10, right: 20, left: 0, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e6e3d6" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "#9e9578", fontSize: 11 }} angle={-40} textAnchor="end" interval={0} tickLine={false} axisLine={{ stroke: '#e6e3d6' }} />
                    <YAxis tick={{ fill: "#9e9578", fontSize: 11 }} unit="%" tickLine={false} axisLine={{ stroke: '#e6e3d6' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="usage" radius={[6, 6, 0, 0]} name="Usage %" label={{ position: "top", fill: "#8a8460", fontSize: 11, formatter: (v) => `${v}%` }}>
                      {headphoneChartData.map((entry, i) => <Cell key={i} fill={i === 0 ? col : `${col}${i < 3 ? "80" : "40"}`} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Full ranking table */}
              <div className="rounded-2xl p-4 sm:p-6" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9578" }}>Full Headphone Rankings</div>
                <div className="max-h-[320px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: `${col}30 transparent` }}>
                  <div className="space-y-1.5">
                    {headphoneRanking.slice(0, 20).map(([name, count], i) => {
                      const pct = Math.round(count / totalPlayers * 100);
                      const m = headphones.find(mm => mm.name === name || name.includes(mm.name));
                      return (
                        <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all hover:bg-stone-100" style={{ background: i === 0 ? `${col}08` : "transparent" }}>
                          <span className="w-5 text-center font-black text-xs" style={{ color: i < 3 ? col : "#9e9578" }}>{i + 1}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold truncate" style={{ color: i === 0 ? col : "#2d2824" }}>{name}</span>
                              {m && <span className="text-xs px-1.5 rounded" style={{ background: `${BRAND_COLORS[m.brand] || "#8a8460"}15`, color: BRAND_COLORS[m.brand] || "#8a8460", fontSize: 10 }}>{m.weight}g</span>}
                            </div>
                          </div>
                          <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                            <div className="h-full rounded-full" style={{ width: `${(pct / headphoneRanking[0][1] * totalPlayers / 100) * 100}%`, background: i === 0 ? col : `${col}50` }} />
                          </div>
                          <span className="text-xs font-bold w-8 text-right" style={{ color: i < 3 ? col : "#9e9578" }}>{pct}%</span>
                          <a href={amazonLink(name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#c9a22718", color: "#c9a227", border: "1px solid #c9a22730", textDecoration: "none", fontSize: 10 }}>
                            {I.cart(10)} {m ? `$${m.price}` : "Buy"}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ── BRAND MARKET SHARE ── */}
            <SectionTitle color={col} sub={`Brand loyalty and market share among ${gameName} professionals`}>Brand Dominance</SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Brand bars */}
              <div className="rounded-2xl p-4 sm:p-6" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="space-y-3">
                  {brandRanking.slice(0, 8).map(([name, count], i) => {
                    const pct = Math.round(count / totalBranded * 100);
                    const bc = BRAND_COLORS[name] || "#8a8460";
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-black" style={{ color: bc }}>{name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold" style={{ color: `${bc}cc` }}>{pct}% ({count} players)</span>
                            {(() => { const topBrandHeadphone = headphones.filter(m => m.brand === name).sort((a, b) => b.proUsage - a.proUsage)[0]; return topBrandHeadphone ? (
                              <a href={amazonLink(topBrandHeadphone.name)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded no-underline hover:scale-110 transition-all" style={{ background: "#c9a22714", color: "#c9a227", textDecoration: "none", fontSize: 9 }}>
                                {I.cart(8)} ${topBrandHeadphone.price}
                              </a>
                            ) : null; })()}
                          </div>
                        </div>
                        <div className="h-4 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: `${bc}40` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Brand pie chart */}
              <div className="rounded-2xl p-4 sm:p-6" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={brandChartData} dataKey="usage" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={100} paddingAngle={2} label={({name, usage}) => `${name} ${usage}%`}>
                      {brandChartData.map((entry, i) => <Cell key={i} fill={entry.fill} fillOpacity={0.7} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Top headphone per brand - shop row */}
            <div className="flex flex-wrap gap-2 mb-8">
              {brandRanking.slice(0, 5).map(([bName], bi) => {
                const topBM = headphones.filter(m => m.brand === bName).sort((a, b) => b.proUsage - a.proUsage)[0];
                if (!topBM) return null;
                const bc = BRAND_COLORS[bName] || "#8a8460";
                return (
                  <a key={bi} href={amazonLink(topBM.name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105 no-underline" style={{ background: `${bc}08`, border: `1px solid ${bc}15`, textDecoration: "none" }}>
                    {getHeadphoneImage(topBM.name) && <img loading="lazy" src={getHeadphoneImage(topBM.name)} alt={topBM.name} className="h-5 object-contain" />}
                    <div>
                      <div className="text-xs font-black" style={{ color: bc }}>{topBM.name.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</div>
                      <div style={{ fontSize: 10, color: "#9e9578" }}>Top {bName} headphone in {gameName}</div>
                    </div>
                    <span className="text-xs font-bold" style={{ color: "#c9a227" }}>${topBM.price}</span>
                  </a>
                );
              })}
            </div>



            {/* ── GEAR DEEP DIVE ── */}
            <SectionTitle color={col} sub={`Weight, layout, connectivity, and frequency response breakdown`}>Gear Deep Dive</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {/* Weight breakdown */}
              <div className="rounded-2xl p-4" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9578" }}>Weight</div>
                <div className="text-2xl font-black mb-2" style={{ color: col }}>{avgWeight}g</div>
                <div className="text-xs mb-3" style={{ color: "#9e9578" }}>average headphone weight</div>
                <div className="space-y-1.5">
                  {[
                    { label: "Ultralight (<250g)", pct: lightPct, color: "#c9a227" },
                    { label: "Medium (300-350g)", pct: midPct, color: col },
                    { label: "Heavy (350g+)", pct: heavyPct, color: "#c44040" },
                  ].map((w, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span style={{ color: "#7d6e1e" }}>{w.label}</span>
                        <span className="font-bold" style={{ color: w.color }}>{w.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                        <div className="h-full rounded-full" style={{ width: `${w.pct}%`, background: w.color, opacity: 0.5 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shape preference */}
              <div className="rounded-2xl p-4" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9578" }}>Shape</div>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 text-center rounded-lg px-2 py-2" style={{ background: `${col}10` }}>
                    <div className="text-xl font-black" style={{ color: col }}>{symPct}%</div>
                    <div style={{ fontSize: 10, color: "#9e9578" }}>Symmetrical</div>
                  </div>
                  <div className="flex-1 text-center rounded-lg px-2 py-2" style={{ background: "#0000000a" }}>
                    <div className="text-xl font-black" style={{ color: "#3d3530" }}>{ergoPct}%</div>
                    <div style={{ fontSize: 10, color: "#9e9578" }}>Ergonomic</div>
                  </div>
                </div>
                <div className="h-3 rounded-full overflow-hidden flex" style={{ background: "#0000000a" }}>
                  <div className="h-full" style={{ width: `${symPct}%`, background: `${col}60` }} />
                  <div className="h-full" style={{ width: `${ergoPct}%`, background: "#00000012" }} />
                </div>
              </div>

              {/* Connectivity */}
              <div className="rounded-2xl p-4" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9578" }}>Connectivity</div>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 text-center rounded-lg px-2 py-2" style={{ background: `${col}10` }}>
                    <div className="text-xl font-black" style={{ color: col }}>{wirelessPct}%</div>
                    <div style={{ fontSize: 10, color: "#9e9578" }}>Wireless</div>
                  </div>
                  <div className="flex-1 text-center rounded-lg px-2 py-2" style={{ background: "#0000000a" }}>
                    <div className="text-xl font-black" style={{ color: "#3d3530" }}>{100 - wirelessPct}%</div>
                    <div style={{ fontSize: 10, color: "#9e9578" }}>Wired</div>
                  </div>
                </div>
                <div className="h-3 rounded-full overflow-hidden flex" style={{ background: "#0000000a" }}>
                  <div className="h-full" style={{ width: `${wirelessPct}%`, background: `${col}60` }} />
                  <div className="h-full" style={{ width: `${100 - wirelessPct}%`, background: "#00000012" }} />
                </div>
              </div>

              {/* Frequency response */}
              <div className="rounded-2xl p-4" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9578" }}>Freq. Response</div>
                <div className="text-2xl font-black mb-2" style={{ color: col }}>{gb ? `${gb.avgPollRate >= 1000 ? `${(gb.avgPollRate/1000).toFixed(1)}K` : gb.avgPollRate}Hz` : "—"}</div>
                <div className="text-xs mb-3" style={{ color: "#9e9578" }}>average frequency response</div>
                <div className="space-y-1.5">
                  {hzRanking.slice(0, 4).map(([label, count], i) => {
                    const pct = Math.round(count / totalPlayers * 100);
                    return (
                      <div key={i} className="flex justify-between text-xs">
                        <span style={{ color: "#7d6e1e" }}>{label}Hz</span>
                        <span className="font-bold" style={{ color: i === 0 ? col : "#8a8460" }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Shop by Gear Category */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {(() => {
                const gameHeadphoneData = gamePlayers.map(p => headphones.find(mm => mm.name === p.headphone || (p.headphone && p.headphone.includes(mm.name)))).filter(Boolean);
                const lightestUsed = [...new Set(gameHeadphoneData)].filter(m => m.weight < 60).sort((a, b) => a.weight - b.weight)[0];
                const topWireless = [...new Set(gameHeadphoneData)].filter(m => m.connectivity === "Wireless").sort((a, b) => b.proUsage - a.proUsage)[0];
                const bestValue = [...new Set(gameHeadphoneData)].filter(m => m.proUsage >= 1).sort((a, b) => a.price - b.price)[0];
                const topSym = [...new Set(gameHeadphoneData)].filter(m => m.formFactor === "Symmetrical").sort((a, b) => b.proUsage - a.proUsage)[0];
                return [
                  lightestUsed && { label: "⚡ Lightest", kbd: lightestUsed, sub: `${lightestUsed.weight}g` },
                  topWireless && { label: "📡 Top Wireless", kbd: topWireless, sub: topWireless.connectivity },
                  bestValue && { label: "💰 Best Value", kbd: bestValue, sub: `$${bestValue.price}` },
                  topSym && { label: "◉ Top Symmetrical", kbd: topSym, sub: topSym.formFactor },
                ].filter(Boolean).map((item, i) => (
                  <a key={i} href={amazonLink(item.kbd.name)} target="_blank" rel="noopener noreferrer" className="rounded-xl p-3 text-center transition-all hover:scale-[1.03] no-underline block" style={{ background: `${col}06`, border: `1px solid ${col}10`, textDecoration: "none" }}>
                    <div className="text-xs font-bold mb-1" style={{ color: col }}>{item.label}</div>
                    <div className="text-xs font-black truncate" style={{ color: "#1a1614" }}>{item.kbd.name.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</div>
                    <div style={{ fontSize: 10, color: "#9e9578" }}>{item.sub}</div>
                    <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-xs font-bold" style={{ background: "#c9a22718", color: "#c9a227", fontSize: 10 }}>
                      {I.cart(8)} ${item.kbd.price}
                    </div>
                  </a>
                ));
              })()}
            </div>

            {/* ── TOP FEATURED PROS ── */}
            {featuredPlayers.length > 0 && (
              <>
                <SectionTitle color={col} sub="Star players and their complete headphone configurations">Featured Pro Players</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                  {featuredPlayers.slice(0, 12).map((p, i) => {
                    const m = headphones.find(mm => mm.name === p.headphone || (p.headphone && p.headphone.includes(mm.name)));
                    return (
                      <div key={i} className="rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.02]"
                        style={{ background: `${col}06`, border: `1px solid ${col}10` }}
                        onClick={() => navigateToPlayer(p)}>
                        <div className="flex items-center gap-2 mb-3">
                          <Flag country={p.country} size={20} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-black truncate" style={{ color: col }}>{p.name}</div>
                            <div style={{ fontSize: 11, color: "#9e9578" }}>{p.team}{p.role && p.role !== "—" ? ` · ${p.role}` : ""}</div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs"><span className="opacity-50">Headphone</span><span className="font-bold truncate ml-2" style={{ color: "#2d2824", maxWidth: 160 }}>{p.headphone}</span></div>
                          <div className="flex justify-between text-xs"><span className="opacity-50">Freq. Range</span><span className="font-bold" style={{ color: "#2d2824" }}>{p.hz >= 1000 ? `${(p.hz/1000).toFixed(p.hz % 1000 === 0 ? 0 : 1)}kHz` : `${p.hz}Hz`}</span></div>
                          {m && <div className="flex justify-between text-xs"><span className="opacity-50">Weight</span><span className="font-bold" style={{ color: "#2d2824" }}>{m.weight}g</span></div>}
                        </div>
                        <a href={amazonLink(p.headphone)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline w-full" style={{ background: "#c9a22718", color: "#c9a227", border: "1px solid #c9a22730", textDecoration: "none" }}>
                          {I.cart(12)} Buy {p.headphone.split(" ").slice(-2).join(" ")}{m ? ` — $${m.price}` : ""}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* ── TOP TEAMS ── */}
            {topTeams.length > 0 && (
              <>
                <SectionTitle color={col} sub={`Organizations with the most tracked ${gameName} professionals`}>Top Teams</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
                  {topTeams.map(([team, count], i) => {
                    const teamPlayers = gamePlayers.filter(p => p.team === team);
                    const teamHeadphones = {};
                    teamPlayers.forEach(p => { teamHeadphones[p.headphone] = (teamHeadphones[p.headphone] || 0) + 1; });
                    const topKbd = Object.entries(teamHeadphones).sort((a, b) => b[1] - a[1])[0];
                    return (
                      <div key={i} className="rounded-xl px-3 py-3" style={{ background: `${col}06`, border: `1px solid ${col}10` }}>
                        <div className="text-xs font-black mb-1 truncate" style={{ color: col }}>{team}</div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black" style={{ color: "#1a1614" }}>{count}</span>
                          <span style={{ fontSize: 10, color: "#9e9578" }}>players</span>
                        </div>
                        {topKbd && <div className="text-xs mt-1 truncate" style={{ color: "#9e9578" }}>Top: {topKbd[0].replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</div>}
                        {topKbd && <a href={amazonLink(topKbd[0])} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="inline-flex items-center gap-0.5 mt-1 px-1.5 py-0.5 rounded no-underline hover:scale-110 transition-all" style={{ background: "#c9a22712", color: "#c9a227", textDecoration: "none", fontSize: 9 }}>{I.cart(7)} Buy{(() => { const tm = headphones.find(mm => mm.name === topKbd[0]); return tm ? ` $${tm.price}` : ""; })()}</a>}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* ── ROLE BREAKDOWN ── */}
            {roleRanking.length > 1 && (
              <div className="rounded-2xl p-4 sm:p-6 mb-8" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: col }}>Role Breakdown</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {roleRanking.map(([role, count], i) => {
                    const rolePlayers = gamePlayers.filter(p => { let r = p.role; if (gameName === "CS2") { if (r === "Sniper") r = "AWPer"; else if (r === "AWPer/IGL" || r === "Rifler/IGL") r = "IGL"; else if (r === "Entry" || r === "Lurker" || r === "Support") r = "Rifler"; } return r === role; });
                    const roleHeadphoneCounts = {};
                    rolePlayers.forEach(p => { roleHeadphoneCounts[p.headphone] = (roleHeadphoneCounts[p.headphone] || 0) + 1; });
                    const roleTopHeadphone = Object.entries(roleHeadphoneCounts).sort((a, b) => b[1] - a[1])[0];
                    return (
                      <div key={i} className="rounded-lg px-3 py-2 text-center" style={{ background: `${col}08` }}>
                        <div className="text-xs font-black mb-1" style={{ color: col }}>{role}</div>
                        <div className="text-sm font-bold" style={{ color: "#1a1614" }}>{count} pros</div>
                        {roleTopHeadphone && <div className="mt-1 truncate" style={{ fontSize: 9, color: "#b8b0a8" }}>#1: {roleTopHeadphone[0].replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</div>}
                        {roleTopHeadphone && <a href={amazonLink(roleTopHeadphone[0])} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 mt-1 px-1 py-0.5 rounded no-underline hover:scale-110 transition-all" style={{ background: "#c9a22712", color: "#c9a227", textDecoration: "none", fontSize: 8 }}>{I.cart(7)} Buy</a>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── FULL PLAYER ROSTER ── */}
            <SectionTitle color={col} sub={`Complete settings database for every tracked ${gameName} professional`}>Full Player Roster</SectionTitle>
            <div className="rounded-2xl overflow-hidden mb-8" style={{ border: "1px solid #e6e3d6" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs" style={{ background: "#ffffff" }}>
                  <thead>
                    <tr style={{ background: `${col}10` }}>
                      <th className="text-left px-3 py-2 font-black" style={{ color: col }}>#</th>
                      <th className="text-left px-3 py-2 font-black" style={{ color: col }}>Player</th>
                      <th className="text-left px-3 py-2 font-black" style={{ color: col }}>Team</th>
                      <th className="text-left px-3 py-2 font-black" style={{ color: col }}>Headphone</th>
                      <th className="text-right px-3 py-2 font-black" style={{ color: col }}>Hz</th>
                      <th className="text-center px-3 py-2 font-black" style={{ color: "#c9a227" }}>Buy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gamePlayers.sort((a, b) => a.name.localeCompare(b.name)).map((p, i) => (
                      <tr key={i} className="transition-all hover:bg-stone-100 cursor-pointer" onClick={() => navigateToPlayer(p)}
                        style={{ borderBottom: "1px solid #00000008" }}>
                        <td className="px-3 py-1.5" style={{ color: "#00000015" }}>{i + 1}</td>
                        <td className="px-3 py-1.5">
                          <span className="flex items-center gap-1.5">
                            <Flag country={p.country} size={16} />
                            <span className="font-bold" style={{ color: "#1a1614" }}>{p.name}</span>
                            {p.role && p.role !== "—" && <span className="px-1 rounded" style={{ background: `${col}15`, color: `${col}aa`, fontSize: 9 }}>{p.role}</span>}
                          </span>
                        </td>
                        <td className="px-3 py-1.5" style={{ color: "#8a8460" }}>{p.team}</td>
                        <td className="px-3 py-1.5 font-bold truncate" style={{ maxWidth: 180 }}><a href={amazonLink(p.headphone)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="no-underline hover:underline" style={{ color: "#c9a227", textDecoration: "none" }}>{p.headphone}</a></td>
                        <td className="px-3 py-1.5 text-right" style={{ color: "#8a8460" }}>{p.hz >= 1000 ? `${(p.hz/1000).toFixed(p.hz % 1000 === 0 ? 0 : 1)}K` : p.hz}</td>
                        <td className="px-3 py-1.5 text-center"><a href={amazonLink(p.headphone)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="px-1.5 py-0.5 rounded no-underline hover:scale-110 transition-all inline-flex" style={{ background: "#c9a22712", color: "#c9a227", textDecoration: "none", fontSize: 9 }}>{I.cart(8)}</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── COMPLETE YOUR SETUP CTA ── */}
            <div className="rounded-2xl p-5 sm:p-8 mb-8 text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${col}08, #ffffff)`, border: `1px solid ${col}15` }}>
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: col }}>Complete Your {gameName} Pro Setup</div>
                <div className="text-sm opacity-40 mb-4 max-w-lg mx-auto">The headphones that {gameName} professionals trust. Click any headphone to shop on Amazon.</div>
                <div className="flex flex-wrap justify-center gap-3">
                  {headphoneRanking.slice(0, 5).map(([name, count], mi) => {
                    const m = headphones.find(mm => mm.name === name || name.includes(mm.name));
                    const pct = Math.round(count / totalPlayers * 100);
                    return (
                      <a key={mi} href={amazonLink(name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all hover:scale-105 no-underline" style={{ background: mi === 0 ? `${col}15` : "#0000000a", border: mi === 0 ? `1px solid ${col}30` : "1px solid #e6e3d6", textDecoration: "none" }}>
                        {getHeadphoneImage(name) && <img loading="lazy" src={getHeadphoneImage(name)} alt={name} className="h-6 object-contain" />}
                        <div className="text-left">
                          <div className="text-xs font-black" style={{ color: mi === 0 ? col : "#1a1614" }}>{name.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</div>
                          <div style={{ fontSize: 10, color: "#9e9578" }}>{pct}% of pros{m ? ` · ${m.weight}g` : ""}</div>
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded" style={{ background: "#c9a22720", color: "#c9a227" }}>{m ? `$${m.price}` : "Buy"}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── OTHER GAMES NAV ── */}
            <div className="rounded-2xl p-5 mb-4" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
              <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#9e9578" }}>Explore Other Games</div>
              <div className="flex flex-wrap gap-2">
                {gameBreakdown.filter(g => g.game !== gameName).map((g, i) => {
                  const gc = { CS2: "#c47000", Valorant: "#c43848", LoL: "#c89b3c", Fortnite: "#3a60b0", "Overwatch 2": "#c48018", Apex: "#a82020", "Dota 2": "#b83c30", "R6 Siege": "#3a6ca0", "Rocket League": "#1478c4", "Call of Duty": "#3a8a3a", "Marvel Rivals": "#b81820", PUBG: "#c48a00", Deadlock: "#6d40c4", "Quake Champions": "#a83c00" }[g.game] || "#8a8460";
                  return (
                    <button key={i} onClick={() => { window.location.href = `/games/${g.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`; }}
                      className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
                      style={{ background: `${gc}10`, color: gc, border: `1px solid ${gc}20` }}>
                      {g.game} ({g.players})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          );
        })()}


        {/* ── RANKINGS TAB ── */}
        {activeTab === "rankings" && (
          <div>
            <SectionTitle color="#c9a227" sub="Sort and filter to find the perfect competitive headphone">Complete Headphone Rankings</SectionTitle>
            {/* ── UNIFIED FILTER BAR ── */}
            {(() => {
              const SORT_OPTIONS_R = [
                { value: "proUsage", label: "Pro Usage" },
                { value: "weight", label: "Weight ↑" },
                { value: "price", label: "Price ↑" },
                { value: "rating", label: "Rating" },
                { value: "frequencyResponse", label: "Freq. Response" },
              ];
              const sortLabelR = SORT_OPTIONS_R.find(o => o.value === sortBy)?.label || "Pro Usage";
              const brandListR = [...new Set(headphones.map(m => m.brand))].sort();
              const activeFilterCountR = [filterBrand, filterWeight, filterPrice, filterConn, filterLayout].filter(f => f !== "All").length;
              const activeFiltersR = [];
              if (filterBrand !== "All") activeFiltersR.push({ label: filterBrand, clear: () => setFilterBrand("All") });
              if (filterWeight !== "All") activeFiltersR.push({ label: filterWeight === "Ultralight" ? "<250g" : filterWeight === "Light" ? "250-300g" : filterWeight === "Medium" ? "300-350g" : "350g+", clear: () => setFilterWeight("All") });
              if (filterPrice !== "All") activeFiltersR.push({ label: filterPrice === "Budget" ? "Under $60" : filterPrice === "Mid" ? "$60-$119" : "$120+", clear: () => setFilterPrice("All") });
              if (filterConn !== "All") activeFiltersR.push({ label: filterConn, clear: () => setFilterConn("All") });
              if (filterLayout !== "All") activeFiltersR.push({ label: filterLayout, clear: () => setFilterLayout("All") });
              const clearAllFiltersR = () => { setFilterBrand("All"); setFilterWeight("All"); setFilterPrice("All"); setFilterConn("All"); setFilterLayout("All"); };
              const accentR = "#c9a227";
              const chipStyleR = (active, brandColor) => ({
                padding: "5px 10px", borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer",
                background: active ? (brandColor ? `${brandColor}18` : `${accentR}20`) : "#ffffff",
                border: `1px solid ${active ? (brandColor ? `${brandColor}50` : `${accentR}50`) : "#0000000a"}`,
                color: active ? (brandColor || accentR) : "#8a8460",
                transition: "all 0.15s", whiteSpace: "nowrap",
              });

              return (
                <div className="mb-5" style={{ background: "#f5f3ea", border: "1px solid #e6e3d6", borderRadius: 12, padding: 10, position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, borderRadius: "12px 12px 0 0", background: `linear-gradient(90deg, transparent, ${accentR}50, transparent)` }} />

                  <div className="flex gap-2.5 items-center" style={{ marginBottom: showFilters ? 10 : 0, transition: "margin 0.3s" }}>
                    <div className="flex-1 relative" style={{ minWidth: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.25 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                      <input type="text" placeholder={`Search ${headphones.length} headphones...`} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        className="w-full outline-none" style={{ padding: "7px 12px 7px 34px", background: "#ffffff", border: "1px solid #e6e3d6", borderRadius: 10, color: "#1a1614", fontFamily: "inherit", fontSize: 14 }} />
                    </div>

                    <div className="relative">
                      <button className="flex items-center gap-1.5" onClick={() => setShowSortDrop(!showSortDrop)}
                        style={{ padding: "7px 12px", background: "#ffffff", border: `1px solid ${showSortDrop ? `${accentR}50` : "#0000000a"}`, borderRadius: 10, color: showSortDrop ? accentR : "#3d3530", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M6 12h12M9 18h6"/></svg>
                        <span style={{ color: "#8a8460", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Sort</span>
                        <span style={{ color: accentR, fontWeight: 700 }}>{sortLabelR}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                      {showSortDrop && (
                        <>
                        <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setShowSortDrop(false)} />
                        <div className="absolute" style={{ top: "calc(100% + 6px)", right: 0, background: "#f0eee2", border: "1px solid #d4d0be", borderRadius: 10, padding: 4, minWidth: 180, zIndex: 100, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
                          {SORT_OPTIONS_R.map(o => (
                            <div key={o.value} className="flex items-center justify-between cursor-pointer"
                              style={{ padding: "8px 12px", borderRadius: 7, fontSize: 13, fontWeight: 600, color: sortBy === o.value ? accentR : "#3d3530", transition: "all 0.15s" }}
                              onMouseEnter={e => { if (sortBy !== o.value) e.currentTarget.style.background = `${accentR}20`; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                              onClick={() => { setSortBy(o.value); setRankingSort({ key: o.value, dir: ["weight", "price"].includes(o.value) ? "asc" : "desc" }); setShowSortDrop(false); }}>
                              {o.label}
                              {sortBy === o.value && <span style={{ fontSize: 12 }}>✓</span>}
                            </div>
                          ))}
                        </div>
                        </>
                      )}
                    </div>

                    <button className="flex items-center gap-1.5"
                      onClick={() => setShowFilters(!showFilters)}
                      style={{ padding: "7px 12px", background: (showFilters || activeFilterCountR > 0) ? `${accentR}20` : "#ffffff", border: `1px solid ${(showFilters || activeFilterCountR > 0) ? `${accentR}50` : "#0000000a"}`, borderRadius: 10, color: (showFilters || activeFilterCountR > 0) ? accentR : "#3d3530", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
                      Filters
                      {activeFilterCountR > 0 && <span style={{ width: 18, height: 18, borderRadius: "50%", background: accentR, color: "#1a1614", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{activeFilterCountR}</span>}
                    </button>
                  </div>

                  <div style={{ maxHeight: showFilters ? 500 : 0, overflow: "hidden", opacity: showFilters ? 1 : 0, transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s" }}>
                    <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
                      <div style={{ gridColumn: "span 2" }}>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#8a8460", marginBottom: 5, paddingLeft: 2 }}>Brand</div>
                        <div className="flex flex-wrap gap-1">
                          <span style={chipStyleR(filterBrand === "All")} onClick={() => setFilterBrand("All")}>All</span>
                          {brandListR.map(b => <span key={b} style={{...chipStyleR(filterBrand === b, BRAND_COLORS[b]), display: "inline-flex", alignItems: "center", gap: 4}} onClick={() => setFilterBrand(filterBrand === b ? "All" : b)}>{getBrandLogo(b) && <img loading="lazy" src={getBrandLogo(b)} alt={b} style={{ width: 12, height: 12, objectFit: "contain" }} />}{b}</span>)}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#8a8460", marginBottom: 5, paddingLeft: 2 }}>Weight</div>
                        <div className="flex flex-wrap gap-1">
                          {[["All","All"],["Ultralight","<250g"],["Light","250-300g"],["Medium","300-350g"],["Heavy","350g+"]].map(([v,l]) => (
                            <span key={v} style={chipStyleR(filterWeight === v)} onClick={() => setFilterWeight(filterWeight === v && v !== "All" ? "All" : v)}>{l}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#8a8460", marginBottom: 5, paddingLeft: 2 }}>Price</div>
                        <div className="flex flex-wrap gap-1">
                          {[["All","All"],["Budget","Under $60"],["Mid","$60–$119"],["Premium","$120+"]].map(([v,l]) => (
                            <span key={v} style={chipStyleR(filterPrice === v)} onClick={() => setFilterPrice(filterPrice === v && v !== "All" ? "All" : v)}>{l}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#8a8460", marginBottom: 5, paddingLeft: 2 }}>Connection</div>
                        <div className="flex flex-wrap gap-1">
                          {[["All","All"],["Wireless","Wireless"],["Wired","Wired"]].map(([v,l]) => (
                            <span key={v} style={chipStyleR(filterConn === v)} onClick={() => setFilterConn(filterConn === v && v !== "All" ? "All" : v)}>{l}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#8a8460", marginBottom: 5, paddingLeft: 2 }}>Form Factor</div>
                        <div className="flex flex-wrap gap-1">
                          {[["All","All"],["Over-ear","Over-ear"],["On-ear","On-ear"]].map(([v,l]) => (
                            <span key={v} style={chipStyleR(filterLayout === v)} onClick={() => setFilterLayout(filterLayout === v && v !== "All" ? "All" : v)}>{l}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {!showFilters && activeFiltersR.length > 0 && (
                    <div className="flex flex-wrap gap-1.5" style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #e6e3d6" }}>
                      {activeFiltersR.map((f, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5" style={{ padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: `${accentR}20`, color: accentR, border: `1px solid ${accentR}50` }}>
                          {f.label} <span className="cursor-pointer opacity-50 hover:opacity-100" style={{ fontSize: 11 }} onClick={f.clear}>✕</span>
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-1 cursor-pointer" onClick={clearAllFiltersR}
                        style={{ padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: "#c4737312", color: "#ff6b6b", border: "1px solid #c4737330" }}>
                        ✕ Clear all
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Redesigned Rankings Table */}
            {(() => {
              const filtered = headphones
                .filter(m => filterBrand === "All" || m.brand === filterBrand)
                .filter(m => {
                  if (filterWeight === "All") return true;
                  if (filterWeight === "Ultralight") return m.weight < 250;
                  if (filterWeight === "Light") return m.weight >= 250 && m.weight < 300;
                  if (filterWeight === "Medium") return m.weight >= 300 && m.weight < 350;
                  if (filterWeight === "Heavy") return m.weight >= 350;
                  return true;
                })
                .filter(m => {
                  if (filterPrice === "All") return true;
                  if (filterPrice === "Budget") return m.price < 60;
                  if (filterPrice === "Mid") return m.price >= 60 && m.price < 120;
                  if (filterPrice === "Premium") return m.price >= 120;
                  return true;
                })
                .filter(m => filterConn === "All" || (filterConn === "Wireless" ? m.wireless : !m.wireless))
                .filter(m => filterLayout === "All" || m.formFactor === filterLayout)
                .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.brand.toLowerCase().includes(searchQuery.toLowerCase()));
              const k = rankingSort.key || "proUsage";
              const dir = rankingSort.dir || "desc";
              const sorted = [...filtered].sort((a, b) => {
                let av = a[k], bv = b[k];
                if (typeof av === "string") return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
                if (av !== bv) return dir === "asc" ? av - bv : bv - av;
                return a.id - b.id;
              });
              const maxUsage = Math.max(...sorted.map(m => m.proUsage), 1);
              const rankHeaders = [
                { key: "name", label: "Headphone" },
                { key: "brand", label: "Brand" },
                { key: "weight", label: "Weight" },
                { key: "driverType", label: "Driver" },
                { key: "price", label: "Price" },
                { key: "proUsage", label: "Pro Usage" },
                { key: "rating", label: "Rating" },
              ];
              return (
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e6e3d6" }}>
                {/* Sortable header bar */}
                <div className="hidden md:flex items-center gap-1 px-3 py-2.5" style={{ background: "#f5f3ea", borderBottom: "1px solid #e6e3d6" }}>
                  <div style={{ width: 52, flexShrink: 0 }} />
                  <div style={{ width: 72, flexShrink: 0 }} />
                  {rankHeaders.map(h => (
                    <div key={h.key} className="flex-1 flex items-center gap-1 cursor-pointer select-none group" style={{ minWidth: 0 }}
                      onClick={() => setRankingSort(prev => prev.key === h.key ? { key: h.key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key: h.key, dir: ["name","brand","driverType","formFactor"].includes(h.key) ? "asc" : "desc" })}>
                      <span className="text-[10px] font-bold uppercase tracking-wider transition-colors" style={{ color: rankingSort.key === h.key ? "#c9a227" : "#9e9578" }}>{h.label}</span>
                      {rankingSort.key === h.key && <span style={{ fontSize: 9, color: "#c9a227" }}>{rankingSort.dir === "asc" ? "▲" : "▼"}</span>}
                    </div>
                  ))}
                  <div style={{ width: 90, flexShrink: 0 }} />
                </div>

                {/* Rows */}
                <div style={{ background: "#faf8f5" }}>
                  {sorted.map((m, i) => {
                    const col = BRAND_COLORS[m.brand] || "#8a8460";
                    const img = getHeadphoneImage(m.name);
                    const isTop3 = i < 3;
                    const medalColors = ["#d4af37", "#a8a8a8", "#cd7f32"];
                    const medalLabels = ["1st", "2nd", "3rd"];
                    return (
                      <div key={`rank-${m.id}`} className="group cursor-pointer transition-all duration-200"
                        onClick={() => { navigateToHeadphone(m); }}
                        style={{ borderBottom: "1px solid #e6e3d608", background: i % 2 === 0 ? "transparent" : "#00000003" }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${col}08`; e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.boxShadow = `inset 3px 0 0 ${col}`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "#00000003"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                        <div className="flex items-center gap-1 px-3 py-2.5 md:py-2">
                          {/* Rank badge */}
                          <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 44 }}>
                            {isTop3 ? (
                              <div className="flex items-center justify-center rounded-lg font-black text-xs" style={{ width: 36, height: 36, background: `${medalColors[i]}18`, color: medalColors[i], border: `2px solid ${medalColors[i]}40`, fontFamily: "'Space Grotesk', system-ui" }}>
                                {medalLabels[i]}
                              </div>
                            ) : (
                              <span className="text-sm font-bold" style={{ color: "#c4bfb8", fontFamily: "'Space Grotesk', system-ui" }}>{i + 1}</span>
                            )}
                          </div>

                          {/* Headphone image */}
                          <div className="flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ width: 64, height: 52 }}>
                            {img ? <img loading="lazy" src={img} alt={m.name} className="max-w-full max-h-full object-contain" style={{ filter: `drop-shadow(0 2px 6px ${col}25)` }} /> : <Headphones size={24} style={{ color: "#d4d0be" }} />}
                          </div>

                          {/* Name + brand (mobile: stacked, desktop: separate columns) */}
                          <div className="flex-1 md:flex md:items-center md:gap-1" style={{ minWidth: 0 }}>
                            {/* Headphone name */}
                            <div className="flex-1" style={{ minWidth: 0 }}>
                              <div className="font-bold text-sm truncate transition-colors" style={{ color: "#1a1614", fontFamily: "'Space Grotesk', system-ui" }}>{m.name.replace(m.brand + " ", "")}</div>
                              <div className="md:hidden text-xs mt-0.5" style={{ color: "#9e9578" }}>{m.brand} · {m.weight}g · ${m.price}</div>
                            </div>
                            {/* Brand */}
                            <div className="hidden md:flex flex-1 items-center gap-1.5" style={{ minWidth: 0 }}>
                              {getBrandLogo(m.brand) && <img loading="lazy" src={getBrandLogo(m.brand)} alt={m.brand} className="w-4 h-4 object-contain" />}
                              <span className="text-xs font-semibold truncate" style={{ color: col }}>{m.brand}</span>
                            </div>
                            {/* Weight */}
                            <div className="hidden md:flex flex-1 items-center gap-1" style={{ minWidth: 0 }}>
                              <span className="text-xs font-bold" style={{ color: m.weight < 270 ? "#22c55e" : m.weight < 320 ? "#1a1614" : "#e67e22" }}>{m.weight}g</span>
                              {m.weight < 270 && <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: "#22c55e15", color: "#22c55e" }}>Light</span>}
                            </div>
                            {/* Driver */}
                            <div className="hidden md:block flex-1 truncate text-xs" style={{ color: "#8a8460", minWidth: 0 }}>{m.driverType}</div>
                            {/* Price */}
                            <div className="hidden md:block flex-1" style={{ minWidth: 0 }}>
                              <span className="text-xs font-bold" style={{ color: "#1a1614" }}>${m.price}</span>
                            </div>
                            {/* Pro Usage bar */}
                            <div className="hidden md:flex flex-1 items-center gap-2" style={{ minWidth: 0 }}>
                              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#0000000a", maxWidth: 80 }}>
                                <div className="h-full rounded-full transition-all" style={{ width: `${Math.max((m.proUsage / maxUsage) * 100, 3)}%`, background: `linear-gradient(90deg, ${col}80, ${col})` }} />
                              </div>
                              <span className="text-xs font-black" style={{ color: col, minWidth: 36 }}>{m.proUsage}%</span>
                            </div>
                            {/* Rating */}
                            <div className="hidden md:flex flex-1 items-center gap-1.5" style={{ minWidth: 0 }}>
                              <div className="flex gap-0.5">
                                {[1,2,3,4,5].map(star => (
                                  <div key={star} className="rounded-sm" style={{ width: 14, height: 6, background: star <= Math.round(m.rating / 2) ? col : "#0000000a", borderRadius: 2 }} />
                                ))}
                              </div>
                              <span className="text-[11px] font-semibold" style={{ color: "#9e9578" }}>{m.rating}</span>
                            </div>
                          </div>

                          {/* Mobile: pro usage pill */}
                          <div className="md:hidden flex-shrink-0">
                            <div className="px-2 py-1 rounded-lg text-xs font-black" style={{ background: `${col}15`, color: col }}>{m.proUsage}%</div>
                          </div>

                          {/* Buy button */}
                          <div className="flex-shrink-0 hidden sm:block" style={{ width: 85 }} onClick={e => e.stopPropagation()}>
                            <a href={amazonLink(m.name)} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap no-underline"
                              style={{ background: `${col}12`, color: col, border: `1px solid ${col}20`, textDecoration: "none" }}
                              onMouseEnter={e => { e.currentTarget.style.background = col; e.currentTarget.style.color = "#fff"; }}
                              onMouseLeave={e => { e.currentTarget.style.background = `${col}12`; e.currentTarget.style.color = col; }}>
                              {I.cart(11)} ${m.price}
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Results count footer */}
                <div className="px-4 py-2.5 text-center" style={{ background: "#f5f3ea", borderTop: "1px solid #e6e3d6" }}>
                  <span className="text-xs font-semibold" style={{ color: "#9e9578" }}>Showing {sorted.length} of {headphones.length} headphones</span>
                </div>
              </div>
              );
            })()}
            {/* Gear Check Callout */}
            {(() => {
              const topKbd = headphones.sort((a, b) => b.proUsage - a.proUsage)[0];
              return (
                <div className="rounded-xl p-4 mt-6 flex flex-col sm:flex-row items-center gap-4" style={{ background: "linear-gradient(135deg, #c9a22708, #c9a22704)", border: "1px solid #c9a22714" }}>
                  <span className="text-xl">🏆</span>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#c9a227", letterSpacing: 2 }}>Pro Favorite</div>
                    <div className="text-sm font-bold" style={{ color: "#1a1614" }}>{topKbd.name} — {topKbd.proUsage}% pro usage · {topKbd.weight}g · {topKbd.driverType}</div>
                  </div>
                  <a href={amazonLink(topKbd.name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105 no-underline flex-shrink-0" style={{ background: "#c9a227", color: "#1a1614", textDecoration: "none" }}>
                    {I.cart(14, "#1a1614")} ${topKbd.price} on Amazon
                  </a>
                </div>
              );
            })()}
          </div>
        )}

        {/* ── ALL HEADPHONES TAB ── */}
        {activeTab === "headphones" && (
          <div>
            <SectionTitle color="#9060c4" sub="Click any headphone for detailed breakdown">Headphone Showcase Gallery</SectionTitle>
            {/* ── TABBED CATEGORIES GALLERY ── */}
            {(() => {
              const SORT_OPTIONS = [
                { value: "proUsage", label: "Pro Usage" },
                { value: "weight", label: "Weight ↑" },
                { value: "price", label: "Price ↑" },
                { value: "rating", label: "Rating" },
                { value: "frequencyResponse", label: "Freq. Response" },
                { value: "name", label: "Name A-Z" },
                { value: "releaseYear", label: "Newest" },
              ];
              const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Pro Usage";

              // Gallery tab definitions with counts
              const galleryTabs = [
                { id: "All", label: "All", count: headphones.length },
                { id: "Wireless", label: "Wireless", count: headphones.filter(m => m.connectivity === "Wireless").length },
                { id: "Wired", label: "Wired", count: headphones.filter(m => m.connectivity === "Wired").length },
                { id: "Budget", label: "Budget", count: headphones.filter(m => m.price <= 100).length },
                { id: "Pro Favorites", label: "Pro Favorites", count: headphones.filter(m => m.proUsage >= 3).length },
              ];

              return (
                <div className="mb-6" style={{ background: "#f5f3ea", border: "1px solid #e6e3d6", borderRadius: 12, padding: 12, position: "relative" }}>
                  {/* Accent top line */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, borderRadius: "12px 12px 0 0", background: "linear-gradient(90deg, transparent, #9060c450, transparent)" }} />

                  {/* Tab bar - styled as headphone keys */}
                  <div className="flex gap-2 items-center flex-wrap mb-4">
                    {galleryTabs.map(tab => {
                      const isActive = galleryTab === tab.id;
                      const tabCount = tab.count;
                      const accentColor = "#2d2824";

                      return (
                        <button
                          key={tab.id}
                          onClick={() => setGalleryTab(tab.id)}
                          style={{
                            padding: "6px 12px",
                            borderRadius: 8,
                            fontFamily: "'Space Grotesk', system-ui, sans-serif",
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                            cursor: "pointer",
                            border: "1px solid #d4d0be",
                            background: isActive ? accentColor : "#f5f3ea",
                            color: isActive ? "#ffffff" : "#1a1614",
                            transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            boxShadow: isActive ? "0 4px 12px rgba(144, 96, 212, 0.25), inset 0 -2px 0 rgba(0, 0, 0, 0.1)" : "0 2px 4px rgba(0, 0, 0, 0.05)",
                            transform: isActive ? "translateY(2px)" : "translateY(0px)",
                            position: "relative",
                          }}
                          onMouseEnter={e => {
                            if (!isActive) {
                              e.currentTarget.style.background = "#ede8e0";
                              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.08)";
                            }
                          }}
                          onMouseLeave={e => {
                            if (!isActive) {
                              e.currentTarget.style.background = "#f5f3ea";
                              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                            }
                          }}
                        >
                          {tab.label}
                          {tabCount > 0 && (
                            <span style={{
                              marginLeft: 5,
                              display: "inline-block",
                              padding: "1px 6px",
                              borderRadius: 10,
                              background: isActive ? "rgba(255, 255, 255, 0.25)" : `${accentColor}20`,
                              color: isActive ? "#ffffff" : accentColor,
                              fontSize: 10,
                              fontWeight: 800,
                            }}>
                              {tabCount}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Search + Sort bar */}
                  <div className="flex gap-2.5 items-center">
                    {/* Search */}
                    <div className="flex-1 relative" style={{ minWidth: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.25 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                      <input type="text" placeholder={`Search ${headphones.length} headphones...`} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        className="w-full outline-none" style={{ padding: "7px 12px 7px 34px", background: "#ffffff", border: "1px solid #e6e3d6", borderRadius: 10, color: "#1a1614", fontFamily: "inherit", fontSize: 14 }} />
                    </div>

                    {/* Sort dropdown */}
                    <div className="relative">
                      <button className="flex items-center gap-1.5" onClick={() => setShowSortDrop(!showSortDrop)}
                        style={{ padding: "7px 12px", background: "#ffffff", border: `1px solid ${showSortDrop ? "#9060c450" : "#0000000a"}`, borderRadius: 10, color: showSortDrop ? "#9060c4" : "#3d3530", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M6 12h12M9 18h6"/></svg>
                        <span style={{ color: "#8a8460", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Sort</span>
                        <span style={{ color: "#2d2824", fontWeight: 700 }}>{sortLabel}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                      {showSortDrop && (
                        <>
                        <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setShowSortDrop(false)} />
                        <div className="absolute" style={{ top: "calc(100% + 6px)", right: 0, background: "#f0eee2", border: "1px solid #d4d0be", borderRadius: 10, padding: 4, minWidth: 180, zIndex: 100, boxShadow: "0 12px 40px rgba(0,0,0,0.08)", animation: "fadeIn 0.15s ease" }}>
                          {SORT_OPTIONS.map(o => (
                            <div key={o.value} className="flex items-center justify-between cursor-pointer"
                              style={{ padding: "8px 12px", borderRadius: 7, fontSize: 13, fontWeight: 600, color: sortBy === o.value ? "#9060c4" : "#3d3530", transition: "all 0.15s" }}
                              onMouseEnter={e => { if (sortBy !== o.value) e.currentTarget.style.background = "#9060c420"; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                              onClick={() => { setSortBy(o.value); setShowSortDrop(false); }}>
                              {o.label}
                              {sortBy === o.value && <span style={{ fontSize: 12 }}>✓</span>}
                            </div>
                          ))}
                        </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
            {/* Results count */}
            <div className="text-sm opacity-40 mb-3">{galleryKbds.length} {galleryKbds.length === 1 ? "headphone" : "headphones"} found</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {galleryKbds.map(m => (
                <HeadphoneCard key={m.id} headphone={m} onClick={(kb) => { navigateToHeadphone(kb); }} isSelected={selectedHeadphone?.id === m.id} />
              ))}
            </div>
            {galleryKbds.length === 0 && (
              <div className="text-center py-16 opacity-40">
                <div className="text-2xl mb-2">No headphones match your filters</div>
                <div className="text-sm">Try adjusting your filters or search query</div>
              </div>
            )}
          </div>
        )}

        {/* ── PRO PLAYER PROFILE VIEW ── */}
        {activeTab === "players" && selectedPlayer && (() => {
          const p = selectedPlayer;
          const gameColors = GAME_COLORS;
          const gc = gameColors[p.game] || "#8a8460";
          const currentHeadphoneData = headphones.find(m => m.name === p.headphone);
          const brandCol = currentHeadphoneData ? BRAND_COLORS[currentHeadphoneData.brand] : "#9e9578";
          return (
            <div>
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="mt-8 mb-4 flex items-center gap-1.5 text-sm">
                <a href="/" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Home</a>
                <span style={{ color: "#d4d0be" }}>›</span>
                <a href="/players" onClick={(e) => { e.preventDefault(); const savedPos = playerListScrollPos.current; setSelectedPlayer(null); try { sessionStorage.removeItem("playerListScroll"); } catch {} router.push("/players", { scroll: false }); requestAnimationFrame(() => { requestAnimationFrame(() => { window.scrollTo({ top: savedPos, behavior: "instant" }); }); }); }} className="opacity-30 hover:opacity-60 transition-all no-underline cursor-pointer" style={{ color: "#1a1614", textDecoration: "none" }}>Players</a>
                <span style={{ color: "#d4d0be" }}>›</span>
                <span style={{ color: gc }} className="font-bold opacity-70">{p.name}</span>
              </nav>
              {/* Share buttons */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#9e9578" }}>Share</span>
                <button onClick={() => { navigator.clipboard.writeText(`https://esportsheadphones.com/players/${p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`); }} className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105" style={{ background: "#00000008", border: "1px solid #d4d0be", color: "#1a1614" }}>📋 Copy Link</button>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(p.name + " uses " + p.headphone)}&url=${encodeURIComponent("https://esportsheadphones.com/players/" + p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""))}`} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#1da1f220", border: "1px solid #a68b1b30", color: "#1da1f2", textDecoration: "none" }}>𝕏 Tweet</a>
                <a href={`https://reddit.com/submit?url=${encodeURIComponent("https://esportsheadphones.com/players/" + p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""))}&title=${encodeURIComponent(p.name + " (" + p.game + ") — Headphone, Settings & Setup")}`} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#c4737320", border: "1px solid #c4737330", color: "#ff4499", textDecoration: "none" }}>Reddit</a>
                <a href={`/contact?subject=correction&player=${encodeURIComponent(p.name)}`} className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline ml-auto" style={{ background: "#0000000a", border: "1px solid #d4d0be", color: "#8a8460", textDecoration: "none" }}>⚠️ Suggest Correction</a>
              </div>
              {/* Header */}
              <div className="rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${gc}10, #ffffff)`, border: `1px solid ${gc}25` }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: gc }} />
                <div className="flex flex-col gap-3 sm:gap-6 items-start">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center"><Flag country={p.country} size={32} /></div>
                    {p.headphone && (
                      <div className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all" style={{
                        background: `${brandCol}18`,
                        color: brandCol,
                        border: `1px solid ${brandCol}40`,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.04)"
                      }}>
                        <span>{I.headphone(12)}</span>
                        {p.headphone.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <div className="text-sm uppercase tracking-widest opacity-30 mb-1">{p.role} · {p.team}</div>
                    <h2 className="text-2xl sm:text-4xl font-black mb-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: gc }}>{p.name}</h2>
                    <div className="text-sm sm:text-sm opacity-50 mb-2 sm:mb-3">{p.fullName} · Age {p.age}</div>
                    <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#5a5448" }}>{PLAYER_BIOS[p.name] || `${p.fullName || p.name} is a professional ${p.game} ${p.role || "player"} for ${p.team}, currently using the ${p.headphone}.`}</p>
                    {p.headphone && (
                      <p className="text-xs mt-2" style={{ color: "#9e9578" }}>
                        Currently playing with the <a href={amazonLink(p.headphone)} target="_blank" rel="noopener noreferrer"
                          className="font-bold underline decoration-dotted underline-offset-2 transition-all hover:opacity-100"
                          style={{ color: brandCol }}
                          onClick={e => e.stopPropagation()}>{p.headphone}</a>
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
                      <span className="px-3 py-1 rounded-lg text-sm font-bold" style={{ background: `${gc}20`, color: gc }}>{p.game}</span>
                      <span className="px-3 py-1 rounded-lg text-sm font-bold" style={{ background: "#00000008", color: "#1a1614" }}>{p.team}</span>
                      <span className="px-3 py-1 rounded-lg text-sm font-bold" style={{ background: "#00000008", color: "#1a1614" }}>{p.role}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 min-w-48">
                    <StatBox label="Age" value={p.age} color={gc} />
                  </div>
                  {/* Get This Setup CTA */}
                  <a href={amazonLink(p.headphone)} target="_blank" rel="noopener noreferrer"
                    className="self-end mt-2 flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl transition-all group/cta"
                    style={{ background: `linear-gradient(135deg, ${brandCol}12, ${brandCol}06)`, border: `1px solid ${brandCol}30` }}
                    onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${brandCol}25, ${brandCol}15)`; e.currentTarget.style.borderColor = `${brandCol}60`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${brandCol}12, ${brandCol}06)`; e.currentTarget.style.borderColor = `${brandCol}30`; }}>
                    {getHeadphoneImage(p.headphone) ? <img loading="lazy" src={getHeadphoneImage(p.headphone)} alt={`${p.headphone} gaming headphone`} className="h-8 w-8 object-contain flex-shrink-0" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.06))" }} /> : <span>{I.headphone(20)}</span>}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold" style={{ color: brandCol }}>Play like {p.name}</div>
                      <div className="text-sm opacity-85 truncate">Get the {p.headphone} on Amazon</div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-black flex-shrink-0 transition-all"
                      style={{ background: brandCol, color: "#fff" }}>
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke="#7d6e1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="21" r="1.5" fill="#e6e3d6"/><circle cx="20" cy="21" r="1.5" fill="#e6e3d6"/></svg> {currentHeadphoneData ? `$${currentHeadphoneData.price}` : "Buy"}
                    </div>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                  <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#9e9578" }}><span className="inline-flex mr-1.5 align-middle">{I.trophy(14)}</span>Top Achievements</div>
                  <div className="space-y-2">
                    {p.achievements.map((a, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl border-l-4" style={{ background: i < 3 ? `${gc}08` : "#f5f3ea", borderLeftColor: "#c9a227", border: `1px solid ${i < 3 ? `${gc}15` : "#e6e3d6"}`, borderLeftWidth: "4px" }}>
                        <span className="text-sm mt-0.5 flex-shrink-0">{i === 0 ? I.medal("#fbbf24", 18) : i === 1 ? I.medal("#94a3b8", 18) : i === 2 ? I.medal("#cd7f32", 18) : "▸"}</span>
                        <span className="text-sm" style={{ color: i < 3 ? gc : "#3d3530" }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Headphone History + Current Setup */}
                <div className="space-y-6">
                  {/* Current Headphone */}
                  <div className="rounded-2xl p-6" style={{ background: `${brandCol}08`, border: `1px solid ${brandCol}20` }}>
                    <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#9e9578" }}><span className="inline-flex mr-1.5 align-middle">{I.headphone(14)}</span>Current Headphone</div>
                    <div className="flex items-center gap-4 mb-4">
                      {getHeadphoneImage(p.headphone) && <img loading="lazy" src={getHeadphoneImage(p.headphone)} alt={`${p.headphone} - headphone used by ${p.name} in ${p.game}`} className="h-14 w-14 object-contain object-center" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.06))" }} />}
                      <div>
                        <div className="text-xl font-black" style={{ color: brandCol }}>{p.headphone}</div>
                        <div className="text-sm opacity-85">{currentHeadphoneData?.brand} · {currentHeadphoneData?.weight}g · {currentHeadphoneData?.formFactor} · {currentHeadphoneData?.connectivity}</div>
                      </div>
                    </div>
                    {currentHeadphoneData && (
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        <div className="text-center p-2 rounded-lg" style={{ background: "#0000000a" }}>
                          <div className="text-xs font-semibold" style={{ color: "#9e9578" }}>Weight</div>
                          <div className="text-sm font-bold" style={{ color: brandCol }}>{currentHeadphoneData.weight}g</div>
                        </div>
                        <div className="text-center p-2 rounded-lg" style={{ background: "#0000000a" }}>
                          <div className="text-xs font-semibold" style={{ color: "#9e9578" }}>Driver</div>
                          <div className="text-sm font-bold" style={{ color: brandCol }}>{currentHeadphoneData.driverType}</div>
                        </div>
                        <div className="text-center p-2 rounded-lg" style={{ background: "#0000000a" }}>
                          <div className="text-xs font-semibold" style={{ color: "#9e9578" }}>Freq. Response</div>
                          <div className="text-sm font-bold" style={{ color: brandCol }}>{currentHeadphoneData.frequencyResponse >= 1000 ? `${currentHeadphoneData.frequencyResponse/1000}K` : currentHeadphoneData.frequencyResponse}Hz</div>
                        </div>
                        <div className="text-center p-2 rounded-lg" style={{ background: "#0000000a" }}>
                          <div className="text-xs font-semibold" style={{ color: "#9e9578" }}>Price</div>
                          <div className="text-sm font-bold" style={{ color: brandCol }}>{"$"}{currentHeadphoneData.price}</div>
                        </div>
                      </div>
                    )}
                    {p.headphone && <a href={amazonLink(p.headphone)} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all"
                      style={{ background: brandCol, color: "#fff" }}>
                      {I.cart(16, "#fff")} Buy {p.headphone.split(" ").slice(-3).join(" ")} on Amazon
                    </a>}
                  </div>

                  {/* Headphone History Timeline */}
                  <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                    <div className="text-sm uppercase tracking-widest opacity-30 mb-4"><span className="inline-flex mr-1.5 align-middle">{I.refresh(14)}</span>Headphone History</div>
                    <div className="space-y-2">
                      {p.headphoneHistory.map((mh, i) => {
                        const histHeadphone = headphones.find(m => m.name === mh.headphone);
                        const hCol = histHeadphone ? BRAND_COLORS[histHeadphone.brand] : "#8a8460";
                        const isActive = i === 0;
                        return (
                          <div key={i} className="p-3 rounded-lg border-l-4 transition-all" style={{
                            background: isActive ? `${hCol}12` : "#f5f3ea",
                            borderLeftColor: hCol,
                            border: `1px solid ${isActive ? `${hCol}25` : "#e6e3d6"}`,
                            borderLeftWidth: "4px",
                            boxShadow: isActive ? `0 4px 12px ${hCol}20` : "0 2px 4px rgba(0,0,0,0.04)"
                          }}>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold" style={{ color: hCol }}>{mh.headphone}</div>
                                <div className="text-xs opacity-40 mt-0.5">{mh.period}</div>
                              </div>
                              {isActive && (
                                <a href={amazonLink(mh.headphone)} target="_blank" rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-bold transition-all flex-shrink-0 no-underline"
                                  style={{ background: hCol, color: "#ffffff", textDecoration: "none" }}
                                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; }}
                                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
                                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none"><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="21" r="1.5" fill="currentColor"/><circle cx="20" cy="21" r="1.5" fill="currentColor"/></svg>
                                  {histHeadphone ? `$${histHeadphone.price}` : "Buy"}
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Other players from same game */}
              <div className="mt-8">
                <div className="text-sm uppercase tracking-widest opacity-30 mb-4">Other {p.game} Players</div>
                <div className="flex flex-wrap gap-3">
                  {proPlayers.filter(op => op.game === p.game && op.name !== p.name).map((op, i) => (
                    <a key={i} href={`/players/${op.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.03] no-underline"
                      style={{ background: "#ffffff", border: "1px solid #d4d0be", color: "#1a1614", textDecoration: "none" }}>
                      <Flag country={op.country} size={16} />
                      <span>{op.name}</span>
                      <span className="opacity-30">({op.team})</span>
                    </a>
                  ))}
                </div>
              </div>

            {/* Suggest correction + related links */}
            <div className="flex flex-wrap items-center gap-3 mt-4 mb-2">
              <a href="/contact" className="text-xs opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>📝 Suggest a correction</a>
              <span className="opacity-10">·</span>
              <a href={`/best/${p.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`} className="text-xs opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: gc, textDecoration: "none" }}>Best headphones for {p.game}</a>
              <a href="/players" className="text-xs opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>All pro settings</a>
            </div>
            </div>
          );
        })()}

        {/* ── PRO PLAYERS LIST TAB ── */}
        {activeTab === "players" && !selectedPlayer && (() => {
          const gameColors = GAME_COLORS;
          const allGames = ["All", ...new Set(allPlayers.map(p => p.game))];
          const allRoles = ["All", ...new Set(allPlayers.map(p => p.role).filter(Boolean))];
          const allCountries = ["All", ...new Set(allPlayers.map(p => p.country).filter(Boolean)).values()].sort();
          const activeFilterCount = [gameFilter !== "All", roleFilter !== "All", countryFilter !== "All", headphoneFilter, teamFilter, profileOnly].filter(Boolean).length;
          const filteredPlayers = allPlayers
            .filter(p => gameFilter === "All" || p.game === gameFilter)
            .filter(p => roleFilter === "All" || p.role === roleFilter)
            .filter(p => countryFilter === "All" || p.country === countryFilter)
            .filter(p => !headphoneFilter || (p.headphone || "").toLowerCase().includes(headphoneFilter.toLowerCase()))
            .filter(p => !teamFilter || (p.team || "").toLowerCase().includes(teamFilter.toLowerCase()))
            .filter(p => !profileOnly || p.hasProfile)
            .filter(p => (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || (p.team || "").toLowerCase().includes(searchQuery.toLowerCase()) || (p.headphone || "").toLowerCase().includes(searchQuery.toLowerCase()));
          const sortedPlayers = [...filteredPlayers].sort((a, b) => {
            if (!playerSort.key) return 0;
            const k = playerSort.key;
            let av = a[k], bv = b[k];
            if (av == null) av = k === "name" || k === "game" || k === "team" || k === "headphone" || k === "role" ? "" : -Infinity;
            if (bv == null) bv = k === "name" || k === "game" || k === "team" || k === "headphone" || k === "role" ? "" : -Infinity;
            if (typeof av === "string") { return playerSort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av); }
            return playerSort.dir === "asc" ? av - bv : bv - av;
          });
          const sortHeaders = [
            { key: null, label: "" },
            { key: "name", label: "Player" },
            { key: "game", label: "Game" },
            { key: "team", label: "Team" },
            { key: "headphone", label: "Headphone" },
            { key: "role", label: "Role" },
          ];
          return (
          <div>
            <SectionTitle color="#a68b1b" sub={`${allPlayers.length} players across ${new Set(allPlayers.map(p=>p.game)).size} games  -  click starred players for full profiles`}>Pro Player Settings Database</SectionTitle>
            {/* Player quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {(() => {
                const fp = gameFilter === "All" ? allPlayers : allPlayers.filter(p => p.game === gameFilter);
                const mc = {}; fp.forEach(p => { mc[p.headphone] = (mc[p.headphone] || 0) + 1; });
                const topM = Object.entries(mc).sort((a,b) => b[1]-a[1])[0];
                const countries = new Set(fp.map(p => p.country)).size;
                const teams = new Set(fp.filter(p => p.team !== "Content" && p.team !== "Free Agent" && p.team !== "Inactive" && p.team !== "Retired").map(p => p.team)).size;
                return [
                  { label: "Top Headphone", value: topM ? topM[0].replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "") : "-", color: "#c9a227" },
                  { label: "Countries", value: countries, color: "#a68b1b" },
                  { label: "Active Teams", value: teams, color: "#c9a227" },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl p-3 text-center" style={{ background: `${s.color}06`, border: `1px solid ${s.color}10` }}>
                    <div className="text-sm font-black" style={{ color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 12 }} className="opacity-30 mt-0.5">{s.label}</div>
                  </div>
                ));
              })()}
            </div>

            {/* ── MOST USED PRO HEADPHONES — BUY STRIP ── */}
            {(() => {
              const fp = gameFilter === "All" ? allPlayers : allPlayers.filter(p => p.game === gameFilter);
              const mc = {}; fp.forEach(p => { mc[p.headphone] = (mc[p.headphone] || 0) + 1; });
              const topHeadphones = Object.entries(mc).sort((a,b) => b[1]-a[1]).slice(0, 5);
              return (
                <div className="rounded-xl p-4 mb-5" style={{ background: "#c9a22706", border: "1px solid #c9a22720" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ color: "#c9a227" }}>{I.trophy(16)}</span>
                    <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#c9a227" }}>Most Used by {gameFilter === "All" ? "All" : gameFilter} Pros</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topHeadphones.map(([kbdName, count], i) => {
                      const m = headphones.find(mm => mm.name === kbdName);
                      const pct = Math.round(count / fp.length * 100);
                      return (
                        <a key={i} href={amazonLink(kbdName)} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-[1.03] no-underline"
                          style={{ background: i === 0 ? "#c9a22714" : "#0000000a", border: i === 0 ? "1px solid #c9a22725" : "1px solid #e6e3d6", textDecoration: "none" }}>
                          <span className="text-xs font-black" style={{ color: i === 0 ? "#c9a227" : "#9e9578" }}>#{i+1}</span>
                          <div>
                            <div className="text-xs font-bold text-stone-900">{kbdName.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</div>
                            <div style={{ fontSize: 10, color: "#9e9578" }}>{pct}% of pros{m ? ` · $${m.price}` : ""}</div>
                          </div>
                          <span style={{ color: "#c9a227", opacity: 0.6 }}>{I.cart(12)}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Game pill filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              {allGames.map(g => {
                const gc2 = g === "All" ? "#a68b1b" : (gameColors[g] || "#8a8460");
                const active = gameFilter === g;
                return (
                  <button key={g} onClick={() => { setGameFilter(g); setPlayerPage(0); }}
                    className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5"
                    style={{ background: active ? `${gc2}25` : "#ffffff", color: active ? gc2 : "#2d2824", border: active ? `1px solid ${gc2}50` : "1px solid #e6e3d6" }}>
                    {g !== "All" && GAME_IMAGE_URLS[g] && <img loading="lazy" src={GAME_IMAGE_URLS[g]} alt={g} className="w-4 h-4 object-contain" />}
                    {g}{g !== "All" && <span className="ml-1 opacity-50">({allPlayers.filter(p => p.game === g).length})</span>}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3 mb-3">
              <input type="text" aria-label="Search players" placeholder="Search player, team, or headphone..." value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setPlayerPage(0); }}
                className="px-4 py-2 rounded-lg text-sm outline-none flex-1 min-w-48" style={{ background: "#ffffff", border: "1px solid #d4d0be", color: "#1a1614" }} />
              <button onClick={() => setShowFilters(f => !f)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
                style={{ background: showFilters || activeFilterCount > 0 ? "#a68b1b18" : "#ffffff", border: showFilters || activeFilterCount > 0 ? "1px solid #a68b1b40" : "1px solid #d4d0be", color: showFilters || activeFilterCount > 0 ? "#a68b1b" : "#7d6e1e" }}>
                {I.gear(14)} Filters {activeFilterCount > 0 && <span className="px-1.5 py-0.5 rounded-full text-sm font-black" style={{ background: "#a68b1b", color: "#fff", fontSize: 10 }}>{activeFilterCount}</span>}
              </button>
              <button onClick={() => { setProfileOnly(p => !p); setPlayerPage(0); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
                style={{ background: profileOnly ? "#c9a22715" : "#ffffff", border: profileOnly ? "1px solid #c9a22740" : "1px solid #d4d0be", color: profileOnly ? "#c9a227" : "#8a8460" }}>
                {I.star(14)} Full Profiles Only
              </button>
              <div className="flex items-center gap-2 text-sm opacity-70 px-3">
                {I.star(16)} = Full profile available
              </div>
            </div>

            {/* Expanded filters panel */}
            {showFilters && (
              <div className="rounded-xl p-4 mb-4 grid grid-cols-2 md:grid-cols-4 gap-4" style={{ background: "#ffffff", border: "1px solid #d4d0be" }}>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#9e9578" }}>Role</div>
                  <select aria-label="Filter by role" value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPlayerPage(0); }}
                    className="w-full px-3 py-2 rounded-lg text-sm cursor-pointer" style={{ background: "#f5f3ea", border: "1px solid #d4d0be", color: "#1a1614" }}>
                    {allRoles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#9e9578" }}>Country</div>
                  <select aria-label="Filter by country" value={countryFilter} onChange={e => { setCountryFilter(e.target.value); setPlayerPage(0); }}
                    className="w-full px-3 py-2 rounded-lg text-sm cursor-pointer" style={{ background: "#f5f3ea", border: "1px solid #d4d0be", color: "#1a1614" }}>
                    {allCountries.map(c => <option key={c} value={c}>{c === "All" ? "All" : countryName(c)}</option>)}
                  </select>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#9e9578" }}>Headphone</div>
                  <input type="text" aria-label="Filter by headphone" placeholder="e.g. BlackShark, Arctis..." value={headphoneFilter} onChange={e => { setHeadphoneFilter(e.target.value); setPlayerPage(0); }}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: "#f5f3ea", border: "1px solid #d4d0be", color: "#1a1614" }} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#9e9578" }}>Team</div>
                  <input type="text" aria-label="Filter by team name" placeholder="e.g. Navi, Fnatic..." value={teamFilter} onChange={e => { setTeamFilter(e.target.value); setPlayerPage(0); }}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: "#f5f3ea", border: "1px solid #d4d0be", color: "#1a1614" }} />
                </div>
                <div className="col-span-2 flex items-end">
                  <button onClick={() => { setGameFilter("All"); setRoleFilter("All"); setCountryFilter("All"); setHeadphoneFilter(""); setTeamFilter(""); setProfileOnly(false); setSearchQuery(""); setPlayerPage(0); }}
                    className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                    style={{ background: "#00000008", border: "1px solid #d4d0be", color: "#8a8460" }}>
                    ✕ Clear All Filters
                  </button>
                </div>
              </div>
            )}
            <div data-player-table className="overflow-x-auto rounded-2xl" style={{ border: "1px solid #e6e3d6" }}>
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10">
                  <tr style={{ background: "#ffffff" }}>
                    {sortHeaders.map(h => (
                      <th key={h.label || "_star"} className={`px-3 py-3 text-left text-sm uppercase tracking-wider font-bold ${h.key ? "cursor-pointer select-none hover:opacity-80" : ""}`}
                        style={{ color: playerSort.key === h.key ? "#a68b1b" : "#8a8460" }}
                        aria-sort={playerSort.key === h.key ? (playerSort.dir === "asc" ? "ascending" : "descending") : undefined}
                        onClick={() => { if (h.key) { setPlayerSort(prev => prev.key === h.key ? { key: h.key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key: h.key, dir: "asc" }); setPlayerPage(0); } }}>
                        {h.label}{playerSort.key === h.key ? (playerSort.dir === "asc" ? " ▲" : " ▼") : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedPlayers.slice(playerPage * PLAYERS_PER_PAGE, (playerPage + 1) * PLAYERS_PER_PAGE).map((p, i) => {
                    const gc = gameColors[p.game] || "#8a8460";
                    const profilePlayer = p.hasProfile ? proPlayers.find(pp => pp.name === p.name && pp.game === (p.game)) || proPlayers.find(pp => pp.name === p.name) : null;
                    const headphoneMatch = headphones.find(mm => mm.name === p.headphone || (p.headphone && p.headphone.includes(mm.name)));
                    const brandCol = headphoneMatch ? (BRAND_COLORS[headphoneMatch.brand] || "#8a8460") : "#9e9578";
                    const actualIndex = playerPage * PLAYERS_PER_PAGE + i;
                    return (
                      <tr key={`${p.name}-${p.game}-${actualIndex}`}
                        className={`transition-all duration-200 ${p.hasProfile ? "cursor-pointer" : ""}`}
                        onClick={() => { if (profilePlayer) { navigateToPlayer(profilePlayer); } }}
                        style={{ borderBottom: "1px solid #e6e3d6", background: actualIndex % 2 === 0 ? "#f5f2e6" : "#f5f3ea", borderLeft: `3px solid ${gc}` }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${gc}0c`; e.currentTarget.style.boxShadow = `inset 4px 0 12px ${gc}10`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = actualIndex % 2 === 0 ? "#f5f2e6" : "#f5f3ea"; e.currentTarget.style.boxShadow = "none"; }}>
                        <td className="pl-3 pr-1 py-2.5 text-center">{p.hasProfile ? <span title="Full profile available" className="inline-flex" style={{ filter: `drop-shadow(0 0 4px ${gc}60)` }}>{I.star(14)}</span> : <span className="opacity-10">·</span>}</td>
                        <td className="px-2 py-2.5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Flag country={p.country} size={18} className="flex-shrink-0" />
                            <div>
                              <div className="text-sm font-black text-stone-900 leading-tight">{p.name}</div>
                              {p.hasProfile && <div style={{ fontSize: 10, color: gc, opacity: 0.7 }}>{p.fullName || ""}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-2.5 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-sm font-bold" style={{ background: `${gc}12`, color: gc, fontSize: 11 }}>{getGameImage(p.game) && <img loading="lazy" src={getGameImage(p.game)} alt={p.game} className="inline w-3 h-3 object-contain" />}{p.game}</span>
                        </td>
                        <td className="px-2 py-2.5 opacity-50 whitespace-nowrap text-sm">{getTeamLogo(p.team) && <img loading="lazy" src={getTeamLogo(p.team)} alt={p.team} className="inline w-3.5 h-3.5 object-contain mr-1" style={{ verticalAlign: "middle" }} />}{p.team}</td>
                        <td className="px-2 py-2.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            {headphoneMatch && getHeadphoneImage(headphoneMatch.name) && <img loading="lazy" src={getHeadphoneImage(headphoneMatch.name)} alt="" className="h-4 w-6 object-contain opacity-60 flex-shrink-0" />}
                            <span className="text-sm truncate" style={{ color: brandCol, maxWidth: 140 }}>{p.headphone}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2.5 text-sm">
                          <span className="opacity-40">{p.role}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            {(() => {
              const totalPages = Math.ceil(sortedPlayers.length / PLAYERS_PER_PAGE);
              const showing = Math.min((playerPage + 1) * PLAYERS_PER_PAGE, sortedPlayers.length);
              const from = sortedPlayers.length > 0 ? playerPage * PLAYERS_PER_PAGE + 1 : 0;
              if (totalPages <= 1) return (
                <div className="text-center text-sm opacity-20 mt-3">{filteredPlayers.length} of {allPlayers.length} players shown{activeFilterCount > 0 ? ` · ${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} active` : ""}</div>
              );
              // Build page numbers to show
              const pages = [];
              for (let p = 0; p < totalPages; p++) {
                if (p === 0 || p === totalPages - 1 || Math.abs(p - playerPage) <= 2) pages.push(p);
                else if (pages[pages.length - 1] !== -1) pages.push(-1); // ellipsis
              }
              return (
                <div className="flex flex-col items-center gap-3 mt-4">
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => { setPlayerPage(p => Math.max(0, p - 1)); document.querySelector("[data-player-table]")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                      disabled={playerPage === 0}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-20"
                      style={{ background: "#00000008", border: "1px solid #d4d0be", color: "#1a1614" }}>
                      ← Prev
                    </button>
                    {pages.map((p, idx) => p === -1 ? (
                      <span key={`e${idx}`} className="px-1 text-xs opacity-20">…</span>
                    ) : (
                      <button key={p} onClick={() => { setPlayerPage(p); document.querySelector("[data-player-table]")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                        className="w-8 h-8 rounded-lg text-xs font-bold transition-all"
                        style={{ background: p === playerPage ? "#a68b1b20" : "#0000000a", border: `1px solid ${p === playerPage ? "#a68b1b40" : "#00000008"}`, color: p === playerPage ? "#a68b1b" : "#8a8460" }}>
                        {p + 1}
                      </button>
                    ))}
                    <button onClick={() => { setPlayerPage(p => Math.min(totalPages - 1, p + 1)); document.querySelector("[data-player-table]")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                      disabled={playerPage >= totalPages - 1}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-20"
                      style={{ background: "#00000008", border: "1px solid #d4d0be", color: "#1a1614" }}>
                      Next →
                    </button>
                  </div>
                  <div className="text-xs opacity-20">Showing {from}–{showing} of {sortedPlayers.length} players{activeFilterCount > 0 ? ` · ${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} active` : ""}</div>
                </div>
              );
            })()}

            {/* ── PRO SETUP SPOTLIGHT ── */}
            {(() => {
              const top250Pros = shuffle(proPlayers.filter(p => TOP250.has(p.name) && (gameFilter === "All" || p.game === gameFilter))).slice(0, 3);
              if (!top250Pros.length) return null;
              return (
                <div className="mt-8 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ color: "#c9a227" }}>{I.star(16)}</span>
                    <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#c9a227" }}>Featured Pro Setups</span>
                    <span className="text-xs opacity-20 ml-1">refreshes on load</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {top250Pros.map((p, i) => {
                      const gc = gameColors[p.game] || "#8a8460";
                      const m = headphones.find(mm => mm.name === p.headphone);
                      return (
                        <div key={i} className="rounded-xl p-4 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]" style={{ background: `${gc}06`, border: `1px solid ${gc}12` }}
                          onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 20px ${gc}15`; e.currentTarget.style.borderColor = `${gc}30`; }}
                          onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = `${gc}12`; }}>
                          <div className="absolute top-0 right-0 w-24 h-24 opacity-5" style={{ background: `radial-gradient(circle, ${gc}, transparent)`, transform: "translate(30%, -30%)" }} />
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: `${gc}15`, border: `1px solid ${gc}20` }}><Flag country={p.country} size={22} /></div>
                            <div className="flex-1 min-w-0">
                              <a href={`/players/${p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`} className="text-sm font-black text-stone-900 no-underline hover:underline" style={{ textDecoration: "none" }}>{p.name}</a>
                              <div style={{ fontSize: 11, color: gc }}>{p.team} · {p.game}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-2 px-2 py-1.5 rounded-lg" style={{ background: "#00000008" }}>
                            {m && getHeadphoneImage(m.name) && <img loading="lazy" src={getHeadphoneImage(m.name)} alt="" className="h-5 w-8 object-contain opacity-70 flex-shrink-0" />}
                            <span className="text-xs font-bold truncate" style={{ color: m ? (BRAND_COLORS[m.brand] || "#7d6e1e") : "#7d6e1e" }}>{p.headphone}</span>
                            {p.role && p.role !== "—" && <span className="text-xs opacity-20 ml-auto flex-shrink-0">{p.role}</span>}
                          </div>
                          <a href={amazonLink(p.headphone)} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg text-xs font-bold transition-all hover:scale-[1.03] no-underline"
                            style={{ background: "#c9a22714", color: "#c9a227", border: "1px solid #c9a22730", textDecoration: "none" }}>
                            {I.cart(11)} Get {p.name}'s Headphone{m ? ` — $${m.price}` : ""}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

          </div>
          );
        })()}

        {/* ── BRANDS TAB ── */}
        {activeTab === "brands" && (
          <div>
            <SectionTitle color="#c9a227" sub="The companies defining competitive headphone performance">Headphone Manufacturers</SectionTitle>

            {/* Brand Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: "Razer", tagline: "Professional Gaming Audio Engineered",
                  desc: "Razer dominates competitive esports with the BlackShark series, delivering immersive 50mm drivers and custom-tuned audio profiles optimized for FPS title callouts and positional accuracy. The BlackShark V3 Pro features wireless connectivity, THX Spatial Audio, and noise-canceling microphones designed for tournament environments. With the highest pro player adoption rate (~28% of professional players using BlackShark V2 Pro variants), Razer has established itself as the benchmark for competitive gaming headphones across all esports disciplines.",
                  achievements: ["BlackShark V2 Pro: most-used headphone in professional esports (~28% pro adoption)", "THX Spatial Audio: certified immersive 3D positioning for competitive advantage", "Multi-platform wireless with ultra-low 2.4GHz latency for tournament play"],
                  flagships: ["BlackShark V3 Pro", "BlackShark V2 Pro", "Kraken V3 Pro"] },
                { name: "Logitech", tagline: "Precision Audio for Competitive Play",
                  desc: "Logitech G's esports audio solutions combine PRO-grade drivers with Pro League sponsorships and team partnerships. The G Pro X Headset features 50mm drivers with advanced EQ customization through Logitech G HUB, delivering tournament-ready audio clarity. Known for consistent build quality and compatibility across Windows, Mac, and console platforms, Logitech's modular design allows for quick microphone swaps and cable replacements—critical features for professional players.",
                  achievements: ["G Pro X Headset: officially adopted across multiple esports franchises", "50mm drivers with 20Hz-20kHz frequency response for competitive accuracy", "Modular design enables rapid tournament-ready configuration changes"],
                  flagships: ["G Pro X Headset", "G Pro X 2 Headset", "G PRO X Wireless"] },
                { name: "SteelSeries", tagline: "Arctic Audio Precision Technology",
                  desc: "SteelSeries Arctis headphones set the standard for pro esports audio with proprietary driver technology and league partnerships in CS:GO, Valorant, and Dota 2. The Arctis Nova Pro Wireless features ChatMix technology for independent game/voice audio balancing and noise-canceling microphones, essential for high-pressure tournament broadcasts. Their proprietary S1 speaker drivers deliver 20Hz-40kHz extended frequency response, providing competitive edge through superior sound clarity.",
                  achievements: ["Arctis Nova Pro Wireless: chosen audio partner for major esports leagues", "ChatMix independent audio mixing technology for gameplay optimization", "S1 speaker drivers with extended 20Hz-40kHz frequency response"],
                  flagships: ["Arctis Nova Pro Wireless", "Arctis Nova Pro", "Arctis Pro"] },
                { name: "Corsair", tagline: "Immersive Audio Ecosystem",
                  desc: "Corsair's HS series headphones deliver tournament-grade audio with iCUE integration for real-time audio profile switching. The HS80 MAX features 50mm Neodymium drivers and Dolby 7.1 spatial surround sound, providing competitive positioning advantages in tactical shooters. Corsair's ecosystem approach allows seamless audio customization alongside peripheral settings, enabling players to optimize entire setups for specific titles and competitive scenarios.",
                  achievements: ["HS80 MAX: Dolby 7.1 surround for tactical positioning in competitive play", "iCUE integration for unified peripheral and audio configuration", "50mm Neodymium drivers with rapid transient response for footstep clarity"],
                  flagships: ["HS80 MAX", "HS80 RGB USB", "Void Pro"] },
                { name: "beyerdynamic", tagline: "Precision German Audio Engineering",
                  desc: "beyerdynamic's expertise in professional audio extends to competitive gaming with open-back and closed-back designs optimized for different play styles. The DT 900 Pro X offers 45mm drivers with exceptional clarity for complex soundscapes, while the MMX 300 provides closed-back isolation for LAN environments. beyerdynamic's manufacturing precision and Teslar driver technology deliver consistent frequency response critical for competitive sound staging.",
                  achievements: ["DT 990 Pro: open-back design for expansive soundstage in competitive scenarios", "Teslar driver technology: consistent harmonic response across frequency spectrum", "German precision engineering with replaceable modular components"],
                  flagships: ["DT 900 Pro X", "DT 990 Pro", "MMX 300"] },
                { name: "Sennheiser", tagline: "Studio Precision for Esports",
                  desc: "Sennheiser brings legendary audio accuracy to esports with the GAME series, delivering flat frequency response and superior build quality that appeals to both competitive players and content creators. The GSP 600 features a unique curved boom arm for consistent microphone positioning and drivers tuned for speech clarity and ambient sound detection. With over 75 years of audio engineering heritage, Sennheiser headphones offer reliability that extends beyond single tournament seasons.",
                  achievements: ["GAME ZERO: closed-back isolation with exceptional build durability", "Curved microphone boom: consistent positioning for professional broadcasts", "75+ years of audio engineering heritage applied to competitive gaming"],
                  flagships: ["GAME ZERO", "GSP 600", "PC38X"] },
                { name: "HyperX", tagline: "Esports Heritage in Audio",
                  desc: "HyperX (now acquired by HP) has maintained its reputation as an esports-native brand with Cloud series headphones widely used in professional tournaments and LAN events. The Cloud III features 50mm drivers optimized for FPS clarity with DTS Headphone:X spatial audio technology. Known for aggressive esports marketing and pro team sponsorships, HyperX remains a ubiquitous presence in competitive gaming despite broader industry shifts.",
                  achievements: ["Cloud series: millions sold globally with consistent pro adoption", "DTS Headphone:X: licensed spatial audio for positional awareness", "Strong esports grassroots sponsorship and community engagement"],
                  flagships: ["Cloud III", "Cloud II", "Cloud Alpha S"] },
                { name: "ASTRO", tagline: "Tournament Audio Trusted Choice",
                  desc: "ASTRO (acquired by Corsair) maintains dedicated focus on esports audio with the A50 and A40 series trusted across professional leagues and esports venues. The A50 wireless platform provides tournament-grade connectivity with predictable latency and long battery life for extended matches. ASTRO's singular focus on competitive gaming has created a loyal player base that values reliability and performance over peripheral ecosystem integration.",
                  achievements: ["A50: trusted tournament headphone across FPS, MOBA, and fighting game esports", "Tournament-grade wireless with consistent 2.4GHz connectivity", "Singular esports focus with optimized audio profiles for competitive titles"],
                  flagships: ["A50", "A40", "A40 TR"] },
                { name: "Sony", tagline: "Spatial Innovation for Gaming",
                  desc: "Sony's INZONE H9 series brings premium audio technology and PlayStation partnership advantages to esports, featuring Sony's proprietary spatial sound processing and noise-canceling microphones. The H9 II combines dual noise-canceling drivers with PS Link 2.4GHz wireless connectivity, delivering console-optimized performance for fighting game and PlayStation esports tournaments. Sony's investment in esports-specific tuning demonstrates commitment to competitive gaming market.",
                  achievements: ["INZONE H9 II: PlayStation partnership with native console optimization", "Dual noise-canceling technology for tournament environment isolation", "Proprietary spatial sound processing calibrated for esports titles"],
                  flagships: ["INZONE H9", "INZONE H9 II", "INZONE H7"] },
                { name: "ASUS", tagline: "Republic of Gamers Audio",
                  desc: "ASUS ROG (Republic of Gamers) division delivers competitive esports audio through the Delta II and Pelta series, leveraging ROG's ecosystem integration with gaming motherboards and peripherals. The ROG Delta II features AI noise suppression and Noise Gate technology for clean microphone input in tournament broadcasts. ASUS's commitment to esports sponsorships and gaming hardware integration positions ROG audio as part of comprehensive competitive setups.",
                  achievements: ["ROG Delta II: AI noise suppression for professional broadcast clarity", "Ecosystem integration with ROG gaming hardware and software", "Esports sponsorships across Asia-Pacific regional tournaments"],
                  flagships: ["ROG Delta II", "ROG Pelta", "ROG Strix Go"] },
                { name: "JBL", tagline: "Quantum Esports Technology",
                  desc: "JBL's Quantum series brings consumer audio expertise to esports with the Quantum One featuring planar magnetic drivers delivering 20Hz-40kHz frequency response and advanced spatial audio. The Quantum 400 offers closed-back isolation with detachable 2.2m boom arm microphone, designed for stable microphone positioning during long tournament matches. JBL's audio manufacturing scale enables consistent driver quality across competitive-grade products.",
                  achievements: ["Quantum One: planar magnetic drivers for precise frequency reproduction", "20Hz-40kHz extended frequency response for comprehensive audio detail", "Quantum-engineered spatial audio technology for tactical positioning"],
                  flagships: ["Quantum One", "Quantum 400", "Quantum Two"] },
                { name: "Audeze", tagline: "Planar Magnetic Competitive Audio",
                  desc: "Audeze Maxwell introduces planar magnetic driver technology to competitive esports, delivering the widest frequency response (10Hz-50kHz) of any gaming headphone for comprehensive positional accuracy. The Maxwell's lightweight magnesium frame and passive planar design provide extended comfort during multi-hour tournament days. Audeze's expertise in audiophile-grade drivers brings studio precision to esports audio, appealing to pro players seeking technical advantage.",
                  achievements: ["Maxwell: only gaming headphone with planar magnetic drivers", "10Hz-50kHz frequency response: widest audio spectrum in competitive gaming", "Audiophile-grade manufacturing applied to esports competitive scenarios"],
                  flagships: ["Maxwell", "Maxwell Pro", "Mobius"] },
                { name: "EPOS", tagline: "Danish Audio Precision for Esports",
                  desc: "EPOS (formerly Sennheiser Gaming) carries forward decades of Sennheiser audio engineering expertise with headphones purpose-built for competitive esports communication. The H6PRO series features open and closed acoustic variants with studio-grade transducers and a lift-to-mute magnetic microphone system designed for seamless tournament communication. EPOS headphones are trusted by professional Counter-Strike and tactical FPS players who value voice clarity, natural sound reproduction, and Scandinavian build quality built to withstand the rigors of tournament travel and daily competitive play.",
                  achievements: ["H6PRO: dual acoustic variants (open/closed) for versatile competitive use", "Lift-to-mute magnetic boom arm for instant mute during tournament rounds", "Sennheiser audio heritage with dedicated esports engineering division"],
                  flagships: ["H6PRO", "GSP 500", "H3"] },
              ].map((brand, bi) => {
                const col = BRAND_COLORS[brand.name] || "#8a8460";
                const brandKbds = headphones.filter(m => m.brand === brand.name).sort((a, b) => b.proUsage - a.proUsage);
                const totalProUsage = brandKbds.reduce((s, m) => s + m.proUsage, 0);
                const proCount = allPlayers.filter(p => brandKbds.some(m => m.name === p.headphone)).length;
                return (
                  <div key={brand.name} className="group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                    style={{ background: "#ffffff", border: `1px solid ${col}15`, boxShadow: `0 2px 8px ${col}06` }}
                    onClick={() => { window.location.href = `/brands/${brand.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`; }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${col}15, 0 0 0 1px ${col}30`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 2px 8px ${col}06`; }}>
                    {/* Banner with brand color + flagship product */}
                    <div className="relative h-36 overflow-hidden" style={{ background: `linear-gradient(135deg, ${col}18 0%, ${col}06 100%)` }}>
                      {/* Large faded brand logo bg */}
                      {getBrandLogo(brand.name) && <div className="absolute -right-6 -top-6 opacity-[0.05]" style={{ transform: "rotate(12deg)" }}><img loading="lazy" src={getBrandLogo(brand.name)} alt="" className="w-40 h-40 object-contain" /></div>}
                      {/* Brand identity */}
                      <div className="absolute top-4 left-5 flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.92)", boxShadow: `0 2px 8px ${col}20` }}>
                          {getBrandLogo(brand.name) ? <img loading="lazy" src={getBrandLogo(brand.name)} alt={brand.name} className="w-7 h-7 object-contain" /> : <Building2 size={20} style={{ color: col }} />}
                        </div>
                        <div>
                          <h3 className="text-xl font-black leading-tight" style={{ color: col }}>{brand.name}</h3>
                          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: `${col}90` }}>{brand.tagline}</div>
                        </div>
                      </div>
                      {/* Flagship headphone image floating right */}
                      {brandKbds[0] && getHeadphoneImage(brandKbds[0].name) && (
                        <div className="absolute right-3 bottom-0 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                          <img loading="lazy" src={getHeadphoneImage(brandKbds[0].name)} alt={brandKbds[0].name} className="h-24 object-contain" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }} />
                        </div>
                      )}
                      {/* Stats badges at bottom-left of banner */}
                      <div className="absolute bottom-3 left-5 flex gap-2">
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.85)", color: col, backdropFilter: "blur(4px)" }}>{brandKbds.length} models</span>
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.85)", color: col, backdropFilter: "blur(4px)" }}>{proCount} pros</span>
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.85)", color: "#2d2824", backdropFilter: "blur(4px)" }}>{totalProUsage.toFixed(1)}% share</span>
                      </div>
                    </div>

                    <div className="px-5 py-4">
                      {/* Description - truncated */}
                      <p className="text-xs leading-relaxed mb-3" style={{ color: "#7d6e1e", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{brand.desc}</p>

                      {/* Flagship products with images */}
                      <div className="mb-3">
                        <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "#9e9578" }}>Flagship Models</div>
                        <div className="flex gap-2">
                          {brand.flagships.slice(0, 3).map((f, fi) => {
                            const kbd = headphones.find(m => m.name === f || m.name.includes(f));
                            const fImg = getHeadphoneImage(f) || (kbd ? getHeadphoneImage(kbd.name) : null);
                            return (
                              <a key={fi} href={kbd ? amazonLink(kbd.name) : "#"} target="_blank" rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="flex-1 flex flex-col items-center p-2 rounded-lg text-center transition-all hover:scale-105 no-underline"
                                style={{ background: `${col}06`, border: `1px solid ${col}10`, textDecoration: "none" }}>
                                {fImg ? <img loading="lazy" src={fImg} alt={f} className="h-10 object-contain mb-1" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))" }} /> : <div className="h-10 flex items-center justify-center opacity-20">{icon("headphone", 20)}</div>}
                                <div className="text-[9px] font-bold truncate w-full" style={{ color: col }}>{f.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</div>
                                {kbd && <div className="text-[9px]" style={{ color: "#9e9578" }}>${kbd.price}</div>}
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Explore button */}
                      <div className="w-full py-2 rounded-lg text-center text-[11px] font-bold uppercase tracking-wider transition-all"
                        style={{ background: `${col}08`, color: col, border: `1px solid ${col}15` }}>
                        Explore {brand.name} →
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "trends" && (
          <div>
            <SectionTitle color="#c9a227" sub="How esports headphones have evolved over the years">Industry Trends & Evolution</SectionTitle>

            {/* ── Hero stat cards ── */}
            {(() => {
              const lightest = [...headphones].sort((a, b) => a.weight - b.weight)[0];
              const mostPopular = [...headphones].sort((a, b) => b.proUsage - a.proUsage)[0];
              const widestFreq = [...headphones].sort((a, b) => b.frequencyResponse - a.frequencyResponse)[0];
              const cheapest = [...headphones].sort((a, b) => a.price - b.price)[0];
              const items = [
                { label: "Lightest", value: lightest.name.replace(lightest.brand + " ", ""), stat: `${lightest.weight}g`, icon: "⚡", color: "#22c55e", grad: "135deg, #22c55e08, #22c55e02", kbd: lightest },
                { label: "Most Popular", value: mostPopular.name.replace(mostPopular.brand + " ", ""), stat: `${mostPopular.proUsage}%`, icon: "👑", color: "#c9a227", grad: "135deg, #c9a22710, #c9a22702", kbd: mostPopular },
                { label: "Best Frequency", value: widestFreq.name.replace(widestFreq.brand + " ", ""), stat: `${widestFreq.frequencyResponse}kHz`, icon: "🎵", color: "#6366f1", grad: "135deg, #6366f108, #6366f102", kbd: widestFreq },
                { label: "Best Value", value: cheapest.name.replace(cheapest.brand + " ", ""), stat: `$${cheapest.price}`, icon: "💰", color: "#f59e0b", grad: "135deg, #f59e0b08, #f59e0b02", kbd: cheapest },
              ];
              return (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                  {items.map((s, i) => (
                    <div key={i} className="relative rounded-2xl p-4 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                      style={{ background: `linear-gradient(${s.grad})`, border: `1px solid ${s.color}15` }}
                      onClick={() => navigateToHeadphone(s.kbd)}>
                      <div className="absolute top-3 right-3 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">{s.icon}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: s.color }}>{s.label}</div>
                      <div className="text-2xl font-black mb-1" style={{ fontFamily: "'Space Grotesk', system-ui", color: s.color }}>{s.stat}</div>
                      <div className="text-xs font-bold truncate" style={{ color: "#3d3a30" }}>{s.value}</div>
                      <a href={amazonLink(s.kbd.name)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                        className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-lg text-[10px] font-bold no-underline hover:scale-105 transition-all"
                        style={{ background: `${s.color}15`, color: s.color, textDecoration: "none" }}>{I.cart(9)} ${s.kbd.price}</a>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* ── Main Charts - Dark themed cards ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(145deg, #1a1814, #2a2520)", border: "1px solid #3a352e" }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle, #c9a22708, transparent 70%)" }} />
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#c9a227" }}>Weight Evolution</div>
                <div className="text-sm mb-4" style={{ color: "#9e9578" }}>Average headphone weight over time</div>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={weightTrend}>
                    <defs>
                      <linearGradient id="wg1d" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c9a227" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#c9a227" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="wg2d" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: "#9e9578", fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "#9e9578", fontSize: 11 }} unit="g" tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="avgWeight" stroke="#c9a227" fill="url(#wg1d)" strokeWidth={2.5} name="Avg Weight" dot={{ r: 3, fill: "#c9a227", strokeWidth: 0 }} />
                    <Area type="monotone" dataKey="lightest" stroke="#22c55e" fill="url(#wg2d)" strokeWidth={2} name="Lightest" strokeDasharray="4 4" dot={{ r: 2, fill: "#22c55e", strokeWidth: 0 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(145deg, #1a1814, #2a2520)", border: "1px solid #3a352e" }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle, #6366f108, transparent 70%)" }} />
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#818cf8" }}>Frequency Response</div>
                <div className="text-sm mb-4" style={{ color: "#9e9578" }}>Freq. response evolution (Hz)</div>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={frequencyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: "#9e9578", fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "#9e9578", fontSize: 11 }} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, color: "#9e9578" }} />
                    <Line type="monotone" dataKey="max" stroke="#818cf8" strokeWidth={2.5} dot={{ r: 4, fill: "#818cf8", strokeWidth: 0 }} name="Max Available" />
                    <Line type="monotone" dataKey="avg" stroke="#c9a227" strokeWidth={2} dot={{ r: 3, fill: "#c9a227", strokeWidth: 0 }} name="Average" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(145deg, #1a1814, #2a2520)", border: "1px solid #3a352e" }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle, #22c55e08, transparent 70%)" }} />
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#22c55e" }}>Connectivity</div>
                <div className="text-sm mb-4" style={{ color: "#9e9578" }}>Wireless vs wired adoption among pros</div>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={wirelessTrend}>
                    <defs>
                      <linearGradient id="wlg1d" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="wlg2d" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: "#9e9578", fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "#9e9578", fontSize: 11 }} unit="%" domain={[0, 100]} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, color: "#9e9578" }} />
                    <Area type="monotone" dataKey="wireless" stroke="#22c55e" fill="url(#wlg1d)" strokeWidth={2.5} name="Wireless %" dot={{ r: 3, fill: "#22c55e", strokeWidth: 0 }} />
                    <Area type="monotone" dataKey="wired" stroke="#ef4444" fill="url(#wlg2d)" strokeWidth={2} name="Wired %" strokeDasharray="4 4" dot={{ r: 2, fill: "#ef4444", strokeWidth: 0 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(145deg, #1a1814, #2a2520)", border: "1px solid #3a352e" }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle, #f59e0b08, transparent 70%)" }} />
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#f59e0b" }}>Pricing</div>
                <div className="text-sm mb-4" style={{ color: "#9e9578" }}>Headphone price evolution (USD)</div>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={priceTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: "#9e9578", fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "#9e9578", fontSize: 11 }} unit="$" tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, color: "#9e9578" }} />
                    <Line type="monotone" dataKey="flagship" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }} name="Flagship" />
                    <Line type="monotone" dataKey="avg" stroke="#c9a227" strokeWidth={2} dot={{ r: 3, fill: "#c9a227", strokeWidth: 0 }} name="Average" />
                    <Line type="monotone" dataKey="budget" stroke="#22c55e" strokeWidth={1.5} dot={{ r: 2, fill: "#22c55e", strokeWidth: 0 }} name="Budget" strokeDasharray="4 4" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ── Form Factor + Tech Snapshot - horizontal cards ── */}
            <SectionTitle color="#c9a227" sub="Form factors, drivers, weight classes, and frequency tiers">Technology Breakdown</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {/* Form Factor */}
              <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "#c9a227" }}>Form Factor</div>
                {(() => {
                  const shapeCounts = {};
                  allPlayers.forEach(p => {
                    const m = headphones.find(mm => mm.name === p.headphone || (p.headphone && p.headphone.includes(mm.name)));
                    if (m) shapeCounts[m.formFactor] = (shapeCounts[m.formFactor] || 0) + 1;
                  });
                  const total = Object.values(shapeCounts).reduce((a, b) => a + b, 0);
                  const colors = { "Over-ear": "#c9a227", "On-ear": "#6366f1", "Open-back": "#22c55e" };
                  return Object.entries(shapeCounts).sort((a, b) => b[1] - a[1]).map(([name, count]) => {
                    const pct = Math.round(count / total * 100);
                    const col = colors[name] || "#9e9578";
                    return (
                      <div key={name} className="mb-3">
                        <div className="flex justify-between text-xs mb-1"><span className="font-bold" style={{ color: col }}>{name}</span><span className="font-black" style={{ color: col }}>{pct}%</span></div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${col}90, ${col})` }} />
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Freq Tiers */}
              <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "#818cf8" }}>Freq. Response Tiers</div>
                {[
                  { label: "Basic (<8kHz)", min: 0, max: 8, color: "#ef4444" },
                  { label: "Standard (8-12k)", min: 8, max: 13, color: "#c9a227" },
                  { label: "Extended (12k+)", min: 13, max: 999, color: "#22c55e" },
                ].map((t, i) => {
                  const count = headphones.filter(m => m.frequencyResponse >= t.min && m.frequencyResponse < t.max).length;
                  const pct = Math.round(count / headphones.length * 100);
                  return (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between text-xs mb-1"><span className="font-bold" style={{ color: t.color }}>{t.label}</span><span className="font-black" style={{ color: t.color }}>{count} ({pct}%)</span></div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${t.color}90, ${t.color})` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Top Drivers */}
              <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "#f59e0b" }}>Top Drivers</div>
                {(() => {
                  const sc = {}; headphones.forEach(m => { sc[m.driverType] = (sc[m.driverType] || 0) + 1; });
                  const top5 = Object.entries(sc).sort((a, b) => b[1] - a[1]).slice(0, 5);
                  const cols = ["#c9a227", "#6366f1", "#22c55e", "#f59e0b", "#ef4444"];
                  return top5.map(([sensor, count], i) => (
                    <div key={sensor} className="mb-3">
                      <div className="flex justify-between text-xs mb-1"><span className="font-bold truncate mr-2" style={{ color: cols[i] }}>{sensor}</span><span className="font-black flex-shrink-0" style={{ color: cols[i] }}>{count}</span></div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                        <div className="h-full rounded-full" style={{ width: `${(count / top5[0][1]) * 100}%`, background: `linear-gradient(90deg, ${cols[i]}90, ${cols[i]})` }} />
                      </div>
                    </div>
                  ));
                })()}
              </div>

              {/* Weight Classes */}
              <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "#22c55e" }}>Weight Classes</div>
                {[
                  { label: "Ultralight (<200g)", min: 0, max: 200, color: "#22c55e" },
                  { label: "Light (200-250g)", min: 200, max: 250, color: "#c9a227" },
                  { label: "Standard (250-300g)", min: 250, max: 300, color: "#6366f1" },
                  { label: "Mid (300-350g)", min: 300, max: 350, color: "#f59e0b" },
                  { label: "Heavy (350g+)", min: 350, max: 9999, color: "#ef4444" },
                ].map((c, i) => {
                  const count = headphones.filter(m => m.weight >= c.min && m.weight < c.max).length;
                  const pct = Math.round(count / headphones.length * 100);
                  return (
                    <div key={i} className="mb-2.5">
                      <div className="flex justify-between text-xs mb-0.5"><span className="font-bold" style={{ color: c.color }}>{c.label}</span><span className="font-black" style={{ color: c.color }}>{count}</span></div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${c.color}90, ${c.color})` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Brand Scorecard - Card rows ── */}
            <SectionTitle color="#c9a227" sub="How the top brands stack up across every major metric">Brand Performance Scorecard</SectionTitle>
            {(() => {
              const topBrandNames = ["Razer", "Logitech", "SteelSeries", "Corsair", "HyperX", "beyerdynamic", "Sennheiser", "ASTRO", "Sony", "ASUS"];
              const brandStats = topBrandNames.map(brand => {
                const bh = headphones.filter(m => m.brand === brand);
                const guessBrand = (hpName) => {
                  if (!hpName) return null;
                  const n = hpName.toLowerCase();
                  if (n.includes("razer") || n.includes("kraken") || n.includes("barracuda") || n.includes("blackshark")) return "Razer";
                  if (n.includes("logitech") || n.includes("g pro") || n.includes("gpro") || n.includes("g733") || n.includes("g435")) return "Logitech";
                  if (n.includes("steelseries") || n.includes("arctis")) return "SteelSeries";
                  if (n.includes("corsair") || n.includes("hs80") || n.includes("hs70") || n.includes("virtuoso")) return "Corsair";
                  if (n.includes("hyperx") || n.includes("cloud")) return "HyperX";
                  if (n.includes("beyerdynamic") || n.includes("dt 770") || n.includes("dt 990") || n.includes("dt770") || n.includes("dt990")) return "beyerdynamic";
                  if (n.includes("sennheiser") || n.includes("hd 560") || n.includes("hd560") || n.includes("game one") || n.includes("pc38x")) return "Sennheiser";
                  if (n.includes("astro") || n.includes("a40") || n.includes("a50")) return "ASTRO";
                  if (n.includes("sony") || n.includes("inzone")) return "Sony";
                  if (n.includes("asus") || n.includes("rog")) return "ASUS";
                  if (n.includes("epos") || n.includes("gsp 500") || n.includes("h6pro") || n.includes("h3")) return "EPOS";
                  return null;
                };
                const bp = allPlayers.filter(p => {
                  const m = headphones.find(mm => mm.name === p.headphone || (p.headphone && p.headphone.includes(mm.name)));
                  return (m ? m.brand : guessBrand(p.headphone)) === brand;
                });
                return {
                  brand, headphoneCount: bh.length, proShare: Math.round(bp.length / allPlayers.length * 100),
                  avgWeight: bh.length ? Math.round(bh.reduce((a, m) => a + m.weight, 0) / bh.length) : 0,
                  avgPrice: bh.length ? Math.round(bh.reduce((a, m) => a + m.price, 0) / bh.length) : 0,
                  maxPoll: bh.length ? Math.max(...bh.map(m => m.frequencyResponse)) : 0,
                  avgRating: bh.length ? (bh.reduce((a, m) => a + m.rating, 0) / bh.length).toFixed(1) : 0,
                };
              }).sort((a, b) => b.proShare - a.proShare);
              const maxShare = brandStats[0]?.proShare || 1;
              return (
                <div className="space-y-2 mb-6">
                  {brandStats.map((b, i) => {
                    const col = BRAND_COLORS[b.brand] || "#9e9578";
                    return (
                      <div key={b.brand} className="rounded-xl p-3 flex items-center gap-3 group transition-all duration-200 hover:shadow-md cursor-pointer"
                        style={{ background: i === 0 ? `${col}08` : "#ffffff", border: `1px solid ${i === 0 ? col + "20" : "#e6e3d6"}` }}
                        onClick={() => { setActiveTab("brands"); setFilterBrand(b.brand); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.boxShadow = `inset 3px 0 0 ${col}`; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                        <div className="w-8 text-center font-black text-sm" style={{ color: i < 3 ? col : "#d4d0be" }}>{i + 1}</div>
                        {getBrandLogo(b.brand) && <img loading="lazy" src={getBrandLogo(b.brand)} alt={b.brand} className="w-6 h-6 object-contain" />}
                        <div className="font-bold text-sm" style={{ color: col, minWidth: 100 }}>{b.brand}</div>
                        <div className="flex-1 hidden sm:flex items-center gap-2">
                          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#0000000a", maxWidth: 200 }}>
                            <div className="h-full rounded-full" style={{ width: `${(b.proShare / maxShare) * 100}%`, background: `linear-gradient(90deg, ${col}60, ${col})` }} />
                          </div>
                          <span className="text-xs font-black" style={{ color: col, minWidth: 32 }}>{b.proShare}%</span>
                        </div>
                        <div className="hidden md:flex items-center gap-4 text-xs" style={{ color: "#9e9578" }}>
                          <span>{b.headphoneCount} models</span>
                          <span>{b.avgWeight}g avg</span>
                          <span>${b.avgPrice} avg</span>
                          <span className="font-bold" style={{ color: parseFloat(b.avgRating) >= 9 ? "#c9a227" : "#9e9578" }}>{b.avgRating}/10</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

          </div>
        )}

        {/* ── SENSORS TAB ── */}
        {activeTab === "sensors" && (() => {
          const sensorData = headphones.map(m => ({
            sensor: m.driverType,
            brand: m.brand,
            name: m.name,
            impedance: m.impedance || 32,
            frequencyResponse: m.frequencyResponse,
            weight: m.weight,
            proUsage: m.proUsage,
            price: m.price,
          }));
          // Build sensor profiles
          const sensorMap = {};
          headphones.forEach(m => {
            if (!sensorMap[m.driverType]) sensorMap[m.driverType] = { driverType: m.driverType, headphones: [], totalUsage: 0, avgImpedance: 0, avgPolling: 0, avgWeight: 0, avgPrice: 0, brands: new Set() };
            sensorMap[m.driverType].headphones.push(m);
            sensorMap[m.driverType].totalUsage += m.proUsage;
            sensorMap[m.driverType].brands.add(m.brand);
          });
          const sensorProfiles = Object.values(sensorMap).map(s => {
            const switchHeadphoneNames = s.headphones.map(m => m.name);
            const playerCount = allPlayers.filter(p => p.headphone && switchHeadphoneNames.some(mn => p.headphone === mn || p.headphone.includes(mn.split(" ").slice(-2).join(" ")))).length;
            return {
            ...s,
            totalUsage: Math.round(s.totalUsage * 10) / 10,
            headphoneCount: s.headphones.length,
            playerCount,
            avgImpedance: Math.round(s.headphones.reduce((a, m) => a + (m.impedance || 32), 0) / s.headphones.length),
            avgPolling: Math.round(s.headphones.reduce((a, m) => a + m.frequencyResponse, 0) / s.headphones.length),
            avgWeight: Math.round(s.headphones.reduce((a, m) => a + m.weight, 0) / s.headphones.length * 10) / 10,
            avgPrice: Math.round(s.headphones.reduce((a, m) => a + m.price, 0) / s.headphones.length),
            brandList: [...s.brands].join(", "),
            topKbd: s.headphones.sort((a, b) => b.proUsage - a.proUsage)[0]?.name || "",
          }});

          // Sensor usage by game
          const gameColors = GAME_COLORS;
          const allGamesForSensor = ["All", ...new Set(allPlayers.map(p => p.game))];
          const sensorByGame = {};
          allPlayers.forEach(p => {
            const m = headphones.find(mm => mm.name === p.headphone);
            if (!m) return;
            const game = p.game;
            if (!sensorByGame[game]) sensorByGame[game] = {};
            sensorByGame[game][m.driverType] = (sensorByGame[game][m.driverType] || 0) + 1;
          });

          // Sort sensor profiles
          const sortedSensors = [...sensorProfiles].sort((a, b) => {
            if (!sensorSort.key) return 0;
            const k = sensorSort.key;
            let av = a[k], bv = b[k];
            if (typeof av === "string") return sensorSort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
            return sensorSort.dir === "asc" ? (av || 0) - (bv || 0) : (bv || 0) - (av || 0);
          });

          const sensorHeaders = [
            { key: "sensor", label: "Driver" },
            { key: "headphoneCount", label: "Headphones" },
            { key: "totalUsage", label: "Pro Usage %" },
            { key: "brandList", label: "Brands" },
            { key: "topKbd", label: "Top Headphone" },
            { key: "avgImpedance", label: "Avg Impedance" },
            { key: "avgPolling", label: "Avg Freq" },
            { key: "avgWeight", label: "Avg Weight" },
            { key: "avgPrice", label: "Avg Price" },
          ];

          // Overall top sensor
          const topSensor = sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage)[0];

          return (
          <div>
            <SectionTitle color="#a68b1b" sub="Comprehensive breakdown of every driver powering pro esports headphones">Headphone Driver Analytics</SectionTitle>

            {/* Hero banner */}
            <div className="rounded-2xl overflow-hidden mb-5 relative" style={{ border: "1px solid #7d6e1e15" }}>
              <img src="/images/drivers/driver-hero.svg" alt="Driver Analytics" className="w-full h-auto" style={{ minHeight: 120 }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#d4af37", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>Inside the Sound</div>
                  <div className="text-xs sm:text-sm mt-1" style={{ color: "#d4c47a", textShadow: "0 1px 10px rgba(0,0,0,0.9)" }}>The technology behind every click, callout, and clutch</div>
                </div>
              </div>
            </div>

            {/* Top driver highlight */}
            <div className="rounded-2xl p-5 mb-5" style={{ background: "#7d6e1e08", border: "1px solid #7d6e1e15" }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#7d6e1e0a" }}>
                  <Cpu size={24} style={{ color: "#7d6e1e" }} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#9e9578" }}>Most Popular Driver in Esports</div>
                  <div className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#7d6e1e" }}>{topSensor?.driverType}</div>
                  <div className="text-xs" style={{ color: "#7d6e1e" }}>Used in {topSensor?.headphoneCount} headphones · {topSensor?.playerCount} pro players · {topSensor?.totalUsage}% combined pro usage</div>
                </div>
              </div>
            </div>

            {/* Sensor overview cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
              {sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage).slice(0, 4).map((s, i) => {
                const colors = ["#c9a227", "#2d2824", "#a68b1b", "#9e9578"];
                const sensorImageMap = {
                  "50mm TriForce Titanium": "/images/drivers/triforce-titanium.svg",
                  "50mm TriForce Titanium Pro": "/images/drivers/triforce-titanium-pro.svg",
                  "50mm PRO-G": "/images/drivers/pro-g.svg",
                  "50mm PRO-G Graphene": "/images/drivers/pro-g-graphene.svg",
                  "40mm Custom": "/images/drivers/40mm-custom.svg",
                  "Dynamic Tesla": "/images/drivers/dynamic-tesla.svg",
                  "Custom Transducers": "/images/drivers/custom-transducers.svg",
                };
                const sensorDescs = {
                  "50mm TriForce Titanium": "Razer's proprietary TriForce Titanium 50mm drivers divide the driver into three parts — highs, mids, and lows — allowing each frequency range to be individually tuned for clarity. This design eliminates the muddiness common in single-diaphragm drivers, delivering crisp footsteps and gunshots in competitive FPS titles. Found in the BlackShark V2 series, these drivers made Razer the dominant brand in esports audio.",
                  "50mm TriForce Titanium Pro": "The second generation of Razer's TriForce driver platform, featured in the BlackShark V3 Pro. The Pro variant adds titanium-coated diaphragms for improved high-frequency response and reduced distortion at higher volumes. Many professional players consider it the best closed-back driver for competitive gaming.",
                  "50mm PRO-G": "Logitech's PRO-G 50mm drivers use a hybrid mesh material that combines the lightness of woven fabric with the acoustic properties of advanced polymers. This unique construction delivers detailed audio with strong bass response while keeping the overall driver weight low. Featured in the G Pro X series trusted by hundreds of esports professionals worldwide.",
                  "50mm PRO-G Graphene": "Logitech's premium driver technology coats the diaphragm with graphene — one of the strongest and thinnest materials known — reducing distortion and improving transient response. The result is faster, more accurate sound reproduction ideal for hearing precise audio cues in competitive play. Found in the G PRO X 2, this driver represents Logitech's best audio technology.",
                  "40mm Custom": "Custom-tuned 40mm dynamic drivers optimized for gaming audio. The smaller 40mm size allows for lighter, more comfortable headset designs while still delivering clear mids and highs essential for competitive gaming. Used across multiple brands including SteelSeries and ASTRO, these drivers prioritize clarity and positional audio over raw bass output.",
                  "Dynamic Tesla": "beyerdynamic's legendary Tesla driver technology uses powerful magnets to achieve higher efficiency with less power. Named after the unit of magnetic flux density, Tesla drivers deliver audiophile-grade sound quality with exceptional detail and separation. The DT 990 Pro's open-back Tesla drivers are beloved by pros who prioritize soundstage and natural audio reproduction.",
                  "Custom Transducers": "Sennheiser's proprietary transducer technology leverages decades of audio engineering expertise to deliver natural, detailed sound. These custom drivers are precision-manufactured in Germany with tight tolerances, ensuring consistent quality and exceptional clarity across the frequency spectrum.",
                };
                const sensorImg = sensorImageMap[s.driverType];
                const sensorDesc = sensorDescs[s.driverType];
                return (
                  <div key={i} className="rounded-xl p-4" style={{ background: `${colors[i]}08`, border: `1px solid ${colors[i]}12` }}>
                    <div className="text-sm font-black mb-1 text-center" style={{ color: colors[i], color: colors[i] }}>#{i + 1} Most Used</div>
                    <div className="text-sm font-black mb-2 text-center" style={{ color: colors[i] }}>{s.driverType}</div>
                    {sensorImg && <div className="flex justify-center mb-2"><img loading="lazy" src={sensorImg} alt={s.driverType} className="h-24 sm:h-32 object-contain" style={{ filter: `drop-shadow(0 4px 12px ${colors[i]}30)` }} /></div>}
                    <div className="text-xl sm:text-2xl font-black text-center">{s.totalUsage}%</div>
                    <div className="text-sm opacity-30 text-center mt-1">of pros use this driver</div>
                    {sensorDesc && <p className="text-sm opacity-70 mt-3 leading-relaxed">{sensorDesc}</p>}
                    <div className="text-sm opacity-85 mt-3">{s.headphoneCount} headphones use this driver:</div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {s.headphones.map(m => (
                        <button key={m.id} onClick={() => { navigateToHeadphone(m); }}
                          className="px-2 py-1 rounded-md text-sm transition-all hover:scale-105 cursor-pointer"
                          style={{ background: `${colors[i]}15`, border: `1px solid ${colors[i]}20`, color: colors[i], fontSize: 12 }}>
                          {m.name.replace(m.brand + " ", "")}
                        </button>
                      ))}
                    </div>
                    <div className="text-sm font-bold mt-1.5" style={{ color: colors[i] }}>{s.playerCount} pro players</div>
                  </div>
                );
              })}
            </div>

            {/* ── Driver Popularity Stats (from actual player data) ── */}
            {(() => {
              // Count driver usage across all tracked players
              const sensorCounts = {};
              let totalMatched = 0;
              allPlayers.forEach(p => {
                if (!p.headphone) return;
                const m = headphones.find(mm => {
                  const mn = mm.name.toLowerCase();
                  const pm = p.headphone.toLowerCase();
                  return pm === mn || pm.includes(mn) || mn.includes(pm);
                });
                if (m) {
                  sensorCounts[m.driverType] = (sensorCounts[m.driverType] || 0) + 1;
                  totalMatched++;
                }
              });
              const sortedSensorStats = Object.entries(sensorCounts).sort((a, b) => b[1] - a[1]);
              const top10 = sortedSensorStats.slice(0, 10);
              const maxCount = top10[0]?.[1] || 1;

              // Sensor by game breakdown for top 5 sensors
              const topSensorNames = top10.slice(0, 5).map(s => s[0]);
              const sensorGameBreakdown = {};
              topSensorNames.forEach(sn => { sensorGameBreakdown[sn] = {}; });
              allPlayers.forEach(p => {
                if (!p.headphone) return;
                const m = headphones.find(mm => {
                  const mn = mm.name.toLowerCase();
                  const pm = p.headphone.toLowerCase();
                  return pm === mn || pm.includes(mn) || mn.includes(pm);
                });
                if (m && topSensorNames.includes(m.driverType)) {
                  sensorGameBreakdown[m.driverType][p.game] = (sensorGameBreakdown[m.driverType][p.game] || 0) + 1;
                }
              });

              // Unique stats
              const uniqueSensors = Object.keys(sensorCounts).length;
              const topSensorPct = totalMatched > 0 ? Math.round(top10[0][1] / totalMatched * 100) : 0;
              const top3Pct = totalMatched > 0 ? Math.round(top10.slice(0, 3).reduce((a, s) => a + s[1], 0) / totalMatched * 100) : 0;

              const barColors = ["#c9a227", "#2d2824", "#a68b1b", "#9e9578", "#7d6e1e", "#d4d0be", "#4a4340", "#d4c47a", "#d4af37", "#8a7d3c"];
              const gameBarColors = { CS2: "#c47000", Valorant: "#c43848", LoL: "#c89b3c", Fortnite: "#3a60b0", "Dota 2": "#b83c30", "R6 Siege": "#3a6ca0", Apex: "#a82020", PUBG: "#c48a00", "Overwatch 2": "#c48018", "Call of Duty": "#3a8a3a", "Marvel Rivals": "#b81820", Deadlock: "#6d40c4", "Quake Champions": "#a83c00" };

              return (
                <div className="rounded-2xl p-5 mb-6" style={{ background: "#0000000a", border: "1px solid #e6e3d6" }}>
                  <div className="text-sm uppercase tracking-widest opacity-70 mb-4 font-bold text-center sm:text-left">Driver Popularity Across {totalMatched.toLocaleString()} Matched Pro Players</div>

                  {/* Summary stat pills */}
                  <div className="flex flex-wrap gap-2 mb-5 justify-center sm:justify-start">
                    <div className="rounded-lg px-3 py-2" style={{ background: "#a68b1b10" }}>
                      <span className="text-sm opacity-85">Top sensor: </span>
                      <span className="text-sm font-black" style={{ color: "#7d6e1e" }}>{top10[0]?.[0]} ({topSensorPct}%)</span>
                    </div>
                    <div className="rounded-lg px-3 py-2" style={{ background: "#a68b1b12" }}>
                      <span className="text-sm opacity-85">Top 3 concentration: </span>
                      <span className="text-sm font-black" style={{ color: "#a68b1b" }}>{top3Pct}%</span>
                    </div>
                    <div className="rounded-lg px-3 py-2" style={{ background: "#c9a22712" }}>
                      <span className="text-sm opacity-85">Unique sensors tracked: </span>
                      <span className="text-sm font-black" style={{ color: "#c9a227" }}>{uniqueSensors}</span>
                    </div>
                    <div className="rounded-lg px-3 py-2" style={{ background: "#9e957810" }}>
                      <span className="text-sm opacity-85">Players on proprietary sensors: </span>
                      <span className="text-sm font-black" style={{ color: "#7d6e1e" }}>{sensorCounts["Custom"] || sensorCounts["Custom Sony"] || 0}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                    {/* Left: Bar chart */}
                    <div>
                      <div className="text-sm opacity-30 mb-3 font-bold uppercase tracking-wider">Top 10 Sensors by Player Count</div>
                      <div className="space-y-2">
                        {top10.map(([sensor, count], i) => {
                          const pct = Math.round(count / totalMatched * 100);
                          const barW = Math.max(count / maxCount * 100, 4);
                          return (
                            <div key={sensor} className="flex items-center gap-2">
                              <div className="text-sm font-bold w-20 sm:w-32 truncate cursor-pointer hover:underline" style={{ color: barColors[i] }}
                                onClick={() => document.getElementById(`sensor-group-${sensor.replace(/\s+/g, "-").toLowerCase()}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}>{sensor}</div>
                              <div className="flex-1 h-6 rounded-md overflow-hidden" style={{ background: "#0000000a" }}>
                                <div className="h-full rounded-md flex items-center px-2 transition-all" style={{ width: `${barW}%`, background: `${barColors[i]}25`, borderRight: `2px solid ${barColors[i]}` }}>
                                  <span className="text-sm font-black" style={{ color: barColors[i] }}>{count}</span>
                                </div>
                              </div>
                              <div className="text-sm opacity-30 w-10 text-right">{pct}%</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: Game breakdown for top 5 sensors */}
                    <div>
                      <div className="text-sm opacity-30 mb-3 font-bold uppercase tracking-wider">Top 5 Sensors — Game Distribution</div>
                      <div className="space-y-3">
                        {topSensorNames.map((sn, si) => {
                          const games = Object.entries(sensorGameBreakdown[sn]).sort((a, b) => b[1] - a[1]);
                          const total = games.reduce((a, g) => a + g[1], 0);
                          return (
                            <div key={sn}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-base font-black cursor-pointer hover:underline transition-all" style={{ color: barColors[si] }}
                                  onClick={() => document.getElementById(`sensor-group-${sn.replace(/\s+/g, "-").toLowerCase()}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}>{sn}</span>
                                <span className="text-base opacity-20">({total} players)</span>
                              </div>
                              {/* Stacked bar */}
                              <div className="flex h-6 rounded-md overflow-hidden" style={{ background: "#0000000a" }}>
                                {games.map(([game, cnt]) => {
                                  const w = Math.max(cnt / total * 100, 2);
                                  return (
                                    <div key={game} className="h-full flex items-center justify-center relative group" style={{ width: `${w}%`, background: `${gameBarColors[game] || "#666"}40` }}
                                      title={`${game}: ${cnt} players (${Math.round(cnt/total*100)}%)`}>
                                      {w > 8 && <span style={{ fontSize: 12 }} className="font-bold opacity-70">{game}</span>}
                                    </div>
                                  );
                                })}
                              </div>
                              {/* Legend */}
                              <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                                {games.slice(0, 5).map(([game, cnt]) => (
                                  <span key={game} style={{ fontSize: 12 }} className="opacity-85">
                                    <span style={{ color: gameBarColors[game] || "#666" }}>●</span> {game} {Math.round(cnt/total*100)}%
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Sensor table */}
            <div className="text-sm uppercase tracking-widest opacity-70 mb-3 mt-8">All Sensors  -  Click Headers to Sort</div>
            <div className="overflow-x-auto rounded-2xl mb-8" style={{ border: "1px solid #e6e3d6" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#ffffff" }}>
                    {sensorHeaders.map(h => (
                      <th key={h.label} className="px-4 py-3 text-left text-sm uppercase tracking-wider font-bold cursor-pointer select-none hover:opacity-80"
                        style={{ color: sensorSort.key === h.key ? "#a68b1b" : "#9e9578" }}
                        onClick={() => setSensorSort(prev => prev.key === h.key ? { key: h.key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key: h.key, dir: typeof sensorProfiles[0]?.[h.key] === "string" ? "asc" : "desc" })}>
                        {h.label}{sensorSort.key === h.key ? (sensorSort.dir === "asc" ? " ▲" : " ▼") : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedSensors.map((s, i) => (
                    <tr key={s.driverType} style={{ borderBottom: "1px solid #00000008", background: i % 2 === 0 ? "#f5f2e6" : "#f5f3ea" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#a68b1b08"}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#f5f2e6" : "#f5f3ea"}>
                      <td className="px-4 py-3 font-black cursor-pointer hover:underline" style={{ color: "#7d6e1e" }}
                        onClick={() => document.getElementById(`sensor-group-${s.driverType.replace(/\s+/g, "-").toLowerCase()}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}>{s.driverType}</td>
                      <td className="px-4 py-3 font-bold">{s.headphoneCount}</td>
                      <td className="px-4 py-3 font-black">{s.totalUsage}%</td>
                      <td className="px-4 py-3 text-sm opacity-50">{s.brandList}</td>
                      <td className="px-4 py-3 text-sm"><a href={amazonLink(s.topKbd)} target="_blank" rel="noopener noreferrer" className="no-underline hover:opacity-80" style={{ color: "#c9a227", textDecoration: "none" }}>{s.topKbd.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</a></td>
                      <td className="px-4 py-3">{`${s.avgImpedance}mm`}</td>
                      <td className="px-4 py-3">{s.avgPolling}kHz</td>
                      <td className="px-4 py-3">{s.avgWeight}g</td>
                      <td className="px-4 py-3">{"$"}{s.avgPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Which headphones use each sensor */}
            <SectionTitle color="#a68b1b" sub="Every headphone in our database grouped by switch">Headphones by Driver</SectionTitle>
            <div className="space-y-4 mb-8">
              {sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage).map((s, si) => (
                <div key={s.driverType} id={`sensor-group-${s.driverType.replace(/\s+/g, "-").toLowerCase()}`} className="rounded-xl p-4" style={{ background: "#ffffff", border: "1px solid #e6e3d6", scrollMarginTop: 70 }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-black" style={{ color: "#7d6e1e" }}>{s.driverType}</div>
                      <div className="text-sm opacity-70">{s.totalUsage}% pro usage</div>
                    </div>
                    <div className="text-sm opacity-70">{s.headphoneCount} model{s.headphoneCount !== 1 ? "s" : ""}</div>
                  </div>
                  {s.headphones.length > 0 && (() => { const topM = s.headphones.sort((a, b) => b.proUsage - a.proUsage)[0]; return (
                    <a href={amazonLink(topM.name)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#c9a22714", color: "#c9a227", border: "1px solid #c9a22718", textDecoration: "none" }}>
                      {I.cart(10)} Top pick: {topM.name.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")} — ${topM.price}
                    </a>
                  ); })()}
                  <div className="flex flex-wrap gap-2">
                    {s.headphones.sort((a, b) => b.proUsage - a.proUsage).map((m, mi) => (
                      <button key={mi} onClick={() => { navigateToHeadphone(m); }}
                        className="px-3 py-1.5 rounded-lg text-sm font-bold cursor-pointer transition-all hover:scale-105"
                        style={{ background: `${BRAND_COLORS[m.brand]}12`, border: `1px solid ${BRAND_COLORS[m.brand]}20`, color: BRAND_COLORS[m.brand] }}>
                        {getHeadphoneImage(m.name) && <img loading="lazy" src={getHeadphoneImage(m.name)} alt={`${m.name}`} className="inline h-4 mr-1 object-contain" />} {m.name} <span className="opacity-85">({m.proUsage}%)</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sensor popularity by game */}
            <SectionTitle color="#c9a227" sub="Which mechanical drivers are favored by professionals across competitive titles">Driver Popularity by Game</SectionTitle>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {allGamesForSensor.map(g => (
                <button key={g} onClick={() => setSensorGameFilter(g)}
                  className="px-3 py-1 rounded-full text-sm font-bold transition-all flex items-center gap-1.5"
                  style={{
                    background: sensorGameFilter === g ? (gameColors[g] || "#a68b1b") : "#0000000a",
                    color: sensorGameFilter === g ?  "#1a1614" : "#2d2824",
                    border: sensorGameFilter === g ? "none" : "1px solid #e6e3d6",
                  }}>
                  {g !== "All" && GAME_IMAGE_URLS[g] && <img loading="lazy" src={GAME_IMAGE_URLS[g]} alt={g} className="w-4 h-4 object-contain" />}
                  {g}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(sensorGameFilter === "All" ? Object.keys(sensorByGame) : [sensorGameFilter]).filter(g => sensorByGame[g]).map(game => {
                const gc = gameColors[game] || "#8a8460";
                const entries = Object.entries(sensorByGame[game]).sort((a, b) => b[1] - a[1]);
                const total = entries.reduce((a, e) => a + e[1], 0);
                return (
                  <div key={game} className="rounded-xl p-4" style={{ background: `${gc}06`, border: `1px solid ${gc}12` }}>
                    <div className="text-sm font-black mb-3 flex items-center gap-2" style={{ color: gc }}>{GAME_IMAGE_URLS[game] && <img loading="lazy" src={GAME_IMAGE_URLS[game]} alt={game} className="w-5 h-5 object-contain" />}{game}</div>
                    <div className="space-y-2">
                      {entries.slice(0, 5).map(([sensor, count], ei) => (
                        <div key={sensor} className="flex items-center gap-2">
                          <div className="w-28 text-sm font-bold truncate" style={{ color: ei === 0 ? gc : "#8a8460" }}>{sensor}</div>
                          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(count / entries[0][1]) * 100}%`, background: ei === 0 ? gc : `${gc}40` }} />
                          </div>
                          <div className="text-sm font-bold w-12 text-right" style={{ color: ei === 0 ? gc : "#9e9578" }}>{Math.round((count / total) * 100)}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sensor specs comparison */}
            <SectionTitle color="#9060c4" sub="Technical specifications compared across all drivers">Driver Spec Comparison</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-sm uppercase tracking-widest opacity-30 mb-4">Impedance by Driver Type</div>
                <div className="space-y-2">
                  {sensorProfiles.sort((a, b) => b.avgImpedance - a.avgImpedance).map((s, i) => (
                    <div key={s.driverType} className="flex items-center gap-2">
                      <div className="w-28 text-sm font-bold truncate">{s.driverType}</div>
                      <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                        <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700"
                          style={{ width: `${(s.avgImpedance / 4) * 100}%`, background: i === 0 ? "#9060c430" : "#00000008" }}>
                          <span className="text-sm font-bold" style={{ color: i === 0 ? "#9060c4" : "#9e9578", fontSize: 11 }}>{`${s.avgImpedance}mm`}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-sm uppercase tracking-widest opacity-30 mb-4">Avg Freq. Response by Sensor</div>
                <div className="space-y-2">
                  {sensorProfiles.sort((a, b) => b.avgPolling - a.avgPolling).map((s, i) => (
                    <div key={s.driverType} className="flex items-center gap-2">
                      <div className="w-28 text-sm font-bold truncate">{s.driverType}</div>
                      <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                        <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700"
                          style={{ width: `${(s.avgPolling / 20) * 100}%`, background: i === 0 ? "#a68b1b30" : "#00000008" }}>
                          <span className="text-sm font-bold" style={{ color: i === 0 ? "#a68b1b" : "#9e9578", fontSize: 11 }}>{s.avgPolling}kHz</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sensor Comparison Tool */}
            <SectionTitle color="#c9a227" sub="Select two drivers to compare specs, usage, and popularity head-to-head">Driver vs Driver Comparison</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm uppercase tracking-widest opacity-30 mb-2">Driver A</div>
                <select aria-label="Select first switch to compare" value={compareSensor1 || ""} onChange={e => setCompareSensor1(e.target.value || null)}
                  className="w-full px-4 py-3 rounded-xl text-sm cursor-pointer font-bold"
                  style={{ background: "#ffffff", border: `1px solid ${compareSensor1 ? "#c9a22730" : "#00000012"}`, color: compareSensor1 ? "#c9a227" : "#7d6e1e" }}>
                  <option value="">Select sensor...</option>
                  {sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage).map(s => (
                    <option key={s.driverType} value={s.driverType}>{s.driverType} ({s.totalUsage}% usage)</option>
                  ))}
                </select>
              </div>
              <div>
                <div className="text-sm uppercase tracking-widest opacity-30 mb-2">Driver B</div>
                <select aria-label="Select second switch to compare" value={compareSensor2 || ""} onChange={e => setCompareSensor2(e.target.value || null)}
                  className="w-full px-4 py-3 rounded-xl text-sm cursor-pointer font-bold"
                  style={{ background: "#ffffff", border: `1px solid ${compareSensor2 ? "#a68b1b30" : "#00000012"}`, color: compareSensor2 ? "#a68b1b" : "#7d6e1e" }}>
                  <option value="">Select sensor...</option>
                  {sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage).map(s => (
                    <option key={s.driverType} value={s.driverType}>{s.driverType} ({s.totalUsage}% usage)</option>
                  ))}
                </select>
              </div>
            </div>

            {compareSensor1 && compareSensor2 ? (() => {
              const s1 = sensorProfiles.find(s => s.driverType === compareSensor1);
              const s2 = sensorProfiles.find(s => s.driverType === compareSensor2);
              if (!s1 || !s2) return null;
              const c1 = "#c9a227", c2 = "#a68b1b";
              const compareRows = [
                { label: "Pro Usage", v1: `${s1.totalUsage}%`, v2: `${s2.totalUsage}%`, n1: s1.totalUsage, n2: s2.totalUsage, higher: "more" },
                { label: "Headphone Models", v1: s1.headphoneCount, v2: s2.headphoneCount, n1: s1.headphoneCount, n2: s2.headphoneCount, higher: "more" },
                { label: "Avg Impedance", v1: `${s1.avgImpedance}mm`, v2: `${s2.avgImpedance}mm`, n1: s1.avgImpedance, n2: s2.avgImpedance, higher: "more" },
                { label: "Avg Freq. Response", v1: `${s1.avgPolling}kHz`, v2: `${s2.avgPolling}kHz`, n1: s1.avgPolling, n2: s2.avgPolling, higher: "more" },
                { label: "Avg Weight", v1: `${s1.avgWeight}g`, v2: `${s2.avgWeight}g`, n1: s1.avgWeight, n2: s2.avgWeight, higher: "less" },
                { label: "Avg Price", v1: `$${s1.avgPrice}`, v2: `$${s2.avgPrice}`, n1: s1.avgPrice, n2: s2.avgPrice, higher: "less" },
                { label: "Brands", v1: s1.brandList, v2: s2.brandList, n1: 0, n2: 0, higher: "none" },
                { label: "Top Headphone", v1: s1.topKbd, v2: s2.topKbd, n1: 0, n2: 0, higher: "none" },
              ];
              const s1Wins = compareRows.filter(r => r.higher !== "none" && ((r.higher === "more" && r.n1 > r.n2) || (r.higher === "less" && r.n1 < r.n2))).length;
              const s2Wins = compareRows.filter(r => r.higher !== "none" && ((r.higher === "more" && r.n2 > r.n1) || (r.higher === "less" && r.n2 < r.n1))).length;
              return (
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e6e3d6" }}>
                  <div className="grid grid-cols-3" style={{ background: "#ffffff" }}>
                    <div className="p-4 text-center">
                      <div className="text-base sm:text-lg font-black text-center sm:text-left" style={{ color: c1 }}>{s1.driverType}</div>
                      <div className="text-sm opacity-30">{s1.brandList}</div>
                      <div className="text-2xl font-black mt-1" style={{ color: s1Wins > s2Wins ? c1 : "#00000015" }}>{s1Wins}</div>
                      <div className="text-xs" style={{ color: "#c4bfb8" }}>wins</div>
                    </div>
                    <div className="p-4 flex flex-col items-center justify-center">
                      <div className="text-xl font-black opacity-20">VS</div>
                    </div>
                    <div className="p-4 text-center">
                      <div className="text-base sm:text-lg font-black text-center sm:text-left" style={{ color: c2 }}>{s2.driverType}</div>
                      <div className="text-sm opacity-30">{s2.brandList}</div>
                      <div className="text-2xl font-black mt-1" style={{ color: s2Wins > s1Wins ? c2 : "#00000015" }}>{s2Wins}</div>
                      <div className="text-xs" style={{ color: "#c4bfb8" }}>wins</div>
                    </div>
                  </div>
                  {compareRows.map((row, ri) => {
                    const winner = row.higher === "none" ? "none" : row.higher === "more" ? (row.n1 > row.n2 ? "s1" : row.n2 > row.n1 ? "s2" : "tie") : (row.n1 < row.n2 ? "s1" : row.n2 < row.n1 ? "s2" : "tie");
                    return (
                      <div key={ri} className="grid grid-cols-3" style={{ background: ri % 2 === 0 ? "#f5f2e6" : "#f5f3ea", borderTop: "1px solid #00000008" }}>
                        <div className="p-3 text-center">
                          <span className="text-sm font-bold" style={{ color: winner === "s1" ? c1 : "#8a8460" }}>{row.v1}</span>
                          {winner === "s1" && <span className="ml-1 text-sm" style={{ color: c1 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
                        </div>
                        <div className="p-3 text-center">
                          <span className="text-sm uppercase tracking-wider opacity-30">{row.label}</span>
                          {row.higher !== "none" && row.n1 !== row.n2 && (
                            <div className="flex items-center gap-1 justify-center mt-1">
                              <div className="h-1.5 rounded-full" style={{ width: `${Math.min((row.n1 / Math.max(row.n1, row.n2)) * 40, 40)}px`, background: winner === "s1" ? c1 : `${c1}40` }} />
                              <div className="h-1.5 rounded-full" style={{ width: `${Math.min((row.n2 / Math.max(row.n1, row.n2)) * 40, 40)}px`, background: winner === "s2" ? c2 : `${c2}40` }} />
                            </div>
                          )}
                        </div>
                        <div className="p-3 text-center">
                          {winner === "s2" && <span className="mr-1 text-sm" style={{ color: c2 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
                          <span className="text-sm font-bold" style={{ color: winner === "s2" ? c2 : "#8a8460" }}>{row.v2}</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="grid grid-cols-2" style={{ background: "#ffffff", borderTop: "1px solid #e6e3d6" }}>
                    <div className="p-4">
                      <div className="text-sm uppercase tracking-widest opacity-20 mb-2">Headphones with {s1.driverType}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {s1.headphones.sort((a, b) => b.proUsage - a.proUsage).map((m, mi) => (
                          <button key={mi} onClick={() => { navigateToHeadphone(m); }}
                            className="px-2 py-1 rounded text-sm font-bold cursor-pointer transition-all hover:scale-105"
                            style={{ background: `${c1}12`, color: c1 }}>{getHeadphoneImage(m.name) && <img loading="lazy" src={getHeadphoneImage(m.name)} alt={`${m.name}`} className="inline h-4 mr-1 object-contain" />} {m.name.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-sm uppercase tracking-widest opacity-20 mb-2">Headphones with {s2.driverType}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {s2.headphones.sort((a, b) => b.proUsage - a.proUsage).map((m, mi) => (
                          <button key={mi} onClick={() => { navigateToHeadphone(m); }}
                            className="px-2 py-1 rounded text-sm font-bold cursor-pointer transition-all hover:scale-105"
                            style={{ background: `${c2}12`, color: c2 }}>{getHeadphoneImage(m.name) && <img loading="lazy" src={getHeadphoneImage(m.name)} alt={`${m.name}`} className="inline h-4 mr-1 object-contain" />} {m.name.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div className="rounded-2xl p-8 text-center" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                <div className="text-2xl sm:text-3xl mb-2 opacity-20 text-center"><span className="inline-flex gap-2">{I.lab(28)}{I.bolt(28)}{I.lab(28)}</span></div>
                <div className="text-sm opacity-30">Select two sensors above to compare them head-to-head</div>
              </div>
            )}
          </div>
          );
        })()}

        {/* ── COMPARE TAB ── */}
        {activeTab === "compare" && (
          <div>
            <SectionTitle color="#6366f1" sub="Select two headphones to compare specs side-by-side">Headphone Comparison Tool</SectionTitle>

            {/* ── Headphone selectors with large product images ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[0, 1].map(idx => {
                const m = compareList[idx];
                const col = m ? BRAND_COLORS[m.brand] || "#9e9578" : "#9e9578";
                return (
                <div key={idx} className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(160deg, #1a1814, #2a2520)", border: `1px solid ${col}25` }}>
                  <div className="p-4">
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: col }}>{idx === 0 ? "Headphone A" : "Headphone B"}</div>
                    <select value={m?.id || ""} onChange={e => { const found = headphones.find(h => h.id === parseInt(e.target.value)); const nl = [...compareList]; nl[idx] = found; setCompareList(nl); }}
                      className="w-full px-3 py-2.5 rounded-lg text-sm font-bold" style={{ background: "#ffffff08", border: `1px solid ${col}30`, color: "#f5f3ea", fontFamily: "'Space Grotesk', system-ui" }}>
                      {headphones.map(h => <option key={h.id} value={h.id} style={{ color: "#1a1614" }}>{h.name}</option>)}
                    </select>
                  </div>
                  {m && (
                    <div className="flex flex-col items-center pb-5 px-4">
                      <div className="relative mb-3" style={{ height: 140 }}>
                        {getHeadphoneImage(m.name) && <img loading="lazy" src={getHeadphoneImage(m.name)} alt={m.name} className="h-full object-contain" style={{ filter: `drop-shadow(0 8px 24px ${col}30)` }} />}
                      </div>
                      <div className="text-lg font-black text-center" style={{ color: "#f5f3ea", fontFamily: "'Space Grotesk', system-ui" }}>{m.name.replace(m.brand + " ", "")}</div>
                      <div className="flex items-center gap-2 mt-1">
                        {getBrandLogo(m.brand) && <img loading="lazy" src={getBrandLogo(m.brand)} alt={m.brand} className="w-4 h-4 object-contain" />}
                        <span className="text-xs font-bold" style={{ color: col }}>{m.brand}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ background: `${col}18`, color: col }}>{m.weight}g</span>
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ background: `${col}18`, color: col }}>${m.price}</span>
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ background: `${col}18`, color: col }}>{m.proUsage}% pro</span>
                      </div>
                    </div>
                  )}
                </div>
              );})}
            </div>

            {compareList[0] && compareList[1] && (() => {
              const specs = [
                { label: "Weight", key: "weight", unit: "g", lower: true },
                { label: "Price", key: "price", unit: "$", lower: true, prefix: "$" },
                { label: "Driver", key: "driverType", unit: "" },
                { label: "Impedance", key: "impedance", unit: "Ω", lower: true },
                { label: "Freq. Response", key: "frequencyResponse", unit: " Hz" },
                { label: "Layout", key: "layout", unit: "" },
                { label: "Connectivity", key: "connectivity", unit: "" },
                { label: "ANC", key: "anc", unit: "" },
                { label: "Pro Usage", key: "proUsage", unit: "%", lower: false },
                { label: "Rating", key: "rating", unit: "/10", lower: false },
              ];
              const c0 = BRAND_COLORS[compareList[0].brand];
              const c1 = BRAND_COLORS[compareList[1].brand];
              let wins0 = 0, wins1 = 0;
              specs.forEach(spec => {
                const v0 = compareList[0][spec.key], v1 = compareList[1][spec.key];
                if (typeof v0 === "number") {
                  const w = spec.lower ? (v0 < v1 ? 0 : v0 > v1 ? 1 : -1) : (v0 > v1 ? 0 : v0 < v1 ? 1 : -1);
                  if (w === 0) wins0++; else if (w === 1) wins1++;
                }
              });
              const verdictColor = wins0 > wins1 ? c0 : wins1 > wins0 ? c1 : "#9e9578";
              const verdictName = wins0 > wins1 ? compareList[0].name : wins1 > wins0 ? compareList[1].name : null;
              return (
              <div>
                {/* ── Verdict Banner - dark themed ── */}
                <div className="rounded-2xl p-6 mb-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(160deg, #1a1814, #2a2520)", border: `1px solid ${verdictColor}25` }}>
                  <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 0%, ${verdictColor}10, transparent 60%)` }} />
                  <div className="relative z-10">
                    <div className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "#9e9578", letterSpacing: 3 }}>Verdict</div>
                    <div className="text-xl sm:text-2xl font-black mb-3" style={{ color: verdictColor, fontFamily: "'Space Grotesk', system-ui" }}>
                      {verdictName ? `${verdictName.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")} Wins` : "It's a Tie!"}
                    </div>
                    <div className="flex justify-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black" style={{ background: `${c0}20`, color: c0 }}>{wins0}</div>
                        <span className="text-xs font-bold" style={{ color: c0 }}>{compareList[0].name.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</span>
                      </div>
                      <span className="text-lg font-black" style={{ color: "#9e9578" }}>vs</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold" style={{ color: c1 }}>{compareList[1].name.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</span>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black" style={{ background: `${c1}20`, color: c1 }}>{wins1}</div>
                      </div>
                    </div>
                    {verdictName && (() => {
                      const winnerKbd = wins0 > wins1 ? compareList[0] : compareList[1];
                      const loserKbd = wins0 > wins1 ? compareList[1] : compareList[0];
                      const winnerCol = wins0 > wins1 ? c0 : c1;
                      const loserCol = wins0 > wins1 ? c1 : c0;
                      return (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                          <a href={amazonLink(winnerKbd.name)} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all hover:scale-105 no-underline"
                            style={{ background: winnerCol, color: "#1a1614", boxShadow: `0 4px 20px ${winnerCol}40`, textDecoration: "none" }}>
                            {I.cart(13, "#1a1614")} Get the Winner — ${winnerKbd.price}
                          </a>
                          <a href={amazonLink(loserKbd.name)} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline"
                            style={{ background: `${loserCol}15`, color: loserCol, textDecoration: "none" }}>
                            {I.cart(11)} ${loserKbd.price}
                          </a>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* ── Spec comparison - visual bar style ── */}
                <div className="rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid #e6e3d6" }}>
                  {specs.map((spec, i) => {
                    const v0 = compareList[0][spec.key];
                    const v1 = compareList[1][spec.key];
                    const isNum = typeof v0 === "number";
                    const winner = !isNum ? null : spec.lower ? (v0 < v1 ? 0 : v0 > v1 ? 1 : null) : (v0 > v1 ? 0 : v0 < v1 ? 1 : null);
                    const maxVal = isNum ? Math.max(v0, v1, 1) : 1;
                    return (
                      <div key={i} style={{ background: i % 2 === 0 ? "#faf9f5" : "#f5f3ea", borderBottom: "1px solid #e6e3d608" }}>
                        <div className="text-center py-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#9e9578" }}>{spec.label}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-0 pb-3 px-4">
                          {/* Left value */}
                          <div className="pr-3 text-right">
                            <div className="text-sm font-black mb-1" style={{ color: winner === 0 ? c0 : "#3d3a30", fontFamily: "'Space Grotesk', system-ui" }}>
                              {winner === 0 && <span style={{ color: "#22c55e", marginRight: 4 }}>✓</span>}
                              {spec.prefix}{v0}{typeof v0 === "number" ? spec.unit : ""}
                            </div>
                            {isNum && <div className="flex justify-end"><div className="h-1.5 rounded-full" style={{ width: `${(v0 / maxVal) * 100}%`, maxWidth: "100%", background: winner === 0 ? c0 : `${c0}40`, minWidth: 4 }} /></div>}
                          </div>
                          {/* Right value */}
                          <div className="pl-3">
                            <div className="text-sm font-black mb-1" style={{ color: winner === 1 ? c1 : "#3d3a30", fontFamily: "'Space Grotesk', system-ui" }}>
                              {spec.prefix}{v1}{typeof v1 === "number" ? spec.unit : ""}
                              {winner === 1 && <span style={{ color: "#22c55e", marginLeft: 4 }}>✓</span>}
                            </div>
                            {isNum && <div className="h-1.5 rounded-full" style={{ width: `${(v1 / maxVal) * 100}%`, maxWidth: "100%", background: winner === 1 ? c1 : `${c1}40`, minWidth: 4 }} />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ── Radar chart - dark themed ── */}
                <div className="rounded-2xl p-5 mb-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #1a1814, #2a2520)", border: "1px solid #3a352e" }}>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-center" style={{ color: "#c9a227" }}>Performance Radar</div>
                  <div className="text-xs text-center mb-3" style={{ color: "#9e9578" }}>Visual overlay of key performance metrics</div>
                  <ResponsiveContainer width="100%" height={320}>
                    <RadarChart data={[
                      { stat: "Lightness", a: Math.max(0, 100 - compareList[0].weight / 4), b: Math.max(0, 100 - compareList[1].weight / 4) },
                      { stat: "Driver", a: compareList[0].anc ? 95 : 60, b: compareList[1].anc ? 95 : 60 },
                      { stat: "Freq.", a: Math.min((compareList[0].frequencyResponse / 8000) * 100, 100), b: Math.min((compareList[1].frequencyResponse / 8000) * 100, 100) },
                      { stat: "Pro Usage", a: Math.min(compareList[0].proUsage * 4, 100), b: Math.min(compareList[1].proUsage * 4, 100) },
                      { stat: "Rating", a: compareList[0].rating * 10, b: compareList[1].rating * 10 },
                      { stat: "Value", a: Math.max(0, 100 - (compareList[0].price / 3)), b: Math.max(0, 100 - (compareList[1].price / 3)) },
                    ]}>
                      <PolarGrid stroke="#ffffff10" />
                      <PolarAngleAxis dataKey="stat" tick={{ fill: "#9e9578", fontSize: 11 }} />
                      <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                      <Radar name={compareList[0].name} dataKey="a" stroke={c0} fill={c0} fillOpacity={0.2} strokeWidth={2.5} />
                      <Radar name={compareList[1].name} dataKey="b" stroke={c1} fill={c1} fillOpacity={0.2} strokeWidth={2.5} />
                      <Legend wrapperStyle={{ fontSize: 11, color: "#9e9578" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* ── Buy buttons ── */}
                <div className="grid grid-cols-2 gap-3">
                  {compareList.map((m, idx) => {
                    const isWinner = (idx === 0 && wins0 > wins1) || (idx === 1 && wins1 > wins0);
                    const col = BRAND_COLORS[m.brand];
                    return (
                      <div key={idx} className="relative">
                        {isWinner && <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black z-10" style={{ background: col, color: "#1a1614", boxShadow: `0 0 12px ${col}40` }}>WINNER</div>}
                        <a href={amazonLink(m.name)} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all text-center hover:scale-[1.02] no-underline"
                          style={isWinner
                            ? { background: col, color: "#1a1614", boxShadow: `0 4px 20px ${col}30`, textDecoration: "none" }
                            : { background: `${col}12`, color: col, border: `1px solid ${col}25`, textDecoration: "none" }
                          }>
                          {I.cart(13, isWinner ? "#1a1614" : col)} {isWinner ? "★ " : ""}Buy — ${m.price}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )})()}
          </div>
        )}

        {/* ── LAB TAB ── */}
        {activeTab === "lab" && (() => {

          const setAnswer = (key, val) => setQuizAnswers(prev => ({ ...prev, [key]: val }));
          const toggleArrayAnswer = (key, val) => setQuizAnswers(prev => {
            const arr = prev[key] || [];
            return { ...prev, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
          });

          const canProceed = () => {
            if (quizStep === 0) return true;
            if (quizStep === 1) return String(quizAnswers.handLength).length > 0 && String(quizAnswers.handWidth).length > 0;
            if (quizStep === 2) return !!quizAnswers.grip;
            if (quizStep === 3) return quizAnswers.games.length > 0;
            if (quizStep === 4) return quizAnswers.priorities.length > 0;
            if (quizStep === 5) return !!quizAnswers.weightPref;
            if (quizStep === 6) return !!quizAnswers.shape;
            if (quizStep === 7) return !!quizAnswers.connectivity;
            if (quizStep === 8) return !!quizAnswers.budget;
            return true;
          };

          const nextStep = () => {
            if (quizStep === 8) { setQuizDone(true); return; }
            setQuizStep(prev => prev + 1);
          };

          // Scoring algorithm
          const getResults = () => {
            const a = quizAnswers;
            const hl = parseFloat(a.handLength) || 18;
            const hw = parseFloat(a.handWidth) || 9;

            return headphones.map(m => {
              let score = 0;
              let reasons = [];

              // Hand size → weight mapping (smaller hands = lighter headphones)
              const handArea = hl * hw;
              if (a.grip === "fingertip") {
                if (m.weight <= 650) { score += 15; reasons.push("Ultra-light for competitive play"); }
                else if (m.weight <= 750) { score += 10; }
                else if (m.weight > 75) { score -= 10; }
              } else if (a.grip === "claw") {
                if (m.weight <= 700) { score += 12; reasons.push("Light and responsive for speed"); }
                else if (m.weight <= 850) { score += 8; }
                else if (m.weight > 80) { score -= 8; }
              } else if (a.grip === "palm") {
                if (m.weight >= 700) { score += 10; reasons.push("Substantial build for comfortable listening"); }
                else if (m.weight < 45) { score -= 5; }
              }

              // Hand size → shape recommendations
              if (handArea < 150) { // small hands
                if (m.weight <= 700) { score += 5; reasons.push("Compact and lightweight"); }
                if (m.name.toLowerCase().includes("mini")) { score += 8; reasons.push("Mini form factor fits smaller hands"); }
              } else if (handArea > 190) { // large hands
                if (m.formFactor === "Ergonomic") { score += 5; reasons.push("Ergonomic shape suits larger hands"); }
                if (m.name.toLowerCase().includes("mini")) { score -= 8; }
              }

              // Grip → shape
              if (a.grip === "palm" && m.formFactor === "Ergonomic") { score += 12; reasons.push("Full layout ideal for comfort priority"); }
              if (a.grip === "palm" && m.formFactor === "Symmetrical") { score += 4; }
              if (a.grip === "claw" && m.formFactor === "Symmetrical") { score += 10; reasons.push("Compact layout great for speed focus"); }
              if (a.grip === "claw" && m.formFactor === "Ergonomic") { score += 5; }
              if (a.grip === "fingertip" && m.formFactor === "Symmetrical") { score += 12; reasons.push("Compact + light = competitive perfection"); }
              if (a.grip === "fingertip" && m.formFactor === "Ergonomic") { score -= 2; }

              // Shape preference
              if (a.shape === "symmetrical" && m.formFactor === "Symmetrical") score += 10;
              if (a.shape === "ergonomic" && m.formFactor === "Ergonomic") score += 10;
              if (a.shape === "either") score += 5;

              // Game-specific preferences
              const fpsGames = ["CS2", "Valorant", "Apex", "R6 Siege", "Call of Duty", "Overwatch 2", "Fortnite"];
              const mobaGames = ["LoL", "Dota 2"];
              const userPlaysFPS = a.games.some(g => fpsGames.includes(g));
              const userPlaysMOBA = a.games.some(g => mobaGames.includes(g));

              if (userPlaysFPS) {
                if (m.anc) { score += 12; reasons.push("Rapid trigger for frame-perfect inputs"); }
                if (m.frequencyResponse >= 4000) { score += 5; reasons.push(`${m.frequencyResponse >= 8000 ? "8K" : "4K"}Hz frequency response`); }
                if (m.weight <= 60) score += 5;
                // Check what pros actually use in those games
                const proCount = allPlayers.filter(p => a.games.includes(p.game) && p.headphone && (p.headphone === m.name || p.headphone.includes(m.name) || m.name.includes(p.headphone))).length;
                if (proCount >= 10) { score += 15; reasons.push(`Used by ${proCount}+ pros in your game(s)`); }
                else if (proCount >= 5) { score += 10; reasons.push(`Used by ${proCount} pros in your game(s)`); }
                else if (proCount >= 2) { score += 5; }
              }
              if (userPlaysMOBA) {
                if (m.formFactor === "Ergonomic") { score += 5; reasons.push("Ergonomic comfort for long MOBA sessions"); }
                if (m.weight >= 55 && m.weight <= 80) score += 3;
              }

              // Priorities
              if (a.priorities.includes("weight")) {
                if (m.weight <= 45) { score += 12; reasons.push(`Featherweight at ${m.weight}g`); }
                else if (m.weight <= 55) score += 8;
                else if (m.weight <= 65) score += 4;
                else score -= 4;
              }
              if (a.priorities.includes("sensor")) {
                if (m.frequencyResponse >= 8000) { score += 10; reasons.push("Top-tier 8KHz frequency response"); }
                else if (m.frequencyResponse >= 4000) score += 6;
                else score -= 2;
              }
              if (a.priorities.includes("pro")) {
                score += Math.min(15, m.proUsage * 2);
                if (m.proUsage >= 5) reasons.push(`${m.proUsage}% pro adoption rate`);
              }
              if (a.priorities.includes("price")) {
                if (m.price <= 80) { score += 10; reasons.push(`Great value at $${m.price}`); }
                else if (m.price <= 100) score += 6;
                else if (m.price <= 130) score += 2;
                else score -= 3;
              }
              if (a.priorities.includes("build")) {
                score += Math.round(m.rating * 1.5);
                if (m.rating >= 9.3) reasons.push(`Exceptional ${m.rating}/10 build quality`);
              }

              // Weight preference
              if (a.weightPref === "ultralight" && m.weight <= 45) score += 10;
              else if (a.weightPref === "ultralight" && m.weight > 65) score -= 10;
              if (a.weightPref === "light" && m.weight > 45 && m.weight <= 60) score += 8;
              if (a.weightPref === "medium" && m.weight > 60 && m.weight <= 80) score += 8;
              if (a.weightPref === "heavy" && m.weight > 80) score += 8;

              // Connectivity
              if (a.connectivity === "wireless" && m.connectivity === "Wireless") score += 10;
              if (a.connectivity === "wireless" && m.connectivity === "Wired") score -= 15;
              if (a.connectivity === "wired" && m.connectivity === "Wired") score += 5;
              if (a.connectivity === "either") score += 3;

              // Budget
              if (a.budget === "under80" && m.price <= 80) score += 10;
              else if (a.budget === "under80" && m.price > 120) score -= 15;
              if (a.budget === "80to120" && m.price >= 80 && m.price <= 120) score += 10;
              else if (a.budget === "80to120" && m.price > 160) score -= 10;
              if (a.budget === "120to160" && m.price >= 100 && m.price <= 160) score += 8;
              if (a.budget === "over160") score += 3; // no limit
              if (a.budget === "nolimit") score += 5;

              // Baseline from rating
              score += Math.round(m.rating * 2);

              // Deduplicate reasons
              reasons = [...new Set(reasons)].slice(0, 4);

              return { kbd: m, score, reasons };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 8);
          };

          const maxScore = quizDone ? Math.max(...getResults().map(r => r.score)) : 0;

          const accent = "#c9a227";
          const stepLabels = ["Welcome", "Hand Size", "Grip Style", "Games", "Priorities", "Weight", "Shape", "Connection", "Budget"];
          const totalSteps = 9;

          const OptionButton = ({ selected, onClick, children, color, large }) => (
            <button onClick={onClick}
              className={`rounded-xl text-left transition-all duration-100 ${large ? "p-4 sm:p-5" : "p-3 sm:p-4"}`}
              style={{
                background: selected ? `${color || accent}15` : "#ffffff",
                border: selected ? `2px solid ${color || accent}` : "1px solid #d4d0be",
                boxShadow: selected ? `0 2px 0 ${color || accent}60, 0 0 20px ${color || accent}15` : `0 2px 0 #d4d0be`,
                transform: selected ? "translateY(1px)" : "translateY(0)",
              }}>
              {children}
            </button>
          );

          return (
          <div>
            <SectionTitle color="#c9a227" sub={`Unique tools to help you get the most out of your headphone — powered by data from ${allPlayers.length}+ pro players`}>The Lab</SectionTitle>

            {!quizDone ? (
              <div className={quizStep === 0 ? "max-w-4xl mx-auto" : "max-w-2xl mx-auto"}>
                {/* Progress bar */}
                {quizStep > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm opacity-30">Step {quizStep} of {totalSteps - 1}</span>
                      <span className="text-sm opacity-30">{stepLabels[quizStep]}</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: "#00000008" }}>
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(quizStep / (totalSteps - 1)) * 100}%`, background: `linear-gradient(to right, #c9a227, #7d6e1e)` }} />
                    </div>
                  </div>
                )}

                {/* Step 0: Intro */}
                {quizStep === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl p-8 sm:p-10 text-center flex flex-col relative overflow-hidden" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: accent }} />
                      <FlaskConical size={48} style={{ color: accent, margin: "0 auto 20px" }} />
                      <div className="text-xl sm:text-2xl font-black mb-4" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: accent }}>Find Your Perfect Headphone</div>
                      <p className="text-sm opacity-85 max-w-lg mx-auto leading-relaxed mb-2">
                        This quiz analyzes your hand measurements, grip style, gaming preferences, and priorities to recommend headphones from our database of {headphones.length} models — cross-referenced with data from {allPlayers.length}+ pro players.
                      </p>
                      <p className="text-sm opacity-25 mb-4">Takes about 2 minutes. Your answers aren't stored anywhere.</p>
                      <div className="flex-1" />
                      <button onClick={nextStep}
                        className="px-8 py-3 rounded-xl font-black text-sm transition-all hover:scale-105"
                        style={{ background: accent, color: "#fff" }}>
                        Start Quiz →
                      </button>
                    </div>
                    <div className="rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden flex flex-col" style={{ background: "#ffffff", border: "1px solid #2d282415" }}>
                      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: "#4a4340" }} />
                      <div className="flex justify-center mb-5">{I.gear(48)}</div>
                      <div className="text-xl sm:text-2xl font-black mb-4" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#4a4340" }}>Compare Headphones</div>
                      <p className="text-sm opacity-85 max-w-lg mx-auto leading-relaxed mb-2">
                        Put any two headphones head-to-head with detailed spec breakdowns, radar charts, pro usage stats, and side-by-side shape analysis.
                      </p>
                      <p className="text-sm opacity-25 mb-4">Pick two headphones and see exactly how they differ.</p>
                      <div className="flex-1" />
                      <button onClick={() => { setActiveTab("compare"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="px-8 py-3 rounded-xl font-black text-sm transition-all hover:scale-105"
                        style={{ background: "#9060c4", color: "#fff" }}>
                        Compare Headphones →
                      </button>
                    </div>
                    <div className="rounded-2xl p-8 sm:p-10 text-center flex flex-col relative overflow-hidden" style={{ background: "#ffffff", border: "1px solid #c9a22715" }}>
                      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: "#c9a227" }} />
                      <Layers size={48} style={{ color: "#7d6e1e", margin: "0 auto 20px" }} />
                      <div className="text-xl sm:text-2xl font-black mb-2" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#7d6e1e" }}>Shape Overlay</div>
                      <div className="mb-4 flex flex-wrap gap-1.5 justify-center">
                        <span className="text-sm font-bold px-2 py-0.5 rounded-full" style={{ background: "#c9a22715", color: "#7d6e1e", border: "1px solid #c9a22730", fontSize: 12 }}>BETA</span>
                        <span className="text-sm font-bold px-2 py-0.5 rounded-full" style={{ background: "#c9a22718", color: "#c9a227", border: "1px solid #c9a22730", fontSize: 12 }}>🚧 UNDER CONSTRUCTION</span>
                      </div>
                      <p className="text-sm opacity-85 max-w-lg mx-auto leading-relaxed mb-2">
                        Overlay actual headphone images scaled to real dimensions — instantly see how any two headphones compare in size from all {headphones.filter(m => HEADPHONE_DIMS[m.name] && getHeadphoneImage(m.name)).length} headphones.
                      </p>
                      <p className="text-sm opacity-25 mb-4">See exactly how two headphones compare in shape.</p>
                      <div className="flex-1" />
                      <div className="px-8 py-3 rounded-xl font-black text-sm text-center"
                        style={{ background: "#c9a22720", color: "#c9a22750", border: "1px solid #c9a22720", cursor: "not-allowed" }}>
                        🚧 Under Construction
                      </div>
                      <div className="text-sm opacity-30 mt-2 text-center"><button onClick={() => setNewsletterPopup(true)} className="underline font-bold transition-all hover:opacity-100" style={{ color: "#c9a227", opacity: 1, cursor: "pointer" }}>Subscribe to our newsletter</button> for updates</div>
                    </div>
                  </div>
                )}

                {/* Step 1: Hand Size */}
                {quizStep === 1 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>What's your hand size?</div>
                    <p className="text-sm mb-6" style={{ color: "#9e9578" }}>Measure from the base of your palm to the tip of your middle finger (length), and across your knuckles (width).</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      {/* Visual guide */}
                      <div className="rounded-xl p-5 flex flex-col items-center" style={{ background: "#00000008", border: "1px solid #e6e3d6" }}>
                        <svg width="140" height="200" viewBox="0 0 140 200" fill="none">
                          <path d="M70 10 C55 10, 30 20, 25 50 L20 90 C18 100, 25 105, 32 100 L35 80 M70 10 C60 10, 45 15, 40 35 L38 70 M70 10 C65 10, 55 12, 50 30 L48 75 M70 10 C75 10, 85 12, 90 30 L92 75 M70 10 C85 10, 105 20, 108 45 L108 65 C108 72, 104 73, 102 68 L100 55 M25 95 C22 110, 25 140, 35 160 L40 175 C50 190, 90 190, 100 175 L105 160 C115 140, 118 110, 108 80" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                          {/* Length arrow */}
                          <line x1="130" y1="15" x2="130" y2="185" stroke="#9e9578" strokeWidth="1" strokeDasharray="3 3" />
                          <polygon points="130,15 127,22 133,22" fill="#9e9578" />
                          <polygon points="130,185 127,178 133,178" fill="#9e9578" />
                          <text x="125" y="100" fill="#8a8460" fontSize="8" textAnchor="end" transform="rotate(-90, 125, 100)">LENGTH</text>
                          {/* Width arrow */}
                          <line x1="20" y1="195" x2="115" y2="195" stroke="#9e9578" strokeWidth="1" strokeDasharray="3 3" />
                          <polygon points="20,195 27,192 27,198" fill="#9e9578" />
                          <polygon points="115,195 108,192 108,198" fill="#9e9578" />
                          <text x="67" y="192" fill="#8a8460" fontSize="8" textAnchor="middle">WIDTH</text>
                        </svg>
                      </div>

                      {/* Inputs */}
                      <div className="flex flex-col gap-4 justify-center">
                        <div>
                          <label className="text-sm opacity-85 mb-1.5 block">Hand Length (cm)</label>
                          <input type="text" inputMode="decimal" placeholder="e.g. 18.5"
                            value={quizAnswers.handLength} onChange={e => setAnswer("handLength", e.target.value.replace(/[^0-9.]/g, ""))}
                            className="w-full px-4 py-3 rounded-xl text-sm bg-transparent outline-none"
                            style={{ border: `1px solid ${quizAnswers.handLength ? accent + "60" : "#00000012"}`, color: "#1a1614" }} />
                          <div className="text-sm opacity-20 mt-1">Average male: 18-20cm · Average female: 16-18cm</div>
                        </div>
                        <div>
                          <label className="text-sm opacity-85 mb-1.5 block">Hand Width (cm)</label>
                          <input type="text" inputMode="decimal" placeholder="e.g. 9.5"
                            value={quizAnswers.handWidth} onChange={e => setAnswer("handWidth", e.target.value.replace(/[^0-9.]/g, ""))}
                            className="w-full px-4 py-3 rounded-xl text-sm bg-transparent outline-none"
                            style={{ border: `1px solid ${quizAnswers.handWidth ? accent + "60" : "#00000012"}`, color: "#1a1614" }} />
                          <div className="text-sm opacity-20 mt-1">Average male: 9-10cm · Average female: 7.5-9cm</div>
                        </div>
                        {quizAnswers.handLength && quizAnswers.handWidth && (
                          <div className="rounded-lg px-3 py-2 text-sm" style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}>
                            <span style={{ color: accent }}>
                              {parseFloat(quizAnswers.handLength) * parseFloat(quizAnswers.handWidth) < 150 ? "Small" :
                               parseFloat(quizAnswers.handLength) * parseFloat(quizAnswers.handWidth) < 175 ? "Medium" :
                               parseFloat(quizAnswers.handLength) * parseFloat(quizAnswers.handWidth) < 200 ? "Large" : "Extra Large"} hands
                            </span>
                            <span className="opacity-85"> · {quizAnswers.handLength} × {quizAnswers.handWidth} cm</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Grip Style */}
                {quizStep === 2 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>What do you prioritize in a headphone?</div>
                    <p className="text-sm mb-6" style={{ color: "#9e9578" }}>Choose what matters most in your competitive headphone setup.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "palm", label: "Comfort & Stability", desc: "A heavier, full-featured headphone with a complete layout. Stability during intense gameplay and no compromises on key access.", icon: "⌨️", tips: "Full layout · Heavier · All keys" },
                        { id: "claw", label: "Speed & Precision", desc: "Compact layout with active noise cancellation and low impedance for the fastest possible inputs. The competitive standard for FPS professionals.", icon: "⚡", tips: "60%/65% · Rapid trigger · Minimal" },
                        { id: "fingertip", label: "Ultra-Minimal", desc: "The absolute smallest form factor with only the essential keys. Maximum desk space, minimum weight, pure competitive focus.", icon: "🎯", tips: "60% or smaller · Lightest · Pure gaming" },
                      ].map(g => (
                        <OptionButton key={g.id} selected={quizAnswers.grip === g.id} onClick={() => setAnswer("grip", g.id)} large>
                          <div className="text-center">
                            <div className="text-3xl mb-3">{g.icon}</div>
                            <div className="text-sm font-black mb-2" style={{ color: quizAnswers.grip === g.id ? accent : "#7d6e1e" }}>{g.label}</div>
                            <div className="text-sm opacity-85 leading-relaxed mb-3">{g.desc}</div>
                            <div className="text-sm px-2 py-1 rounded-lg inline-block" style={{ background: "#0000000a", color: "#9e9578", fontSize: 12 }}>{g.tips}</div>
                          </div>
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Games */}
                {quizStep === 3 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>What games do you play?</div>
                    <p className="text-sm mb-6" style={{ color: "#9e9578" }}>Select all that apply. This helps us match headphones that pros use in your games.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: "CS2", label: "Counter-Strike 2", color: "#c47000" },
                        { id: "Valorant", label: "Valorant", color: "#2d2824" },
                        { id: "Apex", label: "Apex Legends", color: "#dc2626" },
                        { id: "Fortnite", label: "Fortnite", color: "#4c7bd9" },
                        { id: "Overwatch 2", label: "Overwatch 2", color: "#f99e1a" },
                        { id: "Call of Duty", label: "Call of Duty", color: "#5cb85c" },
                        { id: "R6 Siege", label: "Rainbow Six Siege", color: "#4a86c8" },
                        { id: "LoL", label: "League of Legends", color: "#c89b3c" },
                        { id: "Dota 2", label: "Dota 2", color: "#e74c3c" },
                        { id: "Marvel Rivals", label: "Marvel Rivals", color: "#ed1d24" },
                        { id: "Deadlock", label: "Deadlock", color: "#4a4340" },
                        { id: "PUBG", label: "PUBG", color: "#f2a900" },
                      ].map(g => (
                        <OptionButton key={g.id} selected={quizAnswers.games.includes(g.id)} onClick={() => toggleArrayAnswer("games", g.id)} color={g.color}>
                          <div className="flex items-center gap-2">
                            {GAME_IMAGE_URLS[g.id] && <img loading="lazy" src={GAME_IMAGE_URLS[g.id]} alt={g.label} className="w-5 h-5 object-contain" />}
                            <div>
                              <div className="text-sm font-bold" style={{ color: quizAnswers.games.includes(g.id) ? g.color : "#7d6e1e" }}>{g.label}</div>
                            </div>
                          </div>
                        </OptionButton>
                      ))}
                    </div>
                    {quizAnswers.games.length > 0 && (
                      <div className="mt-4 text-sm opacity-30">{quizAnswers.games.length} game{quizAnswers.games.length !== 1 ? "s" : ""} selected</div>
                    )}
                  </div>
                )}

                {/* Step 4: Priorities */}
                {quizStep === 4 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>What matters most to you?</div>
                    <p className="text-sm mb-6" style={{ color: "#9e9578" }}>Select up to 3 priorities. This shapes how we rank your recommendations.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: "weight", label: "Lightweight", desc: "Lighter = faster flicks and less fatigue", icon: "⚡" },
                        { id: "sensor", label: "Best Audio Quality", desc: "Premium drivers and wide frequency response", icon: "🎯" },
                        { id: "pro", label: "Pro Validated", desc: "Used and trusted by professional players", icon: "🏆" },
                        { id: "price", label: "Value for Money", desc: "Best performance per dollar spent", icon: "💰" },
                        { id: "build", label: "Build Quality", desc: "Premium materials, comfort, and durability", icon: "✨" },
                      ].map(p => (
                        <OptionButton key={p.id}
                          selected={quizAnswers.priorities.includes(p.id)}
                          onClick={() => { if (quizAnswers.priorities.includes(p.id) || quizAnswers.priorities.length < 3) toggleArrayAnswer("priorities", p.id); }}>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{p.icon}</span>
                            <div>
                              <div className="text-sm font-bold" style={{ color: quizAnswers.priorities.includes(p.id) ? accent : "#7d6e1e" }}>{p.label}</div>
                              <div className="text-sm opacity-85">{p.desc}</div>
                            </div>
                          </div>
                        </OptionButton>
                      ))}
                    </div>
                    <div className="mt-3 text-sm opacity-25">{quizAnswers.priorities.length}/3 selected</div>
                  </div>
                )}

                {/* Step 5: Weight */}
                {quizStep === 5 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>Weight preference?</div>
                    <p className="text-sm mb-6" style={{ color: "#9e9578" }}>What weight range do you prefer?</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: "ultralight", label: "Ultralight", range: "Under 250g", desc: "Barely noticeable on your head. Marathon gaming sessions.", example: "Logitech G435, HyperX Cloud Alpha" },
                        { id: "light", label: "Light", range: "250-300g", desc: "The competitive sweet spot. Comfortable but secure.", example: "beyerdynamic DT 990 Pro, SteelSeries Arctis Nova 7" },
                        { id: "medium", label: "Medium", range: "300-350g", desc: "Solid feel with premium build quality.", example: "Razer BlackShark V2 Pro, Logitech G Pro X" },
                        { id: "heavy", label: "Heavy / Don't Care", range: "350g+", desc: "Maximum features and build quality, or weight isn't a factor.", example: "ASTRO A50, SteelSeries Arctis Nova Pro Wireless" },
                      ].map(w => (
                        <OptionButton key={w.id} selected={quizAnswers.weightPref === w.id} onClick={() => setAnswer("weightPref", w.id)} large>
                          <div className="text-sm font-black mb-1" style={{ color: quizAnswers.weightPref === w.id ? accent : "#7d6e1e" }}>{w.label}</div>
                          <div className="text-sm font-bold mb-1" style={{ color: accent, opacity: 0.6 }}>{w.range}</div>
                          <div className="text-sm opacity-85 mb-2">{w.desc}</div>
                          <div className="text-sm opacity-20" style={{ fontSize: 12 }}>e.g. {w.example}</div>
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 6: Shape */}
                {quizStep === 6 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>Shape preference?</div>
                    <p className="text-sm mb-6" style={{ color: "#9e9578" }}>Ergonomic headphones are contoured for your right hand. Symmetrical headphones work for any hand.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "ergonomic", label: "Ergonomic", desc: "Right-hand contoured. Natural resting position. Great for palm grip and long sessions.", icon: "🤚" },
                        { id: "symmetrical", label: "Symmetrical", desc: "Ambidextrous shape. Preferred by most FPS pros. Works with all grip styles.", icon: "🔲" },
                        { id: "either", label: "No Preference", desc: "I'm open to both. Recommend whatever scores highest for me.", icon: "🤷" },
                      ].map(s => (
                        <OptionButton key={s.id} selected={quizAnswers.shape === s.id} onClick={() => setAnswer("shape", s.id)} large>
                          <div className="text-center">
                            <div className="text-2xl mb-2">{s.icon}</div>
                            <div className="text-sm font-black mb-2" style={{ color: quizAnswers.shape === s.id ? accent : "#7d6e1e" }}>{s.label}</div>
                            <div className="text-sm opacity-85 leading-relaxed">{s.desc}</div>
                          </div>
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 7: Connectivity */}
                {quizStep === 7 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>Wired or wireless?</div>
                    <p className="text-sm mb-6" style={{ color: "#9e9578" }}>Modern wireless headphones have zero perceptible latency difference vs wired. 98% of pros use wireless.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "wireless", label: "Wireless Only", desc: "No cable drag. Freedom of movement. The pro standard.", icon: "📡" },
                        { id: "wired", label: "Wired OK", desc: "Don't mind a cable. Sometimes lighter and cheaper.", icon: "🔌" },
                        { id: "either", label: "No Preference", desc: "Either works. Just give me the best headphone for my needs.", icon: "🤷" },
                      ].map(c => (
                        <OptionButton key={c.id} selected={quizAnswers.connectivity === c.id} onClick={() => setAnswer("connectivity", c.id)} large>
                          <div className="text-center">
                            <div className="text-2xl mb-2">{c.icon}</div>
                            <div className="text-sm font-black mb-2" style={{ color: quizAnswers.connectivity === c.id ? accent : "#7d6e1e" }}>{c.label}</div>
                            <div className="text-sm opacity-85 leading-relaxed">{c.desc}</div>
                          </div>
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 8: Budget */}
                {quizStep === 8 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>What's your budget?</div>
                    <p className="text-sm mb-6" style={{ color: "#9e9578" }}>There are excellent headphones at every price point.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: "under80", label: "Under $80", desc: "Budget-friendly", color: "#7d6e1e" },
                        { id: "80to120", label: "$80 – $120", desc: "Mid-range", color: "#a68b1b" },
                        { id: "120to160", label: "$120 – $160", desc: "Premium", color: "#7d6e1e" },
                        { id: "nolimit", label: "No Limit", desc: "Best regardless", color: "#c9a227" },
                      ].map(b => (
                        <OptionButton key={b.id} selected={quizAnswers.budget === b.id} onClick={() => setAnswer("budget", b.id)} color={b.color} large>
                          <div className="text-center">
                            <div className="text-sm font-black mb-1" style={{ color: quizAnswers.budget === b.id ? b.color : "#7d6e1e" }}>{b.label}</div>
                            <div className="text-sm opacity-85">{b.desc}</div>
                          </div>
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                {quizStep > 0 && (
                  <div className="flex justify-between mt-6">
                    <button onClick={() => setQuizStep(prev => prev - 1)}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-stone-100"
                      style={{ background: "#00000008", border: "1px solid #d4d0be" }}>
                      ← Back
                    </button>
                    <button onClick={nextStep} disabled={!canProceed()}
                      className="px-6 py-2.5 rounded-xl text-sm font-black transition-all hover:scale-105 disabled:opacity-20 disabled:hover:scale-100"
                      style={{ background: canProceed() ? accent : "#00000010", color: canProceed() ? "#1a1614" : "#9e9578" }}>
                      {quizStep === 8 ? "See My Results →" : "Next →"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ─── RESULTS ─── */
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <div className="text-xl font-black" style={{ color: accent }}>Your Top Headphones</div>
                    <div className="text-sm opacity-30 mt-1">
                      Based on {quizAnswers.grip} grip · {quizAnswers.handLength}×{quizAnswers.handWidth}cm hands · {quizAnswers.games.join(", ")} · {quizAnswers.weightPref} weight · {quizAnswers.budget === "nolimit" ? "no budget limit" : quizAnswers.budget}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => { setQuizDone(false); setQuizStep(0); setQuizAnswers({ handLength: "", handWidth: "", grip: "", games: [], priorities: [], weightPref: "", connectivity: "", budget: "", shape: "" }); }}
                      className="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:bg-stone-100"
                      style={{ background: "#00000008", border: "1px solid #d4d0be" }}>
                      ↺ Retake Quiz
                    </button>
                    <button onClick={() => { setQuizDone(false); setQuizStep(0); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:bg-stone-100"
                      style={{ background: `${accent}10`, border: `1px solid ${accent}30`, color: accent }}>
                      ← Back to Lab
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {getResults().map((r, i) => {
                    const m = r.kbd;
                    const brandCol = BRAND_COLORS[m.brand] || "#8a8460";
                    const matchPct = Math.min(99, Math.max(40, Math.round((r.score / maxScore) * 98)));
                    const isTop = i === 0;
                    return (
                      <div key={m.id}
                        className="rounded-2xl p-4 sm:p-6 cursor-pointer transition-all hover:scale-[1.01]"
                        onClick={() => { navigateToHeadphone(m); }}
                        style={{
                          background: isTop ? `${brandCol}10` : "#ffffff",
                          border: isTop ? `2px solid ${brandCol}40` : "1px solid #e6e3d6",
                          boxShadow: isTop ? `0 0 30px ${brandCol}10` : "none",
                        }}>
                        <div className="flex items-start gap-4">
                          {/* Rank badge */}
                          <div className="flex flex-col items-center flex-shrink-0 pt-1">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black"
                              style={{
                                background: i === 0 ? "#fbbf2420" : i === 1 ? "#94a3b820" : i === 2 ? "#cd7f3220" : "#00000008",
                                color: i === 0 ? "#fbbf24" : i === 1 ? "#94a3b8" : i === 2 ? "#cd7f32" : "#9e9578",
                                border: i < 3 ? `1px solid ${i === 0 ? "#fbbf24" : i === 1 ? "#94a3b8" : "#cd7f32"}30` : "1px solid #e6e3d6",
                              }}>
                              #{i + 1}
                            </div>
                          </div>

                          {/* Headphone image */}
                          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center" style={{ background: `${brandCol}08`, border: `1px solid ${brandCol}12` }}>
                            {getHeadphoneImage(m.name) ? (
                              <img loading="lazy" src={getHeadphoneImage(m.name)} alt={m.name} className="w-full h-full object-contain p-1.5"
                                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.06))" }}
                                onError={e => { e.target.style.display = "none"; e.target.nextElementSibling && (e.target.nextElementSibling.style.display = "flex"); }} />
                            ) : null}
                            
                          </div>

                          {/* Headphone info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div>
                                <div className="text-base sm:text-lg font-black" style={{ color: brandCol }}>{m.name}</div>
                                <div className="text-sm opacity-85">{m.brand} · {m.weight}g · {m.formFactor} · {m.connectivity} · ${m.price}</div>
                              </div>
                              <div className="flex-shrink-0 text-center">
                                <div className="w-14 h-14 rounded-lg flex items-center justify-center font-black text-lg transition-all" style={{
                                  background: matchPct >= 80 ? "#c9a22720" : matchPct >= 60 ? "#7d6e1e20" : "#c9a22720",
                                  border: `2px solid ${matchPct >= 80 ? "#c9a227" : matchPct >= 60 ? "#7d6e1e" : "#c9a227"}`,
                                  color: matchPct >= 80 ? "#c9a227" : matchPct >= 60 ? "#7d6e1e" : "#c9a227"
                                }}>{matchPct}%</div>
                                <div className="text-xs opacity-25 mt-1">match</div>
                              </div>
                            </div>

                            {/* Match bar */}
                            <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: "#00000008" }}>
                              <div className="h-full rounded-full transition-all duration-1000"
                                style={{ width: `${matchPct}%`, background: `linear-gradient(to right, ${brandCol}80, ${brandCol})` }} />
                            </div>

                            {/* Reasons */}
                            {r.reasons.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {r.reasons.map((reason, ri) => (
                                  <span key={ri} className="px-2 py-1 rounded-lg text-sm" style={{ background: `${brandCol}10`, color: brandCol, fontSize: 12 }}>
                                    {reason}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Buy button */}
                        <a href={amazonLink(m.name)} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className={`mt-4 flex items-center justify-center gap-2 py-${isTop ? "3" : "2"} rounded-xl text-sm font-${isTop ? "black" : "bold"} transition-all hover:scale-[1.02] no-underline`}
                          style={isTop
                            ? { background: brandCol, color: "#1a1614", textDecoration: "none" }
                            : { background: `${brandCol}15`, color: brandCol, border: `1px solid ${brandCol}25`, textDecoration: "none" }
                          }>
                          {I.cart(isTop ? 16 : 12)}
                          {isTop ? `🏆 Best Match — Buy ${m.name.split(" ").slice(-2).join(" ")} — $${m.price}` :
                           i === 1 ? `Runner Up — ${m.name.split(" ").slice(-2).join(" ")} — $${m.price}` :
                           i === 2 ? `${m.price < 100 ? "💰 Budget Pick" : "Bronze Pick"} — ${m.name.split(" ").slice(-2).join(" ")} — $${m.price}` :
                           `Buy ${m.name.split(" ").slice(-2).join(" ")} — $${m.price}`}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Coming Soon Teasers */}
            <div className="mt-10">
              <SectionTitle color={accent} sub="New lab experiments dropping soon">Coming Soon</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: I.crosshair(32), title: "Aim Style Analyzer", desc: "Answer questions about how you aim — tracking, flicking, micro-adjustments — and we'll profile your style and suggest optimal sensitivity ranges and headphones." },
                  { icon: I.bolt(32), title: "Pro Config Simulator", desc: "Pick any pro player from our database and simulate their full setup — impedance, frequency response, driver type, and headphone settings — applied to your favorite game." },
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl p-6 text-center relative overflow-hidden transition-all hover:scale-[1.02]"
                    style={{ background: "#ffffff", border: `1px solid ${accent}15` }}>
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-sm font-black" style={{ background: `${accent}20`, color: accent, fontSize: 11 }}>COMING SOON</div>
                    <div className="mb-3 flex justify-center opacity-60">{item.icon}</div>
                    <div className="text-sm font-black mb-2" style={{ color: `${accent}90` }}>{item.title}</div>
                    <div className="text-sm opacity-30 leading-relaxed">{item.desc}</div>
                    <div className="mt-4 h-1 rounded-full mx-auto" style={{ width: 40, background: `${accent}20` }} />
                  </div>
                ))}
              </div>
            </div>

          </div>
          );
        })()}

        {/* ── SHAPES TAB ── */}
        {activeTab === "shapes" && (
          <div>
            <SectionTitle color="#c9a227" sub="Select two headphones and overlay their layouts — scaled to real dimensions for true size comparison">Headphone Layout Overlay</SectionTitle>

            {(() => {
                const kbdsWithDims = headphones.filter(m => HEADPHONE_DIMS[m.name] && getHeadphoneImage(m.name));
                const mA = shapeHeadphoneA || kbdsWithDims[0];
                const mB = shapeHeadphoneB || kbdsWithDims[1];
                const dA = HEADPHONE_DIMS[mA?.name];
                const dB = HEADPHONE_DIMS[mB?.name];
                if (!dA || !dB) return null;

                const colA = BRAND_COLORS[mA.brand] || "#c9a227";
                const colB_raw = BRAND_COLORS[mB.brand] || "#2d2824";
                const altColors = ["#c9a227", "#2d2824", "#a68b1b", "#9e9578", "#7d6e1e"];
                const colB = (mA.brand === mB.brand || colA === colB_raw) 
                  ? altColors.find(c => c !== colA) || "#2d2824"
                  : colB_raw;

                const diffL = Math.abs(dA[0] - dB[0]).toFixed(1);
                const diffW = Math.abs(dA[1] - dB[1]).toFixed(1);
                const diffH = Math.abs(dA[2] - dB[2]).toFixed(1);
                const diffWt = Math.abs(mA.weight - mB.weight).toFixed(0);

                const sortedKbdsWithDims = [...kbdsWithDims].sort((a, b) => a.name.localeCompare(b.name));

                // Scale: pixels per mm. Images are scaled so their width matches real mm width.
                const pxPerMm = 4;
                const imgWA = dA[1] * pxPerMm;
                const imgHA = dA[0] * pxPerMm; // length = image height (top-down view)
                const imgWB = dB[1] * pxPerMm;
                const imgHB = dB[0] * pxPerMm;

                const containerW = Math.max(imgWA, imgWB) + 60;
                const containerH = Math.max(imgHA, imgHB) + 80;

                return (
                  <div>
                    {/* Headphone selectors */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {[
                        { kbd: mA, set: setShapeKbdA, col: colA, label: "Headphone A" },
                        { kbd: mB, set: setShapeKbdB, col: colB, label: "Headphone B" },
                      ].map(({ kbd, set, col, label }) => (
                        <div key={label} className="rounded-xl p-4" style={{ background: "#ffffff", border: `1px solid ${col}15` }}>
                          <div className="text-sm font-bold mb-2" style={{ color: col }}>{label}</div>
                          <select value={kbd?.id || ""} onChange={e => { const m = headphones.find(x => x.id === parseInt(e.target.value)); if (m && HEADPHONE_DIMS[m.name] && getHeadphoneImage(m.name)) set(m); }}
                            className="w-full px-3 py-2.5 rounded-lg text-sm cursor-pointer" style={{ background: "#f8f6f3", border: `1px solid ${col}25`, color: "#1a1614" }}>
                            {sortedKbdsWithDims.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                          </select>
                          <div className="flex items-center gap-3 mt-3">
                            {getHeadphoneImage(kbd.name) && <img loading="lazy" src={getHeadphoneImage(kbd.name)} alt={`${kbd.name} layout outline`} className="h-10 object-contain" style={{ filter: `drop-shadow(0 2px 8px ${col}30)` }} />}
                            <div className="flex flex-wrap gap-2 text-sm opacity-50">
                              <span>{HEADPHONE_DIMS[kbd.name]?.[0]}mm L</span>
                              <span>×</span>
                              <span>{HEADPHONE_DIMS[kbd.name]?.[1]}mm W</span>
                              <span>×</span>
                              <span>{HEADPHONE_DIMS[kbd.name]?.[2]}mm H</span>
                              <span>·</span>
                              <span className="font-bold">{kbd.weight}g</span>
                              <span>·</span>
                              <span>{kbd.formFactor}</span>
                            </div>
                          </div>
                          <a href={amazonLink(kbd.name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#c9a22718", color: "#c9a227", border: "1px solid #c9a22730", textDecoration: "none" }}>
                            {I.cart(10)} Buy on Amazon — ${kbd.price}
                          </a>
                        </div>
                      ))}
                    </div>

                    {/* View controls */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {[
                        { id: "overlay", label: "Overlay" },
                        { id: "side", label: "Side by Side" },
                      ].map(v => (
                        <button key={v.id} onClick={() => setShapeView(v.id)}
                          className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                          style={{ background: shapeView === v.id ? "#c9a22720" : "#0000000a", border: `1px solid ${shapeView === v.id ? "#c9a227" : "#00000010"}`, color: shapeView === v.id ? "#c9a227" : "#9e9578" }}>
                          {v.label}
                        </button>
                      ))}
                    </div>

                    {/* Image Overlay Visualization */}
                    <div className="rounded-2xl overflow-hidden relative" style={{ background: "#060606", border: "1px solid #e6e3d6" }}>
                      {shapeView === "overlay" ? (
                        <div style={{ position: "relative", width: "100%", maxWidth: containerW, height: containerH, margin: "0 auto" }}>
                          {/* Grid background */}
                          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#0000000a 1px, transparent 1px), linear-gradient(90deg, #0000000a 1px, transparent 1px)", backgroundSize: `${10 * pxPerMm}px ${10 * pxPerMm}px` }} />
                          {/* Center crosshair */}
                          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#00000008" }} />
                          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#00000008" }} />
                          {/* Headphone B (behind) */}
                          <img loading="lazy" src={getHeadphoneImage(mB.name)} alt={mB.name} width={Math.round(imgWB)} height={Math.round(imgHB)}
                            style={{
                              position: "absolute",
                              left: "50%", top: "50%",
                              width: imgWB, height: imgHB,
                              transform: "translate(-50%, -50%)",
                              objectFit: "contain",
                              opacity: 0.45,
                              filter: `drop-shadow(0 0 12px ${colB}40)`,
                            }} />
                          {/* Headphone A (front) */}
                          <img loading="lazy" src={getHeadphoneImage(mA.name)} alt={mA.name} width={Math.round(imgWA)} height={Math.round(imgHA)}
                            style={{
                              position: "absolute",
                              left: "50%", top: "50%",
                              width: imgWA, height: imgHA,
                              transform: "translate(-50%, -50%)",
                              objectFit: "contain",
                              opacity: 0.65,
                              filter: `drop-shadow(0 0 12px ${colA}40)`,
                            }} />
                          {/* Dimension labels */}
                          <div style={{ position: "absolute", top: 8, left: 8, fontSize: 12, fontFamily: "monospace", color: colA, opacity: 0.7 }}>
                            {dA[0]}mm × {dA[1]}mm
                          </div>
                          <div style={{ position: "absolute", top: 8, right: 8, fontSize: 12, fontFamily: "monospace", color: colB, opacity: 0.7 }}>
                            {dB[0]}mm × {dB[1]}mm
                          </div>
                          {/* Scale bar */}
                          <div style={{ position: "absolute", bottom: 10, left: 12, display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 10 * pxPerMm, height: 2, background: "#9e9578", borderRadius: 1 }} />
                            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#9e9578" }}>10mm</span>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-0">
                          {[
                            { m: mA, d: dA, col: colA },
                            { m: mB, d: dB, col: colB },
                          ].map(({ m, d, col }, idx) => (
                            <div key={idx} style={{ position: "relative", height: containerH, borderRight: idx === 0 ? "1px solid #e6e3d6" : "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#0000000a 1px, transparent 1px), linear-gradient(90deg, #0000000a 1px, transparent 1px)", backgroundSize: `${10 * pxPerMm}px ${10 * pxPerMm}px` }} />
                              <img loading="lazy" src={getHeadphoneImage(m.name)} alt={m.name}
                                style={{ maxWidth: "75%", maxHeight: containerH * 0.65, objectFit: "contain", position: "relative", zIndex: 1, filter: `drop-shadow(0 0 12px ${col}30)` }} />
                              <div style={{ position: "absolute", top: 10, left: 0, right: 0, textAlign: "center", zIndex: 2 }}>
                                <div style={{ fontSize: 13, fontFamily: "monospace", fontWeight: "bold", color: col }}>{m.name.replace(m.brand + " ", "")}</div>
                                <div style={{ fontSize: 11, fontFamily: "monospace", color: "#9e9578", marginTop: 2 }}>{d[0]} × {d[1]} × {d[2]}mm · {m.weight}g</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Difference Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                      {[
                        { label: "Length", valA: dA[0], valB: dB[0], unit: "mm", diff: diffL },
                        { label: "Width", valA: dA[1], valB: dB[1], unit: "mm", diff: diffW },
                        { label: "Height", valA: dA[2], valB: dB[2], unit: "mm", diff: diffH },
                        { label: "Weight", valA: mA.weight, valB: mB.weight, unit: "g", diff: diffWt },
                      ].map((s, i) => (
                        <div key={i} className="rounded-xl p-4 text-center" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                          <div className="text-sm uppercase tracking-widest opacity-20 mb-2">{s.label}</div>
                          <div className="flex items-center justify-center gap-3 mb-1">
                            <span className="text-sm font-black" style={{ color: colA }}>{s.valA}{s.unit}</span>
                            <span className="text-xs" style={{ color: "#c4bfb8" }}>vs</span>
                            <span className="text-sm font-black" style={{ color: colB }}>{s.valB}{s.unit}</span>
                          </div>
                          <div className="text-sm font-bold" style={{ color: s.diff > 0 ? "#c9a227" : "#a68b1b" }}>
                            {s.diff > 0 ? `Δ ${s.diff}${s.unit}` : "Identical"}
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#00000008" }}>
                              <div className="h-full rounded-full" style={{ width: `${(s.valA / Math.max(s.valA, s.valB)) * 100}%`, background: colA }} />
                            </div>
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#00000008" }}>
                              <div className="h-full rounded-full" style={{ width: `${(s.valB / Math.max(s.valA, s.valB)) * 100}%`, background: colB }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 mt-5 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-1.5 rounded-full" style={{ background: colA }} />
                        <span style={{ color: colA }} className="font-bold">{mA.name.replace(mA.brand + " ", "")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-1.5 rounded-full" style={{ background: colB }} />
                        <span style={{ color: colB }} className="font-bold">{mB.name.replace(mB.brand + " ", "")}</span>
                      </div>
                    </div>

                    {/* Buy both */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                      <a href={amazonLink(mA.name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: `${colA}15`, color: colA, border: `1px solid ${colA}25`, textDecoration: "none" }}>
                        {I.cart(12)} Buy {mA.name.replace(mA.brand + " ", "")} — ${mA.price}
                      </a>
                      <a href={amazonLink(mB.name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: `${colB}15`, color: colB, border: `1px solid ${colB}25`, textDecoration: "none" }}>
                        {I.cart(12)} Buy {mB.name.replace(mB.brand + " ", "")} — ${mB.price}
                      </a>
                    </div>

                    {/* Quick size guide */}
                    <div className="rounded-xl p-4 mt-6" style={{ background: "#c9a22706", border: "1px solid #c9a22710" }}>
                      <div className="text-sm uppercase tracking-widest opacity-30 mb-3 font-bold">Quick Size Reference</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                        <div><span className="opacity-30">Small:</span> <span className="opacity-60">&lt;118mm L, &lt;60mm W</span></div>
                        <div><span className="opacity-30">Medium:</span> <span className="opacity-60">118-125mm L, 60-65mm W</span></div>
                        <div><span className="opacity-30">Large:</span> <span className="opacity-60">&gt;125mm L, &gt;65mm W</span></div>
                        <div><span className="opacity-30">Low profile:</span> <span className="opacity-60">&lt;38mm H</span></div>
                      </div>
                    </div>
                  </div>
                );
            })()}
          </div>
        )}

        {/* ── SENSITIVITY CONVERTER PAGE REMOVED ── */}
        {false && (() => {
          const accentC = "#9060c4";
          const SENS_GAMES = [
            { id: "cs2", name: "Counter-Strike 2", img: GAME_IMAGE_URLS["CS2"], yaw: 0.022, defaultSens: 1.0, step: 0.01, note: "In-game Sensitivity" },
            { id: "val", name: "Valorant", img: GAME_IMAGE_URLS["Valorant"], yaw: 0.07, defaultSens: 0.35, step: 0.001, note: "Sensitivity" },
            { id: "ow2", name: "Overwatch 2", img: GAME_IMAGE_URLS["Overwatch 2"], yaw: 0.0066, defaultSens: 5, step: 0.1, note: "Sensitivity (1-100)" },
            { id: "apex", name: "Apex Legends", img: GAME_IMAGE_URLS["Apex"], yaw: 0.022, defaultSens: 1.5, step: 0.1, note: "Mouse Sensitivity" },
            { id: "fn", name: "Fortnite", img: GAME_IMAGE_URLS["Fortnite"], yaw: 0.005555, defaultSens: 8, step: 0.1, note: "X Axis Sensitivity (%)" },
            { id: "cod", name: "Call of Duty", img: GAME_IMAGE_URLS["Call of Duty"], yaw: 0.0066, defaultSens: 5, step: 0.1, note: "Mouse Sensitivity" },
            { id: "r6", name: "Rainbow Six Siege", img: GAME_IMAGE_URLS["R6 Siege"], yaw: 0.00572958, defaultSens: 10, step: 1, note: "Mouse Sensitivity" },
            { id: "tf2", name: "Team Fortress 2", img: GAME_IMAGE_URLS["Team Fortress 2"], yaw: 0.022, defaultSens: 2, step: 0.01, note: "Sensitivity" },
            { id: "tarkov", name: "Escape from Tarkov", img: GAME_IMAGE_URLS["Escape from Tarkov"], yaw: 0.022, defaultSens: 0.5, step: 0.01, note: "Mouse Sensitivity" },
            { id: "deadlock", name: "Deadlock", img: GAME_IMAGE_URLS["Deadlock"], yaw: 0.022, defaultSens: 1.5, step: 0.01, note: "Sensitivity (Source 2)" },
            { id: "finals", name: "The Finals", img: GAME_IMAGE_URLS["The Finals"], yaw: 0.022, defaultSens: 2, step: 0.01, note: "Mouse Sensitivity" },
            { id: "marvel", name: "Marvel Rivals", img: GAME_IMAGE_URLS["Marvel Rivals"], yaw: 0.0066, defaultSens: 5, step: 0.1, note: "Mouse Sensitivity" },
            { id: "pubg", name: "PUBG", img: GAME_IMAGE_URLS["PUBG"], yaw: 0.000440, defaultSens: 50, step: 1, note: "General Sensitivity" },
            { id: "bf", name: "Battlefield 2042", img: GAME_IMAGE_URLS["Battlefield 2042"], yaw: 0.01222, defaultSens: 25, step: 0.5, note: "Soldier Sensitivity (%)" },
            { id: "destiny2", name: "Destiny 2", img: GAME_IMAGE_URLS["Destiny 2"], yaw: 0.0066, defaultSens: 5, step: 0.5, note: "Mouse Look Sensitivity" },
            { id: "halo", name: "Halo Infinite", img: GAME_IMAGE_URLS["Halo Infinite"], yaw: 0.012195, defaultSens: 3, step: 0.1, note: "Mouse Sensitivity" },
            { id: "quake", name: "Quake Champions", img: GAME_IMAGE_URLS["Quake Champions"], yaw: 0.022, defaultSens: 3, step: 0.01, note: "Sensitivity" },
          ];

          const fromGame = SENS_GAMES.find(g => g.id === sensFromGame) || SENS_GAMES[0];
          const cm360 = (sensFromDpi > 0 && sensFromSens > 0) ? 914.4 / (sensFromDpi * fromGame.yaw * sensFromSens) : 0;
          const inches360 = cm360 / 2.54;

          let speedLabel = "", speedColor = "";
          if (cm360 > 80) { speedLabel = "Very Slow"; speedColor = "#a68b1b"; }
          else if (cm360 > 50) { speedLabel = "Slow"; speedColor = "#c9a227"; }
          else if (cm360 > 30) { speedLabel = "Medium"; speedColor = "#a68b1b"; }
          else if (cm360 > 18) { speedLabel = "Fast"; speedColor = "#c9a227"; }
          else if (cm360 > 10) { speedLabel = "Very Fast"; speedColor = "#ef4444"; }
          else { speedLabel = "Extreme"; speedColor = "#dc2626"; }

          return (
          <div>
            <SectionTitle color={accentC} sub="Convert your sensitivity between any game — supporting 17 titles with cm/360 as the universal reference">Sensitivity Converter</SectionTitle>

            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${accentC}15` }}>
              {/* Input Section */}
              <div className="p-4 sm:p-6" style={{ background: `linear-gradient(135deg, ${accentC}08, #ffffff)` }}>
                <div className="text-sm uppercase tracking-widest opacity-30 mb-4">Your Current Settings</div>

                <div className="mb-4">
                  <div className="text-sm opacity-85 mb-2">Game</div>
                  <div className="flex flex-wrap gap-1.5">
                    {SENS_GAMES.map(g => (
                      <button key={g.id} onClick={() => { setSensFromGame(g.id); setSensFromSens(g.defaultSens); }}
                        className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-100 cursor-pointer whitespace-nowrap"
                        style={{
                          background: sensFromGame === g.id ? accentC : "#ffffff",
                          color: sensFromGame === g.id ?  "#ffffff" : "#1a1614",
                          border: `1px solid ${sensFromGame === g.id ? accentC : "#d4d0be"}`,
                          fontSize: 12,
                          boxShadow: sensFromGame === g.id ? `0 2px 0 ${accentC}80` : "0 2px 0 #d4d0be",
                          transform: sensFromGame === g.id ? "translateY(1px)" : "translateY(0)",
                        }}>
                        {g.img ? <img loading="lazy" src={g.img} alt={`${g.name} game icon`} className="inline-block mr-1 rounded-sm" style={{ width: 14, height: 14, objectFit: "contain", verticalAlign: "middle", marginTop: -1 }} /> : null}{g.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm opacity-85 mb-2">Mouse DPI</div>
                    <input type="number" value={sensFromDpi} onChange={e => setSensFromDpi(Number(e.target.value))}
                      className="w-full rounded-xl px-4 py-3 text-lg font-black text-center"
                      style={{ background: "#00000008", border: `1px solid ${accentC}25`, color: accentC, outline: "none" }} />
                    <div className="flex flex-wrap gap-1 mt-2 justify-center">
                      {[400, 800, 1600, 3200].map(d => (
                        <button key={d} onClick={() => setSensFromDpi(d)}
                          className="px-2 py-0.5 rounded text-sm cursor-pointer transition-all"
                          style={{ background: sensFromDpi === d ? `${accentC}30` : "#0000000a", color: sensFromDpi === d ? accentC : "#7d6e1e", fontSize: 11 }}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-85 mb-2">{fromGame.note}</div>
                    <input type="number" value={sensFromSens} onChange={e => setSensFromSens(Number(e.target.value))}
                      step={fromGame.step}
                      className="w-full rounded-xl px-4 py-3 text-lg font-black text-center"
                      style={{ background: "#00000008", border: `1px solid ${accentC}25`, color: "#1a1614", outline: "none" }} />
                  </div>
                </div>
              </div>

              {/* Universal Metrics */}
              {cm360 > 0 && cm360 < 10000 && (
                <div className="px-4 sm:px-6 py-4" style={{ background: "#ffffff", borderTop: `1px solid ${accentC}10`, borderBottom: `1px solid ${accentC}10` }}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="text-center">
                      <div className="text-sm opacity-60 mb-1">cm/360°</div>
                      <div className="text-xl sm:text-2xl font-black" style={{ color: accentC }}>{cm360.toFixed(1)}</div>
                      <div className="text-sm opacity-50">centimeters</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-60 mb-1">in/360°</div>
                      <div className="text-xl sm:text-2xl font-black" style={{ color: "#a68b1b" }}>{inches360.toFixed(1)}</div>
                      <div className="text-sm opacity-50">inches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-60 mb-1">Speed</div>
                      <div className="text-xl sm:text-2xl font-black" style={{ color: speedColor }}>{speedLabel}</div>
                      <div className="text-sm opacity-50">{cm360 > 40 ? "arm aimer" : cm360 > 22 ? "hybrid" : "wrist aimer"}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-60 mb-1">Mousepad</div>
                      <div className="text-xl sm:text-2xl font-black" style={{ color: "#c9a227" }}>{cm360 > 50 ? "XL+" : cm360 > 30 ? "Large" : cm360 > 18 ? "Medium" : "Any"}</div>
                      <div className="text-sm opacity-50">recommended size</div>
                    </div>
                  </div>

                  {/* Swipe distance bar */}
                  <div className="mt-4">
                    <div className="text-sm opacity-55 mb-1.5 text-center">Swipe distance for a full 360° turn</div>
                    <div className="relative h-8 rounded-lg overflow-hidden" style={{ background: "#0000000a" }}>
                      <div className="absolute left-0 top-0 h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
                        style={{ width: `${Math.min(Math.max(cm360 / 100 * 100, 5), 100)}%`, background: `linear-gradient(to right, ${accentC}40, ${accentC})` }}>
                        <span className="text-sm font-black" style={{ color: "#1a1614" }}>{cm360.toFixed(1)}cm</span>
                      </div>
                      {[20, 40, 60, 80].map(mark => (
                        <div key={mark} className="absolute top-0 h-full flex items-end pb-0.5 justify-center" style={{ left: `${mark}%`, width: 1 }}>
                          <div className="w-px h-2 bg-white/10" />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm opacity-40 mt-1 px-1" style={{ fontSize: 10 }}>
                      <span>0cm (instant)</span>
                      <span>50cm</span>
                      <span>100cm+</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Converted Sensitivities */}
              {cm360 > 0 && cm360 < 10000 && (
                <div className="p-4 sm:p-6" style={{ background: "#f5f2e6" }}>
                  <div className="text-sm uppercase tracking-widest opacity-60 mb-4">Equivalent Sensitivity in Every Game</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {SENS_GAMES.filter(g => g.id !== sensFromGame).map(g => {
                      const targetSens = 914.4 / (sensFromDpi * g.yaw * cm360);
                      const isSameEngine = g.yaw === fromGame.yaw;
                      const formatted = targetSens < 0.01 ? targetSens.toFixed(4) : targetSens < 1 ? targetSens.toFixed(3) : targetSens < 10 ? targetSens.toFixed(2) : targetSens.toFixed(1);
                      return (
                        <div key={g.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all group/sens"
                          style={{ background: "#00000008", border: "1px solid #e6e3d6" }}
                          onMouseEnter={e => { e.currentTarget.style.background = `${accentC}08`; e.currentTarget.style.borderColor = `${accentC}20`; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "#00000008"; e.currentTarget.style.borderColor = "#00000008"; }}>
                          {g.img ? <img loading="lazy" src={g.img} alt={`${g.name} game icon`} className="flex-shrink-0 rounded-sm" style={{ width: 20, height: 20, objectFit: "contain" }} /> : <span className="flex-shrink-0 w-5 h-5 rounded-sm flex items-center justify-center text-sm" style={{ background: "#00000008" }}>{g.name.charAt(0)}</span>}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold truncate" style={{ color: "#2d2824" }}>{g.name}</div>
                            <div className="text-sm opacity-25" style={{ fontSize: 11 }}>{g.note}</div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-black" style={{ color: accentC }}>{formatted}</div>
                            {isSameEngine && <div className="text-sm font-bold" style={{ color: "#7d6e1e", fontSize: 10 }}>Same engine</div>}
                          </div>
                          <button onClick={() => { navigator.clipboard?.writeText(formatted); }}
                            className="opacity-0 group-hover/sens:opacity-85 hover:!opacity-100 transition-all cursor-pointer flex-shrink-0"
                            title="Copy sensitivity">
                            <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/></svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}


              {/* Quick Reference */}
              {cm360 > 0 && cm360 < 10000 && (
                <div className="p-4 sm:p-6" style={{ background: "#f5f2e6", borderTop: `1px solid ${accentC}10` }}>
                  <div className="text-sm uppercase tracking-widest opacity-30 mb-3">Sensitivity Ranges by Game Type</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-lg p-3" style={{ background: "#00000008" }}>
                      <div className="text-sm font-bold mb-2" style={{ color: "#4a74c4" }}>🎯 Tactical Shooters</div>
                      <div className="text-sm opacity-85 leading-relaxed">CS2, Valorant, R6 Siege — Pros typically use 25-55 cm/360. Precise aim over flick speed. Your {cm360.toFixed(0)}cm is {cm360 > 55 ? "slower than most" : cm360 > 25 ? "in the sweet spot" : "faster than most"} tactical pros.</div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: "#00000008" }}>
                      <div className="text-sm font-bold mb-2" style={{ color: "#c44040" }}>💥 Fast-Paced Shooters</div>
                      <div className="text-sm opacity-85 leading-relaxed">Apex, OW2, CoD, Fortnite — Pros typically use 18-40 cm/360. More tracking and flicking. Your {cm360.toFixed(0)}cm is {cm360 > 40 ? "slower than most" : cm360 > 18 ? "in the sweet spot" : "faster than most"} arena pros.</div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: "#00000008" }}>
                      <div className="text-sm font-bold mb-2" style={{ color: "#7d6e1e" }}>📏 The Universal Range</div>
                      <div className="text-sm opacity-85 leading-relaxed">Most FPS pros across all titles fall between 20-50 cm/360. If you're between 25-40cm, you're in the most popular zone. Experiment ±5cm from your current to find your sweet spot.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          );
        })()}

        {/* ── TEAMS TAB ── */}
        {activeTab === "teams" && (() => {
          const teamColor = "#a68b1b";
          const teamMap = {};
          allPlayers.forEach(p => {
            if (!p.team || p.team === "Free Agent" || p.team === "Content Creator" || p.team === "Content" || p.team === "Retired" || p.team === "Streamer") return;
            if (!teamMap[p.team]) teamMap[p.team] = { players: [], games: new Set(), headphones: {} };
            teamMap[p.team].players.push(p);
            teamMap[p.team].games.add(p.game);
            if (p.headphone) teamMap[p.team].headphones[p.headphone] = (teamMap[p.team].headphones[p.headphone] || 0) + 1;
          });
          const teamList = Object.entries(teamMap)
            .map(([name, data]) => ({
              name,
              playerCount: data.players.length,
              games: [...data.games].sort(),
              topKbd: Object.entries(data.headphones).sort((a, b) => b[1] - a[1])[0]?.[0] || "—",
              countries: [...new Set(data.players.map(p => p.country).filter(Boolean))],
            }))
            .sort((a, b) => b.playerCount - a.playerCount);

          const allTeamGames = ["All", ...new Set(teamList.flatMap(t => t.games))].sort();

          const filteredTeams = teamList
            .filter(t => teamGameFilter === "All" || t.games.includes(teamGameFilter))
            .filter(t => t.name.toLowerCase().includes(teamSearch.toLowerCase()))
            .sort((a, b) => {
              if (teamSortBy === "playerCount") return b.playerCount - a.playerCount;
              if (teamSortBy === "name") return a.name.localeCompare(b.name);
              if (teamSortBy === "games") return b.games.length - a.games.length;
              return 0;
            });

          const gameColors = GAME_COLORS;

          return (
          <div>
            <SectionTitle color={teamColor} sub={`${teamList.length} organizations across ${allTeamGames.length - 1} games — click any team for details`}>Pro Teams</SectionTitle>

            {/* ── UNIFIED FILTER BAR ── */}
            {(() => {
              const TEAM_SORT_OPTIONS = [
                { value: "playerCount", label: "Most Players" },
                { value: "name", label: "Name A-Z" },
                { value: "games", label: "Most Games" },
              ];
              const teamSortLabel = TEAM_SORT_OPTIONS.find(o => o.value === teamSortBy)?.label || "Most Players";
              const activeTeamFilterCount = teamGameFilter !== "All" ? 1 : 0;
              const accentT = teamColor;
              const chipStyleT = (active, chipColor) => ({
                padding: "5px 10px", borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer",
                background: active ? (chipColor ? `${chipColor}18` : `${accentT}20`) : "#ffffff",
                border: `1px solid ${active ? (chipColor ? `${chipColor}50` : `${accentT}50`) : "#0000000a"}`,
                color: active ? (chipColor || accentT) : "#8a8460",
                transition: "all 0.15s", whiteSpace: "nowrap",
              });

              return (
                <div className="mb-5" style={{ background: "#f5f3ea", border: "1px solid #e6e3d6", borderRadius: 12, padding: 10, position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, borderRadius: "12px 12px 0 0", background: `linear-gradient(90deg, transparent, ${accentT}50, transparent)` }} />

                  <div className="flex gap-2.5 items-center" style={{ marginBottom: showTeamFilters ? 10 : 0, transition: "margin 0.3s" }}>
                    <div className="flex-1 relative" style={{ minWidth: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.25 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                      <input type="text" placeholder={`Search ${teamList.length} teams...`} value={teamSearch} onChange={e => setTeamSearch(e.target.value)}
                        className="w-full outline-none" style={{ padding: "7px 12px 7px 34px", background: "#ffffff", border: "1px solid #e6e3d6", borderRadius: 10, color: "#1a1614", fontFamily: "inherit", fontSize: 14 }} />
                    </div>

                    <div className="relative">
                      <button className="flex items-center gap-1.5" onClick={() => setShowTeamSortDrop(!showTeamSortDrop)}
                        style={{ padding: "7px 12px", background: "#ffffff", border: `1px solid ${showTeamSortDrop ? `${accentT}50` : "#0000000a"}`, borderRadius: 10, color: showTeamSortDrop ? accentT : "#3d3530", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M6 12h12M9 18h6"/></svg>
                        <span style={{ color: "#8a8460", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Sort</span>
                        <span style={{ color: accentT, fontWeight: 700 }}>{teamSortLabel}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                      {showTeamSortDrop && (
                        <>
                        <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setShowTeamSortDrop(false)} />
                        <div className="absolute" style={{ top: "calc(100% + 6px)", right: 0, background: "#f0eee2", border: "1px solid #d4d0be", borderRadius: 10, padding: 4, minWidth: 180, zIndex: 100, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
                          {TEAM_SORT_OPTIONS.map(o => (
                            <div key={o.value} className="flex items-center justify-between cursor-pointer"
                              style={{ padding: "8px 12px", borderRadius: 7, fontSize: 13, fontWeight: 600, color: teamSortBy === o.value ? accentT : "#3d3530", transition: "all 0.15s" }}
                              onMouseEnter={e => { if (teamSortBy !== o.value) e.currentTarget.style.background = `${accentT}20`; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                              onClick={() => { setTeamSortBy(o.value); setShowTeamSortDrop(false); }}>
                              {o.label}
                              {teamSortBy === o.value && <span style={{ fontSize: 12 }}>✓</span>}
                            </div>
                          ))}
                        </div>
                        </>
                      )}
                    </div>

                    <button className="flex items-center gap-1.5"
                      onClick={() => setShowTeamFilters(!showTeamFilters)}
                      style={{ padding: "7px 12px", background: (showTeamFilters || activeTeamFilterCount > 0) ? `${accentT}20` : "#ffffff", border: `1px solid ${(showTeamFilters || activeTeamFilterCount > 0) ? `${accentT}50` : "#0000000a"}`, borderRadius: 10, color: (showTeamFilters || activeTeamFilterCount > 0) ? accentT : "#3d3530", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
                      Filters
                      {activeTeamFilterCount > 0 && <span style={{ width: 18, height: 18, borderRadius: "50%", background: accentT, color: "#1a1614", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{activeTeamFilterCount}</span>}
                    </button>
                  </div>

                  <div style={{ maxHeight: showTeamFilters ? 500 : 0, overflow: "hidden", opacity: showTeamFilters ? 1 : 0, transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s" }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#8a8460", marginBottom: 5, paddingLeft: 2 }}>Game</div>
                      <div className="flex flex-wrap gap-1">
                        <span style={chipStyleT(teamGameFilter === "All")} onClick={() => setTeamGameFilter("All")}>All</span>
                        {allTeamGames.filter(g => g !== "All").map(g => (
                          <span key={g} style={chipStyleT(teamGameFilter === g, gameColors[g])} onClick={() => setTeamGameFilter(teamGameFilter === g ? "All" : g)}>{g}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {!showTeamFilters && teamGameFilter !== "All" && (
                    <div className="flex flex-wrap gap-1.5" style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #e6e3d6" }}>
                      <span className="inline-flex items-center gap-1.5" style={{ padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: `${gameColors[teamGameFilter] || accentT}20`, color: gameColors[teamGameFilter] || accentT, border: `1px solid ${gameColors[teamGameFilter] || accentT}50` }}>
                        {teamGameFilter} <span className="cursor-pointer opacity-50 hover:opacity-100" style={{ fontSize: 11 }} onClick={() => setTeamGameFilter("All")}>✕</span>
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="text-sm opacity-40 mb-4">{filteredTeams.length} {filteredTeams.length === 1 ? "team" : "teams"} found</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredTeams.map(team => {
                const primaryGame = team.games[0];
                const gc = gameColors[primaryGame] || teamColor;
                const topHpImg = getHeadphoneImage(team.topKbd);
                return (
                  <div key={team.name}
                    onClick={() => { window.location.href = `/teams/${team.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`; }}
                    className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                    style={{ background: "#ffffff", border: `1px solid ${gc}15`, boxShadow: `0 2px 8px ${gc}06` }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${gc}18, 0 0 0 1px ${gc}30`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 2px 8px ${gc}06`; }}>
                    {/* Top banner */}
                    <div className="relative h-24 overflow-hidden" style={{ background: `linear-gradient(135deg, ${gc}15 0%, ${gc}06 100%)` }}>
                      {/* Faded logo bg */}
                      {TEAM_LOGOS[team.name] && <div className="absolute -right-4 -bottom-4 opacity-[0.06]"><img loading="lazy" src={TEAM_LOGOS[team.name]} alt="" className="w-28 h-28 object-contain" /></div>}
                      {/* Team logo */}
                      <div className="absolute top-3 left-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0" style={{ background: "rgba(255,255,255,0.9)", boxShadow: `0 2px 8px ${gc}20` }}>
                          {TEAM_LOGOS[team.name] ? <img loading="lazy" src={TEAM_LOGOS[team.name]} alt={team.name} className="w-8 h-8 object-contain" /> : <Shield size={22} style={{ color: gc }} />}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-black leading-tight truncate" style={{ color: gc }}>{team.name}</div>
                          <div className="text-[10px] font-bold" style={{ color: `${gc}80` }}>{team.playerCount} {team.playerCount === 1 ? "player" : "players"}</div>
                        </div>
                      </div>
                      {/* Top headphone image */}
                      {topHpImg && (
                        <div className="absolute right-2 bottom-0 transition-transform duration-300 group-hover:scale-110">
                          <img loading="lazy" src={topHpImg} alt="" className="h-16 object-contain" style={{ filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.12))" }} />
                        </div>
                      )}
                    </div>

                    <div className="px-4 py-3">
                      {/* Game pills */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {team.games.slice(0, 3).map(g => (
                          <span key={g} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold" style={{ background: `${gameColors[g] || "#8a8460"}12`, color: gameColors[g] || "#8a8460" }}>
                            {getGameImage(g) && <img loading="lazy" src={getGameImage(g)} alt={g} style={{ width: 10, height: 10, objectFit: "contain" }} />}{g}
                          </span>
                        ))}
                        {team.games.length > 3 && <span className="px-1.5 py-0.5 rounded text-[10px] opacity-40">+{team.games.length - 3}</span>}
                      </div>

                      {/* Top headphone + country flags */}
                      <div className="flex items-center justify-between gap-2 pt-2" style={{ borderTop: "1px solid #f0ece6" }}>
                        <div className="min-w-0 flex-1">
                          <div className="text-[9px] uppercase tracking-wider font-bold" style={{ color: "#9e9578" }}>Top Headphone</div>
                          <div className="text-[11px] font-bold truncate" style={{ color: "#3d3530" }}>{team.topKbd.replace(/(Razer |HyperX |Logitech |SteelSeries |Corsair |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</div>
                        </div>
                        {team.countries.length > 0 && (
                          <div className="flex -space-x-1 flex-shrink-0">
                            {team.countries.slice(0, 4).map(c => <span key={c} className="inline-block"><Flag country={c} size={14} /></span>)}
                            {team.countries.length > 4 && <span className="text-[9px] opacity-30 ml-1.5">+{team.countries.length - 4}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {filteredTeams.length === 0 && (
              <div className="text-center py-16 opacity-40">
                <div className="text-2xl mb-2">No teams match your search</div>
                <div className="text-sm">Try adjusting your search or filter</div>
              </div>
            )}
          </div>
          );
        })()}

        {/* ── TEAM DETAIL PAGE ── */}
        {activeTab === "teamDetail" && selectedTeam && (() => {
          const tc = "#a68b1b";
          const teamPlayers = allPlayers.filter(p => p.team === selectedTeam);
          const seen = new Set();
          const uniquePlayers = teamPlayers.filter(p => {
            const key = p.name + "|" + p.game;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });

          const byGame = {};
          uniquePlayers.forEach(p => {
            if (!byGame[p.game]) byGame[p.game] = [];
            byGame[p.game].push(p);
          });
          const gameEntries = Object.entries(byGame).sort((a, b) => b[1].length - a[1].length);

          const headphoneCounts = {};
          uniquePlayers.forEach(p => { if (p.headphone && p.headphone !== "Unknown") headphoneCounts[p.headphone] = (headphoneCounts[p.headphone] || 0) + 1; });
          const topHeadphones = Object.entries(headphoneCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

          const brandCounts = {};
          uniquePlayers.forEach(p => {
            if (p.headphone) {
              const brand = p.headphone.split(" ")[0];
              brandCounts[brand] = (brandCounts[brand] || 0) + 1;
            }
          });
          const topBrands = Object.entries(brandCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);


          const countries = [...new Set(uniquePlayers.map(p => p.country).filter(Boolean))];

          const gameColors = GAME_COLORS;

          return (
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm">
              <a href="/" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Home</a>
              <span style={{ color: "#d4d0be" }}>›</span>
              <a href="/teams" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Teams</a>
              <span style={{ color: "#d4d0be" }}>›</span>
              <span style={{ color: tc }} className="font-bold opacity-70">{selectedTeam}</span>
            </nav>

            <div className="rounded-2xl p-6 sm:p-8 mb-6" style={{ background: "linear-gradient(135deg, #ffffff, #faf8f5)", border: `1px solid ${tc}20` }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: `${tc}15`, border: `1px solid ${tc}30` }}>
                  {TEAM_LOGOS[selectedTeam] ? <img loading="lazy" src={TEAM_LOGOS[selectedTeam]} alt={selectedTeam} className="w-14 h-14 object-contain" onError={e => { e.target.style.display = "none"; e.target.parentElement.querySelector('.team-fallback').style.display = "block"; }} /> : null}
                  <Shield size={36} className="team-fallback" style={{ color: tc, display: TEAM_LOGOS[selectedTeam] ? "none" : "block" }} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: tc }}>{selectedTeam}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {gameEntries.map(([game]) => (
                      <span key={game} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all hover:scale-105 hover:bg-stone-50"
                        style={{ background: `${gameColors[game] || "#8a8460"}20`, color: gameColors[game] || "#8a8460", border: `1px solid ${gameColors[game] || "#8a8460"}30` }}
                        onClick={() => { setGameDetailSlug(game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")); setActiveTab("games"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{getGameImage(game) && <img loading="lazy" src={getGameImage(game)} alt={game} className="w-3 h-3 object-contain" />}{game}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {[
                  { label: "Players Tracked", value: uniquePlayers.length, color: tc },
                  { label: "Games", value: gameEntries.length, color: "#c9a227" },
                  { label: "Nationalities", value: countries.length, color: "#a68b1b" },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "#ffffff", border: `1px solid ${s.color}15` }}>
                    <div className="text-lg sm:text-xl font-black" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs opacity-40">{s.label}</div>
                  </div>
                ))}
              </div>
              {countries.length > 0 && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs" style={{ color: "#9e9578" }}>Nationalities:</span>
                  <div className="flex flex-wrap gap-1.5">{countries.map((c, i) => <Flag key={i} country={c} size={20} />)}</div>
                </div>
              )}
            </div>

            {/* Team Bio & Achievements */}
            {TEAM_DESCRIPTIONS[selectedTeam] && (
              <div className="mb-6 rounded-xl p-5 sm:p-6" style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}>
                {TEAM_DESCRIPTIONS[selectedTeam].bio && (
                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: tc }}>About</div>
                    <p className="text-sm leading-relaxed opacity-70">{TEAM_DESCRIPTIONS[selectedTeam].bio}</p>
                  </div>
                )}
                {TEAM_DESCRIPTIONS[selectedTeam].achievements && (
                  <div>
                    <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#c9a227" }}>Top Achievements</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {TEAM_DESCRIPTIONS[selectedTeam].achievements.map((a, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="font-bold shrink-0" style={{ color: "#c9a227" }}>#{i + 1}</span>
                          <span className="opacity-60">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {topHeadphones.length > 0 && (
              <div className="mb-6">
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: tc }}>Headphone Breakdown</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {topHeadphones.map(([kbdName, count]) => {
                    const pct = Math.round((count / uniquePlayers.length) * 100);
                    return (
                      <div key={kbdName} className="rounded-xl p-3 relative overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:bg-stone-50"
                        style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}
                        onClick={() => { const mm = headphones.find(mm => mm.name === kbdName || kbdName.includes(mm.name)); if (mm) { setSelectedHeadphone(mm); setActiveTab("headphoneDetail"); window.scrollTo({ top: 0, behavior: "smooth" }); } }}>
                        <div className="absolute bottom-0 left-0 h-1 rounded-full" style={{ width: `${pct}%`, background: tc, opacity: 0.5 }} />
                        <div className="text-sm font-bold truncate hover:underline" style={{ color: "#1a1614" }}>{kbdName}</div>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-lg font-black" style={{ color: tc }}>{count}</span>
                          <span className="text-xs opacity-30">{count === 1 ? "player" : "players"} · {pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {topBrands.length > 0 && (
              <div className="mb-6">
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: tc }}>Brand Share</div>
                <div className="flex flex-wrap gap-2">
                  {topBrands.map(([brand, count]) => {
                    const pct = Math.round((count / uniquePlayers.length) * 100);
                    return (
                      <div key={brand} className="rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 hover:bg-stone-50"
                        style={{ background: "#ffffff", border: "1px solid #e6e3d6" }}
                        onClick={() => { setActiveTab("brands"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                        <span className="text-sm font-bold">{brand}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${tc}15`, color: tc }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {gameEntries.map(([game, players]) => {
              const gc = gameColors[game] || tc;
              const isOpen = expandedRosters[game] || false;
              return (
                <div key={game} className="mb-3">
                  <button onClick={() => setExpandedRosters(prev => ({ ...prev, [game]: !prev[game] }))}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:bg-stone-50"
                    style={{ background: "#ffffff", border: `1px solid ${gc}20` }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-widest font-bold" style={{ color: gc }}>{game} Roster</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: `${gc}15`, color: gc }}>{players.length}</span>
                    </div>
                    <span className="text-sm transition-transform" style={{ color: gc, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  </button>
                  {isOpen && (
                  <div className="rounded-xl overflow-hidden mt-1" style={{ border: "1px solid #e6e3d6" }}>
                    {(() => {
                      const hasRoles = players.some(p => p.role && p.role !== "—");
                      return (<>
                    <div className="hidden sm:grid px-4 py-2 text-xs uppercase tracking-widest opacity-30 items-center" style={{ background: "#ffffff", gridTemplateColumns: hasRoles ? "20% 10% 40% 12%" : "22% 38% 12%" }}>
                      <div>Player</div>
                      {hasRoles && <div>Role</div>}
                      <div>Headphone</div>
                      <div className="text-center">Hz</div>
                    </div>
                    {players.map((p, i) => (
                      <div key={p.name + i} className="grid px-4 py-3 items-center transition-all hover:bg-white/[0.02]"
                        style={{ borderTop: i > 0 ? "1px solid #e6e3d6" : "none", gridTemplateColumns: hasRoles ? "20% 10% 40% 12%" : "22% 38% 12%" }}>
                        <div className="flex items-center gap-2 min-w-0">
                          <Flag country={p.country} size={18} className="shrink-0" />
                          <span className="text-sm font-bold truncate cursor-pointer hover:underline" style={{ color: "#1a1614" }}
                            onClick={() => { const pp = proPlayers.find(pp => pp.name === p.name); if (pp) { setSelectedPlayer(pp); setActiveTab("players"); window.scrollTo({ top: 0, behavior: "smooth" }); } }}>{p.name}</span>
                        </div>
                        {hasRoles && <div>
                          {p.role && p.role !== "—" ? <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${gc}15`, color: gc }}>{p.role}</span> : null}
                        </div>}
                        <div className="text-sm truncate">
                          <span className="opacity-80 cursor-pointer hover:underline hover:opacity-100 transition-opacity"
                            onClick={() => { const mm = headphones.find(mm => mm.name === p.headphone || p.headphone?.includes(mm.name)); if (mm) { setSelectedHeadphone(mm); setActiveTab("headphoneDetail"); window.scrollTo({ top: 0, behavior: "smooth" }); } }}>{p.headphone || "Unknown"}</span>
                        </div>
                        <div className="text-center text-sm opacity-60">{p.hz ? p.hz.toLocaleString() : "—"}</div>
                      </div>
                    ))}
                    </>);
                    })()}
                  </div>
                  )}
                </div>
              );
            })}
          </div>
          );
        })()}

        {/* ── Mini Newsletter CTA ── */}
        {activeTab !== "overview" && (
        <div className="flex justify-end mt-10 mb-2">
        <div className="rounded-lg px-4 py-2.5 flex items-center gap-3 flex-wrap w-fit" style={{ background: "linear-gradient(135deg, #c9a22708, #a68b1b06)", border: "1px solid #c9a22712" }}>
          <span className="text-sm font-black text-stone-900">Stay ahead of the meta</span>
          <span className="opacity-20 text-sm hidden sm:inline">·</span>
          <span style={{ fontSize: 12 }} className="opacity-30 hidden sm:inline">Pro gear changes & data insights</span>
          {newsletterStatus === "success" ? (
            <span style={{ fontSize: 12, color: "#c9a227" }} className="font-bold">✓ Subscribed!</span>
          ) : (
            <form className="flex gap-1.5" onSubmit={async e => { e.preventDefault(); setNewsletterStatus("sending"); try { const res = await fetch("https://formspree.io/f/xvzbwrzv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: newsletterEmail }) }); setNewsletterStatus(res.ok ? "success" : "error"); } catch { setNewsletterStatus("error"); } }}>
              <input type="email" required placeholder="your@email.com" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
                className="w-36 px-2.5 py-1 rounded-md outline-none" style={{ background: "#ffffff", border: "1px solid #d4d0be", color: "#1a1614", fontSize: 12 }} />
              <button type="submit" disabled={newsletterStatus === "sending"} className="px-3 py-1 rounded-md font-black transition-all hover:scale-105 disabled:opacity-50" style={{ background: "#c9a227", color: "#1a1614", fontSize: 12 }}>
                {newsletterStatus === "sending" ? "..." : "Subscribe"}
              </button>
            </form>
          )}
        </div>
        </div>
        )}

      </main>

      {/* ─── SCROLL TO TOP ─── */}
      {showScrollTop && (
        <button aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 md:bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "linear-gradient(135deg, #c9a227, #2d2824)", color: "#fff", boxShadow: "0 4px 20px #c9a22730" }}>
          ▲
        </button>
      )}

      {/* ─── FOOTER ─── */}
      <footer role="contentinfo" aria-label="Site footer" className="relative py-12 px-6 overflow-hidden" style={{ background: "#ece9d8" }}>
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, #c9a227, #2d2824, transparent)" }} />
        {/* Decorative headphone outline */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.03 }}>
          <svg width="800" height="280" viewBox="0 0 800 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="780" height="260" rx="16" stroke="#1a1614" strokeWidth="2"/>
            {Array.from({ length: 14 }).map((_, i) => <rect key={`r1-${i}`} x={24 + i * 55} y="28" width="44" height="44" rx="6" stroke="#1a1614" strokeWidth="1.5"/>)}
            {Array.from({ length: 13 }).map((_, i) => <rect key={`r2-${i}`} x={38 + i * 55} y="82" width="44" height="44" rx="6" stroke="#1a1614" strokeWidth="1.5"/>)}
            {Array.from({ length: 12 }).map((_, i) => <rect key={`r3-${i}`} x={52 + i * 55} y="136" width="44" height="44" rx="6" stroke="#1a1614" strokeWidth="1.5"/>)}
            <rect x="180" y="190" width="440" height="44" rx="6" stroke="#1a1614" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block">{I.headphone(24)}</span>
                <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 15, letterSpacing: 4, color: "#c9a227" }}>ESPORTSHEADPHONES.COM</span>
              </div>
              <p className="text-sm opacity-30 leading-relaxed">{`The definitive resource for professional esports headphones. Data from ${allPlayers.length}+ pro players across ${new Set(allPlayers.map(p=>p.game)).size} major competitive titles.`}</p>
              <p className="text-xs opacity-20 mt-2">Data last updated: February 2026</p>
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest opacity-30 mb-3">Best Headphones By Game</div>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Best for CS2", href: "/best/cs2", color: "#c47000" },
                  { label: "Best for Valorant", href: "/best/valorant", color: "#2d2824" },
                  { label: "Best for Fortnite", href: "/best/fortnite", color: "#4c7bd9" },
                  { label: "Best for Apex", href: "/best/apex", color: "#dc2626" },
                  { label: "Best for LoL", href: "/best/lol", color: "#c89b3c" },
                  { label: "Best for R6 Siege", href: "/best/r6-siege", color: "#4a86c8" },
                  { label: "Best for OW2", href: "/best/overwatch-2", color: "#f99e1a" },
                  { label: "Best Wireless", href: "/best/wireless", color: "#c9a227" },
                  { label: "Best Lightweight", href: "/best/lightweight", color: "#7d6e1e" },
                  { label: "Best Budget", href: "/best/budget", color: "#c9a227" },
                ].map(g => (
                  <a key={g.href} href={g.href} className="block hover:opacity-80 transition-all no-underline" style={{ color: g.color, textDecoration: "none" }}>{g.label}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest opacity-30 mb-3">Games</div>
              <div className="space-y-2 text-sm">
                {[
                  { name: "Counter-Strike 2", slug: "cs2", color: "#c47000" },
                  { name: "Valorant", slug: "valorant", color: "#2d2824" },
                  { name: "League of Legends", slug: "lol", color: "#c89b3c" },
                  { name: "Fortnite", slug: "fortnite", color: "#4c7bd9" },
                  { name: "Apex Legends", slug: "apex", color: "#dc2626" },
                  { name: "Dota 2", slug: "dota-2", color: "#e74c3c" },
                  { name: "R6 Siege", slug: "r6-siege", color: "#4a86c8" },
                  { name: "Overwatch 2", slug: "overwatch-2", color: "#f99e1a" },
                  { name: "Rocket League", slug: "rocket-league", color: "#1a9fff" },
                ].map(g => (
                  <a key={g.slug} href={`/games/${g.slug}`} className="block hover:opacity-80 transition-all no-underline" style={{ color: g.color, textDecoration: "none" }}>{g.name}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest opacity-30 mb-3">Top Brands</div>
              <div className="space-y-2 text-sm">
                {["Razer", "Logitech", "SteelSeries", "Corsair", "HyperX", "beyerdynamic", "Sennheiser", "ASTRO"].map(b => (
                  <a key={b} href={`/brands/${b.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="block hover:opacity-80 transition-all no-underline" style={{ color: BRAND_COLORS[b] || "#8a8460", textDecoration: "none" }}>{b}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest opacity-30 mb-3">Resources</div>
              <div className="space-y-2 text-sm">
                {[
                  { label: "All Headphones", href: "/headphones" },
                  { label: "Headphone Rankings", href: "/headphones" },
                  { label: "Pro Player Settings", href: "/players" },
                  { label: "Compare Headphones", href: "/compare" },
                  { label: "Driver Database", href: "/sensors" },
                  { label: "Best Headphone Guides", href: "/best" },
                  { label: "Blog", href: "/blog" },
                  { label: "Industry Trends", href: "/trends" },
                  { label: "Pro Teams", href: "/teams" },
                  { label: "Contact Us", href: "/contact" },
                  { label: "About Our Data", href: "/about" },
                ].map(r => (
                  <a key={r.label} href={r.href} className="block cursor-pointer hover:opacity-80 transition-all opacity-50 hover:opacity-70 no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>{r.label}</a>
                ))}
              </div>
            </div>
          </div>
          {/* Popular Comparisons */}
          <div className="mb-6 pb-6 border-b" style={{ borderColor: "#00000008" }}>
            <div className="text-xs uppercase tracking-widest opacity-20 mb-3">Popular Comparisons</div>
            <div className="flex flex-wrap gap-2">
              {[
                { a: "Razer BlackShark V2 Pro", b: "Logitech G Pro X Headset" },
                { a: "Razer BlackShark V3 Pro", b: "SteelSeries Arctis Nova Pro Wireless" },
                { a: "Logitech G PRO X 2 Headset", b: "Razer BlackShark V2 Pro" },
                { a: "beyerdynamic DT 990 Pro", b: "Sennheiser HD 560S" },
                { a: "HyperX Cloud III Wireless", b: "Corsair HS80 RGB Wireless" },
                { a: "ASTRO A50", b: "SteelSeries Arctis Nova Pro Wireless" },
              ].map(c => {
                const sa = c.a.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
                const sb = c.b.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
                return <a key={sa+sb} href={`/compare/${sa}-vs-${sb}`} className="text-xs px-2.5 py-1 rounded-full no-underline transition-all hover:opacity-80" style={{ background: "#0000000a", border: "1px solid #e6e3d6", color: "#8a8460", textDecoration: "none" }}>{c.a.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")} vs {c.b.replace(/(Razer |Logitech |SteelSeries |Corsair |HyperX |beyerdynamic |Sennheiser |ASTRO |Sony |ASUS |JBL |Audeze |Turtle Beach |EPOS )/, "")}</a>;
              })}
            </div>
          </div>
          {/* Newsletter */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b" style={{ borderColor: "#00000008" }}>
            <span style={{ fontSize: 12, color: "#c9a227", letterSpacing: 2 }} className="font-black uppercase flex-shrink-0">Newsletter</span>
            <span style={{ fontSize: 12 }} className="opacity-20 hidden sm:inline">·</span>
            <span style={{ fontSize: 12 }} className="opacity-25 flex-shrink-0 hidden sm:inline">Pro gear updates & data insights</span>
            {newsletterStatus === "success" ? (
              <span style={{ fontSize: 11, color: "#c9a227" }} className="font-black">✓ Subscribed</span>
            ) : (
              <form className="flex gap-1.5" onSubmit={async e => { e.preventDefault(); setNewsletterStatus("sending"); try { const res = await fetch("https://formspree.io/f/xvzbwrzv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: newsletterEmail }) }); setNewsletterStatus(res.ok ? "success" : "error"); } catch { setNewsletterStatus("error"); } }}>
                <input type="email" required placeholder="your@email.com" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
                  className="w-36 sm:w-44 px-2.5 py-1.5 rounded-md outline-none" style={{ background: "#ffffff", border: "1px solid #d4d0be", color: "#1a1614", fontSize: 12 }} />
                <button type="submit" disabled={newsletterStatus === "sending"} className="px-3 py-1.5 rounded-md font-black transition-all hover:scale-105 disabled:opacity-50" style={{ background: "#c9a227", color: "#1a1614", fontSize: 12 }}>
                  {newsletterStatus === "sending" ? "..." : "Join"}
                </button>
              </form>
            )}
          </div>
          <div className="border-t pt-6 flex flex-wrap justify-between items-center text-sm opacity-20 gap-2" style={{ borderColor: "#00000008" }}>
            <span>© 2026 EsportsHeadphones.com  -  All rights reserved</span>
            <span>Data last updated: February 2026 · {allPlayers.length} players · {headphones.length} headphones</span>
            <span>As an Amazon Associate, EsportsHeadphones earns from qualifying purchases</span>
          </div>
        </div>
      </footer>
      </div>{/* end content wrapper */}
    </div>
  );
}
