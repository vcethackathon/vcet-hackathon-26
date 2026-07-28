'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── 3D PAC-MAN CHARACTER ──────────────────────────────────────────────────
function PacmanModel({ scrollProgress, scrollSpeed }: { scrollProgress: number; scrollSpeed: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const topJawRef = useRef<THREE.Mesh>(null);
  const bottomJawRef = useRef<THREE.Mesh>(null);

  // Position Pac-Man along a curved trajectory through space based on scrollProgress
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Calculate target X, Y, Z coordinates for Pacman based on scroll progress
    // Hero: X=4 (far right), Y=2, Z=1
    // Mid sections: weaves gracefully down the right side of the screen
    const targetX = 2.8 + Math.sin(scrollProgress * Math.PI * 2.5) * 0.8;
    const targetY = 3.2 - scrollProgress * 12.0; // descends through space
    const targetZ = Math.sin(scrollProgress * Math.PI * 3.0) * 1.2 + 1.0;

    // Smooth lerp position
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 4);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 4);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 4);

    // Chomp animation ("waka-waka")
    const chompSpeed = 12 + scrollSpeed * 15;
    const mouthAngle = (Math.sin(time * chompSpeed) + 1) * 0.28 + 0.05;

    if (topJawRef.current) {
      topJawRef.current.rotation.x = mouthAngle;
    }
    if (bottomJawRef.current) {
      bottomJawRef.current.rotation.x = -mouthAngle;
    }

    // Dynamic tilt & yaw facing downward as scrolling down
    const targetRotZ = Math.sin(time * 2.0) * 0.1 - scrollSpeed * 0.2;
    const targetRotY = -Math.PI * 0.45 + Math.sin(scrollProgress * Math.PI * 2) * 0.3;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 5);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 5);
  });

  return (
    <group ref={groupRef} position={[3.2, 3.0, 1.0]} scale={0.75}>
      {/* Top Jaw */}
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

      {/* Bottom Jaw */}
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

      {/* Pacman Eyes */}
      <mesh position={[0.45, 0.45, 0.55]} scale={0.12}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#0B0C10" />
      </mesh>
      <mesh position={[0.45, 0.45, -0.55]} scale={0.12}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#0B0C10" />
      </mesh>

      {/* Neon Light surrounding Pacman */}
      <pointLight color="#FFD700" intensity={4} distance={6} />
    </group>
  );
}

