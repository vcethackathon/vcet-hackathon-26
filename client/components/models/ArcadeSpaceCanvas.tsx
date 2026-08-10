'use client';

import React, { useRef, useEffect, useState, useMemo, MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Shared scroll data refs — written from scroll listener, read in useFrame.
// Using refs instead of React state means ZERO React re-renders on every scroll tick.
interface ScrollRefs {
  progress: MutableRefObject<number>;
  speed: MutableRefObject<number>;
}

// ─── 3D PAC-MAN CHARACTER ──────────────────────────────────────────────────
function PacmanModel({ scroll }: { scroll: ScrollRefs }) {
  const groupRef = useRef<THREE.Group>(null);
  const topJawRef = useRef<THREE.Mesh>(null);
  const bottomJawRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const scrollProgress = scroll.progress.current;
    const scrollSpeed = scroll.speed.current;
    const time = state.clock.getElapsedTime();

    const targetX = 2.8 + Math.sin(scrollProgress * Math.PI * 2.5) * 0.8;
    const targetY = 3.2 - scrollProgress * 12.0;
    const targetZ = Math.sin(scrollProgress * Math.PI * 3.0) * 1.2 + 1.0;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 4);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 4);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 4);

    const chompSpeed = 12 + scrollSpeed * 15;
    const mouthAngle = (Math.sin(time * chompSpeed) + 1) * 0.28 + 0.05;

    if (topJawRef.current) topJawRef.current.rotation.x = mouthAngle;
    if (bottomJawRef.current) bottomJawRef.current.rotation.x = -mouthAngle;

    const targetRotZ = Math.sin(time * 2.0) * 0.1 - scrollSpeed * 0.2;
    const targetRotY = -Math.PI * 0.45 + Math.sin(scrollProgress * Math.PI * 2) * 0.3;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 5);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 5);
  });

  return (
    <group ref={groupRef} position={[3.2, 3.0, 1.0]} scale={0.75}>
      <mesh ref={topJawRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.9, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFA500"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <mesh ref={bottomJawRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.9, 16, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFA500"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[0.45, 0.45, 0.55]} scale={0.12}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#0B0C10" />
      </mesh>
      <mesh position={[0.45, 0.45, -0.55]} scale={0.12}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#0B0C10" />
      </mesh>
      <pointLight color="#FFD700" intensity={4} distance={6} />
    </group>
  );
}

