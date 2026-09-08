

export default function Logo({ size = 36, className = '' }) {
  const id = 'sentio-prism';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 hover:brightness-110 ${className}`}
    >
      <defs>
        <linearGradient id={`${id}-top`} x1="16" y1="12" x2="48" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id={`${id}-mid`} x1="20" y1="20" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id={`${id}-bot`} x1="16" y1="36" x2="48" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id={`${id}-core`} x1="28" y1="28" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
      </defs>

      <polygon points="32,6 54,18.5 54,45.5 32,58 10,45.5 10,18.5" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.3" />
      <polygon points="32,10 48,19 40,24 32,19 24,24 16,19" fill={`url(#${id}-top)`} />
      <polygon points="48,19 48,31 40,24" fill="#1d4ed8" opacity="0.9" />
      <polygon points="24,24 40,24 32,32 16,32" fill={`url(#${id}-mid)`} />
      <polygon points="48,32 32,32 40,40 48,40" fill="#4338ca" />
      <polygon points="16,33 24,40 16,45 16,33" fill="#0284c7" />
      <polygon points="48,45 40,40 32,45 24,40 16,45 32,54" fill={`url(#${id}-bot)`} />
      <circle cx="32" cy="32" r="3" fill={`url(#${id}-core)`} />
      <circle cx="32" cy="32" r="5" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}