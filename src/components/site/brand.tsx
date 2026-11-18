import { cn } from "@/lib/utils";

/** Soft rising steam wisps, positioned by the caller over a hot cup. */
export function Steam({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={cn("pointer-events-none absolute text-ivory", className)} aria-hidden fill="none" stroke="currentColor" strokeLinecap="round">
      <defs>
        <filter id="steam-blur" x="-50%" y="-20%" width="200%" height="140%">
          <feGaussianBlur stdDeviation="1.8" />
        </filter>
      </defs>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          className="steam-line"
          style={{ animationDelay: `${i * 1.1}s`, animationDuration: "3.8s", strokeDasharray: "none", opacity: 0 }}
          d={`M${42 + i * 18} 150 c -14 -22 14 -34 0 -56 s 14 -34 0 -60`}
          strokeWidth="5"
          filter="url(#steam-blur)"
        />
      ))}
    </svg>
  );
}

/** Tiny brass tumbler with animated rising steam. */
export function SteamEmblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 40"
      className={cn("h-9 w-7 text-primary", className)}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <path className="steam-line" style={{ animationDelay: "0s" }} d="M11 14c-2-3 2-4 0-7" strokeWidth="1.2" />
      <path className="steam-line" style={{ animationDelay: "0.9s" }} d="M16 13c-2-3 2-5 0-8" strokeWidth="1.2" />
      <path className="steam-line" style={{ animationDelay: "1.8s" }} d="M21 14c-2-3 2-4 0-7" strokeWidth="1.2" />
      <path d="M7 18h18l-2.2 15.5a2 2 0 0 1-2 1.5h-9.6a2 2 0 0 1-2-1.5L7 18Z" strokeWidth="1.3" />
      <path d="M8.2 22h15.6" strokeWidth="0.8" opacity="0.6" />
      <path d="M4 35.5h24" strokeWidth="1.3" />
    </svg>
  );
}

export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <SteamEmblem />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display font-medium tracking-[0.28em]", compact ? "text-lg" : "text-xl")}>
          MAVALLI
        </span>
        <span className="mt-1 flex items-center gap-1.5 text-[0.55rem] font-semibold tracking-[0.55em] text-primary">
          <span className="h-px w-3 bg-primary/60" />
          HERITAGE
        </span>
      </span>
    </span>
  );
}

/** Small ornamental divider: line · diamond · line */
export function Ornament({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3 text-primary", className)} aria-hidden>
      <span className="h-px w-10 bg-current opacity-50" />
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor">
        <path d="M6 0.8 11.2 6 6 11.2 0.8 6Z" />
      </svg>
      <span className="h-px w-10 bg-current opacity-50" />
    </span>
  );
}

export function SectionEyebrow({ index, label, className }: { index: string; label: string; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-4 text-primary", className)}>
      <span className="font-display text-base tracking-normal italic">{index}</span>
      <span className="h-px w-10 bg-current opacity-50" />
      {label}
    </p>
  );
}
