'use client';

export default function ArcadeStage() {
  return (
    <iframe
      title="Girl vs Arcade game"
      src="https://sketchfab.com/models/4c17f7e3d2714ad19e098d98f5ff2070/embed?autospin=1&autostart=1&transparent=1&ui_controls=0&ui_infos=0&ui_watermark=0&ui_watermark_link=0&ui_ar=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&ui_vr=0&ui_fullscreen=0&annotations_visible=0&scrollwheel=0&double_click=0&ui_loading=0"
      frameBorder="0"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        /* extend 70px below parent to hide controls, no extra vertical scaling */
        height: 'calc(100% + 70px)',
        /* shift 20% right to put the model on the right half without zooming it */
        transform: 'translateX(25%)',
        border: 'none',
        background: 'transparent',
        display: 'block',
        /* Removed pointer-events: none so you can rotate the model! */
      }}
    />
  );
}
