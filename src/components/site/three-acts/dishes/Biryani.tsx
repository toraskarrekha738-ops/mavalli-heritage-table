import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { displace, tiled, useFoodTextures } from "../food";
import { rng } from "../textures";
import { BRASS, Lathe } from "./parts";

/** Chettinad chicken biryani heaped in a hammered brass handi. */
export function Biryani({ lite = false }: { lite?: boolean }) {
  const t = useFoodTextures();
  const riceMap = useMemo(() => tiled(t.rice, 1.1), [t.rice]);
  const chickenMap = useMemo(() => tiled(t.chicken, 0.6), [t.chicken]);
  const grainsRef = useRef<THREE.InstancedMesh>(null);
  const onion = useRef<THREE.InstancedMesh>(null);
  const herbs = useRef<THREE.InstancedMesh>(null);
  const grains = lite ? 260 : 520;

  const handi = useMemo<[number, number][]>(
    () => [[0, 0], [0.7, 0], [1.05, 0.2], [1.3, 0.55], [1.32, 0.85], [1.15, 1.1], [1.1, 1.18], [1.22, 1.25], [1.2, 1.3], [1.04, 1.22], [1.0, 1.1], [0, 1.1]],
    [],
  );
  const heapH = (d: number) => 1.1 + (1 - d * d) * 0.4;

  // heaped rice surface: a displaced dome carrying the photographed biryani texture
  const heap = useMemo(() => {
    const g = new THREE.CircleGeometry(1.02, 96, 0, Math.PI * 2);
    const p = g.attributes["position"] as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i);
      const d = Math.min(1, Math.hypot(x, y) / 1.02);
      const lump = Math.sin(x * 9) * Math.cos(y * 8) * 0.03 + Math.sin(x * 23 + y * 19) * 0.012;
      p.setZ(i, heapH(d) - 1.1 + lump * (1 - d * 0.5));
    }
    g.rotateX(-Math.PI / 2);
    g.translate(0, 1.1, 0);
    g.computeVertexNormals();
    return g;
  }, []);

  useLayoutEffect(() => {
    const r = rng(21);
    const m = new THREE.Object3D();
    const col = new THREE.Color();
    for (let i = 0; i < grains; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.98;
      m.position.set(Math.cos(a) * d, heapH(d) + 0.01 + r() * 0.02, Math.sin(a) * d);
      m.rotation.set(Math.PI / 2 + (r() - 0.5) * 0.6, r() * 6, r() * 0.5);
      m.scale.setScalar(0.85 + r() * 0.3);
      m.updateMatrix();
      grainsRef.current!.setMatrixAt(i, m.matrix);
      const k = r();
      col.set(k > 0.78 ? "#e2902a" : k > 0.62 ? "#efc15a" : "#f4ead2");
      grainsRef.current!.setColorAt(i, col);
    }
    grainsRef.current!.instanceMatrix.needsUpdate = true;
    if (grainsRef.current!.instanceColor) grainsRef.current!.instanceColor.needsUpdate = true;
    for (let i = 0; i < 50; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.85;
      m.position.set(Math.cos(a) * d, heapH(d) + 0.02, Math.sin(a) * d);
      m.rotation.set(Math.PI / 2 + (r() - 0.5) * 0.8, r() * 3, r() * 3);
      m.scale.set(0.6 + r() * 0.6, 0.6 + r() * 0.6, 0.6);
      m.updateMatrix();
      onion.current!.setMatrixAt(i, m.matrix);
    }
    onion.current!.instanceMatrix.needsUpdate = true;
    for (let i = 0; i < 22; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.8;
      m.position.set(Math.cos(a) * d, heapH(d) + 0.05, Math.sin(a) * d);
      m.rotation.set(-Math.PI / 2 + (r() - 0.5) * 0.9, (r() - 0.5) * 0.5, r() * 6);
      m.scale.setScalar(0.9 + r() * 0.5);
      m.updateMatrix();
      herbs.current!.setMatrixAt(i, m.matrix);
    }
    herbs.current!.instanceMatrix.needsUpdate = true;
  }, [grains]);

  // irregular chicken pieces half-buried in the rice
  const chicken = useMemo(() => {
    const r = rng(4);
    return Array.from({ length: 7 }, (_, i) => {
      const a = (i / 7) * Math.PI * 2 + r() * 0.6;
      const d = 0.25 + r() * 0.5;
      const geo = displace(new THREE.SphereGeometry(1, 28, 20), 0.22, 1.8, i * 1.7);
      return {
        geo,
        p: [Math.cos(a) * d, heapH(d) + 0.02, Math.sin(a) * d] as [number, number, number],
        s: [0.17 + r() * 0.06, 0.09 + r() * 0.03, 0.12 + r() * 0.04] as [number, number, number],
        rot: [r() * 0.6, r() * 6, r() * 0.6] as [number, number, number],
      };
    });
  }, []);

  const leafGeo = useMemo(() => {
    const sh = new THREE.Shape();
    sh.moveTo(0, -0.075);
    sh.quadraticCurveTo(0.065, 0, 0, 0.075);
    sh.quadraticCurveTo(-0.065, 0, 0, -0.075);
    const g = new THREE.ShapeGeometry(sh, 8);
    const p = g.attributes["position"] as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) p.setZ(i, Math.abs(p.getX(i)) * 0.4);
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group position={[0, -0.6, 0]}>
      <Lathe profile={handi} {...BRASS} hammered />
      <mesh geometry={heap} receiveShadow>
        <meshStandardMaterial map={riceMap} bumpMap={riceMap} bumpScale={1} roughness={0.7} />
      </mesh>
      <instancedMesh ref={grainsRef} args={[undefined, undefined, grains]} castShadow>
        <capsuleGeometry args={[0.014, 0.07, 2, 6]} />
        <meshStandardMaterial roughness={0.5} />
      </instancedMesh>
      <instancedMesh ref={onion} args={[undefined, undefined, 50]}>
        <torusGeometry args={[0.055, 0.01, 4, 10, Math.PI * 1.1]} />
        <meshStandardMaterial color="#6e3510" roughness={0.55} />
      </instancedMesh>
      <instancedMesh ref={herbs} args={[undefined, undefined, 22]}>
        <primitive object={leafGeo} attach="geometry" />
        <meshStandardMaterial color="#3d7f2e" roughness={0.45} side={THREE.DoubleSide} />
      </instancedMesh>
      {chicken.map((c, i) => (
        <mesh key={i} geometry={c.geo} position={c.p} rotation={c.rot} scale={c.s} castShadow>
          <meshPhysicalMaterial map={chickenMap} bumpMap={chickenMap} bumpScale={1.2} roughness={0.55} clearcoat={0.35} clearcoatRoughness={0.5} />
        </mesh>
      ))}
      {/* whole spices beside the handi */}
      <mesh position={[1.45, 0.05, 0.6]} rotation={[0, 0.4, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.05, 0.6, 12]} />
        <meshStandardMaterial color="#6b3a1c" roughness={0.9} />
      </mesh>
      <group position={[-1.5, 0.04, 0.5]}>
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={i} rotation={[0, (i / 8) * Math.PI * 2, 0]} position={[0, 0, 0]}>
            <coneGeometry args={[0.035, 0.16, 4]} />
            <meshStandardMaterial color="#4a2410" roughness={0.85} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
