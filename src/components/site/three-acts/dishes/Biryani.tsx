import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { rng } from "../textures";
import { BRASS, Lathe } from "./parts";

const GRAINS = 900;

/** Chettinad chicken biryani heaped in a hammered brass handi. */
export function Biryani({ lite = false }: { lite?: boolean }) {
  const rice = useRef<THREE.InstancedMesh>(null);
  const onion = useRef<THREE.InstancedMesh>(null);
  const herbs = useRef<THREE.InstancedMesh>(null);
  const count = lite ? 450 : GRAINS;
  const handi = useMemo<[number, number][]>(
    () => [[0, 0], [0.7, 0], [1.05, 0.2], [1.3, 0.55], [1.32, 0.85], [1.15, 1.1], [1.1, 1.18], [1.22, 1.25], [1.2, 1.3], [1.04, 1.22], [1.0, 1.1], [0, 1.1]],
    [],
  );
  useLayoutEffect(() => {
    const r = rng(21);
    const m = new THREE.Object3D();
    const col = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 1.0;
      const h = 1.12 + (1 - d * d) * 0.42 + r() * 0.04;
      m.position.set(Math.cos(a) * d, h, Math.sin(a) * d);
      m.rotation.set(r() * 3, r() * 3, r() * 3);
      m.scale.setScalar(0.9 + r() * 0.3);
      m.updateMatrix();
      rice.current!.setMatrixAt(i, m.matrix);
      const saffron = r();
      col.set(saffron > 0.72 ? "#e8992a" : saffron > 0.6 ? "#f1c25a" : "#f6efdc");
      rice.current!.setColorAt(i, col);
    }
    rice.current!.instanceMatrix.needsUpdate = true;
    if (rice.current!.instanceColor) rice.current!.instanceColor.needsUpdate = true;
    for (let i = 0; i < 70; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.85;
      m.position.set(Math.cos(a) * d, 1.15 + (1 - d * d) * 0.44, Math.sin(a) * d);
      m.rotation.set(Math.PI / 2 + r() - 0.5, r() * 3, r() * 3);
      m.scale.setScalar(0.7 + r() * 0.6);
      m.updateMatrix();
      onion.current!.setMatrixAt(i, m.matrix);
    }
    onion.current!.instanceMatrix.needsUpdate = true;
    for (let i = 0; i < 24; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.8;
      m.position.set(Math.cos(a) * d, 1.2 + (1 - d * d) * 0.44, Math.sin(a) * d);
      m.rotation.set(-Math.PI / 2 + (r() - 0.5), 0, r() * 6);
      m.scale.setScalar(0.8 + r() * 0.5);
      m.updateMatrix();
      herbs.current!.setMatrixAt(i, m.matrix);
    }
    herbs.current!.instanceMatrix.needsUpdate = true;
  }, [count]);

  const chicken = useMemo(() => {
    const r = rng(4);
    return Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * Math.PI * 2 + r();
      return { p: [Math.cos(a) * 0.55, 1.42, Math.sin(a) * 0.55] as [number, number, number], s: 0.11 + r() * 0.05, rot: r() * 3 };
    });
  }, []);
  const leafGeo = useMemo(() => {
    const sh = new THREE.Shape();
    sh.moveTo(0, -0.07);
    sh.quadraticCurveTo(0.06, 0, 0, 0.07);
    sh.quadraticCurveTo(-0.06, 0, 0, -0.07);
    return new THREE.ShapeGeometry(sh, 6);
  }, []);

  return (
    <group position={[0, -0.6, 0]}>
      <Lathe profile={handi} {...BRASS} hammered />
      <instancedMesh ref={rice} args={[undefined, undefined, count]} castShadow>
        <capsuleGeometry args={[0.018, 0.075, 2, 6]} />
        <meshStandardMaterial roughness={0.55} />
      </instancedMesh>
      <instancedMesh ref={onion} args={[undefined, undefined, 70]}>
        <torusGeometry args={[0.06, 0.012, 4, 10, Math.PI * 1.2]} />
        <meshStandardMaterial color="#7a3d12" roughness={0.6} />
      </instancedMesh>
      <instancedMesh ref={herbs} args={[undefined, undefined, 24]}>
        <primitive object={leafGeo} attach="geometry" />
        <meshStandardMaterial color="#3f8a34" roughness={0.5} side={THREE.DoubleSide} />
      </instancedMesh>
      {chicken.map((c, i) => (
        <mesh key={i} position={c.p} rotation={[c.rot, c.rot * 2, 0]} scale={[c.s * 1.3, c.s, c.s]} castShadow>
          <dodecahedronGeometry args={[1, 1]} />
          <meshPhysicalMaterial color="#7a3414" roughness={0.75} clearcoat={0.2} />
        </mesh>
      ))}
      {/* whole spices: star anise + cinnamon on the rim plate */}
      <mesh position={[1.45, 0.05, 0.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 10]} />
        <meshStandardMaterial color="#6b3a1c" roughness={0.9} />
      </mesh>
      <mesh position={[-1.5, 0.04, 0.5]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.14, 8]} />
        <meshStandardMaterial color="#4a2410" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
