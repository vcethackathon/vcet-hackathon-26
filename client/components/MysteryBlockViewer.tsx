'use client';

import { createElement, useEffect, useRef, useState } from 'react';
import Script from 'next/script';

function ViewerFallback() {
  return <div className="mystery-block-fallback">3D REWARD BOOST</div>;
}

export default function MysteryBlockViewer() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [viewerReady, setViewerReady] = useState(false);

  useEffect(() => {
    const element = viewerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '260px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    const activateViewer = () => setViewerReady(true);
    if (customElements.get('model-viewer')) {
      activateViewer();
      return;
    }

    customElements.whenDefined('model-viewer').then(activateViewer).catch(() => setViewerReady(false));
  }, [shouldLoad]);

  return (
    <div ref={viewerRef} className="mystery-block-viewer" aria-hidden="true">
      {shouldLoad ? (
        <>
          <Script src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" type="module" strategy="afterInteractive" />
          <div className={`mystery-model ${viewerReady ? 'is-ready' : ''}`}>
            {createElement('model-viewer', {
              src: '/mystery-block.glb',
              alt: '',
              'auto-rotate': true,
              'auto-rotate-delay': '0',
              'rotation-per-second': '18deg',
              'environment-image': 'neutral',
              exposure: '1.15',
              'shadow-intensity': '1',
              'interaction-prompt': 'none',
              'disable-zoom': true,
              'camera-orbit': '32deg 74deg 110%',
            })}
          </div>
          {!viewerReady && <ViewerFallback />}
        </>
      ) : <ViewerFallback />}
    </div>
  );
}
