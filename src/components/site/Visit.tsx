import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/lib/site-data";
import { SectionEyebrow } from "./brand";
import { motion } from "framer-motion";
import { EASE, Reveal, SplitReveal } from "./motion";
import { ReservationForm } from "./ReservationForm";
import { KolamDivider } from "./Kolam";

/** Decorative, illustrative street motif — intentionally not a real map. */
function MapMotif() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-card">
      <div className="jali absolute inset-0 opacity-[0.07]" aria-hidden />
      <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full text-primary" aria-hidden fill="none" stroke="currentColor">
        <motion.path
          d="M-10 170 C 80 150, 140 190, 230 160 S 360 120, 420 140"
          strokeWidth="10"
          opacity="0.08"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: EASE }}
        />
        <path className="animate-route" d="M-10 170 C 80 150, 140 190, 230 160 S 360 120, 420 140" strokeWidth="1" opacity="0.5" strokeDasharray="4 6" />
        {[
          { d: "M60 -10 L 120 260", w: 0.8, o: 0.35 },
          { d: "M250 -10 L 210 260", w: 0.8, o: 0.35 },
          { d: "M-10 70 L 410 95", w: 0.8, o: 0.35 },
          { d: "M320 -10 L 360 260", w: 0.5, o: 0.25 },
        ].map((r, i) => (
          <motion.path
            key={r.d}
            d={r.d}
            strokeWidth={r.w}
            opacity={r.o}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.3 + i * 0.2 }}
          />
        ))}
        <rect x="150" y="98" width="46" height="30" strokeWidth="0.8" opacity="0.5" />
        <circle cx="230" cy="112" r="34" strokeWidth="0.6" opacity="0.35" />
        <circle cx="230" cy="112" r="56" strokeWidth="0.4" opacity="0.2" />
      </svg>
      <div className="absolute left-[57.5%] top-[44.8%] -translate-x-1/2 -translate-y-1/2">
        <span className="animate-pulse-ring absolute inset-0 rounded-full bg-primary/40" aria-hidden />
        <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-primary/20" />
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <span className="font-display text-lg italic text-foreground/90">Spice Garden Road</span>
        <span className="eyebrow text-[0.55rem] text-muted-foreground">Illustration · not a real map</span>
      </div>
    </div>
  );
}

export function Visit() {
  const details = [
    { icon: MapPin, label: "Address", value: CONTACT.address, note: CONTACT.addressNote },
    { icon: Phone, label: "Phone", value: CONTACT.phone, note: CONTACT.phoneNote, href: CONTACT.phoneHref },
    { icon: Mail, label: "Email", value: CONTACT.email, note: CONTACT.emailNote, href: CONTACT.emailHref },
    { icon: Clock, label: "Hours", value: CONTACT.hours },
  ];
  return (
    <section id="visit" aria-labelledby="visit-title" className="relative overflow-hidden py-28 sm:py-36">
      <KolamDivider className="mb-16 sm:mb-24" />
      <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionEyebrow index="v." label="Visit Us" />
          </Reveal>
          <h2 id="visit-title" className="display-lg mt-8">
            <SplitReveal text="Pull up a chair. The tawa is hot." italicWords={["tawa"]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-1.5 text-xs text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Concept demo — all contact details below are fictional
            </p>
          </Reveal>

          <address className="mt-10 grid gap-7 not-italic">
              {details.map(({ icon: Icon, label, value, note, href }, i) => (
                <motion.div
                  key={label}
                  className="group flex gap-5 border-t border-border pt-6"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
                >
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:-rotate-12 group-hover:scale-125" aria-hidden />
                  <div>
                    <p className="eyebrow text-[0.6rem] text-muted-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="link-underline mt-1.5 inline-block font-display text-2xl hover:text-primary">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1.5 font-display text-2xl leading-snug">{value}</p>
                    )}
                    {note && <p className="mt-1 text-xs italic text-muted-foreground">({note})</p>}
                  </div>
                </motion.div>
              ))}
          </address>

          <Reveal delay={0.2} className="mt-10">
            <MapMotif />
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div id="reserve" data-anchor className="relative rounded-lg border border-border bg-card p-7 shadow-card sm:p-12">
              <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" aria-hidden>
                <div className="jali h-full w-full opacity-[0.1]" />
              </div>
              <p className="eyebrow text-primary">Reservations</p>
              <h3 className="display-md mt-4">Reserve a table</h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                Tell us when you'd like to join us. We're open {CONTACT.hours.replace("Monday – Sunday, ", "every day, ")}.
              </p>
              <div className="mt-10">
                <ReservationForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
