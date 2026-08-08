'use client';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

const MODEL_URL = '/models/pacman.glb';
const MYSTERY_BLOCK_URL = '/mystery-block.glb';

let preloadedGLTF: GLTF | null = null;
let gltfLoadingPromise: Promise<GLTF> | null = null;
let loadProgress = 0;
const listeners = new Set<(progress: number) => void>();

/**
 * Preload the main 27.4MB Horror Pac-Man GLB model immediately on website load.
 * This runs in parallel with the preloader video so the 3D model is ready when the site opens.
 */
export function preloadHorrorPacmanModel(onProgress?: (pct: number) => void): Promise<GLTF> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('SSR not supported for 3D preloading'));
  }

  if (onProgress) {
    listeners.add(onProgress);
    onProgress(loadProgress);
  }

  if (preloadedGLTF) {
    onProgress?.(100);
    return Promise.resolve(preloadedGLTF);
  }

  if (gltfLoadingPromise) {
    return gltfLoadingPromise;
  }

  gltfLoadingPromise = new Promise<GLTF>((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        preloadedGLTF = gltf;
        loadProgress = 100;
        listeners.forEach((fn) => fn(100));
        listeners.clear();
        resolve(gltf);
      },
      (event) => {
        if (event.total > 0) {
          const pct = Math.min(100, Math.round((event.loaded / event.total) * 100));
          loadProgress = pct;
          listeners.forEach((fn) => fn(pct));
        }
      },
      (err) => {
        console.warn('Preload 3D model failed:', err);
        gltfLoadingPromise = null;
        listeners.forEach((fn) => fn(-1));
        listeners.clear();
        reject(err);
      }
    );
  });

  return gltfLoadingPromise;
}

export function getPreloadedGLTF(): GLTF | null {
  return preloadedGLTF;
}

/**
 * Preload secondary 3D model assets like mystery-block into browser cache.
 */
export function preloadMysteryBlockModel(): void {
  if (typeof window === 'undefined') return;
  fetch(MYSTERY_BLOCK_URL, { mode: 'cors' }).catch(() => {});
}

/**
 * Preload all 3D assets together on site initialization.
 */
export function preloadAll3DAssets(): void {
  if (typeof window === 'undefined') return;
  preloadHorrorPacmanModel().catch(() => {});
  preloadMysteryBlockModel();
}
