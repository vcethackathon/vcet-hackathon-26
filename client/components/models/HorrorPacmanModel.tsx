'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { preloadHorrorPacmanModel } from '@/utils/modelPreloader';

// The GLB's flat ground plane read as a stray square in the card, so it is culled.
const HIDDEN_NODES = /Floor1/i;

// The authored sky dome stays visible as the model's backdrop, but it is 35 units
// across — letting it into the fit maths would shrink the characters to nothing.
const BACKDROP_MATERIALS = ['finalBackground'];

// World-space width the characters are scaled to fill inside the card.
const FIT = 4.6;

function materialNames(obj: THREE.Object3D) {
  const mat = (obj as THREE.Mesh).material;
  if (!mat) return [];
  return (Array.isArray(mat) ? mat : [mat]).map((m) => m?.name);
}

function shouldHide(obj: THREE.Object3D) {
  return HIDDEN_NODES.test(obj.name);
}

function isBackdrop(obj: THREE.Object3D) {
  return materialNames(obj).some((n) => BACKDROP_MATERIALS.includes(n));
}

// Bounding box of the rendered characters only — hidden and backdrop meshes excluded
function subjectBounds(root: THREE.Object3D) {
  const box = new THREE.Box3();
  root.updateMatrixWorld(true);
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || !mesh.visible || mesh.userData.isBackdrop) return;
    for (let p = mesh.parent; p; p = p.parent) if (!p.visible) return;
    if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
    box.union(mesh.geometry.boundingBox!.clone().applyMatrix4(mesh.matrixWorld));
  });
  return box;
}

// ─── GLB + BUILT-IN ANIMATION CLIP ─────────────────────────────────────────
function Model({
  spin,
  onProgress,
  onReady,
}: {
  spin: React.RefObject<{ velocity: number; angle: number }>;
  onProgress: (pct: number) => void;
  onReady: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const [scene, setScene] = useState<THREE.Group | null>(null);

  useEffect(() => {
    let cancelled = false;

    preloadHorrorPacmanModel((pct) => {
      if (!cancelled) onProgress(pct);
    })
      .then((gltf) => {
        if (cancelled) return;

        // Clone scene so model instance is clean
        const gltfScene = gltf.scene.clone(true);

        gltfScene.traverse((obj) => {
          if (shouldHide(obj)) obj.visible = false;
          if (isBackdrop(obj)) {
            obj.userData.isBackdrop = true;
            (obj as THREE.Mesh).renderOrder = -1;
            obj.frustumCulled = false;
          }
        });

        // Play the clip authored inside the GLB ("Take 001")
        if (gltf.animations.length) {
          const mixer = new THREE.AnimationMixer(gltfScene);
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.play();
          });
          mixerRef.current = mixer;
        }

        setScene(gltfScene);
        onReady();
      })
      .catch(() => {
        if (!cancelled) onProgress(-1);
      });

    return () => {
      cancelled = true;
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Frame the model inside the card once it lands
  useEffect(() => {
    if (!scene || !groupRef.current) return;
    const box = subjectBounds(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Fit against the widest horizontal footprint so nothing clips mid-spin
    const scale = FIT / Math.max(size.x, size.z);

    scene.position.set(-center.x, -center.y, -center.z);
    groupRef.current.scale.setScalar(scale);
  }, [scene]);

  useFrame((state, delta) => {
    mixerRef.current?.update(delta);
    if (!groupRef.current || !spin.current) return;

    spin.current.angle += spin.current.velocity * delta;
    spin.current.velocity *= 1 - Math.min(1, delta * 3);

    const sway = Math.sin(state.clock.elapsedTime * 0.32) * 0.22;
    groupRef.current.rotation.y = spin.current.angle + sway;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
  });

  if (!scene) return null;
  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

// ─── CANVAS SHELL ─────────────────────────────────────────────────────────
export default function HorrorPacmanModel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const spin = useRef({ velocity: 0, angle: 0 });
  const drag = useRef<{ active: boolean; x: number }>({ active: false, x: 0 });

  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // Mount canvas when approaching or entering viewport
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '800px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { active: true, x: e.clientX };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    drag.current.x = e.clientX;
    spin.current.angle += dx * 0.008;
    spin.current.velocity = dx * 0.12;
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <div
      ref={wrapRef}
      className="about-model-canvas"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      {inView && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 42 }}
          dpr={[1, 1.75]}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={1.4} />
          <directionalLight position={[3, 5, 4]} intensity={2.2} color="#00F0FF" />
          <pointLight position={[-3, -2, 2]} intensity={3} color="#FF007F" />
          <Model spin={spin} onProgress={setProgress} onReady={() => setReady(true)} />
        </Canvas>
      )}

      {!ready && (
        <div className="about-model-loading">
          {progress < 0 ? 'MODEL FAILED' : `LOADING ${progress}%`}
          <div className="about-model-bar">
            <span style={{ width: `${Math.max(0, progress)}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

