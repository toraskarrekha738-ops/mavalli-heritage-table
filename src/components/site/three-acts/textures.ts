import * as THREE from "three";

function canvasTex(size: number, draw: (c: CanvasRenderingContext2D, s: number) => void, repeat = 1) {
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  const c = cv.getContext("2d")!;
  draw(c, size);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = 4;
  return t;
}

/** seeded PRNG so textures look identical each load */
export function rng(seed = 7) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

/** Lacy golden-brown dosa browning with darker crisp spots. */
export function dosaTexture() {
  const r = rng(11);
  return canvasTex(512, (c, s) => {
    const g = c.createLinearGradient(0, 0, s, s);
    g.addColorStop(0, "#d99a3e");
    g.addColorStop(0.5, "#e6b25a");
    g.addColorStop(1, "#c7832c");
    c.fillStyle = g;
    c.fillRect(0, 0, s, s);
    for (let i = 0; i < 2600; i++) {
      const x = r() * s, y = r() * s, rad = 1 + r() * 7;
      c.fillStyle = `rgba(${120 + r() * 50},${60 + r() * 30},${15 + r() * 15},${0.12 + r() * 0.35})`;
      c.beginPath();
      c.ellipse(x, y, rad, rad * (0.5 + r()), r() * 3, 0, Math.PI * 2);
      c.fill();
    }
    for (let i = 0; i < 500; i++) {
      c.fillStyle = `rgba(255,226,150,${0.15 + r() * 0.3})`;
      c.beginPath();
      c.arc(r() * s, r() * s, 0.8 + r() * 2.5, 0, Math.PI * 2);
      c.fill();
    }
  }, 2);
}

/** Hammered brass: soft dimples as a bump map. */
export function hammeredTexture() {
  const r = rng(5);
  return canvasTex(256, (c, s) => {
    c.fillStyle = "#808080";
    c.fillRect(0, 0, s, s);
    for (let i = 0; i < 380; i++) {
      const x = r() * s, y = r() * s, rad = 5 + r() * 9;
      const g = c.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, "rgba(40,40,40,0.55)");
      g.addColorStop(1, "rgba(128,128,128,0)");
      c.fillStyle = g;
      c.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    }
  }, 3);
}

/** Banana leaf with centre vein and parallel side ribs. */
export function leafTexture() {
  const r = rng(3);
  return canvasTex(512, (c, s) => {
    const g = c.createLinearGradient(0, 0, 0, s);
    g.addColorStop(0, "#2f6b2a");
    g.addColorStop(0.5, "#3f8a34");
    g.addColorStop(1, "#2a5f25");
    c.fillStyle = g;
    c.fillRect(0, 0, s, s);
    for (let x = 0; x < s; x += 5 + r() * 4) {
      c.strokeStyle = `rgba(${r() > 0.5 ? "180,220,140" : "20,50,20"},${0.08 + r() * 0.12})`;
      c.lineWidth = 1 + r();
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(x + 6, s);
      c.stroke();
    }
    c.fillStyle = "rgba(200,225,150,0.55)";
    c.fillRect(s / 2 - 5, 0, 10, s);
  });
}

/** Blistered papad. */
export function papadTexture() {
  const r = rng(9);
  return canvasTex(256, (c, s) => {
    c.fillStyle = "#e9cf8f";
    c.fillRect(0, 0, s, s);
    for (let i = 0; i < 700; i++) {
      c.fillStyle = r() > 0.7 ? `rgba(150,95,40,${0.2 + r() * 0.4})` : `rgba(255,240,200,${0.3 + r() * 0.4})`;
      c.beginPath();
      c.arc(r() * s, r() * s, 1 + r() * 4, 0, Math.PI * 2);
      c.fill();
    }
  });
}
