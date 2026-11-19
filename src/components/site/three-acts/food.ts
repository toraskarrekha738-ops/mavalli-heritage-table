import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import dosa from "@/assets/textures/dosa.webp";
import rice from "@/assets/textures/rice.webp";
import leaf from "@/assets/textures/leaf.webp";
import masala from "@/assets/textures/masala.webp";
import chicken from "@/assets/textures/chicken.webp";

const URLS = { dosa, rice, leaf, masala, chicken };

export type FoodTextures = Record<keyof typeof URLS, THREE.Texture>;

/** Photo-derived surface maps for the dishes (suspends until loaded). */
export function useFoodTextures(): FoodTextures {
  return useTexture(URLS, (loaded) => {
    const list = Array.isArray(loaded) ? loaded : Object.values(loaded as Record<string, THREE.Texture>);
    for (const t of list) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.anisotropy = 8;
    }
  }) as unknown as FoodTextures;
}

/** Cheap smooth pseudo-noise for organic displacement. */
export function noise3(x: number, y: number, z: number) {
  return (
    Math.sin(x * 3.1 + y * 1.7) * 0.5 +
    Math.sin(y * 4.3 - z * 2.9) * 0.3 +
    Math.sin(z * 5.7 + x * 3.3) * 0.2 +
    Math.sin((x + y + z) * 9.1) * 0.08
  );
}

/** Push every vertex along its normal by noise — turns a primitive into a lumpy, food-like form. */
export function displace(geo: THREE.BufferGeometry, amount: number, freq = 1, seed = 0) {
  geo.computeVertexNormals();
  const p = geo.attributes["position"] as THREE.BufferAttribute;
  const n = geo.attributes["normal"] as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const d = noise3(x * freq + seed, y * freq, z * freq - seed) * amount;
    p.setXYZ(i, x + n.getX(i) * d, y + n.getY(i) * d, z + n.getZ(i) * d);
  }
  geo.computeVertexNormals();
  return geo;
}

export function tiled(t: THREE.Texture, r: number) {
  const c = t.clone();
  c.repeat.set(r, r);
  c.needsUpdate = true;
  return c;
}
