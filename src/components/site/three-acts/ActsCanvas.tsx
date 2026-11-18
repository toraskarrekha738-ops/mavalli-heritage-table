import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { dishPose } from "@/lib/acts";
import { Dosa } from "./dishes/Dosa";
import { Biryani } from "./dishes/Biryani";
import { Thali } from "./dishes/Thali";

interface Props {
  progress: MotionValue<number>;
  reduce: boolean;
  lite: boolean;
  onReady: () => void;
}

const DAMP = 7;

function Stage({ progress, reduce, lite, onReady }: Props) {
  const dishes = useRef<(THREE.Group | null)[]>([]);
  const halo = useRef<THREE.Mesh>(null);
  const motes = useRef<THREE.Points>(null);
  const smooth = useRef(progress.get());
  const ready = useRef(false);

  const count = lite ? 60 : 150;
  const moteGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = ((i * 37) % 100) / 100 * 9 - 4.5;
      pos[i * 3 + 1] = ((i * 53) % 100) / 100 * 6 - 3;
      pos[i * 3 + 2] = ((i * 71) % 100) / 100 * 4 - 3;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    smooth.current += (progress.get() - smooth.current) * (1 - Math.exp(-DAMP * dt));
    const p = smooth.current;
    dishes.current.forEach((g, i) => {
      if (!g) return;
      const pose = dishPose(p, i, reduce);
      g.visible = pose.visible;
      g.rotation.y = pose.rotationY - 0.5;
      g.position.set(0, pose.y, pose.z);
      g.scale.setScalar(0.6 + 0.4 * pose.opacity);
    });
    if (halo.current) {
      halo.current.rotation.z = p * Math.PI * 3;
      (halo.current.material as THREE.MeshBasicMaterial).opacity = 0.35 + Math.sin(p * Math.PI * 6) * 0.1;
    }
    if (motes.current && !reduce) {
      const arr = motes.current.geometry.attributes["position"] as THREE.BufferAttribute;
      for (let i = 0; i < arr.count; i++) {
        let y = arr.getY(i) + dt * (0.15 + (i % 5) * 0.05);
        if (y > 3) y = -3;
        arr.setY(i, y);
      }
      arr.needsUpdate = true;
    }
    if (!ready.current && state.clock.elapsedTime > 0.3) {
      ready.current = true;
      onReady();
    }
  });

  const slot = (i: number, node: ReactNode) => (
    <group ref={(el) => { dishes.current[i] = el; }} visible={i === 0}>{node}</group>
  );

  return (
    <>
      <color attach="background" args={["#120c08"]} />
      <fog attach="fog" args={["#120c08", 7, 16]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 6, 4]} intensity={2.4} color="#ffd9a0" castShadow={!lite} />
      <spotLight position={[-4, 3, -3]} intensity={30} angle={0.6} penumbra={1} color="#e0a040" />
      <Environment resolution={64}>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} rotation-x={Math.PI / 2} color="#ffe2b0" />
        <Lightformer intensity={1.2} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} color="#c9a24a" />
        <Lightformer intensity={0.8} position={[5, 1, 1]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} color="#ffffff" />
      </Environment>
      <mesh ref={halo} position={[0, 0.6, -2.2]}>
        <torusGeometry args={[2.3, 0.012, 8, 160]} />
        <meshBasicMaterial color="#d8b25a" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, 0.6, -2.3]}>
        <torusGeometry args={[2.7, 0.005, 6, 160]} />
        <meshBasicMaterial color="#d8b25a" transparent opacity={0.18} />
      </mesh>
      {!reduce && (
        <points ref={motes} geometry={moteGeo}>
          <pointsMaterial size={0.035} color="#e8b04a" transparent opacity={0.7} depthWrite={false} sizeAttenuation />
        </points>
      )}
      <group position={[0, -0.4, 0]} scale={0.95}>
        {slot(0, <Dosa />)}
        {slot(1, <Biryani lite={lite} />)}
        {slot(2, <Thali />)}
        <ContactShadows position={[0, -0.62, 0]} opacity={0.6} scale={8} blur={2.6} far={3} resolution={lite ? 256 : 512} color="#000000" />
      </group>
    </>
  );
}

export default function ActsCanvas(props: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(!!e?.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        shadows={!props.lite}
        dpr={props.lite ? [1, 1.4] : [1, 1.75]}
        frameloop={onScreen ? "always" : "never"}
        camera={{ position: props.lite ? [0, 3.2, 10] : [0, 2.4, 5.6], fov: 38 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ camera }) => camera.lookAt(0, 0.1, 0)}
        aria-hidden
      >
        <Stage {...props} />
      </Canvas>
    </div>
  );
}
