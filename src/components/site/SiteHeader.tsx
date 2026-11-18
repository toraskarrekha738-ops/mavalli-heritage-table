import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, CONTACT } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Wordmark } from "./brand";
import { EASE, Magnetic, scrollToId } from "./motion";

function useActiveSection() {
  const [active, setActive] = useState<string>("home");
  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  const goFromSheet = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // let the sheet release scroll-lock before scrolling
    window.setTimeout(() => scrollToId(id), 320);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-primary text-primary-foreground">
        <p className="container-luxe py-1.5 text-center text-[0.68rem] font-semibold tracking-[0.14em] uppercase">
          Concept demo<span className="hidden sm:inline"> · Mavalli Heritage is a fictional restaurant</span>
          <span className="sm:hidden"> · fictional restaurant</span>
        </p>
      </div>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.5 }}
        className={cn(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled ? "glass border-border" : "border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Primary" className="container-luxe flex h-[4.5rem] items-center justify-between gap-6">
          <a href="#home" onClick={go("home")} className="rounded-sm" aria-label="Mavalli Heritage — back to top">
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  data-active={active === l.id}
                  aria-current={active === l.id ? "true" : undefined}
                  className={cn(
                    "link-underline text-[0.78rem] font-medium tracking-[0.14em] uppercase",
                    active === l.id ? "text-primary" : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:inline-block">
              <Button variant="brass" size="pill" asChild>
                <a href="#reserve" onClick={go("reserve")}>
                  Reserve a Table
                </a>
              </Button>
            </Magnetic>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="line" size="icon" className="h-11 w-11 lg:hidden" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="theme-charcoal flex w-full flex-col border-l border-border p-0 sm:max-w-md">
                <div className="jali pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
                <div className="relative flex h-full flex-col px-8 pb-10 pt-8">
                  <SheetTitle className="sr-only">Site navigation</SheetTitle>
                  <SheetDescription className="sr-only">Jump to a section of the page</SheetDescription>
                  <Wordmark />
                  <ul className="mt-14 flex flex-col gap-2">
                    {NAV_LINKS.map((l, i) => (
                      <motion.li
                        key={l.id}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.06, duration: 0.7, ease: EASE }}
                      >
                        <a
                          href={`#${l.id}`}
                          onClick={goFromSheet(l.id)}
                          className={cn(
                            "group flex items-baseline gap-4 py-2 font-display text-4xl font-light",
                            active === l.id ? "text-primary" : "text-foreground",
                          )}
                        >
                          <span className="eyebrow text-[0.6rem] text-primary/70">0{i + 1}</span>
                          <span className="link-underline">{l.label}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-auto space-y-6">
                    <Button variant="brass" size="xl" className="w-full" asChild>
                      <a href="#reserve" onClick={goFromSheet("reserve")}>
                        Reserve a Table
                      </a>
                    </Button>
                    <p className="text-sm text-muted-foreground">{CONTACT.hours}</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.div>
    </header>
  );
}
