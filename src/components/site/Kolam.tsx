import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DOTS = 9;
const STEP = 40;
const W = DOTS * STEP;
const H = 40;
const MID = H / 2;

/** Two phase-shifted weaving lines: together they loop around each pulli (dot), like a sikku kolam. */
function weave(phase: 1 | -1) {
  let d = `M0 ${MID}`;
  for (let i = 0; i < DOTS; i++) {
    const x = i * STEP;
    const s = (i % 2 ? -1 : 1) * phase;
    d += ` C${x + STEP * 0.3} ${MID - 16 * s} ${x + STEP * 0.7} ${MID - 16 * s} ${x + STEP} ${MID}`;
  }
  return d;
}

/** Kolam-inspired section divider: a row of dots woven through by two brass lines, drawn in on view. */
export function KolamDivider({ className, label }: { className?: string; label?: string }) {
  return (
    <div className={cn("container-luxe flex items-center gap-5 text-primary", className)} aria-hidden={!label}>
      <motion.span
        className="h-px flex-1 origin-right bg-current opacity-30"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <svg viewBox={`-2 0 ${W + 4} ${H}`} className="h-8 w-[min(60vw,22rem)] shrink-0 overflow-visible" fill="none" stroke="currentColor" aria-hidden>
        {[1, -1].map((p) => (
          <motion.path
            key={p}
            d={weave(p as 1 | -1)}
            strokeWidth={1}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: p === 1 ? 0.1 : 0.35 }}
          />
        ))}
        {Array.from({ length: DOTS }, (_, i) => (
          <motion.circle
            key={i}
            cx={i * STEP + STEP / 2}
            cy={MID}
            r={1.8}
            fill="currentColor"
            stroke="none"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
          />
        ))}
      </svg>
      {label && <span className="eyebrow sr-only">{label}</span>}
      <motion.span
        className="h-px flex-1 origin-left bg-current opacity-30"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
