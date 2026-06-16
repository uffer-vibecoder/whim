import type { Review } from "../types";

const names = [
  "Madison R.",
  "Tyler B.",
  "Ashley K.",
  "Jordan P.",
  "Brittany M.",
  "Cody L.",
  "Hailey S.",
  "Brandon T.",
  "Megan W.",
  "Austin D.",
  "Sierra G.",
  "Dakota F.",
];

const avatars = ["😍", "🤩", "🥹", "😎", "🫶", "🙌", "✨", "🔥", "💅", "🧸", "👏", "💖"];

const titles = [
  "Obsessed. Genuinely.",
  "Bought it twice by accident",
  "My therapist says it's fine",
  "10/10 would impulse again",
  "This changed my whole week",
  "Shut up and take my (fake) money",
  "Better than the real thing",
  "Husband is concerned. I'm thriving.",
  "Adding to cart for the dopamine",
  "Five stars, no notes, full serotonin",
];

const bodies = [
  "Ordered it at 2am during a spiral and somehow feel AMAZING. Watched the little truck the whole way. Best $0 I never spent.",
  "The checkout animation alone is worth it. I didn't even need the thing, I needed the FEELING. Got it.",
  "Tracked my delivery for 40 minutes like it was the Super Bowl. Nothing arrived and I've never been happier.",
  "Quality is exactly what I imagined because it's imaginary. Highly recommend to anyone trying to save money and feelings.",
  "My bank account is untouched and my brain got the little reward chemical. This is the future of shopping.",
  "Added five to cart, removed four for 'self control', checked out the last one. Pure cinema.",
  "I show people the delivery map like it's a baby photo. Worth every fake penny.",
  "Came for the product, stayed for the confetti. Smashed that buy button so hard.",
];

// Deterministic pseudo-random so reviews are stable per product.
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function reviewsFor(productId: string, count = 4): Review[] {
  const seed = hash(productId);
  return Array.from({ length: count }, (_, i) => {
    const k = seed + i * 2654435761;
    return {
      name: names[(k >> 2) % names.length],
      emoji: avatars[(k >> 5) % avatars.length],
      title: titles[(k >> 8) % titles.length],
      body: bodies[(k >> 11) % bodies.length],
      stars: 4 + ((k >> 14) % 2), // 4 or 5
    };
  });
}
