import logoUrl from "@/assets/conecta-apae-logo.png";

type Props = {
  size?: number;
  className?: string;
  /** When true, renders only the symbol (icon) area of the logo. */
  iconOnly?: boolean;
};

/**
 * Brand logo for ConectaAPAE.
 * The asset includes the symbol + wordmark + tagline.
 * Use `iconOnly` to crop to just the heart/figures symbol on the left.
 */
export function BrandLogo({ size = 40, className, iconOnly = false }: Props) {
  if (iconOnly) {
    // The symbol occupies roughly the left ~22% of the image.
    // We render a fixed square and use background-image to crop to it.
    return (
      <span
        role="img"
        aria-label="ConectaAPAE"
        className={className}
        style={{
          display: "inline-block",
          width: size,
          height: size,
          backgroundImage: `url(${logoUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
          // Source aspect ~ 470x140 (~3.36:1). Scale so the symbol fits the box.
          backgroundSize: `auto ${size}px`,
        }}
      />
    );
  }

  return (
    <img
      src={logoUrl}
      alt="ConectaAPAE — Conectando cuidado, família e inclusão"
      className={className}
      style={{ height: size, width: "auto", display: "block" }}
    />
  );
}
