'use client';

export default function ArcadeStage() {
  return (
    <div className="arcade-stage">
      <iframe
        title="Girl vs Arcade game"
        className="arcade-stage-frame"
        src="https://sketchfab.com/models/4c17f7e3d2714ad19e098d98f5ff2070/embed?autostart=1&animation_autoplay=1&orbit_constraint_pan=1&max_texture_size=512&transparent=1&ui_controls=0&ui_infos=0&ui_watermark=0&ui_watermark_link=0&ui_ar=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&ui_vr=0&ui_fullscreen=0&annotations_visible=0&scrollwheel=0&double_click=0&ui_loading=0" frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
      />
    </div>
  );
}
