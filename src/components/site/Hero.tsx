import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/site-data";
import { EASE, Magnetic, SplitReveal, scrollToId } from "./motion";
import { Wordmark } from "./brand";

const INTRO_DELAY = 1.25;

export function IntroCurtain() {
  return (
    <div
      aria-hidden
      className="intro-curtain theme-charcoal pointer-events-none fixed inset-0 z-[70] flex items-center justify-center"
    >
      <div className="jali absolute inset-0 opacity-[0.05]" />
      <div className="intro-mark relative flex flex-col items-center gap-4">
        <Wordmark className="scale-150" />
        <span className="eyebrow mt-6 text-[0.6rem] text-muted-foreground">Est. 1985</span>
      </div>
    </div>
  );
}

function Stamp() {
  return (
    <div className="animate-float relative h-32 w-32 sm:h-40 sm:w-40" aria-hidden>
      <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0 h-full w-full text-primary">
        <defs>
          <path id="stamp-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <text fill="currentColor" fontSize="15" letterSpacing="5.2" fontFamily="Manrope, sans-serif" fontWeight="600">
          <textPath href="#stamp-circle">MADE SLOWLY · SERVED WARMLY · MADE SLOWLY · SERVED WARMLY ·</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-3xl italic text-primary sm:text-4xl">M</span>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, reduce ? 1.06 : 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Welcome"
      className="theme-charcoal grain relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y: imgY, scale: imgScale }}>
        <motion.img
          src={IMAGES.heroDosa}
          alt="A crisp golden ghee roast dosa on a brass plate with coconut chutney and sambar"
          width={1536}
          height={1024}
          fetchPriority="high"
          decoding="async"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, ease: EASE, delay: 0.9 }}
          className="h-full w-full object-cover object-[68%_center]"
        />
      </motion.div>
      <div className="bg-hero-overlay absolute inset-0 -z-10" aria-hidden />
      <div className="bg-fade-bottom absolute inset-0 -z-10" aria-hidden />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-luxe relative w-full pb-20 pt-44 sm:pb-28 lg:pb-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: INTRO_DELAY }}
          className="eyebrow flex items-center gap-4 text-primary"
        >
          <span className="h-px w-10 bg-current" />A Taste of Southern Roots · Est. 1985
        </motion.p>

        <h1 className="display-xl mt-7 max-w-5xl">
          <SplitReveal text="Tradition, Served" animateOnMount delay={INTRO_DELAY + 0.1} />
          <SplitReveal
            text="With a Little More Soul."
            animateOnMount
            delay={INTRO_DELAY + 0.3}
            italicWords={["Soul."]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: INTRO_DELAY + 0.75 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg"
        >
          From the first crackle of a dosa to the last sip of filter coffee, discover the flavours that feel
          like home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: INTRO_DELAY + 0.95 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Button variant="brass" size="xl" asChild>
              <a
                href="#menu"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("menu");
                }}
              >
                Explore the Menu <ArrowDownRight />
              </a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button variant="line" size="xl" asChild>
              <a
                href="#reserve"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("reserve");
                }}
              >
                Find Your Table
              </a>
            </Button>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: INTRO_DELAY + 1.1 }}
        className="absolute right-[6%] top-[22%] hidden md:block lg:top-[26%]"
      >
        <Stamp />
        <span className="sr-only">Made slowly. Served warmly.</span>
      </motion.div>

      <motion.a
        href="#story"
        onClick={(e) => {
          e.preventDefault();
          scrollToId("story");
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: INTRO_DELAY + 1.3 }}
        className="absolute bottom-8 right-[max(1.25rem,4vw)] hidden flex-col items-center gap-3 text-foreground/70 hover:text-primary sm:flex"
        aria-label="Scroll to our story"
      >
        <span className="eyebrow text-[0.6rem] [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-16 w-px overflow-hidden bg-foreground/20">
          <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/3 bg-primary" />
        </span>
      </motion.a>
    </section>
  );
}
