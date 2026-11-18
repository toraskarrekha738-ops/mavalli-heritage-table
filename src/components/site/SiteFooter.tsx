import { toast } from "sonner";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/site-data";
import { Ornament, Wordmark } from "./brand";
import { EASE, scrollToId } from "./motion";

const SOCIALS = [
  {
    name: "Instagram",
    path: "M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.8a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm4.9-8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.7 0 3 0 4.1.1 2.8.1 4.1 1.5 4.2 4.2.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.7-1.4 4.1-4.2 4.2-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.8-.1-4.1-1.5-4.2-4.2C3.6 15 3.6 14.7 3.6 12s0-3 .1-4.1C3.8 5.2 5.1 3.8 7.9 3.7 9 3.6 9.3 3.6 12 3.6ZM12 2c-2.7 0-3.1 0-4.1.1C4.2 2.2 2.2 4.2 2.1 7.9 2 8.9 2 9.3 2 12s0 3.1.1 4.1c.1 3.7 2.1 5.7 5.8 5.8 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c3.7-.1 5.7-2.1 5.8-5.8.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c-.1-3.7-2.1-5.7-5.8-5.8C15.1 2 14.7 2 12 2Z",
  },
  {
    name: "Facebook",
    path: "M13.5 21.9v-7.7h2.6l.4-3h-3V9.3c0-.9.3-1.5 1.5-1.5h1.6V5.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6v7.7h3.1Z",
  },
  {
    name: "X",
    path: "M17.8 3h3L14.2 10.6 22 21h-6l-4.7-6.2L5.9 21H2.8l7-8.1L2.4 3h6.1l4.3 5.7L17.8 3Zm-1 16.2h1.7L7.3 4.7H5.5l11.3 14.5Z",
  },
];

export function SiteFooter() {
  return (
    <footer className="theme-charcoal relative overflow-hidden border-t border-border pt-24 pb-10">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 [mask-image:linear-gradient(to_top,black,transparent)]" aria-hidden>
        <div className="jali h-full w-full opacity-[0.05]" />
      </div>
      <div className="container-luxe relative">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark />
            <p className="mt-8 max-w-sm font-display text-3xl font-light leading-snug">
              Southern roots, <span className="italic text-primary">made slowly</span> and served warmly.
            </p>
          </div>
          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="eyebrow text-[0.6rem] text-muted-foreground">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(l.id);
                    }}
                    className="link-underline text-foreground/80 hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <p className="eyebrow text-[0.6rem] text-muted-foreground">Follow (demo placeholders)</p>
            <ul className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href="#"
                    aria-label={`${s.name} — demo placeholder, no real profile`}
                    onClick={(e) => {
                      e.preventDefault();
                      toast(`${s.name} is a demo placeholder`, {
                        description: "Mavalli Heritage is fictional, so there's no real profile to visit.",
                      });
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground/80 transition-all duration-500 hover:-translate-y-1 hover:rotate-[8deg] hover:border-primary hover:bg-primary/10 hover:text-primary"
                  >
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-xs text-xs leading-relaxed text-muted-foreground">
              This website is a design concept. The restaurant, address, phone number, email and social
              profiles are fictional.
            </p>
          </div>
        </div>

        <Ornament className="mt-20 justify-center" />
        <p aria-hidden className="mt-10 flex select-none justify-center overflow-hidden font-display text-[clamp(3.5rem,13vw,12rem)] font-light leading-none tracking-[0.08em] text-foreground/[0.08]">
          {"MAVALLI".split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block transition-colors duration-500 hover:text-primary/40"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.07 }}
            >
              {ch}
            </motion.span>
          ))}
        </p>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Mavalli Heritage. Concept demo.</p>
          <p className="sm:pr-20">Monday – Sunday · 7:00 AM – 10:30 PM</p>
        </div>
      </div>
    </footer>
  );
}
