type Props = {
  size?: number;
  className?: string;
  /** When true, renders only the symbol (two people + heart). */
  iconOnly?: boolean;
};

/**
 * Brand logo for ConectaAPAE.
 * Vector-based: two stylised human figures with a heart in between,
 * plus the wordmark. Uses project brand colours via CSS custom properties.
 */
export function BrandLogo({ size = 40, className, iconOnly = false }: Props) {
  // The symbol + wordmark aspect ratio is roughly 3.5:1
  const height = size;
  const width = iconOnly ? size : size * 3.6;

  if (iconOnly) {
    return (
      <span
        role="img"
        aria-label="ConectaAPAE"
        className={className}
        style={{ display: "inline-block", width: size, height: size }}
      >
        <svg viewBox="0 0 60 60" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="navyFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--brand-navy)" />
              <stop offset="100%" stopColor="var(--brand-navy-deep)" />
            </linearGradient>
          </defs>
          {/* Left figure */}
          <g fill="url(#navyFill)">
            <circle cx="19" cy="16" r="7" />
            <path d="M8 54 C8 42 13 34 19 34 C25 34 30 42 30 54 Z" />
          </g>
          {/* Right figure */}
          <g fill="url(#navyFill)">
            <circle cx="41" cy="16" r="7" />
            <path d="M30 54 C30 42 35 34 41 34 C47 34 52 42 52 54 Z" />
          </g>
          {/* Heart in the middle */}
          <path
            d="M30 28
               C26 22, 18 24, 18 31
               C18 38, 30 48, 30 48
               C30 48, 42 38, 42 31
               C42 24, 34 22, 30 28Z"
            fill="var(--brand-yellow)"
            stroke="var(--brand-yellow)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", height: size }}
    >
      <svg viewBox="0 0 60 60" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="navyFillFull" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand-navy)" />
            <stop offset="100%" stopColor="var(--brand-navy-deep)" />
          </linearGradient>
        </defs>
        {/* Left figure */}
        <g fill="url(#navyFillFull)">
          <circle cx="19" cy="16" r="7" />
          <path d="M8 54 C8 42 13 34 19 34 C25 34 30 42 30 54 Z" />
        </g>
        {/* Right figure */}
        <g fill="url(#navyFillFull)">
          <circle cx="41" cy="16" r="7" />
          <path d="M30 54 C30 42 35 34 41 34 C47 34 52 42 52 54 Z" />
        </g>
        {/* Heart */}
        <path
          d="M30 28
             C26 22, 18 24, 18 31
             C18 38, 30 48, 30 48
             C30 48, 42 38, 42 31
             C42 24, 34 22, 30 28Z"
          fill="var(--brand-yellow)"
          stroke="var(--brand-yellow)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      <span
        style={{
          fontFamily:
            'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          fontWeight: 800,
          fontSize: size * 0.58,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: 'var(--brand-navy)',
        }}
      >
        ConectaAPAE
      </span>
    </span>
  );
}
