import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ClientOnly } from "@tanstack/react-router";
import { ArrowDown, SkipForward } from "lucide-react";
import { SIGNATURE_DISHES, formatPrice } from "@/lib/site-data";
import { ACT_COUNT, actIndex } from "@/lib/acts";
import { EASE, scrollToId } from "../motion";

const ActsCanvas = lazy(() => import("./ActsCanvas"));

const ACTS = [
  { dish: SIGNATURE_DISHES[0]!, numeral: "I", title: "The crackle", labels: ["Ghee-roasted crêpe", "Spiced potato masala", "Coconut & tomato chutney"] },
  { dish: SIGNATURE_DISHES[1]!, numeral: "II", title: "The aroma", labels: ["Seeraga samba rice", "Tender chicken", "Fried onions & mint"] },
  { dish: SIGNATURE_DISHES[2]!, numeral: "III", title: "The feast", labels: ["Sambar · rasam", "Kootu · poriyal", "Papad · payasam"] },
];

function useWebGL() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setOk(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

function Steam() {
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-[22%] h-40 w-40 -translate-x-1/2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 h-28 w-6 rounded-full bg-foreground/10 blur-xl"
          style={{ left: `${25 + i * 25}%` }}
          animate={{ y: [-0, -60], opacity: [0, 0.6, 0], scaleX: [1, 1.8] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function ActsStage() {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const webgl = useWebGL();
  const [lite, setLite] = useState(false);
  const [ready, setReady] = useState(false);
  const [act, setAct] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const finale = useTransform(scrollYProgress, [0.78, 0.95], [0, 1]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  useEffect(() => setLite(window.matchMedia("(max-width: 767px), (pointer: coarse)").matches), []);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = actIndex(v);
    setAct((a) => (a === i ? a : i));
  });

  const current = ACTS[act] ?? ACTS[0]!;
  const use3D = webgl === true;

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Three signature dishes"
      className="theme-charcoal relative bg-background"
      style={{ height: "360svh" }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* stage */}
        <div className="absolute inset-0">
          {use3D ? (
            <ClientOnly fallback={null}>
              <Suspense fallback={null}>
                <ActsCanvas progress={scrollYProgress} reduce={reduce} lite={lite} onReady={() => setReady(true)} />
              </Suspense>
            </ClientOnly>
          ) : webgl === false ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.dish.id}
                  src={current.dish.image}
                  alt={current.dish.alt}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="aspect-square w-[min(70vw,520px)] rounded-full object-cover shadow-photo"
                />
              </AnimatePresence>
              <span className="eyebrow absolute bottom-24 text-[0.6rem] text-muted-foreground">Photo view — 3D not available on this device</span>
            </div>
          ) : null}
          <div className="bg-fade-bottom pointer-events-none absolute inset-0" aria-hidden />
          {!reduce && <Steam />}
        </div>

        {/* loader */}
        <AnimatePresence>
          {use3D && !ready && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-background"
              role="status"
            >
              <span className="h-14 w-14 animate-spin rounded-full border border-primary/25 border-t-primary" />
              <span className="eyebrow text-[0.65rem] text-muted-foreground">Preparing the table…</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* act copy */}
        <div className="container-luxe pointer-events-none relative z-20 flex h-full flex-col justify-between pb-10 pt-28 sm:pt-32">
          <div className="flex items-start justify-between gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={act}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="max-w-md"
              >
                <p className="eyebrow text-primary">Act {current.numeral} · {current.title}</p>
                <h2 className="display-lg mt-3">{current.dish.name}</h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/75 sm:text-base">{current.dish.description}</p>
                <p className="mt-3 font-display text-2xl text-primary">{formatPrice(current.dish.price)}</p>
              </motion.div>
            </AnimatePresence>
            <div className="hidden shrink-0 text-right sm:block" aria-live="polite">
              <span className="font-display text-5xl text-primary">0{act + 1}</span>
              <span className="font-display text-2xl text-muted-foreground"> / 0{ACT_COUNT}</span>
            </div>
          </div>

          {/* orbiting ingredient annotations */}
          <AnimatePresence mode="wait">
            <motion.ul
              key={`l${act}`}
              className="absolute right-[max(1.25rem,6vw)] top-1/2 hidden -translate-y-1/2 flex-col gap-6 md:flex"
              initial="h"
              animate="s"
              exit="h"
              variants={{ s: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } }, h: {} }}
            >
              {current.labels.map((l) => (
                <motion.li
                  key={l}
                  variants={{ h: { opacity: 0, x: 20 }, s: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } } }}
                  className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-foreground/80"
                >
                  <span className="h-px w-12 bg-primary/70" />
                  {l}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>

          <motion.div style={{ opacity: finale }} className="absolute inset-x-0 bottom-28 text-center">
            <p className="display-md mx-auto max-w-3xl px-6">
              Tradition, Served <span className="italic text-brass-gradient">With a Little More Soul.</span>
            </p>
          </motion.div>

          <div className="pointer-events-auto flex items-end justify-between gap-4">
            <div className="flex w-40 flex-col gap-2 sm:w-56">
              <span className="eyebrow text-[0.6rem] text-muted-foreground sm:hidden">0{act + 1} / 0{ACT_COUNT}</span>
              <div className="h-px w-full bg-foreground/15">
                <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-primary" />
              </div>
              <motion.span style={{ opacity: cueOpacity }} className="eyebrow flex items-center gap-2 text-[0.6rem] text-muted-foreground">
                <ArrowDown className="h-3 w-3 animate-bounce" /> Scroll to turn the dish
              </motion.span>
            </div>
            <button
              type="button"
              onClick={() => scrollToId("story")}
              className="eyebrow mr-14 flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[0.65rem] text-foreground/80 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Skip<span className="hidden sm:inline"> to the restaurant</span> <SkipForward className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
