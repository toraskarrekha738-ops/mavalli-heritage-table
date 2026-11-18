import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, BookOpen, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MENU_CATEGORIES, SIGNATURE_DISHES, formatPrice, type Dish } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Ornament, SectionEyebrow } from "./brand";
import { EASE, Reveal, SplitReveal, Tilt, scrollToId } from "./motion";

function DishCard({ dish, index }: { dish: Dish; index: number }) {
  const category = MENU_CATEGORIES.find((c) => c.id === dish.category)?.label;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 60, scale: 0.94, rotate: index % 2 ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      exit={{ opacity: 0, y: -16, scale: 0.96, transition: { duration: 0.3 } }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <Tilt className="h-full rounded-lg">
      <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-[transform,box-shadow,border-color] duration-700 ease-[var(--ease-luxe)] group-hover:-translate-y-2 group-hover:border-primary/50 group-hover:shadow-lift group-focus-within:-translate-y-2 group-focus-within:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={dish.image}
          alt={dish.alt}
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-[1.08]"
        />
        <div className="bg-card-image absolute inset-0" aria-hidden />
        <span className="shine-sweep" aria-hidden />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
          <span className="font-display text-2xl italic text-primary transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:-translate-y-1 group-hover:scale-110">0{SIGNATURE_DISHES.indexOf(dish) + 1}</span>
          <span className="eyebrow glass rounded-full px-3 py-1.5 text-[0.58rem] text-foreground">{category}</span>
        </div>
        {dish.marker && (
          <span className="absolute bottom-4 left-5 inline-flex items-center gap-2 text-xs font-medium text-foreground/90">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {dish.marker}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-[1.7rem] leading-tight">{dish.name}</h3>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{dish.description}</p>
        <div className="mt-6 flex items-center gap-3">
          <span className="h-px flex-1 origin-left border-t border-dashed border-border transition-[border-color] duration-700 group-hover:border-primary/60" aria-hidden />
          <span className="font-display text-2xl text-primary transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:scale-110">{formatPrice(dish.price)}</span>
        </div>
      </div>
      </div>
      </Tilt>
    </motion.article>
  );
}

function FullMenuDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const groups = MENU_CATEGORIES.filter((c) => c.id !== "all").map((c) => ({
    ...c,
    dishes: SIGNATURE_DISHES.filter((d) => d.category === c.id),
  }));
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="theme-paper paper-texture max-h-[90svh] max-w-2xl overflow-y-auto rounded-lg border-border p-0 sm:rounded-lg">
        <div className="border-b border-border px-8 pb-8 pt-10 text-center sm:px-14">
          <DialogHeader className="items-center text-center sm:text-center">
            <p className="eyebrow text-primary">Mavalli Heritage</p>
            <DialogTitle className="font-display text-5xl font-light">The Menu</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Signature dishes · prices in USD
            </DialogDescription>
          </DialogHeader>
          <Ornament className="mt-5 justify-center" />
        </div>
        <div className="space-y-10 px-8 py-10 sm:px-14">
          {groups.map((g) => (
            <section key={g.id} aria-labelledby={`menu-${g.id}`}>
              <h3 id={`menu-${g.id}`} className="eyebrow text-center text-primary">
                {g.label}
              </h3>
              <ul className="mt-5 space-y-6">
                {g.dishes.map((d) => (
                  <li key={d.id}>
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-2xl">{d.name}</span>
                      <span className="h-px flex-1 translate-y-[-4px] border-t border-dotted border-foreground/30" aria-hidden />
                      <span className="font-display text-2xl text-primary">{formatPrice(d.price)}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="border-t border-border px-8 py-6 text-center text-xs text-muted-foreground sm:px-14">
          Concept preview — this demo lists signature dishes only. A full menu would be added for a real
          restaurant.
        </p>
      </DialogContent>
    </Dialog>
  );
}

function OrderDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg border-border bg-popover p-8 sm:rounded-lg">
        <DialogHeader>
          <p className="eyebrow text-primary">Demo feature</p>
          <DialogTitle className="font-display text-4xl font-light">Online ordering coming soon</DialogTitle>
          <DialogDescription className="pt-2 text-base leading-relaxed">
            This is a concept preview. No orders are taken, no payments are processed and no delivery
            service is connected.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            variant="brass"
            size="pill"
            onClick={() => {
              onOpenChange(false);
              window.setTimeout(() => scrollToId("reserve"), 250);
            }}
          >
            Reserve a table instead
          </Button>
          <Button variant="quiet" size="pill" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SignatureMenu() {
  const [category, setCategory] = useState<(typeof MENU_CATEGORIES)[number]["id"]>("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const dishes = SIGNATURE_DISHES.filter((d) => category === "all" || d.category === category);

  return (
    <section id="menu" aria-labelledby="menu-title" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden>
        <div className="jali h-full w-[120%] animate-[jali-drift_40s_linear_infinite] opacity-[0.06]" />
      </div>
      <div className="container-luxe relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionEyebrow index="ii." label="Signature Menu" />
            </Reveal>
            <h2 id="menu-title" className="display-lg mt-8">
              <SplitReveal text="The dishes you come back for." italicWords={["back"]} />
            </h2>
          </div>
          <Reveal delay={0.15} className="lg:col-span-5 lg:justify-self-end">
            <div className="flex flex-wrap gap-3">
              <Button variant="line" size="pill" onClick={() => setMenuOpen(true)}>
                <BookOpen /> View full menu
              </Button>
              <Button variant="quiet" size="pill" onClick={() => setOrderOpen(true)}>
                <ShoppingBag /> Order Online <span className="text-primary">(demo)</span>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <LayoutGroup id="menu-filter">
            <div role="group" aria-label="Filter dishes by category" className="-mx-5 flex gap-2 overflow-x-auto border-b border-border px-5 pb-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              {MENU_CATEGORIES.map((c) => {
                const isActive = category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      "relative shrink-0 cursor-pointer rounded-full px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-500",
                      isActive ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="menu-pill"
                        className="absolute inset-0 -z-0 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      />
                    )}
                    <span className="relative">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {dishes.map((d, i) => (
              <DishCard key={d.id} dish={d} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="link-underline group inline-flex cursor-pointer items-center gap-2 font-display text-2xl italic text-primary"
          >
            See every dish & price
            <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>

      <FullMenuDialog open={menuOpen} onOpenChange={setMenuOpen} />
      <OrderDialog open={orderOpen} onOpenChange={setOrderOpen} />
    </section>
  );
}
