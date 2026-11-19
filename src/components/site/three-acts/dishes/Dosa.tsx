import { useMemo } from "react";
import * as THREE from "three";
import { displace, tiled, useFoodTextures } from "../food";
import { BRASS, Katori, Lathe } from "./parts";
import { riceGrainTexture } from "../textures";

/** Benne masala dosa: a folded, uneven golden crepe over potato masala, on a brass plate with chutneys. */
export function Dosa() {
  const t = useFoodTextures();
  const dosaMap = useMemo(() => tiled(t.dosa, 1), [t.dosa]);
  const masalaMap = useMemo(() => tiled(t.masala, 0.8), [t.masala]);
  const leafMap = useMemo(() => tiled(t.leaf, 1), [t.leaf]);
  const chutney = useMemo(() => riceGrainTexture(), []);

  const shell = useMemo(() => {
    // folded crepe: open half-cylinder, tapered, flattened, with a wavy rippled rim
    const g = new THREE.CylinderGeometry(0.62, 0.62, 2.8, 96, 48, true, -Math.PI * 0.1, Math.PI * 1.2);
    const p = g.attributes["position"] as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const ang = Math.atan2(z, x);
      const taper = 1 - Math.pow(Math.abs(y) / 1.4, 2.4) * 0.42;
      const ripple = Math.sin(y * 7 + ang * 2) * 0.025 + Math.sin(y * 17) * 0.01;
      const rimLift = Math.pow(Math.abs(Math.sin(ang * 0.5)), 6) * Math.sin(y * 5) * 0.05;
      p.setXYZ(i, x * taper * (1 + ripple), y + Math.sin(ang * 3) * 0.04, z * taper * 0.72 * (1 + ripple) + rimLift);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  const filling = useMemo(() => displace(new THREE.SphereGeometry(1, 48, 32), 0.14, 2.6, 1.3), []);
  const butter = useMemo(() => displace(new THREE.SphereGeometry(1, 32, 16), 0.12, 3, 4), []);
  const plate = useMemo<[number, number][]>(() => [[0, 0], [1.6, 0], [1.75, 0.06], [1.95, 0.16], [1.9, 0.17], [1.6, 0.05], [0, 0.04]], []);
  const leafGeo = useMemo(() => {
    const sh = new THREE.Shape();
    sh.moveTo(-1.55, 0);
    sh.bezierCurveTo(-0.8, 0.78, 0.8, 0.72, 1.55, 0.02);
    sh.bezierCurveTo(0.8, -0.74, -0.8, -0.76, -1.55, 0);
    const g = new THREE.ShapeGeometry(sh, 32);
    const uv = g.attributes["uv"] as THREE.BufferAttribute;
    const p = g.attributes["position"] as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) {
      const x = p.getX(i), y = p.getY(i);
      uv.setXY(i, (y + 0.78) / 1.56, (x + 1.55) / 3.1);
      p.setZ(i, Math.pow(Math.abs(y) / 0.78, 2) * 0.06 + Math.sin(x * 3) * 0.015);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group>
      <Lathe profile={plate} {...BRASS} hammered />
      <mesh geometry={leafGeo} rotation={[-Math.PI / 2, 0, 0.25]} position={[-0.1, 0.07, 0]} receiveShadow>
        <meshPhysicalMaterial map={leafMap} roughness={0.35} clearcoat={0.4} side={THREE.DoubleSide} />
      </mesh>
      <group position={[0, 0.52, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh geometry={shell} castShadow receiveShadow rotation={[0, Math.PI, 0]}>
          <meshPhysicalMaterial
            map={dosaMap}
            bumpMap={dosaMap}
            bumpScale={0.6}
            roughness={0.48}
            clearcoat={0.55}
            clearcoatRoughness={0.4}
            sheen={0.4}
            sheenColor="#ffd38a"
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* potato masala spilling from both open ends */}
        {[1, -1].map((s) => (
          <mesh key={s} geometry={filling} position={[0, s * 1.24, -0.1]} scale={[0.32, 0.17, 0.25]} castShadow>
            <meshStandardMaterial map={masalaMap} bumpMap={masalaMap} bumpScale={0.8} roughness={0.75} />
          </mesh>
        ))}
      </group>
      {/* benne (butter) melting on top */}
      <mesh geometry={butter} position={[0.15, 0.97, 0.08]} scale={[0.2, 0.06, 0.16]}>
        <meshPhysicalMaterial color="#fbe3a0" roughness={0.08} clearcoat={1} transmission={0.25} thickness={0.2} />
      </mesh>
      <Katori liquid="#f4efdc" map={chutney} position={[1.1, 0.06, 0.95]} r={0.3} solid />
      <Katori liquid="#b5432a" position={[-1.1, 0.06, 0.95]} r={0.3} solid />
    </group>
  );
}
