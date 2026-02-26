/**
 * Server-Side Rendered Components for EsportsHeadphones
 * Dark cyberpunk theme with cyan, purple, and navy palette
 */

/**
 * SSRSection - Wrapper section with padding and max-width
 * Props: children, className
 */
export function SSRSection({ children, className = "" }) {
  return (
    <section className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
      {children}
    </section>
  );
}

/**
 * SSRTitle - Big title with accent color word
 * Props: children (accent word), accent (word to highlight)
 * Example: <SSRTitle accent="ESPORTS">HEADPHONES</SSRTitle>
 */
export function SSRTitle({ children, accent }) {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center">
      <span style={{ color: "#00f0ff" }}>{accent}</span>
      {" "}
      <span className="text-white">{children}</span>
    </h1>
  );
}

/**
 * SSRSub - Subtitle paragraph
 * Props: children
 */
export function SSRSub({ children }) {
  return (
    <p className="text-gray-400 text-lg max-w-2xl mx-auto text-center mt-4">
      {children}
    </p>
  );
}

/**
 * SSRGrid - Responsive grid for stat cards
 * Props: children
 * 2 columns on mobile, 4 columns on desktop
 */
export function SSRGrid({ children }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {children}
    </div>
  );
}

/**
 * SSRStat - Static stat display
 * Props: label, value, color
 */
export function SSRStat({ label, value, color = "#00f0ff" }) {
  return (
    <div className="bg-opacity-50 p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors text-center"
      style={{ backgroundColor: "rgba(10, 14, 26, 0.8)" }}>
      <div
        className="text-2xl md:text-3xl font-bold mb-2"
        style={{ color: color }}
      >
        {value}
      </div>
      <div className="text-sm text-gray-400 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

/**
 * SSRLink - Navigation pill/button link
 * Props: href, children
 */
export function SSRLink({ href, children }) {
  return (
    <a
      href={href}
      className="inline-block px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 border border-gray-700 hover:border-cyan-500 hover:text-cyan-400 hover:shadow-lg"
      style={{
        backgroundColor: "rgba(10, 14, 26, 0.9)",
        boxShadow: "0 0 20px rgba(0, 240, 255, 0)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 240, 255, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 240, 255, 0)";
      }}
    >
      {children}
    </a>
  );
}

/**
 * SSRDivider - Horizontal line divider with subtle glow
 */
export function SSRDivider() {
  return (
    <div
      className="my-12 mx-auto w-full max-w-3xl h-px"
      style={{
        background: "linear-gradient(to right, transparent, rgba(0, 240, 255, 0.3), transparent)",
        boxShadow: "0 0 20px rgba(0, 240, 255, 0.1)"
      }}
    />
  );
}
