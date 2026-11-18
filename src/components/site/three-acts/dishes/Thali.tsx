import { useMemo } from "react";
import * as THREE from "three";
import { leafTexture, papadTexture } from "../textures";
import { Katori } from "./parts";

const SIDES: { name: string; color: string; solid?: boolean }[] = [
  { name: "sambar", color: "#b8641f" },
  { name: "rasam", color: "#9c2f1c" },
  { name: "kootu", color: "#c9b35a", solid: true },
  { name: "poriyal", color: "#7fa23a", solid: true },
  { name: "payasam", color: "#efdcb3" },
];

/** Banana-leaf thali: rice mound, five katoris and a papad on a curled leaf. */
export function Thali() {
  const leaf = useMemo(() => leafTexture(), []);
  const pap = useMemo(() => papadTexture(), []);
  const leafGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(4.2, 2.8, 40, 20);
    const p = g.attributes["position"] as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i);
      p.setZ(i, Math.pow(Math.abs(y) / 1.4, 3) * 0.25 + Math.pow(Math.abs(x) / 2.1, 4) * 0.12);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <group position={[0, -0.3, 0]}>
      <mesh geometry={leafGeo} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial map={leaf} roughness={0.38} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.3, 0.02, 0.35]} scale={[0.75, 0.42, 0.6]} castShadow>
        <sphereGeometry args={[1, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f5f0e1" roughness={0.9} />
      </mesh>
      {SIDES.map((s, i) => {
        const a = Math.PI * 0.95 + (i / (SIDES.length - 1)) * Math.PI * 1.1;
        return <Katori key={s.name} liquid={s.color} solid={s.solid} r={0.3} position={[0.2 + Math.cos(a) * 1.45, 0.02, -0.25 + Math.sin(a) * 0.95 * -1 * -1]} />;
      })}
      <mesh position={[-1.35, 0.06, 0.75]} rotation={[0.12, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.02, 40]} />
        <meshStandardMaterial map={pap} roughness={0.8} />
      </mesh>
    </group>
  );
}
