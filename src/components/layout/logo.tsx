export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4338ca" />
            <stop offset="0.6" stopColor="#6d28d9" />
            <stop offset="1" stopColor="#0e7490" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#logo-g)" />
        {/* a rising bar chart with a growth arrow */}
        <path d="M7 24.5h18" stroke="white" strokeOpacity="0.7" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="8.5" y="17" width="3.6" height="6" rx="1" fill="white" fillOpacity="0.75" />
        <rect x="14.2" y="13" width="3.6" height="10" rx="1" fill="white" fillOpacity="0.85" />
        <rect x="19.9" y="9.5" width="3.6" height="13.5" rx="1" fill="white" />
        <path d="M7.5 13.5l5-4 4 2.2 6.5-5.2" fill="none" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.6 6.2h3.6v3.6" fill="none" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight">
          Business<span className="bg-gradient-to-r from-brand to-diversity bg-clip-text text-transparent">Mzansi</span>
        </span>
      )}
    </span>
  );
}