// ─── POWER PELLETS & ARCADE DOTS ALONG SCROLL PATH ────────────────────────
function PowerPellets({ scrollProgress }: { scrollProgress: number }) {
  const dots = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const progress = (i + 1) / 15;
        return {
        id: i,
        progress,
        x: 2.8 + Math.sin(progress * Math.PI * 2.5) * 0.8,
        y: 3.2 - progress * 12.0,
        z: Math.sin(progress * Math.PI * 3.0) * 1.2 + 0.8,
        isPower: i % 4 === 0,
      };
    });
  }, []);

  return (
    <group>
      {dots.map((dot) => {
        const isEaten = scrollProgress >= dot.progress - 0.02;
        if (isEaten) return null;

        return (
          <mesh
            key={dot.id}
            position={[dot.x, dot.y, dot.z]}
            scale={dot.isPower ? 0.22 : 0.12}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              color={dot.isPower ? '#00F0FF' : '#FF007F'}
              emissive={dot.isPower ? '#00F0FF' : '#FF007F'}
              emissiveIntensity={2.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── HYPERDRIVE SPACE STARFIELD & TRAIL PARTICLES ──────────────────────────
function Starfield({ scrollProgress, scrollSpeed }: { scrollProgress: number; scrollSpeed: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  // Lower particle count for smoother performance on mid/low-end devices
  const count = 600;

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
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      spd[i] = 0.05 + Math.random() * 0.2;
    }

    return [pos, col, spd];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Movement speed responds dynamically to scrolling speed (warp speed travel)
    const baseSpeed = 0.03 + scrollSpeed * 0.9;

    // Directly mutate the positions Float32Array for much faster updates
    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 2;
      let z = positions[idx];
      z += speeds[i] * baseSpeed * 12;
      if (z > 20) z = -25;
      positions[idx] = z;
    }

    // Notify three.js that the buffer changed
    const posAttr = (pointsRef.current.geometry as THREE.BufferGeometry).attributes.position;
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.z = time * 0.02 + scrollProgress * 0.5;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

// ─── FLOATING RETRO POLYHEDRONS & NEON CRYSTALS ────────────────────────────
function FloatingRetroGeometries() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.2;
    }
  });

  const shapes = useMemo(() => {
    return [
      { pos: [-6, 1, -5], type: 'octa', color: '#00F0FF', scale: 0.7 },
      { pos: [6, -4, -8], type: 'icosa', color: '#FF007F', scale: 0.9 },
      { pos: [-7, -8, -10], type: 'tetra', color: '#8A2BE2', scale: 0.8 },
      { pos: [7, -12, -6], type: 'octa', color: '#FFD700', scale: 0.6 },
    ];
  }, []);

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.pos as [number, number, number]} scale={s.scale}>
          {s.type === 'octa' && <octahedronGeometry args={[1, 0]} />}
          {s.type === 'icosa' && <icosahedronGeometry args={[1, 0]} />}
          {s.type === 'tetra' && <tetrahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial
            color={s.color}
            wireframe
            emissive={s.color}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── MAIN SPACE STAGE COMPONENT ────────────────────────────────────────────
function Scene({ scrollProgress, scrollSpeed }: { scrollProgress: number; scrollSpeed: number }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state, delta) => {
    // Dynamic camera movement along Z axis as you scroll through space
    const targetZ = 8 - scrollProgress * 10;
    const targetY = -scrollProgress * 12;

    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 3);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 3);

    // Subtle FOV expansion when scrolling fast (speed warp effect)
    const targetFov = 50 + scrollSpeed * 25;
    if (cameraRef.current) {
      cameraRef.current.fov = THREE.MathUtils.lerp(cameraRef.current.fov, targetFov, delta * 6);
      cameraRef.current.updateProjectionMatrix();
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 7]} intensity={2.5} color="#00F0FF" />
      <pointLight position={[-5, -5, -5]} intensity={3} color="#FF007F" />

      <Starfield scrollProgress={scrollProgress} scrollSpeed={scrollSpeed} />
      <PacmanModel scrollProgress={scrollProgress} scrollSpeed={scrollSpeed} />
      <PowerPellets scrollProgress={scrollProgress} />
      <FloatingRetroGeometries />
    </>
  );
}

export default function ArcadeSpaceCanvas() {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);

  useEffect(() => {
    setMounted(true);

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let speedTimeout: NodeJS.Timeout;
    let scheduled = false;

    // Batch DOM scroll updates into requestAnimationFrame to avoid excessive React renders
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, currentScrollY / maxScroll));

      const dt = Math.max(1, currentTime - lastTime);
      const dist = Math.abs(currentScrollY - lastScrollY);
      const speed = Math.min(1.5, dist / dt);

      // schedule an rAF to update React state - reduces render frequency under heavy scroll
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          setScrollProgress(progress);
          setScrollSpeed(speed);
          scheduled = false;
        });
      }

      lastScrollY = currentScrollY;
      lastTime = currentTime;

      clearTimeout(speedTimeout);
      speedTimeout = setTimeout(() => {
        // smooth decay to zero speed after scrolling stops
        requestAnimationFrame(() => setScrollSpeed(0));
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
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: scrollProgress < 0.05 ? 0.45 : 0.9, // softer at hero, vibrant through rest of sections
        transition: 'opacity 0.5s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <Scene scrollProgress={scrollProgress} scrollSpeed={scrollSpeed} />
      </Canvas>
    </div>
  );
}