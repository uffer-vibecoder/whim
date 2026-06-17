// whim's house "dupe" brands — all original parody names (never real trademarks),
// each a cheeky stand-in for a category vibe. Used as the label on product tiles.

export type Brand = {
  name: string;
  vibe: string; // the archetype it gently spoofs
};

export const brands: Brand[] = [
  { name: "Quench Haus", vibe: "the cult water-bottle hype" },
  { name: "Crumb", vibe: "countertop gadgets & snack drops" },
  { name: "Cloudfoot", vibe: "marshmallow-sole sneakers" },
  { name: "Pixel & Pine", vibe: "ambient desk & room glow" },
  { name: "Hyggehaus", vibe: "flat-pack cozy minimalism" },
  { name: "Lümen", vibe: "premium hush-the-world audio" },
  { name: "Good Times Co.", vibe: "game-night & party joy" },
  { name: "Pawmart", vibe: "spoiled-pet luxury" },
  { name: "Dewdrop Labs", vibe: "10-step glow skincare" },
  { name: "Roam", vibe: "aspirational gorpcore outdoors" },
  { name: "Sweatleisure Co.", vibe: "wear-it-everywhere wellness" },
  { name: "Thicket & Thread", vibe: "elevated everyday basics" },
  { name: "Voltā", vibe: "charge-everything gadgets" },
  { name: "Encore Finds", vibe: "whim's secondhand vintage label" },
];

// Default brand per category so every product gets one without per-item edits.
export const brandByCategory: Record<string, string> = {
  Hydration: "Quench Haus",
  Kitchen: "Crumb",
  Snacks: "Crumb",
  Footwear: "Cloudfoot",
  Desk: "Pixel & Pine",
  Vibes: "Pixel & Pine",
  Home: "Hyggehaus",
  Comfort: "Hyggehaus",
  Cozy: "Hyggehaus",
  Audio: "Lümen",
  Fun: "Good Times Co.",
  Pets: "Pawmart",
  Beauty: "Dewdrop Labs",
  Outdoors: "Roam",
  Wellness: "Sweatleisure Co.",
  Style: "Thicket & Thread",
  Tech: "Voltā",
  Thrifted: "Encore Finds",
};

export function brandFor(category: string, explicit?: string): string {
  return explicit ?? brandByCategory[category] ?? "whim";
}
