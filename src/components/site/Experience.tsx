import { useRef } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/site-data";
import { SectionEyebrow } from "./brand";
import { EASE, Reveal, SplitReveal, useParallax } from "./motion";
import { KolamDivider } from "./Kolam";

const FEATURES = [
  {
    id: "dosa",
    numeral: "I",
    title: "The art of the perfect dosa",
    text: "Batter fermented to perfection, spread in a thin spiral on a seasoned iron tawa and finished with ghee until it crackles.",
    image: IMAGES.dosaTawa,
    alt: "Dosa batter spread in a spiral on a wood-fired iron tawa, edges turning golden",
  },
  {
    id: "coffee",
    numeral: "II",
    title: "Slow-brewed filter coffee",
    text: "A dark decoction drips slowly through a brass filter, meets hot milk, and is poured from a height for its froth.",
    image: IMAGES.coffeePour,
    alt: "Filter coffee poured in a long stream from a brass tumbler into a davarah",
  },
  {
    id: "leaf",
    numeral: "III",
    title: "A meal on a banana leaf",
    text: "Rice, sambar, rasam, kootu, poriyal, papad and payasam — laid out the traditional way, on a fresh green leaf.",
    image: IMAGES.thali,
    alt: "A full South Indian meal arranged on a banana leaf",
  },
];

function FeaturePanel({ f, i }: { f: (typeof FEATURES)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useParallax(ref, 40);
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay: i * 0.12 }}
      tabIndex={0}
      aria-labelledby={`feature-${f.id}`}
      className="group relative isolate flex min-h-[30rem] overflow-hidden rounded-lg border border-border transition-[flex-grow,border-color] duration-[900ms] hover:border-primary/60 ease-[var(--ease-luxe)] lg:min-h-[38rem] lg:flex-1 lg:hover:flex-[1.6] lg:focus-visible:flex-[1.6]"
    >
      <motion.img
        src={f.image}
        alt={f.alt}
        loading="lazy"
        decoding="async"
        width={1024}
        height={1536}
        style={{ y, scale: 1.18 }}
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-[filter] duration-700 group-hover:brightness-110"
      />
      <div className="bg-card-image absolute inset-0 -z-10" aria-hidden />
      <div className="mt-auto w-full p-7 sm:p-9">
        <motion.p
          className="font-display text-5xl font-light italic text-primary"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 + i * 0.12 }}
        >
          {f.numeral}
        </motion.p>
        <h3 id={`feature-${f.id}`} className="display-md mt-3 max-w-xs">
          {f.title}
        </h3>
        <span
          aria-hidden
          className="mt-4 block h-px w-12 origin-left bg-primary transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-x-[4] group-focus-visible:scale-x-[4]"
        />
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/80 lg:max-h-0 lg:opacity-0 lg:transition-all lg:duration-700 lg:group-hover:max-h-40 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-40 lg:group-focus-visible:opacity-100">
          {f.text}
        </p>
      </div>
    </motion.article>
  );
}

export function Experience() {
  return (
    <section aria-labelledby="experience-title" className="theme-charcoal relative py-28 sm:py-36">
      <KolamDivider className="mb-16 sm:mb-24" />
      <div className="container-luxe">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionEyebrow index="iii." label="The Experience" />
            </Reveal>
            <h2 id="experience-title" className="display-lg mt-8 max-w-3xl">
              <SplitReveal text="Three rituals, kept the slow way." italicWords={["slow"]} />
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-muted-foreground">
              Some things are not meant to be rushed. Hover or focus a panel to read more.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 flex flex-col gap-5 lg:flex-row">
          {FEATURES.map((f, i) => (
            <FeaturePanel key={f.id} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
