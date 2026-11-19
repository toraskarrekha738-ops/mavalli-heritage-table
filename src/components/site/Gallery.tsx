import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { GALLERY } from "@/lib/site-data";
import { SectionEyebrow } from "./brand";
import { EASE, Reveal, SplitReveal, Tilt } from "./motion";
import { KolamDivider } from "./Kolam";

function Lightbox({ index, onClose, onIndex }: { index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const open = index !== null;
  const item = open ? GALLERY[index] : null;
  const step = useCallback(
    (dir: number) => {
      if (index === null) return;
      onIndex((index + dir + GALLERY.length) % GALLERY.length);
    },
    [index, onIndex],
  );

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-overlay backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center p-4 outline-none sm:p-10"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
        >
          <DialogPrimitive.Title className="sr-only">Gallery image viewer</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Use the left and right arrow keys to move between photos. Press Escape to close.
          </DialogPrimitive.Description>
          {item && (
            <figure className="relative flex max-h-full w-full max-w-5xl flex-col items-center">
              <div className="relative flex w-full items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={item.src}
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="max-h-[74svh] w-auto rounded-md object-contain shadow-lift"
                  />
                </AnimatePresence>
              </div>
              <figcaption className="mt-5 flex w-full max-w-3xl items-center justify-between gap-4 text-foreground">
                <span className="font-display text-xl italic sm:text-2xl">{item.caption}</span>
                <span className="eyebrow shrink-0 text-[0.62rem] text-primary">
                  {String(index! + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          )}
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className="glass absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors hover:text-primary sm:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className="glass absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors hover:text-primary sm:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <DialogPrimitive.Close
            aria-label="Close gallery"
            className="glass absolute right-4 top-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors hover:text-primary sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="theme-paper paper-texture edge-arches py-28 sm:py-36 [--edge-from:var(--charcoal)] [--edge-to:var(--charcoal)]">
      <KolamDivider className="mb-16 sm:mb-24" />
      <div className="container-luxe">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionEyebrow index="iv." label="Gallery" />
            </Reveal>
            <h2 id="gallery-title" className="display-lg mt-8">
              <SplitReveal text="Moments from the kitchen & the table." italicWords={["table."]} />
            </h2>
          </div>
          <Reveal delay={0.15} className="lg:col-span-4">
            <p className="text-muted-foreground">Select any photograph to view it larger.</p>
          </Reveal>
        </div>

        <ul className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
          {GALLERY.map((g, i) => (
            <motion.li
              key={g.src}
              initial={{ opacity: 0, y: 50, clipPath: "inset(18% 8% 18% 8%)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 1.1, ease: EASE, delay: (i % 3) * 0.12 }}
              className="group break-inside-avoid"
            >
              <figure>
                <Tilt max={4} className="rounded-md">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`View larger: ${g.caption}`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-md shadow-photo"
                  style={{ aspectRatio: `${g.width} / ${g.height}` }}
                >
                  <img
                    src={g.src}
                    alt={g.alt}
                    width={g.width}
                    height={g.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-110"
                  />
                  <span className="shine-sweep" aria-hidden />
                  <span className="bg-card-image absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
                  <span className="glass absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-ivory opacity-0 transition-all duration-500 group-hover:rotate-90 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden>
                    <Expand className="h-4 w-4" />
                  </span>
                </button>
                </Tilt>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="font-display text-lg italic transition-[color,transform] duration-500 group-hover:translate-x-1 group-hover:text-primary">{g.caption}</span>
                  <span className="eyebrow text-[0.58rem] text-primary">{String(i + 1).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
      <Lightbox index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  );
}
