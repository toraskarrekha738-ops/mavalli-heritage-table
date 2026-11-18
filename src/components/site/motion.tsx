import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Heading whose words rise out of a mask, one after another. */
export function SplitReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  animateOnMount = false,
  italicWords = [],
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
  italicWords?: string[];
}) {
  const words = text.split(" ");
  const trigger = animateOnMount
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={cn(
              "inline-block",
              italicWords.includes(word) && "italic text-brass-gradient pr-[0.06em]",
            )}
            variants={{
              hidden: { y: "110%", rotate: 6, opacity: 0 },
              show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 1.1, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </motion.span>
  );
}

/** Image that unveils through a rising mask and settles from a slight zoom. */
export function MaskImage({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  delay = 0,
  parallax = 0,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  delay?: number;
  parallax?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useParallax(ref, parallax);
  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.3, ease: EASE, delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ y }}
        initial={{ scale: 1.18 }}
        whileInView={{ scale: parallax ? 1.12 : 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE, delay }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </motion.div>
  );
}

/** Slow vertical drift tied to an element's scroll position. */
export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  distance: number,
): MotionValue<number> {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range = reduce ? 0 : distance;
  return useTransform(scrollYProgress, [0, 1], [-range, range]);
}

/** Wrapper that eases its child toward the pointer — subtle, max ~10px. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  return (
    <motion.div
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * 18);
        y.set(((e.clientY - r.top) / r.height - 0.5) * 14);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", id === "home" ? window.location.pathname : `#${id}`);
}


/** 3D tilt toward the pointer with a soft brass glare. Mouse only; off for reduced motion. */
export function Tilt({ children, className, max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, color-mix(in oklab, var(--primary) 26%, transparent), transparent 60%)`;
  return (
    <motion.div
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * max * 2);
        rx.set((0.5 - py) * max * 2);
        gx.set(px * 100);
        gy.set(py * 100);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glare }}
      />
    </motion.div>
  );
}

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/** Endless typographic ribbon that speeds up with scroll velocity. Decorative only. */
export function Marquee({
  items,
  direction = 1,
  className,
}: {
  items: string[];
  direction?: 1 | -1;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [5, 0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const speed = 1.6 + Math.abs(boost.get());
    baseX.set(baseX.get() - direction * speed * (delta / 1000));
  });

  const row = [...items, ...items];
  return (
    <div aria-hidden className={cn("relative overflow-hidden border-y border-border py-7 sm:py-9", className)}>
      <motion.div style={{ x }} className="flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <span key={i} className="flex items-center gap-10 pr-10 font-display text-4xl font-light sm:text-6xl">
                <span className={i % 2 ? "italic text-brass-gradient" : "text-foreground/90"}>{t}</span>
                <svg viewBox="0 0 12 12" className="h-3 w-3 text-primary sm:h-4 sm:w-4" fill="currentColor">
                  <path d="M6 0.8 11.2 6 6 11.2 0.8 6Z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/** Thin brass bar that fills as the page is read. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={cn("pointer-events-none h-[2px] origin-left bg-primary", className)}
    />
  );
}

/** Brass ring that trails the mouse and swells over interactive elements. Desktop mouse only. */
export function CursorRing() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      setHovering(!!t?.closest?.("a, button, [role='button'], input, select, textarea, label, [tabindex='0']"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="cursor-ring pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <motion.span
        className="block rounded-full border border-primary"
        animate={{
          width: hovering ? 56 : 26,
          height: hovering ? 56 : 26,
          opacity: visible ? (hovering ? 0.9 : 0.55) : 0,
          backgroundColor: hovering
            ? "color-mix(in oklab, var(--primary) 14%, transparent)"
            : "color-mix(in oklab, var(--primary) 0%, transparent)",
        }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      />
    </motion.div>
  );
}

const EMBERS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  bottom: (i * 13) % 30,
  size: 2 + ((i * 7) % 4),
  delay: (i * 0.73) % 9,
  duration: 8 + ((i * 5) % 7),
  drift: ((i % 5) - 2) * 22,
}));

/** Glowing spice-dust motes drifting up through a section. Pure CSS animation. */
export function Embers({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("embers pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="animate-ember absolute rounded-full bg-primary"
          style={
            {
              left: `${e.left}%`,
              bottom: `${e.bottom}%`,
              width: e.size,
              height: e.size,
              opacity: 0,
              animationDelay: `${e.delay}s`,
              boxShadow: "0 0 10px 2px color-mix(in oklab, var(--primary) 60%, transparent)",
              "--ember-duration": `${e.duration}s`,
              "--ember-drift": `${e.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
