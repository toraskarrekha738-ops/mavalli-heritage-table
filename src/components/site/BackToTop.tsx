import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { EASE, scrollToId } from "./motion";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => scrollToId("home")}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="glass group fixed bottom-5 right-5 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full text-primary shadow-card sm:bottom-8 sm:right-8"
        >
          <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
            <circle cx="28" cy="28" r="26" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
            <motion.circle cx="28" cy="28" r="26" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ pathLength: progress }} />
          </svg>
          <ArrowUp className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
