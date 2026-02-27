// Server-rendered content for SEO crawlers.
// Visually hidden but present in HTML source for search engines.

export function SSRSection({ children }) {
  return (
    <div className="absolute overflow-hidden" style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
      {children}
    </div>
  );
}

export function SSRTitle({ children, accent }) {
  return (
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4" style={{ color: "#e8eaf0" }}>
      {accent && <span style={{ color: "#00d4ff" }}>{accent} </span>}
      {children}
    </h1>
  );
}

export function SSRSub({ children }) {
  return <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "#8890a0" }}>{children}</p>;
}

export function SSRGrid({ children }) {
  return (
    <div style={{ borderTopWidth: 1, borderTopColor: "#2a3040" }} className="pt-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">{children}</div>
    </div>
  );
}

export function SSRStat({ label, value, color }) {
  const accentColor = color || "#00d4ff";
  return (
    <div className="rounded-lg px-4 py-3 border-l-[3px] relative" style={{
      background: "#141824",
      borderColor: accentColor,
      boxShadow: "0 2px 8px rgba(0, 212, 255, 0.1)"
    }}>
      <div className="flex items-center gap-2 mb-1">
        <div style={{
          width: 8,
          height: 8,
          borderRadius: 2,
          background: accentColor
        }} />
        <div className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>{label}</div>
      </div>
      <div className="text-base sm:text-lg font-black" style={{ color: "#e8eaf0" }}>{value}</div>
    </div>
  );
}

export function SSRLink({ href, children, color }) {
  const accentColor = color || "#00d4ff";
  const shadowColor = color ? `${color}40` : "#00d4ff40";

  return (
    <a href={href} className="inline-block text-xs sm:text-sm font-bold px-4 py-2 rounded-lg no-underline transition-all duration-150 hover:translate-y-px active:translate-y-1"
      style={{
        background: accentColor,
        color: "#0b0f1a",
        boxShadow: `0 2px 0 ${shadowColor}, 0 3px 6px rgba(0, 212, 255, 0.2)`,
        cursor: "pointer"
      }}>
      {children}
    </a>
  );
}

export function SSRDivider() {
  return (
    <div className="my-6" style={{
      height: 2,
      borderRadius: "1px",
      background: "linear-gradient(to right, transparent 0%, #00d4ff 25%, #7c3aed 50%, #f59e0b 75%, transparent 100%)",
      boxShadow: "0 2px 4px rgba(0, 212, 255, 0.2)",
      margin: "24px 0"
    }} />
  );
}
