type Props = { size?: number; className?: string };

export function BrandLogo({ size = 40, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ConectaAPAE"
    >
      <path
        d="M20 14a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm-6 16h12a8 8 0 0 1 8 8v14H6V38a8 8 0 0 1 8-8Z"
        fill="var(--brand-navy)"
      />
      <path
        d="M40 18a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm-4 14h8a7 7 0 0 1 7 7v13H29V39a7 7 0 0 1 7-7Z"
        fill="var(--brand-yellow)"
      />
      <path
        d="M26 36c0-2.2 1.8-4 4-4 1.4 0 2.6.7 3.3 1.8.7-1.1 1.9-1.8 3.3-1.8 2.2 0 4 1.8 4 4 0 3.8-7.3 8-7.3 8S26 39.8 26 36Z"
        fill="var(--brand-yellow)"
      />
    </svg>
  );
}