// ─── POWER PELLETS ─────────────────────────────────────────────────────────
function PowerPellets({ scroll }: { scroll: ScrollRefs }) {
  const dots = useMemo(() =>
    Array.from({ length: 14 }).map((_, i) => {
      const progress = (i + 1) / 15;
      return {
        id: i,
        progress,
        x: 2.8 + Math.sin(progress * Math.PI * 2.5) * 0.8,
        y: 3.2 - progress * 12.0,
        z: Math.sin(progress * Math.PI * 3.0) * 1.2 + 0.8,
        isPower: i % 4 === 0,
      };
    }), []);

  // Use a group ref + useFrame to toggle visibility via ref — no React state
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!groupRef.current) return;
    const prog = scroll.progress.current;
    groupRef.current.children.forEach((child, i) => {
      if (dots[i]) child.visible = prog < dots[i].progress - 0.02;
    });
  });

  return (
    <group ref={groupRef}>
      {dots.map((dot) => (
        <mesh key={dot.id} position={[dot.x, dot.y, dot.z]} scale={dot.isPower ? 0.22 : 0.12}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial
            color={dot.isPower ? '#00F0FF' : '#FF007F'}
            emissive={dot.isPower ? '#00F0FF' : '#FF007F'}
            emissiveIntensity={2.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── STARFIELD ─────────────────────────────────────────────────────────────
function Starfield({ scroll }: { scroll: ScrollRefs }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 300;

  const [positions, colors, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    const palette = [
      new THREE.Color('#00F0FF'),
      new THREE.Color('#FF007F'),
      new THREE.Color('#8A2BE2'),
      new THREE.Color('#FFD700'),
      new THREE.Color('#FFFFFF'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
      spd[i] = 0.05 + Math.random() * 0.2;
    }

    return [pos, col, spd];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const baseSpeed = 0.03 + scroll.speed.current * 0.9;

    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 2;
      let z = positions[idx];
      z += speeds[i] * baseSpeed * 12;
      if (z > 20) z = -25;
      positions[idx] = z;
    }

    const posAttr = (pointsRef.current.geometry as THREE.BufferGeometry).attributes.position;
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.z = time * 0.02 + scroll.progress.current * 0.5;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

// ─── FLOATING RETRO GEOMETRIES ─────────────────────────────────────────────
function FloatingRetroGeometries() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.2;
    }
  });

  const shapes = useMemo(() => [
    { pos: [-6, 1, -5],   type: 'octa',  color: '#00F0FF', scale: 0.7 },
    { pos: [6, -4, -8],   type: 'icosa', color: '#FF007F', scale: 0.9 },
    { pos: [-7, -8, -10], type: 'tetra', color: '#8A2BE2', scale: 0.8 },
    { pos: [7, -12, -6],  type: 'octa',  color: '#FFD700', scale: 0.6 },
  ], []);

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.pos as [number, number, number]} scale={s.scale}>
          {s.type === 'octa'  && <octahedronGeometry args={[1, 0]} />}
          {s.type === 'icosa' && <icosahedronGeometry args={[1, 0]} />}
          {s.type === 'tetra' && <tetrahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial color={s.color} wireframe emissive={s.color} emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ─── SCENE (reads refs every frame, never re-renders from React) ───────────
function Scene({ scroll }: { scroll: ScrollRefs }) {
  useFrame((state, delta) => {
    const scrollProgress = scroll.progress.current;
    const scrollSpeed = scroll.speed.current;

    const targetZ = 8 - scrollProgress * 10;
    const targetY = -scrollProgress * 12;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 3);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 3);

    const targetFov = 50 + scrollSpeed * 25;
    const cam = state.camera as THREE.PerspectiveCamera;
    cam.fov = THREE.MathUtils.lerp(cam.fov, targetFov, delta * 6);
    cam.updateProjectionMatrix();
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 7]} intensity={2.5} color="#00F0FF" />
      <pointLight position={[-5, -5, -5]} intensity={3} color="#FF007F" />

      <Starfield scroll={scroll} />
      <PacmanModel scroll={scroll} />
      <PowerPellets scroll={scroll} />
      <FloatingRetroGeometries />
    </>
  );
}

// ─── MAIN EXPORT ───────────────────────────────────────────────────────────
export default function ArcadeSpaceCanvas() {
  const [mounted, setMounted] = useState(false);

  // Refs for scroll values — writing to refs NEVER triggers React re-renders.
  // The Three.js scene reads them directly inside useFrame each animation tick.
  const scrollProgressRef = useRef(0);
  const scrollSpeedRef = useRef(0);
  const scroll: ScrollRefs = { progress: scrollProgressRef, speed: scrollSpeedRef };

  // Wrapper div opacity: driven by direct DOM mutation (no React state)
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let speedTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, currentScrollY / maxScroll));

      const dt = Math.max(1, currentTime - lastTime);
      const dist = Math.abs(currentScrollY - lastScrollY);
      const speed = Math.min(1.5, dist / dt);

      // Write directly to refs — ZERO React re-renders, ZERO Three.js reconciliation
      scrollProgressRef.current = progress;
      scrollSpeedRef.current = speed;

      // Update wrapper opacity directly via DOM (no React involvement)
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = progress < 0.05 ? '0.45' : '0.9';
      }

      lastScrollY = currentScrollY;
      lastTime = currentTime;

      clearTimeout(speedTimeout);
      speedTimeout = setTimeout(() => {
        scrollSpeedRef.current = 0;
      }, 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(speedTimeout);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: 0.45,
        transition: 'opacity 0.5s ease',
        willChange: 'opacity',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[0.8, 1.2]}
        frameloop="always"
        performance={{ min: 0.5 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <Scene scroll={scroll} />
      </Canvas>
    </div>
  );
}