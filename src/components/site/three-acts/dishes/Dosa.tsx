import { useMemo } from "react";
import * as THREE from "three";
import { dosaTexture, leafTexture } from "../textures";
import { BRASS, Katori, Lathe } from "./parts";

/** Benne masala dosa: a folded golden crepe over potato masala, on a brass plate with chutneys. */
export function Dosa() {
  const tex = useMemo(() => dosaTexture(), []);
  const leaf = useMemo(() => leafTexture(), []);
  const shell = useMemo(() => {
    // half-cylinder shell, flattened and gently tapered for a folded dosa
    const g = new THREE.CylinderGeometry(0.62, 0.62, 2.7, 64, 24, true, -Math.PI * 0.08, Math.PI * 1.16);
    const p = g.attributes["position"] as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i);
      const taper = 1 - Math.pow(Math.abs(y) / 1.35, 3) * 0.35;
      p.setX(i, p.getX(i) * taper);
      p.setZ(i, p.getZ(i) * taper * 0.75 + Math.sin(y * 3) * 0.02);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  const plate = useMemo<[number, number][]>(() => [[0, 0], [1.6, 0], [1.75, 0.06], [1.95, 0.16], [1.9, 0.17], [1.6, 0.05], [0, 0.04]], []);
  const leafGeo = useMemo(() => {
    const sh = new THREE.Shape();
    sh.moveTo(-1.5, 0);
    sh.bezierCurveTo(-0.8, 0.75, 0.8, 0.75, 1.5, 0);
    sh.bezierCurveTo(0.8, -0.75, -0.8, -0.75, -1.5, 0);
    const g = new THREE.ShapeGeometry(sh, 24);
    const uv = g.attributes["uv"] as THREE.BufferAttribute;
    const p = g.attributes["position"] as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (p.getY(i) + 0.75) / 1.5, (p.getX(i) + 1.5) / 3);
    return g;
  }, []);
  return (
    <group>
      <Lathe profile={plate} {...BRASS} hammered />
      <mesh geometry={leafGeo} rotation={[-Math.PI / 2, 0, 0.25]} position={[-0.1, 0.07, 0]} receiveShadow>
        <meshStandardMaterial map={leaf} roughness={0.45} side={THREE.DoubleSide} />
      </mesh>
      <group position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh geometry={shell} castShadow rotation={[0, Math.PI, 0]}>
          <meshPhysicalMaterial map={tex} roughness={0.42} clearcoat={0.6} clearcoatRoughness={0.35} side={THREE.DoubleSide} />
        </mesh>
        {/* potato masala peeking from the open ends */}
        <mesh position={[0, 1.22, -0.12]} scale={[0.3, 0.16, 0.22]}>
          <sphereGeometry args={[1, 24, 16]} />
          <meshStandardMaterial color="#e1b234" roughness={0.85} />
        </mesh>
        <mesh position={[0, -1.22, -0.12]} scale={[0.3, 0.16, 0.22]}>
          <sphereGeometry args={[1, 24, 16]} />
          <meshStandardMaterial color="#d9a52c" roughness={0.85} />
        </mesh>
      </group>
      {/* benne (butter) melting on top */}
      <mesh position={[0.15, 0.98, 0.1]} scale={[0.22, 0.07, 0.18]}>
        <sphereGeometry args={[1, 20, 12]} />
        <meshPhysicalMaterial color="#fbe7a1" roughness={0.1} clearcoat={1} transmission={0.2} />
      </mesh>
      <Katori liquid="#f2ecd6" position={[1.1, 0.06, 0.95]} r={0.3} solid />
      <Katori liquid="#b8442a" position={[-1.1, 0.06, 0.95]} r={0.3} solid />
    </group>
  );
}
