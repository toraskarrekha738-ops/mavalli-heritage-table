# Mavalli Heritage Table

Build a highly creative, premium, fully responsive restaurant website for a fictional demo brand called “Mavalli Heritage”, an authentic South Indian dining spot known for crispy ghee roast dosas, filter coffee, and traditional banana-leaf meals.

DESIGN DIRECTION:
Create a memorable editorial restaurant experience, not a generic template. Visual concept: “heritage meets modern culinary luxury” — deep espresso/charcoal backgrounds, warm brass/gold, turmeric saffron, banana-leaf green, ivory paper textures, subtle South Indian architectural motifs (jali/temple-inspired geometry used tastefully), elegant serif display typography paired with clean sans-serif. Use rich, appetizing food photography. Spacious layouts, strong art direction, asymmetry, layered image compositions, fine borders, beautiful typography and deliberate whitespace. The site should feel like a premium restaurant brand / design-award landing page.

MOTION / INTERACTION:
Use polished purposeful motion throughout: smooth page-load intro, staggered hero text reveal, slow parallax food imagery, subtle floating steam animation above coffee, scroll-triggered reveal for sections, gentle image masks, hover lift/zoom on menu cards, animated underline navigation, magnetic-feeling CTA hover, elegant menu category transitions, gallery lightbox, animated counters if appropriate, and a tasteful back-to-top interaction. Motion must be smooth and restrained, not distracting. Respect prefers-reduced-motion and keep performance/mobile smooth. Use Framer Motion if available or CSS/IntersectionObserver. Avoid excessive bouncing, generic gradients, or huge cursor effects.

STRUCTURE:
1. Sticky translucent/glass navigation with custom typographic logo “MAVALLI / HERITAGE”, tiny animated coffee-steam emblem, links Home, Our Story, Menu, Gallery, Visit Us, and prominent “Reserve a Table” CTA. Mobile navigation must work.
2. HERO: immersive full-bleed cinematic image of a crisp golden ghee roast dosa with ghee, warm moody overlay, subtle grain. Eyebrow “A TASTE OF SOUTHERN ROOTS · EST. 1985”. Main heading: “Tradition, Served / With a Little More Soul.” Supporting copy: “From the first crackle of a dosa to the last sip of filter coffee, discover the flavours that feel like home.” CTAs “Explore the Menu” and “Find Your Table”. Add a small vertical scroll cue and tasteful floating stamp “Made slowly. Served warmly.”
3. STORY: editorial two-column story section. Heading “A tradition that never stood still.” Copy: “For over three decades, Mavalli Heritage has brought the true essence of South India to your table. Every spice is hand-ground, every batter is fermented to perfection, and every meal is served with warmth.” Add photo collage (dosa, brass coffee filter/davarah, banana leaf meal), decorative year marker “SINCE 1985”, scroll reveals.
4. SIGNATURE MENU: strong section intro “The dishes you come back for.” Four beautiful interactive cards with food imagery, descriptions and prices exactly as supplied:
- Benne Masala Dosa — “Butter-dripping, crispy golden dosa stuffed with spiced potato mash.” — $9.50
- Chettinad Chicken Biryani — “Fragrant seeraga samba rice cooked with tender chicken and aromatic spices.” — $14.00
- Traditional Thali Meal — “Rice, sambar, rasam, kootu, poriyal, papad, payasam on a banana leaf.” — $16.50
- Madras Filter Coffee — “Strong, frothy, authentic South Indian decoction coffee served in a brass davarah.” — $4.50
Use responsive grid, beautiful crop photography, hover motion, category/vegetarian markers only where grounded (do not invent dietary claims). Add “View full menu” interaction that opens an elegant menu panel/modal or scrolls to the menu. No fake ordering integration; “Order Online” can be a clearly labelled demo CTA that opens a small “Online ordering coming soon” dialog.
5. EXPERIENCE / FEATURE STRIP: highlight “The art of the perfect dosa”, “Slow-brewed filter coffee”, “A meal on a banana leaf” with strong images and short copy.
6. GALLERY: curated responsive image grid / masonry with accessible lightbox and captions.
7. VISIT / CONTACT: elegant dark section with map-style decorative motif but do not embed a real map for fake address. Show the provided fictional demo details exactly but clearly mark the entire site as a concept/demo and contact details as fictional placeholders:
Address: 452, Spice Garden Road, Near Heritage Square, Sector 4, Bangalore - 560038 (fictional demo address)
Phone: +1 (555) 382-9104 (fictional placeholder)
Email: hello@mavalliheritage.com (fictional placeholder)
Hours: Monday – Sunday, 7:00 AM – 10:30 PM
Add a functional-looking reservation form with name, email, phone, date, time, party size, and notes. Since no backend is configured, do NOT pretend to submit or store reservations. On submit, validate fields and show a clear demo confirmation explaining that this is a preview and no reservation was actually sent. Include a click-to-call/email link only as placeholder.
8. FOOTER: logo, short brand line, nav links, Instagram/Facebook/X icons as tasteful links with placeholder hrefs or non-navigating demo behavior, copyright © 2026 Mavalli Heritage. All social links clearly demo placeholders.

FUNCTIONAL QUALITY:
- Build real responsive pages/sections, not a static screenshot.
- All nav anchors and CTAs should work.
- Reservation form validation and honest demo confirmation.
- Gallery lightbox accessible with keyboard close.
- Mobile menu works.
- Good focus states, semantic HTML, alt text, contrast and keyboard accessibility.
- Optimize images and loading; avoid layout shifts.
- Use consistent reusable components and polished responsive breakpoints.
- No lorem ipsum. No invented testimonials, awards, ratings, claims, delivery partners or real integrations.
- Ensure no console errors and verify mobile and desktop layouts.
- Create the complete website now and provide a working preview.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mavalli-heritage-table.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/45237bac-bb17-4e40-89bb-b1aa08fe7fa8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
