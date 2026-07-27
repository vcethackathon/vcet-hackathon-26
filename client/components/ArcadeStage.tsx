'use client';

import { useEffect, useRef, useState } from 'react';

export default function ArcadeStage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '200px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    /* Sizing/offset live in globals.css (.arcade-stage-frame) so the mobile
       breakpoint can recentre the model and hand touch back to the page. */
    <div ref={wrapRef} className="arcade-stage">
      {visible && (
        <iframe
          title="Girl vs Arcade game"
          className="arcade-stage-frame"
          src="https://sketchfab.com/models/4c17f7e3d2714ad19e098d98f5ff2070/embed?autospin=1&autostart=1&transparent=1&ui_controls=0&ui_infos=0&ui_watermark=0&ui_watermark_link=0&ui_ar=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&ui_vr=0&ui_fullscreen=0&annotations_visible=0&scrollwheel=0&double_click=0&ui_loading=0"
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
        />
      )}
    </div>
  );
}
