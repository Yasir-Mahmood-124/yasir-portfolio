"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function Shape({
  position,
  geometry,
  speed = 1,
}: {
  position: [number, number, number];
  geometry: "octahedron" | "torus" | "icosahedron";
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { resolvedTheme } = useTheme();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
    ref.current.rotation.z = state.clock.elapsedTime * 0.05 * speed;
  });

  const color = resolvedTheme === "dark" ? "#22C55E" : "#10B981";

  const geo = {
    octahedron: <octahedronGeometry args={[0.4, 0]} />,
    torus: <torusGeometry args={[0.3, 0.1, 8, 16]} />,
    icosahedron: <icosahedronGeometry args={[0.35, 0]} />,
  };

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={position}>
        {geo[geometry]}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Shape position={[-2, 1, 0]} geometry="octahedron" speed={0.8} />
        <Shape position={[2.5, -0.5, -1]} geometry="torus" speed={1.2} />
        <Shape position={[-1, -1.5, -2]} geometry="icosahedron" speed={0.6} />
      </Canvas>
    </div>
  );
}
