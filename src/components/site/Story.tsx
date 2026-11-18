import { useRef } from "react";
import { motion } from "framer-motion";
import { IMAGES, ESTABLISHED } from "@/lib/site-data";
import { SectionEyebrow, Steam } from "./brand";
import { Counter } from "./Counter";
import { EASE, MaskImage, Reveal, SplitReveal, useParallax } from "./motion";

const PILLARS = [
  { title: "Hand-ground", text: "Every spice, ground by hand." },
  { title: "Slow-fermented", text: "Every batter, fermented to perfection." },
  { title: "Served warmly", text: "Every meal, served with warmth." },
];

export function Story() {
  const years = 2026 - ESTABLISHED;
  const collageRef = useRef<HTMLDivElement>(null);
  const riseFast = useParallax(collageRef, -50);
  const riseSlow = useParallax(collageRef, 30);
  return (
    <section id="story" aria-labelledby="story-title" className="theme-paper paper-texture relative overflow-hidden py-28 sm:py-36">
      <div className="jali animate-spin-slower pointer-events-none absolute -right-20 top-0 h-[420px] w-[420px] rounded-full opacity-[0.07]" aria-hidden />
      <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pt-10">
          <Reveal>
            <SectionEyebrow index="i." label="Our Story" />
          </Reveal>
          <h2 id="story-title" className="display-lg mt-8">
            <SplitReveal text="A tradition that never stood still." italicWords={["never"]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              For over three decades, Mavalli Heritage has brought the true essence of South India to your
              table. Every spice is hand-ground, every batter is fermented to perfection, and every meal is
              served with warmth.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {PILLARS.map((p, i) => (
              <motion.li
                key={p.title}
                className="group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.12 }}
              >
                <p className="font-display text-sm italic text-primary transition-transform duration-500 group-hover:translate-x-1">
                  0{i + 1}
                </p>
                <p className="mt-1 font-display text-2xl">{p.title}</p>
                <span className="mt-2 block h-px w-8 origin-left bg-primary/60 transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-x-[3]" aria-hidden />
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </motion.li>
            ))}
          </ul>

          <Reveal delay={0.3}>
            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8">
              <div>
                <dt className="eyebrow text-[0.6rem] text-muted-foreground">Established</dt>
                <dd className="mt-2 font-display text-4xl text-primary sm:text-5xl">
                  <Counter from={1900} to={ESTABLISHED} />
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-[0.6rem] text-muted-foreground">Years of tradition</dt>
                <dd className="mt-2 font-display text-4xl text-primary sm:text-5xl">
                  <Counter to={years} />
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-[0.6rem] text-muted-foreground">Days a week</dt>
                <dd className="mt-2 font-display text-4xl text-primary sm:text-5xl">
                  <Counter to={7} duration={1.2} />
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Collage */}
        <div ref={collageRef} className="relative lg:col-span-7">
          <div className="relative mx-auto grid max-w-2xl grid-cols-12 grid-rows-[auto_auto] gap-4 sm:gap-5">
            <motion.div style={{ y: riseSlow }} className="col-span-7 row-span-2">
            <MaskImage
              src={IMAGES.dosaTawa}
              alt="A cook spreading dosa batter in a spiral on a hot iron tawa"
              width={1024}
              height={1536}
              parallax={30}
              className="shadow-photo aspect-[3/4.4] rounded-t-full"
            />
            </motion.div>
            <motion.div style={{ y: riseFast }} className="relative col-span-5 self-end">
              <MaskImage
                src={IMAGES.filterCoffee}
                alt="Brass coffee filter beside a frothy filter coffee in a tumbler and davarah"
                width={1024}
                height={1024}
                delay={0.15}
                className="shadow-photo aspect-square"
              />
              <Steam className="left-[44%] top-[-14%] h-[48%] w-[36%] opacity-70" />
            </motion.div>
            <motion.div style={{ y: riseFast }} className="col-span-5 self-start">
            <MaskImage
              src={IMAGES.thali}
              alt="A traditional meal laid out on a banana leaf"
              width={1536}
              height={1024}
              delay={0.3}
              className="shadow-photo aspect-[4/5]"
              imgClassName="object-[30%_center]"
            />
            </motion.div>
          </div>

          <Reveal delay={0.4} className="pointer-events-none absolute -bottom-10 -left-2 sm:-left-8 lg:-left-16">
            <div className="animate-bob flex items-center gap-4 bg-background px-5 py-4 shadow-photo">
              <span className="eyebrow text-[0.6rem] text-muted-foreground [writing-mode:vertical-rl] rotate-180">
                Since
              </span>
              <span className="display-lg text-brass-gradient">1985</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
