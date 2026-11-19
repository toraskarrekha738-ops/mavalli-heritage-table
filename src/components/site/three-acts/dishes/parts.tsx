import { useMemo } from "react";
import * as THREE from "three";
import { hammeredTexture } from "../textures";

/** Lathe-turned vessel from a 2D (radius, height) profile. */
export function Lathe({
  profile,
  segments = 64,
  ...mat
}: { profile: [number, number][]; segments?: number } & THREE.MeshStandardMaterialParameters & { hammered?: boolean }) {
  const { hammered, ...rest } = mat as typeof mat & { hammered?: boolean };
  const geo = useMemo(
    () => new THREE.LatheGeometry(profile.map(([x, y]) => new THREE.Vector2(x, y)), segments),
    [profile, segments],
  );
  const bump = useMemo(() => (hammered ? hammeredTexture() : null), [hammered]);
  return (
    <mesh geometry={geo} castShadow receiveShadow>
      <meshStandardMaterial side={THREE.DoubleSide} {...rest} bumpMap={bump} bumpScale={bump ? 0.6 : 0} />
    </mesh>
  );
}

export const BRASS = { color: "#c9a24a", metalness: 0.95, roughness: 0.32 } as const;
export const STEEL = { color: "#cfd3d6", metalness: 0.95, roughness: 0.22 } as const;

/** Small steel katori bowl with a glossy liquid surface. */
export function Katori({ liquid, position, r = 0.32, solid = false, map }: { liquid: string; position: [number, number, number]; r?: number; solid?: boolean | undefined; map?: THREE.Texture | undefined }) {
  const profile = useMemo<[number, number][]>(
    () => [[0, 0], [r * 0.7, 0], [r * 0.95, r * 0.25], [r, r * 0.55], [r * 1.04, r * 0.58], [r * 0.97, r * 0.56], [r * 0.9, r * 0.25], [r * 0.65, 0.02], [0, 0.02]],
    [r],
  );
  return (
    <group position={position}>
      <Lathe profile={profile} {...STEEL} />
      <mesh position={[0, r * (solid ? 0.56 : 0.45), 0]} rotation-x={solid ? 0 : -Math.PI / 2} scale={solid ? [1, 0.5, 1] : 1}>
        {solid ? <sphereGeometry args={[r * 0.9, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} /> : <circleGeometry args={[r * 0.93, 32]} />}
        <meshPhysicalMaterial color={liquid} map={map ?? null} bumpMap={map ?? null} bumpScale={0.8} roughness={solid ? 0.7 : 0.15} clearcoat={solid ? 0 : 1} clearcoatRoughness={0.1} />
      </mesh>
    </group>
  );
}
