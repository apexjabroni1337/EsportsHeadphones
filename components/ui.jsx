'use client';

import React from 'react';

// GlowText - Text with neon glow effect
export const GlowText = ({ children, color = 'cyan', className = '' }) => {
  const colorMap = {
    cyan: '#00f0ff',
    purple: '#b366ff',
    pink: '#ff3366',
    white: '#ffffff',
  };

  const glowColor = colorMap[color] || colorMap.cyan;

  return (
    <span
      className={`font-bold ${className}`}
      style={{
        color: glowColor,
        textShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, 0 0 30px ${glowColor}`,
      }}
    >
      {children}
    </span>
  );
};

// StatBox - Animated stat card
export const StatBox = ({ label, value, color = 'cyan', icon }) => {
  const colorMap = {
    cyan: { border: 'border-cyan-500', text: 'text-cyan-400', shadow: 'shadow-cyan-500/50' },
    purple: { border: 'border-purple-500', text: 'text-purple-400', shadow: 'shadow-purple-500/50' },
    pink: { border: 'border-pink-500', text: 'text-pink-400', shadow: 'shadow-pink-500/50' },
  };

  const { border, text, shadow } = colorMap[color] || colorMap.cyan;

  return (
    <div
      className={`
        relative bg-gradient-to-br from-slate-900/40 to-slate-950/40
        border ${border} border-opacity-30 rounded-lg p-6
        backdrop-blur-md hover:border-opacity-60 transition-all duration-300
        hover:shadow-lg ${shadow} cursor-default group
      `}
    >
      {/* Top accent border */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${border} rounded-t-lg`} />

      {/* Icon */}
      {icon && (
        <div className={`text-3xl mb-4 ${text} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      )}

      {/* Value */}
      <div className={`text-3xl font-bold ${text} mb-2`}>
        {value}
      </div>

      {/* Label */}
      <div className="text-sm text-gray-400 uppercase tracking-widest font-semibold">
        {label}
      </div>
    </div>
  );
};

// SectionTitle - Section heading with accent color
export const SectionTitle = ({ children, accent, className = '' }) => {
  if (!accent) {
    return (
      <h2 className={`text-4xl font-bold text-white uppercase tracking-tight ${className}`}>
        {children}
      </h2>
    );
  }

  // Split children by accent word
  const text = typeof children === 'string' ? children : String(children);
  const parts = text.split(accent);

  return (
    <h2 className={`text-4xl font-bold uppercase tracking-tight ${className}`}>
      {parts.map((part, idx) => (
        <React.Fragment key={idx}>
          <span className="text-white">{part}</span>
          {idx < parts.length - 1 && (
            <GlowText color="cyan" className="ml-2 mr-2">
              {accent}
            </GlowText>
          )}
        </React.Fragment>
      ))}
    </h2>
  );
};

// HeadphoneCard - Product card for headphones
export const HeadphoneCard = ({ headphone }) => {
  if (!headphone) return null;

  const { name, brand, price, rating, proUsage, type, amazonUrl } = headphone;

  return (
    <div className="relative group h-full">
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />

      <div
        className={`
          relative bg-gradient-to-br from-slate-900/60 to-slate-950/60
          border border-cyan-500/20 rounded-lg p-6
          backdrop-blur-md h-full flex flex-col
          group-hover:border-cyan-500/60 transition-all duration-300
        `}
      >
        {/* Top color accent border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-t-lg" />

        {/* Brand Badge */}
        {brand && (
          <div className="mb-3">
            <BrandBadge brand={brand} />
          </div>
        )}

        {/* Name */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {name}
        </h3>

        {/* Price */}
        {price && (
          <div className="mb-4">
            <span className="text-2xl font-bold text-cyan-400">
              ${price}
            </span>
          </div>
        )}

        {/* Rating Bar */}
        {rating !== undefined && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-400">Rating</span>
              <span className="text-sm font-semibold text-cyan-400">{rating.toFixed(1)}/5</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                style={{ width: `${(rating / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Pro Usage */}
        {proUsage !== undefined && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-400">Pro Usage</span>
              <span className="text-sm font-semibold text-purple-400">{proUsage}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${proUsage}%` }}
              />
            </div>
          </div>
        )}

        {/* Type Badge */}
        {type && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-slate-800 border border-pink-500/40 text-pink-400 text-xs font-semibold uppercase rounded">
              {type}
            </span>
          </div>
        )}

        {/* View Details Link */}
        <div className="mt-auto pt-4">
          {amazonUrl ? (
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-block w-full text-center py-2 px-4
                border border-cyan-500/40 text-cyan-400 font-semibold
                rounded bg-cyan-500/5 hover:bg-cyan-500/20
                hover:border-cyan-500/80 transition-all duration-300
                uppercase text-sm tracking-wide
              `}
            >
              View Details
            </a>
          ) : (
            <button
              disabled
              className={`
                inline-block w-full text-center py-2 px-4
                border border-cyan-500/20 text-cyan-400/50 font-semibold
                rounded bg-cyan-500/5 cursor-not-allowed
                uppercase text-sm tracking-wide
              `}
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// CustomTooltip - For recharts visualization
export const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-slate-950/95 border border-cyan-500/60 rounded-lg p-3 backdrop-blur-md">
      {label && (
        <p className="text-cyan-400 font-semibold text-sm mb-1">
          {label}
        </p>
      )}
      {payload.map((entry, index) => (
        <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

// Flag - Country flag display
export const Flag = ({ country, size = 'md' }) => {
  if (!country) return null;

  // Convert emoji to country code
  const getCountryCode = (emoji) => {
    if (!emoji) return '';

    // Handle emoji flag format (regional indicator symbols)
    const codePoints = [...emoji].map((char) => char.codePointAt(0));

    if (codePoints.length === 2) {
      // Regional indicator range: 0x1F1E6 to 0x1F1FF
      const code1 = codePoints[0] - 0x1f1e6;
      const code2 = codePoints[1] - 0x1f1e6;

      if (code1 >= 0 && code1 <= 25 && code2 >= 0 && code2 <= 25) {
        return String.fromCharCode(65 + code1, 65 + code2).toLowerCase();
      }
    }

    return '';
  };

  const countryCode = getCountryCode(country);
  const flagUrl = countryCode
    ? `https://flagcdn.com/${countryCode}.svg`
    : null;

  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
  };

  if (!flagUrl) {
    return <span className={`${sizeMap[size]} flex items-center justify-center`}>{country}</span>;
  }

  return (
    <img
      src={flagUrl}
      alt={country}
      className={`${sizeMap[size]} rounded-sm object-cover`}
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
};

// PlayerRow - Table row for player
export const PlayerRow = ({ player, rank, onClick }) => {
  if (!player) return null;

  const { flag, name, team, game, headphone } = player;

  return (
    <tr
      onClick={onClick}
      className={`
        border-b border-slate-800/50 hover:bg-slate-800/30
        transition-all duration-300 cursor-pointer
        hover:shadow-lg hover:shadow-cyan-500/20
      `}
    >
      {/* Rank */}
      <td className="px-6 py-4">
        <span className="text-cyan-400 font-bold text-lg">
          #{rank}
        </span>
      </td>

      {/* Flag & Name */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Flag country={flag} size="md" />
          <span className="text-white font-semibold">{name}</span>
        </div>
      </td>

      {/* Team */}
      <td className="px-6 py-4">
        <span className="text-gray-400">{team || '-'}</span>
      </td>

      {/* Game */}
      <td className="px-6 py-4">
        <span className="text-gray-400">{game || '-'}</span>
      </td>

      {/* Headphone */}
      <td className="px-6 py-4">
        <span className="text-purple-400 font-medium">{headphone || '-'}</span>
      </td>
    </tr>
  );
};

// BrandBadge - Small colored badge with brand name
export const BrandBadge = ({ brand, colors }) => {
  if (!brand) return null;

  const defaultColors = {
    'SteelSeries': { bg: 'bg-blue-900/40', text: 'text-blue-400', border: 'border-blue-500/40' },
    'HyperX': { bg: 'bg-red-900/40', text: 'text-red-400', border: 'border-red-500/40' },
    'Corsair': { bg: 'bg-purple-900/40', text: 'text-purple-400', border: 'border-purple-500/40' },
    'Astro': { bg: 'bg-cyan-900/40', text: 'text-cyan-400', border: 'border-cyan-500/40' },
    'Audio-Technica': { bg: 'bg-orange-900/40', text: 'text-orange-400', border: 'border-orange-500/40' },
    'Razer': { bg: 'bg-green-900/40', text: 'text-green-400', border: 'border-green-500/40' },
    'SCUF': { bg: 'bg-pink-900/40', text: 'text-pink-400', border: 'border-pink-500/40' },
  };

  const colorConfig = colors?.[brand] || defaultColors[brand] || defaultColors['Corsair'];

  return (
    <span
      className={`
        inline-block px-3 py-1
        ${colorConfig.bg} border ${colorConfig.border}
        ${colorConfig.text} text-xs font-bold uppercase
        rounded-sm tracking-widest
      `}
    >
      {brand}
    </span>
  );
};
