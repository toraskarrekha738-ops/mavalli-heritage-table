import { useMemo } from "react";
import * as THREE from "three";
import { displace, tiled, useFoodTextures } from "../food";
import { papadTexture, riceGrainTexture } from "../textures";
import { Katori } from "./parts";

const SIDES: { name: string; color: string; solid?: boolean }[] = [
  { name: "sambar", color: "#b0601d" },
  { name: "rasam", color: "#982c1a" },
  { name: "kootu", color: "#e8dcb0", solid: true },
  { name: "poriyal", color: "#a8c870", solid: true },
  { name: "payasam", color: "#eedbb0" },
];

/** Banana-leaf thali: rice mound, five katoris and a papad on a curled, slightly torn leaf. */
export function Thali() {
  const t = useFoodTextures();
  const leafMap = useMemo(() => tiled(t.leaf, 1), [t.leaf]);
  const riceMap = useMemo(() => riceGrainTexture(), []);
  const pap = useMemo(() => papadTexture(), []);
  const sideMap = useMemo(() => tiled(t.masala, 0.5), [t.masala]);

  const leafGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(4.2, 2.8, 64, 32);
    const p = g.attributes["position"] as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i);
      // curled long edges + slight wave along the ribs
      p.setZ(i, Math.pow(Math.abs(y) / 1.4, 3) * 0.28 + Math.pow(Math.abs(x) / 2.1, 4) * 0.12 + Math.sin(x * 2.2) * 0.02);
      // ragged torn edge along one side
      if (y > 1.25) p.setY(i, y - Math.abs(Math.sin(x * 7.3) * Math.sin(x * 3.1)) * 0.12);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  const rice = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    return displace(g, 0.07, 3.2, 2.2);
  }, []);
  const papad = useMemo(() => {
    const g = new THREE.CircleGeometry(0.5, 48);
    const p = g.attributes["position"] as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i);
      p.setZ(i, Math.sin(x * 4) * Math.cos(y * 5) * 0.03 + (x * x + y * y) * 0.12);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group position={[0, -0.3, 0]}>
      <mesh geometry={leafGeo} rotation-x={-Math.PI / 2} receiveShadow>
        <meshPhysicalMaterial map={leafMap} roughness={0.32} clearcoat={0.5} clearcoatRoughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={rice} position={[0.3, 0.02, 0.35]} scale={[0.75, 0.38, 0.6]} castShadow>
        <meshStandardMaterial map={riceMap} bumpMap={riceMap} bumpScale={1.5} roughness={0.85} />
      </mesh>
      {SIDES.map((s, i) => {
        const a = Math.PI * 0.95 + (i / (SIDES.length - 1)) * Math.PI * 1.1;
        return <Katori key={s.name} liquid={s.color} solid={s.solid} map={s.solid ? sideMap : undefined} r={0.3} position={[0.2 + Math.cos(a) * 1.45, 0.02, -0.25 + Math.sin(a) * 0.95]} />;
      })}
      <mesh geometry={papad} position={[-1.35, 0.08, 0.75]} rotation={[-Math.PI / 2 + 0.12, 0, 0.1]} castShadow>
        <meshStandardMaterial map={pap} bumpMap={pap} bumpScale={0.8} roughness={0.75} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
