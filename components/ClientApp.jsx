"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, CartesianGrid, Legend, AreaChart, Area } from "recharts";
import { Home, Headphones, Trophy, Users, Gamepad2, Building2, TrendingUp, GitCompare, Search, X, FlaskConical, ChevronDown, Volume2, Wifi, WifiOff, Star, ExternalLink, Menu, ArrowLeft } from "lucide-react";
import { AMAZON_TAG, amazonLink, BRAND_COLORS, HEADPHONE_IMAGE_URLS, HEADPHONE_DESCRIPTIONS, GAME_IMAGE_URLS, GAME_DESCRIPTIONS_MAP, TEAM_DESCRIPTIONS, TEAM_LOGOS, headphones, proPlayers, extendedPlayers, allPlayers, brandMarketShare, gameBreakdown, typeTrend, priceTrend, wirelessTrend, countryName } from "@/data";
import { GlowText, StatBox, HeadphoneCard, CustomTooltip, Flag } from "@/components/ui";

// Tab routing configuration
const TAB_ROUTES = {
  overview: "/",
  headphones: "/headphones",
  players: "/players",
  games: "/games",
  brands: "/brands",
  trends: "/trends",
  compare: "/compare",
  lab: "/lab",
  headphoneDetail: "/headphones/:slug",
  teams: "/teams",
  teamDetail: "/teams/:name",
};

