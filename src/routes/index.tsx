import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { SiteHeader } from "@/components/site/SiteHeader";
import { IntroCurtain } from "@/components/site/Hero";
import { ActsStage } from "@/components/site/three-acts/ActsStage";
import { Story } from "@/components/site/Story";
import { SignatureMenu } from "@/components/site/SignatureMenu";
import { Experience } from "@/components/site/Experience";
import { Gallery } from "@/components/site/Gallery";
import { Visit } from "@/components/site/Visit";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BackToTop } from "@/components/site/BackToTop";
import { CursorRing, Marquee } from "@/components/site/motion";

const TITLE = "Mavalli Heritage — South Indian Dining (Concept Demo)";
const DESCRIPTION =
  "Crispy ghee roast dosas, Madras filter coffee and banana-leaf meals. A design concept for a fictional South Indian restaurant, est. 1985.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <IntroCurtain />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-14 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <ActsStage />
        <Story />
        <Marquee className="bg-background" items={["Ghee Roast Dosa", "Madras Filter Coffee", "Banana-Leaf Meals", "Est. 1985"]} />
        <SignatureMenu />
        <Experience />
        <Gallery />
        <Marquee
          direction={-1}
          className="theme-charcoal bg-background"
          items={["Hand-ground spices", "Slow-fermented batter", "Served warmly", "Open every day"]}
        />
        <Visit />
      </main>
      <SiteFooter />
      <BackToTop />
      <CursorRing />
    </MotionConfig>
  );
}
