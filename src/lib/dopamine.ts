import confetti from "canvas-confetti";

const PINK = ["#ff5da2", "#ffd23f", "#7c5cff", "#3dd6c4", "#ff8a5c", "#7CFC98"];

/** A quick celebratory burst — used on add-to-cart. */
export function popConfetti(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 60,
    spread: 70,
    startVelocity: 35,
    origin: { x, y },
    colors: PINK,
    scalar: 0.9,
    disableForReducedMotion: true,
  });
}

/** A big, prolonged celebration — used at order placed / delivered. */
export function bigCelebration() {
  const end = Date.now() + 900;
  const frame = () => {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 60,
      origin: { x: 0 },
      colors: PINK,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 60,
      origin: { x: 1 },
      colors: PINK,
      disableForReducedMotion: true,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

// ---- Sound: tiny synthesized blips, no assets needed ----

let ac: AudioContext | null = null;
let soundOn = true;

function ctx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ac) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (AC) ac = new AC();
  }
  return ac;
}

export function setSound(on: boolean) {
  soundOn = on;
}
export function isSoundOn() {
  return soundOn;
}

function blip(freq: number, t0: number, dur = 0.12, type: OscillatorType = "sine") {
  const a = ctx();
  if (!a) return;
  const osc = a.createOscillator();
  const gain = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(0.22, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(a.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

/** Rising two-note "added!" chirp. */
export function playPop() {
  if (!soundOn) return;
  const a = ctx();
  if (!a) return;
  const now = a.currentTime;
  blip(660, now, 0.1, "triangle");
  blip(990, now + 0.08, 0.12, "triangle");
}

/** Cha-ching cash-register flourish for checkout. */
export function playChaChing() {
  if (!soundOn) return;
  const a = ctx();
  if (!a) return;
  const now = a.currentTime;
  blip(880, now, 0.09, "square");
  blip(1320, now + 0.06, 0.18, "square");
  blip(1760, now + 0.14, 0.22, "triangle");
}

/** Warm arrival chord for "delivered". */
export function playArrived() {
  if (!soundOn) return;
  const a = ctx();
  if (!a) return;
  const now = a.currentTime;
  [523, 659, 784, 1047].forEach((f, i) => blip(f, now + i * 0.07, 0.35, "sine"));
}