// Animated counter component
function AnimatedCounter({ end = 0, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted.current) {
        hasStarted.current = true;
        const startTime = Date.now();
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(end * progress));
          if (progress === 1) clearInterval(interval);
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="font-bold text-cyan-400">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Navigation component
function Navigation({ activeTab, onTabChange, mobileMenuOpen, setMobileMenuOpen }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "headphones", label: "Headphones", icon: Headphones },
    { id: "players", label: "Players", icon: Users },
    { id: "games", label: "Games", icon: Gamepad2 },
    { id: "brands", label: "Brands", icon: Building2 },
    { id: "trends", label: "Trends", icon: TrendingUp },
    { id: "compare", label: "Compare", icon: GitCompare },
    { id: "lab", label: "Lab", icon: FlaskConical },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange("overview")}>
            <Headphones className="w-6 h-6 text-cyan-400" />
            <div className="hidden sm:flex gap-1">
              <span className="font-bold text-lg text-cyan-400">ESPORTS</span>
              <span className="font-bold text-lg text-white">HEADPHONES</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                  activeTab === id
                    ? "bg-cyan-500/30 text-cyan-400 border border-cyan-400/50"
                    : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-cyan-500/10 rounded-lg transition-all text-cyan-400"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-cyan-500/10 rounded-lg transition-all text-cyan-400"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4 border-t border-cyan-500/20">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-cyan-400" />
              <input
                type="text"
                placeholder="Search headphones, players, games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/80"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-cyan-500/20 flex flex-col gap-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  onTabChange(id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 w-full ${
                  activeTab === id
                    ? "bg-cyan-500/30 text-cyan-400 border border-cyan-400/50"
                    : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Overview Tab
function OverviewTab() {
  const topHeadphones = headphones.slice(0, 10).map((h) => ({
    name: h.name,
    count: Math.floor(Math.random() * 150) + 50,
  }));

  const featuredPlayers = proPlayers.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Hero Section with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox
          label="Total Pro Players"
          value={<AnimatedCounter end={allPlayers.length} duration={2000} />}
          icon={Trophy}
        />
        <StatBox
          label="Headphones Tracked"
          value={<AnimatedCounter end={headphones.length} duration={2000} />}
          icon={Headphones}
        />
        <StatBox
          label="Games Analyzed"
          value={<AnimatedCounter end={gameBreakdown.length} duration={2000} />}
          icon={Gamepad2}
        />
        <StatBox
          label="Brands Monitored"
          value={<AnimatedCounter end={brandMarketShare.length} duration={2000} />}
          icon={Building2}
        />
      </div>

      {/* Most Popular Headphones Chart */}
      <div className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <GlowText text="Most Popular Headphones" />
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topHeadphones}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
            <XAxis dataKey="name" stroke="#00f0ff" />
            <YAxis stroke="#00f0ff" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#00f0ff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Brand Market Share and Wireless Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Brand Market Share */}
        <div className="bg-gradient-to-br from-cyan-900/10 to-purple-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-400" />
            <GlowText text="Brand Market Share" />
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={brandMarketShare.slice(0, 8)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#00f0ff"
                dataKey="value"
              >
                {brandMarketShare.slice(0, 8).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={Object.values(BRAND_COLORS)[index % 8]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Wireless Adoption Trend */}
        <div className="bg-gradient-to-br from-pink-900/10 to-cyan-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-pink-400" />
            <GlowText text="Wireless Adoption" />
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={wirelessTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
              <XAxis dataKey="month" stroke="#00f0ff" />
              <YAxis stroke="#00f0ff" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="wireless" stroke="#00f0ff" strokeWidth={2} dot={{ fill: "#00f0ff" }} />
              <Line type="monotone" dataKey="wired" stroke="#b366ff" strokeWidth={2} dot={{ fill: "#b366ff" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Featured Pro Players */}
      <div className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <GlowText text="Featured Pro Players" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredPlayers.map((player) => (
            <div
              key={player.id}
              className="bg-black/30 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-400/50 transition-all hover:bg-cyan-500/5 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{player.name}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <Flag countryCode={player.country} />
                    {countryName(player.country)}
                  </p>
                </div>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-sm text-cyan-400 mb-2">{player.team}</p>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Gamepad2 className="w-3 h-3" />
                {player.game}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
                <Headphones className="w-3 h-3" />
                {player.headphone}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Headphones Tab
function HeadphonesTab({ onSelectHeadphone }) {
  const [filters, setFilters] = useState({ brand: "", type: "", priceRange: [0, 500] });
  const [sortBy, setSortBy] = useState("popularity");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHeadphones = headphones.filter((h) => {
    const matchesBrand = !filters.brand || h.brand === filters.brand;
    const matchesType = !filters.type || h.type === filters.type;
    const matchesPrice = h.price >= filters.priceRange[0] && h.price <= filters.priceRange[1];
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesType && matchesPrice && matchesSearch;
  });

  const sortedHeadphones = [...filteredHeadphones].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const uniqueBrands = [...new Set(headphones.map((h) => h.brand))];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-gradient-to-br from-cyan-900/10 to-purple-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-cyan-400" />
          <GlowText text="Find Your Headphones" />
        </h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search headphones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-black/30 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/80"
          />
        </div>

        {/* Filter and Sort Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Brand Filter */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Brand</label>
            <select
              value={filters.brand}
              onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
              className="w-full px-3 py-2 bg-black/30 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400/80"
            >
              <option value="">All Brands</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full px-3 py-2 bg-black/30 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400/80"
            >
              <option value="">All Types</option>
              <option value="Wireless">Wireless</option>
              <option value="Wired">Wired</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Max Price</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
              className="w-full accent-cyan-400"
            />
            <p className="text-xs text-cyan-400 mt-1">${filters.priceRange[1]}</p>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400/80"
            >
              <option value="popularity">Popularity</option>
              <option value="price">Price (Low to High)</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-4">{sortedHeadphones.length} headphones found</p>
      </div>

      {/* Headphones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedHeadphones.map((headphone) => (
          <HeadphoneCard
            key={headphone.id}
            headphone={headphone}
            onClick={() => onSelectHeadphone(headphone.slug)}
          />
        ))}
      </div>
    </div>
  );
}

// Players Tab
function PlayersTab() {
  const [filterGame, setFilterGame] = useState("");
  const [filterTeam, setFilterTeam] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rank");

  const filteredPlayers = allPlayers.filter((p) => {
    const matchesGame = !filterGame || p.game === filterGame;
    const matchesTeam = !filterTeam || p.team === filterTeam;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGame && matchesTeam && matchesSearch;
  });

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (sortBy === "rank") return (a.rank || 9999) - (b.rank || 9999);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const uniqueGames = [...new Set(allPlayers.map((p) => p.game))];
  const uniqueTeams = [...new Set(allPlayers.map((p) => p.team))].slice(0, 50);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-gradient-to-br from-cyan-900/10 to-purple-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" />
          <GlowText text="Pro Players Database" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/80"
            />
          </div>

          {/* Game Filter */}
          <div>
            <select
              value={filterGame}
              onChange={(e) => setFilterGame(e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400/80"
            >
              <option value="">All Games</option>
              {uniqueGames.map((game) => (
                <option key={game} value={game}>
                  {game}
                </option>
              ))}
            </select>
          </div>

          {/* Team Filter */}
          <div>
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400/80"
            >
              <option value="">All Teams</option>
              {uniqueTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400/80"
            >
              <option value="rank">Rank</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-4">{sortedPlayers.length} players found</p>
      </div>

      {/* Players Table */}
      <div className="overflow-x-auto bg-black/30 border border-cyan-500/20 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-cyan-900/20 border-b border-cyan-500/20">
            <tr>
              <th className="px-4 py-3 text-left text-cyan-400">Rank</th>
              <th className="px-4 py-3 text-left text-cyan-400">Name</th>
              <th className="px-4 py-3 text-left text-cyan-400">Country</th>
              <th className="px-4 py-3 text-left text-cyan-400">Team</th>
              <th className="px-4 py-3 text-left text-cyan-400">Game</th>
              <th className="px-4 py-3 text-left text-cyan-400">Headphone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/10">
            {sortedPlayers.slice(0, 100).map((player, idx) => (
              <tr key={player.id} className="hover:bg-cyan-500/5 transition-colors cursor-pointer">
                <td className="px-4 py-3 text-gray-400">{player.rank || idx + 1}</td>
                <td className="px-4 py-3 text-white font-medium">{player.name}</td>
                <td className="px-4 py-3 text-gray-400">
                  <Flag countryCode={player.country} />
                </td>
                <td className="px-4 py-3 text-gray-400">{player.team}</td>
                <td className="px-4 py-3 text-gray-400">{player.game}</td>
                <td className="px-4 py-3 text-cyan-400 font-medium">{player.headphone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Games Tab
function GamesTab() {
  const gameStats = gameBreakdown.slice(0, 12).map((game) => ({
    ...game,
    players: Math.floor(Math.random() * 500) + 100,
  }));

  return (
    <div className="space-y-6">
      {/* Game Distribution Chart */}
      <div className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-pink-400" />
          <GlowText text="Pro Players by Game" />
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={gameStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
            <XAxis dataKey="game" stroke="#00f0ff" />
            <YAxis stroke="#00f0ff" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="players" fill="#b366ff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gameBreakdown.slice(0, 9).map((game) => (
          <div
            key={game.id}
            className="bg-gradient-to-br from-black/40 to-cyan-900/20 border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-400/50 transition-all hover:bg-cyan-500/5 cursor-pointer group"
          >
            {GAME_IMAGE_URLS[game.game] && (
              <div className="w-full h-32 bg-black/50 rounded-lg mb-4 overflow-hidden border border-cyan-500/20">
                <img
                  src={GAME_IMAGE_URLS[game.game]}
                  alt={game.game}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            )}
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{game.game}</h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{GAME_DESCRIPTIONS_MAP[game.game] || "Competitive gaming at its finest."}</p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="text-cyan-400 font-medium">Popular Headphones:</span> {game.topHeadphones?.slice(0, 2).join(", ") || "N/A"}
              </p>
              <p className="text-gray-400">
                <span className="text-cyan-400 font-medium">Pro Count:</span> {Math.floor(Math.random() * 500) + 50}+
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Brands Tab
function BrandsTab() {
  const brandStats = brandMarketShare.slice(0, 12).map((brand) => ({
    ...brand,
    topModel: headphones.filter((h) => h.brand === brand.name)[0]?.name || "N/A",
  }));

  return (
    <div className="space-y-6">
      {/* Brand Market Share Chart */}
      <div className="bg-gradient-to-br from-cyan-900/10 to-purple-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-cyan-400" />
          <GlowText text="Brand Market Share" />
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={brandStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
            <XAxis dataKey="name" stroke="#00f0ff" />
            <YAxis stroke="#00f0ff" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#00f0ff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Brand Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {brandStats.slice(0, 8).map((brand) => (
          <div
            key={brand.name}
            className="bg-gradient-to-br from-black/40 to-purple-900/20 border border-cyan-500/20 rounded-lg p-6 hover:border-purple-400/50 transition-all hover:bg-purple-500/5 cursor-pointer group"
          >
            <div
              className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center font-bold text-lg"
              style={{ backgroundColor: BRAND_COLORS[brand.name] || "#b366ff", color: "#000" }}
            >
              {brand.name.substring(0, 2).toUpperCase()}
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{brand.name}</h3>
            <p className="text-2xl font-bold text-purple-400 mb-3">{brand.value}%</p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="text-cyan-400 font-medium">Top Model:</span> {brand.topModel}
              </p>
              <p className="text-gray-400">
                <span className="text-cyan-400 font-medium">Market Share:</span> {brand.value}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Trends Tab
function TrendsTab() {
  const priceDistribution = [
    { range: "Budget <$100", value: 35, fill: "#00f0ff" },
    { range: "$100-$200", value: 30, fill: "#b366ff" },
    { range: "$200-$400", value: 25, fill: "#ff3366" },
    { range: "Premium >$400", value: 10, fill: "#ffaa00" },
  ];

  return (
    <div className="space-y-6">
      {/* Wireless Trend */}
      <div className="bg-gradient-to-br from-cyan-900/10 to-blue-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Wifi className="w-5 h-5 text-cyan-400" />
          <GlowText text="Wireless Adoption Over Time" />
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={wirelessTrend}>
            <defs>
              <linearGradient id="colorWireless" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWired" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b366ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#b366ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
            <XAxis dataKey="month" stroke="#00f0ff" />
            <YAxis stroke="#00f0ff" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="wireless" stroke="#00f0ff" fillOpacity={1} fill="url(#colorWireless)" />
            <Area type="monotone" dataKey="wired" stroke="#b366ff" fillOpacity={1} fill="url(#colorWired)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Price Trend and Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Price Trend */}
        <div className="bg-gradient-to-br from-pink-900/10 to-purple-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pink-400" />
            <GlowText text="Average Price Trend" />
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
              <XAxis dataKey="month" stroke="#ff3366" />
              <YAxis stroke="#ff3366" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="price" stroke="#ff3366" strokeWidth={2} dot={{ fill: "#ff3366" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Price Distribution */}
        <div className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-purple-400" />
            <GlowText text="Price Distribution" />
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ range, value }) => `${range}: ${value}%`}
                outerRadius={80}
                fill="#b366ff"
                dataKey="value"
              >
                {priceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Type Trend */}
      <div className="bg-gradient-to-br from-blue-900/10 to-cyan-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-blue-400" />
          <GlowText text="Headphone Type Distribution" />
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={typeTrend}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#00f0ff"
              dataKey="value"
            >
              <Cell fill="#00f0ff" />
              <Cell fill="#b366ff" />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Compare Tab
function CompareTab() {
  const [selected, setSelected] = useState([]);

  const headphonesToCompare = selected.map((slug) => headphones.find((h) => h.slug === slug)).filter(Boolean);

  const handleSelectHeadphone = (slug) => {
    if (selected.includes(slug)) {
      setSelected(selected.filter((s) => s !== slug));
    } else if (selected.length < 3) {
      setSelected([...selected, slug]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Selection Section */}
      <div className="bg-gradient-to-br from-cyan-900/10 to-purple-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-cyan-400" />
          <GlowText text="Select Headphones to Compare" />
        </h2>
        <p className="text-sm text-gray-400 mb-4">Choose up to 3 headphones to compare side-by-side</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 max-h-96 overflow-y-auto">
          {headphones.slice(0, 20).map((headphone) => (
            <button
              key={headphone.id}
              onClick={() => handleSelectHeadphone(headphone.slug)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selected.includes(headphone.slug)
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                  : "bg-black/30 border-cyan-500/20 text-white hover:border-cyan-400/50"
              }`}
            >
              <p className="font-bold text-sm">{headphone.name}</p>
              <p className="text-xs text-gray-400 mt-1">${headphone.price}</p>
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-400">{selected.length}/3 selected</p>
      </div>

      {/* Comparison Table */}
      {headphonesToCompare.length > 0 && (
        <div className="overflow-x-auto bg-black/30 border border-cyan-500/20 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-cyan-900/20 border-b border-cyan-500/20">
              <tr>
                <th className="px-4 py-3 text-left text-cyan-400">Spec</th>
                {headphonesToCompare.map((h) => (
                  <th key={h.id} className="px-4 py-3 text-left text-cyan-400">
                    {h.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10">
              <tr className="hover:bg-cyan-500/5">
                <td className="px-4 py-3 font-medium text-white">Price</td>
                {headphonesToCompare.map((h) => (
                  <td key={h.id} className="px-4 py-3 text-cyan-400">
                    ${h.price}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-cyan-500/5">
                <td className="px-4 py-3 font-medium text-white">Type</td>
                {headphonesToCompare.map((h) => (
                  <td key={h.id} className="px-4 py-3 text-gray-400">
                    {h.type}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-cyan-500/5">
                <td className="px-4 py-3 font-medium text-white">Brand</td>
                {headphonesToCompare.map((h) => (
                  <td key={h.id} className="px-4 py-3 text-gray-400">
                    {h.brand}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-cyan-500/5">
                <td className="px-4 py-3 font-medium text-white">Driver Size</td>
                {headphonesToCompare.map((h) => (
                  <td key={h.id} className="px-4 py-3 text-gray-400">
                    {h.driverSize || "N/A"}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-cyan-500/5">
                <td className="px-4 py-3 font-medium text-white">Impedance</td>
                {headphonesToCompare.map((h) => (
                  <td key={h.id} className="px-4 py-3 text-gray-400">
                    {h.impedance || "N/A"}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-cyan-500/5">
                <td className="px-4 py-3 font-medium text-white">Weight</td>
                {headphonesToCompare.map((h) => (
                  <td key={h.id} className="px-4 py-3 text-gray-400">
                    {h.weight || "N/A"}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-cyan-500/5">
                <td className="px-4 py-3 font-medium text-white">Pro Usage</td>
                {headphonesToCompare.map((h) => {
                  const proCount = allPlayers.filter((p) => p.headphone === h.name).length;
                  return (
                    <td key={h.id} className="px-4 py-3 text-cyan-400">
                      {proCount} pros
                    </td>
                  );
                })}
              </tr>
              <tr className="hover:bg-cyan-500/5">
                <td className="px-4 py-3 font-medium text-white">Amazon Link</td>
                {headphonesToCompare.map((h) => (
                  <td key={h.id} className="px-4 py-3">
                    <a
                      href={amazonLink(h.amazon_asin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Lab Tab - Headphone Finder Quiz
function LabTab() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ budget: null, wireless: null, game: null, comfort: null });
  const [recommendations, setRecommendations] = useState([]);

  const questions = [
    {
      title: "What's Your Budget?",
      options: ["Under $100", "$100-$200", "$200-$400", "No Limit"],
      key: "budget",
    },
    {
      title: "Do You Need Wireless?",
      options: ["Wireless Only", "Wired Only", "Either Works"],
      key: "wireless",
    },
    {
      title: "What's Your Main Game?",
      options: ["FPS", "MOBA", "Fighting", "Other"],
      key: "game",
    },
    {
      title: "What's Your Comfort Priority?",
      options: ["Lightweight", "Padded & Plush", "Balanced", "Durability"],
      key: "comfort",
    },
  ];

  const handleAnswer = (index) => {
    const newAnswers = { ...answers, [questions[step].key]: index };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      generateRecommendations(newAnswers);
    }
  };

  const generateRecommendations = (answers) => {
    let filtered = [...headphones];

    // Filter by budget
    if (answers.budget === 0) filtered = filtered.filter((h) => h.price < 100);
    if (answers.budget === 1) filtered = filtered.filter((h) => h.price >= 100 && h.price < 200);
    if (answers.budget === 2) filtered = filtered.filter((h) => h.price >= 200 && h.price < 400);

    // Filter by wireless
    if (answers.wireless === 0) filtered = filtered.filter((h) => h.type === "Wireless");
    if (answers.wireless === 1) filtered = filtered.filter((h) => h.type === "Wired");

    setRecommendations(filtered.slice(0, 3));
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({ budget: null, wireless: null, game: null, comfort: null });
    setRecommendations([]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <FlaskConical className="w-6 h-6 text-purple-400" />
          <GlowText text="Headphone Finder Quiz" />
        </h2>
        <p className="text-gray-400 mb-8">Find the perfect headphones for your setup in 4 quick questions</p>

        {recommendations.length === 0 ? (
          <div className="max-w-2xl">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Question {step + 1}</span>
                <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-black/50 rounded-full h-2 border border-cyan-500/20">
                <div
                  className="bg-cyan-400 h-full rounded-full transition-all"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h3 className="text-xl font-bold text-white mb-6">{questions[step].title}</h3>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {questions[step].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="p-4 bg-black/30 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all text-white font-medium text-left group"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Your Top 3 Recommendations</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {recommendations.map((headphone, idx) => (
                <div
                  key={headphone.id}
                  className="bg-black/30 border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-400/50 transition-all text-center"
                >
                  <div className="text-3xl font-bold text-cyan-400 mb-2">#{idx + 1}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{headphone.name}</h4>
                  <p className="text-sm text-gray-400 mb-4">{headphone.brand}</p>
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mb-4">
                    <p className="text-2xl font-bold text-cyan-400">${headphone.price}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-4">
                    {headphone.type === "Wireless" ? (
                      <Wifi className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-purple-400" />
                    )}
                    {headphone.type}
                  </div>
                  <a
                    href={amazonLink(headphone.amazon_asin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-all text-sm font-medium"
                  >
                    View on Amazon
                  </a>
                </div>
              ))}
            </div>

            <button
              onClick={resetQuiz}
              className="px-6 py-2 bg-purple-500/20 border border-purple-400/50 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-all font-medium"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Headphone Detail Tab
function HeadphoneDetailTab({ headphoneSlug }) {
  const headphone = headphones.find((h) => h.slug === headphoneSlug);

  if (!headphone) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Headphone not found</p>
      </div>
    );
  }

  const proUsers = allPlayers.filter((p) => p.headphone === headphone.name);
  const games = [...new Set(proUsers.map((p) => p.game))];

  const gameUsageData = games.map((game) => ({
    game,
    count: proUsers.filter((p) => p.game === game).length,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-900/10 to-purple-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:w-1/3">
            {HEADPHONE_IMAGE_URLS[headphone.name] && (
              <img
                src={HEADPHONE_IMAGE_URLS[headphone.name]}
                alt={headphone.name}
                className="w-full rounded-lg border border-cyan-500/20"
              />
            )}
          </div>

          {/* Info */}
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold text-white mb-2">{headphone.name}</h1>
            <p className="text-lg text-cyan-400 mb-4">{headphone.brand}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-sm text-gray-400">Price</p>
                <p className="text-2xl font-bold text-cyan-400">${headphone.price}</p>
              </div>
              <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-sm text-gray-400">Type</p>
                <p className="text-2xl font-bold text-cyan-400">{headphone.type}</p>
              </div>
              <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-sm text-gray-400">Pro Users</p>
                <p className="text-2xl font-bold text-purple-400">{proUsers.length}</p>
              </div>
              <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-sm text-gray-400">Games</p>
                <p className="text-2xl font-bold text-pink-400">{games.length}</p>
              </div>
            </div>

            <p className="text-gray-400 mb-6">{HEADPHONE_DESCRIPTIONS[headphone.name] || "Premium gaming headphones designed for competitive esports."}</p>

            <a
              href={amazonLink(headphone.amazon_asin)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-all font-medium"
            >
              Buy on Amazon <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Usage by Game */}
      {gameUsageData.length > 0 && (
        <div className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
            <GlowText text="Usage by Game" />
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gameUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
              <XAxis dataKey="game" stroke="#00f0ff" />
              <YAxis stroke="#00f0ff" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#b366ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Pro Players Using */}
      {proUsers.length > 0 && (
        <div className="bg-gradient-to-br from-pink-900/10 to-cyan-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <GlowText text="Pro Players Using This Headphone" />
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cyan-900/20 border-b border-cyan-500/20">
                <tr>
                  <th className="px-4 py-3 text-left text-cyan-400">Name</th>
                  <th className="px-4 py-3 text-left text-cyan-400">Team</th>
                  <th className="px-4 py-3 text-left text-cyan-400">Game</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/10">
                {proUsers.slice(0, 15).map((player) => (
                  <tr key={player.id} className="hover:bg-cyan-500/5 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{player.name}</td>
                    <td className="px-4 py-3 text-gray-400">{player.team}</td>
                    <td className="px-4 py-3 text-cyan-400">{player.game}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Teams Tab
function TeamsTab() {
  const uniqueTeams = [...new Set(allPlayers.map((p) => p.team))];
  const [selectedTeam, setSelectedTeam] = useState(null);

  const teamData = uniqueTeams.slice(0, 20).map((teamName) => {
    const players = allPlayers.filter((p) => p.team === teamName);
    const games = [...new Set(players.map((p) => p.game))];
    const headphones = [...new Set(players.map((p) => p.headphone))];

    return {
      name: teamName,
      players: players.length,
      games: games.join(", "),
      headphones: headphones.slice(0, 3),
      logo: TEAM_LOGOS[teamName],
    };
  });

  const selectedTeamData = teamData.find((t) => t.name === selectedTeam);

  return (
    <div className="space-y-6">
      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamData.map((team) => (
          <button
            key={team.name}
            onClick={() => setSelectedTeam(team.name)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedTeam === team.name
                ? "bg-cyan-500/20 border-cyan-400 text-white"
                : "bg-black/30 border-cyan-500/20 text-white hover:border-cyan-400/50"
            }`}
          >
            <h3 className="font-bold text-sm mb-2">{team.name}</h3>
            <p className="text-xs text-gray-400">{team.players} Players</p>
            <p className="text-xs text-cyan-400 mt-1">{team.games.substring(0, 20)}...</p>
          </button>
        ))}
      </div>

      {/* Team Detail */}
      {selectedTeamData && (
        <div className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-white">{selectedTeamData.name}</h2>
            {selectedTeamData.logo && (
              <img src={selectedTeamData.logo} alt={selectedTeamData.name} className="w-12 h-12 rounded" />
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-4">
              <p className="text-sm text-gray-400">Total Players</p>
              <p className="text-2xl font-bold text-cyan-400">{selectedTeamData.players}</p>
            </div>
            <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-4">
              <p className="text-sm text-gray-400">Games</p>
              <p className="text-sm text-purple-400">{selectedTeamData.games}</p>
            </div>
            <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-4">
              <p className="text-sm text-gray-400">Top Headphones</p>
              <p className="text-sm text-pink-400">{selectedTeamData.headphones.join(", ") || "N/A"}</p>
            </div>
          </div>

          {/* Team Players */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Team Players</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cyan-900/20 border-b border-cyan-500/20">
                  <tr>
                    <th className="px-4 py-3 text-left text-cyan-400">Name</th>
                    <th className="px-4 py-3 text-left text-cyan-400">Game</th>
                    <th className="px-4 py-3 text-left text-cyan-400">Headphone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-500/10">
                  {allPlayers
                    .filter((p) => p.team === selectedTeam)
                    .slice(0, 20)
                    .map((player) => (
                      <tr key={player.id} className="hover:bg-cyan-500/5 transition-colors">
                        <td className="px-4 py-3 text-white font-medium">{player.name}</td>
                        <td className="px-4 py-3 text-gray-400">{player.game}</td>
                        <td className="px-4 py-3 text-cyan-400">{player.headphone}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main App Component
export default function EsportsHeadphones({
  initialTab = "overview",
  initialHeadphoneSlug = null,
  initialPlayerSlug = null,
  initialGameSlug = null,
  initialTeam = null,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.push(TAB_ROUTES[tab]);
  };

  const handleSelectHeadphone = (slug) => {
    setActiveTab("headphoneDetail");
    router.push(`/headphones/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,240,255,0.05)_25%,rgba(0,240,255,0.05)_26%,transparent_27%,transparent_74%,rgba(0,240,255,0.05)_75%,rgba(0,240,255,0.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
      </div>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Content */}
      <main className="pt-20 pb-12 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="space-y-6">
          {/* Tab Content */}
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "headphones" && <HeadphonesTab onSelectHeadphone={handleSelectHeadphone} />}
          {activeTab === "players" && <PlayersTab />}
          {activeTab === "games" && <GamesTab />}
          {activeTab === "brands" && <BrandsTab />}
          {activeTab === "trends" && <TrendsTab />}
          {activeTab === "compare" && <CompareTab />}
          {activeTab === "lab" && <LabTab />}
          {activeTab === "headphoneDetail" && initialHeadphoneSlug && <HeadphoneDetailTab headphoneSlug={initialHeadphoneSlug} />}
          {activeTab === "teams" && <TeamsTab />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              ESPORTS HEADPHONES &copy; 2024 • Your ultimate esports gear database
            </p>
            <p className="text-xs text-gray-500">
              Tracking {allPlayers.length} professional players across {[...new Set(allPlayers.map((p) => p.game))].length} games
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
