import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero, IntroCurtain } from "@/components/site/Hero";
import { Story } from "@/components/site/Story";
import { SignatureMenu } from "@/components/site/SignatureMenu";
import { Experience } from "@/components/site/Experience";
import { Gallery } from "@/components/site/Gallery";
import { Visit } from "@/components/site/Visit";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BackToTop } from "@/components/site/BackToTop";

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
        <Hero />
        <Story />
        <SignatureMenu />
        <Experience />
        <Gallery />
        <Visit />
      </main>
      <SiteFooter />
      <BackToTop />
    </MotionConfig>
  );
}
