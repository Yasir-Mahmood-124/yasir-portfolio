"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

function Particles({ count = 800 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const { resolvedTheme } = useTheme();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const positions = mesh.current.geometry.attributes.position;
    const arr = positions.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      for (let j = 0; j < 3; j++) {
        if (Math.abs(arr[i * 3 + j]) > 10) {
          velocities[i * 3 + j] *= -1;
        }
      }
    }

    positions.needsUpdate = true;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  const color = resolvedTheme === "dark" ? "#22C55E" : "#10B981";

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.03) * 0.2;
  });

  const color = resolvedTheme === "dark" ? "#22C55E" : "#10B981";
  const wireColor = resolvedTheme === "dark" ? "#334155" : "#CBD5E1";

  return (
    <group ref={groupRef}>
      <mesh position={[3, 2, -3]} rotation={[0.5, 0.5, 0]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
      </mesh>
      <mesh position={[-4, -1, -2]} rotation={[1, 0.3, 0.5]}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial
          color={wireColor}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      <mesh position={[2, -3, -4]} rotation={[0.2, 1, 0.3]}>
        <torusGeometry args={[0.5, 0.15, 8, 16]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
      </mesh>
      <mesh position={[-3, 3, -5]} rotation={[0.8, 0.2, 0.6]}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial
          color={wireColor}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
