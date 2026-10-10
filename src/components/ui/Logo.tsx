interface LogoProps {
  className?: string;
}

/** Monograma FC. O mesmo desenho é usado no favicon (src/app/icon.svg). */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" fill="#0a0e17" stroke="rgb(255 255 255 / 0.16)" />
      <path
        d="M7.5 22V10h6M7.5 16h5"
        stroke="#f4f6fb"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.2 11.8a6 6 0 1 0 0 8.4"
        stroke="#4a85ff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
