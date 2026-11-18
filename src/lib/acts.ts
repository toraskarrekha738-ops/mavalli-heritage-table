/** Pure scroll → act maths for the Three Acts stage. No React, no three.js. */
export const ACT_COUNT = 3;
export const ENTER = 0.16;
export const EXIT = 0.84;

export interface DishPose {
  visible: boolean;
  /** radians, one full turn across an act */
  rotationY: number;
  /** vertical offset in world units: negative = below, positive = above */
  y: number;
  /** depth offset: negative = far */
  z: number;
  opacity: number;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function actIndex(progress: number): number {
  return Math.min(ACT_COUNT - 1, Math.floor(clamp01(progress) * ACT_COUNT));
}

export function localT(progress: number, index: number): number {
  return clamp01(clamp01(progress) * ACT_COUNT - index);
}

export function dishPose(progress: number, index: number, reduce = false): DishPose {
  const raw = clamp01(progress) * ACT_COUNT - index;
  const t = clamp01(raw);
  const last = index === ACT_COUNT - 1;
  if (raw < -0.05 || (!last && raw > 1.05)) return { visible: false, rotationY: 0, y: 0, z: 0, opacity: 0 };
  const rotationY = reduce ? 0 : t * Math.PI * 2;
  let y = 0;
  let z = 0;
  let opacity = 1;
  if (t < ENTER && index > 0) {
    const k = ease(t / ENTER);
    y = reduce ? 0 : -3.2 * (1 - k);
    z = reduce ? 0 : -4 * (1 - k);
    opacity = k;
  } else if (t < ENTER && index === 0) {
    const k = ease(t / ENTER);
    z = reduce ? 0 : -1.5 * (1 - Math.max(k, 0.4));
  }
  if (!last && t > EXIT) {
    const k = ease((t - EXIT) / (1 - EXIT));
    y = reduce ? 0 : 3.4 * k;
    z = reduce ? 0 : -1.5 * k;
    opacity = 1 - k;
  }
  return { visible: opacity > 0.01, rotationY, y, z, opacity };
}
